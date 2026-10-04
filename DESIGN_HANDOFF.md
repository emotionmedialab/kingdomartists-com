# Kingdom Artists — UI/UX Redesign Handoff

> **For the implementing session.** This document is the single source of truth for redesigning the Kingdom Artists UI. Scope is **UI/UX only** — no backend, no auth, no data-model changes. Keep using the existing mock data (`src/lib/mock-data.ts`, `src/lib/artist-store.ts`).

---

## 0. What this is

Kingdom Artists is a **discovery + collaboration network for Christian ("Kingdom") creatives** (musicians, filmmakers, designers, photographers, worship leaders). It is **not** a hiring marketplace — the core action is *discover a creative → see their work → message them to collaborate*. One-sided (creatives discovering creatives). Pre-launch (waitlist on the landing page).

The redesign turns the current generic light template into **one cohesive, dark, editorial product** modeled on three references.

---

## 1. Source of truth — the approved mockups

Final approved renders (study these — they ARE the target):

| Screen | Render (PNG) | Editable source |
|---|---|---|
| Landing | `.shots/explore/_renders/v2-landing.png` | `.shots/explore/v2/landing.html` |
| Discover | `.shots/explore/_renders/v2-discover.png` | `.shots/explore/v2/discover.html` |
| Profile | `.shots/explore/_renders/v2-profile.png` | `.shots/explore/v2/profile.html` |

Shared design system stylesheet: **`.shots/explore/v2/_system.css`** (tokens + base classes).

**Open the HTML files in a browser** (or read them) — they are working, self-contained reference implementations. Port their look into the real Next.js components; do not just eyeball the PNGs.

Each screen is modeled on a real site (structure only, not a clone):
- **Landing → Tribl** (tribl.com): dark cinematic hero, "The Roster." name list, editorial framing.
- **Discover → Cosmos** (cosmos.so): pill nav + big search, category tabs, curated collection rows, then a true-color masonry.
- **Profile → Behance** (behance.net profile): left info sidebar + right work grid — but re-skinned **dark in our style**.

More reference screenshots live in `.shots/inspo/` if context helps.

---

## 2. Brand system (apply identically on every screen)

### Logo & marks
- **Wordmark:** `✦ Kingdom Artists.` — **Fraunces italic**, 500 weight, trailing period. The `✦` is gold; the words are paper-white.
- **Brand mark / verified mark:** `✦` (four-point star) in gold. Same glyph next to a creative's name = **verified member**. (Replace the placeholder `✦` with a proper SVG when productionizing — see `src/components/app/verified-badge.tsx`.)
- **Status dot:** small glowing **green** dot = "Open to collaborate". Kept distinct from the gold brand mark.

### Typography
- **Fraunces** (high-contrast display serif) → wordmark, hero headlines, creative names, section titles ("The Roster.", "Selected by Kingdom Artists", "Explore the work"), big italic accent words (e.g. *called*).
- **Inter** (grotesque sans) → nav, labels, body, tags, stats, captions, all metadata.
- **Rule:** serif = brand & hierarchy moments only; sans = everything functional. (Do NOT set work captions / metadata in serif.)

### Color palette (tokens)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0c0b0d` | page background (warm near-black) |
| `--bg2` | `#161318` | cards / panels / search fields |
| `--bg3` | `#1d1922` | active nav pill / raised surfaces |
| `--paper` | `#ece7dd` | primary text (warm off-white) |
| `--muted` | `#928c83` | secondary text |
| `--faint` | `#5d574f` | tertiary / footnotes |
| `--line` | `rgba(236,231,221,.12)` | hairline dividers/borders |
| `--line2` | `rgba(236,231,221,.22)` | stronger borders (ghost buttons) |
| `--gold` | `#d8a44c` | **the accent** |
| `--gold-soft` | `#ecca8a` | accent on dark / italic display words |
| `--green` | `#5fcf80` | "available" status dot ONLY |

