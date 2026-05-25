"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, MessageCircle, Handshake } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: UserPlus,
    title: "Create a profile",
    description:
      "Share who you are, what you do, and links to your work.",
  },
  {
    icon: Search,
    title: "Get discovered",
    description:
      "Show up by category, keyword, and location.",
  },
  {
    icon: MessageCircle,
    title: "Connect directly",
    description:
      "Message like-minded creatives on-platform.",
  },
  {
    icon: Handshake,
    title: "Build together",
    description:
      "Find people who share your vision and creative heart.",
  },
];

export function WhatsComing() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            What you can do on
            <br />
            <span className="italic">Kingdom Artists</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="group p-5 sm:p-6 rounded-2xl border border-border/50 hover:border-border transition-colors"
            >
              <feature.icon className="w-5 h-5 text-muted-foreground/50 mb-3 group-hover:text-foreground/70 transition-colors" />
              <h3 className="text-base font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
