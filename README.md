## Portfolio site 2026.2

Refreshed from the Nov 2026 resume (Senior AI Developer, Agent Systems) plus notes on the agent team (Grok bots + Claude Code), Agent Island (Status Island at work), Ship Loops, the support loop, and the incident replay eval. Still one static `index.html` with no build step. Three.js r147 is lazy-loaded from jsDelivr when the office scrolls near; everything else is canvas, SVG, and plain JS. Works at phone width.

### What's on the page

- **Intro + 01 · Ask the model** (the first screen): a tiny model over the resume. A chat box sits at the top of the panel (it glows until someone types), and the answer card sits right under it, next to the network picture, so the answer lands on the first screen on laptops and phones; the tokens, embeddings and retrieval panels run in a strip below. Answers can carry links written as `[text](url)` in `KB`; they stream token by token like the rest, and external ones open in a new tab. Type `AI`, `Grok bots`, `Agent Island`, `Postgres`… and watch it tokenize (BPE-style splits, token ids, attention arcs with a ⟨bos⟩ sink), embed, retrieve the matching chunks, prefill, then decode token by token with a live top-5 softmax. Answers come only from the `KB` object (no API calls). Multi-word keys (`'agent island'`) match as phrases and outweigh single words. It auto-demos once with `AI`.
- **Open and personal questions**: answers in my own words for where AI is going (AGI around 2027), who inspires me (SpaceX, Tesla, first principles), whether AI will replace developers, what I do for fun (games, fishing, videos, building with my kids), and what I tinker with (reverse-engineering game mechanics, local models, unreleased side projects). Off-topic questions ("do you like pizza") still get an honest "I don't know".
- **Router network (real)**: a 68K-parameter neural network (hashed words, word pairs and letter triples → 64 ReLU units → softmax over the 44 answers), trained in plain JavaScript in the visitor's browser when the page loads: 8 passes over 921 example questions and keywords, about 70ms on a laptop, run in ~12ms slices (each pass is split into chunks of 64 examples) so scrolling never stutters. The canvas draws it from its live weights, and the EMBEDDINGS panel shows each word's learned vector. It answers only when keywords and similar questions find nothing solid, and only if it knows one of the words; the picture shows its guess either way, and the stats line says what picked the answer. 👍/👎 run one real gradient step (learning rate 0.04, gradient clipped), saved in `localStorage` (`dalin-lm-feedback-v1`, last 100) and replayed after training on the next visit. On 40 new phrasings, measured before they were added as examples, keywords + similar questions got 27/40 and the network alone 20–26/40, which is why it answers last.
- **Follow-ups**: every answer ends with "Ask next" chips (`KB_NEXT`), "tell me more" gives a deeper second answer where one exists (`KB_MORE`), and one-letter typos still route ("agnets" → agents).
- **Similar questions**: each answer has example questions in `KB_QUESTIONS` (recruiter, HR, and founder questions included). A visitor's question is normalised (current→now, job→role, what's→what is, plurals) and compared to every example by idf-weighted cosine similarity; the closest one wins when it's similar enough and shows up in the RETRIEVE panel as "similar question". To cover a new phrasing, add one line to the right list. Salary, visa, notice period, relocation and similar questions get an honest "let's talk directly" answer.
- **How this works**: collapsed into one bar by default. It stays hidden until someone asks how the model works, whether it's a real LLM, or what it was trained on (answers with `fx: 'how'`, which open it without moving the page), or clicks "How it works ↓" (which scrolls to it). Inside are six cards, one per stage, each saying what a real LLM does and what this page does instead (embed and backprop are real, on the router network; the rest is simulated); the card for the running stage lights up.
- **02 · The agent office**: a procedural Three.js scene of my personal agent team (Grok bots + Claude Code, 14 desks), with no model files. Tickets flow inbox → Chief of Staff → Eng → QA → Security → Eng Manager; low-risk ones auto-ship, while prod deploys, prod DB writes, migrations, money and customer messages stop at the human gate. Second and third rows: Incident (wakes on a red Status Island tile), Data Healer, Evals, Research, Cost Scout, Billing Watch, Stack Scout, OSS, and local Claude Code. Drag (or swipe sideways) to rotate; click a desk for details.
- **03 · Knowledge map**: a radial "career clock". The inner ring shows roles as arcs by date (2015 → now) and the outer ring shows 57 skills in six domains (agent systems, models & training, data & infra, backend, frontend, product) by depth. Hover or tap to trace where a skill was used, with years, a line of evidence and projects. Search also takes vendor and older names through each skill's `aka` list (`openai` → LLM APIs, `php` → Early web stack, `context engineering` → Agent skills). It tours itself until touched. Chips in the Ask section jump straight into it.
- **04 · Experience** and **05 · Projects** come from the same data objects (project status: live, oss, proto, archived).
- **06 · Consoles** (last, labelled as a replay): the agent-team log, and a LoRA fine-tuning monitor shaped like a real run: 3 epochs × 750 steps, linear warmup then cosine learning rate peaking at 2e-4, eval every 250 steps keeping the best checkpoint, train loss stepping down at each epoch boundary, eval loss bottoming out in epoch 2, grad norm clipped at 1.0. The numbers are illustrative, not a real run.

