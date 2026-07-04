"use client";

import { useState } from "react";
import { T, display, label, Eyebrow, Reveal, sectionPad, inner, ApplyButton } from "./ui";

export function FounderLetter() {
  return (
    <section style={{ ...sectionPad, paddingTop: 0 }}>
      <div style={{ ...inner, maxWidth: 800 }}>
        <Eyebrow num="05">A Note From the Founders</Eyebrow>
        <Reveal>
          <div
            style={{
              borderLeft: `2px solid ${T.gold}`,
              paddingLeft: "clamp(20px, 3vw, 40px)",
            }}
          >
            <p style={letterP}>
              We&apos;re David and Cara. We&apos;ve spent years watching the
              most gifted people we know — worship leaders, producers,
              engineers, filmmakers — carry callings with nowhere to carry them
              together.
            </p>
            <p style={letterP}>
              The industry has rooms. The church has stages. But the people
              building what the Kingdom will sing next? They&apos;ve been
              building alone, in bedrooms and basements, wondering if anyone
              else is out there.
            </p>
            <p style={letterP}>
              Kingdom Artists is our answer. Not another feed. A home — where
              your gift is seen, your people are findable, and the most
              beautiful work gets made together, for the God who gave it.
            </p>
            <p style={letterP}>
              We&apos;re reading every application ourselves. If this is you,
              we can&apos;t wait to meet you.
            </p>
            <p
              style={{
                margin: "28px 0 0",
                fontFamily: display,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.2vw, 30px)",
                color: T.ivory,
              }}
            >
              — David &amp; Cara
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: label,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: T.gold,
              }}
            >
              Founders, Kingdom Artists
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const letterP: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "clamp(15.5px, 1.4vw, 18px)",
  lineHeight: 1.85,
  color: T.muted,
};

const FAQS = [
  ["Does it cost anything?", "No. The Founding 300 are locked in for life, free — before pricing ever exists. That's the whole point of being founding."],
  ["Who is this for?", "Creatives who build with God, for God. Music-first — singers, songwriters, worship leaders, producers, engineers — plus filmmakers, photographers, designers, and writers who carry the same calling."],
  ["What happens after I apply?", "A real person (David or Cara) reviews your application — including your voice note — within 24 to 48 hours. If it's a yes, you'll get your acceptance email with your founding access and personal vouch link."],
  ["What exactly is the platform?", "A home for Kingdom creatives: a profile built to showcase your gift, discovery by craft and city, direct connection, collabs, and drops. Founders get in first and shape everything."],
  ["What does 'vouched' mean?", "Every accepted member gets a personal link. When you apply through someone's link, they've put their name on yours — and your application moves to the front of the line."],
  ["I'm not a musician. Can I still apply?", "Yes. We're music-first, not music-only. If you create with purpose — film, photo, design, words — this home is being built for you too."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ ...sectionPad, paddingTop: 0 }}>
      <div style={{ ...inner, maxWidth: 800 }}>
        <Eyebrow num="06">Questions</Eyebrow>
        <div style={{ borderTop: `1px solid ${T.border}` }}>
          {FAQS.map(([q, a], i) => (
            <div key={q} className="ka5-faq-item">
              <button className="ka5-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontFamily: display, fontSize: "clamp(17px, 1.6vw, 21px)", fontWeight: 400 }}>{q}</span>
                <span
                  style={{
                    color: T.gold,
                    fontSize: 20,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: open === i ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p style={{ margin: "0 0 22px", fontSize: 14.5, lineHeight: 1.75, color: T.muted, maxWidth: 640 }}>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closer() {
  return (
    <section
      id="apply"
      style={{
        position: "relative",
        padding: "clamp(80px, 12vw, 180px) clamp(20px, 5vw, 64px) 0",
        backgroundImage: "radial-gradient(900px 500px at 50% 0%, rgba(30,69,201,0.12), transparent 65%)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              margin: "0 0 22px",
              fontFamily: label,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.gold,
            }}
          >
            For Such a Time as This
          </p>
        </Reveal>
        <Reveal>
          <h2
            style={{
              margin: "0 0 26px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(38px, 5.6vw, 76px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: T.ivory,
            }}
          >
            You didn&apos;t find this page{" "}
            <em style={{ display: "block", fontWeight: 300, color: T.gold }}>by accident.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ margin: "0 auto clamp(32px, 4vw, 48px)", maxWidth: 460, fontSize: 15.5, lineHeight: 1.75, color: T.muted }}>
            300 spots for creatives who build with God, for God. No algorithms.
            Our team reads every application personally.
          </p>
        </Reveal>
        <Reveal>
          <ApplyButton wide>Begin Your Application →</ApplyButton>
          <p style={{ margin: "20px 0 0", fontSize: 12, color: "rgba(16,17,20,0.35)" }}>
            Every application is read by a real person.
          </p>
        </Reveal>
      </div>

      <footer
        style={{
          maxWidth: 1200,
          margin: "clamp(80px, 11vw, 160px) auto 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderTop: `1px solid ${T.border}`,
          padding: "28px 0 36px",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: display, fontWeight: 400, fontSize: 19, color: T.ivory }}>Kingdom Artists</span>
        <span style={{ fontSize: 12.5, color: "rgba(16,17,20,0.35)" }}>© 2026 Kingdom Artists. Built with purpose.</span>
      </footer>
    </section>
  );
}
