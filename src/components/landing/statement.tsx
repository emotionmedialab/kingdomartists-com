"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Statement() {
  return (
    <section
      id="statement"
      className="grid grid-cols-1 items-center gap-12 border-t border-line px-6 py-28 sm:px-12 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="h-[340px] overflow-hidden rounded-sm"
      >
        <img
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        <h3 className="serif text-[clamp(32px,5vw,60px)] font-light leading-[1.08] tracking-[-0.03em] text-paper">
          Same God. Same calling.{" "}
          <span className="text-faint">No way to find each other.</span>
        </h3>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-muted-foreground">
          Musicians worshipping in studios alone. Filmmakers with Kingdom visions
          and nobody to build with. Designers whose best work never reaches the
          people who need it most. The gift is everywhere — the connections
          aren&apos;t.
        </p>
        <p className="serif mt-6 text-2xl font-light italic text-gold-soft">
          Until now.
        </p>
      </motion.div>
    </section>
  );
}
