"use client";

import { motion, useInView } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/* THE SESSION SHEET — four inks, everything else is forbidden. */
export const S = {
  paper: "#F7F6F2",
  cobalt: "#1D44BE",
  ink: "#101318",
  red: "#D64541",
  rule: "rgba(29,68,190,0.3)",
  ruleSoft: "rgba(29,68,190,0.16)",
  faint: "rgba(16,19,24,0.68)",
};

export const formFace = "var(--font-form), sans-serif"; // Archivo
export const typedFace = "var(--font-typed), monospace"; // Courier Prime
export const scriptFace = "var(--font-display), Georgia, serif"; // Fraunces — wordmark & scripture only
export const easeOut = [0.16, 1, 0.3, 1] as const;

export function Wordmark({ size = 20, color = S.ink }: { size?: number; color?: string }) {
  return (
    <span style={{ fontSize: size, letterSpacing: "-0.02em", color, display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}>
      <em style={{ fontFamily: scriptFace, fontStyle: "italic", fontWeight: 400 }}>kingdom</em>
      <span style={{ fontFamily: formFace, fontVariationSettings: '"wdth" 110', fontWeight: 700 }}>artists</span>
    </span>
  );
}

/** Form-caps display type. wdth 125 at poster scale is the sheet's voice. */
export function FormCaps({
  children,
  size = "clamp(40px, 7.6vw, 118px)",
  wdth = 125,
  color = S.ink,
  style,
}: {
  children: ReactNode;
  size?: string;
  wdth?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: formFace,
        fontVariationSettings: `"wdth" ${wdth}`,
        fontWeight: 700,
        textTransform: "uppercase",
        fontSize: size,
        lineHeight: 0.96,
        letterSpacing: "-0.01em",
        color,
        display: "block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** A ruled field: LABEL: typed value. The sheet's atom. */
export function Field({
  label,
  children,
  typeIn = false,
  size = "clamp(15px, 1.6vw, 19px)",
  style,
}: {
  label: string;
  children: ReactNode;
  typeIn?: boolean;
  size?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="ka7-row"
      style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "10px 2px 8px", minWidth: 0, ...style }}
    >
      <span className="ka7-label" style={{ flexShrink: 0 }}>{label}</span>
      <span className="ka7-typed" style={{ fontSize: size, lineHeight: 1.35, minWidth: 0 }}>
        {typeIn ? <TypeIn>{String(children)}</TypeIn> : children}
      </span>
    </div>
  );
}

/** Typewriter fill-in when the field scrolls into view. */
export function TypeIn({ children, speed = 26 }: { children: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(children.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= children.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, children, speed, reduced]);

  const done = n >= children.length;
  return (
    <span ref={ref}>
      {children.slice(0, n)}
      <span
        aria-hidden
        style={{
          display: done ? "none" : "inline-block",
          width: "0.62em",
          height: "1em",
          verticalAlign: "-0.15em",
          background: S.cobalt,
          animation: "ka7-caret 0.9s step-end infinite",
        }}
      />
    </span>
  );
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return r;
}

/** Ink stamp that thunks down when scrolled into view. */
export function Stamp({
  children,
  color = S.cobalt,
  rot = -6,
  size = "clamp(12.5px, 1.4vw, 17px)",
  delay = 0,
  style,
}: {
  children: ReactNode;
  color?: string;
  rot?: number;
  size?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span
      ref={ref}
      className="ka7-stamp"
      style={{
        color,
        fontSize: size,
        opacity: 0,
        animation: inView ? `ka7-stamp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards` : "none",
        ["--stamp-rot" as string]: `${rot}deg`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Scroll reveal in the sheet's grammar: ink fades up a few px, once. */
export function Ink({
  children,
  delay = 0,
  y = 14,
  style,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: Math.min(amount, 0.1), margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Section shell: heavy top rule, generous sheet margins. */
export function Sheet({
  children,
  id,
  rule = true,
  style,
}: {
  children: ReactNode;
  id?: string;
  rule?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        padding: "clamp(56px, 8vw, 120px) clamp(20px, 5vw, 72px)",
        borderTop: rule ? `2px solid ${S.cobalt}` : "none",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/** Apply link that preserves the vouch ?ref= into /apply. */
export function SignLink({
  children = "Book My Seat →",
  wide = false,
  style,
}: {
  children?: ReactNode;
  wide?: boolean;
  style?: CSSProperties;
}) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (typeof window !== "undefined" && window.location.search) {
      e.preventDefault();
      window.location.href = "/apply" + window.location.search;
    }
  }
  return (
    <a
      href="/apply"
      onClick={onClick}
      className="ka7-cta"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 4,
        padding: "17px 34px",
        fontFamily: formFace,
        fontVariationSettings: '"wdth" 116',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        width: wide ? "min(100%, 380px)" : undefined,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

/* Icon strokes — one weight, drawn, never unicode. */
export function IconCheck({ size = 13, color = S.cobalt }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 7.5 L5.5 11 L12 3.5" />
    </svg>
  );
}
export function IconPlus({ size = 14, color = S.cobalt, open = false }: { size?: number; color?: string; open?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
      style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0 }}
    >
      <path d="M7 1.5 V12.5 M1.5 7 H12.5" />
    </svg>
  );
}
export function IconSearch({ size = 13, color = S.faint }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="6" cy="6" r="4.4" />
      <path d="M9.4 9.4 L13 13" />
    </svg>
  );
}
