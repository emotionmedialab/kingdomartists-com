"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LandingNav } from "./landing-nav";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden">
      {/* Full-bleed dramatic photo (true color) with slow scale */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=2400&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Cinematic scrims */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,13,.85),rgba(12,11,13,.2)_60%,rgba(12,11,13,.5)),linear-gradient(0deg,rgba(12,11,13,.82),transparent_46%)]" />

      <LandingNav />

      {/* Editorial marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease }}
        className="absolute right-6 top-24 z-10 text-[13px] tracking-[0.2em] text-muted-foreground sm:right-12 sm:top-28"
      >
        01 / 08
      </motion.div>

      {/* Headline block (mid-left) */}
      <div className="absolute left-6 top-[46%] z-10 -translate-y-1/2 sm:left-11">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg2/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-paper/75 backdrop-blur-sm"
        >
          <span className="status-dot" />
          Accepting Applications — 300 Founding Spots
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="serif mt-5 text-[clamp(50px,9.5vw,148px)] font-light leading-[0.86] tracking-[-0.04em] text-paper"
        >
          You&apos;re Not
          <br />
          the Only <em className="italic text-gold-soft">One</em>.
        </motion.h1>
      </div>

      {/* Subcopy + CTA (bottom-left) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
        className="absolute bottom-14 left-6 z-10 max-w-[36ch] sm:left-12"
      >
        <p className="text-[15px] leading-relaxed text-paper/85">
          You&apos;ve been the only creative in the room long enough. We&apos;re
          building the first home for Kingdom creatives — and handpicking the
          300 who shape it.
        </p>
        <Link href="#join" className="pill pill-gold mt-5">
          Apply for Founding Access →
        </Link>
        <p className="mt-4 text-sm text-paper/50">
          Accepted members get a{" "}
          <span className="text-paper/80">personal link</span> to vouch for
          other creatives.
        </p>
      </motion.div>
    </section>
  );
}
