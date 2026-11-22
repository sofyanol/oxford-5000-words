# Oxford 5000 Words - Master Project Guidelines & Agent Instructions

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & DEVELOPERS**
> This file contains non-negotiable instructions established by the project owner. Any AI agent starting a new session MUST read, remember, and strictly adhere to these instructions without requiring the user to re-explain them.

---

## 1. Golden Rules Established by Project Owner

### Rule 0: Autonomous One-Command Release Trigger (Directive for 'اطلق التحديث' / 'انشر التحديث')
- **The project owner does not know programming or technical details**. When the user says phrases like:
  - `"اطلق التحديث"` / `"انشر التحديث"` / `"ارفع التحديث"` / `"انشر في قيت هوب"`
  - `"حدث المشروع وجهز التحديث الجديد"` / `"Release the update"` / `"Publish the update"`
- **The AI agent MUST execute the entire release and next-version transition automatically without asking the user for technical steps or commands**:
  ```powershell
  # Run from project folder:
  python tools/publish_and_bump.py --publish
  # (or from root workspace: python publish_and_bump.py --publish)
  ```
- **What this command does autonomously**:
  1. Compiles standalone bundle (`python build/build.py`).
  2. Runs browser verification test (`python tools/verify_selftest.py`) -> ensures `SELFTEST PASS`.
  3. Commits current release, creates Git tag (e.g. `v1.5.0`), and pushes to GitHub `master` and `main`.
  4. Archives snapshot to `0- update/oxford5000-app <version> coding`.
  5. Automatically renames project directory to the next version (e.g. `oxford5000-app 1.6 coding`).
  6. Automatically updates all internal project files (`sw.js` cache, `data/i18n.json` in 12 languages, `src/index.html`, `src/app.js`, `docs/CHANGELOG.md`, `ALL_UPDATES_CHANGELOG.md`, `README.md`, `GEMINI.md`, `RELEASE_NOTES_v<next>.md`).
  7. Re-compiles new baseline, syncs `publish/index.html` to root `index.html`.
  8. Commits new version environment to Git and pushes to `master` and `main`.
  9. Replies to the user in friendly Arabic explaining that the update was published and the project is fully prepared for the next update.

### Rule 1: 100% English for Repository & Code (Strict Requirement)
- **All repository-facing content MUST be 100% in English**:
  - `README.md` and all documentation in `docs/` and root.
  - All source code comments (HTML, CSS, JS, Python).
  - All commit messages, release titles, and release notes.
  - All GitHub PRs, issues, and discussions.
- **NEVER** write Arabic in code comments, markdown documentation, or commit messages. The repository is targeted at a worldwide international audience.
- *(Note: Arabic is supported ONLY as one of the 12 dynamic runtime language options inside the web app itself for learners, located in `data/tr/ar.json` and `data/i18n.json`).*

### Rule 2: Single-File, Offline-First Architecture
- The application compiles into a single, standalone HTML bundle (`dist/oxford5000-flashcards-final.html` and `publish/index.html`).
- **Zero server dependencies, zero accounts, zero trackers**: All progress is saved in the browser's `localStorage`.
- **Zero npm / Node.js dependencies**: The project is pure Vanilla HTML5, modern CSS3, and ES6+ JavaScript.
- Built strictly using Python 3.8+:
  ```powershell
  python build/build.py
  ```
- **Self-Test**: Always verify changes by opening `dist/oxford5000-flashcards-final.html#selftest` and confirming `SELFTEST PASS` in the browser console.

### Rule 3: Audio & Dataset Specifications (v1.5.0+)
- **Dataset Size**: Exactly **5,325 verified English words** covering the full Oxford 3000 & 5000 lists across CEFR levels A1, A2, B1, B2, and C1.
- **Audio Library**: Exactly **10,460 local native MP3 recordings** (5,230 British English UK + 5,230 American English US) stored inside `audio/`.
- **Supported Languages (12 Languages)**:
  - English (`en`), Arabic (`ar`), Spanish (`es`), French (`fr`), German (`de`), Portuguese (`pt`), Russian (`ru`), Turkish (`tr`), Urdu (`ur`), Hindi (`hi`), Indonesian (`id`), Chinese (`zh`).
  - Always feature all 12 languages with national flags in documentation.

