# Oxford 5000 Words - Update 1.4

A friendly, offline-first vocabulary companion for learners who want to build a strong English foundation one word at a time.

**Live demo:** https://sofyanol.github.io/oxford-5000-words/  
**Latest release:** [Update 1.4](https://github.com/sofyanol/oxford-5000-words/releases/tag/v1.4.0)

## Update 1.4

Update 1.4 is a major feature expansion and interface refinement release focusing on daily study habit building, customizable audio articulation speeds, active spelling recall, an interactive memory matching game, visual learning analytics with a CEFR radar chart, one-click Anki export, full Progressive Web App (PWA) offline installation, and a sticky top navigation bar with a balanced action grid.

### 🌟 Highlights:

- **Daily Study Habit, Goals & Streak Counter (🔥)**:
  - **Daily Streak Engine**: Automatically tracks consecutive active study days in `localStorage`. Practicing today increments your streak 🔥; missing a day resets it with an encouraging motivational prompt.
  - **Customizable Daily Target**: Choose your daily study goal from four flexible tiers (10 cards/day for light study, 20 for standard, 50 for intensive, or 100 for mastery).
  - **Live Header Indicator**: Circular / linear progress indicator in the header stats pill displays current progress in real time (e.g. `🔥 5 · 14/20`).
  - **Goal Celebration**: Reaching your daily target triggers a joyful, lightweight confetti particle celebration on screen.

- **Audio & Pronunciation Controls**:
  - **Playback Speed Selector**: Dedicated speed toggle button (`1.0x`, `0.8x`, `0.6x`) positioned next to native UK/US pronunciation buttons to hear slow, clear articulation in complex words.
  - **Auto-Pronounce on Navigation**: Optional toggle in the Settings modal to automatically play the native pronunciation when advancing to the next flashcard (ideal for hands-free and headphone study).

- **Interactive Spelling & Writing Quiz Mode**:
  - Added a 4th quiz mode focused on active recall and writing.
  - Learners listen to the native audio recording and view a cloze example sentence with the target word masked.
  - Features phonetic IPA hints, immediate input validation on submit, and audio replay.

- **Fast-Paced Word Match Challenge (Memory Pairs Game)**:
  - Rapid-fire mini-game presenting 6 to 8 pairs of English words and their translations in a dynamic grid.
  - Match corresponding pairs against the clock with sound effects powered by the Web Audio API without external assets.
  - Includes combo multipliers, time penalties on error, and victory celebration screens.

- **Visual Learning Analytics & CEFR Radar**:
  - Comprehensive analytics dashboard accessible from the toolbar.
  - **SVG Pentagon Radar Chart**: Displays learner mastery balance across CEFR levels (A1, A2, B1, B2, C1).
  - **Level Progress Bars**: Shows exact mastery counts and percentages for each CEFR band.
  - **Leitner SRS Distribution**: Visual breakdown of cards across Boxes 1 through 5.
  - **Records & High Scores**: Displays personal bests in Speed Race and Word Match modes.

- **One-Click Export to Anki (TSV)**:
  - Export Unknown words, Due Review cards, or CEFR-filtered sets with a single click.
  - Formatted as an Anki-compatible TSV file with UTF-8 BOM, tab delimiters, and standard Anki import headers:
    `Word | Part of Speech | CEFR | IPA | Definition/Translation | Context Sentence`.

- **Progressive Web App (PWA) Offline Manifest & Service Worker**:
  - Added `manifest.webmanifest` with standalone display mode, theme colors, and responsive icons.
  - Added `sw.js` offline cache-first Service Worker script allowing users to install the web app to home screen / desktop and use it completely offline.

- **Persistent Sticky Top Navigation Bar (`#topNavBar`)**:
  - Pinned the unified header, stats counters, language switcher, CEFR level buttons, and progress track at `top: 0` (`position: sticky; z-index: 120`).
  - Frosted glass backdrop filter (`backdrop-filter: blur(16px)`) with gold border prevents visual interference when scrolling down to read long sentences or study notes.

- **Deck-Side Search Companion & Notice Clearance**:
  - Moved the **Word Search button** (`#btnSearch`) directly alongside the flashcard deck with a sleek frosted glass pill, gold border, search icon, and `[/]` keyboard shortcut.
  - Adjusted the examples advisory notice (`#examplesNotice`) position to ensure clean clearance without any overlap beneath the sticky header.

- **Beautifully Arranged Two-Tier Action Toolbar**:
  - Reorganized the bottom tool buttons into a symmetrical, balanced 2-tier grid:
    - **Tier 1 (Learning & Mini-Games — 3 cards):** `اختبرني` (Quiz Mode), `مطابقة الكلمات 🧩` (Word Match), `الإحصائيات 📊` (Learning Analytics).
    - **Tier 2 (Deck Utilities — 4 cards):** `مزامنة` (Sync), `ترتيب عشوائي` (Shuffle), `البدء من جديد` (Reset), `تحميل الكلمات` (Download Unknown).

- **Universal Luxury Scrollbars & Brand-Consistent Golden Range Slider**:
  - Custom ultra-slim 5px/6px pill scrollbars across the flashcard, modals, and lists, eliminating default OS scrollbar arrows and gray borders.
  - Replaced native sliders in Settings with a brand-consistent golden accent slider (`#settingsFontScale`).

- **12 Global Languages Supported**:
  - All new labels, modals, and tooltips localized across all 12 supported runtime languages: English, Arabic, Spanish, French, German, Portuguese, Russian, Turkish, Urdu, Hindi, Indonesian, and Chinese.

---

### 🧪 Verification:

- Automated build passes with `python build\build.py`.
- Standalone HTML release: `dist\oxford5000-flashcards-final.html` and `publish\index.html`.
- Dataset check: 5,325 entries, 0 missing examples, 0 broken audio paths.
- Audio coverage: 5,230 UK and 5,230 US authentic Oxford sound recordings.
- Browser self-test passes (`#selftest` console log: `SELFTEST PASS` with 0 assertion failures).
