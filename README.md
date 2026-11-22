<div align="center">

# 🌟 Oxford 5000 Words
### 🎓 The Modern, Offline-First English Vocabulary Companion

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-2ea44f?style=for-the-badge)](https://sofyanol.github.io/oxford-5000-words/)
[![Latest Release](https://img.shields.io/github/v/release/sofyanol/oxford-5000-words?color=e5a93c&label=🌟%20Release&style=for-the-badge)](https://github.com/sofyanol/oxford-5000-words/releases/latest)
[![GitHub Stars](https://img.shields.io/github/stars/sofyanol/oxford-5000-words?style=for-the-badge&logo=github&color=gold)](https://github.com/sofyanol/oxford-5000-words/stargazers)
[![Donate with PayPal](https://img.shields.io/badge/☕_Support-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/ncp/payment/HZXA4F94TEA2A)

[![Words](https://img.shields.io/badge/📚_Vocabulary-5%2C325_Oxford_Words-blue?style=flat-square)](#)
[![Audio](https://img.shields.io/badge/🔊_Native_Audio-10%2C460_Recordings_(UK_%26_US)-teal?style=flat-square)](#)
[![Algorithm](https://img.shields.io/badge/🧠_Spaced_Repetition-SRS_5_Stages-purple?style=flat-square)](#)
[![Languages](https://img.shields.io/badge/🌐_Languages-12_Global_Locales-orange?style=flat-square)](#)
[![Offline First](https://img.shields.io/badge/⚡_Zero_Backend-100%25_Offline_First-success?style=flat-square)](#)
[![Dependencies](https://img.shields.io/badge/📦_Dependencies-Zero_(Vanilla_HTML5%2FCSS3%2FJS)-black?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/⚖️_License-MIT-lightgrey?style=flat-square)](LICENSE)

<br>

**A fast, private, distraction-free educational application built to master high-frequency English vocabulary through scientifically structured spaced repetition (SRS), authentic dual UK/US native audio, and active listening challenges.**

[🔗 **Open Live App**](https://sofyanol.github.io/oxford-5000-words/) • [✨ **What's New in 1.4**](#-whats-new-in-update-14) • [🎯 **Features**](#-features-at-a-glance) • [🌐 **12 Languages**](#-supported-languages-12-locales) • [☕ **Support Project**](#-support-the-project)

<hr>
</div>

## 🌟 What's New in Update 1.4

Update 1.4 introduces powerful new learning habits, audio controls, an interactive spelling quiz, memory mini-game, visual learning analytics, and full PWA installation:

* 🔥 **Daily Study Habit, Goals & Streak Counter**: Track daily study streaks in `localStorage`, set daily card targets (10, 20, 50, or 100), and enjoy a joyful confetti celebration when reaching your daily goal.
* 🎚️ **Audio Playback Speed & Auto-Pronounce**: Toggle audio speeds (`1.0x`, `0.8x`, `0.6x`) on pronunciation buttons for clear slow articulation, plus an optional Auto-Pronounce on card navigation preference.
* ✍️ **Interactive Spelling & Writing Quiz Mode**: Test active recall by listening to audio, reading contextual cloze sentences, and typing the missing word with phonetic IPA hints.
* 🧩 **Fast-Paced Word Match Challenge**: An engaging memory-match mini-game against a 45s timer with Web Audio sound effects, combo multipliers, and celebration animations.
* 📊 **Visual Learning Analytics & CEFR Radar**: Track vocabulary mastery balance with an interactive SVG pentagon radar chart, CEFR level breakdown (A1-C1), Leitner SRS distribution, and high scores.
* 📇 **One-Click Export to Anki (TSV)**: Export Unknown words, Due reviews, or custom sets into Anki-ready TSV files with standard import headers and UTF-8 BOM.
* 📱 **Progressive Web App (PWA) Offline Support**: Installable on desktop and mobile home screens with `manifest.webmanifest` and cache-first `sw.js` for 100% offline access.
* 📌 **Sticky Top Bar & Balanced Action Grid**: Unified header stays persistent on scroll with blurred backdrop filter; bottom toolbar organized into a balanced 2-tier grid with deck-side search companion.
* 🎨 **Luxury Scrollbars & Golden Slider**: Custom slim 5px/6px pill scrollbars across the card, modals, and lists, plus a brand-consistent golden range slider in settings.
* ⚡ **Core Fixes & Polished UI**: Fixed Unknown words export sort exceptions, instant visual undo rollback, Listening Quiz token sanitization, and 12-language localization updates.

---

### Previous Highlights (Update 1.3)

Update 1.3 focuses on deeper interactivity, active auditory training, dynamic speed challenges, and comprehensive vocabulary exploration:

* ⚡ **Speed Race Mode (Time Attack)**:
  * Fast-paced 30-second countdown quiz mode designed to test rapid vocabulary recall.
  * Every correct answer awards **+2 bonus seconds** with an animated green float badge (`+2s`).
  * Mistakes trigger an adorable **cat meow sound** (`playCatSound`) and an instant warning flash, automatically advancing to keep your learning momentum alive.
  * Dynamic urgent pulse indicator activates when time drops under 6 seconds.

* 🎧 **Audio-Only Listening Quiz Mode**:
  * Dedicated ear-training mode: listen to authentic native English UK/US pronunciation without seeing the written word.
  * Automatic audio playback on question entry with an animated listening pulse and instant replay button.
  * Select the correct meaning from 4 multiple-choice options, followed by a glowing reveal of the hidden English word with its phonetic IPA and part of speech.

* 🔍 **Smart Word Explorer & Advanced Search**:
  * An interactive exploration modal featuring **8 comprehensive sorting algorithms**:
    1. Alphabetical (A to Z)
    2. Alphabetical reverse (Z to A)
    3. CEFR Level (A1 to C1)
    4. CEFR Level reverse (C1 to A1)
    5. Unknown Words First
    6. Due for Review First (SRS)
    7. Mastered / Known Words First
    8. Oxford Frequency / Importance & Random Shuffle
  * Interactive filter chips for CEFR difficulty levels (A1, A2, B1, B2, C1) and Parts of Speech (Verbs, Nouns, Adjectives, Others).
  * Rich cards with IPA, category classifications, audio preview, and one-click direct jump to any card in the study deck.

* ✏️ **Custom Word, Sentence, and Forms Editor**:
  * Directly edit or customize translations, example sentences, example translations, and grammatical forms.
  * User modifications persist in browser storage and encode cleanly into compact OX6 sync links—your personal customizations never get lost.
  * Includes a card indicator badge for customized entries and a one-click reset to Oxford defaults.

* ⭐ **Floating "What's New" Star Badge & Complete Written Site Guide**:
  * Circular floating badge anchored on screen with a layered white star over a glowing golden star.
  * Opens an all-in-one 3-tab modal: What's New in 1.3, Comprehensive Site Guide (explaining SRS stages, word forms, quizzes, and sync), and a cumulative Changelog Archive.

* ✨ **Visual & Layout Polishing**:
  * Custom golden text selection highlighting for copying words and examples.
  * Ambient responsive gradient background and interactive button glow effects.
  * Pixel-perfect centering for GitHub, X, and LinkedIn footer icons.

<hr>

## 🎯 Features at a Glance

| Feature | Description |
| :--- | :--- |
| 📚 **5,325 Oxford Words** | Complete Oxford 3000 & Oxford 5000 dataset categorized across CEFR levels A1, A2, B1, B2, and C1. |
| 🔊 **Dual Native Audio** | 5,230 authentic UK (British) and US (American) native pronunciation recordings (10,460 files). |
| 📝 **100% Contextual Sentences** | Every single entry includes an authentic contextual example sentence. |
| 🧠 **Spaced Repetition (SRS)** | 5 scientifically structured review intervals (1d, 3d, 7d, 14d, 30d) for long-term memory retention. |
| 🎮 **3 Study Modes** | Standard Multiple Choice, Speed Race (Time Attack), and Audio-Only Listening. |
| 📐 **Word Forms & Grammar** | Complete verb inflections (V1-V3, -ing, -s), noun plurals, and comparative/superlative adjectives. |
| 🔄 **Serverless Link Sync** | Instant bidirectional synchronization using compact `OX6` binary codes without an account or server. |
| 🌐 **12 Global Languages** | Fully localized interface and word translations across 12 world languages. |
| ⚡ **Offline-First Build** | Fully self-contained single HTML release file (~4.14 MB) that runs anywhere without internet. |

<hr>

## 🌐 Supported Languages (12 Locales)

Oxford 5000 is built for learners worldwide. Switch instantly between 12 localized interface and translation languages with a single click:

| Flag | Language | Native Name | Code |
| :---: | :--- | :--- | :---: |
| 🇬🇧 | **English** | English | `en` |
| 🇸🇦 | **Arabic** | العربية | `ar` |
| 🇪🇸 | **Spanish** | Español | `es` |
| 🇫🇷 | **French** | Français | `fr` |
| 🇩🇪 | **German** | Deutsch | `de` |
| 🇵🇹 | **Portuguese** | Português | `pt` |
| 🇷🇺 | **Russian** | Русский | `ru` |
| 🇹🇷 | **Turkish** | Türkçe | `tr` |
| 🇵🇰 | **Urdu** | اردو | `ur` |
| 🇮🇳 | **Hindi** | हिन्दी | `hi` |
| 🇮🇩 | **Indonesian** | Bahasa Indonesia | `id` |
| 🇨🇳 | **Chinese** | 中文 | `zh` |

<hr>

## ☕ Support the Project

If Oxford 5000 helps you learn English, prepare for exams (IELTS, TOEFL, Cambridge), or teach students, please consider supporting its ongoing development and maintenance!

<div align="center">

[![Donate with PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/ncp/payment/HZXA4F94TEA2A)

[![Donate via PayPal](https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/ncp/payment/HZXA4F94TEA2A)

*Your contributions help keep this project 100% free, privacy-first, and ad-free.*

</div>

<hr>

## 📜 Previous Release Highlights

<details>
<summary><b>📦 Update 1.2 — Full Dataset & Native Dual Pronunciation</b></summary>
<br>

- Expanded vocabulary dataset to **5,325 Oxford entries** with unique `id` primary keys.
- Mapped **5,230 entries to authentic UK and US native MP3 recordings**.
- Dedicated example sentence for every single entry (100% coverage).
- Added Dutch language support and compact multilingual project-support button.
</details>

<details>
<summary><b>🧭 Update 1.1 — Guided Tutorial & Word Forms Guide</b></summary>
<br>

- Added 5-step guided interactive tutorial explaining cards, progress, quizzes, and language.
- Added dedicated word-form explanation modal detailing grammatical inflections.
- Improved modal viewport safety and touch controls on mobile devices.
</details>

<details>
<summary><b>🌱 Update 1.0 — Initial Release</b></summary>
<br>

- Initial launch with 4,954 Oxford words, SRS algorithm, and serverless OX6 sync.
</details>

<hr>

## 🚀 Try It Online & Run Locally

### 🌐 Live Web App
Open directly in any modern browser:  
👉 **[https://sofyanol.github.io/oxford-5000-words/](https://sofyanol.github.io/oxford-5000-words/)**

### 💻 Run Locally
Requirements: **Python 3.8+** (Zero Node.js or npm dependencies required).

```powershell
# Build standalone HTML bundle
python build\build.py
```

The output file is:
```text
dist\oxford5000-flashcards-final.html
```
Open it directly in Chrome, Firefox, Safari, or Edge.  
To run automated in-browser self-tests, open `dist\oxford5000-flashcards-final.html#selftest` and verify `SELFTEST PASS` in the console.

### 🚢 Deploy to GitHub Pages
1. Run `python build\build.py`.
2. Push your changes to `master` or `main`.
3. The built-in GitHub Actions workflow (`.github/workflows/pages.yml`) will automatically deploy the site.

<hr>

## 📁 Project Structure

```text
oxford5000-app/
├─ src/                      HTML structure, modern CSS styles, and application logic
├─ data/                     5,325 words, IPA, translations, and forms dataset
├─ audio/                    5,230 UK and 5,230 US native Oxford pronunciation files
├─ build/build.py            Single-command standalone HTML release builder
├─ dist/                     Generated release files (single-file distribution)
├─ publish/                  Publishing deployment files
├─ docs/                     Architecture, data guidelines, and changelogs
├─ ALL_UPDATES_CHANGELOG.md  Master historical changelog from 1.0 to 1.4
└─ RELEASE_NOTES_v1.4.md     Dedicated 1.4 release notes
```

<hr>

## 🤝 Contributing & Community

Contributions that improve vocabulary accuracy, phonetic transcriptions, translations, and learning accessibility are warmly welcomed:
- 💡 **Found a typo or better translation?** Open an issue or submit a pull request!
- ⭐ **Star this repository** to help other language learners discover it.
- 📢 **Share with friends and classmates** who are learning English.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

<hr>

## ⚖️ License & Data Attribution

- Code is released under the **[MIT License](LICENSE)**.
- Oxford word lists belong to Oxford University Press. This project is an independent educational tool created for personal learning. See [NOTICE.md](NOTICE.md) for data distinctions.
