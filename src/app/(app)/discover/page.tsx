"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import { MOCK_ARTISTS, CATEGORIES } from "@/lib/mock-data";
import { getAllArtists } from "@/lib/artist-store";
import type { Artist } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Curated rows mirror the approved mockup — anchored on real roster members.
const COLLECTIONS = [
  {
    title: "Album Art & Covers",
    user: "selahkim",
    count: 56,
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&q=80",
    ],
  },
  {
    title: "Worship Photography",
    user: "gracenhema",
    count: 132,
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80",
    ],
  },
  {
    title: "Film & Motion",
    user: "micahtorres",
    count: 41,
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80",
    ],
  },
  {
    title: "Prophetic Art",
    user: "maraluna",
    count: 28,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&q=80",
      "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=300&q=80",
    ],
  },
];

type WorkTile = { src: string; alt: string; artist: Artist };

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setArtists(getAllArtists());
  }, []);

  const filteredArtists = useMemo(() => {
    let results = artists;
    if (category) results = results.filter((a) => a.category === category);
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q),
      );
    }
    return results;
  }, [artists, category, query]);

  // Flatten roster work into a true-color masonry feed.
  const tiles = useMemo<WorkTile[]>(() => {
    return filteredArtists.flatMap((a) => {
      const samples = a.workSamples.length
        ? a.workSamples
        : [{ src: a.image, alt: a.name }];
      return samples.map((s) => ({ ...s, artist: a }));
    });
  }, [filteredArtists]);

  const isDefault = !query && category === null;

  return (
    <div className="px-5 py-7 sm:px-8">
      {/* Big search (Cosmos hero search) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mx-auto max-w-[1280px]"
      >
        <div className="group relative">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-paper" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "worship visuals", "album art", a name or city…'
            className="w-full rounded-full border border-line bg-bg2 py-4 pl-13 pr-12 text-sm text-paper placeholder:text-muted-foreground focus:border-line2 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-paper"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Category tabs */}
      <div className="mx-auto mt-5 max-w-[1280px]">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <CategoryPill
            label="Featured"
            active={category === null}
            onClick={() => setCategory(null)}
          />
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.slug}
              label={c.label}
              active={category === c.slug}
              onClick={() =>
                setCategory(category === c.slug ? null : c.slug)
              }
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-9 max-w-[1280px]">
        {/* Curated collections — only on the default view */}
        {isDefault && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-14"
          >
            <h2 className="serif mb-5 text-2xl font-normal tracking-[-0.02em] text-paper">
              Selected by Kingdom Artists
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COLLECTIONS.map((coll) => (
                <Link
                  key={coll.title}
                  href={`/artists/${coll.user}`}
                  className="group block"
                >
                  <div className="grid h-[150px] grid-cols-[2fr_1fr_1fr] gap-1 overflow-hidden rounded-lg">
                    {coll.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-sm font-medium text-paper">
                    {coll.title}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-muted-foreground">
                    @{coll.user} · {coll.count} pieces
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Masonry feed */}
        <section>
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="serif text-2xl font-normal tracking-[-0.02em] text-paper">
              {isDefault ? "Explore the work" : "Results"}
              {!isDefault && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {filteredArtists.length}
                </span>
              )}
            </h2>
            {!isDefault && (
              <button
                onClick={() => {
                  setQuery("");
                  setCategory(null);
                }}
                className="text-xs text-muted-foreground transition-colors hover:text-paper"
              >
                Clear all
              </button>
            )}
          </div>

          {tiles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line py-24 text-center">
              <p className="text-sm text-muted-foreground">
                No creatives match your search.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory(null);
                }}
                className="mt-3 text-sm text-gold underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="gap-3.5 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 xl:columns-5">
              {tiles.map((tile, i) => (
                <MasonryTile key={`${tile.artist.id}-${i}`} tile={tile} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] transition-colors",
        active
          ? "bg-paper font-medium text-[#1c1206]"
          : "bg-bg2 text-muted-foreground hover:text-paper",
      )}
    >
      {label}
    </button>
  );
}

// Pinterest-style varied aspect ratios (portrait-leaning) so the masonry breathes.
const RATIOS = [
  { ar: "9 / 16", w: 600, h: 1067 },
  { ar: "3 / 4", w: 600, h: 800 },
  { ar: "4 / 5", w: 600, h: 750 },
  { ar: "1 / 1", w: 600, h: 600 },
  { ar: "4 / 3", w: 600, h: 450 },
  { ar: "3 / 2", w: 600, h: 400 },
];

// Stable pseudo-random ratio per tile (same tile → same ratio across renders).
function pickRatio(seed: string, index: number) {
  let h = 2166136261;
  const s = `${seed}:${index}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return RATIOS[(h >>> 0) % RATIOS.length];
}

// Re-crop an Unsplash URL to the chosen aspect ratio (drops any existing crop params).
function cropUrl(src: string, w: number, h: number) {
  const base = src.split("?")[0];
  return `${base}?w=${w}&h=${h}&fit=crop&q=80`;
}

function MasonryTile({ tile, index }: { tile: WorkTile; index: number }) {
  const ratio = pickRatio(tile.src, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.03, ease }}
      className="mb-3.5 break-inside-avoid"
    >
      <Link
        href={`/artists/${tile.artist.username}`}
        className="group relative block overflow-hidden rounded-lg"
        style={{ aspectRatio: ratio.ar }}
      >
        <img
          src={cropUrl(tile.src, ratio.w, ratio.h)}
          alt={tile.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
        <span
          className="serif absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-sm text-white"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,.6)" }}
        >
          {tile.artist.name}
          {tile.artist.verified && <VerifiedBadge className="h-2.5 w-2.5" />}
        </span>
      </Link>
    </motion.div>
  );
}
