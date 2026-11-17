"""Audit generated translations for coverage and obvious data-quality problems.

This is a screening tool, not a substitute for a native-speaker review. It
does not silently rewrite translations or claim that machine output is
grammatically correct.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
LANGS = ["ar", "fr", "es", "pt", "ru", "tr", "ur", "hi", "id", "zh"]


def load(path):
    return json.loads(path.read_text(encoding="utf-8"))


def suspicious(source, translated, lang):
    if not isinstance(translated, str) or not translated.strip():
        return "missing"
    value = translated.strip()
    if value == source.strip():
        return "unchanged"
    if lang in {"ar", "ur"} and re.search(r"[A-Za-z]", value):
        return "latin_text"
    if lang not in {"ar", "ur"} and re.search(r"[\u0600-\u06ff]", value):
        return "arabic_text"
    if len(value) > max(240, len(source) * 8):
        return "unusually_long"
    return ""


def main():
    words = load(DATA / "words_cefr.json")["words"]
    sentences = load(DATA / "sentences.json")
    report = []
    for lang in LANGS:
        path = DATA / "tr" / (lang + ".json")
        if not path.is_file():
            report.append((lang, "file_missing", "", ""))
            continue
        pack = load(path)
        word_map = pack.get("w", {})
        sentence_map = pack.get("s", {})
        for word in words:
            issue = suspicious(word, word_map.get(word, ""), lang)
            if issue:
                report.append((lang, "word:" + issue, word, word_map.get(word, "")))
        for source in sorted({s for s in sentences.values() if s}):
            issue = suspicious(source, sentence_map.get(source, ""), lang)
            if issue:
                report.append((lang, "sentence:" + issue, source, sentence_map.get(source, "")))

    output = DATA / "translation-audit.json"
    output.write_text(json.dumps([
        {"language": lang, "issue": issue, "source": source, "value": value}
        for lang, issue, source, value in report
    ], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    counts = {}
    for lang, issue, _, _ in report:
        counts[(lang, issue)] = counts.get((lang, issue), 0) + 1
    print("translation audit: %d flagged entries" % len(report))
    for (lang, issue), count in sorted(counts.items()):
        print("  %-2s %-22s %d" % (lang, issue, count))
    print("report -> %s" % output)
    return 1 if report else 0


if __name__ == "__main__":
    sys.exit(main())
