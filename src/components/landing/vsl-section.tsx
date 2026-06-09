"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function VSLSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-foreground/30 font-medium">
            Watch this first
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,4vw,2.5rem)] font-medium tracking-tight mt-3 text-balance leading-[1.15]">
            The 2-minute story behind
            <br className="hidden sm:block" />
            <span className="italic">Kingdom Artists</span>
          </h2>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-foreground/[0.03] border border-foreground/[0.06] shadow-2xl shadow-foreground/[0.04]"
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.08]" />

              {/* Play button */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-foreground flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-background ml-1" fill="currentColor" />
              </div>
              <span className="relative z-10 text-xs sm:text-sm text-foreground/40 font-medium">
                David & Cara share the vision
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
              {/* Replace with actual video embed */}
              <p className="text-foreground/30 text-sm">
                Video embed goes here
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
