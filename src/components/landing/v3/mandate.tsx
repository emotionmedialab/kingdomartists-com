"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

const serif = "var(--font-heading), Georgia, serif";

const PARAGRAPHS = [
  "Moses built from a blueprint shown on a mountain. David's temple plans came 'from the hand of the LORD.' And he was a songwriter.",
  "We believe heaven still hands out ideas. The melody you can't shake. The vision that won't leave you alone.",
  "Treasure in jars of clay, given to glorify God and touch lives through what you make. This is where we carry it together.",
];

export function Mandate() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // parallax pull-quote + centering glow
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const quote = quoteRef.current;
        const glow = glowRef.current;
        if (!quote) return;
        const vh = window.innerHeight;
        const r = quote.getBoundingClientRect();
        const d = r.top + r.height / 2 - vh / 2;
        if (r.bottom > -300 && r.top < vh + 300) {
          quote.style.transform = `translateY(${(d * 0.22).toFixed(1)}px)`;
          if (glow) {
            glow.style.opacity = Math.max(
              0,
              1 - Math.abs(d) / (vh * 0.75)
            ).toFixed(3);
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        padding:
          "clamp(80px, 12vw, 180px) clamp(20px, 5vw, 64px) clamp(40px, 6vw, 100px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
              color: "#B8872B",
            }}
          >
            On Earth as It Is in Heaven
          </span>
          <span
            style={{
              fontFamily: serif,
              fontSize: 14,
              color: "rgba(22,20,15,0.45)",
            }}
          >
            02
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
            marginBottom: "clamp(64px, 9vw, 140px)",
          }}
        >
          {/* pinned headline (sticky on desktop only) */}
          <div className="ka-sticky-col">
            <h2
              style={{
                margin: 0,
                fontFamily: serif,
                fontWeight: 500,
                fontSize: "clamp(44px, 6.4vw, 96px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#16140F",
              }}
            >
              Heaven has ideas.
              <em
                style={{ display: "block", fontWeight: 400, color: "#B8872B" }}
              >
                You have hands.
              </em>
            </h2>
          </div>
          {/* scrolling paragraphs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(48px, 8vw, 120px)",
              paddingTop: "clamp(8px, 4vw, 64px)",
            }}
          >
            {PARAGRAPHS.map((text) => (
              <Reveal key={text.slice(0, 20)}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(17px, 1.5vw, 21px)",
                    lineHeight: 1.8,
                    color: "#444034",
                  }}
                >
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* pull-quote set piece */}
        <div
          style={{
            position: "relative",
            padding: "clamp(48px, 9vw, 140px) 0",
            textAlign: "center",
          }}
        >
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              inset: "-10% -20%",
              background:
                "radial-gradient(closest-side, rgba(184,135,43,0.22), transparent 70%)",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <p
            ref={quoteRef}
            style={{
              position: "relative",
              margin: 0,
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 10.5vw, 168px)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#16140F",
              willChange: "transform",
              textWrap: "balance",
            }}
          >
            On earth as it is in heaven.
          </p>
        </div>
      </div>
    </section>
  );
}
