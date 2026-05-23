# dalin.dev — 2026 Redesign Design Doc

**Date:** 2026-05-23
**Author:** Dalin Huang (with Claude Opus 4.7)
**Status:** Approved — pending final spec review
**Predecessor:** `index_2024.html` (Matrix terminal / blockchain-blocks aesthetic)

---

## 0. The pitch

A portfolio that **looks like the AI agent dashboards I actually build at work** — Mission Control for Dalin Huang. A live operational view of an operator with seven deployed agents (roles), six services (projects), live metrics, and a 3D **System Map** that lets you fly through the whole thing.

The aesthetic is honest: this is the kind of UI I ship daily at Parker AI, just turned inward.

## 1. Goals

1. **Lead with AI.** Front-and-center positioning as **Senior Full Stack Developer / AI Developer (Parker AI)**. The work — LoRA fine-tuning, Gemini Batch API, billion-scale pipelines — is the headline, not a footnote.
2. **Look genuinely cool.** Visitors should screenshot it. Dark dashboard chrome, neon accents, subtle motion, one show-stopping interactive 3D set piece.
3. **Reward exploration.** The page is calm at first glance but reveals depth on hover, click, scroll. The System Map is the headline interaction; boot sequence + easter eggs are the rest.
4. **Stay shippable.** Single `index.html` on GitHub Pages. No build step. Editable with a text editor. The data is in JS objects at the top of the file — to update a role, edit one object.

> **Explicitly not a goal:** chasing Lighthouse scores. The 2024 version hit 100; this one carries Three.js and lots of motion. Aim for "feels smooth on a 5-year-old laptop," not "perfect numbers."

## 2. Non-goals

- No build tooling. No bundler, no transpile step, no `npm install`.
- No backend, no analytics, no tracking, no comments, no login.
- No CMS — content lives as plain-old JS arrays inside the file.
- Not trying to out-3D Bruno Simon. The graph impresses, the dashboard framing differentiates.
- Not a resume replacement — the PDF still exists; the site is the *experience*.

## 3. Architecture

### 3.1 File layout

```
dalin.dev/
├── index.html          ← NEW (this redesign)
├── index_2024.html     ← old index.html, renamed
├── index_2023.html
├── index_2017.html
├── img/
│   ├── favicon.ico
│   ├── og.png          ← optional new OG image (carry forward hd.jpg if skipped)
│   └── ...
├── CNAME               ← unchanged
└── README.md           ← append 2026 section
```

### 3.2 Stack

| Concern | Choice | Why |
|---|---|---|
| Markup | One `index.html` with inline `<style>` and `<script>` | GitHub Pages is static; one file = trivially editable |
| 3D | **Three.js r160** from `cdn.jsdelivr.net`, pinned | Industry standard; rich enough for our graph; CDN avoids bloating the file |
| Fonts | **JetBrains Mono** (variable, weights 200/400/700/800) via Google Fonts | Refined mono, supports light/heavy contrast for hierarchy |
| Icons | Inline SVG only | No icon font dep |
| Anim | CSS animations + small custom raf loops | No GSAP / no Framer |

### 3.3 Load order

1. `<head>`: meta, fonts (preconnect + non-blocking), inline critical CSS, JSON-LD.
2. `<body>`: full DOM rendered statically (every section is real HTML even before JS runs).
3. End of `<body>`: Three.js CDN tag + inline `<script>` that:
   - Runs the boot sequence (skipped on repeat visits via `localStorage`).
   - Hydrates dynamic bits: count-up KPIs, terminal log loop, System Map, expand/collapse.

If JS is disabled or Three.js fails to load, every section still renders and reads correctly. The System Map degrades to the static SVG ghost we already mocked up.

## 4. Page structure

Single-page vertical scroll, top to bottom:

