"use client";

import { motion } from "framer-motion";
import { CREATIVE_TYPES, STATS } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Mission() {
  return (
    <section id="mission" className="relative py-16 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-200/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-200/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Our Mission
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-[3.25rem] font-medium tracking-tight mt-3 leading-[1.1] text-balance">
            Building a creative culture
            <br />
            <span className="italic">rooted in purpose</span>
          </h2>
          <p className="text-muted-foreground text-[15px] sm:text-lg lg:text-xl mt-5 sm:mt-7 max-w-2xl mx-auto leading-relaxed text-balance">
            Kingdom Artists exists to unite the most talented, visionary, and
            spiritually grounded creatives on the planet. We believe art born
            from purpose has the power to shape culture, heal communities, and
            reflect the beauty of Heaven on earth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-2"
        >
          {CREATIVE_TYPES.map((type) => (
            <span
              key={type}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/60 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:border-foreground/15 transition-all cursor-default select-none"
            >
              {type}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-heading)] text-xl sm:text-3xl font-medium tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
