"use client";

import { motion } from "framer-motion";

const creativeTypes = [
  "Musicians",
  "Filmmakers",
  "Producers",
  "Photographers",
  "Designers",
  "Songwriters",
  "Worship Leaders",
  "Visual Artists",
  "Creative Directors",
  "Writers",
  "Storytellers",
  "Videographers",
];

export function CreativeTickerV2() {
  return (
    <section className="py-6 sm:py-8 overflow-hidden border-y border-foreground/[0.04]">
      <div
        className="flex gap-8 sm:gap-12"
        style={{
          ["--duration" as string]: "30s",
          ["--gap" as string]: "2rem",
        }}
      >
        <motion.div
          className="flex gap-8 sm:gap-12 shrink-0 animate-marquee"
          aria-hidden="true"
        >
          {[...creativeTypes, ...creativeTypes].map((type, i) => (
            <span
              key={i}
              className="text-sm sm:text-base text-foreground/15 font-medium whitespace-nowrap font-[family-name:var(--font-heading)] tracking-wide"
            >
              {type}
            </span>
          ))}
        </motion.div>
        <div
          className="flex gap-8 sm:gap-12 shrink-0 animate-marquee"
          aria-hidden="true"
        >
          {[...creativeTypes, ...creativeTypes].map((type, i) => (
            <span
              key={i}
              className="text-sm sm:text-base text-foreground/15 font-medium whitespace-nowrap font-[family-name:var(--font-heading)] tracking-wide"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
