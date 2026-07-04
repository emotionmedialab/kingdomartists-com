"use client";

import { useEffect, useRef } from "react";
import { T, display, Eyebrow, Reveal, sectionPad, inner } from "./ui";

const WORDS = [
  "Singers", "Songwriters", "Worship Leaders", "Producers", "Engineers",
  "Filmmakers", "Photographers", "Designers", "Visual Artists", "Writers",
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, speed = 1.3, target = 1.3, raf = 0;
    const step = () => {
      speed += (target - speed) * 0.05;
      x -= speed;
      const half = track.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translateX(${x.toFixed(2)}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const slow = () => (target = 0.22);
    const fast = () => (target = 1.3);
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
      aria-hidden
      style={{
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
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
          fontFamily: display,
          fontSize: "clamp(34px, 5.8vw, 84px)",
          lineHeight: 1.15,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(245,241,232,0.35)",
        }}
      >
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} style={{ display: "inline-flex", gap: "0.45em" }}>
            <span>{w}</span>
            <span style={{ color: T.gold, WebkitTextStroke: "0" }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const SCRUB_LINES: { t: string; italic?: boolean; gold?: boolean; block?: boolean }[] = [
  { t: "You know the feeling. " },
  { t: "The industry doesn't understand why you won't compromise. " },
  { t: "And the way you create doesn't always fit inside the four walls of a Sunday service. " },
  { t: "The songs at 2am. The mixes nobody asked for. The sound you can't stop chasing. " },
  { t: "So you've been building in the in-between. " },
  { t: "A worship leader writing songs only her living room has heard. " },
  { t: "A producer with a sound the mainstream can't manufacture. " },
  { t: "An engineer who treats every mix like it's unto the Lord. " },
  { t: "A filmmaker carrying a vision with no crew. " },
  { t: "The gift was never the problem. " },
  { t: "The isolation is. ", italic: true },
  { t: "'Two are better than one... a cord of three strands is not quickly broken.' ", italic: true, gold: true, block: true },
  { t: "Artist, community, Creator, woven together. That's what we're building.", block: true },
];

export function Problem() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-scrub]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        for (const s of spans) {
          const r = s.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const c = r.top + r.height / 2;
          const t = Math.min(1, Math.max(0, (vh * 0.82 - c) / (vh * 0.34)));
          s.style.opacity = (0.14 + 0.86 * t).toFixed(3);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={sectionPad}>
      <div style={inner}>
        <Eyebrow num="01">The Problem</Eyebrow>
        <Reveal>
          <h2
            style={{
              margin: "0 0 clamp(48px, 7vw, 90px)",
              maxWidth: 980,
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(36px, 5.4vw, 80px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: T.ivory,
            }}
          >
            The industry doesn&apos;t get your faith.
            <em style={{ display: "block", fontWeight: 300, color: "rgba(245,241,232,0.5)" }}>
              And your craft is bigger than Sunday morning.
            </em>
          </h2>
        </Reveal>
        <p
          ref={ref}
          style={{
            margin: "0 auto clamp(56px, 8vw, 110px)",
            maxWidth: 860,
            fontFamily: display,
            fontSize: "clamp(21px, 2.3vw, 32px)",
            lineHeight: 1.6,
            color: T.ivory,
          }}
        >
          {SCRUB_LINES.map((l, i) => (
            <span
              key={i}
              data-scrub
              style={{
                opacity: 0.14,
                fontStyle: l.italic ? "italic" : "normal",
                color: l.gold ? T.gold : undefined,
                display: l.block ? "block" : undefined,
                marginTop: l.block ? "1.2em" : undefined,
              }}
            >
              {l.t}
            </span>
          ))}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(28px, 4vw, 56px)",
          }}
        >
          {[
            ["Gifted but scattered", "Singers, songwriters, worship leaders, producers, and engineers. Everywhere, and somehow still alone."],
            ["Built to build together", "When God filled Bezalel with His Spirit to create, the first thing He did was give him a partner."],
            ["The gathering is here", "One platform, finally built for the people who carry this."],
          ].map(([t, b]) => (
            <Reveal key={t} style={{ borderTop: "1px solid rgba(201,169,106,0.3)", paddingTop: 22 }}>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontFamily: display,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 1.9vw, 28px)",
                  color: T.ivory,
                }}
              >
                {t}
              </h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: T.muted }}>{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (glowRef.current) glowRef.current.style.opacity = "0.7";
      return;
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const q = quoteRef.current;
        if (!q) return;
        const vh = window.innerHeight;
        const r = q.getBoundingClientRect();
        const d = r.top + r.height / 2 - vh / 2;
        if (r.bottom > -300 && r.top < vh + 300) {
          q.style.transform = `translateY(${(d * 0.22).toFixed(1)}px)`;
          if (glowRef.current)
            glowRef.current.style.opacity = Math.max(0, 1 - Math.abs(d) / (vh * 0.75)).toFixed(3);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ position: "relative", padding: "clamp(48px, 8vw, 130px) clamp(20px, 5vw, 64px)", textAlign: "center" }}>
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: "-10% -20%",
          background: "radial-gradient(closest-side, rgba(201,169,106,0.2), transparent 70%)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <p
        ref={quoteRef}
        style={{
          position: "relative",
          margin: "0 auto",
          maxWidth: 1200,
          fontFamily: display,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(38px, 9.5vw, 150px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: T.ivory,
          willChange: "transform",
          textWrap: "balance",
        }}
      >
        On earth as it is in heaven.
      </p>
    </section>
  );
}
