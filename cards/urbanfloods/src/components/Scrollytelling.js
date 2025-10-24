// src/components/Scrollytelling.js

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

// The Core Engine component: Handles scroll logic, video scrubbing, and text display
const Scrollytelling = ({ videoSrc, chapters }) => {
  // 1. Refs for DOM elements
  const containerRef = useRef(null); // The overall container for scroll tracking
  const videoRef = useRef(null);    // The video element for playback control

  // refinement: animation frame id for smooth scrubbing
  const rafRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTargetYRef = useRef(0);
  const overlayYRef = useRef(0);
  const rawScrollPercentRef = useRef(0);

  // 2. State for active chapter index (text to display) and video duration / scroll height
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [scrollVh, setScrollVh] = useState(chapters.length * 150);

  // Precompute equal chapter centers (ensures equal time per chapter regardless of explicit ranges)
  const chapterCenters = React.useMemo(() => {
    return chapters.map((_, i) => ((i + 0.5) / chapters.length) * 100);
  }, [chapters]);

  // Smooth scrub loop: lerp from current time to target time
  const smoothLoop = useCallback(() => {
    // Smoothly move overlay Y toward target
    const overlayEl = overlayRef.current;
    if (overlayEl) {
      const curY = overlayYRef.current || 0;
      const targetY = overlayTargetYRef.current || 0;
      const dy = targetY - curY;
      if (Math.abs(dy) > 0.2) {
        overlayYRef.current = curY + dy * 0.2; // was 0.12, increased for snappier overlay follow
      } else {
        overlayYRef.current = targetY;
      }
      // Apply transform directly for smoother updates without React re-renders
      overlayEl.style.transform = `translateY(${overlayYRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(smoothLoop);
  }, []);

  // Start the RAF loop when component mounts
  useEffect(() => {
    rafRef.current = requestAnimationFrame(smoothLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothLoop]);

  // When activeIndex changes, trigger a quick fade-in on the overlay without remounting
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    // compute transition time similar to render logic
    let transitionSec = 0.18;
    const activeChapter = chapters[activeIndex] || {};
    if (videoDuration && activeChapter.range) {
      const chapterPct = Math.max(0.01, (activeChapter.range[1] - activeChapter.range[0]) / 100);
      const chapterSec = chapterPct * videoDuration;
      transitionSec = Math.max(0.12, Math.min(0.6, chapterSec * 0.08));
    }
    el.style.transition = `opacity ${transitionSec}s ease, transform ${Math.max(0.12, transitionSec)}s ease`;
    // quick cross-fade: set opacity to 0 then to 1 on next frame so transition runs
    el.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));
  }, [activeIndex, videoDuration, chapters]);

  // 3. Effect to handle scroll-to-video scrubbing and chapter logic
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    // The scroll handler function
    const handleScroll = () => {
      // Calculate scroll position relative to the container
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // The scroll distance within the active area
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);

      // The total scrollable distance for the scrollytelling section
      const totalScrollHeight = containerHeight - viewportHeight;
      
      // Calculate scroll percentage (0 to 100)
      let scrollPercent = (scrollDistance / totalScrollHeight) * 100;
      scrollPercent = Math.max(0, Math.min(100, scrollPercent)); // Clamp between 0 and 100

      // Calculate the corresponding video time (set target, smooth loop will animate)
      // store raw scroll percent; RAF loop will smooth and set targetTime
      rawScrollPercentRef.current = scrollPercent;

      // compute target overlay Y (small parallax) in px: range approx +/-40px
      const overlayTarget = ((scrollPercent - 50) / 50) * 40; // -40..+40
      overlayTargetYRef.current = overlayTarget;

      // Determine the active chapter index by nearest center (gives equal time per chapter)
      let closest = 0;
      let minDiff = Infinity;
      chapterCenters.forEach((c, i) => {
        const d = Math.abs(scrollPercent - c);
        if (d < minDiff) {
          minDiff = d;
          closest = i;
        }
      });
      // Hysteresis: don't flip too quickly. Require the new center to be meaningfully closer.
      const prev = activeIndexRef.current;
      if (closest !== prev) {
        const prevDist = Math.abs(scrollPercent - chapterCenters[prev]);
        const newDist = Math.abs(scrollPercent - chapterCenters[closest]);
        const hysteresis = 4; // percent threshold to avoid rapid changes (tweakable)
        if (newDist + hysteresis < prevDist) {
          activeIndexRef.current = closest;
          setActiveIndex(closest);
        }
      }
    };

    // Attach the event listener and run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set state correctly

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chapterCenters, chapters]); // Rerun if chapter centers or chapters change

  // When video metadata loads, capture duration and compute a better scroll height
  const onLoadedMetadata = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const dur = vid.duration;
    if (dur && !isNaN(dur)) {
      setVideoDuration(dur);
      // Choose how many viewport-heights per second of video. Lower -> faster scroll.
      // Reduced to speed up scrolling mapping to video time.
      const vhPerSecond = 20; // was 40, now 20 to make scroll approximately 2x faster
      const computed = Math.max(chapters.length * 100, Math.ceil(dur * vhPerSecond));
      setScrollVh(computed);
      // Ensure the video loops and begins playing so it doesn't pause during scrubbing
      try {
        vid.loop = true;
        // muted videos are allowed to autoplay; ensure playback is started
        const p = vid.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
      } catch (e) {
        // ignore play errors (user gesture may be required on some browsers)
      }
    }
  }, [chapters]);
  
  return (
    // The main container. Its height dictates the scrollable area
    <div 
      ref={containerRef} 
      className="scrollytelling-container"
      style={{ height: `${scrollVh}vh` }} // Set the container height dynamically (adjusts to video length)
    >
      {/* The sticky video element */}
      <div className="scrollytelling-video-wrapper">
        <video 
          ref={videoRef} 
          src={videoSrc} 
          preload="auto" 
          loop
          muted 
          playsInline 
          onLoadedMetadata={onLoadedMetadata}
        />
      </div>

      {/* The overlay content box */}
      <div className="scrollytelling-chapter-overlay">
        <div
          ref={overlayRef}
          className="chapter-text fade-in"
          style={{ transform: 'translateY(0px)', opacity: 1 }}
        >
          <h2>{(chapters[activeIndex] && chapters[activeIndex].title) || ''}</h2>
          <p dangerouslySetInnerHTML={{ __html: (chapters[activeIndex] && chapters[activeIndex].text) || '' }} />
        </div>
      </div>
    </div>
  );
};

export default Scrollytelling;