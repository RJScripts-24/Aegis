// src/components/Scrollytelling.jsx

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

// Helper to keep percentages in the expected range
const clampPercent = (value) => Math.min(100, Math.max(0, value));

// The Core Engine component: Handles scroll logic, video scrubbing, and text display
const Scrollytelling = ({ videoSrc, chapters = [] }) => {
  // 1. Refs for DOM elements
  const containerRef = useRef(null); // The overall container for scroll tracking
  const videoRef = useRef(null);    // The video element for playback control

  // Prepare chapter metadata so the scroll logic always has the fields it expects
  const normalizedChapters = useMemo(() => {
    if (!Array.isArray(chapters) || chapters.length === 0) {
      return [];
    }

    const defaultSegment = 100 / chapters.length;

    return chapters.map((chapter, index) => {
      const hasRange = Array.isArray(chapter.range) && chapter.range.length === 2;
      const start = hasRange
        ? clampPercent(chapter.range[0])
        : clampPercent(chapter.start ?? chapter.time ?? index * defaultSegment);
      const end = hasRange
        ? clampPercent(chapter.range[1])
        : clampPercent(chapter.end ?? (index + 1) * defaultSegment);

      return {
        ...chapter,
        range: [start, Math.max(start, end)],
        text: chapter.text ?? chapter.description ?? '',
      };
    });
  }, [chapters]);

  // 2. State for active chapter index (text to display)
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    // reset active index when chapters change
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, [normalizedChapters]);

  // 3. Effect to handle scroll-to-video scrubbing and chapter logic
  // animation refs
  const rafRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTargetYRef = useRef(0);
  const overlayYRef = useRef(0);
  const rawScrollPercentRef = useRef(0);

  // equal centers for chapters
  const chapterCenters = React.useMemo(() => normalizedChapters.map((_, i) => ((i + 0.5) / normalizedChapters.length) * 100), [normalizedChapters]);

  const smoothLoop = useCallback(() => {
    const overlayEl = overlayRef.current;
    if (overlayEl) {
      const curY = overlayYRef.current || 0;
      const targetY = overlayTargetYRef.current || 0;
      const dy = targetY - curY;
      if (Math.abs(dy) > 0.2) {
        overlayYRef.current = curY + dy * 0.2;
      } else {
        overlayYRef.current = targetY;
      }
      overlayEl.style.transform = `translateY(${overlayYRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(smoothLoop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(smoothLoop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [smoothLoop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || normalizedChapters.length === 0) return;

    const handleScroll = () => {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);
      const scrollableHeight = Math.max(containerHeight - viewportHeight, 1);
      let scrollPercent = (scrollDistance / scrollableHeight) * 100;
      scrollPercent = clampPercent(scrollPercent);

      rawScrollPercentRef.current = scrollPercent;

      // overlay parallax
      overlayTargetYRef.current = ((scrollPercent - 50) / 50) * 40;

      // nearest center with hysteresis
      let closest = 0;
      let minDiff = Infinity;
      chapterCenters.forEach((c, i) => { const d = Math.abs(scrollPercent - c); if (d < minDiff) { minDiff = d; closest = i; } });
      const prev = activeIndexRef.current;
      if (closest !== prev) {
        const prevDist = Math.abs(scrollPercent - chapterCenters[prev]);
        const newDist = Math.abs(scrollPercent - chapterCenters[closest]);
        const hysteresis = 4;
        if (newDist + hysteresis < prevDist) {
          activeIndexRef.current = closest;
          setActiveIndex(closest);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterCenters, normalizedChapters]);

  // Calculate the height needed to make the scrolling last the desired time
  const [videoDuration, setVideoDuration] = useState(null);
  const [scrollVh, setScrollVh] = useState(normalizedChapters.length * 150);

  useEffect(() => { setScrollVh(Math.max(normalizedChapters.length * 100, Math.ceil((videoDuration || 0) * 20))); }, [videoDuration, normalizedChapters.length]);

  return (
    // The main container. Its height dictates the scrollable area
    <div 
      ref={containerRef} 
      className="scrollytelling-container"
      style={{ height: `${totalScrollHeight}vh` }} // Set the container height dynamically
    >
      {/* The sticky video element */}
      <div className="scrollytelling-video-wrapper">
        <video
          className="scrollytelling-video"
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          muted
          playsInline
          loop
          onLoadedMetadata={() => {
            const vid = videoRef.current; if (!vid) return; const dur = vid.duration; if (dur && !isNaN(dur)) { setVideoDuration(dur); try { vid.loop = true; const p = vid.play(); if (p && typeof p.then === 'function') p.catch(() => {}); } catch (e) {} }
          }}
          aria-hidden="true"
        />
      </div>

      {/* The overlay content box */}
      <div className="scrollytelling-chapter-overlay">
        <div ref={overlayRef} className="chapter-text fade-in" style={{ transform: 'translateY(0px)', opacity: 1 }}>
          <h2>{(normalizedChapters[activeIndex] && normalizedChapters[activeIndex].title) || ''}</h2>
          <p dangerouslySetInnerHTML={{ __html: (normalizedChapters[activeIndex] && normalizedChapters[activeIndex].text) || '' }} />
        </div>
      </div>
    </div>
  );
};

export default Scrollytelling;