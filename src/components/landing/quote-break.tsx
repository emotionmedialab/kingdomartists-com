"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function QuoteBreak() {
  return (
    <section className="py-16 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-200/8 rounded-full blur-[130px]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl lg:text-[2rem] font-medium tracking-tight leading-[1.4] italic text-foreground/75">
            &ldquo;Every artist was first called. Every creative gift was given
            for a reason. We&apos;re here to help you find your people and build
            what Heaven put in your heart.&rdquo;
          </p>
          <footer className="mt-5 sm:mt-6">
            <span className="text-xs text-muted-foreground/60 tracking-wide">
              &mdash; The Kingdom Artists Team
            </span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
