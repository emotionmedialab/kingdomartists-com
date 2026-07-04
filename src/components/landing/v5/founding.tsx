"use client";

import { useEffect, useState } from "react";
import { T, display, label, Eyebrow, Reveal, sectionPad, inner, ApplyButton } from "./ui";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const PERKS = [
  ["01", "Locked In for Life", "Everything we ever build is yours. In before pricing exists. No paywalls. No expiration."],
  ["02", "Founder Status", "A mark never given again. Only 300 will ever carry it."],
  ["03", "First Eyes on Everything", "Founders shape every tool and drop before anyone else sees it."],
  ["04", "Creative Starter Kit", "Templates, assets, and resources to steward your gift from day one."],
];

const PROCESS = [
  ["Apply", "A few questions and one voice note: why do you create? Under two minutes."],
  ["Personal Review", "A real person listens to every application. No algorithms. 24–48 hours."],
  ["The Invitation", "If it's a yes, you're in for life — founding email, badge, and access."],
  ["Vouch Others In", "Your personal link fast-tracks the creatives you believe in. The 300 choose the family."],
];

export function Founding() {
  const [claimed, setClaimed] = useState(0);
  const displayed = useCountUp(claimed);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setClaimed(d.accepted || 0))
      .catch(() => {});
  }, []);

  return (
    <section style={sectionPad}>
      <div style={inner}>
        <Eyebrow num="03">Limited to 300</Eyebrow>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(32px, 5vw, 96px)",
            alignItems: "end",
            marginBottom: "clamp(44px, 6vw, 80px)",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 104px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: T.ivory,
              }}
            >
              Why 300?
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ margin: 0, fontSize: "clamp(15.5px, 1.4vw, 18px)", lineHeight: 1.8, color: T.muted }}>
              When God sent Gideon to face an army, He cut him down to 300. Not
              the most people. The most committed. We&apos;re handpicking 300
              creatives to set the culture and DNA of everything this becomes.{" "}
              <em style={{ fontFamily: display, color: T.ivory }}>
                You&apos;re not early. You&apos;re founding.
              </em>
            </p>
          </Reveal>
        </div>

        {/* counter */}
        <Reveal style={{ marginBottom: "clamp(48px, 7vw, 90px)" }}>
          <div
            style={{
              border: "1px solid rgba(30,69,201,0.35)",
              borderRadius: 18,
              background: T.surface,
              padding: "clamp(24px, 3.5vw, 44px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: "clamp(18px, 2.5vw, 30px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span
                  style={{
                    fontFamily: display,
                    fontWeight: 400,
                    fontSize: "clamp(54px, 6.5vw, 96px)",
                    lineHeight: 1,
                    color: T.cta,
                  }}
                >
                  {displayed}
                </span>
                <span style={{ fontFamily: display, fontSize: "clamp(20px, 2vw, 28px)", color: "rgba(16,17,20,0.5)" }}>
                  of 300
                </span>
              </div>
              <span
                style={{
                  fontFamily: label,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: T.gold,
                }}
              >
                {claimed === 0 ? "All spots open · be the first" : `Spots claimed · ${300 - claimed} left`}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "clamp(34px, 4vw, 54px)",
                overflow: "hidden",
                backgroundImage: "linear-gradient(90deg, rgba(16,17,20,0.16) 0px, rgba(16,17,20,0.16) 1.5px, transparent 1.5px)",
                backgroundSize: "calc(100% / 300) 100%",
                backgroundRepeat: "repeat-x",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: `calc(100% / 300 * ${Math.max(claimed, 1)})`,
                  backgroundImage: "linear-gradient(90deg, #1E45C9 0px, #1E45C9 1.5px, transparent 1.5px)",
                  backgroundSize: `calc(100% / ${Math.max(claimed, 1)}) 100%`,
                  boxShadow: "0 0 12px rgba(30,69,201,0.6)",
                  animation: claimed === 0 ? "ka-tickpulse 2.4s ease-in-out infinite" : undefined,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "30%",
                  background: "linear-gradient(90deg, transparent, rgba(30,69,201,0.14), transparent)",
                  animation: "ka-sweep 4.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* perks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(14px, 1.8vw, 24px)",
            marginBottom: "clamp(56px, 8vw, 110px)",
          }}
        >
          {PERKS.map(([num, title, body]) => (
            <Reveal key={num}>
              <div className="ka5-card" style={{ borderRadius: 18, padding: "clamp(22px, 2.4vw, 34px)", height: "100%", boxSizing: "border-box" }}>
                <span style={{ display: "block", fontFamily: display, fontSize: 14, color: T.gold, marginBottom: 20 }}>{num}</span>
                <h3 style={{ margin: "0 0 10px", fontFamily: display, fontWeight: 400, fontSize: "clamp(21px, 1.9vw, 27px)", lineHeight: 1.15, color: T.ivory }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: T.muted }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* application process */}
        <Eyebrow num="04">How It Works</Eyebrow>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            marginBottom: "clamp(44px, 6vw, 72px)",
          }}
        >
          {PROCESS.map(([title, body], i) => (
            <Reveal key={title}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: "1px solid rgba(30,69,201,0.5)",
                      fontFamily: display,
                      fontSize: 14,
                      color: T.gold,
                    }}
                  >
                    {i + 1}
                  </span>
                  {i < PROCESS.length - 1 && (
                    <span className="ka5-process-line" style={{ flex: 1, height: 1, background: T.border }} />
                  )}
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: display, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(19px, 1.7vw, 24px)", color: T.ivory }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: T.muted }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ textAlign: "center" }}>
          <ApplyButton wide>Apply Now →</ApplyButton>
          <p style={{ margin: "14px 0 0", fontSize: 12, color: "rgba(16,17,20,0.4)" }}>
            Takes under two minutes. A real person reviews every application.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
