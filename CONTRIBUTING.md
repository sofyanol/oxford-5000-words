# Contributing to Oxford 5000 Words

Thank you for helping make English learning clearer and more accessible.

## Good ways to help

- Report an incorrect example, translation, IPA entry, or CEFR level.
- Suggest an accessibility or usability improvement.
- Improve documentation or the build instructions.
- Test the app on another browser or device and report what you find.

## Before opening an issue

Please search existing issues first. For language feedback, include:

- the English word or example sentence;
- the affected language;
- the current text;
- a suggested correction and a short explanation;
- the browser and device, if the issue is technical.

Please do not include private progress exports, passwords, API keys, or bot
tokens in issues or pull requests.

## Local development

The project is plain HTML, CSS, JavaScript, JSON, and Python:

```powershell
python build\build.py
```

The generated release file is
`dist\oxford5000-flashcards-final.html`. Open it with `#selftest` and check the
browser console for `SELFTEST PASS`.

Edit files in `src/` and `data/`, not the generated file in `dist/`. Keep
visible interface text in `data/i18n.json`, and rebuild after source changes.

## Pull requests

Keep pull requests focused and explain:

1. what changed;
2. why it helps learners;
3. how it was tested.

Please avoid presenting machine-generated translations as professional
translations without fluent-speaker review.
