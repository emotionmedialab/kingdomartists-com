"use client";

import { T, display, label, Eyebrow, Reveal, sectionPad, inner } from "./ui";

const MOCK_PROFILES = [
  { src: "/characters/01-songwriter-web.jpg", name: "Songwriter", city: "Nashville", tag: "Open to co-writes", tagColor: "#4FBF8B", featured: true },
  { src: "/characters/02-producer-web.jpg", name: "Producer", city: "Atlanta", tag: "Looking for vocalists", tagColor: "#C96A7A", featured: false },
  { src: "/characters/04-engineer-web.jpg", name: "Engineer", city: "Los Angeles", tag: "Mixing & mastering", tagColor: "#6A8FC9", featured: false },
];

const FILTERS = ["All crafts", "Near me", "Looking for: vocalists", "Worship", "Film"];

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
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
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
              borderRadius: 20,
              border: `1px solid ${T.border}`,
              background: T.surface,
              overflow: "hidden",
              boxShadow: "0 60px 120px -60px rgba(16,17,20,0.16), 0 0 80px -40px rgba(30,69,201,0.25)",
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
              {["#D9D8D2", "#D9D8D2", "#D9D8D2"].map((c, i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
              <span
                style={{
                  margin: "0 auto",
                  fontFamily: label,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "rgba(16,17,20,0.35)",
                }}
              >
                app.kingdomartists.com — coming soon
              </span>
            </div>

            {/* app UI */}
            <div className="ka5-mock-grid" style={{ display: "grid", gridTemplateColumns: "minmax(140px, 190px) 1fr", minHeight: 340 }}>
              {/* sidebar */}
              <div
                className="ka5-mock-sidebar"
                style={{ borderRight: `1px solid ${T.border}`, padding: "18px 14px", display: "flex", flexDirection: "column", gap: 3 }}
              >
                <span style={{ fontFamily: display, fontSize: 15, color: T.ivory, marginBottom: 14 }}>Kingdom Artists</span>
                {["Discover", "Featured", "My Profile", "Messages", "Collabs", "Account"].map((item, i) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12.5,
                      padding: "7px 10px",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: i === 0 ? T.cta : "rgba(16,17,20,0.5)",
                      background: i === 0 ? "rgba(30,69,201,0.1)" : "transparent",
                    }}
                  >
                    {item}
                    {item === "Messages" && (
                      <span style={{ fontSize: 9, fontWeight: 700, background: T.cta, color: "#FFFFFF", borderRadius: 999, padding: "1px 6px" }}>3</span>
                    )}
                  </span>
                ))}
              </div>

              {/* main panel */}
              <div style={{ padding: "18px 20px" }}>
                {/* search */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    border: `1px solid ${T.border}`,
                    background: T.bg,
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: "rgba(16,17,20,0.35)", fontSize: 13 }}>⌕</span>
                  <span style={{ fontSize: 12.5, color: "rgba(16,17,20,0.4)" }}>
                    Search by craft, city, or calling...
                  </span>
                </div>
                {/* filter chips */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  {FILTERS.map((f, i) => (
                    <span
                      key={f}
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.04em",
                        borderRadius: 999,
                        padding: "5px 12px",
                        border: `1px solid ${i === 0 ? "rgba(30,69,201,0.6)" : T.border}`,
                        color: i === 0 ? T.cta : "rgba(16,17,20,0.5)",
                        background: i === 0 ? "rgba(30,69,201,0.08)" : "transparent",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: display, fontSize: 16, color: T.ivory }}>Featured creatives</span>
                  <span style={{ fontSize: 11, color: T.gold }}>See all →</span>
                </div>

                {/* profile cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
                  {MOCK_PROFILES.map((p) => (
                    <div key={p.name} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${p.featured ? "rgba(30,69,201,0.45)" : T.border}`, background: T.bg }}>
                      <div style={{ position: "relative" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt="" style={{ display: "block", width: "100%", aspectRatio: "3/2.4", objectFit: "cover", objectPosition: "top" }} />
                        <span
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            fontSize: 8.5,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: p.tagColor,
                            background: "rgba(255,255,255,0.92)",
                            borderRadius: 999,
                            padding: "4px 8px",
                          }}
                        >
                          {p.tag}
                        </span>
                        {p.featured && (
                          <span
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              fontSize: 8.5,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#FFFFFF",
                              background: T.cta,
                              borderRadius: 999,
                              padding: "4px 8px",
                            }}
                          >
                            ✦ Featured
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <span style={{ display: "block", fontFamily: display, fontStyle: "italic", fontSize: 14, color: T.ivory }}>{p.name}</span>
                        <span style={{ display: "block", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(16,17,20,0.4)", marginBottom: 8 }}>
                          {p.city}
                        </span>
                        <div style={{ display: "flex", gap: 6 }}>
                          <span style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "5px 0", background: T.cta, color: "#FFFFFF" }}>
                            Message
                          </span>
                          <span style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "5px 0", border: `1px solid ${T.border}`, color: "rgba(16,17,20,0.6)" }}>
                            View work
                          </span>
                        </div>
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
              <div className="ka5-card" style={{ borderRadius: 18, padding: "clamp(22px, 2.4vw, 36px)", height: "100%", boxSizing: "border-box" }}>
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