| # | Section | Height | Purpose |
|---|---|---|---|
| 1 | Top bar | 44px sticky | Status, version, social links |
| 2 | Hero | ~360px | Identity + live terminal |
| 3 | KPI strip | 100px | 4 headline numbers |
| 4 | **System Map** | 480px | Interactive 3D graph (centerpiece) |
| 5 | Active Agents | auto | Experience as deployed-agent cards |
| 6 | Deployed Services | auto | Projects as service tiles |
| 7 | System Capabilities | auto | Skill heatmap |
| 8 | Footer | 60px | Education, build tag |

### 4.1 Boot sequence (first visit only)

A 1.5–2.0s overlay that fades over the page on first load. Skipped via `localStorage.dalindev_booted = '1'` on subsequent visits (with a hidden re-trigger via `?boot=1`).

Sequence (each line types in ~150ms, total ~1.6s):

```
> INITIALIZING DALIN.DEV v2026.1
> LOADING AGENTS [████████████░░░░] 7/7
> CONNECTING TO SERVICES [████████████████] 6/6
> SYNCING SKILL MATRIX  ............. OK
> READY ▍
```

Then the overlay fades out (300ms), the hero name and terminal animate in.

### 4.2 Top bar (sticky)

```
DALIN.DEV  v2026.1  · ● ONLINE · OTTAWA              LINKEDIN · GITHUB · EMAIL · RESUME
```

- 1px hairline bottom border.
- `● ONLINE` pulses (2s loop).
- `v2026.1` is clickable — **easter egg**: clicking it cycles a small ghost preview of `index_2024.html`, `index_2023.html`, `index_2017.html` (5s each, then snaps back to current).

### 4.3 Hero

Two-column on desktop (`grid-template-columns: 1fr 1.1fr`); single-column on mobile (terminal stacks below).

**Left column — final copy:**

```
// OPERATOR
Dalin Huang
Senior Full Stack Developer / AI Developer

Building AI agent platforms at Parker AI. Async pipelines that process
billions of data points a day. Fine-tunes open-weight LLMs with LoRA.
Eleven years shipping production systems — backend, frontend, and the
weird stuff in between.

[→ LINKEDIN]  [→ GITHUB]  [→ EMAIL]  [→ RESUME.PDF]
```

**Right column — live terminal:**

A `~160px` tall mono box, looks like a tailing log. Eight rotating lines, each fades in over 200ms and lives ~6s before recycling. The list is deterministic (loops) but the entry-stagger makes it feel live.

```
[12:04:01]  agent.parker      · ok    · batch 482  · 12.4M embeddings
[12:04:03]  finetune.v17      · LoRA  · step 1240/2000
[12:04:05]  scraper.adset     · ok    · 87 sources synced
[12:04:07]  dashboard.ttq     · 38ms p50  · 124ms p95
[12:04:09]  [!] rate-limit    · backoff 2s · retry · ok
[12:04:11]  f1.score          = 0.794 ↑
[12:04:13]  postgres.rollup   · daily · 18.2M rows
[12:04:15]  ingest.media      · 2.1TB queued
```

**Background:** Faded SVG ghost of the System Map graph (the same graph rendered statically, very low opacity — see §5.6). NOT a separate Three.js scene; one canvas budget.

### 4.4 KPI strip

Four equal cells, hairline column dividers. On first viewport entry, numbers count up from 0 to target over ~900ms (`IntersectionObserver`, easeOutCubic).

| Label | Value | Sub |
|---|---|---|
| YEARS SHIPPED | **11+** | since 2015 · still compounding |
| F1 LIFT · 30 ITER | **79%** | from 0.7% zero-shot |
| PLATFORM SCALE | **~100×** | thousands of workflows |
| DATA THROUGHPUT | **BILLIONS** | data pts · ads · media / day |

Click any KPI → opens an inline drawer underneath the strip with one paragraph of context and a `→ jump to source` link to the relevant agent card.

### 4.5 System Map (centerpiece)

The piece to over-invest in. Real Three.js, real interactivity.

**Container:** 480px tall, full content-width, hairline border on all sides, dark inner bg (`--bg-deep`).

