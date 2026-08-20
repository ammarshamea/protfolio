---
name: portfolio-refactor
description: Refactors this Next.js (App Router) EN/AR portfolio in place: next-intl, existing UI, Remotion intro, and gitignore for media. Use when the user asks to refactor, clean the project, reorganize, simplify, or tidy the codebase.
---

# Portfolio refactor

This is **not** default Next.js. Read `node_modules/next/dist/docs/` before changing App Router APIs. Heed deprecation notices (`AGENTS.md`).

## Hard constraints

- Locales: **en** and **ar**. Any user-facing string goes in `messages/en.json` and `messages/ar.json`. Do not hardcode copy in components.
- Arabic UI: never apply CSS `letter-spacing` animation (breaks glyph joining). Prefer opacity / blur / translate.
- Respect `useReducedMotion` for motion (intro splash already skips the video).
- Reuse `src/components/ui/*` and existing section/layout patterns. Do not add a second button/input system.
- Content lives in `content/` + `src/lib/content/*`. Do not duplicate project data in components.
- Do not commit `.env`, `public/videos`, `public/generated`, or `public/splash`.
- Do not invent new intro pipelines — use **cinematic-intro-video** / existing `npm run intro:*`.
- Do not create markdown docs the user did not ask for.
- Do not change git config, force-push, or commit unless the user asks.

## Layout map

- Marketing routes: `src/app/[locale]/(marketing)/`
- Private: `src/app/(private)/dashboard`, `admin/local`
- Intro gate: `src/components/home/intro-splash.tsx` on the home page
- Remotion: `src/remotion/`
- Scripts: `scripts/` (`elevenlabs-*`, `finalize-intro-video.ts`, `generate-portfolio-intro-*.ts`)

## How to refactor

1. State the goal in one sentence (perf, duplication, naming, dead code).
2. Search callers before moving files (`Grep` / `Glob`).
3. Prefer small, vertical slices over a big-bang rewrite.
4. Keep i18n keys stable or update **both** message files.
5. After edits: `npm run typecheck` and `npm run lint`. Fix issues you introduced.
6. Leave binary media on Drive; restore with `npm run assets:pull` if the site needs them locally.

## Cleanup that is in-scope

- Scratch under `scripts/.cache` (already gitignored)
- Obsolete one-off debug images / `.ass` files
- Duplicate intro posters superseded by `intro-*-poster.jpg`
- Stale `@ts-expect-error` once the import type-checks

## Cleanup that is out-of-scope unless asked

- Deleting SVG logos
- Rewriting all marketing pages at once
- Changing brand voice or scene copy without a content request
- Adding a new animation library (use Remotion for the intro, framer-motion for the site)

## Verify

```bash
npm run typecheck
npm run lint
```

Spot-check `/en` and `/ar` if the change touches layout, intro, or messages.
