# START HERE - Complete Guide for Any AI Agent or Developer

This document is designed to be the **canonical starting point** for this repository.
If you open the oxford5000-app folder without prior context, read this file first.
It explains what the project is, how it operates, and how to safely extend and build it.

The content of this file is embedded into dist/oxford5000-flashcards-final.html
as an HTML comment during the automated build process, making the final release self-documenting.

---

## 0. Quick Reference Card

| Question | Answer |
| :--- | :--- |
| **What is this project?** | A self-contained, offline-first English vocabulary flashcard app in a single standalone HTML file. No server, no account required. |
| **How many words?** | 5,325 verified entries covering the full Oxford 3000 & 5000 lists across CEFR levels A1, A2, B1, B2, and C1. |
| **Audio support?** | 10,460 local native MP3 recordings (5,230 British English + 5,230 American English). |
| **Interface languages?** | 12 languages supported (English, Arabic, Spanish, French, German, Portuguese, Russian, Turkish, Urdu, Hindi, Indonesian, Chinese). |
| **Tech stack?** | Vanilla HTML5, modern CSS3, and vanilla ES6+ JavaScript. Zero external frameworks, zero npm/Node.js dependencies. |
| **Build requirements?** | Python 3.8+ only (for the build script and tools). No npm or Node.js required. |
| **How to run?** | Open dist/oxford5000-flashcards-final.html directly in any modern browser. |
| **How to build?** | Run python build/build.py from the project root. |
| **How to verify?** | Open dist/oxford5000-flashcards-final.html#selftest and verify SELFTEST PASS in the browser console. |
| **Offline sync?** | Browser-to-browser transfer via URL hash parameters (Full Sync Link, Delta Sync Link, or compact OX6 sync codes). |
| **Single-file size?** | Approximately 4.14 MB for the complete standalone HTML bundle (data, scripts, and styles inlined). |

---

## 1. Getting Started Step-by-Step

### 1.1 To use or preview the application
1. Navigate to dist/ or publish/.
2. Open oxford5000-flashcards-final.html or index.html in Chrome, Edge, Safari, or Firefox.
3. The app runs immediately offline without any server or Internet connection.

### 1.2 To develop or modify
1. Edit source files in src/ (index.html, styles.css, pp.js).
2. Update dataset files in data/ if needed (words.json, i18n.json, 	r/*.json).
3. Run python build/build.py to regenerate the production bundles in dist/ and publish/.
4. Test by opening dist/oxford5000-flashcards-final.html#selftest in your browser.

---

## 2. Directory Layout

`	ext
oxford5000-app/
├── audio/                   10,460 native MP3 recordings (UK and US pronunciation)
├── build/
│   └── build.py             Stand-alone build tool (inlines HTML, CSS, JS, and JSON)
├── data/
│   ├── words.json           Core dataset (5,325 entries with CEFR, IPA, POS, and examples)
│   ├── i18n.json            UI localization dictionary (12 languages)
│   └── tr/                  Per-language word translation maps
├── dist/                    Generated standalone build (oxford5000-flashcards-final.html)
├── docs/                    Technical documentation and architecture records
├── publish/                 GitHub Pages deployment output (index.html, audio/, README)
├── src/
│   ├── app.js               Core application logic, spaced repetition engine, quiz modes
│   ├── index.html           Base HTML skeleton
│   └── styles.css           Design system, responsive layout, animations, and dark mode
└── tools/                   Quality audit and dataset verification utilities
`

---

## 3. Core Capabilities & Architecture

- **Spaced Repetition System (SRS)**: 5 progressive review stages calculated with Leitner intervals.
- **Three Quiz Modes**:
  1. *Standard Multiple-Choice Quiz*: 4 options based on user's selected language.
  2. *Audio-Only Quiz*: Native UK/US pronunciation playback without showing the written word.
  3. *Speed Race (Time Attack)*: Fast-paced 30s challenge with +2s time bonus per correct answer.
- **Offline Audio Engine**: Native UK and US audio pronunciations played via local audio assets with fallback to Web Speech Synthesis API.
- **Full Privacy & Client-Side Storage**: All state is stored in browser localStorage. No trackers, no cookies, no accounts required.

---

## 4. Build and Self-Test

To build the project:
`powershell
python build/build.py
`

To run built-in verification tests:
Open the output file with #selftest:
`	ext
dist/oxford5000-flashcards-final.html#selftest
`
The browser developer console will output SELFTEST PASS upon successful verification of all data structures, audio paths, and i18n keys.
