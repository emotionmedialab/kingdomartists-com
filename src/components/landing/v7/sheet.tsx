"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  S, formFace, typedFace, scriptFace, easeOut,
  Wordmark, FormCaps, Field, TypeIn, Stamp, Ink, Sheet, SignLink, IconSearch,
} from "./ui";

/* ─────────────────── LETTERHEAD (fixed) ─────────────────── */

export function Letterhead() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "14px clamp(20px, 5vw, 72px)",
        background: scrolled ? "rgba(247,246,242,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${S.rule}` : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <a href="#top" style={{ textDecoration: "none" }}>
        <Wordmark size={21} />
      </a>
      <span className="ka7-label" style={{ display: "none" }} />
      <a
        href="/apply"
        onClick={(e) => {
          if (window.location.search) {
            e.preventDefault();
            window.location.href = "/apply" + window.location.search;
          }
        }}
        className="ka7-ghost"
        style={{
          fontFamily: formFace,
          fontVariationSettings: '"wdth" 116',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: 4,
          padding: "9px 20px",
        }}
      >
        Apply
      </a>
    </nav>
  );
}

/* ─────────────────── HERO: THE SHEET HEADER ─────────────────── */

export function HeroSheet() {
  const [stats, setStats] = useState<{ accepted: number; applied: number } | null>(null);
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats({ accepted: d.accepted ?? 0, applied: d.applied ?? 0 }))
      .catch(() => {});
  }, []);

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
  const filled = stats ? stats.accepted : 0;

  return (
    <header id="top" style={{ padding: "clamp(84px, 11vh, 132px) clamp(20px, 5vw, 72px) clamp(40px, 6vw, 72px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* sheet meta rule */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            borderBottom: `2px solid ${S.cobalt}`,
            paddingBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <span className="ka7-label">Studio Session Sheet</span>
          <span className="ka7-typed" style={{ fontSize: 12.5, color: S.faint }}>
            SHEET NO. 001 · {today}
          </span>
        </div>

        {/* poster title */}
        <div style={{ padding: "clamp(28px, 5vw, 64px) 0 clamp(20px, 3vw, 36px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <FormCaps size="clamp(15px, 2.2vw, 26px)" wdth={112} color={S.cobalt} style={{ marginBottom: "0.5em" }}>
              Session:
            </FormCaps>
          </motion.div>
          <motion.h1
            style={{ margin: 0 }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: easeOut }}
          >
            <FormCaps>The Founding</FormCaps>
            <FormCaps color={S.cobalt}>Three Hundred.</FormCaps>
          </motion.h1>
        </div>

        {/* field grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            columnGap: "clamp(24px, 4vw, 56px)",
            borderTop: `1px solid ${S.rule}`,
          }}
        >
          <Field label="Date" typeIn>NOW BOOKING</Field>
          <Field label="Personnel" typeIn>300 SEATS — HANDPICKED</Field>
          <Field label="Engineer" typeIn>A REAL PERSON, NOT AN ALGORITHM</Field>
          <Field label="Status">
            {stats === null ? (
              <span aria-label="loading" style={{ display: "inline-block", width: "0.62em", height: "1em", verticalAlign: "-0.15em", background: S.cobalt, animation: "ka7-caret 0.9s step-end infinite" }} />
            ) : (
              <TypeIn>{`${filled} OF 300 FILLED · ${stats.applied} APPLIED`}</TypeIn>
            )}
          </Field>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Field
            label="Roles"
            size="clamp(13.5px, 1.3vw, 16px)"
          >
            <TypeIn speed={12}>
              SINGERS · SONGWRITERS · WORSHIP LEADERS · PRODUCERS · ENGINEERS · FILMMAKERS · PHOTOGRAPHERS · DESIGNERS · WRITERS
            </TypeIn>
          </Field>
        </motion.div>

        {/* purpose line + signature field */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(28px, 4vw, 56px)",
            paddingTop: "clamp(28px, 4vw, 48px)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
            style={{
              margin: 0,
              maxWidth: 560,
              fontFamily: typedFace,
              fontSize: "clamp(14.5px, 1.35vw, 17px)",
              lineHeight: 1.75,
              color: S.ink,
            }}
          >
            The first person the Bible says was filled with the Spirit of God
            wasn&apos;t a priest or a king. It was an artist. And God didn&apos;t
            have him build alone. Kingdom Artists is the platform being built
            for creatives who build with God, for God — and this sheet books
            its first three hundred.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: easeOut }}
            style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: "min(100%, 300px)" }}
          >
            <span className="ka7-label">Sign here</span>
            <div style={{ borderBottom: `2px solid ${S.ink}`, paddingBottom: 14 }}>
              <SignLink />
            </div>
            <span style={{ fontFamily: typedFace, fontSize: 11.5, color: S.faint, maxWidth: 300, lineHeight: 1.6 }}>
              Every accepted member gets a personal link to vouch other
              creatives onto this sheet.
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────── ENGINEER'S NOTES: THE PROBLEM ─────────────────── */

const NOTE_LINES: { t: string; em?: boolean }[] = [
  { t: "You know the feeling." },
  { t: "Carrying a gift most people around you don't fully understand." },
  { t: "The songs at 2am. The mixes nobody asked for. The vision that won't leave you alone." },
  { t: "You've been building it faithfully. Just alone." },
  { t: "A worship leader writing songs only her living room has heard." },
  { t: "A producer with a sound heaven gave him." },
  { t: "An engineer who treats every mix like it's unto the Lord." },
  { t: "A filmmaker carrying a vision with no crew." },
  { t: "God designed us to create together.", em: true },
];

export function EngineersNotes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLElement>("[data-note]"));
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
          if (r.bottom < -80 || r.top > vh + 80) continue;
          const c = r.top + r.height / 2;
          const t = Math.min(1, Math.max(0, (vh * 0.8 - c) / (vh * 0.32)));
          s.style.opacity = (0.16 + 0.84 * t).toFixed(3);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Sheet>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: 12, marginBottom: "clamp(32px, 5vw, 64px)", flexWrap: "wrap" }}>
        <span className="ka7-label">Engineer&apos;s Notes — read before session</span>
        <Stamp color={S.red} rot={4} size="clamp(11px, 1.1vw, 14px)">Flagged: Isolation</Stamp>
      </div>

      <Ink>
        <h2 style={{ margin: "0 0 clamp(36px, 5vw, 64px)", maxWidth: 940 }}>
          <FormCaps size="clamp(34px, 5.6vw, 84px)">The gift was never</FormCaps>
          <FormCaps size="clamp(34px, 5.6vw, 84px)">the problem.</FormCaps>
          <FormCaps size="clamp(34px, 5.6vw, 84px)" color={S.cobalt}>The isolation is.</FormCaps>
        </h2>
      </Ink>

      <div
        ref={ref}
        style={{
          maxWidth: 760,
          margin: "0 auto",
          borderLeft: `2px solid ${S.rule}`,
          paddingLeft: "clamp(18px, 3vw, 40px)",
        }}
      >
        {NOTE_LINES.map((l, i) => (
          <p
            key={i}
            data-note
            style={{
              margin: "0 0 0.9em",
              fontFamily: typedFace,
              fontSize: "clamp(17px, 2vw, 26px)",
              lineHeight: 1.55,
              color: l.em ? S.cobalt : S.ink,
              fontStyle: l.em ? "italic" : "normal",
              opacity: 0.16,
            }}
          >
            {l.t}
          </p>
        ))}
        <p
          data-note
          style={{
            margin: "1.4em 0 0",
            fontFamily: scriptFace,
            fontStyle: "italic",
            fontSize: "clamp(19px, 2.3vw, 30px)",
            lineHeight: 1.5,
            color: S.cobalt,
            opacity: 0.16,
          }}
        >
          &ldquo;Two are better than one… a cord of three strands is not
          quickly broken.&rdquo;
        </p>
        <p
          data-note
          style={{
            margin: "1.2em 0 0",
            fontFamily: typedFace,
            fontSize: "clamp(17px, 2vw, 26px)",
            lineHeight: 1.55,
            color: S.ink,
            opacity: 0.16,
          }}
        >
          Artist, community, Creator — woven together. That&apos;s the new way
          we&apos;re building for the Kingdom.
        </p>
      </div>
    </Sheet>
  );
}

