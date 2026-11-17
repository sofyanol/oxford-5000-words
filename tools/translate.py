"""Fill data/tr/<lang>.json with word and sentence translations.

The app never calls the network at runtime: this script precomputes the
translations once and stores them in the project. It uses the same public
Google endpoint the Chrome dictionary uses, in batches of 60 strings, and it
is resumable because progress is written to data/tr/<lang>_w.json and
data/tr/<lang>_s.json after every batch.

Usage:
    python tools/translate.py ar fr          # only these languages
    python tools/translate.py                 # all languages in LANGS

After it finishes run the build again so the new languages are packed into
dist/oxford5000-flashcards-final.html.

The English user interface needs no translation: English is the source
language of the word list and the example sentences.
"""
import json, os, pathlib, random, sys, time, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT = DATA / "tr"
OUT.mkdir(exist_ok=True)

words = json.loads((DATA / "words_cefr.json").read_text(encoding="utf-8"))["words"]
sents = json.loads((DATA / "sentences.json").read_text(encoding="utf-8"))
unique_sents = sorted({s for s in sents.values() if s})
LANGS = ["ar", "fr", "es", "pt", "ru", "tr", "ur", "hi", "id", "zh"]
BATCH = 60
URL = "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl="

def translate_batch(lang, texts):
    body = urllib.parse.urlencode([("q", t) for t in texts]).encode()
    req = urllib.request.Request(URL + lang, data=body, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=90) as r:
        out = json.loads(r.read().decode("utf-8"))
    if isinstance(out, str):
        out = [out]
    if len(out) != len(texts):
        raise ValueError("batch size mismatch: %d != %d" % (len(out), len(texts)))
    return out

def translate_all(lang, texts, path, tag, log):
    done = {}
    if path.exists():
        try:
            done = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            done = {}
    todo = [t for t in texts if t not in done]
    log("  %s: %d/%d already done, %d to translate" % (tag, len(texts) - len(todo), len(texts), len(todo)))
    for i in range(0, len(todo), BATCH):
        chunk = todo[i:i + BATCH]
        for attempt in range(6):
            try:
                res = translate_batch(lang, chunk)
                for src, dst in zip(chunk, res):
                    done[src] = dst
                break
            except Exception as e:
                wait = min(60, 2 ** attempt + random.random())
                log("    retry %d after %.1fs: %s" % (attempt + 1, wait, e))
                time.sleep(wait)
                if attempt == 5:
                    # fall back to one-by-one so a single bad string cannot block
                    for t in chunk:
                        try:
                            done[t] = translate_batch(lang, [t])[0]
                        except Exception as e2:
                            log("    skipped: %s (%s)" % (t[:40], e2))
                continue
        path.write_text(json.dumps(done, ensure_ascii=False), encoding="utf-8")
        log("  %s: %d/%d" % (tag, min(len(done), len(texts)), len(texts)))
    return done

def log(msg):
    print(msg, flush=True)

def main():
    langs = sys.argv[1:] or LANGS
    for lang in langs:
        wpath = OUT / (lang + "_w.json")
        spath = OUT / (lang + "_s.json")
        log("== %s ==" % lang)
        tw = translate_all(lang, words, wpath, "words", log)
        ts = translate_all(lang, unique_sents, spath, "sentences", log)
        out = {"w": tw, "s": ts}
        (OUT / (lang + ".json")).write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
        log("  wrote %s.json (%d words, %d sentences)" % (lang, len(tw), len(ts)))

if __name__ == "__main__":
    main()
