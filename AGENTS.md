# Oxford 5000 - AI Agent Directives & Project Guide

## 1. Core Mandates Established by the Owner

- **Autonomous Release Trigger ("اطلق التحديث" / "انشر التحديث")**: The project owner does not write code or technical commands. Whenever the user asks to release or publish the update (e.g., "اطلق التحديث", "انشر التحديث", "publish update"), the agent MUST automatically run `python tools/publish_and_bump.py --publish`. This single command tests, tags, and pushes the release to GitHub master/main, archives the current version in `0- update/`, renames the folder, and automatically prepares all files for the next version without user intervention.
- **100% English Language Policy**: All repository-facing assets (README, source code comments, markdown docs, commit messages, PRs, issues) MUST be written in 100% English. Never use Arabic in repository code comments or documentation. (Arabic is provided only as a dynamic in-app translation for end users).
- **Standalone Offline-First Architecture**: Single standalone HTML build with no server, zero tracking, and no external npm/Node dependencies. User state resides solely in `localStorage`.
- **Dataset & Audio Coverage**: 5,325 verified English words across CEFR levels A1-C1 with 10,460 native MP3 recordings (5,230 UK + 5,230 US) located in `audio/`.
- **Supported Languages (12 Languages)**: English, Arabic, Spanish, French, German, Portuguese, Russian, Turkish, Urdu, Hindi, Indonesian, and Chinese.
- **GitHub Pages & Actions Pipeline**: Deployed at `https://sofyanol.github.io/oxford-5000-words/` from branch `master`. The `.github/workflows/pages.yml` must keep `build` and `deploy` separate jobs with `needs: build` to allow 384MB audio indexing. Both `master` and `main` branches must stay synchronized.
- **Support & Topics**: PayPal link `https://www.paypal.com/ncp/payment/HZXA4F94TEA2A`. High-traffic tags only.

## 2. Build & Test Commands

Run from project root:
```powershell
python build\build.py
```
This updates `dist\oxford5000-flashcards-final.html` and `publish\index.html`.
Copy `publish\index.html` to root `index.html`.

To verify changes:
Serve the project and open with `#selftest`:
`http://127.0.0.1:8765/dist/oxford5000-flashcards-final.html#selftest`
Verify the browser console prints `SELFTEST PASS` without errors.

## 3. Directory Map

- `src/`: Core HTML skeleton, CSS3 stylesheet, and ES6+ JavaScript.
- `data/`: Core vocabulary (`words.json`), UI localization (`i18n.json`), translations (`tr/*.json`).
- `audio/`: 10,460 native MP3 recordings (UK and US).
- `build/`: Python build script `build.py`.
- `dist/`: Standalone compiled application.
- `publish/`: Deployment bundle for GitHub Pages.
- `docs/`: Technical records, guides, and architectural decisions.
- `GEMINI.md`: Full canonical guidelines for AI agents.
