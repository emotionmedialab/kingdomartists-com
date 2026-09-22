---
name: Kingdom Artists
description: The Session Sheet — a studio call-sheet world in four inks on paper, where applying is signing the sheet.
colors:
  paper: "#F7F6F2"
  cobalt: "#1D44BE"
  ink: "#101318"
  stamp-red: "#D64541"
  rule: "rgba(29,68,190,0.3)"
  rule-soft: "rgba(29,68,190,0.16)"
  faint: "rgba(16,19,24,0.68)"
  cobalt-pressed: "#16359C"
  exhibit-white: "#FFFFFF"
typography:
  form-poster:
    fontFamily: "var(--font-form), sans-serif"
    fontSize: "clamp(40px, 7.6vw, 118px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.01em"
    fontVariation: '"wdth" 125'
  form-headline:
    fontFamily: "var(--font-form), sans-serif"
    fontSize: "clamp(34px, 5.6vw, 84px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.01em"
    fontVariation: '"wdth" 125'
  form-label:
    fontFamily: "var(--font-form), sans-serif"
    fontSize: "10.5px"
    fontWeight: 600
    letterSpacing: "0.14em"
    fontVariation: '"wdth" 118'
  typed-body:
    fontFamily: "var(--font-typed), monospace"
    fontSize: "clamp(14px, 1.35vw, 16.5px)"
    fontWeight: 400
    lineHeight: 1.75
  typed-value:
    fontFamily: "var(--font-typed), monospace"
    fontSize: "clamp(15px, 1.6vw, 19px)"
    lineHeight: 1.35
  script-accent:
    fontFamily: "var(--font-display), Georgia, serif"
    fontWeight: 400
rounded:
  field: "3px"
  control: "4px"
  card: "6px"
spacing:
  row: "10px 2px 8px"
  section-y: "clamp(56px, 8vw, 120px)"
  section-x: "clamp(20px, 5vw, 72px)"
  gutter: "clamp(24px, 4vw, 56px)"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "17px 34px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-pressed}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.control}"
    padding: "9px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
  field-row:
    backgroundColor: "transparent"
    padding: "10px 2px 8px"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
    rounded: "6px"
    padding: "0.3em 0.7em"
  exhibit-card:
    backgroundColor: "{colors.exhibit-white}"
    rounded: "{rounded.card}"
---

# Design System: Kingdom Artists

## Overview

**Creative North Star: "The Session Sheet"**

The page is a studio booking document. Applying to Kingdom Artists is being booked for the session of your life, so every surface reads as one continuous session sheet set poster-grade: a letterhead nav, a giant form title, blue-ruled field rows with typewritten-in values, routing stamps, punched tabs, and a signature line that is the CTA. The world is legible with all content removed — a beautiful blank form.

Everything is paper and ink. There are no photographic backgrounds, no gradients, no washes; depth exists only where a physical exhibit is pinned to the sheet (white card, thin ink border, paper-lift shadow). Every interactive or revealed state is an **ink event** — typed, stamped, drawn, ruled, punched, flagged — never a new hue, never a glow.

**Key Characteristics:**
- Four inks only; all other values are dilutions of cobalt or ink.
- Three type voices with strict jobs: form caps, typewriter, serif italic.
- Form vocabulary as component set: ruled fields, stamps, signature lines, take counters.
- Motion is orchestration of ink landing on paper, once per element, on scroll.
- Sacred = restraint: never churchy, never ornamental.

## Colors

Four inks on paper; tints are dilutions, never new colors.

