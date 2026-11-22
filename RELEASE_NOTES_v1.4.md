# Oxford 5000 Words - Update 1.4

A friendly, offline-first vocabulary companion for learners who want to build a strong English foundation one word at a time.

**Live demo:** https://sofyanol.github.io/oxford-5000-words/  
**Latest release:** [Update 1.4](https://github.com/sofyanol/oxford-5000-words/releases/tag/v1.4.0)

---

## What's New in Update 1.4

Update 1.4 is a major feature expansion and stability release bringing daily study habit tracking, customized audio speed controls, an interactive spelling quiz, a fast-paced memory match game, visual learning analytics with a CEFR radar chart, one-click Anki export, and complete Progressive Web App (PWA) offline installation.

### Key Features & Highlights

1. **Daily Study Habit, Goals & Streak Counter (🔥)**:
   - **Streak Engine**: Automatically tracks consecutive active study days in `localStorage`. Practicing today increments your streak 🔥; missing a day resets it with an encouraging message.
   - **Customizable Daily Target**: Choose your daily study goal (10, 20, 50, or 100 cards/reviews per day).
   - **Live Header Indicator**: Circular/linear progress indicator in the header stats pill displays current progress (e.g. `🔥 5 · 14/20`).
   - **Goal Celebration**: Reaching your daily target triggers an engaging, lightweight confetti particle celebration on the screen.

2. **Audio & Pronunciation Controls**:
   - **Playback Speed Selector**: Dedicated speed toggle button (`1.0x`, `0.8x`, `0.6x`) positioned next to native UK/US pronunciation buttons to hear slow articulation clearly.
   - **Auto-Pronounce on Navigation**: Optional preference in the Settings modal to automatically pronounce words when advancing through flashcards.

3. **Interactive Spelling & Writing Quiz Mode**:
   - Added a 4th quiz mode focused on active recall and writing.
   - Learners listen to the native audio recording and view a cloze example sentence with the target word masked.
   - Features phonetic IPA hints, immediate input validation on submit, and audio replay.

4. **Fast-Paced Word Match Challenge (Memory Pairs Game)**:
   - An engaging mini-game presenting 6 to 8 pairs of English words and their translations in a dynamic grid.
   - Match corresponding pairs against the clock with sound effects powered by the Web Audio API.
   - Includes combo multipliers, time bonuses, and victory celebration screens.

5. **Visual Learning Analytics & CEFR Radar**:
   - Interactive analytics dashboard accessible from the toolbar.
   - **SVG Pentagon Radar Chart**: Displays learner mastery balance across CEFR levels (A1, A2, B1, B2, C1).
   - **Level Progress Bars**: Shows exact mastery counts and percentages for each CEFR band.
   - **Leitner SRS Distribution**: Breakdown of cards across Boxes 1 through 5.
   - **Records & High Scores**: Displays personal bests in Speed Race and Word Match modes.

6. **One-Click Export to Anki (TSV)**:
   - Export Unknown words, Due Review cards, or CEFR-filtered sets with a single click.
   - Formatted as an Anki-compatible TSV file with UTF-8 BOM, tab delimiters, and standard Anki import headers:
     `Word | Part of Speech | CEFR | IPA | Definition/Translation | Context Sentence`.

7. **Progressive Web App (PWA) Offline Manifest & Service Worker**:
   - Added `manifest.webmanifest` with standalone display mode, theme colors, and responsive icons.
   - Added `sw.js` offline cache-first Service Worker script allowing users to install the web app to home screen / desktop and use it completely offline.

8. **Core Reliability & Stability Fixes**:
   - Resolved `TypeError` during Unknown Words export.
   - Instant visual undo rollback restoring previous cards to index 0.
   - Sanitized tokens and colons in Listening Quiz prompts.
   - Symmetrical localization keys across all 12 supported runtime languages in `data/i18n.json`.

---

### Verification & Testing
- Automated headless CDP test runner verifies `#selftest` returns `SELFTEST PASS` with 0 console errors.
- Verified standalone bundle compilation with `python build/build.py`.
- 100% offline, zero npm dependencies, zero CDN requests.
