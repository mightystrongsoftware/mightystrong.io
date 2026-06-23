---
title: 'Why I Built SceneForge'
description: 'Building Naprej taught me the coding was never the bottleneck. The marketing video was. So I built a tool an agent could drive.'
pubDate: 'Jun 23 2026'
draft: false
---

I built [Naprej](/projects/naprej/), a Slovenian language-learning app, and the whole experience taught me something I didn't want to learn: the coding was the easy part.

That's not bravado. It's just an honest accounting of where my time went. I have years of experience writing software, I can wield agentic coding tools well enough to move fast, and I knew enough about linguistics and the competitive landscape to make the product calls that mattered. None of that was the bottleneck. The bottleneck was everything *around* the product, and the marketing most of all.

## The Black Hole Was the Video

Ideation, I'm fine at. I can come up with the angle, the script, the thirty-second story you want to tell. Where I fell apart was the execution, and the worst offender by a mile was the marketing video.

I would open a timeline editor to cut a short promo and then simply... disappear. Nudging a clip four frames left. Re-timing a caption. Swapping a transition, hating it, swapping it back. Hours would go by and I'd surface with something marginally different from where I started and no clear sense of whether it was actually *better*. The obsession had nothing to do with whether Naprej was a good app. It was a tax I kept paying because the tool put a thousand tiny levers in front of me and dared me not to touch them.[^timeline]

At some point I caught myself and asked the obvious question. Why am I, the human, the one pulling these levers?

## Good Enough, Generated

I didn't need a *perfect* video. I needed a good-enough video that actually shipped. "Good enough, generated and repairable" beats "perfect but never finished" every single time, especially when the thing you're polishing is a promo and not the product.

So I went looking for something more *agentically aware*. A tool that could produce a decent result and, on its own, discover and pull the right levers. Not me massaging a timeline, but an agent reasoning about a video. I did some research, found [Remotion](https://www.remotion.dev) (which renders video from code instead of a timeline), and started building [SceneForge](/projects/sceneforge/) on top of it.

## One File an Agent Can Read

SceneForge is built around a single idea. The whole video is one file, `video.json`. That one decision is what lets an agent and a human share the same tool without either of them compromising.

For the agent, the tool is self-describing. It can bootstrap everything from two commands. `sceneforge capabilities --json` tells it the commands, the flags, and which operations are safe to run unattended. `sceneforge schema --json` hands it the entire data contract. From there it can generate a `video.json` and run `validate`. Because validation errors come back with the exact JSON path that failed, it can fix the precise field that's wrong and retry, instead of guessing.[^json]

For me, the human, it's just a readable file and three commands: `validate`, `preview`, `render`. The schema deliberately boxes me in. Enums, percentages, colors, local file paths, no arbitrary CSS. So I can't wander off and build an unrenderable mess at 1am. Remotion does the hard rendering work I never wanted to understand in the first place. The constraint that would normally annoy an engineer is exactly the thing that stops me from falling back into the timeline-tweaking trance.

SceneForge doesn't make prettier videos than a real editor. It isn't trying to. What it does is let an agent safely generate and repair the video while I can still read it, tweak a line, preview it, and ship, without ever opening a timeline again.

That's the trade I wanted. I gave up the thousand levers I kept compulsively pulling, and in exchange I got videos that actually get made. For a marketing asset, I'll take that trade all day.

If you want the full breakdown of how it works, the [SceneForge project page](/projects/sceneforge/) has it, and the code is [on GitHub](https://github.com/devandanger/sceneforge).

[^timeline]: I want to be fair to timeline editors. They're powerful, and for someone whose craft *is* video, those levers are the job. The problem was never the tool. The problem was me using a precision instrument for a job where precision wasn't the constraint. Shipping was. A scalpel is a bad choice when what you needed was to stop bleeding time.

[^json]: This discoverability isn't bolted on after the fact, it's enforced. The Zod schema is the single source of truth, every field carries a `.describe()`, and CI fails the build if any description is missing. New features have to land in the schema first, and the JSON Schema is generated rather than hand-written. The rule I hold myself to is blunt. If an agent can't discover a feature from `schema --json` or `capabilities --json`, it isn't a real feature yet. That's what keeps the tool from quietly drifting away from the one premise it's built on.
