---
title: 'Cuttle'
description: 'A desktop editor for ink, the interactive fiction scripting language from inkle. Write, play, map, and debug a branching story from a folder of plain .ink files without leaving the app.'
category: 'Desktop App'
technologies: ['TypeScript', 'Electron', 'React', 'Monaco', 'inkjs', 'React Flow', 'Vite']
image: '/assets/img/cuttle-icon.png'
featured: true
status: 'in-progress'
startDate: 2026-10-03
---

## What is Cuttle?

[ink](https://www.inklestudios.com/ink/) is the open-source scripting language inkle built for their own games (80 Days, Heaven's Vault, Overboard!) and then gave away. It's a lovely language for branching narrative, but the tooling around it is thin. Inky, the official editor, is a single-file editor with a preview pane and not much else. Once a story spreads across a dozen files with hundreds of knots, you're keeping the map in your head.

Cuttle is my attempt at a proper workspace for it. Point it at a folder of `.ink` files and it becomes an IDE: an editor that understands the language, a preview that plays the story as you type, a graph of how everything connects, and a debugger for when a divert goes somewhere you didn't expect.

## Write

- **Syntax highlighting** for knots, stitches, weave labels, diverts, choices, and logic.
- **Problems panel** that re-checks the story as you type, with one-click jump to the offending line. Diagnostics come from the real ink compiler, not a lookalike parser, so if Cuttle says it compiles, it compiles.
- **Explorer** listing every knot, stitch, label, variable, and `INCLUDE` in the project.
- **Go to definition, find references, and workspace symbol search** across files. Rename a knot and every divert to it updates, with a preview of each change before you commit.
- **Command palette** for everything, plus keyboard shortcuts for the things you do all day.

## Play

- **Preview panel** runs the story with the real ink runtime as you edit.
- **Pick a knot to start from**, cap the number of lines, and restart with one key.
- **Transcript** of every line and choice taken.

## See

- **Story graph** lays out knots and stitches as a map, with search, focus, and problem badges on nodes that have errors. Edges are styled by kind so a tunnel looks different from a thread or a plain divert.
- **Runtime overlay** paints the path your play-through took onto the graph.
- **Execution trace** lists each step so you can see exactly how the story got where it is.

## Debug

- **Pause points** on any knot or stitch, then step or resume.
- **State inspector** for variables, lists, read counts, and the current path.
- **Watch expressions** written in ink syntax, evaluated after every step.
- **Save and reload runtime state** so you can pick up a session later or reproduce a bug from the same spot.

## Works with what you already have

Cuttle reads and writes plain `.ink` files on disk and nothing else. Your project stays compatible with Inky, inklecate, and any game engine that runs ink. It only touches the folders and files you choose, and it watches them for outside edits so switching between Cuttle and another editor doesn't clobber anything.

The official "Writing with ink" guide is bundled and searchable offline, alongside Cuttle's own guides for editing, navigation, and debugging.

## How it's built

Cuttle is an Electron app with a React and TypeScript renderer. The editor is Monaco, the same component behind VS Code, with a custom ink tokenizer and language service layered on top. Compilation and workspace indexing run in a Web Worker so typing never blocks, and newer edits cancel stale work in flight. The story graph is React Flow with dagre doing the layout.

The design principle is that ink source is the canonical document. The explorer, the problems list, the graph, and the runtime state are all projections of that source, never a separate model that can drift out of sync.

The renderer runs sandboxed with context isolation and no Node access. Every file operation crosses a typed IPC boundary, saves are atomic, and `INCLUDE` resolution only sees the folder you authorised. A web build also exists for Chromebooks and browsers, using the File System Access API behind the same contract.

Cuttle is an independent project and is not affiliated with inkle.

## Privacy

Cuttle collects nothing. There are no servers, no accounts, and no analytics. It reads and writes only the files and folders you choose, and the only data it keeps on its own is a local list of recent projects and your window layout. Your stories never leave your machine. The full [Cuttle privacy policy](/privacy/cuttle/) has the details.

## Status

The editor, preview, graph, and debugger all work today. Signed and notarized macOS builds come out of CI, and a Mac App Store submission is in progress. Windows and Linux builds are not configured yet. Before calling it 1.0 I'm validating it against real published ink projects and setting performance budgets for large stories.
