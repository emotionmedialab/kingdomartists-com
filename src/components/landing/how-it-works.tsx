"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Handshake } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Share your story, your craft, and your creative vision. Upload your work, link your platforms, and let the community see who you are.",
  },
  {
    icon: Search,
    title: "Discover aligned artists",
    description:
      "Browse a curated feed of Kingdom creatives filtered by discipline, genre, location, and aesthetic. Find artists who share your vision.",
  },
  {
    icon: Handshake,
    title: "Connect & collaborate",
    description:
      "Send collaboration requests, share moodboards, and start building together. The best creative work comes from aligned partnerships.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-28 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-background/35">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight mt-2">
            Three steps to your
            <br className="hidden sm:block" />
            <span className="italic"> creative tribe</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="text-center sm:text-left"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-background/8 mb-4">
                <step.icon className="w-5 h-5 text-background/60" />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-background/25 mb-2">
                Step {i + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-background mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-background/45 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
