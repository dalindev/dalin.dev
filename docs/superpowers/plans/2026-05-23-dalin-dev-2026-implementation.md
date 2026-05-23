# dalin.dev 2026 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note:** This is a single-file HTML project with no test suite. The "verify" step in each task is a visual check in a browser (or the Claude Preview tool). Each task leaves the site in a working, viewable state.

**Goal:** Ship a new `dalin.dev/index.html` — Mission Control AI/agent dashboard with an interactive Three.js System Map — replacing the 2024 site.

**Architecture:** Single static HTML file with inline CSS and JS. One CDN dep: Three.js r160. All resume content lives in JS data arrays at the top of `<script>`. Old `index.html` becomes `index_2024.html`.

**Tech Stack:** HTML5 + CSS (custom properties, grid, animations) + vanilla JS (ES2022). Three.js r160 from `cdn.jsdelivr.net`. JetBrains Mono via Google Fonts.

**Spec:** [docs/superpowers/specs/2026-05-23-dalin-dev-2026-design.md](../specs/2026-05-23-dalin-dev-2026-design.md)

---

## Verification approach

For each task that touches the DOM/CSS:
1. Save the file.
2. Open `dalin.dev/index.html` in a browser (or refresh) — easiest is `python3 -m http.server 8000` from `dalin.dev/`, then `http://localhost:8000/`.
3. Run the visual checks listed in the task.

Use `mcp__Claude_Preview__preview_start` with `path: dalin.dev` to launch a Claude Preview, then `preview_screenshot` after each task to confirm visually.

---

## Task 1: Scaffold — rename old + create new index.html shell

**Files:**
- Rename: `dalin.dev/index.html` → `dalin.dev/index_2024.html`
- Create: `dalin.dev/index.html`

- [ ] **Step 1: Rename current index.html**

```bash
git -C dalin.dev mv index.html index_2024.html
```

- [ ] **Step 2: Create new index.html with full shell**

Create `dalin.dev/index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dalin Huang — Senior Full Stack / AI Developer</title>
  <meta name="description"
        content="Dalin Huang — Senior Full Stack / AI Developer at Parker AI. AI agent platforms, LoRA fine-tuning, billion-scale pipelines. Eleven years shipping production systems.">
  <meta name="keywords" content="Dalin Huang, AI Developer, Full Stack Developer, Parker AI, LoRA, Gemini, agents, Supabase, React, Next.js">
  <meta property="og:title" content="Dalin Huang — Senior Full Stack / AI Developer">
  <meta property="og:description" content="AI agent platforms, LoRA fine-tuning, billion-scale pipelines. Mission Control for an AI developer.">
  <meta property="og:image" content="https://dalin.dev/img/og.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dalin.dev">
  <link rel="canonical" href="https://dalin.dev">
  <link rel="icon" href="img/favicon.ico">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;400;700;800&display=swap" rel="stylesheet">

  <style>
    /* Tokens, base, layout — added in Task 2 */
  </style>
</head>
<body>
  <!-- Boot overlay added in Task 15 -->

  <header class="topbar"><!-- Task 4 --></header>

  <main>
    <section class="hero"><!-- Task 5 --></section>
    <section class="kpis"><!-- Task 6 --></section>
    <section class="systemmap"><!-- Tasks 10–13 --></section>
    <section class="agents"><!-- Task 7 --></section>
    <section class="services"><!-- Task 8 --></section>
    <section class="capabilities"><!-- Task 9 --></section>
  </main>

  <footer class="footer"><!-- Task 4 --></footer>

  <!-- Three.js -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/controls/OrbitControls.js" defer></script>

  <script>
    // Data + app — added in Task 3
  </script>

  <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Dalin Huang",
    "jobTitle": "Senior Full Stack / AI Developer",
    "url": "https://dalin.dev",
    "worksFor": { "@type": "Organization", "name": "Parker AI" },
    "sameAs": [
      "https://www.linkedin.com/in/dalinhuang/",
      "https://github.com/dalindev"
    ]
  }
  </script>
</body>
</html>
```

- [ ] **Step 3: Verify it loads**

