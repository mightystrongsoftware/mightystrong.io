---
title: 'Workflow Tricks with Claude + Github'
description: 'Practical tips and tricks for maximizing productivity when working with Claude AI in your development workflow'
pubDate: 2025-07-29
heroImage: '../../assets/blog/claude-code-github.png'
---

Working with Claude AI can dramatically improve your development workflow when you know the right tricks. Here are some practical techniques I've discovered for getting the most out of AI-assisted coding.

## Start with Context

Before diving into specific requests, give Claude the big picture. Share your project structure, the technologies you're using, and what you're trying to accomplish. This upfront context leads to much better suggestions and fewer back-and-forth clarifications.

## Break Down Complex Tasks

Instead of asking Claude to "build a complete authentication system," break it into smaller, focused requests:

- First, ask for the database schema design
- Then request the API endpoints
- Finally, tackle the frontend components

This approach gives you more control and better results at each step.

## Use the Todo Feature

Claude Code's todo functionality is incredibly powerful for tracking multi-step tasks. When you give Claude a complex request, it will often create a todo list to track progress. This keeps everything organized and ensures nothing gets missed.

## Leverage Code References

When discussing specific functions or files, use the `file_path:line_number` format. This helps Claude understand exactly what you're referring to and provides clickable links for easy navigation.

## Iterative Refinement

Don't expect perfection on the first try. Use Claude's ability to iterate and refine:

1. Start with a basic implementation
2. Ask for specific improvements
3. Request optimizations or additional features
4. Test and ask for bug fixes as needed

## Ask for Explanations

When Claude writes code you don't fully understand, ask for explanations. This helps you learn and makes you more effective at directing future changes.

## Use Specific Examples

Instead of saying "make it better," provide specific examples of what you want. Show Claude the current output and describe exactly how you want it to change.

## Combine Tools Effectively

Claude Code has access to many tools. Let it use them in combination - searching the codebase, reading files, making edits, and running tests all in sequence to accomplish complex tasks.

## Review and Test

Always review Claude's suggestions before implementing them. While Claude is incredibly capable, it's still important to understand and verify the code it generates, especially for critical functionality.

## Keep Sessions Focused

For best results, keep your Claude sessions focused on related tasks. If you're working on authentication, stick with that theme rather than jumping between unrelated features.

These workflow patterns have made my development process much more efficient and enjoyable. The key is treating Claude as a highly capable pair programming partner rather than just a code generator.