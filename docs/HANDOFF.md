# Handoff

## Last updated

2026-11-17 — documentation handoff system added.

## Current agent

Copilot SDK in VS Code.

## Completed

- Update 1.1 was built and published as GitHub release `v1.1.0`.
- The live static site is `https://sofyanol.github.io/oxford-5000-words/`.
- The current source includes guided onboarding, responsive tutorial positioning,
  word-form explanations, validated form display, multiple-choice review,
  translations, progress storage, and static synchronization.
- Agent guidance and canonical handoff files now exist.

## Files affected by this handoff work

- `AGENTS.md`
- `CLAUDE.md`
- `.github/copilot-instructions.md`
- `.cursor/rules/AGENTS.md`
- `docs/HANDOFF.md`
- `docs/TASKS.md`
- `docs/PLAN.md`
- `docs/DECISIONS.md`
- `docs/AGENT-HANDOFF.md` remains as older historical documentation.

No application source or data files were changed.

## Next step

Choose one pending task in `docs/TASKS.md`, record the owner and status, then
make the smallest focused change. Validate with the build and browser self-test.

## Open issues and constraints

- This working folder is not currently a Git repository and `git` is not
  available on PATH, so branch and commit operations cannot be performed here.
- The build reports 92 words without an example mapping and one missing word
  translation entry; these are data gaps, not build failures.
- Machine-generated translations still require fluent-speaker review.

## Verification

The baseline build passed on 2026-11-17:

```powershell
python build\build.py
```

It produced `dist\oxford5000-flashcards-final.html`. Browser verification remains
the required second step: serve the root with `python -m http.server 8765`, open
the generated file with `#selftest`, and confirm `SELFTEST PASS` with no console
errors.
