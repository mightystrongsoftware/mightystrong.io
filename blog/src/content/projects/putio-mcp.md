---
title: 'putio-mcp'
description: 'A personal MCP server that lets Claude Desktop manage a put.io account: watch and add transfers, browse folders, and organise files with previews, conflict checks, and per-item results.'
category: 'Developer Tool'
technologies: ['Python', 'MCP', 'FastMCP', 'put.io API', 'uv', 'pytest']
image: '/assets/img/putio-mcp-icon.png'
featured: true
status: 'in-progress'
startDate: 2026-10-26
github: 'https://github.com/devandanger/putio-mcp'
---

## What is putio-mcp?

[put.io](https://put.io) is a cloud download service: hand it a link or a magnet and it fetches the files into your account, where you can stream or download them later. I use it a lot, and the part I kept putting off was the tidying. Transfers land wherever the default folder points, names come in however the source named them, and after a few months the root folder is a mess.

putio-mcp is a small [Model Context Protocol](https://modelcontextprotocol.io) server that gives Claude Desktop a set of tools for the account. Instead of clicking through the web app, I can ask Claude to show me what is in a folder, make a new one, and move the right things into it. It runs locally on my Mac over stdio; there is no hosted service and nothing is published to a package index.

It started as a fork of put.io's own [MCP server](https://github.com/putdotio/putio-mcp-server), which covered transfers in about forty lines. I kept that, kept the MIT license, and built the file organisation on top.

## What Claude can do with it

**Transfers**

- List transfers with status, progress, and the folder they save into.
- Add a transfer from an HTTP link or magnet, optionally into a specific folder. The destination is checked before anything is queued.
- Cancel a transfer, keeping any files already downloaded.
- Get a browser link to a finished transfer's files.

**Files and folders**

- List a folder's contents page by page, with optional sorting.
- Look up one file or folder by id.
- Search the whole account by keyword.
- Create a folder, rename a file or folder, and move a batch of items into a folder.

Every tool works with put.io's integer ids and returns names and parent ids alongside them, so Claude can explain what it found or changed in plain words rather than making the user decode numbers.

## Making organisation predictable

Letting an assistant rearrange a few terabytes of files is only comfortable if the tools refuse to do anything surprising. Most of the work in this project went into that.

- **Validation before action.** Destination folders have to exist and actually be folders. Names cannot be empty, cannot contain path separators or control characters, and cannot be `.` or `..`.
- **No moving a folder into itself** or into one of its own descendants. The server walks the destination's ancestry and rejects any source that appears in it.
- **Conflicts are reported, not papered over.** Creating, renaming, or moving into a folder that already has an item with that name (ignoring case) fails with a `name_conflict` error that names the existing item.
- **Previews.** Create, rename, and move all accept `dry_run`, which runs every check and reports what would happen without touching the account. Claude can show the plan, get a yes, and then run it for real.
- **Per-item results for batch moves.** Each id in a move comes back as moved, skipped, or failed with a reason. One missing file does not abort the rest, and a partial failure is visible instead of hidden behind a single error.
- **No deletion.** The first version deliberately has no delete tool and no unattended, rule-based organisation. Those can come later once the basics have earned some trust.

## Credentials and errors

The put.io token is read from a gitignored `.env` file or the environment. It is never written to Git, included in a tool response, or logged, and any error text that could echo it is redacted before it leaves the server.

put.io's HTTP errors are translated into a short set of kinds Claude can act on: authentication, permission, not found, rate limited (with the retry hint when put.io sends one), server error, and network error. Diagnostics go to stderr so they never collide with the MCP protocol on stdout.

## How it's built

Python with the MCP SDK's FastMCP class and put.io's `putio-py` client, managed with uv. The code is split into a thin API client that handles pagination, error classification, and redaction; a service layer that owns validation, ancestry and conflict checks, previews, and batch outcomes; and the tool definitions themselves.

The service layer talks to a small protocol rather than the real client, so the test suite runs against an in-memory fake of the put.io API: pagination, destination validation, conflicting names, invalid moves, partial failures, and credential redaction are all covered without network access. A second set of tests drives the server through a real MCP client session to check tool discovery and input validation. Finally, a live smoke script creates a temporary folder in the real account, exercises every tool inside it, and deletes the folder again.

## Setup

The [README](https://github.com/devandanger/putio-mcp#quick-start) has a five-step quick start: install uv, clone, get a token from put.io's API page, put it in `.env`, run the smoke test, and add one entry to Claude Desktop's config.

## Status

The first version is done: Claude Desktop can browse a folder, create a subfolder, rename it, move selected files into it, and verify the result, and the live smoke test passes against my account. Next up are saved organisation rules and broader batch operations, once the basic tools have been in daily use for a while.