/* ─────────────────── THE VISION LINE ─────────────────── */

export function VisionLine() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Sheet>
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <Ink>
          <p
            style={{
              margin: "0 auto clamp(32px, 5vw, 56px)",
              maxWidth: 640,
              fontFamily: typedFace,
              fontSize: "clamp(14.5px, 1.4vw, 17.5px)",
              lineHeight: 1.8,
              color: S.ink,
            }}
          >
            In this hour, we believe the Lord is advancing His Kingdom through
            artists — a renaissance of creatives displaying the glory of God
            through their craft — and creating in a way that&apos;s different:
            together.
          </p>
        </Ink>
        <p
          ref={ref}
          style={{
            margin: 0,
            fontFamily: scriptFace,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(38px, 7.4vw, 108px)",
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            color: S.ink,
            textWrap: "balance",
          }}
        >
          {"On earth as it is in heaven.".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeOut }}
              style={{ display: "inline-block", marginRight: "0.26em" }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <div
          style={{
            width: 72,
            height: 2,
            background: S.cobalt,
            margin: "clamp(28px, 4vw, 44px) auto 0",
          }}
        />
      </div>
    </Sheet>
  );
}

/* ─────────────────── EXHIBIT A: THE STUDIO ─────────────────── */

const PROFILES = [
  { src: "/characters/01-songwriter-web.jpg", role: "Songwriter", city: "Nashville", tag: "OPEN TO CO-WRITES" },
  { src: "/characters/02-producer-web.jpg", role: "Producer", city: "Atlanta", tag: "NEEDS VOCALISTS" },
  { src: "/characters/04-engineer-web.jpg", role: "Engineer", city: "Los Angeles", tag: "MIX & MASTER" },
];

