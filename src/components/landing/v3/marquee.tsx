"use client";

import { useEffect, useRef } from "react";

const serif = "var(--font-heading), Georgia, serif";

const WORDS = [
  "Singers",
  "Songwriters",
  "Worship Leaders",
  "Producers",
  "Engineers",
  "Filmmakers",
  "Photographers",
  "Designers",
  "Visual Artists",
  "Writers",
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let speed = 1.3;
    let target = 1.3;
    let raf = 0;
    const step = () => {
      speed += (target - speed) * 0.05;
      x -= speed;
      const half = track.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translateX(${x.toFixed(2)}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const slow = () => {
      target = 0.22;
    };
    const fast = () => {
      target = 1.3;
    };
    track.addEventListener("mouseenter", slow);
    track.addEventListener("mouseleave", fast);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", slow);
      track.removeEventListener("mouseleave", fast);
    };
  }, []);

  return (
    <section
      aria-hidden="true"
      style={{
        borderTop: "1px solid rgba(22,20,15,0.14)",
        borderBottom: "1px solid rgba(22,20,15,0.14)",
        padding: "clamp(18px, 2.5vw, 36px) 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: "0.45em",
          width: "max-content",
          willChange: "transform",
          fontFamily: serif,
          fontSize: "clamp(34px, 5.8vw, 84px)",
          lineHeight: 1.15,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "transparent",
          WebkitTextStroke: "1.1px rgba(22,20,15,0.5)",
        }}
      >
        {[...WORDS, ...WORDS].map((word, i) => (
          <span key={i} style={{ display: "inline-flex", gap: "0.45em" }}>
            <span>{word}</span>
            <span style={{ color: "#B8872B", WebkitTextStroke: "0" }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
