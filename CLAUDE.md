# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mightystrong.io is an Astro-based blog and portfolio website. The site is built using Astro v5.11.2 with TypeScript and includes blog functionality with content collections, RSS feed generation, and SEO optimization.

## Build Commands

All commands should be run from the `/blog` directory:

```bash
cd blog
npm install          # Install dependencies
npm run dev          # Start development server at localhost:4321
npm run build        # Build for production to ./dist/
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

## Architecture Overview

### Technology Stack
- **Framework**: Astro v5.11.2 (static site generator)
- **Language**: TypeScript with strict mode
- **Content**: Markdown/MDX with content collections
- **Styling**: Minimal CSS with custom Atkinson fonts

### Project Structure
```
blog/
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── BaseHead.astro
│   │   ├── Footer.astro
│   │   ├── FormattedDate.astro
│   │   ├── Header.astro
│   │   └── HeaderLink.astro
│   ├── content/         # Content collections
│   │   └── blog/        # Blog posts in Markdown
│   ├── layouts/         # Page layouts
│   │   └── BlogPost.astro
│   ├── pages/           # File-based routing
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── about.astro
│   │   ├── index.astro
│   │   └── rss.xml.js
│   └── styles/          # Global styles
│       └── global.css
├── public/              # Static assets
│   └── fonts/
└── package.json         # Dependencies and scripts
```

### Key Patterns

1. **Content Collections**: Blog posts are managed through Astro's content collections API, providing type safety and frontmatter validation.

2. **File-based Routing**: Pages in `src/pages/` automatically become routes. Dynamic routes use bracket notation (e.g., `[...slug].astro`).

3. **Component Architecture**: Reusable components in `src/components/` follow Astro's component model with frontmatter scripts and template sections.

4. **Layout System**: The `BlogPost.astro` layout provides consistent structure for blog posts with SEO metadata and styling.

## Development Notes

### Current State
- The site is based on Astro's official blog template
- Blog functionality is fully implemented with RSS feed
- Projects section exists but needs content (`src/pages/projects/`)
- One blog post has been added: "critical-thinking.md"
- The first default blog post "first-post.md" has been deleted

### Important Configuration
- **Site URL**: Currently set to 'example.com' in `astro.config.mjs` - needs updating to 'mightystrong.io'
- **TypeScript**: Strict mode is enabled
- **Content Types**: Blog posts support title, description, pubDate, and optional heroImage

### Common Tasks

To add a new blog post:
1. Create a new `.md` file in `src/content/blog/`
2. Include required frontmatter: title, description, pubDate
3. The post will automatically appear on the blog index and generate a route

To modify site navigation:
- Edit `src/components/Header.astro` for the main navigation menu

To change site metadata:
- Update `src/consts.ts` for site title and description
- Modify `astro.config.mjs` for the site URL

### Testing Strategy

Currently, there's no dedicated testing framework. Quality is maintained through:
- TypeScript type checking during development and build
- Astro's built-in content collection validation
- Build-time validation ensures all pages compile correctly

To validate changes:
```bash
npm run build  # This will catch most errors
```

## Notes

- Always run commands from the `/blog` directory
- The project uses Astro's zero-JS approach by default - interactive components require explicit hydration directives
- Content collection schemas are defined in `src/content/config.ts`
- Static assets in the `public/` directory are served from the root URL path