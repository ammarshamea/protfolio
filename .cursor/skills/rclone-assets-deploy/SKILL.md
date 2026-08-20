---
name: rclone-assets-deploy
description: Syncs non-SVG public media to Google Drive with rclone, restores it for local/dev/deploy, and keeps binaries out of git. Use when the user mentions rclone, Google Drive, assets:pull, upload videos/images, or deploying media.
---

# rclone assets + deploy

Large media is **not** in git. SVGs stay in the repo. Drive is the backup and restore source before a local run or a Vercel deploy that needs those files.

## Remote and link

- Remote: `googledrive:` (not `googledrive2:` unless the user says so)
- Folder: `googledrive:portfolio-intro`
- Public assets tree: `googledrive:portfolio-intro/assets` (mirrors `public/`)
- Share URL: https://drive.google.com/open?id=1QssytWycgCr_qhpEwG8nBuDvfYPS-q3q

Documented in `README.md` and `.env.example`.

## Upload (exclude SVG)

Copy every raster/video/audio/json asset under `public/`, never `.svg`:

```bash
rclone copy public googledrive:portfolio-intro/assets --include "**/*.png" --include "**/*.jpg" --include "**/*.jpeg" --include "**/*.webp" --include "**/*.gif" --include "**/*.mp4" --include "**/*.webm" --include "**/*.mp3" --include "**/*.json" --exclude "*" --exclude "*.svg" -P
```

Verify:

```bash
rclone lsl googledrive:portfolio-intro/assets
rclone link googledrive:portfolio-intro
```

## Restore (required before intro / hero)

```bash
npm run assets:pull
```

Equivalent: `rclone copy googledrive:portfolio-intro/assets public`

After restore, `public/videos/intro-{en,ar}.{mp4,webm}` and scene PNGs must exist or the splash 404s.

## What stays local vs Drive

| Keep in git | Drive only (gitignore) |
|-------------|------------------------|
| `*.svg` under `public/` and `public/projects/logos/` | `public/generated`, `public/videos`, `public/splash` |
| App source, messages, content JSON | `public/projects/logos/*.{png,jpg}` |

Do not delete SVGs when “removing copied assets”.

## Deploy

1. `npm run assets:pull` on the machine that builds, **or** ensure Vercel/hosting already has the binaries (this repo does not upload mp4 to git).
2. `npm run typecheck` then `npm run build`.
3. Site deploy is Vercel (`npm run build`). rclone is **media** deploy, not the Next app.
4. Never rclone `.env` or API keys.

If the user asks to copy assets then remove local copies: upload first, confirm `rclone lsl`, then delete only the uploaded binary trees listed above.
