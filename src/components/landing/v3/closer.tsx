"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";
import { MagneticLink } from "./magnetic";

const serif = "var(--font-heading), Georgia, serif";

/** Dark curtain closer — sends people to the /apply experience. */
export function Closer() {
  const sectionRef = useRef<HTMLElement>(null);

  // curtain-rise on enter
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = sectionRef.current;
        if (!el) return;
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.top > 0) {
          el.style.transform = `translateY(${((r.top / vh) * 36).toFixed(1)}px)`;
        } else if (r.top <= 0) {
          el.style.transform = "translateY(0px)";
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="apply"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 2,
        background: "#121009",
        borderRadius: "clamp(28px, 4vw, 56px) clamp(28px, 4vw, 56px) 0 0",
        marginTop: "calc(-1 * clamp(56px, 8vw, 120px))",
        padding: "clamp(96px, 13vw, 200px) clamp(20px, 5vw, 64px) 0",
        backgroundImage:
          "radial-gradient(900px 500px at 50% -5%, rgba(224,180,92,0.1), transparent 65%)",
        willChange: "transform",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <Reveal y={16}>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E0B45C",
            }}
          >
            For Such a Time as This
          </p>
        </Reveal>
        <Reveal y={20}>
          <h2
            style={{
              margin: "0 0 28px",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: "clamp(38px, 5.6vw, 76px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#F4EFE5",
            }}
          >
            You didn&apos;t find this page{" "}
            <em
              style={{
                display: "block",
                fontWeight: 400,
                color: "rgba(244,239,229,0.7)",
              }}
            >
              by accident.
            </em>
          </h2>
        </Reveal>
        <Reveal y={16}>
          <p
            style={{
              margin: "0 auto clamp(36px, 4.5vw, 56px)",
              maxWidth: 480,
              fontSize: 15.5,
              lineHeight: 1.75,
              color: "rgba(244,239,229,0.55)",
            }}
          >
            300 spots for creatives who build with God, for God. No algorithms.
            Our team reads every application personally.
          </p>
        </Reveal>
        <Reveal y={16}>
          <MagneticLink
            href="/apply"
            appendSearch
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "min(100%, 420px)",
              boxSizing: "border-box",
              background: "#F4EFE5",
              color: "#16140F",
              borderRadius: 999,
              padding: "20px 48px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Begin Your Application →
          </MagneticLink>
        </Reveal>
        <Reveal y={12}>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 12,
              color: "rgba(244,239,229,0.35)",
            }}
          >
            Five questions. Under a minute. Every application is read by a real
            person.
          </p>
        </Reveal>
      </div>

      {/* footer */}
      <footer
        style={{
          maxWidth: 1280,
          margin: "clamp(96px, 13vw, 180px) auto 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderTop: "1px solid rgba(244,239,229,0.14)",
          padding: "28px 0 36px",
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontSize: 19,
            color: "#F4EFE5",
          }}
        >
          Kingdom Artists
        </span>
        <span style={{ fontSize: 12.5, color: "rgba(244,239,229,0.4)" }}>
          © 2026 Kingdom Artists. Built with purpose.
        </span>
      </footer>
    </section>
  );
}