**Toolbar (top of container):**

```
// SYSTEM MAP · ROLES ↔ PROJECTS ↔ SKILLS · DRAG TO ROTATE     [● ROLES] [● PROJECTS] [● SKILLS]   [⌕ search nodes]
```

(Node/edge counts in the toolbar are computed at render time, not hard-coded — typically ~34 nodes, ~80 edges.)

- Filter chips toggle visibility of each node class (with smooth fade).
- Search is a small text input top-right. Type-ahead matches node names; selecting flies the camera to that node.

**Scene composition:**

- **Hub:** "DALIN" — single bright white IcosahedronGeometry (low-poly sphere), radius 0.4, emissive shader with soft pulsing glow. Always centered at origin.
- **Role nodes** (`--accent-live` green): 7 total. Sized by tenure (Parker AI / HiNature largest, Events.com smallest). Positioned on the inner ring (~radius 2).
- **Project nodes** (`--accent-link` blue): 6 total. Positioned around the upper hemisphere mixed with roles (~radius 2.4).
- **Skill nodes** (`--accent-warn` amber): ~20 total — only the standout skills appear in the graph (not every entry of the skill matrix). Positioned on an outer ring (~radius 3.2).
- **Edges:** thin lines. Color inherits source node color at 35% opacity, animated dashed flow (subtle, 6s loop). Total ~88 edges.
- **Background:** transparent (page bg shows through). No starfield clutter.
- **Lighting:** Single hemisphere light + soft point at hub. No bloom (CSS glow on the wrapper instead — cheaper and consistent with the rest of the page).

**Initial layout:** Deterministic concentric placement (no force sim). Computed once at init from the data arrays — same shape every load.

**Camera:** Perspective, fov 55, starts at (5, 2, 6) looking at origin. OrbitControls enabled (drag-orbit, scroll-zoom). Auto-rotates around Y at ~6 deg/sec when idle.

**Interactions:**

| Trigger | Behavior |
|---|---|
| **Idle** | Slow auto-rotate. Nodes gently pulse (radius ±8%, 3s loop, phase-offset by node id). |
| **Mouse drag on canvas** | Orbit camera. Auto-rotate pauses while dragging + for 4s after. |
| **Pinch on canvas (touch)** | Zoom (clamped between 3 and 12 units from origin). |
| **Double-click a node** | Same as click + zoom in tight (~50% closer). |
| **Page scroll over canvas** | Page scrolls normally — scroll-zoom is **disabled** so the canvas doesn't trap the user (classic Maps-embed problem). Desktop zoom is via the toolbar's `+/−` buttons (small, top-right of canvas) or pinch on trackpad. |
| **Hover a node** | Node scales to 1.4×, connected edges brighten to 100%, all other nodes/edges fade to 15%, floating tooltip appears next to cursor with `{name · type · meta}`. |
| **Click a node** | Camera flies to node over 700ms easeInOutCubic. Tooltip pins. The matching card below (Active Agent or Deployed Service) gets a 2s blue highlight ring + smooth-scrolls into view. |
| **Click empty space** | Reset: full graph re-illuminates, camera returns to default, auto-rotate resumes after 2s. |
| **Filter chip click** | Toggle visibility of that node class. Edges connected only to hidden nodes also fade. Smooth 300ms transition. |
| **Search type-ahead** | Live filter the rendered nodes (others dim). Enter or click result → fly-to. |
| **`/` keypress anywhere on page** | Focus the search input. |
| **`Esc` keypress** | Reset selection, blur search. |

**Easter egg:** Type `help` in the search → command list pops up (`help · reset · about · konami · matrix`). Type `matrix` → triggers the Matrix-rain easter egg (§6.2).

**Fallback (no JS):** A static SVG version of the graph renders — the same shape as the mockup. Toolbar collapses to just the title. All cards below still work.

### 4.6 Active Agents (Experience)

Each role is one card, stacked vertically. Layout per card:

```
[● LIVE]  Parker AI                                        DEC 2023 → PRESENT
          agent-001 · senior-fs/ai-dev                     [↑ jump to map node]
─────────────────────────────────────────────────────────────────────────────
• Architected AI agent platform for marketing/creative strategy        [DATA/DAY  ~B]
• Pipelines: billions of data pts/day · millions of ads · TBs of media [SCALE    ~100×]
• LoRA fine-tuning + auto-research loop: F1 0.7% → 79% over 30 iter   [ITER       30+]
• Supabase Postgres at scale: partitioning, indexing, rollups          [UPTIME    99.9%]
• TanStack Query dashboards for ops + analytics
```

**Status states:**

- `● LIVE` (`--accent-live` left border, green pill) — Parker AI, HiNature.
- `● ARCHIVED` (gray left border, dimmed pill) — all past roles.
- Selected from System Map → 2s blue highlight ring overrides border.

**Per-role bullet copy (final):**

**Parker AI** — Senior FS / AI Developer · Dec 2023 → Present
- Architected AI agent platform for marketing/creative strategy.
- Pipelines: billions of data pts/day · millions of ads · TBs of media.
- LoRA fine-tunes + auto-research loop: F1 0.7% → 79% over 30 iter.
- Supabase Postgres at scale: partitioning, indexing, rollups, read-replicas.
- TanStack Query dashboards for ops + analytics — used by internal teams.
- Async batch processing on Gemini Batch API for large-scale ad classification.
- Metrics chip: `DATA/DAY ~B · SCALE ~100× · ITER 30+`.

**HiNature Ltd** — Founder · Jun 2019 → Present
- Founded eco-friendly microbiome cosmetics; built mobile scanner app analyzing 35,000+ ingredients with ~95% accuracy.
- Led product, data ingestion, and ingredient classification pipelines.
- Pivoted the company into a profitable Quebec real-estate / Airbnb operation.
- Metrics chip: `INGREDIENTS 35K+ · ACCURACY ~95%`.

**Orium** — Senior Product Developer · May 2022 → Dec 2023
- Core contributor to Composable UI — MACH Alliance–awarded headless commerce starter kit. Reduced client delivery timelines by up to 6 months.
- Designed Figma-synced theme system and performance-critical storefront features (PDP, checkout) with strong a11y and security standards.
- Led Harry Rosen headless checkout in 6 weeks; later productized and reused across enterprise clients.
- Built internal tooling and led AI-focused technical talks across the org.
- Metrics chip: `DELIVERY −6mo · LIGHTHOUSE 90+`.

**Shopify** — Developer · May 2019 → Feb 2020
- Money/Capital team. Refactored the capital offer decision tree — a critical system generating daily loan offers — improving efficiency, maintainability, and flexibility. Enabled the "starter loans" launch.
- Designed/maintained the backend Capital API + admin systems. Optimized DB queries, on-call rotation.

**Combyne Ag** (formerly FarmLead) — Full Stack Developer · Feb 2017 → May 2019
- Scaled monolithic marketplace to 1M+ users: DB optimization, Redis caching, Elasticsearch (10–100× search speedup).
- Built admin dashboard system with role-based access from scratch.
- Refactored to AWS SQS + Python workers for async tasks, enabling future scale.

**i-sight.com** — Software Application Developer · Mar 2016 → Feb 2017
- Led key client projects (Michigan State, GSK, Wipro) full-stack on Node.js, Backbone.js, PostgreSQL, Elasticsearch.

**Events.com** — Web Developer · Mar 2015 → Mar 2016
- Built event-registration services on the LAMP stack: PHP, MySQL, AngularJS, CodeIgniter.

**Behavior:**

- Live roles expanded by default.
- Archived roles render in a collapsed "stack" — header only — with a `[+ EXPAND]` affordance. Click to expand inline.
- Each header has a `[↑ jump to map node]` link that flies the System Map to that role's node.

