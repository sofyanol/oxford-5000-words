#!/usr/bin/env python3
"""Build the standalone Oxford 5000 flashcards file.

The app is developed as three readable files:
    src/index.html   structure
    src/styles.css   styles
    src/app.js       logic

This script inlines the CSS and JS into one standalone HTML file, replaces
placeholders with JSON from data/, and writes:
    dist/oxford5000-flashcards-final.html
    publish/index.html
"""

import argparse
import json
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
DATA = ROOT / "data"
DIST = ROOT / "dist"
PUBLISH = ROOT / "publish"
AUDIO_DIR = ROOT / "audio"

CSS_TAG = '<link rel="stylesheet" href="styles.css">'
JS_TAG = '<script src="app.js"></script>'


def read_text(path):
    return path.read_text(encoding="utf-8")


def dumps(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def ensure_audio_junctions():
    """Ensure dist/audio, publish/audio, and src/audio properly link to ROOT/audio."""
    if not AUDIO_DIR.is_dir():
        return
    import subprocess
    for folder in (DIST, PUBLISH, SRC):
        if not folder.is_dir():
            folder.mkdir(parents=True, exist_ok=True)
        dest = folder / "audio"
        test_file = dest / "a_uk.mp3"
        if not test_file.is_file():
            if os.name == "nt":
                subprocess.run(["cmd", "/c", "rmdir", str(dest)], capture_output=True)
                subprocess.run(["cmd", "/c", "mklink", "/J", str(dest), str(AUDIO_DIR)], capture_output=True)
            else:
                try:
                    if dest.is_symlink() or dest.exists():
                        dest.unlink()
                    dest.symlink_to(AUDIO_DIR, target_is_directory=True)
                except Exception:
                    pass


def inject(js, placeholder, data, required=True):
    n = js.count(placeholder)
    if n == 0 and not required:
        print("note: %s not found, skipped" % placeholder)
        return js
    if n != 1:
        sys.exit("error: %s must appear exactly once in app.js, found %d" % (placeholder, n))
    return js.replace(placeholder, data)


def pack_translations(entries):
    """Merge data/tr/<lang>.json aligned with the entries list."""
    packs = {}
    tr_dir = DATA / "tr"
    if not tr_dir.is_dir():
        print("warning: data/tr is missing, no translations packed")
        return dumps(packs)

    for path in sorted(tr_dir.glob("*.json")):
        if path.stem.endswith("_w") or path.stem.endswith("_s"):
            continue
        code = path.stem
        try:
            data = json.loads(read_text(path))
        except Exception as exc:
            print("warning: skipping %s (%s)" % (path.name, exc))
            continue
        w = data.get("w") if isinstance(data, dict) else None
        s = data.get("s") if isinstance(data, dict) else None
        if not isinstance(w, dict) or not isinstance(s, dict):
            continue

        packs[code] = {
            "w": [w.get(e["word"], w.get(e["word"].lower(), "")) for e in entries],
            "s": [s.get(e["example"], "") for e in entries],
        }

    missing_words = sum(1 for v in packs.values() for x in v["w"] if not x)
    print("translations: %d languages (%s)" % (len(packs), ", ".join(sorted(packs))))
    print("translation gaps: %d word entries" % missing_words)
    return dumps(packs)


def validate_dataset(entries):
    """Report broken or missing entries or audio references without inventing content."""
    if len(entries) != 5325:
        sys.exit("error: expected 5325 entries, found %d" % len(entries))

    no_ex = [e for e in entries if not str(e.get("example", "")).strip()]
    if no_ex:
        sys.exit("error: %d entries have no example sentence" % len(no_ex))

    broken_audio = []
    has_uk = 0
    has_us = 0
    for e in entries:
        for k in ("audio_uk", "audio_us"):
            p = e.get(k)
            if p:
                if k == "audio_uk":
                    has_uk += 1
                else:
                    has_us += 1
                fn = pathlib.Path(p).name
                if not (AUDIO_DIR / fn).is_file():
                    broken_audio.append((e["id"], p))

    if broken_audio:
        sys.exit("error: %d broken audio paths found" % len(broken_audio))

    print("dataset check: 5325 entries, 0 missing examples, 0 broken audio paths")
    print("audio coverage: %d UK, %d US" % (has_uk, has_us))


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

    words_raw = read_text(DATA / "words.json")
    words_data = json.loads(words_raw)
    entries = words_data.get("words", [])

    validate_dataset(entries)
    ensure_audio_junctions()

    js = inject(js, "__WORDS_JSON__", dumps(words_data))
    js = inject(js, "__I18N_JSON__", read_text(DATA / "i18n.json"))
    js = inject(js, "__TRANSLATIONS_JSON__", pack_translations(entries))

    for token in ("__WORDS_JSON__", "__I18N_JSON__", "__TRANSLATIONS_JSON__"):
        if token in js:
            sys.exit("error: %s was not replaced" % token)

    if args.keep_js:
        (ROOT / "build" / "app.injected.js").write_text(js, encoding="utf-8")

    out = html.replace(CSS_TAG, "<style>\n" + css + "\n</style>")
    out = out.replace(JS_TAG, "<script>\n" + js + "\n</script>")

    guide_path = ROOT / "START-HERE.md"
    if guide_path.is_file():
        guide = read_text(guide_path)
        if "-->" in guide:
            sys.exit("error: START-HERE.md must not contain --> (it is embedded in an HTML comment)")
        out = out.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!--\n" + guide + "\n-->", 1)

    target = pathlib.Path(args.out) if args.out else DIST / "oxford5000-flashcards-final.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(out, encoding="utf-8")
    print("done -> %s (%.2f MB)" % (target, target.stat().st_size / 1048576))

    # Also sync publish/index.html
    pub_target = PUBLISH / "index.html"
    if pub_target.parent.is_dir():
        pub_target.write_text(out, encoding="utf-8")
        print("done -> %s (%.2f MB)" % (pub_target, pub_target.stat().st_size / 1048576))

    # Copy PWA assets (manifest and service worker) to dist and publish
    for asset in ("manifest.webmanifest", "sw.js"):
        src_asset = ROOT / asset
        if src_asset.is_file():
            content = read_text(src_asset)
            (DIST / asset).write_text(content, encoding="utf-8")
            if PUBLISH.is_dir():
                (PUBLISH / asset).write_text(content, encoding="utf-8")
    print("pwa assets copied: manifest.webmanifest, sw.js")


if __name__ == "__main__":
    main()
