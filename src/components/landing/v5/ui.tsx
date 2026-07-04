"use client";

import type { CSSProperties, ReactNode } from "react";
export { Reveal } from "../v3/reveal";
export { MagneticLink } from "../v3/magnetic";

export const T = {
  bg: "#F5F5F2",
  surface: "#FFFFFF",
  border: "#E5E4DE",
  ivory: "#101014", // primary text (ink)
  muted: "#5E6169",
  gold: "#1E45C9", // cobalt accent
  cta: "#1E45C9",
};

export const display = "var(--font-display), Georgia, serif";
export const label = "var(--font-label), monospace";
export const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Eyebrow({
  children,
  num,
  style,
}: {
  children: ReactNode;
  num?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        borderTop: `1px solid ${T.border}`,
        paddingTop: 18,
        marginBottom: "clamp(40px, 6vw, 80px)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: label,
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: T.gold,
        }}
      >
        {children}
      </span>
      {num && (
        <span
          style={{
            fontFamily: display,
            fontSize: 14,
            color: "rgba(16,17,20,0.35)",
          }}
        >
          {num}
        </span>
      )}
    </div>
  );
}

export const sectionPad: CSSProperties = {
  padding: "clamp(72px, 10vw, 150px) clamp(20px, 5vw, 64px)",
};

export const inner: CSSProperties = { maxWidth: 1200, margin: "0 auto" };

export function ApplyButton({
  children = "Apply for Founding Access →",
  wide = false,
}: {
  children?: ReactNode;
  wide?: boolean;
}) {
  return (
    <a
      href="/apply"
      className="ka5-cta"
      onClick={(e) => {
        if (typeof window !== "undefined" && window.location.search) {
          e.preventDefault();
          window.location.href = "/apply" + window.location.search;
        }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 999,
        padding: "18px 40px",
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        width: wide ? "min(100%, 400px)" : undefined,
        boxSizing: "border-box",
      }}
    >
      {children}
    </a>
  );
}
