"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "Thousands", label: "of Kingdom creatives with no place to connect" },
  { value: "Zero", label: "platforms built for people who carry this calling" },
  { value: "One", label: "community about to change that — and you're shaping it" },
];

export function ProblemSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-foreground/[0.015]" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
        {/* The paradox statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-center"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,5vw,3.5rem)] font-medium tracking-tight leading-[1.1] text-balance">
            Same God. Same calling.
            <br />
            <span className="text-foreground/25">No way to find each other.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-6 sm:mt-8 text-center text-foreground/40 text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance"
        >
          Producers making beats in bedrooms with nobody to send them to.
          Filmmakers carrying visions they can&apos;t build alone.
          Designers creating for brands that don&apos;t share their values.
          The talent is everywhere — the community doesn&apos;t exist yet.
        </motion.p>

        {/* Until now */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-10 sm:mt-14 text-center"
        >
          <span className="font-[family-name:var(--font-heading)] text-[clamp(1.25rem,3vw,2rem)] font-medium italic text-foreground/70">
            Until now.
          </span>
        </motion.div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.4, ease }}
              className="text-center sm:text-left"
            >
              <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="mt-1.5 text-sm text-foreground/35 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