export function ExhibitStudio() {
  return (
    <Sheet>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: 12, marginBottom: "clamp(32px, 5vw, 64px)", flexWrap: "wrap" }}>
        <span className="ka7-label">Exhibit A — the studio being booked · opens 2026</span>
        <Stamp rot={3} size="clamp(11px, 1.1vw, 14px)">Attached</Stamp>
      </div>

      <Ink>
        <h2 style={{ margin: "0 0 clamp(16px, 2vw, 28px)", maxWidth: 900 }}>
          <FormCaps size="clamp(34px, 5.6vw, 84px)">A home, not</FormCaps>
          <FormCaps size="clamp(34px, 5.6vw, 84px)" color={S.cobalt}>another feed.</FormCaps>
        </h2>
      </Ink>
      <Ink>
        <p style={{ margin: "0 0 clamp(36px, 5vw, 60px)", maxWidth: 620, fontFamily: typedFace, fontSize: "clamp(14px, 1.35vw, 16.5px)", lineHeight: 1.75, color: S.ink }}>
          Every creative gets a profile built to showcase their gift — and a
          community built to find each other. Search by craft, city, or
          calling. Find the producer your song needs. The filmmaker your
          vision needs. Then build together.
        </p>
      </Ink>

      {/* the exhibit: platform preview pinned to the sheet */}
      <Ink amount={0.15}>
        <div style={{ position: "relative" }}>
          {/* punched holes */}
          <div style={{ position: "absolute", top: -7, left: "12%", zIndex: 2 }} className="ka7-punch" />
          <div style={{ position: "absolute", top: -7, right: "12%", zIndex: 2 }} className="ka7-punch" />

          <div
            style={{
              border: `1.5px solid ${S.ink}`,
              borderRadius: 6,
              background: "#FFFFFF",
              boxShadow: "0 2px 0 rgba(16,19,24,0.14), 0 24px 48px -28px rgba(16,19,24,0.28)",
              overflow: "hidden",
            }}
          >
            {/* exhibit header bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${S.rule}`, flexWrap: "wrap" }}>
              <Wordmark size={15} />
              <span className="ka7-typed" style={{ fontSize: 11, color: S.faint }}>
                app.kingdomartists.com — in the studio now
              </span>
            </div>

            <div style={{ padding: "clamp(14px, 2vw, 24px)" }}>
              {/* search rail */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${S.rule}`, borderRadius: 4, padding: "10px 14px", marginBottom: 12 }}>
                <IconSearch />
                <span className="ka7-typed" style={{ fontSize: 12.5, color: S.faint }}>
                  Search by craft, city, or calling…
                </span>
              </div>
              {/* filter row */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {["ALL CRAFTS", "NEAR ME", "LOOKING FOR: VOCALISTS", "WORSHIP", "FILM"].map((f, i) => (
                  <span
                    key={f}
                    style={{
                      fontFamily: formFace,
                      fontVariationSettings: '"wdth" 112',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      padding: "5px 11px",
                      borderRadius: 3,
                      border: `1px solid ${i === 0 ? S.cobalt : S.rule}`,
                      color: i === 0 ? "#FFFFFF" : S.cobalt,
                      background: i === 0 ? S.cobalt : "transparent",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* roster cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                {PROFILES.map((p) => (
                  <div key={p.role} style={{ border: `1px solid ${S.rule}`, borderRadius: 4, overflow: "hidden", background: "#FFFFFF" }}>
                    <div style={{ position: "relative" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.src}
                        alt={`${p.role} profile in the Kingdom Artists app`}
                        loading="lazy"
                        style={{ display: "block", width: "100%", aspectRatio: "3/2.3", objectFit: "cover", objectPosition: "top" }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          fontFamily: formFace,
                          fontVariationSettings: '"wdth" 112',
                          fontSize: 8.5,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#FFFFFF",
                          background: S.cobalt,
                          borderRadius: 3,
                          padding: "4px 8px",
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <div style={{ padding: "10px 12px" }}>
                      <span style={{ display: "block", fontFamily: formFace, fontVariationSettings: '"wdth" 116', fontWeight: 700, textTransform: "uppercase", fontSize: 13, color: S.ink }}>
                        {p.role}
                      </span>
                      <span className="ka7-typed" style={{ display: "block", fontSize: 11, color: S.faint, margin: "2px 0 10px" }}>
                        {p.city}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span aria-hidden style={{ flex: 1, textAlign: "center", fontFamily: formFace, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", borderRadius: 3, padding: "6px 0", border: `1px solid ${S.rule}`, color: S.cobalt, opacity: 0.75 }}>
                          MESSAGE
                        </span>
                        <span aria-hidden style={{ flex: 1, textAlign: "center", fontFamily: formFace, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", borderRadius: 3, padding: "6px 0", border: `1px solid ${S.rule}`, color: S.cobalt, opacity: 0.75 }}>
                          VIEW WORK
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Ink>

      {/* booking timeline as sheet schedule rows */}
      <div style={{ marginTop: "clamp(36px, 5vw, 56px)", borderTop: `1px solid ${S.rule}` }}>
        {[
          ["AT LAUNCH", "Your artist profile · discovery by craft, city, calling · direct connect with the 300"],
          ["FIRST 30 DAYS", "Collab boards · Creative Starter Kit drops · founder sessions with David & Cara"],
          ["FIRST 90 DAYS", "Showcases of your work · city gatherings · the roadmap you help us write"],
        ].map(([when, what], i) => (
          <Ink key={when} delay={i * 0.08}>
            <div className="ka7-row" style={{ display: "flex", gap: "clamp(14px, 3vw, 40px)", alignItems: "baseline", padding: "14px 2px" }}>
              <span className="ka7-label" style={{ flexShrink: 0, width: "clamp(96px, 12vw, 130px)" }}>{when}</span>
              <span className="ka7-typed" style={{ fontSize: "clamp(13px, 1.3vw, 15.5px)", lineHeight: 1.6 }}>{what}</span>
            </div>
          </Ink>
        ))}
      </div>
    </Sheet>
  );
}
