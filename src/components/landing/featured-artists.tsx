"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FEATURED_ARTISTS } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function ArtistCard({
  artist,
  index,
}: {
  artist: (typeof FEATURED_ARTISTS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="group flex-shrink-0 w-[240px] sm:w-[270px] snap-start"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${artist.gradient} mix-blend-multiply opacity-30 transition-opacity duration-500`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-white text-base sm:text-lg font-medium leading-tight">
            {artist.name}
          </h3>
          <p className="text-white/60 text-sm mt-0.5">{artist.role}</p>
          <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {artist.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedArtists() {
  return (
    <section id="discover" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Featured Creatives
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight mt-2">
            Discover Kingdom artists
          </h2>
        </motion.div>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-5 sm:px-6 lg:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {FEATURED_ARTISTS.map((artist, i) => (
          <ArtistCard key={artist.name} artist={artist} index={i} />
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-[240px] sm:w-[270px] snap-start"
        >
          <a
            href="#join"
            className="flex flex-col items-center justify-center w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-border/60 hover:border-foreground/15 transition-colors group"
          >
            <span className="text-3xl text-muted-foreground/40 mb-2 group-hover:scale-110 transition-transform">
              +
            </span>
            <span className="text-sm text-muted-foreground/60 font-medium">
              Join the community
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
