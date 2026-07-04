"use client";

import { useEffect, useState } from "react";
import { T, display, label, easeOut, ApplyButton } from "./ui";

function Line({ children, d, italic = false }: { children: string; d: number; italic?: boolean }) {
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.06em" }}>
      <span
        style={{
          display: "block",
          fontStyle: italic ? "italic" : "normal",
          fontWeight: italic ? 300 : undefined,
          color: italic ? T.gold : undefined,
          transform: "translateY(112%)",
          animation: `ka-rise 0.9s ${easeOut} ${d}s forwards`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const [applied, setApplied] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setApplied(d.applied))
      .catch(() => {});
  }, []);

  return (
    <header
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "clamp(96px, 14vh, 160px) clamp(20px, 5vw, 64px) clamp(48px, 8vh, 88px)",
        backgroundImage:
          "radial-gradient(1100px 700px at 85% -10%, rgba(201,169,106,0.13), transparent 60%), radial-gradient(800px 500px at -10% 110%, rgba(201,169,106,0.07), transparent 60%)",
        overflow: "hidden",
      }}
    >
      {/* badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          alignSelf: "flex-start",
          border: "1px solid rgba(201,169,106,0.35)",
          background: "rgba(201,169,106,0.06)",
          borderRadius: 999,
          padding: "9px 18px 9px 14px",
          marginBottom: "clamp(28px, 4vh, 48px)",
          opacity: 0,
          animation: `ka-fade 0.8s ${easeOut} 0.15s forwards`,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#1FA56B",
            animation: "ka-pulse 2.2s ease-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: label,
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: T.gold,
          }}
        >
          The Platform Is Coming · 300 Founding Spots
          {applied !== null && applied > 0 ? ` · ${applied} Applied` : ""}
        </span>
      </div>

      {/* headline */}
      <h1
        style={{
          margin: "0 0 clamp(28px, 4vh, 52px)",
          fontFamily: display,
          fontWeight: 400,
          fontSize: "clamp(46px, 9vw, 132px)",
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          color: T.ivory,
        }}
      >
        <Line d={0.4}>You Were Never</Line>
        <Line d={0.52}>Meant to Create</Line>
        <Line d={0.64} italic>
          Alone.
        </Line>
      </h1>

      {/* bottom row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(24px, 4vw, 64px)",
          borderTop: "1px solid rgba(201,169,106,0.18)",
          paddingTop: "clamp(24px, 3.5vh, 40px)",
        }}
      >
        <p
          style={{
            margin: 0,
            maxWidth: 600,
            fontSize: "clamp(15px, 1.25vw, 17.5px)",
            lineHeight: 1.75,
            color: T.muted,
            opacity: 0,
            animation: `ka-fade 0.9s ${easeOut} 1.05s forwards`,
          }}
        >
          The first person the Bible says was filled with the Spirit of God
          wasn&apos;t a priest or a king. It was an artist. And God didn&apos;t
          have him build alone. Kingdom Artists is the platform being built for
          creatives who build with God, for God — and it starts with 300.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: 0,
            animation: `ka-fade 0.9s ${easeOut} 1.25s forwards`,
          }}
        >
          <ApplyButton>Apply Now →</ApplyButton>
          <span
            style={{
              fontSize: 12,
              lineHeight: 1.6,
              maxWidth: 300,
              color: "rgba(245,241,232,0.4)",
            }}
          >
            Every accepted member gets a personal link to vouch for creatives
            they believe in.
          </span>
        </div>
      </div>
    </header>
  );
}
