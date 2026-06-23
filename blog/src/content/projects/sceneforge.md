---
title: 'SceneForge'
description: 'A local-first CLI for building repeatable, branded short-form marketing videos from a single JSON file — designed so agents can generate and repair videos while humans can still read, tweak, and render them.'
category: 'Developer Tool'
technologies: ['TypeScript', 'Node.js', 'Remotion', 'Zod', 'CLI', 'ElevenLabs']
featured: true
status: 'in-progress'
startDate: 2026-05-15
github: 'https://github.com/devandanger/sceneforge'
---

## What is SceneForge?

SceneForge is a local-first, JSON-driven video builder for repeatable branded short-form marketing videos. You describe a video in a single readable file — `video.json` — and SceneForge handles the rendering with [Remotion](https://www.remotion.dev), so you never have to learn a timeline editor or understand video internals.

```sh
npm install -g sceneforge          # or: npx sceneforge <command>
sceneforge validate ./video.json
sceneforge preview ./video.json
sceneforge render ./video.json out.mp4
```

The whole tool is organized around one contract: `video.json`. That single decision is what makes SceneForge usable by both agents and humans without compromise.

## Built for agents

SceneForge is designed so an agent can pick it up cold — no static docs required — and safely generate or repair a video:

- **Self-describing.** A workflow can bootstrap the entire tool from two commands: `sceneforge capabilities --json` reports every command, flag, env var, and whether it's agent-safe; `sceneforge schema --json` returns the full `video.json` data contract.
- **Documented at the field level.** Every schema field carries a Zod `.describe()`, and CI fails if a description is missing — so `schema --json` is always complete.
- **Machine-readable output.** `validate`, `render`, and `tts` all accept `--json`, emitting a single clean object to stdout while human logs and Remotion's render noise go to stderr.
- **Errors agents can act on.** Validation failures include the JSON path that failed, so a generating agent can correct the exact field and retry.
- **Source-control friendly.** Assets are local and relative to `video.json`, so generated projects commit cleanly.

## Built for humans, too

- You edit a readable JSON file — not a binary project or a timeline.
- You run simple commands: `validate`, `preview`, `render`.
- The schema keeps options constrained: enums, percentages, colors, and local paths instead of arbitrary CSS, so it's hard to make an unrenderable mess.
- Examples cover common patterns: no-AI videos, product launches, overlays, captions, and themes — each one doubles as a smoke test.
- Remotion does the hard rendering work behind the scenes.

The core idea: **agents can safely generate and repair `video.json`, while humans can still read, tweak, preview, and render it** — neither side has to learn the other's tooling.

## How it stays honest

Ongoing development is kept disciplined by treating the schema as the product contract. `packages/schema/src/index.ts` is the single source of truth. New capabilities go into Zod first, with a description on every field; JSON Schema is generated, not hand-written; and `capabilities --json` is updated whenever commands, flags, or env vars change.

The maintenance rule that prevents drift: **if an agent can't discover it from `schema --json` or `capabilities --json`, it isn't a real supported feature yet.**

## Optional voiceover

Voiceover generation uses ElevenLabs (`ELEVENLABS_API_KEY`, `ELEVENLABS_DEFAULT_VOICE_ID`), with generated audio cached locally. For headless or credential-free renders, `SCENEFORGE_SKIP_TTS=1` lets you render without TTS.

## Why I built it

SceneForge came out of building [Naprej](/projects/naprej/). The coding was never the hard part — the hard part was producing the marketing content around the product. I wrote about that realization, and why I went looking for something I could drive agentically, in [a blog post](/blog/why-i-built-sceneforge/).

---

*SceneForge is open source under the MIT License. Note: Remotion, used for rendering, is source-available under its own license and may require a paid Remotion Company License for larger companies.*
