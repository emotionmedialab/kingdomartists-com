"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Reveal } from "./reveal";

const serif = "var(--font-heading), Georgia, serif";

const PROFILES = [
  { src: "/characters/01-songwriter-web.jpg", craft: "Songwriter", city: "Nashville", tag: "Open to co-writes" },
  { src: "/characters/02-producer-web.jpg", craft: "Producer", city: "Atlanta", tag: "Looking for vocalists" },
  { src: "/characters/03-musician-web.jpg", craft: "Musician", city: "Miami", tag: "Session-ready" },
  { src: "/characters/04-engineer-web.jpg", craft: "Engineer", city: "Los Angeles", tag: "Mixing & mastering" },
  { src: "/characters/05-filmmaker-web.jpg", craft: "Filmmaker", city: "New York", tag: "Building a crew" },
  { src: "/characters/06-photographer-web.jpg", craft: "Photographer", city: "Dallas", tag: "Open to collab" },
];

const PILLARS = [
  {
    title: "Be found",
    body: "A profile that presents your work the way it deserves — searchable by craft, city, and calling.",
  },
  {
    title: "Find your people",
    body: "Discover and connect with creatives who share your standard and your faith.",
  },
  {
    title: "Build together",
    body: "Collaborations, drops, and resources that turn connections into work that matters.",
  },
];

/**
 * "What We're Building" — immersive 3D stage. The six character profiles
 * float in perspective as platform profile cards; the whole stage tilts
 * toward the cursor, each card sits at its own depth, and scroll drifts
 * the two rows in opposite directions.
 */
export function Platform() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // cursor tilt for the whole 3D stage
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    scene.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  }
  function onLeave() {
    const scene = sceneRef.current;
    if (scene) scene.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  // scroll drift — cards slide laterally at different depths
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = stageRef.current;
    if (!stage) return;
    const cards = Array.from(
      stage.querySelectorAll<HTMLDivElement>("[data-card]")
    );
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        const r = stage.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (vh / 2 - (r.top + r.height / 2)) / vh; // -0.5..0.5-ish
        cards.forEach((card, i) => {
          const depth = parseFloat(card.dataset.depth || "0");
          const dir = i % 2 === 0 ? 1 : -1;
          card.style.translate = `${(p * dir * (24 + depth * 0.18)).toFixed(1)}px ${(p * -30 * (depth / 120)).toFixed(1)}px`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        padding:
          "clamp(80px, 12vw, 180px) clamp(20px, 5vw, 64px) clamp(40px, 6vw, 100px)",
        overflow: "hidden",
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
            What We&apos;re Building
          </span>
          <span
            style={{
              fontFamily: serif,
              fontSize: 14,
              color: "rgba(22,20,15,0.45)",
            }}
          >
            03
          </span>
        </div>

        <Reveal>
          <h2
            style={{
              margin: "0 0 clamp(24px, 3vw, 40px)",
              maxWidth: 900,
              fontFamily: serif,
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 92px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#16140F",
            }}
          >
            A home,{" "}
            <em style={{ fontWeight: 400, color: "rgba(22,20,15,0.55)" }}>
              not another feed.
            </em>
          </h2>
        </Reveal>
        <Reveal>
          <p
            style={{
              margin: "0 0 clamp(48px, 7vw, 96px)",
              maxWidth: 640,
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.8,
              color: "#444034",
            }}
          >
            Kingdom Artists is a platform where every creative has a profile
            built to showcase their gift — and a community built to find each
            other. Search by craft, city, or calling. Find the producer your
            song needs. The filmmaker your vision needs. The people your faith
            has been missing. Then build together.
          </p>
        </Reveal>

        {/* 3D STAGE */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            perspective: 1400,
            marginBottom: "clamp(56px, 8vw, 110px)",
          }}
        >
          <div
            ref={sceneRef}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.35s ease-out",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
              gap: "clamp(12px, 1.8vw, 24px)",
            }}
          >
            {PROFILES.map((p, i) => {
              const depth = [90, 30, 120, 50, 140, 70][i];
              const tilt = [-4, 3, -2, 4, -3, 2][i];
              const lift = [0, 28, 10, 36, 4, 24][i];
              return (
                <div
                  key={p.craft}
                  data-card
                  data-depth={depth}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${hovered === i ? depth + 70 : depth}px) rotateZ(${hovered === i ? 0 : tilt * 0.4}deg) translateY(${lift - (hovered === i ? 14 : 0)}px)`,
                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "#FFFEFB",
                    border:
                      hovered === i
                        ? "1px solid rgba(184,135,43,0.65)"
                        : "1px solid rgba(22,20,15,0.14)",
                    boxShadow:
                      hovered === i
                        ? "0 40px 70px -30px rgba(184,135,43,0.45)"
                        : `0 ${12 + depth * 0.25}px ${30 + depth * 0.4}px -${18}px rgba(22,20,15,0.35)`,
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3 / 3.4",
                      overflow: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.craft}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: hovered === i ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(22,20,15,0.72)",
                        backdropFilter: "blur(6px)",
                        borderRadius: 999,
                        padding: "5px 10px",
                        fontSize: 9.5,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#E0B45C",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#1FA56B",
                        }}
                      />
                      {p.tag}
                    </span>
                  </div>
                  <div style={{ padding: "12px 14px 14px" }}>
                    <div
                      style={{
                        fontFamily: serif,
                        fontStyle: "italic",
                        fontSize: "clamp(16px, 1.4vw, 20px)",
                        color: "#16140F",
                      }}
                    >
                      {p.craft}
                    </div>
                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#6E6757",
                      }}
                    >
                      {p.city}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(28px, 4vw, 56px)",
          }}
        >
          {PILLARS.map((pillar) => (
            <Reveal
              key={pillar.title}
              style={{
                borderTop: "1px solid rgba(22,20,15,0.3)",
                paddingTop: 22,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 1.9vw, 28px)",
                  color: "#16140F",
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "#6E6757",
                }}
              >
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
