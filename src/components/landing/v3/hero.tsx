"use client";

import { MagneticLink } from "./magnetic";

const serif = "var(--font-heading), Georgia, serif";
const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

function MaskedLine({
  children,
  delay,
  italic = false,
  last = false,
}: {
  children: string;
  delay: number;
  italic?: boolean;
  last?: boolean;
}) {
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        paddingBottom: last ? "0.1em" : "0.06em",
        marginBottom: last ? 0 : "-0.06em",
      }}
    >
      <span
        style={{
          display: "block",
          fontStyle: italic ? "italic" : "normal",
          fontWeight: italic ? 400 : undefined,
          transform: "translateY(112%)",
          animation: `ka-rise 0.9s ${easeOut} ${delay}s forwards`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <header
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding:
          "clamp(96px, 14vh, 160px) clamp(20px, 5vw, 64px) clamp(48px, 8vh, 88px)",
        backgroundImage:
          "radial-gradient(1100px 700px at 88% -8%, rgba(224,180,92,0.14), transparent 62%), radial-gradient(900px 600px at -12% 108%, rgba(224,180,92,0.09), transparent 60%)",
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
          border: "1px solid rgba(22,20,15,0.18)",
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
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(22,20,15,0.75)",
          }}
        >
          Now Accepting Applications · 300 Founding Spots
        </span>
      </div>

      {/* headline */}
      <h1
        style={{
          margin: "0 0 clamp(28px, 4vh, 52px)",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: "clamp(46px, 9.2vw, 138px)",
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          color: "#16140F",
        }}
      >
        <MaskedLine delay={0.4}>You Were Never</MaskedLine>
        <MaskedLine delay={0.52}>Meant to Create</MaskedLine>
        <MaskedLine delay={0.64} italic last>
          Alone.
        </MaskedLine>
      </h1>

      {/* bottom row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(24px, 4vw, 64px)",
          borderTop: "1px solid rgba(22,20,15,0.14)",
          paddingTop: "clamp(24px, 3.5vh, 40px)",
        }}
      >
        <p
          style={{
            margin: 0,
            maxWidth: 600,
            fontSize: "clamp(15px, 1.25vw, 17.5px)",
            lineHeight: 1.75,
            color: "#6E6757",
            opacity: 0,
            animation: `ka-fade 0.9s ${easeOut} 1.05s forwards`,
          }}
        >
          The first person the Bible says was filled with the Spirit of God
          wasn&apos;t a priest or a king. It was an artist. And God didn&apos;t
          have him build alone. Kingdom Artists is the community for creatives
          who build with God, for God. We&apos;re starting with 300.
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
          <MagneticLink
            href="/apply"
            appendSearch
            className="ka-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#16140F",
              color: "#FAF8F4",
              textDecoration: "none",
              borderRadius: 999,
              padding: "18px 36px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Apply Now →
          </MagneticLink>
          <span
            style={{
              fontSize: 12,
              lineHeight: 1.6,
              maxWidth: 300,
              color: "rgba(22,20,15,0.42)",
              opacity: 0,
              animation: "ka-fade 1s ease 1.9s forwards",
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
