# How to Edit & Contribute

## Prerequisites

- Python 3.8 or newer.
- No Node.js or npm dependencies required.

## Development Workflow

1. Modify source files in src/ (index.html, styles.css, pp.js).
2. Update datasets in data/ if needed.
3. Rebuild the release bundles:
   `powershell
   python build/build.py
   `
4. Verify by opening in browser:
   `	ext
   dist/oxford5000-flashcards-final.html#selftest
   `
   Check the browser console to confirm SELFTEST PASS.
