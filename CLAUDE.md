# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

New Era is a marketing website for an AI consulting firm ("New Era — Consultoría AI") targeting Spanish-speaking businesses. Built with Next.js App Router, it contains multiple visual design variants of the same landing page content plus a 3D Spline hero page.

## Commands

```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config v9)
```

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with TypeScript strict mode
- **Tailwind CSS v4** (oxide engine, configured via CSS `@theme` in globals.css, no tailwind.config)
- **GSAP + ScrollTrigger** for all scroll-based animations
- **@splinetool/react-spline** for 3D interactive scenes
- **lucide-react** for icons
- **ElevenLabs Convai widget** embedded globally via CDN script

## Architecture

### Routing

All pages use `"use client"` — fully client-rendered with heavy animation.

| Route | Purpose |
|---|---|
| `/` | Placeholder homepage |
| `/design-1` | Organic Tech theme (moss/clay/cream) |
| `/design-2` | Midnight Luxe theme (obsidian/gold) |
| `/design-3` | Brutalist Signal theme (B&W + red) |
| `/design-4` | Vapor Clinic theme (void/plasma purple) |
| `/spline-3d` | Interactive 3D Spline hero |

### Page Structure (Designs 1-4)

Each design page is a single large file with co-located components (no shared component library). Every design follows the same 5-section layout:

1. **Hero** — Full-viewport with Unsplash background, gradient overlay, headline + 2 CTAs
2. **Features** — 3-column grid with interactive micro-animations (DiagnosticShuffler, TelemetryTypewriter, CursorProtocolScheduler)
3. **Philosophy** — Full-bleed section with GSAP ScrollTrigger parallax
4. **Protocol** — 3 sticky stacking cards with scroll-pinning + blur transitions (GSAP ScrollTrigger pin)
5. **Footer** — 4-column grid

### Design Token Pattern

Each design defines its own color palette and fonts as JS constants, injected via inline `<style>` tags scoped to a page-level CSS class (e.g., `.organic-tech-page`, `.midnight-luxe-page`). There are no shared CSS variables across designs.

### Animation Conventions

- Always use `gsap.context()` for scoped animations, clean up with `ctx.revert()` in useEffect return
- `ScrollTrigger.create()` for pinned/stacking cards
- `gsap.timeline()` for sequenced entrances
- Scrub-based parallax for philosophy sections
- Looping timelines for continuous animations (e.g., fake cursor)

### Global Layout (`app/layout.tsx`)

- Fixed navbar (z-100) linking all design routes
- Content wrapper uses `pt-14` to offset below nav
- ElevenLabs voice agent widget loaded via `next/script` with `lazyOnload` strategy
- 13 Google Font families loaded for all design variants
- Spline scene URL preloaded in `<head>`
- `body { overflow: auto !important }` prevents Spline scroll hijacking

### External Resources (not in npm)

- Unsplash images via hardcoded URLs
- Spline 3D scene from `prod.spline.design`
- ElevenLabs widget from unpkg CDN
- Google Fonts via `next/font` is NOT used — fonts loaded via `<link>` tags

## Key Files

- `docs/knowledge-base-agente.md` — Knowledge base for the ElevenLabs voice agent (Spanish), defines services, pricing, and FAQs
- `new_era_website.html` — Standalone HTML prototype, not integrated into Next.js app

## Content Language

All website content is in **Spanish**. Maintain Spanish for any user-facing text.
