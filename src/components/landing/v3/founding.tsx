"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Reveal } from "./reveal";
import { MagneticLink } from "./magnetic";

const serif = "var(--font-heading), Georgia, serif";

function sealPoints() {
  const pts: string[] = [];
  for (let i = 0; i < 48; i++) {
    const r = i % 2 ? 19.5 : 23.5;
    const a = (i * Math.PI) / 24 - Math.PI / 2;
    pts.push(
      (24 + r * Math.cos(a)).toFixed(2) + "," + (24 + r * Math.sin(a)).toFixed(2)
    );
  }
  return pts.join(" ");
}

const ICONS = {
  lock: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8872B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
      <path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 v3" />
    </svg>
  ),
  seal: (
    <svg width="32" height="32" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="kaGoldSeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C76F" />
          <stop offset="0.55" stopColor="#B8872B" />
          <stop offset="1" stopColor="#E6C76F" />
        </linearGradient>
      </defs>
      <polygon points={sealPoints()} fill="url(#kaGoldSeal)" />
      <path d="M16.5 24.5 L22 30 L32.5 18.5" fill="none" stroke="#FAF8F4" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  eye: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8872B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12 C7 5.8 17 5.8 21.5 12 C17 18.2 7 18.2 2.5 12 Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  layers: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8872B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 L21 8.5 L12 13.5 L3 8.5 Z" />
      <path d="M3 12.5 L12 17.5 L21 12.5" />
      <path d="M3 16.5 L12 21.5 L21 16.5" />
    </svg>
  ),
  chevrons: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E0B45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 6 L11.5 12 L5.5 18" />
      <path d="M12.5 6 L18.5 12 L12.5 18" />
    </svg>
  ),
};

const PERKS = [
  { num: "01", icon: ICONS.lock, title: "Locked In for Life", body: "Everything we ever build is yours. In before pricing exists. No paywalls. No expiration.", minHeight: "clamp(150px, 20vw, 300px)" },
  { num: "02", icon: ICONS.seal, title: "Founder Status", body: "A mark never given again. Only 300 will ever carry it.", minHeight: "clamp(150px, 24vw, 360px)" },
  { num: "03", icon: ICONS.eye, title: "First Eyes on Everything", body: "Founders shape every tool and drop before anyone else sees it.", minHeight: "clamp(150px, 18vw, 280px)" },
  { num: "04", icon: ICONS.layers, title: "Creative Starter Kit", body: "Templates, assets, and resources to steward your gift from day one.", minHeight: "clamp(140px, 16vw, 250px)" },
];

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) { setValue(0); return; }
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

