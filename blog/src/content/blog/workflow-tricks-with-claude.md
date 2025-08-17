---
title: 'Workflow Tricks with Claude + Github'
description: 'Practical tips and tricks for maximizing productivity when working with Claude AI in your development workflow'
pubDate: 2025-07-29
heroImage: '../../assets/blog/claude-code-github.png'
---

## Two Modes of Thinking in Development

Before you get to the point of iterating with AI and GitHub, it’s worth going through a **deliberate design phase**: define components, tooling, dev stack, CI/CD, and maybe even sketch a monitoring strategy or roadmap. That foundation makes iteration smoother.  

But this post is less about that planning phase, and more about the next one:  
**“I already have an app with the basics in place, now I need to iterate toward the real value proposition or market fit.”**

When I’m in this stage, I notice two distinct modes of thinking:

- **Big-picture, continuous deep thinking** – Where is this app headed? How does today’s feature connect to tomorrow’s roadmap? What shifts as I learn more about my users?  
- **In-the-weeds execution** – Writing, debugging, QA’ing specific features and tests to make progress now.  

Traditionally, these modes felt separate. Strategy was a different mindset than debugging a test suite.  

### How Agentic Coding Blurs the Modes

With agentic coding tools like Claude Code, these two modes collapse closer together. That’s exciting—it feels like you can design and implement almost in the same breath. But the flip side is **over-ambition**: sometimes I push too far too quickly and have to backtrack.  

Claude, for example, can stumble in these scenarios:  
- Generating **too much code** that needs cleanup.  
- **Hitting context window limits** on premium models.  
- Compressing early when I’m not ready, which derails the bigger thought process.  

### My Workarounds

What helps is **offloading small issues without breaking flow**:

- If I find a small bug or gap that doesn’t impact the broader feature I’m building, I log it as a **GitHub issue** immediately. That way, I don’t lose momentum.  
- Even better, I sometimes spin up a **secondary Claude session** just for that issue, keeping my main session focused on the bigger task.  
- This keeps the deep context intact while still capturing the “little stuff” that can bog me down.  