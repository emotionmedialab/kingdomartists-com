"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const disciplines = [
  {
    name: "Musicians & Producers",
    sub: "Vocalists, instrumentalists, beatmakers",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=800&fit=crop",
    tall: true,
  },
  {
    name: "Filmmakers",
    sub: "Directors, cinematographers, editors",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=500&fit=crop",
    tall: false,
  },
  {
    name: "Designers",
    sub: "Graphic, brand, creative direction",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=500&fit=crop",
    tall: false,
  },
  {
    name: "Worship Leaders",
    sub: "Leading communities in song",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop",
    tall: true,
  },
  {
    name: "Visual Artists",
    sub: "Painters, illustrators, mixed media",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=500&fit=crop",
    tall: false,
  },
  {
    name: "Photographers",
    sub: "Portrait, editorial, documentary",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=800&fit=crop",
    tall: true,
  },
];

export function CommunityShowcase() {
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
            The Community
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight mt-2 text-balance">
            Every kind of creative.
            <br />
            <span className="italic">One Kingdom.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-md mx-auto text-balance">
            From studio sessions to gallery walls, Kingdom Artists spans every
            creative discipline united by shared purpose.
          </p>
        </motion.div>

        <div className="columns-2 sm:columns-3 gap-2.5 sm:gap-3.5">
          {disciplines.map((d, i) => (
            <motion.a
              key={d.name}
              href="/discover"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
              className="group relative block rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3.5 break-inside-avoid"
            >
              <div className={d.tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-white text-sm sm:text-base font-medium leading-tight">
                  {d.name}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {d.sub}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
