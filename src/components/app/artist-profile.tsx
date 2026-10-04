"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Music,
  Home,
  MapPin,
  MessageCircle,
  Heart,
  Edit3,
  Share2,
  AtSign,
  Play,
  Globe,
  ExternalLink,
} from "lucide-react";
import { VerifiedBadge } from "./verified-badge";
import type { Artist } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
    case "tiktok":
      return <AtSign className="h-3.5 w-3.5" />;
    case "youtube":
      return <Play className="h-3.5 w-3.5" />;
    case "spotify":
    case "soundcloud":
      return <Music className="h-3.5 w-3.5" />;
    case "website":
      return <Globe className="h-3.5 w-3.5" />;
    default:
      return <ExternalLink className="h-3.5 w-3.5" />;
  }
}

const PLATFORM_NAMES: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  website: "Website",
  behance: "Behance",
  tiktok: "TikTok",
};

// Stable pseudo-stats per artist (no real metrics in mock data, but consistent per profile).
function profileStats(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h = h >>> 0;
  return {
    views: 9_000 + (h % 60_000),
    appreciations: 700 + ((h >>> 4) % 5_000),
    followers: 1_400 + ((h >>> 9) % 24_000),
  };
}

const TABS = ["Work", "Collections", "About"] as const;
type Tab = (typeof TABS)[number];

export function ArtistProfile({
  artist,
  self = false,
}: {
  artist: Artist;
  self?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("Work");

  const cityLine = [artist.city, artist.state].filter(Boolean).join(", ");
  const socialLinks = Object.entries(artist.links).filter(([, v]) => v) as [
    string,
    string,
  ][];
  const stats = profileStats(artist.username);
  const joinDate = new Date(artist.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-9 sm:px-8 lg:grid-cols-[300px_1fr] lg:gap-12">
      {/* ===== Sidebar ===== */}
      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="lg:sticky lg:top-24 lg:self-start"
      >
        <div className="h-24 w-24 overflow-hidden rounded-[18px] border border-line2">
          <img
            src={artist.image}
            alt={artist.name}
            className="h-24 w-24 object-cover"
          />
        </div>

        <h1 className="serif mt-4 flex items-center gap-2.5 text-[30px] font-normal leading-tight tracking-[-0.02em] text-paper">
          {artist.name}
          {artist.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
        </h1>

        <div className="mt-3 flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2.5 text-muted-foreground">
            <Music className="h-3.5 w-3.5 shrink-0" />
            {artist.role}
          </span>
          {artist.from && (
            <span className="flex items-center gap-2.5 text-muted-foreground">
              <Home className="h-3.5 w-3.5 shrink-0" />
              From {artist.from}
            </span>
          )}
          {cityLine && (
            <span className="flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {cityLine}
            </span>
          )}
          <span className="flex items-center gap-2.5 text-gold">
            <span className="status-dot" />
            Open to collaborate
          </span>
        </div>

        {/* Primary actions */}
        <div className="mt-5 flex gap-2.5">
          {self ? (
            <>
              <Link href="/onboarding" className="pill pill-gold flex-1 py-2.5">
                <Edit3 className="h-4 w-4" /> Edit profile
              </Link>
              <button className="pill pill-ghost py-2.5" aria-label="Share profile">
                <Share2 className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/messages" className="pill pill-gold flex-1 py-2.5">
                <MessageCircle className="h-4 w-4" /> Message
              </Link>
              <button className="pill pill-ghost py-2.5">
                <Heart className="h-4 w-4" /> Save
              </button>
            </>
          )}
        </div>

        {/* Stats */}
        <dl className="my-6 flex flex-col gap-2.5 border-y border-line py-5 text-[13.5px]">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Profile views</dt>
            <dd className="font-semibold text-paper">
              {stats.views.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Appreciations</dt>
            <dd className="font-semibold text-paper">
              {stats.appreciations.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Followers</dt>
            <dd className="font-semibold text-paper">
              {stats.followers.toLocaleString()}
            </dd>
          </div>
        </dl>

        {socialLinks.length > 0 && (
          <>
            <SidebarHeading>On the web</SidebarHeading>
            <div className="flex flex-col gap-0.5">
              {socialLinks.map(([platform, handle]) => (
                <a
                  key={platform}
                  href="#"
                  className="flex items-center gap-2.5 py-1.5 text-[13.5px] text-paper transition-colors hover:text-gold"
                >
                  <SocialIcon platform={platform} />
                  <span className="truncate">
                    {PLATFORM_NAMES[platform] ?? platform}
                  </span>
                  <span className="truncate text-muted-foreground">
                    {handle}
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

        <SidebarHeading>About</SidebarHeading>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          {artist.bio}
        </p>

        {artist.tags.length > 0 && (
          <>
            <SidebarHeading>Disciplines</SidebarHeading>
            <div className="flex flex-col gap-1 text-[13.5px] text-paper/90">
              {artist.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </>
        )}

        <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-faint">
          Member since {joinDate}
        </p>
      </motion.aside>

      {/* ===== Work column ===== */}
      <main>
        <div className="mb-6 flex gap-7 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "relative pb-3.5 text-sm font-medium transition-colors " +
                (tab === t
                  ? "text-paper"
                  : "text-muted-foreground hover:text-paper")
              }
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId={`profile-tab-${artist.id}`}
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        {tab === "Work" &&
          (artist.workSamples.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {artist.workSamples.map((sample, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease }}
                  className="group overflow-hidden rounded-[10px] border border-line bg-bg2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sample.src}
                      alt={sample.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="px-3.5 py-3 text-[13.5px] font-medium text-paper">
                    {sample.alt}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : (
            <EmptyState label="No work published yet." />
          ))}

        {tab === "Collections" && (
          <EmptyState label="No collections yet." />
        )}

        {tab === "About" && (
          <div className="max-w-2xl">
            <p className="text-[15px] leading-relaxed text-paper/80">
              {artist.bio}
            </p>
            <p className="mt-6 text-[13px] uppercase tracking-[0.16em] text-faint">
              {artist.role} · {cityLine || artist.country}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 mt-5 text-[11px] uppercase tracking-[0.16em] text-faint">
      {children}
    </h2>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line py-20 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
