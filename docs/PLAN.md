# Delivery Plan

## Goal

Keep Oxford 5000 easy to continue across agents while preserving its
offline-first standalone release, learning behavior, multilingual interface,
and existing learner progress.

## Stages

1. **Orient:** Read the canonical handoff, tasks, and decisions; inspect Git
   state and validate the baseline build/self-test.
2. **Implement one focused task:** Change only the relevant source or data,
   following existing i18n, state, and rendering patterns.
3. **Validate:** Run the build, browser self-test, and focused manual checks
   relevant to the change.
4. **Document and deliver:** Update handoff/task/decision records, rebuild the
   standalone file, and make a small clear commit when Git is available.

## Release boundary

`src/` and `data/` are the source of truth. `dist/` is generated locally.
`publish/` is the static-host copy and must only be refreshed from a verified
build when preparing a release.
