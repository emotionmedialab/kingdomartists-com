"use client";

import { T, display, label, Eyebrow, Reveal, sectionPad, inner } from "./ui";

const MOCK_PROFILES = [
  { src: "/characters/01-songwriter-web.jpg", name: "Songwriter", city: "Nashville", tag: "Open to co-writes" },
  { src: "/characters/02-producer-web.jpg", name: "Producer", city: "Atlanta", tag: "Looking for vocalists" },
  { src: "/characters/04-engineer-web.jpg", name: "Engineer", city: "Los Angeles", tag: "Mixing & mastering" },
];

const TIMELINE = [
  {
    when: "At Launch",
    items: ["Your artist profile — built to showcase your gift", "Discovery: search by craft, city, and calling", "Direct connect with the Founding 300"],
  },
  {
    when: "First 30 Days",
    items: ["Collab boards — find the producer your song needs", "Creative Starter Kit drops for founders", "Founder-only sessions with David & Cara"],
  },
  {
    when: "First 90 Days",
    items: ["Showcases: your work, put in front of the family", "City gatherings where the 300 are concentrated", "The roadmap you help us write"],
  },
];

/** "What we're building" — in-brand product mockup + founding benefits timeline. */
export function Platform() {
  return (
    <section style={sectionPad}>
      <div style={inner}>
        <Eyebrow num="02">The Platform · Coming 2026</Eyebrow>

        <Reveal>
          <h2
            style={{
              margin: "0 0 clamp(20px, 2.5vw, 36px)",
              maxWidth: 900,
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(38px, 5.8vw, 88px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: T.ivory,
            }}
          >
            A home,{" "}
            <em style={{ fontWeight: 300, color: T.gold }}>not another feed.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p
            style={{
              margin: "0 0 clamp(44px, 6vw, 80px)",
              maxWidth: 620,
              fontSize: "clamp(15.5px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: T.muted,
            }}
          >
            Kingdom Artists is a platform where every creative has a profile
            built to showcase their gift — and a community built to find each
            other. Search by craft, city, or calling. Find the producer your
            song needs. The filmmaker your vision needs. The people your faith
            has been missing. Then build together.
          </p>
        </Reveal>

        {/* product mockup — browser frame */}
        <Reveal style={{ marginBottom: "clamp(48px, 7vw, 96px)" }}>
          <div
            style={{
              borderRadius: 16,
              border: `1px solid ${T.border}`,
              background: T.surface,
              overflow: "hidden",
              boxShadow: "0 60px 120px -60px rgba(0,0,0,0.8), 0 0 80px -40px rgba(201,169,106,0.25)",
            }}
          >
            {/* title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              {["#3d3833", "#3d3833", "#3d3833"].map((c, i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
              <span
                style={{
                  margin: "0 auto",
                  fontFamily: label,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "rgba(245,241,232,0.35)",
                }}
              >
                app.kingdomartists.com — coming soon
              </span>
            </div>

            {/* app UI */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(140px, 200px) 1fr", minHeight: 320 }}>
              {/* sidebar */}
              <div
                className="ka5-mock-sidebar"
                style={{ borderRight: `1px solid ${T.border}`, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span style={{ fontFamily: display, fontSize: 15, color: T.ivory, marginBottom: 14 }}>Kingdom Artists</span>
                {["Discover", "My Profile", "Messages", "Collabs", "Drops"].map((item, i) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12.5,
                      padding: "8px 10px",
                      borderRadius: 8,
                      color: i === 0 ? T.cta : "rgba(245,241,232,0.5)",
                      background: i === 0 ? "rgba(201,169,106,0.1)" : "transparent",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {/* discovery grid */}
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: display, fontSize: 17, color: T.ivory }}>Discover creatives</span>
                  <span
                    style={{
                      fontFamily: label,
                      fontSize: 10.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.4)",
                      border: `1px solid ${T.border}`,
                      borderRadius: 999,
                      padding: "6px 12px",
                    }}
                  >
                    Craft · City · Calling
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
                  {MOCK_PROFILES.map((p) => (
                    <div key={p.name} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}`, background: T.bg }}>
                      <div style={{ position: "relative" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt="" style={{ display: "block", width: "100%", aspectRatio: "3/2.6", objectFit: "cover", objectPosition: "top" }} />
                        <span
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            fontSize: 8.5,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: T.cta,
                            background: "rgba(12,10,9,0.75)",
                            borderRadius: 999,
                            padding: "4px 8px",
                          }}
                        >
                          {p.tag}
                        </span>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <span style={{ display: "block", fontFamily: display, fontStyle: "italic", fontSize: 14, color: T.ivory }}>{p.name}</span>
                        <span style={{ fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,241,232,0.4)" }}>{p.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* founding timeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(16px, 2vw, 28px)",
          }}
        >
          {TIMELINE.map((t) => (
            <Reveal key={t.when}>
              <div className="ka5-card" style={{ borderRadius: 14, padding: "clamp(22px, 2.4vw, 36px)", height: "100%", boxSizing: "border-box" }}>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontFamily: label,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  {t.when}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {t.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.6, color: T.muted }}>
                      <span style={{ color: T.gold, flexShrink: 0 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
