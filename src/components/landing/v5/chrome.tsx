"use client";

import { useEffect, useRef } from "react";
import { T, display, label } from "./ui";

/** v5 fixed chrome: gold progress hairline, dark blurring nav, floating apply bar. */
export function Chrome() {
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        const max = document.documentElement.scrollHeight - vh;
        if (progressRef.current)
          progressRef.current.style.width =
            (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
        const nav = navRef.current;
        if (nav) {
          const s = window.scrollY > 24;
          nav.style.background = s ? "rgba(245,245,242,0.82)" : "transparent";
          nav.style.backdropFilter = s ? "blur(16px)" : "none";
          nav.style.borderBottomColor = s
            ? "rgba(30,69,201,0.14)"
            : "transparent";
        }
        const fcta = ctaRef.current;
        if (fcta) {
          const apply = document.getElementById("apply");
          const apTop = apply ? apply.getBoundingClientRect().top : Infinity;
          const show = window.scrollY > vh * 0.6 && apTop > vh * 0.9;
          fcta.style.opacity = show ? "1" : "0";
          fcta.style.transform = show
            ? "translate(-50%, 0px)"
            : "translate(-50%, 90px)";
          fcta.style.pointerEvents = show ? "auto" : "none";
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
          ref={progressRef}
          style={{ width: "0%", height: "100%", background: T.gold }}
        />
      </div>

      <a
        ref={ctaRef}
        href="/apply"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "max(16px, env(safe-area-inset-bottom))",
          transform: "translate(-50%, 90px)",
          zIndex: 85,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          maxWidth: "calc(100vw - 32px)",
          boxSizing: "border-box",
          background: T.surface,
          color: T.ivory,
          border: "1px solid rgba(30,69,201,0.45)",
          borderRadius: 999,
          padding: "15px 24px",
          textDecoration: "none",
          boxShadow: "0 18px 44px -14px rgba(16,17,20,0.14)",
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          transition:
            "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#1FA56B",
            animation: "ka-pulse 2.2s ease-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: label,
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          300 founding spots
        </span>
        <span
          style={{ width: 1, height: 14, background: "rgba(16,17,20,0.2)" }}
        />
        <span
          style={{
            fontFamily: label,
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: T.cta,
          }}
        >
          Apply →
        </span>
      </a>

      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(14px, 2vw, 22px) clamp(20px, 5vw, 64px)",
          background: "transparent",
          borderBottom: "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: display,
            fontWeight: 500,
            fontSize: "clamp(18px, 1.6vw, 22px)",
            letterSpacing: "-0.01em",
            color: T.ivory,
            textDecoration: "none",
          }}
        >
          Kingdom Artists
        </a>
        <a
          href="/apply"
          className="ka5-ghost"
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "10px 22px",
            fontFamily: label,
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Apply Now
        </a>
      </nav>
    </>
  );
}
