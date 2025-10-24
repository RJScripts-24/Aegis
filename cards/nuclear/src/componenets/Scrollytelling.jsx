import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './Scrollytelling.css';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const normalize = (chapters) => {
  if (!Array.isArray(chapters) || chapters.length === 0) return [];
  const step = 100 / chapters.length;
  return chapters.map((c, i) => ({ ...c, start: i * step, end: i === chapters.length - 1 ? 100 : (i + 1) * step }));
};

export default function Scrollytelling({ videoSrc, chapters = [] }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);

  const ranges = useMemo(() => normalize(chapters), [chapters]);

  // animation refs
  const rafRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTargetYRef = useRef(0);
  const overlayYRef = useRef(0);
  const rawScrollPercentRef = useRef(0);

  const chapterCenters = React.useMemo(() => ranges.map((_, i) => ((i + 0.5) / ranges.length) * 100), [ranges]);
  const activeIndexRef = useRef(0);

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
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid || ranges.length === 0) return;

    const onScroll = () => {
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      const sc = window.scrollY - (top - vh / 2);
      const total = Math.max(h - vh, 1);
      let pct = (sc / total) * 100;
      pct = clamp(pct, 0, 100);

      rawScrollPercentRef.current = pct;
      overlayTargetYRef.current = ((pct - 50) / 50) * 40;

      // choose nearest center with hysteresis
      let closest = 0, minDiff = Infinity;
      chapterCenters.forEach((c, i) => { const d = Math.abs(pct - c); if (d < minDiff) { minDiff = d; closest = i; } });
      const prev = activeIndexRef.current;
      if (closest !== prev) {
        const prevDist = Math.abs(pct - chapterCenters[prev]);
        const newDist = Math.abs(pct - chapterCenters[closest]);
        const hysteresis = 4;
        if (newDist + hysteresis < prevDist) { activeIndexRef.current = closest; setActive(closest); }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ranges, chapterCenters]);

  const [videoDuration, setVideoDuration] = useState(null);
  const [heightVh, setHeightVh] = useState(Math.max(ranges.length * 140, 140));

  useEffect(() => { setHeightVh(Math.max(ranges.length * 100, Math.ceil((videoDuration || 0) * 20))); }, [videoDuration, ranges.length]);

  return (
    <div ref={containerRef} className="scrollytelling-container" style={{ height: `${heightVh}vh` }}>
      <div className="scrollytelling-video-wrapper">
        <video ref={videoRef} src={videoSrc} preload="auto" muted playsInline onLoadedMetadata={() => { const v = videoRef.current; if (!v) return; const d = v.duration; if (d && !isNaN(d)) { setVideoDuration(d); try { v.loop = true; const p = v.play(); if (p && typeof p.then === 'function') p.catch(() => {}); } catch (e) {} } }} />
      </div>

      <div className="scrollytelling-chapter-overlay">
        <div ref={overlayRef} className="chapter-text fade-in" style={{ transform: 'translateY(0px)', opacity: 1 }}>
          {ranges[active] ? (
            <>
              <h2>{ranges[active].title}</h2>
              <p>{ranges[active].description}</p>
            </>
          ) : (
            <div className="chapter-text fade-out">Scroll to begin</div>
          )}
        </div>
      </div>
    </div>
  );
}