Start a server:
```bash
cd dalin.dev && python3 -m http.server 8000
```
Open `http://localhost:8000/`. Expected: blank white page, no console errors. Tab title says "Dalin Huang — Senior Full Stack / AI Developer".

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html index_2024.html && \
git -C dalin.dev commit -m "Scaffold 2026 index.html, archive 2024 version"
```

---

## Task 2: CSS foundation — tokens, reset, typography

**Files:**
- Modify: `dalin.dev/index.html` (the `<style>` block)

- [ ] **Step 1: Add tokens + reset + typography**

Replace the `<style>` placeholder with:

```css
:root {
  --bg-deep: #04060c;
  --bg: #07090f;
  --bg-elev: #0a0d14;
  --ink-strong: #f5f7fa;
  --ink: #e0e7ec;
  --ink-dim: #94a3b8;
  --ink-faint: #4b5563;
  --accent-live: #4ade80;
  --accent-link: #60a5fa;
  --accent-warn: #fbbf24;
  --accent-hub: #ffffff;
  --rule: rgba(96, 165, 250, 0.10);
  --rule-strong: rgba(96, 165, 250, 0.20);
  --glow-live: 0 0 12px rgba(74, 222, 128, 0.45);
  --glow-link: 0 0 12px rgba(96, 165, 250, 0.45);
  --glow-warn: 0 0 12px rgba(251, 191, 36, 0.45);
  --mono: 'JetBrains Mono', ui-monospace, 'SF Mono', 'Roboto Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  background: var(--bg-deep);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.55;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

main { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

h1, h2, h3, h4, h5, h6 { font-weight: 700; color: var(--ink-strong); }
a { color: var(--accent-link); text-decoration: none; }
a:hover { text-shadow: var(--glow-link); }
button { font-family: inherit; }

/* Utility */
.label-cap {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-dim);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Verify**

Refresh. Expected: page is dark (`#04060c`), default body text would be light gray when content is added (not visible yet since main is empty). No console errors.

- [ ] **Step 3: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add color tokens, reset, base typography"
```

---

## Task 3: Content data — ROLES / PROJECTS / SKILLS arrays

**Files:**
- Modify: `dalin.dev/index.html` (the second `<script>` block)

- [ ] **Step 1: Replace the script placeholder with data**

Replace `// Data + app — added in Task 3` with:

```js
const ROLES = [
  {
    id: 'parker-ai', name: 'Parker AI', title: 'Senior FS / AI Developer',
    period: 'Dec 2023 → Present', status: 'live', tenure: 2.4, slot: 1,
    bullets: [
      'Architected AI agent platform for marketing/creative strategy.',
      'Pipelines: billions of data pts/day · millions of ads · TBs of media.',
      'LoRA fine-tunes + auto-research loop: F1 0.7% → 79% over 30 iter.',
      'Supabase Postgres at scale: partitioning, indexing, rollups, read-replicas.',
      'TanStack Query dashboards for ops + analytics — used by internal teams.',
      'Async batch processing on Gemini Batch API for large-scale ad classification.',
    ],
    metrics: [
      { k: 'DATA/DAY', v: '~B' }, { k: 'SCALE', v: '~100×' },
      { k: 'ITER', v: '30+' }, { k: 'UPTIME', v: '99.9%' },
    ],
    skills: ['lora', 'gemini', 'embeddings', 'supabase', 'tanstack', 'postgres', 'python', 'react'],
  },
  {
    id: 'hinature', name: 'HiNature Ltd', title: 'Founder',
    period: 'Jun 2019 → Present', status: 'live', tenure: 7, slot: 2,
    bullets: [
      'Founded eco-friendly microbiome cosmetics; mobile scanner app analyzing 35,000+ ingredients with ~95% accuracy.',
      'Led product, data ingestion, and ingredient classification pipelines.',
      'Pivoted the company into a profitable Quebec real-estate / Airbnb operation.',
    ],
    metrics: [{ k: 'INGREDIENTS', v: '35K+' }, { k: 'ACCURACY', v: '~95%' }],
    skills: ['python', 'react', 'firebase', 'gcp'],
  },
  {
    id: 'orium', name: 'Orium', title: 'Senior Product Developer',
    period: 'May 2022 → Dec 2023', status: 'archived', tenure: 1.6, slot: 3,
    bullets: [
      'Core contributor to Composable UI — MACH Alliance–awarded headless commerce starter kit. Reduced client delivery timelines by up to 6 months.',
      'Designed Figma-synced theme system and performance-critical storefront features (PDP, checkout) with strong a11y and security.',
      'Led Harry Rosen headless checkout in 6 weeks; later productized and reused across enterprise clients.',
      'Built internal tooling and led AI-focused technical talks across the org.',
    ],
    metrics: [{ k: 'DELIVERY', v: '−6mo' }, { k: 'LIGHTHOUSE', v: '90+' }],
    skills: ['react', 'nextjs', 'typescript', 'chakra', 'tailwind'],
  },
  {
    id: 'shopify', name: 'Shopify', title: 'Developer',
    period: 'May 2019 → Feb 2020', status: 'archived', tenure: 0.8, slot: 4,
    bullets: [
      'Money/Capital team. Refactored the capital offer decision tree — a critical system generating daily loan offers — improving efficiency, maintainability, and flexibility. Enabled the "starter loans" launch.',
      'Designed/maintained the backend Capital API + admin systems. Optimized DB queries, on-call rotation.',
    ],
    metrics: [],
    skills: ['ruby', 'rails', 'postgres'],
  },
  {
    id: 'combyne', name: 'Combyne Ag', title: 'Full Stack Developer',
    period: 'Feb 2017 → May 2019', status: 'archived', tenure: 2.3, slot: 5,
    bullets: [
      'Scaled monolithic marketplace to 1M+ users: DB optimization, Redis caching, Elasticsearch (10–100× search speedup).',
      'Built admin dashboard system with role-based access from scratch.',
      'Refactored to AWS SQS + Python workers for async tasks, enabling future scale.',
    ],
    metrics: [],
    skills: ['python', 'redis', 'elasticsearch', 'aws'],
  },
  {
    id: 'isight', name: 'i-sight.com', title: 'Software Application Developer',
    period: 'Mar 2016 → Feb 2017', status: 'archived', tenure: 1, slot: 6,
    bullets: [
      'Led key client projects (Michigan State, GSK, Wipro) full-stack on Node.js, Backbone.js, PostgreSQL, Elasticsearch.',
    ],
    metrics: [],
    skills: ['nodejs', 'backbone', 'postgres', 'elasticsearch'],
  },
  {
    id: 'events', name: 'Events.com', title: 'Web Developer',
    period: 'Mar 2015 → Mar 2016', status: 'archived', tenure: 1, slot: 7,
    bullets: [
      'Built event-registration services on the LAMP stack: PHP, MySQL, AngularJS, CodeIgniter.',
    ],
    metrics: [],
    skills: ['php', 'mysql', 'angular', 'codeigniter'],
  },
];

const PROJECTS = [
  {
    id: 'xnohub', name: 'xnohub.com', year: '2024', status: 'live',
    url: 'https://xnohub.com',
    desc: 'Real-time visualizer for the Nano currency network on a 3D globe.',
    skills: ['threejs', 'react', 'nextjs'],
  },
  {
    id: 'localxno', name: 'LocalXNO.com', year: '2024', status: 'live',
    url: 'https://localxno.com',
    desc: 'Nano marketplace on Next.js + Supabase + PostgreSQL, with Google API integrations.',
    skills: ['nextjs', 'supabase', 'postgres'],
  },
  {
    id: 'composable', name: 'Composable UI', year: '2022–23', status: 'oss',
    url: 'https://composable.com/composable-ui',
    desc: 'Open-source headless-commerce starter kit (React/Next.js). UI library + Figma kit + Algolia/Stripe. MACH Alliance award.',
    skills: ['react', 'nextjs', 'chakra'],
  },
  {
    id: 'paypaw', name: 'PayPaw', year: '2019–21', status: 'archived', url: null,
    desc: 'Payment service for Bytom Blockchain. Won first place at a dev challenge — USD $30K prize.',
    skills: ['bytom'],
  },
  {
    id: 'gpu-miner', name: 'GPU Miner Opt', year: '2020', status: 'archived', url: null,
    desc: 'Optimized C++ GPU mining; +30% efficiency through caching.',
    skills: ['cpp', 'cuda'],
  },
  {
    id: 'bytom-dice', name: 'Bytom Dice', year: '2019–20', status: 'archived', url: null,
    desc: 'On-chain cryptocurrency betting site on Bytom.',
    skills: ['bytom'],
  },
];

const SKILLS = {
  'AI / LLM':   [
    { name: 'LoRA', heat: 'hot' }, { name: 'Gemini API', heat: 'hot' },
    { name: 'Embeddings', heat: 'hot' }, { name: 'Eval loops', heat: 'hot' },
    { name: 'Claude', heat: 'warm' }, { name: 'ChatGPT', heat: 'warm' },
    { name: 'Cursor', heat: 'warm' }, { name: 'Grok', heat: 'cool' },
  ],
  'FRONTEND':   [
    { name: 'React', heat: 'hot' }, { name: 'Next.js', heat: 'hot' },
    { name: 'TanStack Q', heat: 'hot' }, { name: 'TypeScript', heat: 'hot' },
    { name: 'Tailwind', heat: 'warm' }, { name: 'Shadcn/UI', heat: 'warm' },
    { name: 'Chakra UI', heat: 'warm' }, { name: 'HTML5/CSS3', heat: 'warm' },
  ],
  'BACKEND':    [
    { name: 'Node.js', heat: 'hot' }, { name: 'Python', heat: 'hot' },
    { name: 'Ruby', heat: 'cool' }, { name: 'PHP', heat: 'cool' },
    { name: 'Java', heat: 'cool' }, { name: 'Perl', heat: 'cool' },
  ],
  'DATA':       [
    { name: 'PostgreSQL', heat: 'hot' }, { name: 'Supabase', heat: 'hot' },
    { name: 'Redis', heat: 'warm' }, { name: 'Elasticsearch', heat: 'warm' },
    { name: 'MySQL', heat: 'cool' }, { name: 'Firebase', heat: 'cool' },
  ],
  'CLOUD':      [
    { name: 'Supabase', heat: 'hot' }, { name: 'GCP', heat: 'hot' },
    { name: 'AWS', heat: 'warm' }, { name: 'Vercel', heat: 'warm' },
    { name: 'Netlify', heat: 'cool' }, { name: 'Firebase', heat: 'cool' },
    { name: 'Tencent', heat: 'cool' },
  ],
  'FRAMEWORKS': [
    { name: 'Next.js', heat: 'hot' }, { name: 'Remix', heat: 'warm' },
    { name: 'Rails', heat: 'cool' }, { name: 'Django', heat: 'cool' },
    { name: 'Flask', heat: 'cool' }, { name: 'Vue', heat: 'cool' },
    { name: 'Express', heat: 'cool' }, { name: 'Backbone', heat: 'cool' },
    { name: 'CodeIgniter', heat: 'cool' },
  ],
};

// Skill display-name to canonical id (used to wire System Map edges)
const SKILL_ID = {
  lora: 'LoRA', gemini: 'Gemini API', embeddings: 'Embeddings',
  supabase: 'Supabase', tanstack: 'TanStack Q', postgres: 'PostgreSQL',
  python: 'Python', react: 'React', nextjs: 'Next.js', typescript: 'TypeScript',
  chakra: 'Chakra UI', tailwind: 'Tailwind', threejs: 'Three.js',
  ruby: 'Ruby', rails: 'Rails', redis: 'Redis', elasticsearch: 'Elasticsearch',
  aws: 'AWS', nodejs: 'Node.js', backbone: 'Backbone', php: 'PHP',
  mysql: 'MySQL', angular: 'Angular', codeigniter: 'CodeIgniter',
  firebase: 'Firebase', gcp: 'GCP', cpp: 'C++', cuda: 'CUDA', bytom: 'Bytom',
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  console.log('dalin.dev v2026.1 · data loaded', { ROLES, PROJECTS, SKILLS });
});
```

- [ ] **Step 2: Verify**

Refresh. Open devtools console. Expected: `dalin.dev v2026.1 · data loaded { ROLES: [...], PROJECTS: [...], SKILLS: {...} }` with 7 roles, 6 projects, 6 skill categories.

- [ ] **Step 3: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add content data: ROLES, PROJECTS, SKILLS"
```

---

## Task 4: Top bar (sticky) + footer

**Files:**
- Modify: `dalin.dev/index.html` (`<style>` and `<header>` / `<footer>`)

- [ ] **Step 1: Add chrome CSS**

Add to `<style>`:

```css
.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 24px;
  background: rgba(4, 6, 12, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
  font-size: 10px; letter-spacing: 0.08em;
}
.topbar .left { display: flex; gap: 14px; align-items: center; }
.topbar .logo {
  color: var(--accent-live); font-weight: 800;
  letter-spacing: 0.25em; font-size: 11px;
}
.topbar .mono { color: var(--ink-faint); }
.topbar .v { color: var(--ink-dim); cursor: pointer; }
.topbar .v:hover { color: var(--ink-strong); }
.topbar .right { display: flex; gap: 16px; }
.topbar .right a { color: var(--ink-dim); }
.topbar .right a:hover { color: var(--accent-link); }

.dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent-live); box-shadow: var(--glow-live);
  animation: pulseDot 2s ease-in-out infinite;
  vertical-align: middle; margin-right: 4px; cursor: pointer;
}
@keyframes pulseDot { 50% { opacity: .35; } }

.footer {
  max-width: 1100px; margin: 40px auto 0; padding: 16px 24px;
  border-top: 1px solid var(--rule);
  display: flex; justify-content: space-between;
  font-size: 10px; color: var(--ink-faint); letter-spacing: 0.10em;
}
.footer .v { cursor: pointer; }
.footer .v:hover { color: var(--ink-dim); }

@media (max-width: 640px) {
  .topbar { padding: 8px 14px; font-size: 9px; gap: 8px; }
  .topbar .logo { font-size: 10px; }
  .topbar .right { gap: 10px; }
}
```

- [ ] **Step 2: Fill in `<header>` markup**

Replace `<header class="topbar"><!-- Task 4 --></header>` with:

```html
<header class="topbar">
  <div class="left">
    <span class="logo">DALIN.DEV</span>
    <span class="mono v" id="version-top">v2026.1</span>
    <span class="mono">·</span>
    <span class="mono"><span class="dot" id="status-dot"></span>ONLINE · OTTAWA</span>
  </div>
  <nav class="right" aria-label="External links">
    <a href="https://www.linkedin.com/in/dalinhuang/" target="_blank" rel="noopener">LINKEDIN</a>
    <a href="https://github.com/dalindev" target="_blank" rel="noopener">GITHUB</a>
    <a href="mailto:dhuan023@gmail.com">EMAIL</a>
    <a href="#" id="resume-link">RESUME</a>
  </nav>
</header>
```

- [ ] **Step 3: Fill in `<footer>` markup**

Replace `<footer class="footer"><!-- Task 4 --></footer>` with:

```html
<footer class="footer">
  <div>SYSTEM · BSc CompSci · Minor Econ · U of Ottawa · 2009–2014</div>
  <div class="v" id="version-bottom">BUILD · 2026.1</div>
