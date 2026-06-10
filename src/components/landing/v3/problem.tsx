"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Reveal } from "./reveal";

const serif = "var(--font-heading), Georgia, serif";

const SENTENCES: { text: string; style?: CSSProperties }[] = [
  { text: "You know the feeling. " },
  { text: "The industry doesn't understand why you won't compromise. " },
  {
    text: "And the way you create doesn't always fit inside the four walls of a Sunday service. ",
  },
  {
    text: "The songs at 2am. The mixes nobody asked for. The sound you can't stop chasing. ",
  },
  { text: "So you've been building in the in-between. " },
  { text: "A worship leader writing songs only her living room has heard. " },
  { text: "A producer with a sound the mainstream can't manufacture. " },
  { text: "An engineer who treats every mix like it's unto the Lord. " },
  { text: "A filmmaker carrying a vision with no crew. " },
  { text: "The gift was never the problem. " },
  { text: "The isolation is. ", style: { fontStyle: "italic" } },
  {
    text: "'Two are better than one... a cord of three strands is not quickly broken.' ",
    style: {
      display: "block",
      marginTop: "1.2em",
      fontStyle: "italic",
      color: "#B8872B",
    },
  },
  {
    text: "Artist, community, Creator, woven together. That's the cord we're building.",
    style: { display: "block", marginTop: "1.2em" },
  },
];

const STATS = [
  {
    title: "Gifted but scattered",
    body: "Singers, songwriters, worship leaders, producers, and engineers. Everywhere, and somehow still alone.",
  },
  {
    title: "Built to build together",
    body: "When God filled Bezalel with His Spirit to create, the first thing He did was give him a partner.",
  },
  {
    title: "The gathering is here",
    body: "One community, finally built for the people who carry this.",
  },
];

export function Problem() {
  const bodyRef = useRef<HTMLParagraphElement>(null);

  // scroll-scrub: each sentence fades 13% -> 100% as it passes the viewport
  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const spans = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-scrub]")
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      spans.forEach((el) => (el.style.opacity = "1"));
      return;
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        for (const el of spans) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const c = r.top + r.height / 2;
          const t = Math.min(1, Math.max(0, (vh * 0.82 - c) / (vh * 0.34)));
          el.style.opacity = (0.13 + 0.87 * t).toFixed(3);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{ padding: "clamp(80px, 12vw, 180px) clamp(20px, 5vw, 64px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* section header rule */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(22,20,15,0.14)",
            paddingTop: 18,
            marginBottom: "clamp(40px, 6vw, 88px)",
          }}
        >
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(22,20,15,0.45)",
            }}
          >
            The Problem
          </span>
          <span
            style={{
              fontFamily: serif,
              fontSize: 14,
              color: "rgba(22,20,15,0.45)",
            }}
          >
            01
          </span>
        </div>

        <Reveal>
          <h2
            style={{
              margin: "0 0 clamp(48px, 7vw, 96px)",
              maxWidth: 1000,
              fontFamily: serif,
              fontWeight: 500,
              fontSize: "clamp(36px, 5.6vw, 84px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#16140F",
            }}
          >
            The industry doesn&apos;t get your faith.
            <em
              style={{
                display: "block",
                fontWeight: 400,
                color: "rgba(22,20,15,0.55)",
              }}
            >
              And your craft is bigger than Sunday morning.
            </em>
          </h2>
        </Reveal>

        <p
          ref={bodyRef}
          style={{
            margin: "0 auto clamp(64px, 9vw, 140px)",
            maxWidth: 880,
            fontFamily: serif,
            fontSize: "clamp(21px, 2.3vw, 33px)",
            lineHeight: 1.6,
            letterSpacing: "-0.005em",
            color: "#16140F",
          }}
        >
          {SENTENCES.map((s, i) => (
            <span key={i} data-scrub style={{ opacity: 0.13, ...s.style }}>
              {s.text}
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
          {STATS.map((stat) => (
            <Reveal
              key={stat.title}
              style={{
                borderTop: "1px solid rgba(22,20,15,0.3)",
                paddingTop: 22,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 1.9vw, 28px)",
                  color: "#16140F",
                }}
              >
                {stat.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "#6E6757",
                }}
              >
                {stat.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
