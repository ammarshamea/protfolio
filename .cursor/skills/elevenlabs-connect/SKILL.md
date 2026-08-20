---
name: elevenlabs-connect
description: Connects ElevenLabs, stores the API key, switches male voice IDs, and runs TTS for EN/AR. Use when the user mentions ElevenLabs, voice-over, TTS, voice id, ELEVENLABS_API_KEY, or generating narration clips.
---

# ElevenLabs connect

This repo already has the CLI. Do not invent a new auth flow.

## Key rules

- Secret keys start with `sk_`. An API key *ID* is not a secret and will fail TTS.
- Never commit `.env` / `.env.local`. Edit `.env.example` only with placeholders.
- Default male voice in this project is **Adam** (`pNInz6obpgDQGcFmaJgB`) via `ELEVENLABS_VOICE_ID`.
- Model: `eleven_multilingual_v2`. Pass `--language ar` or `en` for locale clips.
- Restricted keys may lack `voices_read`. TTS still works with a known premade voice ID — do not block on listing voices.

## Connect

1. User pastes a secret key into `.env`:

```
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

2. Optional machine login (also writes `~/.elevenlabs/api_key`):

```bash
npm run elevenlabs:login -- --key sk_your_key
npm run elevenlabs:whoami
```

Open the keys page in Chrome:

```bash
npm run elevenlabs:auth
```

Keys UI: https://elevenlabs.io/app/settings/api-keys

## Synthesize

Single clip:

```bash
npm run elevenlabs:tts -- --text "Hello" --out public/generated/portfolio-intro/voice-en-opening.mp3 --language en
```

All intro scenes (reads `SCENES` + writes `voice-timing.json`):

```bash
npm run intro:voice
# force regenerate existing mp3s:
npx tsx scripts/generate-portfolio-intro-voice.ts --force
```

Scripts: `scripts/elevenlabs-login.mjs`, `scripts/elevenlabs-tts.mjs`, `scripts/generate-portfolio-intro-voice.ts`.

## Change voice

1. Set `ELEVENLABS_VOICE_ID` in `.env` to another male premade ID.
2. Update `DEFAULT_VOICE` in `scripts/elevenlabs-tts.mjs` to match.
3. Test one clip before regenerating all 40 (20 scenes × 2 locales).
4. Run `intro:voice` with `--force` so old mp3s are not skipped.
