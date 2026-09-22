# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Kingdom creatives — Christian artists who "build with God, for God." Music-first: singers, songwriters, worship leaders, producers, engineers; secondarily filmmakers, photographers, designers, visual artists, writers. They carry a calling most people around them don't fully understand and have been creating in isolation (bedrooms, living rooms, no crew). They find the site via David & Cara's audience, social, and member vouch links, usually on their phones.

## Product Purpose

Kingdom Artists is a community platform (in development, launching 2026) where every Kingdom creative has a profile to showcase their gift and can find each other by craft, city, and calling — then build together. The current site is a pre-launch application funnel: recruit and hand-pick the "Founding 300" members. Success = qualified applications submitted and accepted.

## Positioning

The first platform built specifically for Kingdom creatives — Fiverr × Behance × social, but faith-native. Scarcity is theological, not manufactured: Gideon's 300 (God starts movements with a committed few). Every application is reviewed personally by the founders (David & Cara) — no algorithms. Accepted members get a personal vouch link that fast-tracks creatives they believe in ("the 300 choose the family").

## Operating Context

- Live production: kingdomartists.com (Vercel, Next.js 16 App Router, Tailwind v4). Application flow at /apply: 7 full-screen steps ending in a voice note answering "Why do you create?" (MediaRecorder → Supabase Storage).
- Backend is live and must keep working: Supabase (`applications` table, voice-notes bucket), /api/apply, /api/stats, /api/voice, admin dashboard at /admin/applications (Bearer key auth), Resend transactional emails.
- The public counter counts ACCEPTED members only (spots claimed), never applicants — the founders' explicit honesty rule. Real-time from /api/stats.
- Vouch links: `kingdomartists.com/?ref=<slug>` must carry through every Apply CTA to /apply.

## Capabilities and Constraints

- Copy is founder-approved and locked in meaning (wording refinement OK, claims/theology fixed): Bezalel hero angle, isolation-not-gift problem framing (never make church or industry sound "less than" — Cara's rule), the prophetic "renaissance" line, "Why 300?" Gideon story, founding perks, founder letter, FAQ answers (free for life, 24–48h review).
- Sections that must exist: hero, problem read, prophetic vision + "On earth as it is in heaven" quote, platform preview (real-looking app UI mockup — search, filters by city/"looking for", featured creatives, messages), founding 300 + live counter, application process steps, signed founder letter, FAQ, final CTA.
- Character portraits available at public/characters/ (6 editorial portraits: songwriter, producer, musician, engineer, filmmaker, photographer) — usable as platform-mockup content.
- Review time commitment: 24 to 48 hours, everywhere.
- Framer Motion installed as `framer-motion` AND `motion` guidance active (import from `motion/react` per motion MCP); Lenis installed.

## Brand Commitments

- Name: Kingdom Artists. Wordmark: *kingdom* (italic serif) + **artists** (bold grotesque), lowercase — the approved construction.
- Visual direction (this rebuild): EVOLVE the approved soft-blue minimal world — light, Apple-minimal, tech-startup-with-community warmth, cobalt-family blue as the accent (current #1E45C9; may be tuned), inspired by the Rest Day brand guidelines (off-white ground, bold grotesque headlines, serif-italic accent words, mono microlabels). Push further within that anchor; do not return to dark/gold.
- Never churchy: no doves, crosses-in-logos, purple gradients, stock worship photography. Sacred = restraint.
- Voice: artist-first, conviction over hype; scripture woven, not cited; gen-z aware but timeless.

## Evidence on Hand

- 2 real applications in production (David & Cara themselves) — do not delete; counter shows 0 accepted honestly.
- No testimonials, member counts, or press exist yet — never fabricate any.
- Rest Day brand guideline PDFs (user-supplied reference): ~/Downloads/📁 Organized/Documents & Misc/.
- Research reports (in-session): waitlist conversion patterns (Hampton architecture), niche palette research.

## Product Principles

1. Honesty converts here: real counters, real review, real scarcity — nothing manufactured.
2. The page is the platform's first room: its design previews the product's quality bar.
3. Community over feed: language and UI signal belonging and collaboration, not content consumption.
4. Faith with craft: sacred conviction expressed through restraint and excellence, never ornament.
5. Every visitor path ends at /apply, and the vouch ref must survive the journey.
