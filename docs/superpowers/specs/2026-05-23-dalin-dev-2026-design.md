# dalin.dev — 2026 Redesign Design Doc

**Date:** 2026-05-23
**Author:** Dalin Huang (with Claude Opus 4.7)
**Status:** Approved (pending final spec review)

---

## 1. Goals

Ship a new `index.html` for `dalin.dev` that:

1. Reflects Dalin's 2026 positioning — **Senior Full Stack / AI Developer at Parker AI** — with the AI/agent work front and center.
2. Looks and feels like an **operational dashboard for an AI agent platform** ("Mission Control"). This is on-brand: it's the kind of UI Dalin builds at work.
3. Adds an **interactive 3D "System Map"** (Three.js) that connects roles ↔ projects ↔ skills as a navigable graph — the visual centerpiece.
4. Hits **Lighthouse 95+** on mobile and desktop (the 2024 version's bar was 100; this one carries more JS so 95+ is the realistic target).
5. Stays a **single static `index.html`** — GitHub Pages only serves static. JS and CSS inlined or loaded from CDN.

The old `index.html` becomes `index_2024.html` (preserving the pattern: `index_2017.html`, `index_2023.html`, `index_2024.html`).

## 2. Non-goals

- No build tooling (no Webpack/Vite/Next). One HTML file you can open with `file://`.
- No backend. No analytics. No tracking pixels.
- No CMS — content lives in JS data objects in the file, edited by hand.
- No login, no comment system, no dynamic anything that needs a server.
- Not trying to beat Bruno Simon's portfolio on raw 3D wow — the dashboard framing is the differentiator. The 3D graph should impress, not overwhelm.

## 3. Architecture

**Single file:** `index.html` — HTML + `<style>` + `<script>` inline. One external dep: Three.js from a CDN (`unpkg` or `cdn.jsdelivr.net`), pinned to a specific version. No bundler.

```
dalin.dev/
├── index.html           ← NEW (this redesign)
├── index_2024.html      ← old index.html, renamed
├── index_2023.html
├── index_2017.html
├── img/                 ← favicon, OG image, any static assets
├── CNAME                ← unchanged
└── README.md            ← add a 2026 section
```

**Why inline:** Lighthouse rewards single-file (no extra round trips), GitHub Pages serves static, and the user has explicitly asked for one HTML. Three.js is the one exception — too large to inline (~700KB minified) without hurting first paint.

**Three.js loading:** `<script defer>` from CDN. The 3D graph initializes after `DOMContentLoaded`. Without JS, the System Map section shows a static SVG fallback (the same SVG we mocked up — already used as the loading state). All other sections are pure HTML/CSS and work without JS.

## 4. Page structure

Top to bottom, single-page scroll. No tabs, no routing.

| # | Section | Purpose |
|---|---------|---------|
| 1 | Top bar | Persistent: logo, version, status dot, social links |
| 2 | Hero | Name, role, bio, social links, live "agent log" terminal. Ghost neural graph as bg. |
| 3 | KPI strip | 4 big numbers: years shipped, F1 lift, platform scale, data throughput |
| 4 | **System Map** | Interactive 3D Three.js graph — roles/projects/skills as nodes |
| 5 | Active Agents | Experience as "deployed agents" — live at top, archived collapsed |
| 6 | Deployed Services | Projects as service tiles with status dots |
| 7 | System Capabilities | Skill heatmap (matrix) — AI row promoted to top |
| 8 | Footer | Education, build info, copyright |

### 4.1 Top bar

```
DALIN.DEV  v2026.1  · ● ONLINE · OTTAWA                    LINKEDIN · GITHUB · EMAIL
```

- Sticky on scroll.
- `● ONLINE` dot has the same pulse animation as the mockup.

### 4.2 Hero

Two-column on desktop (`grid-template-columns: 1fr 1.1fr`), stacks on mobile.

- **Left:** `// OPERATOR`, name (`Dalin Huang`), role (`Senior Full Stack / AI Developer`), bio (3 lines, Parker AI mention), 4 action links.
- **Right:** Live terminal box, ~150px tall. Cycles through a fixed sequence of fake-but-realistic log lines (`agent.parker · ok · batch 482`, `finetune.v17 · LoRA · step 1240`, `f1.score = 0.794 ↑`, etc.). Lines fade in/out on a loop.
- **Background:** Faded neural graph SVG (or low-opacity Three.js canvas). Opacity ≤ 0.35.

### 4.3 KPI strip

4 equal cells, hairline divider. On first scroll into viewport, numbers count up from 0 to target over ~1s (IntersectionObserver trigger).

| KPI | Value | Sub |
|---|---|---|
| YEARS SHIPPED | 11+ | since 2015 · ↑ compounding |
| F1 LIFT · 30 ITER | 79% | from 0.7% zero-shot |
| PLATFORM SCALE | ~100× | thousands of workflows |
| DATA THROUGHPUT | ~B/day | data pts · ads · media |

### 4.4 System Map (centerpiece)

**Three.js force-directed 3D graph** in a 360-420px tall container. This is the section to over-invest in.

**Visual:**

- **Center hub node:** "DALIN" — large white sphere, glowing.
- **Role nodes** (green `#4f8`): Parker AI, HiNature, Orium, Shopify, Combyne, i-sight, Events.com — sized by tenure/recency.
- **Project nodes** (blue `#4af`): xnohub, LocalXNO, Composable UI, HiNature scanner, PayPaw, Mining opt, Bytom Dice.
- **Skill nodes** (orange `#fa3`): LoRA, Gemini API, Embeddings, React, Next.js, Supabase, Postgres, Python, TanStack Query, etc.
- **Edges:** "used at" (role → skill), "shipped at" (role → project), "uses" (project → skill). Edge color picks up the source node color, animated dashed flow.
- **Layout:** Three.js with manual positioning OR a tiny force-directed pass on init. Camera orbits slowly when idle (autorotate).

**Interactions (this is the "more interactive" bit):**

| Interaction | Behavior |
|---|---|
| Idle | Camera slow auto-rotate. Nodes gently pulse. |
| Mouse drag on canvas | Orbit camera (Three.js `OrbitControls`). |
| Scroll on canvas | Zoom in/out. |
| Hover a node | Node scales up, edges to it brighten, others dim to ~15% opacity, tooltip appears next to cursor with name + meta. |
| Click a node | Camera flies to node (~600ms ease), tooltip pins, **the matching agent/service card below the graph gets a highlight ring + scroll into view**. |
| Click empty space | Reset: full graph re-illuminates, camera returns to default. |
| Filter chips above graph | Toggle visibility of `● ROLES` / `● PROJECTS` / `● SKILLS`. Nodes/edges fade out smoothly when filtered. |
| Search bar (top-right of graph toolbar) | Type-ahead. Matching node lights up + camera flies to it. |
| Edge animation | Subtle particle/dash flowing along each edge — slow, just enough to feel "alive". Bright edges (hovered set) move faster. |

**Fallback (no JS / Three.js fails to load):** The mockup SVG we already built becomes the static fallback. Filter chips and search hide. The agent cards below still scroll and work normally.

**Performance budget:**

- Total nodes ≤ 50. Edges ≤ ~120. Easily 60 fps on any laptop.
- Three.js scene uses one `BufferGeometry` for all edges (single draw call) and `InstancedMesh` for nodes.
- DPR capped at 2.
- Pause render loop when section is not in viewport (IntersectionObserver).

### 4.5 Active Agents

Each role from the resume as a stacked card. Same row layout as mockup: head column / body bullets / metrics column.

- **Status `● LIVE`** for current roles (Parker AI, HiNature). Green left border + status pill.
- **Status `● ARCHIVED`** for past roles. Gray left border, dimmed.
- Cards with ≥3 years or AI work expand by default; short stints (Events.com) start collapsed.
- Click header → expand/collapse.
- When highlighted from System Map: blue left border + glow ring for ~2s.

Card content per resume (Parker AI, HiNature, Orium, Shopify, Combyne, i-sight, Events.com).

### 4.6 Deployed Services

3-column grid of project tiles. Status dot color:
- Green = live (xnohub, LocalXNO)
- Orange = OSS / not personally hosted (Composable UI)
- Gray = archived (PayPaw, Mining opt, Bytom Dice)

Hover lifts the tile (the existing 2024 site already did this — keep the motion language).

### 4.7 System Capabilities — skill matrix

Heatmap grid. Rows: AI/LLM, Frontend, Backend, Cloud, Data, Frameworks. Cells per skill, intensity = depth/recency.

Three classes: `hot` (current core), `warm` (regular), default (have used). AI row at the top.

Skills sourced from resume — but reorganized for 2026 emphasis (AI/LLM is now its own row; in the 2024 version it was tucked into "AI Tools").

### 4.8 Footer

Single row: `SYSTEM · BSc CompSci · Minor Econ · U of Ottawa · 2009–2014` ··· `BUILD · 2026.1`

## 5. Visual system

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#05070d` | Page background |
| `--panel` | `#07090f` | Cards |
| `--ink` | `#cde` | Body text |
| `--ink-strong` | `#eef` | Headings |
| `--dim` | `#678` | Secondary |
| `--accent-live` | `#4f8` | Green — live/ok/role |
| `--accent-link` | `#4af` | Blue — links/projects |
| `--accent-warn` | `#fa3` | Orange — warning/skills/period |
| `--rule` | `rgba(80,140,255,.12)` | Hairlines |
| `--mono` | `ui-monospace, "SF Mono", "Roboto Mono", monospace` | Everything is mono |

**Typography:** Entire site in monospace. Sizes: 32px hero name, 22-24px KPI big numbers, 13px section subheads, 11px body, 9-10px labels/captions, 8-9px letter-spaced ALL CAPS labels.

**Motion:** Subtle by default. Pulse loops 2-3s. Hover transitions 200ms. Camera flies 600ms ease-in-out. Honor `prefers-reduced-motion` — disable autorotate, fade in/out instead of motion-based transitions, skip count-up.

**Three.js bg in hero:** A faded version of the System Map graph rendered into a hero-only canvas (or just a faded inline SVG for performance). Likely the simpler win: ship inline SVG ghost in hero, save Three.js for the System Map section.

## 6. Content data

All resume content lives as JS data structures at top of `<script>`:

```js
const ROLES = [
  { id:'parker-ai', name:'Parker AI', title:'Senior FS / AI Developer',
    period:'Dec 2023 → Present', status:'live', tenure:2.5,
    bullets:[...], metrics:[{k:'DATA/DAY', v:'~B'}, ...],
    skills:['lora','gemini','supabase','tanstack','postgres','python']
  }, /* ...rest of roles */
];
const PROJECTS = [/* xnohub, LocalXNO, Composable UI, ... */];
const SKILLS = [/* by category, with usage edges */];
```

The System Map builds nodes from these three arrays and edges from the `skills` field on each role/project.

## 7. Accessibility & fallbacks

- All sections render readable content with JS disabled. Only the live terminal animation and System Map interactivity are lost.
- Color contrast: text colors meet WCAG AA against `#05070d` background (verified `#cde` = 14.5:1, `#678` = 4.6:1).
- Keyboard: tab order through links, agent card headers (expand/collapse with Enter/Space), System Map nodes (Arrow keys navigate, Enter selects).
- `prefers-reduced-motion`: disables autorotate, count-up, pulse loops, edge flow animation.
- Semantic HTML: `<header>`, `<main>`, `<section>` per panel, `<nav>` for top bar.

## 8. SEO / meta

Carry over from 2024:
- `<title>` updated: "Dalin Huang — Senior Full Stack / AI Developer"
- Meta description mentions Parker AI, AI agents, fine-tuning
- JSON-LD `Person` schema updated with current jobTitle
- Open Graph image — keep existing `img/hd.jpg` or generate a new one matching the new theme (out of scope for first pass; punt to follow-up)

## 9. Browser support

Modern evergreen browsers. ES2020+ allowed. CSS Grid / custom properties / aspect-ratio assumed. Safari ≥ 15, Chrome/Edge ≥ 100, Firefox ≥ 100. No IE, no Safari 14. Mobile: iOS Safari 15+, Chrome Android current.

## 10. File deliverables

This spec covers what the **next phase** (writing-plans → implementation) will produce:

1. `index.html` — the new single-file site
2. `index_2024.html` — renamed from current `index.html`
3. `.gitignore` — already updated to ignore `.superpowers/`
4. `README.md` — append a 2026 section noting the AI Developer pivot at Parker AI

## 11. Out of scope (for this design)

- New favicon / OG image
- Custom domain config changes (CNAME stays)
- Analytics
- A11y audit beyond the basics listed in §7
- Backwards-compat for old browsers
