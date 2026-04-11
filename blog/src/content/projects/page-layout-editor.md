---
title: 'Page Layout Editor'
description: 'Reusable Angular page layout editor with block-based content, grid layout controls, document JSON serialization, and a library-shaped API for host app integration.'
category: 'Web Development'
technologies: ['Angular', 'TypeScript', 'SCSS', 'Vitest', 'Playwright']
image: '/page-layout-icon.png'
featured: true
status: 'completed'
startDate: 'Jan 01 2025'
github: 'https://github.com/devandanger/page-layout-editor'
---

## Project Overview

Page Layout Editor is a reusable Angular library for building block-based page layouts with grid controls, drag-and-drop positioning, collision detection, and JSON document serialization. It ships as an npm package that host applications can integrate and extend with their own custom block types and renderers.

![The page layout editor in action](/page-layout-editor-screenshot.png)

## Core Features

### Document Model
- **Content/layout separation**: Content blocks own data and schema; layout blocks own position, size, z-order, and state
- **JSON persistence**: Stable, validated document format that can be saved, loaded, and evolved
- **Page settings**: Configurable grid dimensions and document size

### Editor Behavior
- **Drag and drop**: Move blocks freely within the page grid
- **Resize**: Handles for adjusting block dimensions
- **Collision detection**: Prevents overlapping blocks with visual feedback
- **Selection**: Click-to-select with property panel editing
- **Undo/redo**: Full history support for editing actions
- **Lock and hide**: Per-block controls for locking position or hiding from view

### Extensibility
- **BlockSchema**: Define content fields and property panel editing behavior
- **BlockRegistry**: Register block identity, defaults, and layout defaults
- **BlockRendererRegistry**: Inject host-provided Angular renderers keyed by `renderKind`
- **Custom print adapters**: Host-provided print/export output handling

### Built-in Renderers
- Image blocks
- Text blocks
- List-grid blocks
- JSON blocks

## Architecture

The library enforces a clean boundary between editor and host:

- **The library owns**: editor behavior, layout rules, property editing, history, collision handling, and print orchestration
- **The host app owns**: routing, persistence, domain-specific block types, custom renderers, and product-specific workflows

This separation allows the same editor to serve different product domains without coupling the core to any specific use case.

## Target Use Cases

### Teacher-Facing Content
Generated question sheets, classroom prompts, and structured printable learning materials. A system generates content, injects it into the document model, and lets a user arrange or refine it before printing.

### Marketing and Flyer Composition
Page composition for promotional content — callouts, images, text blocks, and structured layouts that become printable or shareable materials.

### Any Angular App Needing a Layout Editor
Any Angular application that needs a reusable block-and-layout document editor can integrate the library via npm.

## Getting Started

```bash
npm install page-layout-editor
```

The library targets Angular 21 and provides consumer documentation for integrating from another Angular application.

## Testing

- **Unit tests**: Vitest covers layout rules, collision handling, serialization, block lifecycle, and renderer contracts
- **Browser tests**: Playwright smoke tests cover selection, undo/redo, collision feedback, resize, and host-rendered block behavior

## Community

Page Layout Editor is open source under the MIT license. Visit the [GitHub repository](https://github.com/devandanger/page-layout-editor) to get involved or report issues.
