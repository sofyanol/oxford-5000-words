# Oxford 5000 Words

[![Live demo](https://img.shields.io/badge/try-live%20demo-2ea44f)](https://sofyanol.github.io/oxford-5000-words/)
[![Latest release](https://img.shields.io/github/v/release/sofyanol/oxford-5000-words?label=latest%20release)](https://github.com/sofyanol/oxford-5000-words/releases/latest)
[![License](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

> A friendly, offline-first vocabulary companion for learners who want to build
> a strong English foundation one word at a time.

**Live demo:** https://sofyanol.github.io/oxford-5000-words/

**Latest release:** [Update 1.1](https://github.com/sofyanol/oxford-5000-words/releases/tag/v1.1.0)

## Update 1.1

Update 1.1 focuses on a clearer, more reliable learning experience:

- Added a guided tutorial organized into cards, progress, quiz, language,
  pronunciation, and tools sections. It explains the site step by step and
  keeps its panel inside the screen on desktop and mobile.
- Added a focused explanation for word forms. The new form guide explains when
  each verified form is used and how it differs from the others.
- Improved form accuracy by showing only non-base forms backed by a valid
  example. Words without verified forms no longer show an unnecessary forms
  section.
- Improved the language menu and popup layering so it cannot cover tutorial or
  explanation panels.
- Improved keyboard focus, touch behavior, button feedback, and small-screen
  toolbar layout for smoother control.
- Kept progress, translations, review scheduling, sync, and offline behavior
  compatible with existing users.

Update 1.1 is still a static, account-free release: progress remains in the
browser unless the learner exports or synchronizes it.

## Why this project exists

Oxford's word lists are built around a practical idea: mastering the most useful
high-frequency vocabulary can unlock a large part of everyday English. The
Oxford 3000 and Oxford 5000 lists are commonly used as a clear learning target:
learners who master these words can understand and express themselves much more
confidently across real situations.

This project turns that goal into a simple, welcoming study experience. It is
not a promise of instant fluency, and vocabulary is only one part of language
learning, but knowing these words well gives learners a powerful foundation for
reading, listening, speaking, and writing.

## Share the project

Use the live demo in a post, classroom resource, or learning group:

> A free offline-first English vocabulary app with 4,954 Oxford 3000/5000
> words, examples, pronunciation, spaced repetition, and multiple-choice
> review: https://sofyanol.github.io/oxford-5000-words/

Please describe your own experience and invite useful feedback rather than
posting the same link repeatedly.

## What you get

- 4,954 English words organized by CEFR levels from A1 to C1.
- A flashcard for every word with IPA pronunciation, meaning, and an example sentence.
- Derived forms such as plurals, past forms, participles, comparatives, and superlatives.
- English pronunciation buttons for words and example sentences when the browser provides speech voices.
- A multiple-choice review quiz: choose the correct meaning from four options.
- Spaced repetition with five review stages and a dedicated queue for words you do not know yet.
- Known, unknown, and remaining-word lists grouped by difficulty.
- Search by English word, translation, or personal note.
- Progress saved locally in the browser.
- Export, import, full-link sync, update-link sync, and compact OX6 sync codes.
- An interface available in 11 languages.
- A single self-contained HTML build that works offline after it is generated.

## Try it online

Open the live app:

**https://sofyanol.github.io/oxford-5000-words/**

You can also download or host the generated HTML file yourself. No account is
required to study, and your progress stays in your browser unless you export
or synchronize it.

## Run locally

Requirements: Python 3.8 or newer. No Node.js or npm is required.

```powershell
python build\build.py
```

The generated file is:

```text
dist\oxford5000-flashcards-final.html
```

Open it directly in a browser. For the built-in checks, open the file with
`#selftest` and check the browser console for `SELFTEST PASS`.

## Publish it

The build produces a standalone HTML file, so it works on GitHub Pages,
Cloudflare Pages, Netlify, Vercel, or any static host.

For GitHub Pages:

1. Run `python build\build.py`.
2. Copy `dist\oxford5000-flashcards-final.html` to a publishing repository as
   `index.html`.
3. Enable Pages from the repository's `main` branch and root folder.

For future updates, rebuild and replace `index.html`. The public URL stays the
same.

## Help this project reach more learners

If you find it useful:

- Try the live demo and share it with a learner or teacher.
- Star the repository so other learners can discover it.
- Open an issue with a translation correction, example-sentence suggestion, or
  accessibility improvement.
- Share a short progress update with the live link.
- Contributions that improve clarity, correctness, and learning value are welcome.

Please do not share private progress exports or bot tokens in issues or pull
requests.

## Project structure

```text
oxford5000-app/
├─ src/                    HTML structure, styles, and application logic
├─ data/                   Words, examples, IPA, forms, and translations
├─ build/build.py          Creates the standalone HTML file
├─ tools/                  Optional data and translation utilities
├─ docs/                   Architecture, data, editing, and publishing notes
└─ dist/                   Generated release file
```

## Translation and data notes

The interface includes English, Arabic, French, Spanish, Portuguese, Russian,
Turkish, Urdu, Hindi, Indonesian, and Chinese. Machine-generated translations
are included for convenience and should be reviewed by fluent speakers before
formal or commercial use. The project includes an audit tool for finding
missing or suspicious entries, but automated checks cannot replace a human
language review.

Oxford word-list content belongs to Oxford University Press. This project is an
independent educational tool and is intended for personal learning. See
`docs\DATA.md` for data sources and limitations.

## Support the project

If this project helps you, you can support its continued improvement through
[PayPal](https://www.paypal.com/ncp/payment/HZXA4F94TEA2A). You never need to
share banking details in an issue or pull request.

## License and contributions

Please read the data and usage notes before redistributing the word-list data.
For corrections or ideas, open an issue with a clear example and the affected
language or word. See [CONTRIBUTING.md](CONTRIBUTING.md) for the development
workflow.

Original project code is available under the [MIT License](LICENSE). See
[NOTICE.md](NOTICE.md) for the distinction between original code and
third-party data.
