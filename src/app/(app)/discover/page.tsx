"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { ArtistCard } from "@/components/app/artist-card";
import { MOCK_ARTISTS, CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const featured = MOCK_ARTISTS.filter((a) => a.featured);

  const filtered = useMemo(() => {
    let results = MOCK_ARTISTS;
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
  }, [query, selectedCategory]);

  const activeCategoryLabel = CATEGORIES.find(
    (c) => c.slug === selectedCategory
  )?.label;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search by name, skill, city, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-muted/50 border border-border/50 rounded-2xl pl-12 pr-12 py-3.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 focus:bg-background transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease }}
        className="mt-4 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all",
            !selectedCategory
              ? "bg-foreground text-background font-medium"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          )}
        >
          All Creatives
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
              "flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap",
              selectedCategory === cat.slug
                ? "bg-foreground text-background font-medium"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Featured section — only when no filters active */}
      {!query && !selectedCategory && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium">
              Featured Creatives
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium">
            {selectedCategory
              ? activeCategoryLabel
              : query
              ? "Search Results"
              : "All Creatives"}
            <span className="text-muted-foreground/50 text-sm font-normal ml-2">
              {filtered.length}
            </span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">
              No creatives found matching your search.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory(null);
              }}
              className="mt-3 text-sm text-foreground underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Category Browse — only when no filters */}
      {!query && !selectedCategory && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-12 sm:mt-16"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium mb-5">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className="group text-left p-4 sm:p-5 rounded-2xl border border-border/50 hover:border-foreground/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-medium group-hover:text-foreground transition-colors">
                    {cat.label}
                  </h3>
                  <span className="text-xs text-muted-foreground/50 bg-muted/60 px-2.5 py-1 rounded-full">
                    {cat.count}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
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