</footer>
```

- [ ] **Step 4: Verify**

Refresh. Expected: dark sticky top bar with green DALIN.DEV logo, pulsing green dot, version, status, 4 right-side links. Footer at bottom with education + build tag.

- [ ] **Step 5: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add top bar and footer chrome"
```

---

## Task 5: Hero — identity, terminal, SVG ghost background

**Files:**
- Modify: `dalin.dev/index.html` (CSS + hero section)

- [ ] **Step 1: Add hero CSS**

Append to `<style>`:

```css
.hero {
  position: relative;
  padding: 36px 0 28px;
  border-bottom: 1px solid var(--rule);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 28px;
}
.hero .ghost {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  opacity: 0.35;
}
.hero .ghost svg { width: 100%; height: 100%; display: block; }
.hero > .body, .hero > .term { position: relative; z-index: 1; }

.hero .op {
  font-size: 10px; letter-spacing: 0.20em;
  color: var(--ink-faint); margin-bottom: 8px;
}
.hero h1 {
  font-size: 40px; line-height: 1.05; font-weight: 800;
  letter-spacing: -0.02em; color: var(--ink-strong); margin-bottom: 6px;
}
.hero .role {
  color: var(--accent-link); font-size: 14px; font-weight: 700;
  margin-bottom: 14px;
}
.hero .bio {
  color: var(--ink-dim); font-size: 12px; line-height: 1.7;
  max-width: 420px;
}
.hero .bio b { color: var(--accent-link); font-weight: 700; }
.hero .links {
  margin-top: 18px; display: flex; flex-wrap: wrap; gap: 8px;
  font-size: 10px;
}
.hero .links a {
  color: var(--accent-live);
  padding: 5px 10px;
  border: 1px solid rgba(74, 222, 128, 0.30);
  border-radius: 3px;
  letter-spacing: 0.08em;
  transition: all 180ms ease-out;
}
.hero .links a:hover {
  background: rgba(74, 222, 128, 0.10);
  box-shadow: var(--glow-live);
}

.term {
  background: var(--bg-elev);
  border: 1px solid var(--rule-strong);
  border-radius: 4px;
  padding: 12px;
  height: 180px;
  overflow: hidden;
  font-size: 10px;
  color: var(--ink-dim);
}
.term .head {
  color: var(--ink-faint); font-size: 9px; letter-spacing: 0.18em;
  text-transform: uppercase; margin-bottom: 10px;
  display: flex; justify-content: space-between;
}
.term .head .live {
  color: var(--accent-live);
}
.term .stream { display: flex; flex-direction: column; gap: 4px; }
.term .line { opacity: 0; }
.term .line.show { opacity: 1; transition: opacity 200ms ease-out; }
.term .ok   { color: var(--accent-live); }
.term .warn { color: var(--accent-warn); }
.term .key  { color: var(--accent-link); }
.term .dim  { color: var(--ink-faint); }

@media (max-width: 720px) {
  .hero { grid-template-columns: 1fr; gap: 20px; padding: 24px 0 20px; }
  .hero h1 { font-size: 32px; }
}
```

- [ ] **Step 2: Fill in hero markup**

Replace `<section class="hero"><!-- Task 5 --></section>` with:

```html
<section class="hero">
  <div class="ghost" aria-hidden="true">
    <svg viewBox="0 0 800 240" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="rgba(96,165,250,0.30)" stroke-width="0.7" stroke-dasharray="3 5">
        <path d="M80,60 Q200,180 380,90"/>
        <path d="M380,90 Q500,40 720,140"/>
        <path d="M380,90 Q480,200 620,180"/>
        <path d="M120,200 Q280,120 380,90"/>
        <path d="M720,140 Q650,80 540,100"/>
        <path d="M120,200 Q380,260 620,180"/>
      </g>
      <g>
        <circle cx="80"  cy="60"  r="6" fill="#4ade80" opacity=".7"/>
        <circle cx="380" cy="90"  r="9" fill="#60a5fa" opacity=".7"/>
        <circle cx="720" cy="140" r="6" fill="#4ade80" opacity=".7"/>
        <circle cx="120" cy="200" r="4" fill="#fbbf24" opacity=".7"/>
        <circle cx="620" cy="180" r="4" fill="#fbbf24" opacity=".7"/>
        <circle cx="540" cy="100" r="4" fill="#fbbf24" opacity=".7"/>
      </g>
    </svg>
  </div>

  <div class="body">
    <div class="op">// OPERATOR</div>
    <h1>Dalin Huang</h1>
    <div class="role">Senior Full Stack Developer / AI Developer</div>
    <p class="bio">
      Building AI agent platforms at <b>Parker AI</b>. Async pipelines that process
      billions of data points a day. Fine-tunes open-weight LLMs with LoRA.
      Eleven years shipping production systems — backend, frontend, and the weird
      stuff in between.
    </p>
    <div class="links">
      <a href="https://www.linkedin.com/in/dalinhuang/" target="_blank" rel="noopener">→ LINKEDIN</a>
      <a href="https://github.com/dalindev" target="_blank" rel="noopener">→ GITHUB</a>
      <a href="mailto:dhuan023@gmail.com">→ EMAIL</a>
      <a href="#" id="hero-resume">→ RESUME.PDF</a>
    </div>
  </div>

  <div class="term" aria-live="polite">
    <div class="head"><span>$ system.live</span><span class="live">● STREAMING</span></div>
    <div class="stream" id="term-stream">
      <!-- Lines injected by JS in Task 14 -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Refresh. Expected:
- Left: `// OPERATOR` label, "Dalin Huang" large white, blue role, gray bio with blue "Parker AI", 4 green-bordered link chips.
- Right: empty terminal box with `$ system.live` header and `● STREAMING` indicator.
- Faint dashed lines + dots visible behind the hero (the SVG ghost graph).

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add hero section with identity, terminal shell, ghost graph bg"
```

---

## Task 6: KPI strip (static numbers, count-up wired in Task 14)

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add KPI CSS**

Append to `<style>`:

```css
.kpis {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
  border-bottom: 1px solid var(--rule);
  margin-top: 0;
}
.kpi {
  background: var(--bg);
  padding: 18px 20px;
  cursor: pointer;
  transition: background 180ms ease-out;
}
.kpi:hover { background: var(--bg-elev); }
.kpi .label {
  font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--ink-faint); margin-bottom: 8px;
}
.kpi .value {
  font-size: 30px; line-height: 1; font-weight: 800;
  color: var(--accent-live); text-shadow: var(--glow-live);
  letter-spacing: -0.01em;
}
.kpi .sub { font-size: 9px; color: var(--ink-dim); margin-top: 6px; }
.kpi .sub .up { color: var(--accent-live); }

@media (max-width: 720px) {
  .kpis { grid-template-columns: repeat(2, 1fr); }
  .kpi { padding: 14px; }
  .kpi .value { font-size: 24px; }
}
```

- [ ] **Step 2: Fill in KPI markup**

Replace `<section class="kpis"><!-- Task 6 --></section>` with:

```html
<section class="kpis">
  <div class="kpi" data-kpi="years">
    <div class="label">YEARS SHIPPED</div>
    <div class="value" data-count="11" data-suffix="+">11+</div>
    <div class="sub">since 2015 · still compounding</div>
  </div>
  <div class="kpi" data-kpi="f1">
    <div class="label">F1 LIFT · 30 ITER</div>
    <div class="value" data-count="79" data-suffix="%">79%</div>
    <div class="sub">from 0.7% zero-shot</div>
  </div>
  <div class="kpi" data-kpi="scale">
    <div class="label">PLATFORM SCALE</div>
    <div class="value" data-count="100" data-prefix="~" data-suffix="×">~100×</div>
    <div class="sub">thousands of workflows</div>
  </div>
  <div class="kpi" data-kpi="throughput">
    <div class="label">DATA THROUGHPUT</div>
    <div class="value">BILLIONS</div>
    <div class="sub">data pts · ads · media / day</div>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Refresh. Expected: 4-column strip directly under the hero. Each cell shows label (faint), big green number, sub-caption.

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add KPI strip"
```

---

## Task 7: Active Agents — render cards from ROLES, expand/collapse

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add agents CSS**

Append to `<style>`:

```css
.section-head {
  margin: 28px 0 12px;
  display: flex; align-items: center; gap: 10px;
  font-size: 11px; letter-spacing: 0.20em; text-transform: uppercase;
  color: var(--accent-link); font-weight: 700;
}
.section-head::before {
  content: ""; display: inline-block; width: 6px; height: 6px;
  background: var(--accent-link); box-shadow: var(--glow-link);
}
.section-head .count { color: var(--ink-faint); font-weight: 400; }

.agents { display: flex; flex-direction: column; gap: 8px; }
.agent {
  background: var(--bg);
  border: 1px solid var(--rule);
  border-left: 3px solid var(--accent-live);
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 400ms ease-out, border-color 400ms ease-out;
}
.agent.archived { border-left-color: var(--ink-faint); opacity: 0.92; }
.agent.flash    { border-left-color: var(--accent-link); box-shadow: 0 0 0 1px var(--accent-link), var(--glow-link); }