To update content, edit `ROLES`, `SKILLS`, `PROJECTS`, `KB` (answers), or `OFFICE_AGENTS` in the data `<script>` near the top of `index.html`. Office desks take `always` (status text for desks that never idle) and `minor` (label hidden on phones until tapped).

### Sizing

The page scales like browser zoom. All CSS sizes are in `rem`, and the root size grows with the window: 16px up to 1440px wide, about 19px at 1920, capped at 22px. Text sizes also multiply by `--fz` (1.18 on desktop, 1.08 on phones). The content column is `--maxw: 80rem` (1280px at the base size, about 1520px at 1920) and widens to `90rem` from 2200px. Text drawn on canvas uses `uiPx()` so it scales the same way.

#### Easter eggs
- Click `v2026.2` (top bar or footer) to cycle previous versions, now including `index_2026.html` (v2026.1).
- Ask the model `matrix` or `42`, try a prompt injection on it, or press the Konami code.
- Click the `● ONLINE` dot 5×. Click the turtle in the office lounge.
- Append `?boot=1` to the URL to re-run the boot sequence.

---

## Portfolio site 2026.1

Mission Control for an AI developer. Built around the Parker AI / AI agent platform work — billion-scale pipelines, LoRA fine-tunes, Gemini Batch API, one of the best Meta-ad dashboards on the market.

https://github.com/user-attachments/assets/65ab1a49-e1a5-4be4-81cb-3916b7e0838d

### What's on the page

- **System Map** — Three.js 3D graph of roles ↔ projects ↔ skills. ~55 tech logos in gold for things actually shipped, 28 light-gray "exploratory" techs in an outer orbit so the network feels lived-in. Hover any role to light up its connected projects/skills. Drag to rotate.
- **Office Floor** — Marvis-inspired virtual office with 8 anthropomorphic agents at their desks (5 busy, 2 idle, 1 offline). Each running its own terminal screen — orchestrate / fine-tune / classify / analyze / web-search / phone / sleep / error. Idle agents have a slow head-sway "breathing" animation.
- **Live terminals** — `dalin@parker-ai` streaming console (real wall-clock time, 2 lines/sec) + a LoRA fine-tune training monitor (GPU / VRAM / loss / grad). Fixed height so they never push the page on hydrate.
- **Active Agents** — 7 deployed roles + 22 projects (auto-collapsed past the 9 most recent to keep the grid lean).
- **System Capabilities** — heat-mapped skill matrix across AI/LLM, Frontend, Backend, Data, Cloud, Frameworks.

Built with Claude Opus 4.7. Single static `index.html`, served by GitHub Pages.

#### Easter eggs
- Click `v2026.1` (top bar or footer) — cycles previous versions.
- Type `matrix` into the System Map search, or press the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`).
- Click the green `● ONLINE` dot 5× — status cycles through `ONLINE / BUILDING / SHIPPING / COFFEE`.
- Append `?boot=1` to the URL — re-runs the boot sequence.

### LINK: https://dalin.dev

---

## Portfolio site 2024

Thanks to Claude 3.5 Sonnet for a complete rewrite of the portfolio site.
And achieve 100% for both lighthouse scores for both mobile and desktop. (Well it is just a static html though LOL)

![Screenshot 2024-09-29 at 12 46 27 PM](https://github.com/user-attachments/assets/e9038fd1-990c-42d5-af5c-49158399e942)

![Screenshot 2024-09-29 at 12 44 22 PM](https://github.com/user-attachments/assets/4ff4eec7-dc07-4f42-b352-058429449010)


:sunglasses::sunglasses::sunglasses: <br>
:sunglasses::flushed::sunglasses: <br>
:sunglasses::sunglasses::sunglasses: <br>

---
#### 2024
* Claude 3.5 Sonnet for a complete rewrite of the portfolio site!
* 100% lighthouse scores (Well it is just a static html though LOL)

#### 2023
* rewrite with GPT4


#### May 4, 2022
* domain update: dalin.dev


#### Feb 25, 2022
* update, remove facebook link and add twitter link, new block #6

#### Nov 11, 2017
* redesign/update page 1
* style fixes, added particles-js, added btn to switch style (page 1)

#### Oct 22, 2017
* minor update

#### Oct 19 - Oct 20, 2017
* Page 3 update, Blockchain (SHA-256) style for working experience section

#### Oct 18, 2017
* few updates (Page 2)
* Latest Google Chrome is breaking my customized scroll bar =(, causing the drag not working...

#### Oct 12, 2017

* Add About Me terminal type style =D