### Primary
- **Cobalt** (#1D44BE): the form's printed ink. Rules, labels, stamps, accent headline lines, typed caret, selection, focus rings, the filled CTA. It is structural, not decorative.
- **Cobalt Pressed** (#16359C): the CTA's hover fill only.

### Secondary
- **Stamp Red** (#D64541): the rare second stamp ink. At most one red event per view (e.g. "FLAGGED: ISOLATION", the "BOOKED" routing stamp). Never used for text, fills, or errors-by-default.

### Neutral
- **Paper** (#F7F6F2): the ground of every view; also the text color on cobalt fills.
- **Ink** (#101318): near-black body ink for headlines, typed values, and the signature underline.
- **Faint** (rgba(16,19,24,0.68)): diluted ink for secondary typed text, captions, meta.
- **Rule** (rgba(29,68,190,0.3)) and **Rule Soft** (rgba(29,68,190,0.16)): cobalt dilutions for field underlines, hairline borders, and the tape's tick grid.
- **Exhibit White** (#FFFFFF): only inside pinned exhibits (platform mockup, take counter, founder memo) — a brighter sheet stapled onto the paper.

### Named Rules
**The Four-Ink Rule.** Paper, cobalt, ink, stamp red — nothing else. A new state, emphasis, or component earns a dilution of an existing ink, never a fifth color.

**The One Red Rule.** Stamp red appears at most once per view, always as a stamp.

## Typography

**Display/Form Font:** Archivo variable (`--font-form`, sans-serif fallback) — width axis is the voice: `wdth` 125 at poster scale, 116–118 for labels and buttons, 110–112 for compact chips and the wordmark's "artists".
**Body/Value Font:** Courier Prime (`--font-typed`, monospace fallback) — everything "filled in": body paragraphs, field values, captions, the counter digits (tabular-nums).
**Script Font:** Fraunces (`--font-display`, Georgia serif fallback) — italic only, reserved for the wordmark's *kingdom*, scripture, and signatures ("— David & Cara", "On earth as it is in heaven").

**Character:** A printed form (wide grotesque caps) filled in by a typewriter, occasionally signed by hand. The three voices never trade jobs.

### Hierarchy
- **Form Poster** (700, clamp(40px, 7.6vw, 118px), 0.96, wdth 125, uppercase): section and hero titles; multi-line, with one line flipped to cobalt.
- **Form Headline** (700, clamp(34px, 5.6vw, 84px)): same voice at section scale.
- **Form Label** (600, 10.5px, 0.14em tracking, wdth 118, uppercase, cobalt): the printed field labels and section kickers-as-labels ("ENGINEER'S NOTES — READ BEFORE SESSION").
- **Typed Value** (400 mono, clamp(15px, 1.6vw, 19px)): the filled-in answers on ruled rows.
- **Typed Body** (400 mono, clamp(14px, 1.35vw, 16.5px), 1.75): paragraphs, always ink or faint.
- **Script Accent** (Fraunces italic, up to clamp(38px, 7.4vw, 108px) for the one scripture line): handwritten-register moments only.

### Named Rules
**The Three Voices Rule.** Archivo speaks as the form, Courier Prime as the person filling it in, Fraunces italic as the hand that signs it. No voice does another's job; Fraunces never sets UI or body copy.

## Layout

One continuous sheet, max-width 1180px, centered. Sections are `Sheet` blocks: padding `clamp(56px, 8vw, 120px)` vertical by `clamp(20px, 5vw, 72px)` horizontal, opened by a 2px solid cobalt top rule. Each section leads with a form-label header row (label left, stamp right). Field grids use `repeat(auto-fit, minmax(min(100%, 250px), 1fr))` with `clamp(24px, 4vw, 56px)` column gaps, so mobile stacks rows while poster titles keep their scale. The fixed letterhead nav gains a translucent paper background (rgba(247,246,242,0.88) + 12px blur) and a rule border only after 24px of scroll. The apply flow is full-screen one-question-per-step with centered typewriter inputs underlined in 2px ink.

## Elevation & Depth

The sheet itself is flat — depth is drawn (rules, borders), not cast. Shadows exist only where a physical object sits ON the paper: pinned exhibits and the CTA. No glows, no ambient washes.

### Shadow Vocabulary
- **Paper-lift** (`box-shadow: 0 2px 0 rgba(16,19,24,0.14), 0 24px 48px -28px rgba(16,19,24,0.28)`): pinned exhibits — the platform mockup, take counter, founder memo (variant `0 20px 40px -26px rgba(16,19,24,0.25)`).
- **CTA press** (`0 1px 0 rgba(16,19,24,0.12), 0 10px 26px -14px rgba(29,68,190,0.6)`, deepening on hover): the cobalt signature-block button only.
- **Punch inset** (`inset 0 1px 2px rgba(16,19,24,0.18)`): punched holes.

### Named Rules
**The Ink Event Rule.** Every state change is an ink event — typed, stamped, drawn, ruled, punched, flagged — never a new hue, glow, gradient, or parallax.

## Shapes

Squared, form-like geometry. Radii are small and functional: 3px for chips/tape, 4px for buttons and input frames, 6px for stamps and exhibit cards, 2px on focus outlines. Borders are the structure: 1px cobalt-dilution hairlines for rules, 1.5px ink for exhibits, 2px solid cobalt for section/sheet-header rules, 2.5px currentColor for stamps, 2px ink for signature underlines. Circles exist only as punched holes (14px). Icons are single-weight drawn SVG strokes (check, plus, search) — never unicode glyphs or icon fonts.

## Components

### Field (ruled row) — the sheet's atom
- **Structure:** baseline flex row — cobalt form label + mono typed value, padding 10px 2px 8px, 1px `rule` bottom border (`.ka7-row`).
- **Fill-in:** values may typewrite in on first view (`TypeIn`, ~26ms/char, blinking 0.62em cobalt block caret, `ka7-caret` step keyframe). Reduced motion renders instantly.

### Buttons
- **Shape:** squared signature block (4px radius), Archivo wdth 116, 14px/700, 0.1em tracking, uppercase.
- **Primary (SignLink):** cobalt fill, paper text, padding 17px 34px, paper-lift shadow; hover deepens to #16359C and lifts -2px; active settles to scale(0.99). Always sits ON a signature line (2px ink underline) and always carries the vouch `?ref=` through to /apply.
- **Ghost:** transparent with 1px `rule` border, cobalt text; hover floods cobalt with paper text.

### Stamp
- **Style:** Archivo wdth 125 caps, 0.12em tracking, 2.5px currentColor border, 6px radius, rotated -6° to +5°, ink-grain via an SVG fractal-noise mask (`mask-image` data URI, 140×60 tile).
- **Entrance:** thunks down on view — `ka7-stamp` keyframe, scale 1.6 → 0.96 → 1 over 0.5s.
- **Ink:** cobalt by default; red for the rare flag ("FLAGGED", "BOOKED").

### Take Counter (signature component)
- White exhibit card (1.5px ink border, 6px radius, paper-lift shadow). Mono tabular digits padded to three places (`000`) count up with `circOut` over 1.1s. The chorded tape: one bar, 60-tick `rule-soft` grid; applied = -45° cobalt pencil hatch, accepted = solid cobalt ink fill, each drawing in left-to-right. Honesty rule: accepted count only fills "seats".

### Exhibit (pinned card)
- White ground, 1.5px ink border, 6px radius, paper-lift shadow, two punched holes (`.ka7-punch`) breaking its top edge. Used for the platform mockup and founder memo; internal UI reuses the same four inks and three voices at reduced scale.

### Letterhead (navigation)
- Fixed; wordmark left, ghost "Apply" right. Transparent at top; after 24px scroll: translucent paper + blur + 1px rule bottom border.

### Wordmark
- Baseline-aligned pair: *kingdom* in Fraunces italic 400 + **artists** in Archivo 700 wdth 110, lowercase, -0.02em, ink by default. Built in `Wordmark` (src/components/landing/v7/ui.tsx); never set as an image or single font.

### Inputs (apply flow)
- Centered, frameless mono type at poster-adjacent scale (clamp(28px, 4.5vw, 56px)), 2px ink bottom border, cobalt caret. One question per full-screen step; steps cross-fade (280ms). Validation errors are typed sentences, not red UI.

### Browser surface (.ka7 scope)
- Selection: rgba(29,68,190,0.85) with paper text. Caret: cobalt. Focus-visible: 2px cobalt outline, 3px offset, 2px radius. Scrollbar thumb: rgba(29,68,190,0.4). Reduced motion collapses all animation/transition durations to ~0.

## Do's and Don'ts

### Do:
- **Do** state every state change as an ink event: type it in, stamp it down, draw the line, punch the hole.
- **Do** open every section with a 2px cobalt rule and a form-label header row (label left, optional stamp right).
- **Do** keep motion once-per-element (`useInView`/`whileInView` with `once: true`) on the shared ease `cubic-bezier(0.16, 1, 0.3, 1)`, and honor prefers-reduced-motion.
- **Do** carry the `?ref=` query into /apply from every CTA (SignLink handles it).
- **Do** flip exactly one line of a multi-line poster title to cobalt.
- **Do** draw icons as single-weight SVG strokes in cobalt or faint.

### Don't:
- **Don't** introduce a fifth color, gradient, glow, or parallax wash; tints must be dilutions of cobalt or ink.
- **Don't** use stamp red more than once per view, or for anything but a stamp.
- **Don't** let Fraunces set body copy, labels, or UI — it is the wordmark's *kingdom*, scripture, and signatures only.
- **Don't** cast shadows on the sheet itself; shadows belong only to objects pinned onto it (exhibits, the CTA).
- **Don't** reach for churchy ornament (doves, crosses, purple gradients, stock worship photography) — sacred is restraint.
- **Don't** show applied counts as "filled" seats; the counter's solid ink is accepted members only.
