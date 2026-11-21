# Oxford 5000 Words - Update 1.3

A friendly, offline-first vocabulary companion for learners who want to build a strong English foundation one word at a time.

**Live demo:** https://sofyanol.github.io/oxford-5000-words/  
**Latest release:** [Update 1.3](https://github.com/sofyanol/oxford-5000-words/releases/tag/v1.3.0)

## Update 1.3

Update 1.3 focuses on deeper interactivity, active auditory learning, dynamic speed challenges, and comprehensive vocabulary exploration:

### Highlights

- **Speed Race Mode (Time Attack / سباق الوقت)**:
  - An energetic time-attack quiz mode starting with a 30-second timer.
  - Every correct answer rewards the learner with **+2 bonus seconds** with an animated green indicator (`+2s`) to keep the study flow going.
  - Mistakes trigger a gentle, friendly **cat meow sound** (`playCatSound`) along with an immediate warning flash, automatically advancing to the next question without breaking momentum.
  - Dynamic urgent pulse indicator when time drops below 6 seconds.

- **Audio-Only Listening Quiz Mode (اختبار عبر السمع فقط)**:
  - A dedicated listening-first training mode where the learner listens to native English pronunciation without seeing the written word.
  - Automatically plays British (UK) or American (US) audio upon entering each question, with a prominent repeat-listening button.
  - Four multiple-choice meaning options in the learner's chosen language.
  - Once answered, the hidden word is revealed in a smooth glowing banner displaying the word, its part of speech, and phonetic IPA.

- **Smart Word Explorer & Advanced Search (مستكشف الكلمات والبحث الذكي)**:
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

- **Custom Word, Sentence, and Forms Editor (محرر الكلمات والترجمة والمثال)**:
  - Learners can directly customize and correct word translations, example sentences, example translations, and grammatical forms.
  - All user customizations are preserved locally and seamlessly encoded into OX6 cloud synchronization links, ensuring personal corrections never get lost.
  - Custom indicator badge on cards showing when personalized content is active, with a one-click reset to Oxford defaults.

- **Floating "What's New" Star Badge & Complete Written Site Guide (نجمة ما الجديد ودليل الموقع الشامل)**:
  - A circular floating button anchored opposite the support coffee button, featuring a layered white star in front of a glowing golden star.
  - Clicking opens an all-in-one guide and release portal organized into 3 tabs:
    1. **🌟 What's New in 1.3**: Complete overview of all new features, speed race, and listening mode.
    2. **📖 Complete Site Guide**: A thorough, written manual explaining every component on the site: Flashcards, SRS Spaced Repetition stages 0-5, Word Forms & Grammar, Quiz Modes, Explorer, Sync, and Offline Architecture.
    3. **📜 Changelog Archive**: Detailed chronological history covering releases 1.0, 1.1, 1.2, and 1.3.

- **Gorgeous Golden Text Selection (تنسيق تحديد النصوص)**:
  - Custom styling for highlighting and copying text across words, sentences, and translations with a soft golden glow and clean contrast.

- **Interactive Fluid Visuals & Glow Effects (تفاعلية العناصر والخلفية)**:
  - Responsive, fluid background with subtle ambient gradients.
  - Gentle lift and glowing effects on card and button interactions.
  - Unobtrusive reminder toast near flashcards indicating examples may vary and can be customized.

- **Perfect Social Icon Alignment & Polished Layout (توسيط الأيقونات وتنسيق الدعم)**:
  - Pixel-perfect centering for GitHub, X, and LinkedIn footer icons.
  - Refined mobile-responsive spacing for project tools and support actions.

### Verification

- Build passes with `python build\build.py`.
- Standalone HTML release: `dist\oxford5000-flashcards-final.html` and `publish\index.html`.
- Dataset check: 5,325 entries, 0 missing examples, 0 broken audio paths.
- Audio coverage: 5,230 UK and 5,230 US authentic Oxford sound recordings.
- Browser self-test passes (`#selftest` console log: `SELFTEST PASS`).

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

Code is released under the MIT License. Please read the data and usage notes before redistributing word-list data. For corrections or ideas, open an issue with a clear example and the affected language or word. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
