// src/components/Scrollytelling.jsx

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

// Scrollytelling component (updated to match urbanfloods behavior):
// - Video plays/loops independently of scroll
// - Single overlay element that is smoothly animated with RAF
// - Chapter selection uses equal centers + hysteresis to avoid flicker
// - Faster fades, centered translucent box, small parallax
const Scrollytelling = ({ videoSrc, chapters }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // animation refs
  const rafRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTargetYRef = useRef(0);
  const overlayYRef = useRef(0);
  const rawScrollPercentRef = useRef(0);

  // active chapter index and helpers
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // video duration & scroll height
  const [videoDuration, setVideoDuration] = useState(null);
  const [scrollVh, setScrollVh] = useState(chapters.length * 150);

  // equal centers for chapters (0..100)
  const chapterCenters = React.useMemo(() => {
    return chapters.map((_, i) => ((i + 0.5) / chapters.length) * 100);
  }, [chapters]);

  // RAF loop: smoothly move overlay toward target
  const smoothLoop = useCallback(() => {
    const overlayEl = overlayRef.current;
    if (overlayEl) {
      const curY = overlayYRef.current || 0;
      const targetY = overlayTargetYRef.current || 0;
      const dy = targetY - curY;
      if (Math.abs(dy) > 0.2) {
        overlayYRef.current = curY + dy * 0.2; // snappier follow
      } else {
        overlayYRef.current = targetY;
      }
      overlayEl.style.transform = `translateY(${overlayYRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(smoothLoop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(smoothLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothLoop]);

  // Quick cross-fade when activeIndex changes (no remount)
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    let transitionSec = 0.18;
    const activeChapter = chapters[activeIndex] || {};
    if (videoDuration && activeChapter.range) {
      const chapterPct = Math.max(0.01, (activeChapter.range[1] - activeChapter.range[0]) / 100);
      const chapterSec = chapterPct * videoDuration;
      transitionSec = Math.max(0.12, Math.min(0.6, chapterSec * 0.08));
    }
    el.style.transition = `opacity ${transitionSec}s ease, transform ${Math.max(0.12, transitionSec)}s ease`;
    el.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));
  }, [activeIndex, videoDuration, chapters]);

  // scroll handler: compute scroll percent, overlay target, and active index
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);
      const totalScrollHeight = containerHeight - viewportHeight;
      let scrollPercent = (scrollDistance / totalScrollHeight) * 100;
      scrollPercent = Math.max(0, Math.min(100, scrollPercent));

      rawScrollPercentRef.current = scrollPercent;

      // overlay parallax (-40..+40px)
      const overlayTarget = ((scrollPercent - 50) / 50) * 40;
      overlayTargetYRef.current = overlayTarget;

      // pick nearest chapter center with hysteresis
      let closest = 0;
      let minDiff = Infinity;
      chapterCenters.forEach((c, i) => {
        const d = Math.abs(scrollPercent - c);
        if (d < minDiff) {
          minDiff = d;
          closest = i;
        }
      });
      const prev = activeIndexRef.current;
      if (closest !== prev) {
        const prevDist = Math.abs(scrollPercent - chapterCenters[prev]);
        const newDist = Math.abs(scrollPercent - chapterCenters[closest]);
        const hysteresis = 4; // percent
        if (newDist + hysteresis < prevDist) {
          activeIndexRef.current = closest;
          setActiveIndex(closest);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterCenters, chapters]);

  // on metadata: compute duration and scroll height; ensure continuous play
  const onLoadedMetadata = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const dur = vid.duration;
    if (dur && !isNaN(dur)) {
      setVideoDuration(dur);
      const vhPerSecond = 20; // faster mapping
      const computed = Math.max(chapters.length * 100, Math.ceil(dur * vhPerSecond));
      setScrollVh(computed);
      try {
        vid.loop = true;
        const p = vid.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
      } catch (e) {}
    }
  }, [chapters]);

  return (
    <div
      ref={containerRef}
      className="scrollytelling-container"
      style={{ height: `${scrollVh}vh` }}
    >
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

      <div className="scrollytelling-chapter-overlay">
        <div
          ref={overlayRef}
          className="chapter-text fade-in"
          style={{ transform: 'translateY(0px)', opacity: 1 }}
        >
          <h2>{(chapters[activeIndex] && chapters[activeIndex].title) || ''}</h2>
          <p dangerouslySetInnerHTML={{ __html: (chapters[activeIndex] && (chapters[activeIndex].description || chapters[activeIndex].text || '')) || '' }} />
        </div>
      </div>
    </div>
  );
};

export default Scrollytelling;
