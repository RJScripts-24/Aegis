// src/components/Scrollytelling.js

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

const Scrollytelling = ({ videoSrc, chapters }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const rafRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTargetYRef = useRef(0);
  const overlayYRef = useRef(0);
  const rawScrollPercentRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [scrollVh, setScrollVh] = useState(chapters.length * 150);

  const chapterCenters = React.useMemo(() => chapters.map((_, i) => ((i + 0.5) / chapters.length) * 100), [chapters]);

  const smoothLoop = useCallback(() => {
    const overlayEl = overlayRef.current;
    if (overlayEl) {
      const curY = overlayYRef.current || 0;
      const targetY = overlayTargetYRef.current || 0;
      const dy = targetY - curY;
      if (Math.abs(dy) > 0.2) overlayYRef.current = curY + dy * 0.2;
      else overlayYRef.current = targetY;
      overlayEl.style.transform = `translateY(${overlayYRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(smoothLoop);
  }, []);

  useEffect(() => { rafRef.current = requestAnimationFrame(smoothLoop); return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, [smoothLoop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);
      const totalScrollHeight = Math.max(containerHeight - viewportHeight, 1);
      let scrollPercent = (scrollDistance / totalScrollHeight) * 100;
      scrollPercent = Math.max(0, Math.min(100, scrollPercent));

      rawScrollPercentRef.current = scrollPercent;
      overlayTargetYRef.current = ((scrollPercent - 50) / 50) * 40;

      let closest = 0; let minDiff = Infinity;
      chapterCenters.forEach((c, i) => { const d = Math.abs(scrollPercent - c); if (d < minDiff) { minDiff = d; closest = i; } });
      const prev = activeIndexRef.current;
      if (closest !== prev) {
        const prevDist = Math.abs(scrollPercent - chapterCenters[prev]);
        const newDist = Math.abs(scrollPercent - chapterCenters[closest]);
        const hysteresis = 4;
        if (newDist + hysteresis < prevDist) { activeIndexRef.current = closest; setActiveIndex(closest); }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterCenters, chapters]);

  const onLoadedMetadata = useCallback(() => {
    const vid = videoRef.current; if (!vid) return; const dur = vid.duration; if (dur && !isNaN(dur)) { setVideoDuration(dur); const vhPerSecond = 20; const computed = Math.max(chapters.length * 100, Math.ceil(dur * vhPerSecond)); setScrollVh(computed); try { vid.loop = true; const p = vid.play(); if (p && typeof p.then === 'function') p.catch(() => {}); } catch (e) {} }
  }, [chapters]);

  useEffect(() => { if (videoDuration) setScrollVh(Math.max(chapters.length * 100, Math.ceil(videoDuration * 20))); }, [videoDuration, chapters.length]);

  return (
    <div ref={containerRef} className="scrollytelling-container" style={{ height: `${scrollVh}vh` }}>
      <div className="scrollytelling-video-wrapper">
        <video ref={videoRef} src={videoSrc} preload="auto" loop muted playsInline onLoadedMetadata={onLoadedMetadata} />
      </div>
      <div className="scrollytelling-chapter-overlay">
        <div ref={overlayRef} className="chapter-text fade-in" style={{ transform: 'translateY(0px)', opacity: 1 }}>
          <h2>{(chapters[activeIndex] && chapters[activeIndex].title) || ''}</h2>
          <p dangerouslySetInnerHTML={{ __html: (chapters[activeIndex] && (chapters[activeIndex].description || chapters[activeIndex].text || '')) || '' }} />
        </div>
      </div>
    </div>
  );
};

export default Scrollytelling;
