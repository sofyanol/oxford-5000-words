# Data Schema & Specifications

## 1. Core Vocabulary Dataset (data/words.json)

The vocabulary contains 5,325 entries covering the complete Oxford 3000 & 5000 word lists.
Each entry has:
- id: Unique integer identifier.
- word: The English headword.
- pos: Part of speech (e.g., , 
, dj, dv).
- cefr: European framework level (1, 2, 1, 2, c1).
- ipa_uk & ipa_us: International Phonetic Alphabet transcriptions.
- udio_uk & udio_us: Relative paths to native audio files.
- orms: Derived inflections (past, participle, -ing, plural, etc.).
- examples: Curated contextual example sentences.

## 2. Localization (data/i18n.json & data/tr/)

- i18n.json: Interface translation strings across 12 languages.
- 	r/<lang>.json: Direct translations of English headwords and example sentences.
