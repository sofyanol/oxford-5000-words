"""Build data/pos.json and data/ipa.json from public datasets.

Sources:
  * parts of speech: the Oxford 3000/5000 gist by naiyerasif
  * IPA: Talhakasikci/cefr-vocabulary-dataset (en-A1..C1.json)

Needs internet access. The generated files are already in data/, so this is
only needed when the word list itself changes.
"""
import json, pathlib, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")

words = json.loads((DATA / "words_cefr.json").read_text(encoding="utf-8"))["words"]
wanted = {w.lower() for w in words}

# ---- parts of speech ----
gist = json.loads(get("https://gist.githubusercontent.com/naiyerasif/95f65ac734b55ecfb4b1f4e2a7c42c25/raw/bfc1684eea2310266ce41c1c621f2f872c93f9c9/oxford_3000_5000.json"))
pos = {}
for row in gist:
    w = str(row.get("word", "")).strip().lower()
    t = str(row.get("type", "")).strip().lower()
    if not w or not t or w not in wanted:
        continue
    pos.setdefault(w, [])
    if t not in pos[w]:
        pos[w].append(t)
(DATA / "pos.json").write_text(json.dumps(pos, ensure_ascii=False, indent=0), encoding="utf-8")
print("pos words:", len(pos), "of", len(wanted))

# ---- IPA ----
ipa = {}
for level in ("A1", "A2", "B1", "B2", "C1"):
    url = "https://raw.githubusercontent.com/Talhakasikci/cefr-vocabulary-dataset/main/vocab_json/en-%s.json" % level
    try:
        rows = json.loads(get(url))
    except Exception as e:
        print("skip", level, e)
        continue
    for row in rows:
        lemma = str(row.get("lemma", "")).strip().lower()
        if not lemma or lemma not in wanted:
            continue
        val = (row.get("ipa") or "").strip()
        if not val or "ipa" in ipa:
            continue
        if not val.startswith("/"):
            val = "/" + val.strip("/") + "/"
        ipa[lemma] = val
    print(level, "rows", len(rows), "ipa so far", len(ipa))

(DATA / "ipa.json").write_text(json.dumps(ipa, ensure_ascii=False, indent=0), encoding="utf-8")
print("ipa words:", len(ipa))