.agent .head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  gap: 10px;
}
.agent .head .name { color: var(--ink-strong); font-weight: 700; font-size: 14px; }
.agent .head .meta { color: var(--ink-faint); font-size: 9px; letter-spacing: 0.12em; margin-top: 2px; }
.agent .head .right { display: flex; gap: 10px; align-items: center; font-size: 10px; }
.agent .head .period { color: var(--accent-warn); letter-spacing: 0.08em; }
.agent .head .status {
  display: inline-block; padding: 2px 6px; border-radius: 2px;
  background: rgba(74,222,128,0.12); color: var(--accent-live);
  font-size: 8px; letter-spacing: 0.15em; font-weight: 700;
}
.agent.archived .head .status { background: rgba(148,163,184,0.10); color: var(--ink-dim); }
.agent .head .jump {
  color: var(--ink-faint); font-size: 9px; letter-spacing: 0.08em;
  padding: 4px 8px; border: 1px solid var(--rule);
  border-radius: 2px; cursor: pointer;
}
.agent .head .jump:hover { color: var(--accent-link); border-color: var(--accent-link); }
.agent .head .caret { color: var(--ink-faint); font-size: 9px; transition: transform 180ms ease-out; }
.agent.open .head .caret { transform: rotate(90deg); }

.agent .body {
  display: none;
  padding: 0 16px 14px;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
.agent.open .body { display: grid; }
.agent .body ul { padding-left: 14px; color: var(--ink); font-size: 11px; line-height: 1.65; }
.agent .body li { margin-bottom: 4px; }
.agent .body .metrics { display: flex; flex-direction: column; gap: 6px; }
.agent .body .metrics .row {
  display: flex; justify-content: space-between; font-size: 9px;
}
.agent .body .metrics .k { color: var(--ink-faint); letter-spacing: 0.1em; }
.agent .body .metrics .v { color: var(--accent-live); font-weight: 700; }

@media (max-width: 640px) {
  .agent .head { grid-template-columns: 1fr; }
  .agent .head .right { justify-content: flex-start; flex-wrap: wrap; }
  .agent .body { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Render agents from data**

Replace `<section class="agents"><!-- Task 7 --></section>` with:

```html
<h2 class="section-head" id="agents-head">ACTIVE AGENTS <span class="count" id="agents-count"></span></h2>
<section class="agents" id="agents-list"></section>
```

Append to the inline `<script>` (after the data declarations, inside the `DOMContentLoaded` listener — replace the existing console.log line with the block below):

```js
function renderAgents() {
  const list = document.getElementById('agents-list');
  list.innerHTML = ROLES.map(r => `
    <article class="agent ${r.status === 'archived' ? 'archived' : ''} ${r.status === 'live' ? 'open' : ''}" data-id="${r.id}">
      <div class="head" role="button" tabindex="0" aria-expanded="${r.status === 'live' ? 'true' : 'false'}">
        <div>
          <div class="name">${r.name} <span style="color:var(--ink-dim); font-weight:400; font-size:11px;">· ${r.title}</span></div>
          <div class="meta">agent-${String(r.slot).padStart(3, '0')}</div>
        </div>
        <div class="right">
          <span class="period">${r.period}</span>
          <span class="status">● ${r.status === 'live' ? 'LIVE' : 'ARCHIVED'}</span>
          <span class="jump" data-jump="${r.id}">↑ MAP</span>
          <span class="caret">▶</span>
        </div>
      </div>
      <div class="body">
        <ul>${r.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        <div class="metrics">
          ${r.metrics.map(m => `<div class="row"><span class="k">${m.k}</span><span class="v">${m.v}</span></div>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  const live = ROLES.filter(r => r.status === 'live').length;
  document.getElementById('agents-count').textContent = `· ${ROLES.length} deployed · ${live} live`;

  // Expand/collapse
  list.querySelectorAll('.agent .head').forEach(head => {
    const toggle = () => {
      const a = head.closest('.agent');
      a.classList.toggle('open');
      head.setAttribute('aria-expanded', a.classList.contains('open'));
    };
    head.addEventListener('click', e => {
      // Don't toggle if user clicked the jump pill
      if (e.target.closest('[data-jump]')) return;
      toggle();
    });
    head.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('dalin.dev v2026.1 · data loaded', { ROLES, PROJECTS, SKILLS });
  renderAgents();
});
```

(Remove the now-duplicate `DOMContentLoaded` listener from earlier.)

- [ ] **Step 3: Verify**

Refresh. Expected:
- ACTIVE AGENTS header with `· 7 deployed · 2 live`.
- 7 agent cards stacked. Parker AI and HiNature open by default (green left border, bullets + metrics visible). Others closed (gray border).
- Clicking any closed card expands it.
- `↑ MAP` pill does nothing yet (wired in Task 12).

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Render Active Agents from ROLES with expand/collapse"
```

---

## Task 8: Deployed Services — tiles from PROJECTS

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add services CSS**

Append to `<style>`:

```css
.services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.svc {
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 14px;
  position: relative;
  transition: transform 180ms ease-out, box-shadow 180ms ease-out, border-color 180ms ease-out;
  display: flex; flex-direction: column;
}
.svc:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}
.svc.live:hover    { border-color: var(--accent-live); box-shadow: 0 6px 20px rgba(0,0,0,0.4), var(--glow-live); }
.svc.oss:hover     { border-color: var(--accent-warn); box-shadow: 0 6px 20px rgba(0,0,0,0.4), var(--glow-warn); }
.svc.flash         { border-color: var(--accent-link); box-shadow: 0 0 0 1px var(--accent-link), var(--glow-link); }

.svc .dot-svc {
  position: absolute; top: 14px; right: 14px;
  width: 6px; height: 6px; border-radius: 50%;
}
.svc.live    .dot-svc { background: var(--accent-live); box-shadow: var(--glow-live); }
.svc.oss     .dot-svc { background: var(--accent-warn); box-shadow: var(--glow-warn); }
.svc.archived .dot-svc { background: var(--ink-faint); }

.svc .name { color: var(--accent-link); font-weight: 700; font-size: 13px; padding-right: 16px; }
.svc .name a { color: inherit; }
.svc .name a:hover { text-shadow: var(--glow-link); }
.svc .meta { color: var(--ink-faint); font-size: 8px; letter-spacing: 0.12em; margin: 2px 0 10px; }
.svc .desc { color: var(--ink-dim); font-size: 11px; line-height: 1.55; flex: 1; }
.svc .visit {
  margin-top: 10px; font-size: 9px; letter-spacing: 0.10em;
  color: var(--accent-live);
}

@media (max-width: 900px) { .services { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .services { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Render markup + JS**

Replace `<section class="services"><!-- Task 8 --></section>` with:

```html
<h2 class="section-head">DEPLOYED SERVICES <span class="count" id="services-count"></span></h2>
<section class="services" id="services-list"></section>
```

Add this function to the script and call it from `DOMContentLoaded`:

```js
function renderServices() {
  const list = document.getElementById('services-list');
  list.innerHTML = PROJECTS.map(p => `
    <article class="svc ${p.status}" data-id="${p.id}">
      <span class="dot-svc"></span>
      <div class="name">
        ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : p.name}
      </div>
      <div class="meta">${p.year} · ${p.status === 'live' ? 'LIVE' : p.status === 'oss' ? 'OSS' : 'ARCHIVED'}</div>
      <div class="desc">${p.desc}</div>
      ${p.url ? `<div class="visit">→ VISIT ↗</div>` : ''}
    </article>
  `).join('');
  document.getElementById('services-count').textContent = `· ${PROJECTS.length} endpoints`;
}
```

Update the `DOMContentLoaded` block:

```js
document.addEventListener('DOMContentLoaded', () => {
  renderAgents();
  renderServices();
});
```

- [ ] **Step 3: Verify**

Refresh. Expected: DEPLOYED SERVICES header, 3-column grid of 6 tiles. xnohub/LocalXNO have green pulsing dots, Composable UI has an orange dot, the 3 archived have gray dots. Hover lifts each tile.

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Render Deployed Services tiles from PROJECTS"
```

---

## Task 9: System Capabilities — skill heatmap

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add capabilities CSS**

Append to `<style>`:

```css
.capabilities { display: flex; flex-direction: column; gap: 4px; }
.cap-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 8px;
  align-items: center;
}
.cap-row .cat {
  color: var(--accent-link);
  font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
}
.cap-row .cells {
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cap-cell {
  padding: 5px 9px; border-radius: 2px;
  font-size: 10px; color: var(--ink); white-space: nowrap;
  background: rgba(74, 222, 128, 0.08);
  border: 1px solid rgba(74, 222, 128, 0.10);
  transition: all 180ms ease-out;
  cursor: default;
}
.cap-cell.warm {
  background: rgba(74, 222, 128, 0.22);
  border-color: rgba(74, 222, 128, 0.30);
  color: var(--ink-strong);
}
.cap-cell.hot {
  background: rgba(74, 222, 128, 0.55);
  border-color: rgba(74, 222, 128, 0.80);
  color: #04220f;
  font-weight: 700;
}
.cap-cell:hover {
  transform: translateY(-1px);
  box-shadow: var(--glow-live);
}

@media (max-width: 640px) {
  .cap-row { grid-template-columns: 1fr; gap: 4px; }
  .cap-row .cat { font-size: 9px; }
}
```

- [ ] **Step 2: Render markup**

Replace `<section class="capabilities"><!-- Task 9 --></section>` with:

```html
<h2 class="section-head">SYSTEM CAPABILITIES <span class="count">· skill matrix</span></h2>
<section class="capabilities" id="cap-list"></section>
```

Add to script + call from DOMContentLoaded:

```js
function renderCapabilities() {
  const list = document.getElementById('cap-list');
  list.innerHTML = Object.entries(SKILLS).map(([cat, items]) => `
    <div class="cap-row">
      <div class="cat">${cat}</div>
      <div class="cells">
        ${items.map(s => `<span class="cap-cell ${s.heat}" title="${s.name}">${s.name}</span>`).join('')}
      </div>
    </div>
  `).join('');
}
```

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  renderAgents();
  renderServices();
  renderCapabilities();
});
```

- [ ] **Step 3: Verify**

Refresh. Expected: SYSTEM CAPABILITIES header, then 6 rows (AI/LLM, FRONTEND, BACKEND, DATA, CLOUD, FRAMEWORKS). Each row: category label left, skill chips on the right. Hot skills (LoRA, Gemini, etc.) brightest green. Hover lifts a cell.

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Render System Capabilities heatmap from SKILLS"
```

---

## Task 10: System Map shell — container, toolbar, static SVG fallback

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add System Map shell CSS**

Append to `<style>`:

```css
.systemmap {
  margin: 24px 0 0;
  background: var(--bg-deep);
  border: 1px solid var(--rule-strong);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
.sm-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--rule);
  font-size: 9px; color: var(--ink-faint); letter-spacing: 0.12em;
  flex-wrap: wrap; gap: 10px;
}
.sm-toolbar .title { color: var(--ink-dim); }
.sm-toolbar .right {
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
}
.sm-chip {
  padding: 4px 9px; border: 1px solid var(--rule-strong);
  border-radius: 2px; font-size: 9px; letter-spacing: 0.12em;
  color: var(--ink-dim); cursor: pointer; user-select: none;
  transition: all 180ms ease-out;
}
.sm-chip.role.on  { color: var(--accent-live); border-color: rgba(74,222,128,0.5); background: rgba(74,222,128,0.10); }
.sm-chip.proj.on  { color: var(--accent-link); border-color: rgba(96,165,250,0.5); background: rgba(96,165,250,0.10); }
.sm-chip.skill.on { color: var(--accent-warn); border-color: rgba(251,191,36,0.5); background: rgba(251,191,36,0.10); }
.sm-chip.off { opacity: 0.4; }

.sm-search {
  background: var(--bg-elev); border: 1px solid var(--rule-strong);
  border-radius: 2px; padding: 4px 8px; color: var(--ink); font-family: var(--mono);
  font-size: 10px; width: 160px; outline: none;
}
.sm-search:focus { border-color: var(--accent-link); box-shadow: var(--glow-link); }

.sm-zoom { display: flex; gap: 2px; }
.sm-zoom button {
  width: 24px; height: 22px;
  background: var(--bg-elev); border: 1px solid var(--rule-strong);
  color: var(--ink-dim); cursor: pointer; font-size: 12px;
  display: inline-flex; align-items: center; justify-content: center;
}
.sm-zoom button:hover { color: var(--ink-strong); border-color: var(--accent-link); }

.sm-viewport {
  position: relative;
  height: 480px;
  background:
    radial-gradient(60% 60% at 50% 50%, rgba(96,165,250,0.06), transparent 70%),
    var(--bg-deep);
}
.sm-viewport canvas { display: block; width: 100% !important; height: 100% !important; }
.sm-viewport .sm-fallback { width: 100%; height: 100%; }

.sm-tooltip {
  position: absolute; pointer-events: none;
  background: rgba(4,6,12,0.92);
  border: 1px solid var(--accent-link);
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 10px; color: var(--ink);
  max-width: 240px;
  box-shadow: 0 4px 20px rgba(96,165,250,0.30);
  opacity: 0; transform: translate(-50%, -110%);
  transition: opacity 150ms ease-out;
}
.sm-tooltip.show { opacity: 1; }
.sm-tooltip h6 { color: var(--accent-link); font-size: 11px; margin-bottom: 3px; }
.sm-tooltip .meta { color: var(--ink-faint); font-size: 8px; letter-spacing: 0.12em; margin-bottom: 5px; }

.sm-hint {
  padding: 6px 14px;
  border-top: 1px solid var(--rule);
  font-size: 8px; color: var(--ink-faint); letter-spacing: 0.12em;
  display: flex; justify-content: space-between;
}

@media (max-width: 720px) {
  .sm-viewport { height: 360px; }
  .sm-search { width: 110px; }
}
```

- [ ] **Step 2: System Map markup with SVG fallback**

Replace `<section class="systemmap"><!-- Tasks 10–13 --></section>` with:

```html
<h2 class="section-head">SYSTEM MAP <span class="count">· roles ↔ projects ↔ skills</span></h2>
<section class="systemmap">
  <div class="sm-toolbar">
    <span class="title">// DRAG TO ROTATE · CLICK A NODE TO HIGHLIGHT BELOW · TYPE / TO SEARCH</span>
    <div class="right">
      <span class="sm-chip role on" data-filter="role">● ROLES</span>
      <span class="sm-chip proj on" data-filter="project">● PROJECTS</span>
      <span class="sm-chip skill on" data-filter="skill">● SKILLS</span>
      <input class="sm-search" id="sm-search" placeholder="⌕ search nodes" aria-label="Search system map">
      <div class="sm-zoom">
        <button id="sm-zoom-in"  title="Zoom in">+</button>
        <button id="sm-zoom-out" title="Zoom out">−</button>
      </div>
    </div>
  </div>

  <div class="sm-viewport" id="sm-viewport">
    <!-- Three.js canvas inserted here in Task 11 -->
    <svg class="sm-fallback" id="sm-fallback" viewBox="0 0 700 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <!-- Edges -->
      <g fill="none" stroke="rgba(96,165,250,0.30)" stroke-width="0.8" stroke-dasharray="3 5">
        <path d="M350,240 L150,140"/>
        <path d="M350,240 L540,120"/>
        <path d="M350,240 L600,340"/>
        <path d="M350,240 L100,330"/>
        <path d="M350,240 L240,400"/>
        <path d="M150,140 L260,90"/>
        <path d="M540,120 L430,80"/>
        <path d="M600,340 L470,300"/>
        <path d="M100,330 L290,360"/>
      </g>
      <!-- Hub -->
      <circle cx="350" cy="240" r="14" fill="#fff" opacity="0.95"/>
      <text x="370" y="245" fill="#fff" font-size="10" font-family="monospace" font-weight="700">DALIN</text>
      <!-- Roles -->
      <circle cx="150" cy="140" r="9" fill="#4ade80"/>
      <text x="40" y="135" fill="#4ade80" font-size="9" font-family="monospace">PARKER AI</text>
      <circle cx="540" cy="120" r="7" fill="#4ade80"/>
      <text x="555" y="116" fill="#4ade80" font-size="9" font-family="monospace">ORIUM</text>
      <circle cx="600" cy="340" r="6" fill="#4ade80"/>
      <text x="612" y="336" fill="#4ade80" font-size="9" font-family="monospace">SHOPIFY</text>
      <circle cx="100" cy="330" r="6" fill="#4ade80"/>
      <text x="20" y="355" fill="#4ade80" font-size="9" font-family="monospace">COMBYNE</text>
      <circle cx="240" cy="400" r="5" fill="#4ade80"/>
      <text x="190" y="420" fill="#4ade80" font-size="8" font-family="monospace">i-sight · events</text>
      <!-- Projects -->
      <circle cx="430" cy="80" r="7" fill="#60a5fa"/>
      <text x="445" y="76" fill="#60a5fa" font-size="9" font-family="monospace">COMPOSABLE UI</text>
      <circle cx="260" cy="90" r="6" fill="#60a5fa"/>
      <text x="218" y="78" fill="#60a5fa" font-size="9" font-family="monospace">HINATURE</text>
      <circle cx="470" cy="300" r="6" fill="#60a5fa"/>
      <text x="485" y="296" fill="#60a5fa" font-size="9" font-family="monospace">XNOHUB</text>
      <circle cx="290" cy="360" r="5" fill="#60a5fa"/>
      <text x="250" y="380" fill="#60a5fa" font-size="9" font-family="monospace">LOCALXNO</text>
      <!-- Skills -->
      <circle cx="220" cy="180" r="4" fill="#fbbf24"/>
      <text x="195" y="200" fill="#fbbf24" font-size="8" font-family="monospace">LoRA</text>
      <circle cx="280" cy="170" r="4" fill="#fbbf24"/>
      <text x="260" y="162" fill="#fbbf24" font-size="8" font-family="monospace">Gemini</text>
      <circle cx="400" cy="170" r="4" fill="#fbbf24"/>
      <text x="378" y="162" fill="#fbbf24" font-size="8" font-family="monospace">React</text>
      <circle cx="430" cy="240" r="4" fill="#fbbf24"/>
      <text x="440" y="246" fill="#fbbf24" font-size="8" font-family="monospace">Supabase</text>
    </svg>
    <div class="sm-tooltip" id="sm-tooltip"></div>
  </div>

  <div class="sm-hint">
    <span>● ROLE &nbsp; ● PROJECT &nbsp; ● SKILL &nbsp;— edges = "used at" / "shipped at"</span>
    <span>POWERED BY THREE.JS</span>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Refresh. Expected: System Map section with toolbar (filter chips colored, search input, zoom +/−). Viewport shows the static SVG fallback graph (hub + 5 role nodes + 4 project nodes + 4 skill nodes + edges). The toolbar chips don't toggle yet (Task 13).

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add System Map shell with toolbar and SVG fallback"
```

---

## Task 11: System Map — Three.js scene, nodes, edges

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add Three.js scene init**

Append to the inline `<script>` (after `renderCapabilities`):

```js
const SM = {
  scene: null, camera: null, renderer: null, controls: null,
  nodes: [],         // { mesh, type, id, name, period?, desc?, url? }
  edges: [],         // { line, a, b }
  raycaster: null, mouse: null,
  hovered: null, selected: null,
  autoRotate: true, autoRotateResumeAt: 0,
  filters: { role: true, project: true, skill: true },
};

function buildSystemMap() {
  if (typeof THREE === 'undefined') { console.warn('Three.js not loaded; SVG fallback stays.'); return; }

  const vp = document.getElementById('sm-viewport');
  const fallback = document.getElementById('sm-fallback');
  fallback.style.display = 'none';

  const w = vp.clientWidth, h = vp.clientHeight;

  SM.scene = new THREE.Scene();
  SM.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  SM.camera.position.set(5, 2, 6);
  SM.camera.lookAt(0, 0, 0);

  SM.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  SM.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  SM.renderer.setSize(w, h);
  SM.renderer.setClearColor(0x000000, 0);
  vp.insertBefore(SM.renderer.domElement, fallback);

  // Controls
  if (THREE.OrbitControls) {
    SM.controls = new THREE.OrbitControls(SM.camera, SM.renderer.domElement);
    SM.controls.enableDamping = true;
    SM.controls.dampingFactor = 0.08;
    SM.controls.enableZoom = false;   // page-scroll-safe; pinch is its own gesture
    SM.controls.enablePan = false;
    SM.controls.minDistance = 3;
    SM.controls.maxDistance = 12;
    SM.controls.addEventListener('start', () => { SM.autoRotate = false; SM.autoRotateResumeAt = performance.now() + 4000; });
  }

  // Lights
  SM.scene.add(new THREE.HemisphereLight(0xffffff, 0x223355, 0.7));
  const point = new THREE.PointLight(0xaaccff, 0.8, 20);
  point.position.set(0, 0, 0);
  SM.scene.add(point);

  // Hub
  const hubGeo = new THREE.IcosahedronGeometry(0.40, 1);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.45, roughness: 0.3, metalness: 0.4,
  });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  hub.userData = { type: 'hub', id: 'dalin', name: 'DALIN' };
  SM.scene.add(hub);
  SM.nodes.push({ mesh: hub, type: 'hub', id: 'dalin', name: 'DALIN' });

  // Build node list from data
  const roleNodes = ROLES.map((r, i) => ({
    type: 'role', id: r.id, name: r.name, period: r.period,
    color: 0x4ade80, radius: 0.18 + Math.min(r.tenure / 4, 0.18),
    ring: 1, slot: i, total: ROLES.length, payload: r,
  }));
  const projNodes = PROJECTS.map((p, i) => ({
    type: 'project', id: p.id, name: p.name, period: p.year,
    color: 0x60a5fa, radius: 0.16, ring: 2, slot: i, total: PROJECTS.length, payload: p,
  }));

  // Skill nodes: only the union of skills referenced in any role/project
  const skillSet = new Set();
  ROLES.forEach(r => r.skills.forEach(s => skillSet.add(s)));
  PROJECTS.forEach(p => p.skills.forEach(s => skillSet.add(s)));
  const skillNodes = Array.from(skillSet).map((s, i, arr) => ({
    type: 'skill', id: s, name: SKILL_ID[s] || s, period: '',
    color: 0xfbbf24, radius: 0.10, ring: 3, slot: i, total: arr.length, payload: { id: s, name: SKILL_ID[s] || s },
  }));

  function placeNode(n) {
    // Concentric rings on a tilted plane for variety
    const ringRadius = [0, 2.0, 2.6, 3.4][n.ring];
    const slotAngle = (n.slot / n.total) * Math.PI * 2 + (n.ring * 0.6);
    const tilt = (n.ring === 2) ? 0.4 : (n.ring === 3 ? -0.3 : 0);
    const x = Math.cos(slotAngle) * ringRadius;
    const z = Math.sin(slotAngle) * ringRadius;
    const y = Math.sin(slotAngle * 1.3) * 0.6 + tilt;
    return [x, y, z];
  }

  [...roleNodes, ...projNodes, ...skillNodes].forEach(n => {
    const geo = new THREE.SphereGeometry(n.radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: n.color, emissive: n.color, emissiveIntensity: 0.6,
      roughness: 0.4, metalness: 0.3,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const [x, y, z] = placeNode(n);
    mesh.position.set(x, y, z);
    mesh.userData = { type: n.type, id: n.id, name: n.name, period: n.period, payload: n.payload, color: n.color, baseRadius: n.radius };
    SM.scene.add(mesh);
    SM.nodes.push({ mesh, ...n });
  });

  // Edges
  function addEdge(a, b, color, opacity) {
    const geo = new THREE.BufferGeometry().setFromPoints([a.mesh.position, b.mesh.position]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const line = new THREE.Line(geo, mat);
    SM.scene.add(line);
    SM.edges.push({ line, a, b, baseOpacity: opacity });
  }
  const hubNode = SM.nodes.find(n => n.type === 'hub');

  // hub → roles, hub → projects
  SM.nodes.filter(n => n.type === 'role').forEach(r => addEdge(hubNode, r, 0x4ade80, 0.35));
  SM.nodes.filter(n => n.type === 'project').forEach(p => addEdge(hubNode, p, 0x60a5fa, 0.25));

  // role → skill
  ROLES.forEach(r => {
    const roleNode = SM.nodes.find(n => n.id === r.id);
    r.skills.forEach(s => {
      const skillNode = SM.nodes.find(n => n.type === 'skill' && n.id === s);
      if (roleNode && skillNode) addEdge(roleNode, skillNode, 0x4ade80, 0.18);
    });
  });
  // project → skill
  PROJECTS.forEach(p => {
    const projNode = SM.nodes.find(n => n.id === p.id);
    p.skills.forEach(s => {
      const skillNode = SM.nodes.find(n => n.type === 'skill' && n.id === s);
      if (projNode && skillNode) addEdge(projNode, skillNode, 0x60a5fa, 0.18);
    });
  });

  SM.raycaster = new THREE.Raycaster();
  SM.mouse = new THREE.Vector2();

  // Resize
  const onResize = () => {
    const nw = vp.clientWidth, nh = vp.clientHeight;
    SM.camera.aspect = nw / nh;
    SM.camera.updateProjectionMatrix();
    SM.renderer.setSize(nw, nh);
  };
  window.addEventListener('resize', onResize);

  animateSystemMap();
}

let lastTime = 0;
function animateSystemMap() {
  requestAnimationFrame(animateSystemMap);
  if (!SM.scene) return;
  const t = performance.now();
  const dt = (t - lastTime) / 1000 || 0; lastTime = t;

  // Auto-rotate resume
  if (!SM.autoRotate && t > SM.autoRotateResumeAt) SM.autoRotate = true;
  if (SM.autoRotate && SM.controls) {
    SM.scene.rotation.y += dt * (Math.PI / 30); // ~6 deg/sec
  }

  // Idle pulse on nodes
  SM.nodes.forEach((n, i) => {
    if (n.type === 'hub') return;
    const phase = (t / 1000 + i * 0.3) * (Math.PI * 2 / 3);
    const k = 1 + Math.sin(phase) * 0.08;
    n.mesh.scale.set(k, k, k);
  });

  if (SM.controls) SM.controls.update();
  SM.renderer.render(SM.scene, SM.camera);
}
```

- [ ] **Step 2: Hook into boot**

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  renderAgents();
  renderServices();
  renderCapabilities();
  // System Map waits for Three.js (loaded with defer)
  window.addEventListener('load', () => setTimeout(buildSystemMap, 0));
});
```

- [ ] **Step 3: Verify**

Refresh and wait for full load. Expected: 3D graph fades in (replaces SVG fallback). Central white sphere is the hub. Green spheres orbit close (roles), blue further out (projects), small amber dots furthest (skills). Lines connect them. The whole graph slowly rotates. Drag with mouse to orbit — auto-rotate pauses, then resumes after 4s.

If you see only the SVG fallback, check the console for Three.js load errors.

- [ ] **Step 4: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add Three.js System Map scene with nodes and edges"
```

---

## Task 12: System Map — hover tooltip, click-to-highlight card, fly-to camera

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add hover + click handlers**

Append to script:

```js
function wireSystemMapInteractions() {
  if (!SM.renderer) return;
  const canvas = SM.renderer.domElement;
  const tip = document.getElementById('sm-tooltip');
  const vp = document.getElementById('sm-viewport');

  function pickNode(e) {
    const rect = canvas.getBoundingClientRect();
    SM.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    SM.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    SM.raycaster.setFromCamera(SM.mouse, SM.camera);
    const hits = SM.raycaster.intersectObjects(SM.nodes.map(n => n.mesh));
    return hits.length ? SM.nodes.find(n => n.mesh === hits[0].object) : null;
  }

  function setHighlight(node) {
    SM.nodes.forEach(n => {
      const isHi = !node || n === node || isConnected(node, n);
      n.mesh.material.opacity = isHi ? 1 : 0.18;
      n.mesh.material.transparent = !isHi;
    });
    SM.edges.forEach(e => {
      const isHi = !node || e.a === node || e.b === node;
      e.line.material.opacity = isHi ? Math.max(e.baseOpacity, 0.7) : 0.05;
    });
  }

  function isConnected(a, b) {
    return SM.edges.some(e => (e.a === a && e.b === b) || (e.a === b && e.b === a));
  }

  function showTip(node, e) {
    const rect = vp.getBoundingClientRect();
    tip.style.left = (e.clientX - rect.left) + 'px';
    tip.style.top  = (e.clientY - rect.top) + 'px';
    const typeLabel = node.type.toUpperCase();
    const meta = node.period || '';
    const desc = node.payload?.desc || node.payload?.title || '';
    tip.innerHTML = `<h6>● ${node.name}</h6><div class="meta">${typeLabel}${meta ? ' · ' + meta : ''}</div>${desc ? `<div style="color:var(--ink); font-size:9px;">${desc}</div>` : ''}`;
    tip.classList.add('show');
  }
  function hideTip() { tip.classList.remove('show'); }

  canvas.addEventListener('mousemove', e => {
    const node = pickNode(e);
    if (node && node.type !== 'hub') {
      if (SM.hovered !== node) { SM.hovered = node; setHighlight(node); }
      showTip(node, e);
      canvas.style.cursor = 'pointer';
    } else {
      if (SM.hovered) { SM.hovered = null; setHighlight(null); }
      hideTip();
      canvas.style.cursor = 'grab';
    }
  });
  canvas.addEventListener('mouseleave', () => {
    SM.hovered = null; setHighlight(null); hideTip();
  });

  canvas.addEventListener('click', e => {
    const node = pickNode(e);
    if (!node || node.type === 'hub') { setHighlight(null); SM.selected = null; return; }
    flyTo(node);
    flashCardFor(node);
  });
}

function flyTo(node) {
  if (!SM.camera) return;
  const target = node.mesh.position.clone().multiplyScalar(1.6);
  // Account for the scene's current Y rotation so the camera ends in world-space
  const yRot = SM.scene.rotation.y;
  const rotated = target.clone().applyAxisAngle(new THREE.Vector3(0,1,0), yRot);
  const from = SM.camera.position.clone();
  const to = rotated;
  const start = performance.now();
  const dur = 700;
  function tick() {
    const t = Math.min((performance.now() - start) / dur, 1);
    const k = t < 0.5 ? 4 * t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
    SM.camera.position.lerpVectors(from, to, k);
    SM.camera.lookAt(0, 0, 0);
    if (t < 1) requestAnimationFrame(tick);
  }
  tick();
  SM.autoRotate = false; SM.autoRotateResumeAt = performance.now() + 6000;
  SM.selected = node;
}

function flashCardFor(node) {
  let el = null;
  if (node.type === 'role') el = document.querySelector(`.agent[data-id="${node.id}"]`);
  else if (node.type === 'project') el = document.querySelector(`.svc[data-id="${node.id}"]`);
  if (!el) return;
  el.classList.add('flash');
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => el.classList.remove('flash'), 2200);
}

// Wire `↑ MAP` jump pills to fly back
function wireJumpPills() {
  document.querySelectorAll('[data-jump]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const id = el.dataset.jump;
      const node = SM.nodes.find(n => n.id === id);
      if (!node) return;
      document.querySelector('.systemmap').scrollIntoView({ behavior: 'smooth', block: 'center' });
      flyTo(node);
    });
  });
}
```

Then update the System Map init to wire interactions after build:

```js
window.addEventListener('load', () => setTimeout(() => {
  buildSystemMap();
  wireSystemMapInteractions();
  wireJumpPills();
}, 0));
```

- [ ] **Step 2: Verify**

Refresh. Expected:
- Hover a non-hub node → that node + its connections stay bright, others dim to ~18%; tooltip appears next to cursor showing name, type, meta.
- Click a role node (e.g. Parker AI green sphere) → camera flies in (~700ms), the matching Active Agent card scrolls into view with a 2s blue highlight ring.
- Click a project node → matching service tile flashes.
- Click `↑ MAP` pill on any agent card → scrolls back to System Map and flies to that node.

- [ ] **Step 3: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add System Map interactions: hover, click-fly, card flash"
```

---

## Task 13: System Map — filter chips, search with type-ahead, zoom buttons

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add filter + search + zoom logic**

Append to script:

```js
function wireSystemMapControls() {
  if (!SM.renderer) return;

  // Filter chips
  document.querySelectorAll('.sm-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      SM.filters[f] = !SM.filters[f];
      chip.classList.toggle('on');
      chip.classList.toggle('off');
      applyFilters();
    });
  });

  // Search
  const search = document.getElementById('sm-search');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    if (!q) { setSearchHighlight(null); return; }
    if (q === 'matrix' || q === 'konami') return; // handled on Enter
    const match = SM.nodes.find(n => n.name && n.name.toLowerCase().includes(q));
    setSearchHighlight(match || null);
  });
  search.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = search.value.trim().toLowerCase();
      if (q === 'matrix' || q === 'konami') { triggerMatrix(); search.value = ''; return; }
      if (q === 'help') { alert('Commands: help · reset · matrix · konami'); return; }
      if (q === 'reset') { setSearchHighlight(null); search.value = ''; return; }
      const match = SM.nodes.find(n => n.name && n.name.toLowerCase().includes(q));
      if (match) { flyTo(match); flashCardFor(match); }
      search.blur();
    }
    if (e.key === 'Escape') { search.value = ''; setSearchHighlight(null); search.blur(); }
  });

  // Global `/` to focus
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      search.focus();
    }
  });

  // Zoom buttons (dolly camera in/out)
  document.getElementById('sm-zoom-in').addEventListener('click', () => dolly(0.85));
  document.getElementById('sm-zoom-out').addEventListener('click', () => dolly(1.18));
}

function applyFilters() {
  SM.nodes.forEach(n => {
    if (n.type === 'hub') return;
    const visible = SM.filters[n.type];
    n.mesh.visible = visible;
  });
  SM.edges.forEach(e => {
    e.line.visible = e.a.mesh.visible && e.b.mesh.visible;
  });
}

function setSearchHighlight(node) {
  if (!node) { SM.nodes.forEach(n => { n.mesh.material.opacity = 1; n.mesh.material.transparent = false; }); SM.edges.forEach(e => { e.line.material.opacity = e.baseOpacity; }); return; }
  SM.nodes.forEach(n => {
    const isHi = n === node;
    n.mesh.material.opacity = isHi ? 1 : 0.2;
    n.mesh.material.transparent = !isHi;
  });
  SM.edges.forEach(e => { e.line.material.opacity = (e.a === node || e.b === node) ? 0.7 : 0.05; });
}

function dolly(factor) {
  if (!SM.camera) return;
  const dir = SM.camera.position.clone().normalize();
  const dist = SM.camera.position.length() * factor;
  const clamped = Math.max(3, Math.min(12, dist));
  SM.camera.position.copy(dir.multiplyScalar(clamped));
}
```

Update the init block:

```js
window.addEventListener('load', () => setTimeout(() => {
  buildSystemMap();
  wireSystemMapInteractions();
  wireSystemMapControls();
  wireJumpPills();
}, 0));
```

- [ ] **Step 2: Verify**

Refresh. Expected:
- Click `● PROJECTS` chip → all blue nodes + their edges fade out. Click again → reappear.
- Type "park" in the search → Parker AI node lights up, rest dims. Press Enter → flies to Parker AI + card flashes.
- Press `/` anywhere → search input focuses.
- Type "help" → alert with commands list.
- Click `+` / `−` zoom buttons → camera moves closer/further.

- [ ] **Step 3: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add System Map filters, search, and zoom controls"
```

---

## Task 14: Live terminal animation + KPI count-up

**Files:**
- Modify: `dalin.dev/index.html`

- [ ] **Step 1: Add terminal log + count-up logic**

Append to script:

```js
const TERM_LINES = [
  ['12:04:01', 'agent.parker',    'ok',  '· batch 482 · 12.4M embeddings'],
  ['12:04:03', 'finetune.v17',    'lora','· step 1240/2000'],
  ['12:04:05', 'scraper.adset',   'ok',  '· 87 sources synced'],
  ['12:04:07', 'dashboard.ttq',   '',    '· 38ms p50 · 124ms p95'],
  ['12:04:09', '',                'warn','[!] rate-limit · backoff 2s · retry · ok'],
  ['12:04:11', 'f1.score',        '',    '= 0.794 ↑'],
  ['12:04:13', 'postgres.rollup', '',    '· daily · 18.2M rows'],
  ['12:04:15', 'ingest.media',    '',    '· 2.1TB queued'],
];

function startTerminalLoop() {
  const stream = document.getElementById('term-stream');
  let i = 0;
  const MAX_LINES = 8;

  function addLine() {
    const [ts, key, status, tail] = TERM_LINES[i % TERM_LINES.length];
    i++;
    const line = document.createElement('div');
    line.className = 'line';
    const statusHtml = status === 'ok' ? '<span class="ok">ok</span>' :
                       status === 'warn' ? '<span class="warn">' + tail.split(']')[0] + ']</span>' :
                       status === 'lora' ? '<span class="key">LoRA</span>' : '';
    const tailHtml = status === 'warn' ? tail.split(']').slice(1).join(']') : tail;
    line.innerHTML = `<span class="dim">[${ts}]</span> ${key ? '<span class="key">' + key + '</span> ' : ''}${statusHtml} ${tailHtml}`;
    stream.appendChild(line);
    requestAnimationFrame(() => line.classList.add('show'));

    // Trim
    while (stream.children.length > MAX_LINES) stream.removeChild(stream.firstChild);
  }

  addLine();
  setInterval(addLine, 1800);
}

function startCountUps() {
  const els = document.querySelectorAll('.kpi .value[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      const start = performance.now(), dur = 900;
      function tick() {
        const t = Math.min((performance.now() - start) / dur, 1);
        const k = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const v = Math.round(target * k);
        el.textContent = pre + v + suf;
        if (t < 1) requestAnimationFrame(tick);
      }
      el.textContent = pre + '0' + suf;
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}
```

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  renderAgents();
  renderServices();
  renderCapabilities();
  startTerminalLoop();
  startCountUps();
  window.addEventListener('load', () => setTimeout(() => {
    buildSystemMap();
    wireSystemMapInteractions();
    wireSystemMapControls();
    wireJumpPills();
  }, 0));
});
```

- [ ] **Step 2: Verify**

Refresh. Expected:
- Terminal now streams log lines every 1.8s, max 8 visible at once, oldest gets pushed off.
- Scroll up and back down — KPI numbers count up from 0 to target each time they re-enter the viewport (only the first time per element due to `unobserve`).

- [ ] **Step 3: Commit**

```bash
git -C dalin.dev add index.html && \
git -C dalin.dev commit -m "Add live terminal stream and KPI count-up on viewport entry"
```

---

## Task 15: Boot sequence, easter eggs, polish, README — ship it

**Files:**
- Modify: `dalin.dev/index.html`
- Modify: `dalin.dev/README.md`

- [ ] **Step 1: Add boot + easter egg CSS**

Append to `<style>`:

```css
.boot {
  position: fixed; inset: 0; z-index: 1000;
  background: var(--bg-deep);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono);
  transition: opacity 300ms ease-out;
}
.boot.hide { opacity: 0; pointer-events: none; }
.boot .term-boot {
  width: min(560px, 90vw);
  padding: 24px;
  color: var(--accent-live);
  font-size: 12px; line-height: 1.7;
}
.boot .term-boot .line { opacity: 0; }
.boot .term-boot .line.show { opacity: 1; transition: opacity 120ms ease-out; }
.boot .term-boot .caret::after { content: '▍'; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.matrix-rain {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0,0,0,0.6);
  pointer-events: none;
  font-family: var(--mono); color: #4ade80;
  overflow: hidden;
  transition: opacity 400ms ease-out;
}
.matrix-rain.hide { opacity: 0; }
.matrix-rain .col {
  position: absolute; top: -10%;
  font-size: 14px;
  white-space: pre;
  animation: rain linear forwards;
  text-shadow: 0 0 8px #4ade80;
}
@keyframes rain { to { top: 110%; } }
.matrix-rain .tag {
  position: absolute; bottom: 24px; right: 24px;
  color: var(--accent-live); font-size: 10px; letter-spacing: 0.18em;
  text-shadow: 0 0 8px #4ade80;
}
```

- [ ] **Step 2: Add boot markup at top of `<body>`**

Just after `<body>`:

```html
<div class="boot" id="boot" aria-hidden="true">
  <div class="term-boot">
    <div class="line">&gt; INITIALIZING DALIN.DEV v2026.1</div>
    <div class="line">&gt; LOADING AGENTS [████████████░░░░] 7/7</div>
    <div class="line">&gt; CONNECTING TO SERVICES [████████████████] 6/6</div>
    <div class="line">&gt; SYNCING SKILL MATRIX  ............. OK</div>
    <div class="line caret">&gt; READY </div>
  </div>
</div>
```

- [ ] **Step 3: Add boot + easter-egg JS**

Append to script:

```js
function runBoot() {
  const boot = document.getElementById('boot');
  const url = new URL(window.location);
  const force = url.searchParams.get('boot') === '1';
  const seen = localStorage.getItem('dalindev_booted');
  if (seen && !force) { boot.remove(); return; }

  const lines = boot.querySelectorAll('.line');
  lines.forEach((line, i) => setTimeout(() => line.classList.add('show'), 200 + i * 280));
  setTimeout(() => {
    boot.classList.add('hide');
    localStorage.setItem('dalindev_booted', '1');
    setTimeout(() => boot.remove(), 320);
  }, 200 + lines.length * 280 + 400);
}

function triggerMatrix() {
  const layer = document.createElement('div');
  layer.className = 'matrix-rain';
  const cols = Math.floor(window.innerWidth / 14);
  const chars = 'アァカサタナハマヤラワABCDEF0123456789@#$%^&*<>{}[]/';
  for (let i = 0; i < cols; i++) {
    const col = document.createElement('div');
    col.className = 'col';
    col.style.left = (i * 14) + 'px';
    col.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
    col.style.animationDelay = (Math.random() * 0.8) + 's';
    let text = '';
    for (let j = 0; j < 30; j++) text += chars[Math.floor(Math.random() * chars.length)] + '\n';
    col.textContent = text;
    layer.appendChild(col);
  }
  const tag = document.createElement('div');
  tag.className = 'tag'; tag.textContent = '// LEGACY MODE · 2024';
  layer.appendChild(tag);
  document.body.appendChild(layer);
  setTimeout(() => layer.classList.add('hide'), 3600);
  setTimeout(() => layer.remove(), 4100);
}

// Konami code
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (k === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) { triggerMatrix(); konamiIdx = 0; }
  } else konamiIdx = 0;
});

// Status dot nudges
const STATUS_CYCLE = ['ONLINE · OTTAWA', 'BUILDING · OTTAWA', 'SHIPPING · OTTAWA', 'COFFEE · OTTAWA', 'ONLINE · OTTAWA'];
let dotClicks = 0; let dotClickTimer = null;
function wireStatusDot() {
  const dot = document.getElementById('status-dot');
  if (!dot) return;
  dot.addEventListener('click', () => {
    dotClicks++;
    clearTimeout(dotClickTimer);
    dotClickTimer = setTimeout(() => dotClicks = 0, 3000);
    if (dotClicks >= 5) {
      const txt = dot.parentElement;
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(txt.lastChild.textContent.trim()) + 1) % STATUS_CYCLE.length];
      txt.lastChild.textContent = next;
      dotClicks = 0;
    }
  });
}

// Version cycler (top bar + footer)
function wireVersionCycler() {
  const cycle = () => {
    const versions = [
      { label: '2024', file: 'index_2024.html' },
      { label: '2023', file: 'index_2023.html' },
      { label: '2017', file: 'index_2017.html' },
    ];
    let idx = 0;
    const popup = document.createElement('div');
    popup.style.cssText = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); z-index:200; background:var(--bg); border:1px solid var(--accent-link); border-radius:6px; padding:10px 14px; font-size:11px; color:var(--ink); box-shadow:0 8px 30px rgba(0,0,0,0.6);';
    popup.innerHTML = `<span style="color:var(--accent-link); font-weight:700;">PREVIOUS VERSION</span> <span id="v-label">·</span> <a id="v-link" target="_blank" rel="noopener" style="color:var(--accent-live); margin-left:8px;">→ open</a> <span style="margin-left:12px; color:var(--ink-faint); cursor:pointer;" id="v-close">[esc]</span>`;
    document.body.appendChild(popup);
    const lbl = popup.querySelector('#v-label');
    const lnk = popup.querySelector('#v-link');
    const tick = () => {
      const v = versions[idx % versions.length];
      lbl.textContent = '· ' + v.label;
      lnk.href = v.file;
      idx++;
    };
    tick();
    const intv = setInterval(tick, 3500);
    const close = () => { clearInterval(intv); popup.remove(); document.removeEventListener('keydown', onEsc); };
    popup.querySelector('#v-close').addEventListener('click', close);
    function onEsc(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onEsc);
  };
  document.getElementById('version-top')?.addEventListener('click', cycle);
  document.getElementById('version-bottom')?.addEventListener('click', cycle);
}
```

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  runBoot();
  renderAgents();
  renderServices();
  renderCapabilities();
  startTerminalLoop();
  startCountUps();
  wireStatusDot();
  wireVersionCycler();
  window.addEventListener('load', () => setTimeout(() => {
    buildSystemMap();
    wireSystemMapInteractions();
    wireSystemMapControls();
    wireJumpPills();
  }, 0));
});
```

- [ ] **Step 4: Update README**

Add to the top of `dalin.dev/README.md`:

```markdown
## Portfolio site 2026

Mission Control for an AI developer. Repositioned around the Parker AI / AI agent platform work — billion-scale pipelines, LoRA fine-tuning, Gemini Batch API. Centerpiece is a Three.js System Map that connects roles ↔ projects ↔ skills as an interactive 3D graph.

Built with Claude Opus 4.7. Single static `index.html`, served by GitHub Pages.

#### Easter eggs
- Click `v2026.1` (top bar or footer) — cycles previous versions.
- Type `matrix` in the System Map search, or press the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`).
- Click the green `● ONLINE` dot 5× — status cycles through ONLINE / BUILDING / SHIPPING / COFFEE.
- Append `?boot=1` to the URL — re-runs the boot sequence.

---
```

(Keep the rest of the existing README.)

- [ ] **Step 5: Verify everything end-to-end**

Clear `localStorage` (DevTools → Application → Local Storage → delete `dalindev_booted`). Refresh.
- Boot sequence plays (~2s), then fades out.
- Top bar, hero with streaming terminal, KPIs (count up), System Map (Three.js graph drags + nodes hover + click flies + cards flash), Agents (live expanded, archived collapsed), Services, Capabilities, Footer — all render.
- Test version cycler (click v2026.1).
- Test matrix rain (type `matrix` in search OR Konami code).
- Test status nudges (click dot 5×).
- Test reduced motion: System Preferences → Accessibility → Reduce Motion → ON → refresh. The pulses, count-up, auto-rotate should be gone; layout intact.

- [ ] **Step 6: Commit and we're shipped**

```bash
git -C dalin.dev add index.html README.md && \
git -C dalin.dev commit -m "Add boot sequence, easter eggs, README update — 2026 site ready"
```

---

## Self-review summary

- **Spec coverage:** all 12 sections of the spec map to tasks 1–15. Boot + easter eggs covered in Task 15. SEO/meta in Task 1. Browser support and reduced-motion in Task 2 + final verify.
- **No placeholders:** every code block is final source ready to paste.
- **Type consistency:** function and class names align across tasks (`SM`, `renderAgents`, `flyTo`, `flashCardFor`, `data-id` attributes).
- **Single-file constraint:** every edit is in `dalin.dev/index.html` (plus the README touch in Task 15).
