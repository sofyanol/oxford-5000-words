#!/usr/bin/env python3
"""Build the standalone Oxford 5000 flashcards file.

The app is developed as three readable files:

    src/index.html   structure (no data, links the two files below)
    src/styles.css   styles
    src/app.js       logic, with __PLACEHOLDER__ tokens for the data

This script inlines the CSS and the JS into one HTML file, replaces every
placeholder in app.js with the JSON in data/, and writes:

    dist/oxford5000-flashcards-final.html

Run from anywhere:

    python build/build.py

Options:

    --out <path>     write somewhere else
    --keep-js        keep a copy of the injected app.js in build/ (debugging)
"""

import argparse
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
DATA = ROOT / "data"
DIST = ROOT / "dist"

CSS_TAG = '<link rel="stylesheet" href="styles.css">'
JS_TAG = '<script src="app.js"></script>'


def read_text(path):
    return path.read_text(encoding="utf-8")


def dumps(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def inject(js, placeholder, data, required=True):
    n = js.count(placeholder)
    if n == 0 and not required:
        print("note: %s not found, skipped" % placeholder)
        return js
    if n != 1:
        sys.exit("error: %s must appear exactly once in app.js, found %d" % (placeholder, n))
    return js.replace(placeholder, data)


def pack_translations():
    """Merge data/tr/<lang>.json into index arrays aligned with the data files.

    The raw translation files are keyed by the English text, which would repeat
    every English word and sentence once per language inside the final HTML.
    Index arrays keep the file roughly half the size.
    """
    words = json.loads(read_text(DATA / "words_cefr.json"))["words"]
    sent_list = json.loads(read_text(DATA / "sent_list.json"))

    packs = {}
    tr_dir = DATA / "tr"
    if not tr_dir.is_dir():
        print("warning: data/tr is missing, no translations packed")
        return dumps(packs)
    for path in sorted(tr_dir.glob("*.json")):
        if path.stem.endswith("_w") or path.stem.endswith("_s"):
            continue  # intermediate progress files of translate.py
        code = path.stem
        try:
            data = json.loads(read_text(path))
        except Exception as exc:
            print("warning: skipping %s (%s)" % (path.name, exc))
            continue
        w = data.get("w") if isinstance(data, dict) else None
        s = data.get("s") if isinstance(data, dict) else None
        if not isinstance(w, dict) or not isinstance(s, dict):
            print("warning: skipping %s (expected {\"w\":{},\"s\":{}})" % path.name)
            continue
        packs[code] = {
            "w": [w.get(word, "") for word in words],
            "s": [s.get(sentence, "") for sentence in sent_list],
        }

    missing_words = sum(1 for v in packs.values() for x in v["w"] if not x)
    print("translations: %d languages (%s)" % (len(packs), ", ".join(sorted(packs))))
    print("translation gaps: %d word entries" % missing_words)
    return dumps(packs)


def validate_examples():
    """Report broken or missing example references without inventing content."""
    words = json.loads(read_text(DATA / "words_cefr.json"))["words"]
    sentences = json.loads(read_text(DATA / "sentences.json"))
    sent_list = json.loads(read_text(DATA / "sent_list.json"))
    forms = json.loads(read_text(DATA / "forms.json"))
    missing = [word for word in words if not str(sentences.get(word, "")).strip()]
    invalid = []
    for word, data in forms.items():
        for form in data.get("forms", []) if isinstance(data, dict) else []:
            example = form.get("ex")
            if example is not None and (not isinstance(example, int) or example < 0 or example >= len(sent_list)):
                invalid.append((word, example))
    if missing:
        print("example gaps: %d words have no sentence mapping" % len(missing))
    if invalid:
        sys.exit("error: %d form example indexes are invalid" % len(invalid))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None)
    ap.add_argument("--keep-js", action="store_true")
    args = ap.parse_args()

    html = read_text(SRC / "index.html")
    css = read_text(SRC / "styles.css")
    js = read_text(SRC / "app.js")

    if html.count(CSS_TAG) != 1:
        sys.exit("error: src/index.html must contain %s exactly once" % CSS_TAG)
    if html.count(JS_TAG) != 1:
        sys.exit("error: src/index.html must contain %s exactly once" % JS_TAG)

    js = inject(js, "__WORDS_JSON__", read_text(DATA / "words_cefr.json"))
    js = inject(js, "__I18N_JSON__", read_text(DATA / "i18n.json"))
    js = inject(js, "__SENTENCES_JSON__", read_text(DATA / "sentences.json"))
    js = inject(js, "__FORMS_JSON__", read_text(DATA / "forms.json"))
    js = inject(js, "__SENT_LIST_JSON__", read_text(DATA / "sent_list.json"))
    js = inject(js, "__TRANSLATIONS_JSON__", pack_translations())
    validate_examples()

    for token in ("__WORDS_JSON__", "__I18N_JSON__", "__SENTENCES_JSON__",
                  "__FORMS_JSON__", "__SENT_LIST_JSON__", "__TRANSLATIONS_JSON__"):
        if token in js:
            sys.exit("error: %s was not replaced" % token)

    if args.keep_js:
        (ROOT / "build" / "app.injected.js").write_text(js, encoding="utf-8")

    out = html.replace(CSS_TAG, "<style>\n" + css + "\n</style>")
    out = out.replace(JS_TAG, "<script>\n" + js + "\n</script>")

    # Embed the complete instructions inside the final file as an HTML comment.
    # Any AI or developer who opens the single HTML file sees the full guide in
    # view-source, even if it receives only that file without the rest of the folder.
    guide_path = ROOT / "START-HERE.md"
    if guide_path.is_file():
        guide = read_text(guide_path)
        if "-->" in guide:
            sys.exit("error: START-HERE.md must not contain --> (it is embedded in an HTML comment)")
        out = out.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!--\n" + guide + "\n-->", 1)
    else:
        print("warning: START-HERE.md is missing, the final file has no embedded guide")

    target = pathlib.Path(args.out) if args.out else DIST / "oxford5000-flashcards-final.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(out, encoding="utf-8")
    print("done -> %s (%.2f MB)" % (target, target.stat().st_size / 1048576))


if __name__ == "__main__":
    main()
