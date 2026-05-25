"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const portraits = [
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=260&fit=crop&crop=face",
    className:
      "top-[10%] left-[4%] sm:left-[8%] w-16 h-20 sm:w-24 sm:h-32 lg:w-28 lg:h-36",
    rotate: -6,
    duration: "7s",
    delay: "0s",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=260&fit=crop&crop=face",
    className:
      "top-[7%] right-[5%] sm:right-[10%] w-14 h-[72px] sm:w-20 sm:h-28 lg:w-24 lg:h-32",
    rotate: 5,
    duration: "8s",
    delay: "1.2s",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=260&fit=crop&crop=face",
    className:
      "top-[42%] left-[2%] sm:left-[5%] lg:left-[8%] w-16 h-[84px] sm:w-24 sm:h-32 hidden sm:block",
    rotate: -3,
    duration: "6.5s",
    delay: "0.6s",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=260&fit=crop&crop=face",
    className:
      "top-[36%] right-[2%] sm:right-[5%] lg:right-[7%] w-14 h-20 sm:w-[88px] sm:h-28 lg:w-24 lg:h-32 hidden sm:block",
    rotate: 4,
    duration: "7.5s",
    delay: "2s",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=260&fit=crop&crop=face",
    className:
      "bottom-[14%] left-[6%] sm:left-[10%] w-14 h-[72px] sm:w-20 sm:h-28 lg:w-24 lg:h-32",
    rotate: 5,
    duration: "8.5s",
    delay: "1.6s",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=260&fit=crop&crop=face",
    className:
      "bottom-[16%] right-[5%] sm:right-[9%] w-16 h-20 sm:w-[88px] sm:h-28",
    rotate: -4,
    duration: "6s",
    delay: "0.4s",
  },
];

const proofAvatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
];

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-32 w-[400px] h-[400px] bg-violet-400/15 rounded-full blur-[120px] animate-glow" />
        <div className="absolute top-[25%] right-[-80px] w-[350px] h-[350px] bg-rose-300/12 rounded-full blur-[120px] animate-glow [animation-delay:2s]" />
        <div className="absolute bottom-[15%] left-[25%] w-[320px] h-[320px] bg-amber-200/18 rounded-full blur-[100px] animate-glow [animation-delay:4s]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-300/8 rounded-full blur-[140px] animate-glow [animation-delay:1s]" />
      </div>

      {/* Floating artist portraits */}
      {portraits.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.className} z-[5]`}
          style={{ transform: `rotate(${p.rotate}deg)` }}
        >
          <div
            className="w-full h-full animate-float"
            style={{
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          >
            <img
              src={p.src}
              alt=""
              className="w-full h-full object-cover rounded-2xl shadow-xl shadow-black/5 opacity-50 sm:opacity-[0.7]"
            />
          </div>
        </div>
      ))}

      {/* Center content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 sm:mb-8"
        >
          A digital home for Kingdom-minded creatives
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6.5vw,6rem)] font-medium tracking-tight leading-[1] text-balance"
        >
          For creatives who carry{" "}
          <br className="hidden sm:block" />
          the <span className="italic">Kingdom</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="mt-5 sm:mt-7 text-[15px] sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
        >
          A discovery platform where Kingdom musicians, filmmakers, designers,
          and visionary creatives find each other and build together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#join"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97]"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/discover"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-border/80 px-8 py-3.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all active:scale-[0.97]"
          >
            Explore Creatives
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 sm:mt-10 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {proofAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">800+</span> creatives
            on the waitlist
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground/40" />
        </motion.div>
      </motion.a>
    </section>
  );
}
