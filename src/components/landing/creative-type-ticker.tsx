"use client";

import { Marquee } from "@/components/ui/marquee";
import { CREATIVE_TYPES } from "@/lib/data";

export function CreativeTypeTicker() {
  return (
    <section className="py-5 sm:py-8 border-y border-border/40 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
        {CREATIVE_TYPES.map((type) => (
          <span
            key={type}
            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/15 flex items-center gap-8 sm:gap-10 select-none"
          >
            {type}
            <span className="text-sm text-foreground/10">&#x2726;</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
