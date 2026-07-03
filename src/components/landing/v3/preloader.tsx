"use client";

import { useEffect, useState } from "react";

const serif = "var(--font-heading), Georgia, serif";
const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Opening curtain: serif wordmark rises, gold hairline draws,
 * then the whole panel lifts to reveal the page. Shows once per session.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "showing" | "lifting">(
    "hidden"
  );

  useEffect(() => {
    if (sessionStorage.getItem("ka-preloaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("ka-preloaded", "1");
    setPhase("showing");
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("lifting"), 1450);
    const t2 = setTimeout(() => {
      setPhase("hidden");
      document.documentElement.style.overflow = "";
    }, 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#16140F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform 0.9s ${easeOut}`,
        borderRadius: phase === "lifting" ? "0 0 48px 48px" : 0,
      }}
    >
      <span
        style={{
          display: "block",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: serif,
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(30px, 5vw, 54px)",
            letterSpacing: "-0.01em",
            color: "#F4EFE5",
            transform: "translateY(112%)",
            animation: `ka-rise 0.9s ${easeOut} 0.15s forwards`,
          }}
        >
          Kingdom Artists
        </span>
      </span>
      <span
        style={{
          width: 44,
          height: 1,
          background: "#B8872B",
          transformOrigin: "center",
          transform: "scaleX(0)",
          animation: `ka-drawline 0.7s ${easeOut} 0.7s forwards`,
        }}
      />
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(244,239,229,0.4)",
          opacity: 0,
          animation: `ka-fade 0.6s ease 0.95s forwards`,
        }}
      >
        On earth as it is in heaven
      </span>
    </div>
  );
}
