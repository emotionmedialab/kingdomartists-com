"use client";

import { motion } from "framer-motion";
import { MOODBOARD_IMAGES } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function MoodboardGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 sm:mb-12 text-center"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Creative Inspiration
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight mt-2">
            Visual moodboard
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto text-balance">
            A glimpse into the aesthetic world of Kingdom creatives. Curated
            visuals, shared inspiration, collective vision.
          </p>
        </motion.div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2.5 sm:gap-3.5">
          {MOODBOARD_IMAGES.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease }}
              className="group relative rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-3.5 break-inside-avoid cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