### 4.7 Deployed Services (Projects)

3-column grid (1-column on mobile). Each tile:

```
[●]   xnohub.com
      2024 · LIVE · THREE.JS
      Real-time visualizer for the Nano currency network on a 3D globe.
      Live transactions, major nodes, interactive effects.
                                                                      [→ visit ↗]
```

Status dot color:

- **Green** (live, hosted): xnohub.com, LocalXNO.com
- **Orange** (OSS, not personally hosted): Composable UI
- **Gray** (archived): PayPaw, Mining Software, Bytom Dice

Hover: tile lifts 4px + soft shadow + status-color glow border.

**Final project copy:**

- **xnohub.com** (2024) — Real-time visualizer for the Nano currency network on a 3D globe.
- **LocalXNO.com** (2024) — Nano marketplace built on Next.js + Supabase + PostgreSQL, with Google API integrations.
- **Composable UI** (2022–23) — Open-source headless-commerce starter kit (React/Next.js). UI library + Figma kit + Algolia/Stripe integrations. MACH Alliance award.
- **PayPaw** (2019–21) — Payment service for Bytom Blockchain. Won first place at a dev challenge — USD $30K prize.
- **Mining Software** (2020) — Optimized C++ GPU mining; +30% efficiency through caching.
- **Bytom Dice** (2019–20) — On-chain cryptocurrency betting site on Bytom.

### 4.8 System Capabilities (Skill matrix)

