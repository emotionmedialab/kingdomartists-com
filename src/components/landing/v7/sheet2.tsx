"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import {
  S, formFace, typedFace, scriptFace, easeOut,
  Wordmark, FormCaps, Stamp, Ink, Sheet, SignLink, IconCheck, IconPlus,
} from "./ui";

/* ─────────────────── PERSONNEL: WHY 300 + TAKE COUNTER ─────────────────── */

function TakeCounter({ accepted, applied }: { accepted: number; applied: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || accepted === 0) return;
    const controls = animate(0, accepted, {
      duration: 1.1,
      ease: "circOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, accepted]);

  const acceptedPct = (Math.max(accepted, 0) / 300) * 100;
  const appliedPct = (Math.min(applied, 300) / 300) * 100;

  return (
    <div
      ref={ref}
      style={{
        border: `1.5px solid ${S.ink}`,
        borderRadius: 6,
        background: "#FFFFFF",
        padding: "clamp(20px, 3vw, 40px)",
        boxShadow: "0 2px 0 rgba(16,19,24,0.14), 0 20px 40px -26px rgba(16,19,24,0.25)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 14, marginBottom: "clamp(16px, 2vw, 26px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: typedFace, fontWeight: 700, fontSize: "clamp(46px, 6vw, 88px)", lineHeight: 1, color: S.cobalt, fontVariantNumeric: "tabular-nums" }}>
            {String(shown).padStart(3, "0")}
          </span>
          <span style={{ fontFamily: typedFace, fontSize: "clamp(16px, 1.8vw, 24px)", color: S.faint }}>/ 300 seats</span>
        </div>
        <span className="ka7-label">
          {accepted === 0 ? "Tape rolling — be take one" : `${300 - accepted} seats open`}
        </span>
      </div>

      {/* chorded tape: applied = pencil hatch, accepted = ink fill, one element */}
      <div
        role="img"
        aria-label={`${accepted} of 300 seats filled; ${applied} applications received`}
        style={{
          position: "relative",
          height: "clamp(30px, 3.6vw, 46px)",
          border: `1px solid ${S.rule}`,
          borderRadius: 3,
          overflow: "hidden",
          backgroundImage: `repeating-linear-gradient(90deg, ${S.ruleSoft} 0 1px, transparent 1px calc(100% / 60))`,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${appliedPct}%` } : {}}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.15 }}
          style={{
            position: "absolute",
            inset: "0 auto 0 0",
            backgroundImage: `repeating-linear-gradient(-45deg, rgba(29,68,190,0.3) 0 2px, transparent 2px 7px)`,
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.max(acceptedPct, accepted > 0 ? 1 : 0)}%` } : {}}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
          style={{ position: "absolute", inset: "0 auto 0 0", background: S.cobalt }}
        />
      </div>
      <div style={{ display: "flex", gap: 22, marginTop: 12, flexWrap: "wrap" }}>
        <span className="ka7-typed" style={{ fontSize: 11.5, color: S.faint, display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 14, height: 9, background: S.cobalt, display: "inline-block", borderRadius: 1 }} />
          BOOKED (ACCEPTED) — {accepted}
        </span>
        <span className="ka7-typed" style={{ fontSize: 11.5, color: S.faint, display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 14, height: 9, display: "inline-block", borderRadius: 1, border: `1px solid ${S.rule}`, backgroundImage: "repeating-linear-gradient(-45deg, rgba(29,68,190,0.35) 0 2px, transparent 2px 5px)" }} />
          ON THE SHEET (APPLIED) — {applied}
        </span>
      </div>
    </div>
  );
}

const PERKS: [string, string][] = [
  ["Locked in for life", "Everything we ever build is yours. In before pricing exists. No paywalls. No expiration."],
  ["Founder status", "A mark never given again. Only 300 will ever carry it."],
  ["First eyes on everything", "Founders shape every tool and drop before anyone else sees it."],
  ["Creative starter kit", "Templates, assets, and resources to steward your gift from day one."],
  ["The power to vouch", "Your personal link fast-tracks the creatives you believe in. The 300 choose the family."],
];

export function Personnel() {
  const [stats, setStats] = useState({ accepted: 0, applied: 0 });
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats({ accepted: d.accepted ?? 0, applied: d.applied ?? 0 }))
      .catch(() => {});
  }, []);

  return (
    <Sheet>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: 12, marginBottom: "clamp(32px, 5vw, 64px)", flexWrap: "wrap" }}>
        <span className="ka7-label">Personnel — limited to three hundred</span>
        <Stamp rot={-4} size="clamp(12.5px, 1.2vw, 14px)">Hand-Picked</Stamp>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(28px, 5vw, 80px)",
          alignItems: "end",
          marginBottom: "clamp(36px, 5vw, 60px)",
        }}
      >
        <Ink>
          <h2 style={{ margin: 0 }}>
            <FormCaps size="clamp(44px, 6.6vw, 100px)">Why</FormCaps>
            <FormCaps size="clamp(44px, 6.6vw, 100px)" color={S.cobalt}>300?</FormCaps>
          </h2>
        </Ink>
        <Ink delay={0.1}>
          <p style={{ margin: 0, fontFamily: typedFace, fontSize: "clamp(14px, 1.35vw, 16.5px)", lineHeight: 1.75, color: S.ink }}>
            When God sent Gideon to face an army, He cut him down to 300. Not
            the most people — the most committed. We&apos;re handpicking 300
            creatives to set the culture and DNA of everything this becomes.{" "}
            <em style={{ fontFamily: scriptFace, fontStyle: "italic", color: S.cobalt }}>
              You&apos;re not early. You&apos;re founding.
            </em>
          </p>
        </Ink>
      </div>

      <Ink amount={0.2}>
        <TakeCounter accepted={stats.accepted} applied={stats.applied} />
      </Ink>

      {/* founding terms as ruled line items */}
      <div style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
        <Ink>
          <div style={{ borderBottom: `2px solid ${S.cobalt}`, paddingBottom: 8, marginBottom: 4 }}>
            <span className="ka7-label">Founding terms — included with every seat</span>
          </div>
        </Ink>
        {PERKS.map(([title, body], i) => (
          <Ink key={title} delay={i * 0.06}>
            <div
              className="ka7-row ka7-perk"
              style={{
                display: "grid",
                gridTemplateColumns: "22px minmax(140px, 240px) 1fr",
                gap: "clamp(12px, 2.5vw, 32px)",
                alignItems: "baseline",
                padding: "16px 2px",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, border: `1.5px solid ${S.cobalt}`, borderRadius: 3, transform: "translateY(3px)" }}>
                <IconCheck />
              </span>
              <span style={{ fontFamily: formFace, fontVariationSettings: '"wdth" 118', fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(13.5px, 1.35vw, 17px)", letterSpacing: "0.03em", color: S.ink }}>
                {title}
              </span>
              <span className="ka7-typed" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", lineHeight: 1.65, color: S.faint }}>
                {body}
              </span>
            </div>
          </Ink>
        ))}
      </div>
    </Sheet>
  );
}

