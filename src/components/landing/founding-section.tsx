"use client";

import { motion } from "framer-motion";
import { Crown, Shield, Zap, Star, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const perks = [
  {
    icon: Crown,
    title: "Lifetime Free Access",
    description:
      "Every feature we ever build — yours from day one. Founding members are locked in before pricing even exists.",
  },
  {
    icon: Shield,
    title: "Exclusive Golden Check",
    description:
      "A founder-only badge that will never be available again. The 300 who were here from day one carry it forever.",
  },
  {
    icon: Zap,
    title: "First Access to Everything",
    description:
      "Beta features, new tools, premium drops — founders test it all first. Your feedback shapes what everyone else eventually gets.",
  },
  {
    icon: Star,
    title: "Creative Resource Kit",
    description:
      "A curated toolkit built for Kingdom creatives — templates, assets, and resources to elevate your craft from the moment you join.",
  },
  {
    icon: Users,
    title: "10 Invite Codes",
    description:
      "You choose who gets in next. Every founder gets 10 personal invite codes to hand to the creatives they believe in.",
  },
];

export function FoundingSection() {
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
            We&apos;re not launching to everyone. We&apos;re starting with 300
            creatives who will shape this from the ground up. This isn&apos;t
            early access — it&apos;s a seat at the table.
          </p>
        </motion.div>

        {/* Spots counter */}
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
                  className={`w-2 h-6 sm:h-8 rounded-full ${
                    i < 8
                      ? "bg-foreground/80"
                      : "bg-foreground/[0.08]"
                  }`}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-semibold tracking-tight">
                247 of 300
              </div>
              <div className="text-[11px] sm:text-xs text-foreground/35">
                spots remaining
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
            Claim Your Spot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
