# Oxford 5000 Words - Master Changelog (Updates 1.0 - 1.4)

A friendly, offline-first vocabulary companion for learners who want to build a strong English foundation one word at a time.

**Live demo:** https://sofyanol.github.io/oxford-5000-words/  
**Latest release:** [Update 1.4](https://github.com/sofyanol/oxford-5000-words/releases/tag/v1.4.0)

---

## Update 1.4

Update 1.4 is a major feature expansion and stability release bringing daily study habit tracking, customized audio speed controls, an interactive spelling quiz, a fast-paced memory match game, visual learning analytics with a CEFR radar chart, one-click Anki export, and complete Progressive Web App (PWA) offline installation:

- **Daily Study Habit, Goals & Streak Counter (🔥)**:
  - Daily Streak Engine tracking consecutive study days in `localStorage` with automated daily rollover.
  - Customizable Daily Goal target (10, 20, 50, or 100 cards).
  - Circular / linear header progress pill displaying streak and target completion.
  - Canvas confetti particle celebration upon completing daily goals.

- **Audio & Pronunciation Controls**:
  - Playback speed selector (`1.0x`, `0.8x`, `0.6x`) next to audio pronunciation buttons for clear slow articulation.
  - Optional Auto-Pronounce on navigation setting in Preferences.

- **Interactive Spelling & Writing Quiz Mode**:
  - 4th quiz mode focused on active recall, typing, and spelling.
  - Masked target word in contextual example sentence with IPA phonetic hint and native audio replay.
  - Immediate letter-by-letter validation and error handling.

- **Fast-Paced Word Match Challenge (Memory Pairs Game)**:
  - Rapid-fire mini-game matching 6-8 pairs of English words with their active language meanings against a 45s timer.
  - Interactive Web Audio sound effects, combo multipliers, and victory celebration.

- **Visual Learning Analytics & CEFR Radar**:
  - SVG Pentagon Radar chart visualizing vocabulary mastery across CEFR levels (A1, A2, B1, B2, C1).
  - Detailed CEFR level progress bars and Leitner SRS stage distribution (Boxes 1-5).
  - High score tracking for Speed Race and Word Match modes.

- **One-Click Export to Anki (TSV)**:
  - Clean export of Unknown words, Due reviews, or filtered lists formatted as Anki-ready TSV files with UTF-8 BOM.

- **Progressive Web App (PWA) Offline Manifest & Service Worker**:
  - `manifest.webmanifest` and cache-first `sw.js` allowing full home-screen installation and offline access.

- **Persistent Sticky Top Navigation Bar**:
  - Pinned the unified header, stats counters, language switcher, CEFR level buttons, and progress track at `top: 0` (`position: sticky`).
  - Frosted glass backdrop filter (`backdrop-filter: blur(16px)`) prevents visual interference when scrolling down.

- **Deck-Side Search Companion & Notice Clearance**:
  - Moved the **Word Search button** (`#btnSearch`) directly alongside the flashcard deck with a sleek frosted glass pill, gold border, and `[/]` shortcut.
  - Resolved examples advisory notice (`#examplesNotice`) position to ensure clean clearance without overlap beneath the sticky header.

- **Beautifully Arranged Two-Tier Action Toolbar**:
  - Reorganized the bottom tool buttons into a symmetrical 2-tier grid:
    - Tier 1 (Learning & Mini-Games): `اختبرني` (Quiz), `مطابقة الكلمات 🧩` (Word Match), `الإحصائيات 📊` (Learning Analytics).
    - Tier 2 (Deck Utilities): `مزامنة` (Sync), `ترتيب عشوائي` (Shuffle), `البدء من جديد` (Reset), `تحميل الكلمات` (Download Unknown).

- **Universal Luxury Scrollbars & Brand-Consistent Golden Range Slider**:
  - Custom ultra-slim 5px/6px pill scrollbars across the flashcard, modals, and lists, eliminating default OS scrollbar arrows and gray borders.
  - Replaced native sliders in Settings with a brand-consistent golden accent slider (`#settingsFontScale`).

- **Resilient Unknown Words Export & File Generation**:
  - Resolved critical `TypeError: a.localeCompare is not a function` when clicking "Download unknown words" (`#btnDownloadUnknown`).
  - Correctly extracts headwords and definitions instead of numeric IDs.
  - Generates cleanly ordered UTF-8 text files for offline study.

- **Instant Visual Undo Synchronization**:
  - Enhanced `applyUndo` to handle both `id` and `word` keys simultaneously, properly transitioning unrated cards back to the unmarked queue.
  - Guaranteed visual rollback to the previous card on undo, even when shuffle mode is active.
  - Immediate decrement of Known / Unknown header counters upon undo.

- **Listening Quiz Prompt & Text Sanitization**:
  - Displays the actual English word name in sentence writing prompts instead of raw numeric tokens.
  - Eliminated duplicated colons in revealed word banners.
  - Cleaned up template quote tokens across all 12 localization tables.

- **"What's New in 1.4" Modal & Multi-Language Navigation**:
  - Upgraded floating star badge modal with Update 1.4 notes.
  - Updated tab headers across all 12 supported runtime languages.

- **Full System Verification**:
  - Verified all interactive controls, CEFR filters, quiz modes, and dual UK/US audio playback for 5,325 words.
  - 100% pass on internal unit tests (`#selftest`).

---

## Update 1.3

Update 1.3 focuses on deeper interactivity, active auditory learning, dynamic speed challenges, and comprehensive vocabulary exploration:

- **Speed Race Mode (Time Attack Mode)**:
  - 30-second countdown quiz mode where every correct answer awards **+2 bonus seconds** with an animated green indicator (`+2s`).
  - Mistakes trigger a gentle, friendly **cat meow sound** (`playCatSound`) along with an immediate warning flash, automatically advancing to the next question without breaking momentum.
  - Dynamic urgent pulse indicator when time drops below 6 seconds.

- **Audio-Only Listening Quiz Mode**:
  - A dedicated listening-first training mode where the learner listens to native English pronunciation without seeing the written word.
  - Automatically plays British (UK) or American (US) audio upon entering each question, with a prominent repeat-listening button.
  - Four multiple-choice meaning options in the learner's chosen language.
  - Once answered, the hidden word is revealed in a smooth glowing banner displaying the word, its part of speech, and phonetic IPA.

- **Smart Word Explorer & Advanced Search**:
  - An interactive exploration modal featuring **8 comprehensive sorting algorithms**:
    1. Alphabetical (A to Z)
    2. Alphabetical reverse (Z to A)
    3. CEFR Level (A1 to C1)
    4. CEFR Level reverse (C1 to A1)
    5. Unknown Words First
    6. Due for Review First (SRS)
    7. Mastered / Known Words First
    8. Oxford Importance / Frequency & Random Shuffle
  - Interactive filter chips for CEFR difficulty levels (A1, A2, B1, B2, C1) and Parts of Speech (Verbs, Nouns, Adjectives, Others).
  - Rich word cards showing phonetic IPA, Arabic classifications, audio preview buttons, and one-click direct jump to any card in the study deck.

- **Custom Word, Sentence, and Forms Editor**:
  - Learners can directly customize and correct word translations, example sentences, example translations, and grammatical forms.
  - All user customizations are preserved locally and seamlessly encoded into OX6 cloud synchronization links, ensuring personal corrections never get lost.
  - Custom indicator badge on cards showing when personalized content is active, with a one-click reset to Oxford defaults.

- **Floating "What's New" Star Badge & Complete Written Site Guide**:
  - A circular floating button anchored opposite the support coffee button, featuring a layered white star in front of a glowing golden star.
  - Clicking opens an all-in-one guide and release portal organized into 3 tabs:
    1. **🌟 What's New in 1.3**: Complete overview of all new features, speed race, and listening mode.
    2. **📖 Complete Site Guide**: A thorough, written manual explaining every component on the site: Flashcards, SRS Spaced Repetition stages 0-5, Word Forms & Grammar, Quiz Modes, Explorer, Sync, and Offline Architecture.
    3. **📜 Changelog Archive**: Detailed chronological history covering releases 1.0, 1.1, 1.2, and 1.3.

- **Gorgeous Golden Text Selection**:
  - Custom styling for highlighting and copying text across words, sentences, and translations with a soft golden glow and clean contrast.

- **Interactive Fluid Visuals & Glow Effects**:
  - Responsive, fluid background with subtle ambient gradients.
  - Gentle lift and glowing effects on card and button interactions.
  - Unobtrusive reminder toast near flashcards indicating examples may vary and can be customized.

- **Perfect Social Icon Alignment & Polished Layout**:
  - Pixel-perfect centering for GitHub, X, and LinkedIn footer icons.
  - Refined mobile-responsive spacing for project tools and support actions.

---

## Update 1.2

Update 1.2 upgrades Oxford 5000 with a larger and more accurate learning dataset and native dual pronunciation:

- **Complete 5,325 Oxford 3000 / 5000 Dataset**:
  - Fully replaced previous vocabulary data with the comprehensive `oxford_5000_full` dataset (5,325 distinct entries).
  - Primary key upgraded to unique `id` to properly represent words with multiple parts of speech or senses (e.g., `like` as verb vs. preposition).
  - 100% sentence example coverage: every single entry includes a dedicated, authentic contextual sentence.
  - Rich morphological data: full inflectional tables (`verb_forms` V1-V3/ING/S, `noun_forms`, `adjective_forms`), Arabic category classifications (`categories_ar`), and summary notes.
- **Native Dual Audio Pronunciation (UK & US)**:
  - 5,230 entries mapped to real British (UK) and American (US) native MP3 audio files.
  - Zero broken audio paths.
  - Documented missing audio (95 modern/tech entries such as Wi-Fi™ and AI) in `missing_audio.json`.
- **Integrated Audio Playback Buttons**:
  - Dedicated UK and US speaker buttons directly beside each word card.
  - Instant audio playback with single-audio playback concurrency (stops current audio before starting new).
  - Accessible, touch-friendly UI designed for mobile and desktop, with dynamic aria-labels and keyboard activation (`Enter` / `Space`).
  - Disabled and dimmed state for words without audio, ensuring a non-breaking offline experience.
- **Added Dutch Language Support**:
  - Full interface and vocabulary support for Dutch learners.
- **Project Support Button**:
  - Added a small, elegant multilingual project-support button in the footer.
- **Preserved Core Compatibility**:
  - Maintained complete offline usage, local progress, quizzes, custom notes, and synchronization.

---

## Update 1.1

Update 1.1 focuses on a clearer, more reliable learning experience:

- Added a guided tutorial organized into cards, progress, quiz, language, pronunciation, and tools sections. It explains the site step by step and keeps its panel inside the screen on desktop and mobile.
- Added a focused explanation for word forms. The new form guide explains when each verified form is used and how it differs from the others.
- Improved form accuracy by showing only non-base forms backed by a valid example. Words without verified forms no longer show an unnecessary forms section.
- Improved the language menu and popup layering so it cannot cover tutorial or explanation panels.
- Improved keyboard focus, touch behavior, button feedback, and small-screen toolbar layout for smoother control.
- Removed unwanted theme customization UI in favor of a cohesive, signature aesthetic.
- Kept progress, translations, review scheduling, sync, and offline behavior compatible with existing users.

Update 1.1 is still a static, account-free release: progress remains in the browser unless the learner exports or synchronizes it.

---

## Update 1.0

Update 1.0 was the initial public launch of the Oxford 5000 vocabulary system:

- 4,954 English words organized by CEFR levels from A1 to C1.
- A flashcard for every word with IPA pronunciation, meaning, and an example sentence.
- Spaced repetition (SRS) algorithm with five review stages and a dedicated queue for words you do not know yet.
- Multiple-choice review quiz: choose the correct meaning from four options.
- Fast, serverless synchronization: compact `OX6` binary sync links and update links to share progress across devices without an account.
- Multilingual interface supporting 11 languages (English, Arabic, Spanish, French, Portuguese, Russian, Turkish, Urdu, Hindi, Indonesian, Chinese).
- Local storage persistence: all progress and personal notes stored safely inside the user's browser.
- Single self-contained HTML distribution: completely functional offline after download.

---

## Why this project exists

Oxford's word lists are built around a practical idea: mastering the most useful high-frequency vocabulary can unlock a large part of everyday English. The Oxford 3000 and Oxford 5000 lists are commonly used as a clear learning target: learners who master these words can understand and express themselves much more confidently across real situations.

This project turns that goal into a simple, welcoming study experience. It is not a promise of instant fluency, and vocabulary is only one part of language learning, but knowing these words well gives learners a powerful foundation for reading, listening, speaking, and writing.

## Share the project

Use the live demo in a post, classroom resource, or learning group:

> A free offline-first English vocabulary app with 5,325 Oxford 3000/5000 words, dual UK/US native audio, speed race quiz, listening-only quiz, smart explorer, spaced repetition, and multiple-choice review: https://sofyanol.github.io/oxford-5000-words/

Please describe your own experience and invite useful feedback rather than posting the same link repeatedly.

## What you get

- **5,325 English words** organized by CEFR levels from A1 to C1.
- A flashcard for every word with IPA pronunciation, verified meaning, and authentic contextual example sentence.
- **Native UK and US pronunciation buttons** with 5,230 authentic audio files.
- **Three quiz modes**: Standard Multiple Choice, Speed Race Time Attack (+2s bonus & cat meow on mistake), and Audio-Only Listening Quiz.
- **Smart Word Explorer** with 8 sorting modes and filter chips for CEFR levels and parts of speech.
- **Custom Word & Example Editor**: edit any translation or sentence with automatic cloud sync persistence.
- **Spaced repetition (SRS)** with five review stages and a dedicated queue for words you do not know yet.
- Derived forms such as plurals, past forms, participles, comparatives, and superlatives with a dedicated usage guide.
- Known, unknown, and remaining-word lists grouped by difficulty.
- Floating layered star badge with a complete written site guide and changelog archive.
- Progress saved locally in the browser with zero accounts required.
- Fast link sync and compact OX6 sync codes without intermediate servers.
- An interface available in 12 languages.
- A single self-contained HTML build that works completely offline.

## Try it online

Open the live app:  
https://sofyanol.github.io/oxford-5000-words/

You can also download or host the generated HTML file yourself. No account is required to study, and your progress stays in your browser unless you export or synchronize it.

## Run locally

Requirements: Python 3.8 or newer. No Node.js or npm is required.

```bash
python build\build.py
```

The generated file is:  
`dist\oxford5000-flashcards-final.html`

Open it directly in any modern browser. For the built-in self-checks, open the file with `#selftest` and check the browser console for `SELFTEST PASS`.

## Publish it

The build produces a standalone HTML file, so it works on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static host.

For GitHub Pages:
1. Run `python build\build.py`.
2. Copy `dist\oxford5000-flashcards-final.html` to your publishing repository as `index.html`.
3. Enable Pages from the repository's main branch and root folder.
4. For future updates, rebuild and replace `index.html`. The public URL stays the same.

## Help this project reach more learners

If you find it useful:
- Try the live demo and share it with a learner or teacher.
- Star the repository so other learners can discover it.
- Open an issue with a translation correction, example-sentence suggestion, or accessibility improvement.
- Share a short progress update with the live link.

Contributions that improve clarity, correctness, and learning value are welcome. Please do not share private progress exports in issues or pull requests.

## Project structure

```text
oxford5000-app/
├─ src/             HTML structure, styles, and application logic
├─ data/            Words, examples, IPA, forms, and translations
├─ build/build.py   Creates the standalone HTML file
├─ tools/           Optional data and translation utilities
├─ docs/            Architecture, data, editing, and publishing notes
└─ dist/            Generated release file
```

## Translation and data notes

The interface includes English, Arabic, Spanish, French, German, Portuguese, Russian, Turkish, Urdu, Hindi, Indonesian, and Chinese. Machine-assisted translations are included for convenience and can be personalized directly inside the app using the new 1.3 Word Editor.

Oxford word-list content belongs to Oxford University Press. This project is an independent educational tool intended for personal learning.

## Support the project

If this project helps you, you can support its continued improvement through [PayPal](https://www.paypal.com/ncp/payment/HZXA4F94TEA2A).

## License and contributions

Code is released under the MIT License. Please read the data and usage notes before redistributing word-list data. For corrections or ideas, open an issue with a clear example and the affected language or word. See [CONTRIBUTING.md](oxford5000-app%201.3%20coding/CONTRIBUTING.md) for contribution guidelines.