Heatmap. Six rows (matching the resume's own categorization, with AI/LLM promoted to the top for 2026):

```
                  ─────────── most depth/recency  ──────────────
AI / LLM       [LoRA] [Gemini API] [Embeddings] [Eval loops]  [Claude] [ChatGPT] [Cursor] [Grok]
FRONTEND       [React] [Next.js] [TanStack Q] [TypeScript]    [Tailwind] [Shadcn] [Chakra] [HTML5/CSS3]
BACKEND        [Node.js] [Python]                              [Ruby] [PHP] [Java] [Perl]
DATA           [PostgreSQL] [Supabase] [Redis]                 [Elasticsearch] [MySQL] [Firebase]
CLOUD          [Supabase] [GCP]                                [AWS · EC2/RDS/S3/SQS/ELB/Lambda] [Vercel] [Netlify] [Firebase] [Tencent]
FRAMEWORKS     [Next.js] [Remix]                               [Rails] [Django] [Flask] [Vue] [Express] [Backbone] [CodeIgniter]
```

Three classes:

- `.hot` — strong fill, full opacity, current core
- `.warm` — medium fill, regular tool
- default — light fill, in the kit but not daily

Hover a cell: tooltip shows last-used context (e.g. `LoRA · used at Parker AI · still active`).

### 4.9 Footer

Single row, dim:

```
SYSTEM · BSc CompSci · Minor Econ · U of Ottawa · 2009–2014        BUILD · 2026.1
```

`BUILD · 2026.1` is the second click-target of the version easter egg (same toggle as the top bar).

## 5. Visual system

### 5.1 Color tokens

```css
--bg-deep:       #04060c;    /* Page background, deepest */
--bg:            #07090f;    /* Cards / panels */
--bg-elev:       #0a0d14;    /* Elevated surfaces (terminal, kpi cells) */
--ink-strong:    #f5f7fa;    /* Hero name, KPI values */
--ink:           #e0e7ec;    /* Body */
--ink-dim:       #94a3b8;    /* Captions */
--ink-faint:     #4b5563;    /* Timestamps, footer */

--accent-live:   #4ade80;    /* Green — live / ok / role nodes */
--accent-link:   #60a5fa;    /* Blue — links / project nodes / selection */
--accent-warn:   #fbbf24;    /* Amber — warnings / skill nodes / period stamps */
--accent-hub:    #ffffff;    /* White — center hub, hero name highlights */

--rule:          rgba(96, 165, 250, 0.10);   /* Hairlines */
--rule-strong:   rgba(96, 165, 250, 0.20);

--glow-live:     0 0 12px rgba(74, 222, 128, 0.45);
--glow-link:     0 0 12px rgba(96, 165, 250, 0.45);
--glow-warn:     0 0 12px rgba(251, 191, 36, 0.45);
```

These are tuned versions of Tailwind's `slate-950/900/800` + `green-400/blue-400/amber-400` — already-validated harmonies that look refined, not gamer-neon.

### 5.2 Typography

Single typeface: **JetBrains Mono** (variable, weights 200/400/700/800). Fallback: `ui-monospace, "SF Mono", "Roboto Mono", monospace`.

| Use | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero name | 40px / 2.5rem | 800 | -0.02em |
| KPI value | 30px | 800 | -0.01em |
| Section subhead | 13px | 700 | 0 |
| Card title | 14px | 700 | 0 |
| Body | 12px | 400 | 0 |
| Mono labels (ALL CAPS) | 10px | 700 | 0.15em |
| Captions / timestamps | 10px | 400 | 0.05em |
| Footer | 10px | 400 | 0.10em |

### 5.3 Spacing

8px base scale. Section vertical padding 24px (mobile) → 32px (desktop). Card padding 12–16px. Hairlines 1px.

### 5.4 Motion language

| Element | Curve | Duration |
|---|---|---|
| Hover state | `ease-out` | 180ms |
| Card highlight ring | `ease-out` | 1800ms (then fade out 400ms) |
| Camera fly-to (System Map) | `easeInOutCubic` | 700ms |
| KPI count-up | `easeOutCubic` | 900ms |
| Boot overlay fade | `ease-out` | 300ms |
| Node pulse | `ease-in-out` infinite | 3000ms (phase-offset by id) |
| Edge dash flow | linear infinite | 6000ms |
| `● ONLINE` dot pulse | `ease-in-out` infinite | 2000ms |

`prefers-reduced-motion: reduce` → kills auto-rotate, pulses, count-up, edge flow. Keeps colors and layout exactly the same.

### 5.5 Glow

Glow comes from a CSS `filter: drop-shadow(...)` on accent elements + `box-shadow` rings, not from Three.js bloom. Cheaper, more consistent across the page.

### 5.6 Hero background

A *single inline SVG* of the System Map graph, opacity 0.35, absolutely positioned behind the hero. Not a Three.js scene. Reasons: half the page draws gracefully without WebGL, one canvas in the System Map is enough, and the SVG can morph with simple CSS gradient mask reveals.

## 6. Personality / easter eggs

### 6.1 Version cycler

Click `v2026.1` (top bar) or `BUILD · 2026.1` (footer) → opens a small floating preview that cycles through `index_2024.html` / `index_2023.html` / `index_2017.html` in a 200×120 thumbnail (each shown 4s), with a `→ open` link. Tells the story of the site's redesigns.

### 6.2 Matrix rain (`konami` / `matrix`)

Either: enter the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`), OR type `matrix` into the System Map search.

Effect: 4-second overlay of falling green characters (callback to `index_2024.html`'s aesthetic) with a tiny "// LEGACY MODE" caption, then fades away.

### 6.3 Status nudges

Click the `● ONLINE` dot 5× in 3s → it cycles through real status strings:
`● ONLINE` → `● BUILDING` → `● SHIPPING` → `● COFFEE` → `● ONLINE`.

### 6.4 Boot replay

Append `?boot=1` to the URL → re-runs the boot sequence (otherwise it's once-per-visitor via `localStorage`).

## 7. Content data shape

All copy lives at the top of `<script>`:

```js
const ROLES = [
  { id: 'parker-ai', name: 'Parker AI', title: 'Senior FS / AI Developer',
    period: 'Dec 2023 → Present', status: 'live', tenure: 2.4,
    bullets: ['Architected AI agent platform for marketing/creative strategy', /* ... */],
    metrics: [{ k: 'DATA/DAY', v: '~B' }, { k: 'SCALE', v: '~100×' }, /* ... */],
    skills: ['lora', 'gemini', 'embeddings', 'supabase', 'tanstack', 'postgres', 'python']
  },
  /* HiNature, Orium, Shopify, Combyne, i-sight, Events.com */
];

const PROJECTS = [
  { id: 'xnohub', name: 'xnohub.com', year: '2024', status: 'live',
    url: 'https://xnohub.com', stack: ['three.js'],
    desc: 'Real-time visualizer for the Nano network on a 3D globe.',
    skills: ['threejs', 'react', 'nextjs']
  },
  /* LocalXNO, Composable UI, PayPaw, Mining, Bytom Dice */
];

const SKILLS = {
  'AI / LLM':   [{ name: 'LoRA', heat: 'hot' }, { name: 'Gemini API', heat: 'hot' }, /* ... */],
  'FRONTEND':   [/* ... */],
  'BACKEND':    [/* ... */],
  'DATA':       [/* ... */],
  'CLOUD':      [/* ... */],
  'FRAMEWORKS': [/* ... */],
};
```

System Map nodes = union of roles + projects + the skills referenced in any `skills` array. Edges = each `skills` reference becomes a role→skill or project→skill edge.

To add a new role / project / skill: edit one of these objects. Re-render is automatic.

## 8. Accessibility

- Every section renders readable without JS.
- WCAG AA contrast: text colors verified against `--bg-deep` (#04060c). `--ink` (#e0e7ec) = 14.8:1, `--ink-dim` (#94a3b8) = 6.1:1.
- Keyboard: tab order through all links + agent card headers (Enter/Space toggles expand). System Map nodes are NOT individually keyboard-navigable in v1 — search input (focusable, `/` shortcut) is the keyboard entry point.
- Reduced motion: see §5.4.
- Semantic HTML: `<header>`, `<main>`, `<section>` per panel, `<nav>` for top bar.
- ARIA: `aria-expanded` on collapsible agent headers, `aria-live="polite"` on the live terminal (so screen readers don't get spammed), `aria-label` on all icon-only links.

## 9. SEO / meta

```html
<title>Dalin Huang — Senior Full Stack / AI Developer</title>
<meta name="description"
      content="Dalin Huang — Senior Full Stack / AI Developer at Parker AI.
               AI agent platforms, LoRA fine-tuning, billion-scale pipelines.
               Eleven years shipping production systems.">
<meta name="keywords" content="Dalin Huang, AI Developer, Full Stack Developer, Parker AI,
                                LoRA, Gemini, agents, Supabase, React, Next.js">
<meta property="og:title" content="Dalin Huang — Senior Full Stack / AI Developer">
<meta property="og:description" content="...">
<meta property="og:image" content="https://dalin.dev/img/og.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://dalin.dev">
<link rel="canonical" href="https://dalin.dev">
```

JSON-LD `Person` schema updated: `jobTitle: "Senior Full Stack / AI Developer"`, `worksFor: { @type: Organization, name: "Parker AI" }`.

## 10. Browser support

Modern evergreen only — Chrome/Edge ≥ 110, Firefox ≥ 110, Safari ≥ 16, iOS Safari ≥ 16. No IE, no legacy Safari. ES2022 allowed. WebGL 1.0 assumed (every browser in scope ships it).

## 11. Deliverables

1. `index.html` — the new single-file site.
2. `index_2024.html` — renamed from current `index.html`.
3. `.gitignore` — already updated to ignore `.superpowers/`.
4. `README.md` — append 2026 section (one paragraph + the new design intent).
5. (Optional, follow-up) `img/og.png` — a 1200×630 share card matching the new theme.

## 12. Out of scope

- New favicon and OG share image (carry forward existing).
- A custom font self-hosting (Google Fonts CDN is fine).
- Multi-language.
- Theming (light mode). The site is dark mode only by design.
- Analytics.
- A full a11y audit beyond §8.
