"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

      {/* Soft ambient light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-200/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/25 rounded-full blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] text-[11px] sm:text-xs tracking-[0.15em] uppercase text-foreground/50 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Invite Only — 300 Founding Spots
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mt-8 sm:mt-10 font-[family-name:var(--font-heading)] text-[clamp(2.75rem,7vw,6.5rem)] font-medium tracking-[-0.02em] leading-[0.95] text-balance"
        >
          You&apos;re Not
          <br />
          the Only <span className="italic">One.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-6 sm:mt-8 text-[clamp(1rem,2.2vw,1.25rem)] text-foreground/50 max-w-xl mx-auto leading-[1.7] text-balance"
        >
          You&apos;ve been the only creative in the room long enough.
          <br className="hidden sm:block" />
          We&apos;re building the first home for Kingdom creatives
          <br className="hidden sm:block" />
          — and handpicking the 300 who shape it.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="#join"
            className="group inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-[15px] font-medium hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-foreground/10"
          >
            Claim Your Founding Spot
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Invite mechanic teaser */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 sm:mt-12 text-xs sm:text-sm text-foreground/30"
        >
          Every founding member gets <span className="text-foreground/55 font-medium">10 invite codes</span> to share.
        </motion.p>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-foreground/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
