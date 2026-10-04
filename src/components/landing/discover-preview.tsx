"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArtistCard } from "@/components/app/artist-card";
import { MOCK_ARTISTS } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function DiscoverPreview() {
  const featured = MOCK_ARTISTS.filter((a) => a.featured).slice(0, 5);

  return (
    <section className="border-b border-line px-6 py-24 sm:px-12">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="cap mb-3">The Founding Members</div>
          <h2 className="serif text-[clamp(34px,6vw,72px)] font-light tracking-[-0.03em] text-paper">
            Discover Kingdom artists
          </h2>
        </div>
        <Link
          href="/discover"
          className="hidden shrink-0 border-b border-gold pb-1 text-xs uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-80 sm:block"
        >
          Explore all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {featured.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
          >
            <ArtistCard artist={artist} />
          </motion.div>
        ))}
      </div>

      <Link
        href="/discover"
        className="mt-8 inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-80 sm:hidden"
      >
        Explore all →
      </Link>
    </section>
  );
}
