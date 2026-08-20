---
name: cinematic-intro-video
description: Builds the portfolio cinematic intro from still images with Remotion Ken Burns motion, ElevenLabs voice-over, FFmpeg mux/grade/whoosh, and the homepage intro gate. Use when the user asks for intro video, Remotion, Ken Burns, voice-over, ffmpeg finalize, scene images, or splash intro.
---

# Cinematic intro video

Not a slideshow. Still images must feel like a camera: Ken Burns, parallax, easing, real cuts. Text is lower-third, never over the presenter's face.

## Restore media first

Binary assets live on Drive, not git. If `public/videos` or scene PNGs are missing:

```bash
npm run assets:pull
```

## Pipeline (run in order)

| Step | Command | Output |
|------|---------|--------|
| Voice | `npm run intro:voice` | `public/generated/portfolio-intro/voice-{en,ar}-{id}.mp3` + `voice-timing.json` |
| Silent video | `npm run intro:render` | `scripts/.cache/remotion/intro-{en,ar}-silent.mp4` |
| Mux + grade | `npm run intro:finalize` | `public/videos/intro-{en,ar}.{mp4,webm}` + poster jpg |
| All three | `npm run intro` | voice → render → finalize |

Requires: ElevenLabs key (see **elevenlabs-connect**), FFmpeg with `rubberband`, Remotion CLI.

## Source of truth

- Scenes / copy / camera: `src/remotion/PortfolioIntro/config/sceneData.ts`
- FPS 30, 1920×1080, 18-frame overlaps: `introConfig.ts`
- Timing fallback copy: `src/remotion/PortfolioIntro/config/voice-timing.json` (also written to `public/generated/...` after voice gen)
- Gate UI: `src/components/home/intro-splash.tsx` (`sessionStorage` key `intro-played-v1`, skip + replay)
- Compositions: `PortfolioIntroEn` / `PortfolioIntroAr` in `src/remotion/Root.tsx`

## Visual rules

- Images: `public/generated/portfolio-intro/scene-NN-*.png` referenced via `staticFile("generated/portfolio-intro/...")`.
- Titles sit in the lower third (`CinematicText` + `LowerThirdScrim`). Do not center type over the figure.
- Arabic: `letterSpacing: "normal"` — never animate tracking on a cursive script. Use blur-resolve instead.
- Stagger title exit so outgoing/incoming lines do not double-expose during cuts (`Scene.tsx`).
- Transitions: `mask` / `zoom` / `whip` only. No 360 spin, no generic CSS fade-as-the-whole-piece.
- Camera: modest scale (1 → ~1.08–1.15) with `easeInOutCubic` / `easeOutExpo`. Keep the person in frame.

## FFmpeg finalize (`scripts/finalize-intro-video.ts`)

- Align each voice clip with scene start times from `voice-timing.json`.
- Voice changer on the mix: `rubberband=pitch=0.92`, warmth EQ, light compression (duration-preserving).
- Two whooshes only: cuts into `build` and `climax`. Keep them quiet.
- Optional `public/audio/intro/ambient.mp3` is ducked under voice if present — do not add copyrighted music.
- Export x264 CRF 18 + VP9 webm + poster near the ending frame.

## After changing scenes

1. Update `SCENES` (ids must match voice filenames and timing keys).
2. Copy timing JSON into `src/remotion/.../voice-timing.json` if Remotion imports it from src.
3. Re-voice, re-render, finalize.
4. Spot-check frames (opening, a busy hologram scene, ending EN + AR).
5. Optional: push binaries with the **rclone-assets-deploy** skill — do not git-commit mp4/png/mp3.
