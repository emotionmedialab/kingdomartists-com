"use client";

import { motion } from "framer-motion";
import { Crown, Zap, Star, Users } from "lucide-react";
import { StarMark } from "@/components/app/star-mark";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const SPOTS_FILLED = 247;
const SPOTS_TOTAL = 300;

type Perk = {
  icon: typeof Crown | "star-mark";
  title: string;
  description: string;
  className?: string;
  featured?: boolean;
};

// Bento arrangement on a 3-col grid: wide intro, tall feature, two squares, full-width closer.
const perks: Perk[] = [
  {
    icon: Crown,
    title: "Lifetime Free Access",
    description:
      "Every feature we ever build — yours from day one. Founding members are locked in before pricing even exists.",
    className: "sm:col-span-2",
  },
  {
    icon: "star-mark",
    title: "Exclusive Golden Check",
    description:
      "A founder-only badge that will never be available again. The 300 who were here from day one carry it forever.",
    className: "sm:col-span-1 sm:row-span-2",
    featured: true,
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
    title: "Vouch for Other Creatives",
    description:
      "You choose who gets in next. Every accepted member gets a personal link — anyone you refer gets fast-tracked to the front.",
    className: "sm:col-span-3",
  },
];

export function FoundingSection() {
  const bars = 10;
  const filledBars = Math.round((SPOTS_FILLED / SPOTS_TOTAL) * bars);

  return (
    <section className="border-b border-line px-6 py-24 sm:px-12 lg:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <span className="cap">Limited to 300</span>
          <h2 className="serif mt-3 text-[clamp(34px,5.5vw,64px)] font-light tracking-[-0.02em] text-paper">
            The Founding 300
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            We&apos;re not launching to everyone. We&apos;re starting with 300
            creatives who will shape this from the ground up. This isn&apos;t
            early access — it&apos;s a seat at the table.
          </p>
        </motion.div>

        {/* Spots counter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-11 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 rounded-2xl border border-line bg-bg2 px-7 py-4">
            <div className="flex gap-1">
              {Array.from({ length: bars }).map((_, i) => (
                <div
                  key={i}
                  className={
                    "h-7 w-2 rounded-full " +
                    (i < filledBars ? "bg-gold" : "bg-line2")
                  }
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-base font-semibold tracking-tight text-paper">
                {SPOTS_FILLED} of {SPOTS_TOTAL}
              </div>
              <div className="text-xs text-muted-foreground">spots remaining</div>
            </div>
          </div>
        </motion.div>

        {/* Bento perks grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[190px]">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.07 * i + 0.15, ease }}
              className={cn(
                "group flex flex-col rounded-2xl border p-7 transition-colors duration-500",
                perk.featured
                  ? "justify-between border-gold/25 bg-[radial-gradient(130%_120%_at_0%_0%,rgba(216,164,76,0.12),transparent_58%)] hover:border-gold/45"
                  : "border-line bg-bg2 hover:border-line2",
                perk.className,
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl bg-bg3",
                  perk.featured ? "h-14 w-14" : "h-12 w-12",
                )}
              >
                {perk.icon === "star-mark" ? (
                  <StarMark
                    className={cn(
                      "text-gold",
                      perk.featured ? "h-6 w-6" : "h-5 w-5",
                    )}
                  />
                ) : (
                  <perk.icon className="h-5 w-5 text-gold" />
                )}
              </div>

              <div className={perk.featured ? "" : "mt-5"}>
                {perk.featured && (
                  <span className="cap mb-2 block text-gold/70">
                    Founder exclusive
                  </span>
                )}
                <h3 className="serif text-lg font-normal text-paper">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-12 text-center"
        >
          <a href="#join" className="pill pill-ghost">
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