/* ─────────────────── ROUTING: THE PROCESS STAMPS ─────────────────── */

const ROUTING: [string, string, string][] = [
  ["RECEIVED", "Apply", "A few typed fields and one voice note — why do you create? Under two minutes."],
  ["REVIEWED", "Personal review", "A real person listens to every application. No algorithms. 24–48 hours."],
  ["BOOKED", "The invitation", "If it's a yes, you're in for life — founding email, badge, and access."],
  ["VOUCHING", "Bring your people", "Your personal link fast-tracks the creatives you believe in."],
];

export function Routing() {
  return (
    <Sheet>
      <div style={{ paddingTop: 12, marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <span className="ka7-label">Routing — how this sheet gets processed</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
        {ROUTING.map(([stamp, title, body], i) => (
          <Ink key={stamp} delay={i * 0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, borderTop: `1px solid ${S.rule}`, paddingTop: 18 }}>
              <Stamp
                rot={i % 2 === 0 ? -5 : 4}
                delay={i * 0.12}
                color={i === 2 ? S.red : S.cobalt}
                size="clamp(13px, 1.3vw, 16px)"
                style={{ alignSelf: "flex-start" }}
              >
                {stamp}
              </Stamp>
              <span style={{ fontFamily: formFace, fontVariationSettings: '"wdth" 118', fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(15px, 1.5vw, 19px)", color: S.ink }}>
                {title}
              </span>
              <span className="ka7-typed" style={{ fontSize: "clamp(12.5px, 1.2vw, 14.5px)", lineHeight: 1.65, color: S.faint }}>
                {body}
              </span>
            </div>
          </Ink>
        ))}
      </div>
    </Sheet>
  );
}

/* ─────────────────── MEMO: FROM THE FOUNDERS ─────────────────── */

export function FounderMemo() {
  return (
    <Sheet>
      <div style={{ paddingTop: 12, marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <span className="ka7-label">Memo — from the engineers of record</span>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Ink>
          <div style={{ border: `1.5px solid ${S.ink}`, borderRadius: 6, background: "#FFFFFF", padding: "clamp(24px, 4vw, 52px)", boxShadow: "0 2px 0 rgba(16,19,24,0.14), 0 20px 40px -26px rgba(16,19,24,0.25)" }}>
            {[
              "We're David and Cara. We've spent years watching the most gifted people we know — worship leaders, producers, engineers, filmmakers — carry callings with nowhere to carry them together.",
              "The people building what the Kingdom will sing next have been building alone, in bedrooms and basements, wondering if anyone else is out there.",
              "Kingdom Artists is our answer. Not another feed. A home — where your gift is seen, your people are findable, and the most beautiful work gets made together, for the God who gave it.",
              "We're reading every application ourselves. If this is you, we can't wait to meet you.",
            ].map((p, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "1.1em 0 0", fontFamily: typedFace, fontSize: "clamp(14px, 1.35vw, 16.5px)", lineHeight: 1.8, color: S.ink }}>
                {p}
              </p>
            ))}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginTop: "clamp(24px, 3vw, 40px)", flexWrap: "wrap" }}>
              <div>
                <p style={{ margin: 0, fontFamily: scriptFace, fontStyle: "italic", fontSize: "clamp(24px, 2.6vw, 36px)", color: S.cobalt }}>
                  — David &amp; Cara
                </p>
                <p className="ka7-label" style={{ margin: "6px 0 0" }}>Founders · Kingdom Artists</p>
              </div>
              <Stamp rot={5} size="clamp(12.5px, 1.2vw, 14px)">Signed</Stamp>
            </div>
          </div>
        </Ink>
      </div>
    </Sheet>
  );
}

/* ─────────────────── Q&A BLOCK ─────────────────── */

const FAQS: [string, string][] = [
  ["Does it cost anything?", "No. The Founding 300 are locked in for life, free — before pricing ever exists. That's the whole point of being founding."],
  ["Who is this for?", "Creatives who build with God, for God. Music-first — singers, songwriters, worship leaders, producers, engineers — plus filmmakers, photographers, designers, and writers who carry the same calling."],
  ["What happens after I apply?", "A real person (David or Cara) reviews your application — including your voice note — within 24 to 48 hours. If it's a yes, you'll get your acceptance email with your founding access and personal vouch link."],
  ["What exactly is the platform?", "A home for Kingdom creatives: a profile built to showcase your gift, discovery by craft and city, direct connection, collabs, and drops. Founders get in first and shape everything."],
  ["What does 'vouched' mean?", "Every accepted member gets a personal link. When you apply through someone's link, they've put their name on yours — and your application moves to the front of the line."],
  ["I'm not a musician. Can I still apply?", "Yes. We're music-first, not music-only. If you create with purpose — film, photo, design, words — this home is being built for you too."],
];

export function QaBlock() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Sheet>
      <div style={{ paddingTop: 12, marginBottom: "clamp(28px, 4vw, 48px)" }}>
        <span className="ka7-label">Q&amp;A — noted on the back of the sheet</span>
      </div>
      <div style={{ maxWidth: 780, margin: "0 auto", borderTop: `1px solid ${S.rule}` }}>
        {FAQS.map(([q, a], i) => (
          <div key={q} className="ka7-row">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "18px 2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                color: S.ink,
              }}
            >
              <span style={{ fontFamily: formFace, fontVariationSettings: '"wdth" 112', fontWeight: 700, fontSize: "clamp(14.5px, 1.5vw, 18px)" }}>
                {q}
              </span>
              <IconPlus open={open === i} />
            </button>
            <div style={{ display: "grid", gridTemplateRows: open === i ? "1fr" : "0fr", transition: "grid-template-rows 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ overflow: "hidden" }}>
                <p className="ka7-typed" style={{ margin: "0 0 20px", fontSize: "clamp(13px, 1.25vw, 15px)", lineHeight: 1.75, color: S.faint, maxWidth: 640 }}>
                  {a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/* ─────────────────── SIGN HERE: THE CLOSER ─────────────────── */

export function SignHere() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <Sheet id="apply" style={{ paddingBottom: 0 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div style={{ paddingTop: 12, marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <span className="ka7-label">Final field — for such a time as this</span>
        </div>

        <Ink>
          <h2 style={{ margin: "0 0 clamp(20px, 3vw, 32px)" }}>
            <FormCaps size="clamp(36px, 6vw, 88px)">You didn&apos;t find</FormCaps>
            <FormCaps size="clamp(36px, 6vw, 88px)">this sheet</FormCaps>
            <FormCaps size="clamp(36px, 6vw, 88px)" color={S.cobalt}>by accident.</FormCaps>
          </h2>
        </Ink>
        <Ink>
          <p style={{ margin: "0 auto clamp(32px, 4vw, 48px)", maxWidth: 460, fontFamily: typedFace, fontSize: "clamp(13.5px, 1.35vw, 16px)", lineHeight: 1.75, color: S.ink }}>
            300 seats for creatives who build with God, for God. No algorithms —
            our team reads every application personally.
          </p>
        </Ink>

        {/* the signature line draws itself */}
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <svg ref={ref} viewBox="0 0 480 44" width="100%" height="44" fill="none" aria-hidden style={{ display: "block", marginBottom: -8 }}>
            <motion.path
              d="M8 34 C 60 18, 96 40, 150 28 S 260 12, 320 26 S 440 34, 472 24"
              stroke={S.cobalt}
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            />
          </svg>
          <div style={{ borderTop: `2px solid ${S.ink}`, paddingTop: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <SignLink wide>Begin Your Application →</SignLink>
            <span className="ka7-typed" style={{ fontSize: 11.5, color: S.faint }}>
              Takes under two minutes. Every application is read by a real person.
            </span>
          </div>
        </div>
      </div>

      {/* sheet footer */}
      <footer
        style={{
          maxWidth: 1180,
          margin: "clamp(64px, 9vw, 130px) auto 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          borderTop: `2px solid ${S.cobalt}`,
          padding: "22px 0 34px",
        }}
      >
        <Wordmark size={18} />
        <span className="ka7-typed" style={{ fontSize: 11.5, color: S.faint }}>
          © 2026 KINGDOM ARTISTS · SHEET NO. 001 · BUILT WITH PURPOSE
        </span>
      </footer>
    </Sheet>
  );
}