export function Founding() {
  const counterRef = useRef<HTMLDivElement>(null);
  const [claimed, setClaimed] = useState(0);
  const displayed = useCountUp(claimed);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setClaimed(data.accepted || 0);
        }
      } catch {
        // Supabase not connected yet — stay at 0
      }
    }
    fetchStats();
  }, []);

  function onTilt(e: MouseEvent<HTMLDivElement>) {
    const el = counterRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
  }

  function onTiltReset() {
    const el = counterRef.current;
    if (el)
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  const spotsLeft = 300 - claimed;

  return (
    <section
      style={{
        padding:
          "clamp(80px, 12vw, 180px) clamp(20px, 5vw, 64px) clamp(120px, 16vw, 240px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(22,20,15,0.14)",
            paddingTop: 18,
            marginBottom: "clamp(40px, 6vw, 88px)",
          }}
        >
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(22,20,15,0.45)",
            }}
          >
            Limited to 300
          </span>
          <span style={{ fontFamily: serif, fontSize: 14, color: "rgba(22,20,15,0.45)" }}>
            04
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(32px, 5vw, 96px)",
            alignItems: "end",
            marginBottom: "clamp(48px, 7vw, 96px)",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: serif,
                fontWeight: 500,
                fontSize: "clamp(48px, 7vw, 110px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#16140F",
              }}
            >
              Why 300?
            </h2>
          </Reveal>
          <Reveal>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.8,
                color: "#444034",
              }}
            >
              When God sent Gideon to face an army, He cut him down to 300. Not
              the most people. The most committed. We&apos;re handpicking 300
              creatives to set the culture and DNA of everything this becomes.{" "}
              <em style={{ fontFamily: serif }}>
                You&apos;re not early. You&apos;re founding.
              </em>
            </p>
          </Reveal>
        </div>

        {/* counter object */}
        <Reveal>
          <div
            ref={counterRef}
            onMouseMove={onTilt}
            onMouseLeave={onTiltReset}
            style={{
              border: "1px solid rgba(22,20,15,0.18)",
              borderRadius: 14,
              background: "#FFFEFB",
              padding: "clamp(24px, 3.5vw, 48px)",
              marginBottom: "clamp(56px, 8vw, 110px)",
              transition: "transform 0.25s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: "clamp(20px, 3vw, 36px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span
                  style={{
                    fontFamily: serif,
                    fontWeight: 500,
                    fontSize: "clamp(54px, 6.5vw, 100px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#B8872B",
                  }}
                >
                  {displayed}
                </span>
                <span
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(20px, 2vw, 30px)",
                    color: "rgba(22,20,15,0.55)",
                  }}
                >
                  of 300
                </span>
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#B8872B",
                }}
              >
                {claimed === 0
                  ? "All spots open. Be the first."
                  : `${spotsLeft} spots left.`}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "clamp(36px, 4.5vw, 60px)",
                overflow: "hidden",
                backgroundImage:
                  "linear-gradient(90deg, rgba(22,20,15,0.2) 0px, rgba(22,20,15,0.2) 1.5px, transparent 1.5px)",
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
                  background:
                    "linear-gradient(90deg, #B8872B 0px, #B8872B 1.5px, transparent 1.5px)",
                  backgroundSize: "calc(100% / " + Math.max(claimed, 1) + ") 100%",
                  backgroundRepeat: "repeat-x",
                  boxShadow: "0 0 12px rgba(184,135,43,0.6)",
                  animation: "ka-tickpulse 2.4s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "30%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(184,135,43,0.16), transparent)",
                  animation: "ka-sweep 4.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* perk cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(16px, 2vw, 28px)",
            marginBottom: "clamp(48px, 7vw, 88px)",
          }}
        >
          {PERKS.map((perk) => (
            <Reveal key={perk.num}>
              <div
                className="ka-card"
                style={{
                  border: "1px solid rgba(22,20,15,0.14)",
                  borderRadius: 14,
                  padding: "clamp(24px, 2.6vw, 40px)",
                  minHeight: perk.minHeight,
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 32,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontFamily: serif, fontSize: 15, color: "#B8872B" }}>
                    {perk.num}
                  </span>
                  {perk.icon}
                </div>
                <div>
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontFamily: serif,
                      fontWeight: 500,
                      fontSize: "clamp(24px, 2.2vw, 33px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      color: "#16140F",
                    }}
                  >
                    {perk.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#6E6757" }}>
                    {perk.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* 05 — full-width dark feature card */}
          <Reveal style={{ gridColumn: "1 / -1" }}>
            <div
              className="ka-card-dark"
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(224,180,92,0.5)",
                borderRadius: 14,
                background: "#16140F",
                backgroundImage:
                  "radial-gradient(560px 300px at 85% -20%, rgba(224,180,92,0.22), transparent 70%)",
                padding: "clamp(24px, 2.6vw, 40px)",
                minHeight: "clamp(150px, 14vw, 220px)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 32,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: serif, fontSize: 15, color: "#E0B45C" }}>
                  05
                </span>
                {ICONS.chevrons}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: serif,
                    fontWeight: 500,
                    fontSize: "clamp(26px, 2.6vw, 40px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#F4EFE5",
                  }}
                >
                  The Power to Vouch
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: 480,
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "rgba(244,239,229,0.62)",
                  }}
                >
                  Your personal link fast-tracks creatives you believe in. The
                  300 choose the family.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <MagneticLink
            href="/apply"
            appendSearch
            className="ka-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "min(100%, 360px)",
              boxSizing: "border-box",
              background: "#16140F",
              color: "#FAF8F4",
              borderRadius: 999,
              padding: "19px 48px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Apply Now →
          </MagneticLink>
          <span style={{ fontSize: 12, color: "rgba(22,20,15,0.45)" }}>
            Takes under a minute. A real person reads every application.
          </span>
        </div>
      </div>
    </section>
  );
}
