"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Shield, Zap, Star, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const perks = [
  {
    icon: Crown,
    title: "Lifetime Free Access",
    description:
      "Every feature we ever build — yours. Founding members are locked in before pricing even exists.",
  },
  {
    icon: Shield,
    title: "Exclusive Founder Badge",
    description:
      "A founder-only mark that will never be available again. The 300 who were here first carry it forever.",
  },
  {
    icon: Zap,
    title: "First Access to Everything",
    description:
      "New tools, features, drops — founders test it first. Your feedback shapes what everyone else gets.",
  },
  {
    icon: Star,
    title: "Creative Resource Kit",
    description:
      "A curated toolkit for Kingdom creatives — templates, assets, and resources to elevate your craft from day one.",
  },
  {
    icon: Users,
    title: "Vouch for Other Creatives",
    description:
      "Every accepted member gets a personal link. Anyone you refer gets fast-tracked. You decide who's next.",
  },
];

export function FoundingSection() {
  const [accepted, setAccepted] = useState(0);
  const [applied, setApplied] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setAccepted(data.accepted);
          setApplied(data.applied);
        }
      } catch {
        // Supabase not connected yet — stay at 0
      }
    }
    fetchStats();
  }, []);

  const spotsRemaining = 300 - accepted;

  return (
    <section className="relative py-20 sm:py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-foreground/30 font-medium">
            Limited to 300
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,5vw,3.5rem)] font-medium tracking-tight mt-3 leading-[1.1] text-balance">
            The Founding 300
          </h2>
          <p className="mt-4 sm:mt-5 text-foreground/40 text-[15px] sm:text-lg max-w-xl mx-auto leading-relaxed text-balance">
            We&apos;re not opening the doors to everyone. We&apos;re handpicking
            300 creatives who will shape what this becomes. If you&apos;re in, you&apos;re in for life.
          </p>
        </motion.div>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02]">
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-6 sm:h-8 rounded-full transition-colors duration-500 ${
                    i < Math.ceil((accepted / 300) * 10)
                      ? "bg-foreground/80"
                      : "bg-foreground/[0.08]"
                  }`}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-semibold tracking-tight">
                {accepted} of 300
              </div>
              <div className="text-[11px] sm:text-xs text-foreground/35">
                {accepted === 0 ? "spots open — be the first" : `spots claimed · ${spotsRemaining} left`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Perks grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i + 0.2, ease }}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-foreground/[0.05] bg-background hover:border-foreground/[0.1] hover:shadow-lg hover:shadow-foreground/[0.02] transition-all duration-500"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-foreground/[0.04] flex items-center justify-center group-hover:bg-foreground/[0.07] transition-colors duration-500">
                <perk.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/60" />
              </div>
              <h3 className="mt-4 sm:mt-5 font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold tracking-tight">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/35 leading-relaxed">
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-10 sm:mt-14 text-center"
        >
          <a
            href="#join"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground/10 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 active:scale-[0.97]"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
