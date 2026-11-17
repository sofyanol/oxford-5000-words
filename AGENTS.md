# Oxford 5000 Agent Guide

## Project

Oxford 5000 is an offline-first English vocabulary flashcard app. It contains
4,954 Oxford 3000/5000 words, CEFR levels A1-C1, examples, IPA, word forms,
translations, spaced review, multiple-choice review, search, progress export,
and static-link synchronization. The generated release is one standalone HTML
file and needs no server or account.

The source is plain HTML, CSS, JavaScript, JSON, and Python. There is no
Node.js/npm workflow. Python 3.8+ is required for the build.

## Commands

Run from the repository root:

```powershell
python build\build.py
```

This writes `dist\oxford5000-flashcards-final.html`. To run the built-in checks,
serve the root and open
`http://127.0.0.1:8765/dist/oxford5000-flashcards-final.html#selftest`; the
browser console must print `SELFTEST PASS`.

```powershell
python -m http.server 8765
```

There is currently no separate test runner. The build reports translation gaps
and example gaps without inventing data; invalid form indexes fail the build.

## Code and data rules

- Edit `src/` and `data/`; do not hand-edit generated `dist/` output.
- Keep visible interface text in `data/i18n.json` and add all supported-language
  keys together. Preserve `{n}` placeholders and RTL support for Arabic and
  Urdu.
- Keep English example text left-to-right even when the interface is RTL.
- Preserve the standalone, offline-capable output and existing local-progress
  compatibility.
- Reuse existing naming, rendering, state, and validation patterns. Avoid
  unrelated refactors and do not claim machine translations are human-reviewed.
- Word forms shown to learners must have a valid example reference. Do not
  invent example sentences or translations.

## Repository map

- `src/`: HTML structure, CSS, and application logic.
- `data/`: word list, examples, forms, IPA, CEFR, translations, and audits.
- `build/build.py`: injects data and source into the standalone HTML.
- `tools/`: optional data and audit utilities.
- `docs/`: architecture, data, publishing, plans, tasks, decisions, and handoff.
- `dist/`: generated local build output.
- `publish/`: static-host publication copy and issue templates.
- `START-HERE.md`: legacy detailed project guide; use the canonical handoff files
  in `docs/` first.

## Agent protocol

When starting any session, do this without being asked:

1. Read `docs/HANDOFF.md`, then `docs/TASKS.md`, then `docs/DECISIONS.md`.
2. Run `git log --oneline -15` and `git status` to understand recent work.
3. Run the tests to confirm the baseline is healthy before starting.
4. Follow the existing code style, structure, and patterns; do not impose a new
   style.
5. Take one task from `TASKS.md`, record yourself on it, and work on an
   independent branch.
6. Make small commits with clear messages.
7. Before ending or stopping: update `HANDOFF.md` and `TASKS.md`, and record any
   important decision and its reason in `DECISIONS.md`.
8. If the user says “open the project” or “continue”, execute these steps.

If Git is unavailable or the folder is not a Git repository, record that blocker
in the handoff instead of fabricating branch or commit state.

## Delivery checklist

- Build succeeds with `python build\build.py`.
- Browser self-test prints `SELFTEST PASS` with no console errors.
- No placeholder tokens remain in the generated HTML.
- Test Arabic and English, a regular/irregular word form, language switching,
  search, quiz, and progress handling when the change affects them.
- Update the relevant docs before handoff.
