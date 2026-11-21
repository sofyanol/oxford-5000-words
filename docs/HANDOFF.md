# Handoff

## Last updated

2026-11-19 — Added a translated floating coffee-support button; audio playback, UK/US controls, and the 5,325-entry dataset remain verified.

## Current agent

Antigravity (Advanced Agentic Assistant).

## Completed Accomplishments

1. **Vocabulary Dataset Replacement**:
   - Complete migration to `data/words.json` containing all 5,325 entries from Oxford 5000 Full (`oxford_5000_full.json`).
   - Full backup preserved in `data_backup_before_5325/` and `src_backup_before_5325/`.
   - Legacy data files (`words_cefr.json`, `sentences.json`, `sent_list.json`, `forms.json`, `pos.json`, `ipa.json`) safely removed.
   - 100% example coverage: Every single entry (5,325) has its own authentic example sentence (0 missing examples).
   - Unique identifier (`id`) set as primary key to properly distinguish words appearing in multiple parts of speech.

2. **Native Dual Audio Binding (UK & US)**:
   - 5,230 UK audio files and 5,230 US audio files matched and linked.
   - 95 entries without audio documented in `missing_audio.json`.
   - Exactly 0 broken audio paths.
   - NTFS junctions created for `dist/audio`, `publish/audio`, `src/audio`, and root `audio/`.
   - Fixed CSP in `src/index.html` by adding `media-src 'self' file: blob: data: http: https:;` allowing seamless local audio playback on `file:///`.
   - Robust `playAudio` implementation in `src/app.js` preventing button lock-up on `AbortError`.

3. **Card UI & Centering**:
   - Word (`#theWord`) is horizontally centered on the card (`text-align: center; margin: 0 auto;`).
   - UK and US pronunciation buttons (`#wordAudioGroup`) placed directly below the word, centered horizontally.
   - Pronunciation speaker button (`#speakSentence`) removed entirely from example sentence.
   - Accessible buttons with touch target > 36px, faded disabled state for missing audio, dynamic aria-labels, and keyboard controls.

4. **Verification & Launch**:
   - `build/build.py` runs cleanly producing 4.06 MB standalone HTML files (`dist/oxford5000-flashcards-final.html` and `publish/index.html`).
   - Headless Edge test runner passed with `SELFTEST PASS`.
   - Audio playback verified for 5 diverse words on `file:///` protocol (100% success).
   - Website launched in default browser for direct user validation.

## Status for the Next Agent

- **State**: The project is completely self-contained with all 9,906 native audio files stored directly inside `oxford5000-app/audio`.
- **Audio Self-Containment**: `0- update` was kept strictly read-only and untouched. Audio was copied to `oxford5000-app/audio`, and internal links `dist/audio`, `publish/audio`, and `src/audio` point to the local `audio/` directory. `build/build.py` points to `ROOT / "audio"`. All tests and builds pass cleanly with 0 broken audio paths.
- **Rule reminder**: Always edit inside `src/` and run `python build/build.py`. Never edit `dist/` directly.
