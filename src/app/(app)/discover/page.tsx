"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, Users } from "lucide-react";
import { ArtistCard } from "@/components/app/artist-card";
import { MOCK_ARTISTS, CATEGORIES } from "@/lib/mock-data";
import { getAllArtists } from "@/lib/artist-store";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [artists, setArtists] = useState(MOCK_ARTISTS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setArtists(getAllArtists());
  }, []);

  const featured = artists.filter((a) => a.featured);

  const filtered = useMemo(() => {
    let results = artists;
    if (selectedCategory) {
      results = results.filter((a) => a.category === selectedCategory);
    }
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return results;
  }, [query, selectedCategory, artists]);

  const activeCategoryLabel = CATEGORIES.find(
    (c) => c.slug === selectedCategory
  )?.label;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40 group-focus-within:text-foreground/50 transition-colors" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name, skill, city, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-muted/30 border border-border/40 rounded-2xl pl-11 pr-12 py-3 sm:py-3.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 focus:bg-background focus:shadow-sm transition-all"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease }}
        ref={scrollRef}
        className="mt-3.5 flex gap-1.5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] transition-all",
            !selectedCategory
              ? "bg-foreground text-background font-medium shadow-sm"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === cat.slug ? null : cat.slug
              )
            }
            className={cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] transition-all whitespace-nowrap",
              selectedCategory === cat.slug
                ? "bg-foreground text-background font-medium shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Featured section */}
      {!query && !selectedCategory && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-7 sm:mt-9"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium">
                Featured Creatives
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {featured.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Results */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mt-8 sm:mt-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium">
            {selectedCategory
              ? activeCategoryLabel
              : query
              ? "Search Results"
              : "All Creatives"}
            <span className="text-muted-foreground/40 text-sm font-normal ml-2">
              {filtered.length}
            </span>
          </h2>
          {(query || selectedCategory) && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory(null);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 sm:py-24">
            <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground/25" />
            </div>
            <p className="text-foreground/60 text-sm font-medium">
              No creatives found
            </p>
            <p className="text-muted-foreground/40 text-xs mt-1">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 text-sm text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {filtered.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Category Browse */}
      {!query && !selectedCategory && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-12 sm:mt-16 pb-4"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className="group text-left p-4 sm:p-5 rounded-2xl border border-border/40 hover:border-foreground/15 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-[15px] font-medium group-hover:text-foreground transition-colors">
                    {cat.label}
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40 bg-muted/50 px-2 py-0.5 rounded-full">
                    <Users className="w-3 h-3" />
                    {cat.count}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
