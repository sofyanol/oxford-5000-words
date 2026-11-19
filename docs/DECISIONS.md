# Decisions

## 2026-11-19 — Floating coffee support button

- **Decision:** Show a fixed, accessible coffee-support control in the corner,
  translate it through `data/i18n.json`, and link it to the existing PayPal
  support URL.
- **Reason:** Keep the support action visible across screens and languages
  without changing the main learning flow or requiring account-based payments.

## 2026-11-19 — Replace vocabulary dataset with Oxford 5000 Full (5,325 entries) and audio binding

- **Decision:** Replace previous word, sentence, and form data files with `data/words.json` containing 5,325 entries from `oxford_5000_full.json`, with primary key `id`, dedicated 1:1 example sentences per entry, and bindings to UK and US offline audio files (`audio_uk`, `audio_us`).
- **Reason:** Upgrades vocabulary coverage to full Oxford 3000/5000 with rich POS, sense, and form classifications, while providing authentic native pronunciations with dedicated touch buttons.

## 2026-11-17 — Canonical agent handoff files

- **Decision:** `AGENTS.md` is the single source of repository instructions.
  `CLAUDE.md`, Copilot instructions, and Cursor rules point to it instead of
  copying its content.
- **Reason:** Every coding agent should receive the same concise, current rules
  while avoiding conflicting duplicated instructions.

## 2026-11-17 — Keep the standalone build

- **Decision:** Continue injecting source and data into one generated HTML file.
- **Reason:** The app must work offline, without an account or runtime server, and
  must remain deployable to static hosts.

## 2026-11-17 — Browser self-test is the test contract

- **Decision:** Use `python build\build.py` plus the generated file's `#selftest`
  check as the current validation contract.
- **Reason:** The project has no Node/npm test runner; `selfTest()` already covers
  state, i18n, forms, quiz, synchronization, and rendering invariants.

## 2026-11-17 — Preserve existing learner behavior

- **Decision:** Changes must preserve local progress, translations, spaced review,
  multiple-choice review, and static synchronization unless a task explicitly
  changes one of them.
- **Reason:** Existing learners depend on browser-stored progress and the app is
  designed for account-free use.

## 2026-11-17 — Do not invent language data

- **Decision:** New examples, forms, and translations require source evidence or
  explicit human review; build warnings must remain visible.
- **Reason:** Automated translation and incomplete example mappings are known
  limitations, and silently filling gaps would reduce learning accuracy.