### Rule 4: GitHub Deployment & GitHub Actions Pipeline
- **Live Demo URL**: `https://sofyanol.github.io/oxford-5000-words/`
- **GitHub Repository**: `https://github.com/sofyanol/oxford-5000-words`
- **Branch Synchronization**: Both `master` and `main` branches must remain identical and up-to-date. GitHub Pages deploys from `master`.
- **GitHub Actions Workflow (`.github/workflows/pages.yml`)**:
  - The workflow **MUST** remain split into two separate jobs: `build` (uploads artifact) and `deploy` (has `needs: build`).
  - *Reason*: The audio folder is ~384 MB (10,460 MP3 files). GitHub's artifact indexing takes several seconds. Running them in a single job causes `Found 0 artifact(s)` deployment failure.

### Rule 5: Project Support & High-Traffic Discoverability
- **Official PayPal Donation Link**: `https://www.paypal.com/ncp/payment/HZXA4F94TEA2A`
- **GitHub Topics / Hashtags**: Must only use high-volume, high-traffic discoverability tags (e.g., `english`, `vocabulary`, `language-learning`, `education`, `learning`, `study`, `flashcards`, `spaced-repetition`, `anki`, `webapp`, `javascript`, `html5`, `css3`, `pwa`, `offline-first`, `pronunciation`, `multilingual`, `quiz`, `self-hosted`, `open-source`). Avoid obscure or low-traffic tags.

---

## 2. Interactive App Features & Key Modes

1. **Vocabulary Cards**: Phonetic IPA, definition, CEFR badge, contextual example sentence, word inflections/forms, audio pronunciations (UK/US with 1.0x/0.8x/0.6x speed selectors).
2. **Spaced Repetition System (SRS)**: 5 progressive Leitner review stages with automated scheduling.
3. **Four Quiz Modes**:
   - *Standard Multiple-Choice Quiz*: 4 options based on user's active language.
   - *Audio-Only Listening Quiz*: Word is hidden; learner listens to native pronunciation and identifies meaning.
   - *Speed Race Mode (Time Attack)*: Fast 30s challenge with +2s time bonus per correct answer, visual time pulse, and friendly cat sound on error.
   - *Interactive Spelling & Writing Quiz*: Active recall by typing words with cloze context and IPA hints.
4. **Fast-Paced Word Match Challenge**: 6-8 pairs memory matching game against a timer.
5. **Daily Habit & Streak Tracker (🔥)**: Streak counter, customizable goals, and celebration confetti.
6. **Visual Learning Analytics & CEFR Radar**: 5-point radar polygon chart tracking CEFR levels and SRS box distribution.
7. **One-Click Export to Anki**: TSV file export for offline Anki flashcard decks.
8. **Progressive Web App (PWA)**: Offline-first with `manifest.webmanifest` and service worker caching (`oxford5000-v1.5.0`).
9. **Smart Word Explorer**: Filter by CEFR, search by headword/translation/note, and sort across 8 different criteria.
10. **Word & Sentence Custom Editor**: Allows learners to personalize definitions, examples, and translations locally.
11. **Zero-Login Cloudless Sync**: Transfer progress between devices via URL hash parameters (Full Sync Link, Delta Sync Link, or compact OX6 export codes).

---

## 3. Directory Map & Workflow

```text
oxford5000-app/
├── audio/                   10,460 native MP3 recordings (UK and US)
├── build/
│   └── build.py             Stand-alone compiler (inlines HTML, CSS, JS, and JSON)
├── data/
│   ├── words.json           Core dataset (5,325 entries)
│   ├── i18n.json            UI localization dictionary (12 languages)
│   └── tr/                  Per-language translation maps
├── dist/                    Generated standalone build (oxford5000-flashcards-final.html)
├── docs/                    Technical documentation and architecture records (100% English)
├── publish/                 GitHub Pages deployment output (index.html, audio/, README)
├── src/
│   ├── app.js               Core application logic, SRS engine, quiz modes
│   ├── index.html           Base HTML skeleton
│   └── styles.css           Design system, responsive layout, animations, and dark mode
└── tools/                   Quality audit and dataset verification utilities
```

### Standard Modification & Release Protocol:
1. Edit source files in `src/` or data in `data/`.
2. Run `python build/build.py` to regenerate `dist/` and `publish/`.
3. Copy `publish/index.html` to root `index.html`.
4. Run self-test: `python tools/verify_selftest.py` -> `SELFTEST PASS`.
5. Keep commit messages concise, descriptive, and in 100% English.
6. Push to both `master` and `main`: `git push origin master; git push origin master:main`.

### Automated Release & Next Version Transition:
When an update is ready to be published to GitHub and transitioned to the next development version:
```powershell
# Publishes current release tag, pushes to master/main, archives snapshot to '0- update/',
# renames folder to next version, updates all internal files, re-compiles, and commits:
python tools/publish_and_bump.py --publish
```
