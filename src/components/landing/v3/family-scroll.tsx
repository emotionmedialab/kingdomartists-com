"use client";

import { useEffect, useRef, useState } from "react";

const serif = "var(--font-heading), Georgia, serif";

const CHARACTERS = [
  { src: "/characters/01-songwriter-web.jpg", discipline: "Songwriter", object: "Pen & Notebook" },
  { src: "/characters/02-producer-web.jpg", discipline: "Producer", object: "Laptop & Headphones" },
  { src: "/characters/03-musician-web.jpg", discipline: "Musician", object: "Guitar" },
  { src: "/characters/04-engineer-web.jpg", discipline: "Engineer", object: "Mixing Console" },
  { src: "/characters/05-filmmaker-web.jpg", discipline: "Filmmaker", object: "Cinema Camera" },
  { src: "/characters/06-photographer-web.jpg", discipline: "Photographer", object: "Film Camera" },
];

/**
 * Sticky scroll crossfade — 100vh per character inside a 600vh wrapper.
 * As the user scrolls, the centered portrait crossfades between the six
 * creatives, with discipline/object labels, progress dots, and a counter.
 */
export function FamilyScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = section.getBoundingClientRect();
        const scrolled = -rect.top;
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrolled < 0 || scrolled > scrollable) return;
        const progress = scrolled / scrollable;
        setIndex(
          Math.min(
            Math.floor(progress * CHARACTERS.length),
            CHARACTERS.length - 1
          )
        );
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "600vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* intro whisper */}
        <span
          style={{
            position: "absolute",
            top: "clamp(24px, 4vh, 40px)",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(22,20,15,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          One Calling, Many Crafts
        </span>

        {/* counter */}
        <div
          style={{
            position: "absolute",
            top: "clamp(24px, 4vh, 40px)",
            right: "clamp(16px, 2.5vw, 40px)",
            fontSize: 11,
            letterSpacing: "0.15em",
            color: "#6B6356",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontSize: 22,
              color: "#16140F",
              fontWeight: 400,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span> / 06</span>
        </div>

        {/* thin rule */}
        <div
          style={{
            position: "absolute",
            top: "clamp(24px, 4vh, 40px)",
            left: "clamp(16px, 2.5vw, 40px)",
            width: 40,
            height: 1,
            background: "#6B6356",
            opacity: 0.3,
          }}
        />

        {/* image stack */}
        <div
          style={{
            position: "relative",
            width: "min(55vh, 420px)",
            aspectRatio: "3 / 4",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.04)",
          }}
        >
          {CHARACTERS.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={c.src}
              src={c.src}
              alt={c.discipline}
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "opacity",
              }}
            />
          ))}
        </div>

        {/* labels */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(24px, 5vh, 48px)",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none",
            width: "100%",
          }}
        >
          {CHARACTERS.map((c, i) => (
            <div
              key={c.discipline}
              style={{
                position: i === index ? "relative" : "absolute",
                inset: i === index ? undefined : 0,
                opacity: i === index ? 1 : 0,
                transform: i === index ? "translateY(0)" : "translateY(15px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#16140F",
                  whiteSpace: "nowrap",
                }}
              >
                {c.discipline}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6B6356",
                  marginTop: "0.5rem",
                }}
              >
                {c.object}
              </div>
            </div>
          ))}
        </div>

        {/* progress dots */}
        <div
          style={{
            position: "absolute",
            right: "clamp(16px, 2.5vw, 40px)",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 10,
          }}
        >
          {CHARACTERS.map((c, i) => (
            <div
              key={c.discipline}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i === index ? "#C8A654" : "#EBE4D8",
                border: `1.5px solid ${i === index ? "#C8A654" : "#6B6356"}`,
                opacity: i === index ? 1 : 0.3,
                transform: i === index ? "scale(1.3)" : "scale(1)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
