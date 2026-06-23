---
title: "Complexity Got Cheap"
description: "For years we engineered around the fear of complexity. Agentic engineering changes the math, and it's time to stop flinching."
pubDate: 'Jun 13 2026'
draft: false
---

For most of my career, the highest virtue in software engineering was *avoiding complexity*. Not solving it. Avoiding it. We learned to flinch.

Every senior engineer carried the same scar tissue. The clever abstraction that nobody could maintain. The microservice split that turned one deploy into seven. The config system so flexible it could do anything except be understood. We told ourselves stories about these disasters and turned them into rules: keep it simple, do the dumb thing, you aren't gonna need it.

And those rules were *right*. They were right because complexity had a brutal, ongoing cost, and that cost was paid in the one currency we never had enough of: human attention.

## Why We Feared It

Complexity was never expensive to *create*. Anyone can write a tangled system. Complexity was expensive to *carry*.

A complicated codebase taxed you forever. Every new feature meant re-loading the whole twisted mess into your head. Onboarding took months. The person who understood the gnarly part went on vacation and shipping slowed to a crawl. Refactoring was risky because no human could hold all the consequences at once.

So we optimized for the human bottleneck. We kept things small enough to fit in a single mind. "Simple" really meant "comprehensible by one tired person at 4pm." Every architectural principle we revered (small functions, low coupling, clear boundaries) was, underneath, a coping strategy for the fact that human working memory is tiny and expensive.

Complexity wasn't the enemy. The cost of *holding* complexity was the enemy. We just never separated the two, because we never had a reason to.

## The Math Changed

Here's what agentic engineering quietly did: it dropped the cost of *carrying* complexity by something like an order of magnitude.

An agent can hold the whole twisted mess in context. It can trace the seven-service call path without getting bored or scared. It can read the 800-line function, understand the config system nobody documented, and tell you what happens if you change line 412. The thing that used to require a tired human at 4pm now requires a prompt and ninety seconds.

This doesn't make complexity *free*. Runtime cost is still real. Coupling still causes cascading failures. A bad abstraction is still a bad abstraction. But the *comprehension tax*, the single largest line item in the cost of complexity for forty years, just got marked down hard.

And when a price drops by 10x, you don't keep buying the same amount. You change your behavior.

## What I've Stopped Being Afraid Of

I've noticed my own instincts shifting, and it's uncomfortable, because they're instincts I was *proud* of.

**Reading unfamiliar code.** I used to budget hours, sometimes days, to understand a system before touching it. Now I let an agent map it first. The dread of the unknown codebase, the thing that made me avoid whole categories of work, is mostly gone.

**Large refactors.** The old rule was: never refactor and ship at the same time, and never refactor anything you can't fully reason about. But "can a human fully reason about it" was the wrong constraint. A sweeping rename across 200 files used to be a weekend of fear. Now it's a reviewable diff.

**Generated abstraction.** I used to resist building the flexible thing because *I'd* have to maintain the flexible thing. When the marginal cost of maintaining a more general solution drops, the calculus of "do the dumb thing" weakens. Not vanishes. Weakens.

**Throwing work away.** This is the big one. Complexity was scary partly because it was *sticky*. You couldn't afford to rebuild, so you lived with your mistakes. When regenerating a subsystem costs an afternoon instead of a quarter, complexity stops being a life sentence. You can move on.

## The Trap

Now the necessary caution, because "complexity got cheap" is exactly the kind of sentence that ends careers when taken too far.

The comprehension tax dropped for *agents*. It did not drop for the humans who still have to make the final call, sign off on the deploy, and answer the page at 3am. If you let complexity grow to the limit of what an agent can hold, you've built a system that *no human* can independently verify. That's not leverage. That's a hostage situation with extra steps.

The new discipline isn't "avoid complexity." It's **"keep complexity legible at the seams."** Let the inside of a component be as intricate as the agent can manage, but keep the boundaries, the contracts, and the failure modes simple enough that a person can still reason about the system as a whole. Push the complexity *down and in*, behind interfaces a human can audit.

The fear was a good servant and a bad master. It saved us from a thousand disasters. But it was always a proxy for a specific, measurable cost, and that cost just changed. Clinging to the fear after the math changed isn't wisdom. It's superstition.

## Moving On

The hardest part of this transition isn't technical. It's emotional. We earned our caution. We have the scars. Letting go of "complexity is the enemy" feels like letting go of everything that made us good at the job.

But that instinct was never the point. The point was always to ship working systems that people can trust and maintain. For forty years, ruthless simplicity was the best available strategy to get there. It was a means, and we mistook it for the end.

The end hasn't changed. The cheapest path to it has. And being afraid of the cost of complexity, when the cost just fell through the floor, is the one luxury we can no longer afford.

Stop flinching. Do the math again.