### Accent rules (important — this was hard-won)
- **Solid gold** = the ONE primary action per screen (Join the Waitlist / Message). Never more than one solid-gold surface area per view.
- **Gold text / underline** = links ("Open the file →") and the active tab indicator.
- **Gold italic** = display emphasis words in headlines.
- Everything else stays neutral dark. The accent must be applied **consistently** across all screens (don't let it balloon into a full color band on one screen and vanish on another).

### Components
- **Buttons:** pill-shaped (`border-radius: 999px`). Variants: `pill-gold` (solid, primary), `pill-ghost` (hairline outline, secondary), `pill-paper` (off-white, rare).
- **Cards/tiles:** `--bg2` fill, `--line` border, ~10–14px radius.
- **Photography: ALWAYS true color, unfiltered.** The chrome is a calm dark gallery wall; the creators' work is the only thing in full color. Never apply grayscale/duotone/brand-tint to user work or portraits.

### Voice / motifs (use sparingly)
- Tagline: **"For the ones who carry the Kingdom."**
- Editorial markers: *Vol. 01*, *Est. 2026*, *Worldwide*, "The Roster.", "Open the file →", `01 / 08` counters.
- **No literal religious imagery** (no crosses/doves/sunbursts/halos). Warmth + craft carry the theme.

---

## 3. Per-screen specs

### Landing (`src/app/page.tsx` + `src/components/landing/*`)
Rebuild as the Tribl-style cinematic page:
1. **Hero** — full-viewport, full-bleed dramatic photo with dark gradient scrims; overlaid: top-left est. label, top-right `01 / 08` counter, giant Fraunces headline ("Home for the *called*."), bottom-left subcopy, bottom-right "Featured · <name>". Nav overlaid on top (wordmark left, sans caps links center, gold "Join the Waitlist" pill right).
2. **Featured creative** — large italic-serif name + small portrait card + "Open the file →" gold link.
3. **"The Roster."** — big serif heading + a list of creatives; each row = index number, italic-serif name + ✦, sans role tag, small thumbnail. Hairline dividers.
4. **Statement block** — image + big italic-serif line ("I was made to glorify Your name.") + muted body.
5. **"Working together."** — closing CTA + gold waitlist pill + footer with wordmark.

### Discover (`src/app/(app)/discover/page.tsx`, nav in `src/components/app/app-navbar.tsx`)
Rebuild as the Cosmos-style explore:
1. **Top bar** — circular/✦ wordmark, pill nav (Explore/Following), big rounded **search** field, "Log in" + gold "Join the waitlist" pill.
2. **Category tabs** — horizontal scroll of discipline pills (Featured/Music/Photography/Film/Graphic Design/Branding/Visual Art/Worship/…). Active = paper-fill pill.
3. **"Selected by Kingdom Artists"** — row of curated collection cards (each = a 3-image cluster + title + @user · N pieces). Section title in serif.
4. **"Explore the work"** — true-color **masonry** (CSS columns) of work images; each tile has a small serif name overlay (+ ✦). This is the heart of discovery — work-forward.

### Profile (`src/app/(app)/artists/[username]/page.tsx`, and mirror for `src/app/(app)/profile/page.tsx`)
Rebuild as the Behance-structure profile, **dark/our skin**:
- **Left sidebar (sticky):** square avatar, serif name + ✦, role/location/"⌂ church" rows, green "Open to collaborate", gold **Message** + ghost **Save** buttons, stats (views/appreciations/followers), "On the web" social links, "About", "Disciplines" list, "Member since".
- **Right:** tabs (Work / Collections / About, active tab = gold underline) + a 3-up grid of true-color work cards with sans captions.
- **Avatar/name must stay readable** — never dark text over a bright banner (a recurring bug; keep the name on the dark sidebar, not over imagery).

Also restyle `src/components/app/artist-card.tsx`, `bottom-nav.tsx`, `verified-badge.tsx` to the system.

---

## 4. How to wire it into THIS codebase

Stack: **Next.js 16, React 19, Tailwind v4, shadcn (base-nova)**. ⚠️ See `AGENTS.md` — this is a non-standard Next.js build; **read `node_modules/next/dist/docs/` before writing Next-specific code.**

1. **Theme → dark.** In `src/app/globals.css`, the `:root` block is currently a *light* palette. Replace those token values with the dark palette above (it already uses `@theme inline` mapping `--color-*` → `--*`, so just update the raw values). Map:
   - `--background: #0c0b0d` · `--foreground: #ece7dd`
   - `--card: #161318` · `--card-foreground: #ece7dd` · `--popover` same
   - `--primary: #d8a44c` · `--primary-foreground: #1c1206` (gold = primary)
   - `--secondary: #1d1922` · `--muted: #161318` · `--muted-foreground: #928c83`
   - `--accent: #d8a44c` · `--accent-foreground: #1c1206`
   - `--border` / `--input: rgba(236,231,221,.12)` · `--ring: #d8a44c`
   - Add new tokens: `--gold`, `--gold-soft`, `--green`, `--paper`, `--faint` (and expose via `@theme inline` if you want `bg-gold` utilities).
   - Keep `--radius: 0.75rem`; use `rounded-full` for pills.
2. **Fonts.** In `src/app/layout.tsx`, swap `Playfair_Display` → **`Fraunces`** from `next/font/google` (keep the `--font-heading` variable name so existing `font-[family-name:var(--font-heading)]` usages pick it up). Keep **Inter** as `--font-sans`. Fraunces needs italic + a wide weight/optical range.
3. **Grain (optional):** a `.film-grain` utility already exists in `globals.css` — reuse it for the hero if you want subtle texture (use very sparingly).
4. **Images:** `next.config.ts` already allow-lists `images.unsplash.com` (all mock data uses it). No change needed.
5. **Data:** unchanged. Pull from `src/lib/mock-data.ts` / `artist-store.ts`. The `Artist` type has `name, role, category, tags, city/state/country, bio, image, banner, links, workSamples, verified, featured`.
6. **Responsive:** the mockups are desktop (1440px). Build mobile-responsive — collapse the profile sidebar above the grid, stack the landing hero, reduce masonry columns, and restyle the existing mobile `bottom-nav.tsx` to the dark system.
7. **Motion (do this — it's what the static mockups can't show):** subtle, tasteful only — work tiles/rows fade-and-rise on scroll into view, hover lift on cards, the hero image slow scale. `framer-motion` is already a dependency.

---

## 5. Locked principles & don'ts

- ✅ One system: same Fraunces+Inter, same dark palette, same gold accent, same `✦ Kingdom Artists.` wordmark on **every** screen.
- ✅ Work is the only color. Chrome stays dark/neutral; never filter user images.
- ✅ Serif for brand/hierarchy, sans for everything functional.
- ✅ One solid-gold primary action per screen; accent applied consistently.
- ❌ No light-mode screens (the profile is dark now — do not revert to Behance's light look).
- ❌ No editorial "issue/Maverick" framing was rejected for landing — keep it Tribl-cinematic.
- ❌ No literal religious clip-art.
- ❌ No backend/auth/data changes — UI/UX only.

---

## 6. Suggested build order
1. Tokens + fonts in `globals.css` / `layout.tsx` (the whole app flips dark).
2. Shared primitives: nav/wordmark, pill buttons, verified badge, card/tile, section heading.
3. Profile (most self-contained) → Discover → Landing.
4. Responsive pass + motion pass.
5. Run the app and compare each screen against its `v2-*.png` render.
