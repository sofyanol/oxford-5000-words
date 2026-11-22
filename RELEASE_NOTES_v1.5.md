# Oxford 5000 Words - Release Notes v1.5.0 (In Development)

## Overview
Update 1.5 represents the next evolutionary step of the Oxford 5000 Words offline-first vocabulary platform, focusing on robust security auditing, code quality verification, glitch prevention, and enhanced interactive learning features, building on top of the comprehensive v1.4 milestone.

---

## Key Highlights & Focus Areas

### 1. Code Quality & Security Auditing (SonarQube)
- Integration of automated static code analysis and security auditing.
- Prevention of client-side data corruption, XSS vulnerabilities, and memory leaks.
- Verification of ES6+ best practices and cleaner maintainability across the single-file codebase.

### 2. Full Update 1.4 Feature Foundation Preserved
- **Daily Habits & Streak Tracker (🔥)**: Continuous daily streak tracking and customizable goal targets.
- **Audio Articulation Speed Controls**: `1.0x`, `0.8x`, and `0.6x` playback selectors with optional auto-pronounce on navigation.
- **Interactive Spelling Quiz**: Active recall with cloze sentence hints, IPA, and native audio replay.
- **Word Match Challenge**: Memory pairs game against the clock with combo multipliers.
- **Visual Learning Analytics**: SVG CEFR pentagon radar chart and Leitner SRS review distribution.
- **Anki TSV Export**: Standard one-click export for spaced repetition in desktop/mobile Anki.
- **PWA Offline Support**: Fast offline installation with `manifest.webmanifest` and `sw.js`.
- **UX Refinements**: Sticky top navigation bar, luxury pill scrollbars, golden settings slider, deck-side search button, and balanced action toolbar.

---

## Technical Specifications
- **Architecture**: Single-file standalone HTML bundle (`dist/oxford5000-flashcards-final.html`).
- **Dependencies**: 0 external npm/CDN libraries (100% Vanilla HTML5, CSS3, ES6+ JavaScript).
- **Audio**: 10,460 authentic native MP3 pronunciation files (5,230 UK + 5,230 US).
- **Languages**: 12 fully supported locales (`en`, `ar`, `es`, `fr`, `de`, `pt`, `ru`, `tr`, `ur`, `hi`, `id`, `zh`).
- **PWA Cache**: `oxford5000-v1.5.0`.
