"""Generate data/forms.json and data/sent_list.json.

forms.json holds the inflected forms of every word (base, -s/-ed/-ing, plural,
comparative/superlative, irregular verbs and nouns) plus an index into
sent_list.json for an example that really contains that form.

Only forms that are safe to derive are emitted: regular plurals must appear in
the corpus, adjectives that cannot be compared are skipped, and phrases with
spaces are kept only for the "more/most" comparative pattern.

Usage:
    python tools/build_forms.py
"""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

words = json.loads((DATA / "words_cefr.json").read_text(encoding="utf-8"))["words"]
SENT = json.loads((DATA / "sentences.json").read_text(encoding="utf-8"))
POS = json.loads((DATA / "pos.json").read_text(encoding="utf-8"))
IPA = json.loads((DATA / "ipa.json").read_text(encoding="utf-8"))

SENT_LIST = sorted({s for s in SENT.values() if s})
SENT_INDEX = {s: i for i, s in enumerate(SENT_LIST)}

TOKEN = re.compile(r"[A-Za-z][A-Za-z'\-]*")
by_token = {}
for i, s in enumerate(SENT_LIST):
    for t in TOKEN.findall(s):
        by_token.setdefault(t.lower(), []).append(i)


def pick_example(form, prefer=None):
    ids = by_token.get(form.lower())
    if not ids:
        return None
    best = None
    best_key = None
    for i in ids:
        s = SENT_LIST[i]
        n = len(s.split())
        if n < 3 or n > 14:
            continue
        key = (0 if i == prefer else 1, n, s)
        if best_key is None or key < best_key:
            best_key = key
            best = i
    return best


IRREG_VERBS = {
    "arise": ("arose", "arisen"), "awake": ("awoke", "awoken"), "be": ("was", "been"),
    "bear": ("bore", "borne"), "beat": ("beat", "beaten"), "become": ("became", "become"),
    "begin": ("began", "begun"), "bend": ("bent", "bent"), "bet": ("bet", "bet"),
    "bind": ("bound", "bound"), "bite": ("bit", "bitten"), "bleed": ("bled", "bled"),
    "blow": ("blew", "blown"), "break": ("broke", "broken"), "breed": ("bred", "bred"),
    "bring": ("brought", "brought"), "broadcast": ("broadcast", "broadcast"),
    "build": ("built", "built"), "burn": ("burnt", "burnt"), "burst": ("burst", "burst"),
    "buy": ("bought", "bought"), "cast": ("cast", "cast"), "catch": ("caught", "caught"),
    "choose": ("chose", "chosen"), "cling": ("clung", "clung"), "come": ("came", "come"),
    "cost": ("cost", "cost"), "creep": ("crept", "crept"), "cut": ("cut", "cut"),
    "deal": ("dealt", "dealt"), "dig": ("dug", "dug"), "do": ("did", "done"),
    "draw": ("drew", "drawn"), "dream": ("dreamt", "dreamt"), "drink": ("drank", "drunk"),
    "drive": ("drove", "driven"), "eat": ("ate", "eaten"), "fall": ("fell", "fallen"),
    "feed": ("fed", "fed"), "feel": ("felt", "felt"), "fight": ("fought", "fought"),
    "find": ("found", "found"), "flee": ("fled", "fled"), "fly": ("flew", "flown"),
    "forbid": ("forbade", "forbidden"), "forget": ("forgot", "forgotten"),
    "forgive": ("forgave", "forgiven"), "freeze": ("froze", "frozen"),
    "get": ("got", "got"), "give": ("gave", "given"), "go": ("went", "gone"),
    "grow": ("grew", "grown"), "hang": ("hung", "hung"), "have": ("had", "had"),
    "hear": ("heard", "heard"), "hide": ("hid", "hidden"), "hit": ("hit", "hit"),
    "hold": ("held", "held"), "hurt": ("hurt", "hurt"), "keep": ("kept", "kept"),
    "kneel": ("knelt", "knelt"), "know": ("knew", "known"), "lay": ("laid", "laid"),
    "lead": ("led", "led"), "lean": ("leant", "leant"), "leap": ("leapt", "leapt"),
    "learn": ("learnt", "learnt"), "leave": ("left", "left"), "lend": ("lent", "lent"),
    "let": ("let", "let"), "lie": ("lay", "lain"), "light": ("lit", "lit"),
    "lose": ("lost", "lost"), "make": ("made", "made"), "mean": ("meant", "meant"),
    "meet": ("met", "met"), "pay": ("paid", "paid"), "put": ("put", "put"),
    "quit": ("quit", "quit"), "read": ("read", "read"), "ride": ("rode", "ridden"),
    "ring": ("rang", "rung"), "rise": ("rose", "risen"), "run": ("ran", "run"),
    "say": ("said", "said"), "see": ("saw", "seen"), "seek": ("sought", "sought"),
    "sell": ("sold", "sold"), "send": ("sent", "sent"), "set": ("set", "set"),
    "shake": ("shook", "shaken"), "shed": ("shed", "shed"), "shine": ("shone", "shone"),
    "shoot": ("shot", "shot"), "show": ("showed", "shown"), "shrink": ("shrank", "shrunk"),
    "shut": ("shut", "shut"), "sing": ("sang", "sung"), "sink": ("sank", "sunk"),
    "sit": ("sat", "sat"), "sleep": ("slept", "slept"), "slide": ("slid", "slid"),
    "smell": ("smelt", "smelt"), "speak": ("spoke", "spoken"), "speed": ("sped", "sped"),
    "spell": ("spelt", "spelt"), "spend": ("spent", "spent"), "spill": ("spilt", "spilt"),
    "spin": ("spun", "spun"), "spit": ("spat", "spat"), "split": ("split", "split"),
    "spoil": ("spoilt", "spoilt"), "spread": ("spread", "spread"),
    "spring": ("sprang", "sprung"), "stand": ("stood", "stood"),
    "steal": ("stole", "stolen"), "stick": ("stuck", "stuck"), "sting": ("stung", "stung"),
    "stink": ("stank", "stunk"), "strike": ("struck", "struck"),
    "swear": ("swore", "sworn"), "sweep": ("swept", "swept"), "swim": ("swam", "swum"),
    "swing": ("swung", "swung"), "take": ("took", "taken"), "teach": ("taught", "taught"),
    "tear": ("tore", "torn"), "tell": ("told", "told"), "think": ("thought", "thought"),
    "throw": ("threw", "thrown"), "thrust": ("thrust", "thrust"),
    "understand": ("understood", "understood"), "undertake": ("undertook", "undertaken"),
    "wake": ("woke", "woken"), "wear": ("wore", "worn"), "weave": ("wove", "woven"),
    "weep": ("wept", "wept"), "win": ("won", "won"), "wind": ("wound", "wound"),
    "withdraw": ("withdrew", "withdrawn"), "write": ("wrote", "written"),
}

IRREG_PLURALS = {
    "child": "children", "man": "men", "woman": "women", "person": "people",
    "foot": "feet", "tooth": "teeth", "goose": "geese", "mouse": "mice",
    "louse": "lice", "ox": "oxen", "die": "dice", "penny": "pence",
    "cactus": "cacti", "fungus": "fungi", "nucleus": "nuclei", "syllabus": "syllabi",
    "analysis": "analyses", "basis": "bases", "crisis": "crises", "thesis": "theses",
    "hypothesis": "hypotheses", "phenomenon": "phenomena", "criterion": "criteria",
    "datum": "data", "medium": "media", "bacterium": "bacteria",
    "curriculum": "curricula", "memorandum": "memoranda", "index": "indices",
    "appendix": "appendices", "matrix": "matrices", "vertex": "vertices",
    "life": "lives", "wife": "wives", "knife": "knives", "leaf": "leaves",
    "half": "halves", "shelf": "shelves", "wolf": "wolves", "thief": "thieves",
    "loaf": "loaves", "calf": "calves", "self": "selves", "scarf": "scarves",
    "fish": "fish", "sheep": "sheep", "deer": "deer", "aircraft": "aircraft",
    "series": "series", "species": "species", "means": "means",
    "headquarters": "headquarters", "offspring": "offspring",
}

IRREG_ADJ = {
    "good": ("better", "best"), "bad": ("worse", "worst"),
    "far": ("farther", "farthest"), "little": ("less", "least"),
    "many": ("more", "most"), "much": ("more", "most"),
    "old": ("older", "oldest"),
}

VOWELS = "aeiou"
DOUBLING = set("""admit begin commit compel confer control defer deter emit equip expel
infer occur patrol permit prefer propel rebel recur refer regret submit transfer upset""".split())

BE_FORMS = [
    {"f": "am", "k": "irr", "lbl": "present"},
    {"f": "is", "k": "irr", "lbl": "third"},
    {"f": "are", "k": "irr", "lbl": "present"},
    {"f": "was", "k": "irr", "lbl": "past"},
    {"f": "were", "k": "irr", "lbl": "past"},
    {"f": "been", "k": "irr", "lbl": "pp"},
    {"f": "being", "k": "reg", "s": "ing", "lbl": "ing"},
]

THIRD_IRREG = {"be": "is", "have": "has", "do": "does"}


def is_cvc(w):
    if len(w) < 3:
        return False
    a, b, c = w[-3], w[-2], w[-1]
    if not (b in VOWELS and a not in VOWELS and c not in VOWELS and c not in "wxy"):
        return False
    # doubling only after a stressed final syllable: single-syllable words
    # plus a short list of stress-final verbs.
    if len(re.findall(r"[aeiouy]+", w)) == 1:
        return True
    return w in DOUBLING


def verb_forms(w):
    out = []
    if w == "be":
        return list(BE_FORMS)
    if w in IRREG_VERBS:
        past, pp = IRREG_VERBS[w]
        if w.endswith("ie"):
            ing = w[:-2] + "ying"
        elif w.endswith("e") and not w.endswith(("ee", "ye", "oe")):
            ing = w[:-1] + "ing"
        elif is_cvc(w):
            ing = w + w[-1] + "ing"
        else:
            ing = w + "ing"
        if w in THIRD_IRREG:
            third = THIRD_IRREG[w]
            out.append({"f": third, "k": "irr", "lbl": "third"})
        else:
            if w.endswith(("s", "x", "z", "ch", "sh", "o")):
                third = w + "es"
            elif w.endswith("y") and len(w) > 1 and w[-2] not in VOWELS:
                third = w[:-1] + "ies"
            else:
                third = w + "s"
            out.append({"f": third, "k": "reg", "s": suffix_of(w, third), "lbl": "third"})
        if past == pp:
            out.append({"f": past, "k": "irr", "lbl": "pastpp"})
        else:
            out.append({"f": past, "k": "irr", "lbl": "past"})
            out.append({"f": pp, "k": "irr", "lbl": "pp"})
        out.append({"f": ing, "k": "reg", "s": suffix_of(w, ing), "lbl": "ing"})
        return out

    if w.endswith(("s", "x", "z", "ch", "sh", "o")):
        third = w + "es"
    elif w.endswith("y") and len(w) > 1 and w[-2] not in VOWELS:
        third = w[:-1] + "ies"
    else:
        third = w + "s"
    out.append({"f": third, "k": "reg", "s": third[len(w):] if third.startswith(w) else "s", "lbl": "third"})

    if w.endswith("e"):
        past = w + "d"
    elif w.endswith("y") and len(w) > 1 and w[-2] not in VOWELS:
        past = w[:-1] + "ied"
    elif is_cvc(w):
        past = w + w[-1] + "ed"
    else:
        past = w + "ed"
    out.append({"f": past, "k": "reg", "s": past[len(w):], "lbl": "past"})

    if w.endswith("ie"):
        ing = w[:-2] + "ying"
    elif w.endswith("e") and not w.endswith(("ee", "ye", "oe")):
        ing = w[:-1] + "ing"
    elif is_cvc(w):
        ing = w + w[-1] + "ing"
    else:
        ing = w + "ing"
    out.append({"f": ing, "k": "reg", "s": suffix_of(w, ing), "lbl": "ing"})
    return out


def suffix_of(base, form):
    # longest common prefix; the rest is the highlighted ending
    i = 0
    while i < len(base) and i < len(form) and base[i] == form[i]:
        i += 1
    return form[i:]


def noun_forms(w):
    if w in IRREG_PLURALS:
        p = IRREG_PLURALS[w]
        return [{"f": p, "k": "irr" if p != w + "s" else "reg", "lbl": "plural"}]
    if w.endswith(("s", "x", "z", "ch", "sh")):
        p = w + "es"
    elif w.endswith("y") and len(w) > 1 and w[-2] not in VOWELS:
        p = w[:-1] + "ies"
    elif w.endswith("f"):
        p = w[:-1] + "ves"
    elif w.endswith("fe"):
        p = w[:-2] + "ves"
    elif w.endswith("o"):
        p = w + "es" if w in ("potato", "tomato", "hero", "echo", "veto", "torpedo") else w + "s"
    else:
        p = w + "s"
    # regular plurals are only shown when the corpus actually uses them,
    # because countability cannot be guessed safely.
    if p.lower() not in by_token:
        return []
    return [{"f": p, "k": "reg", "s": suffix_of(w, p), "lbl": "plural"}]


NOT_GRADABLE = ("ly", "ous", "ful", "less", "ic", "ive", "able", "ible", "al", "ary", "ing", "ed")


def adj_forms(w):
    out = []
    if w in IRREG_ADJ:
        c, s = IRREG_ADJ[w]
        return [{"f": c, "k": "irr", "lbl": "comp"}, {"f": s, "k": "irr", "lbl": "sup"}]
    if w.endswith(NOT_GRADABLE):
        return []
    syll = len(re.findall(r"[aeiouy]+", w))
    if syll > 2:
        return []
    if syll > 1 and not w.endswith("y"):
        return [{"f": "more " + w, "k": "phrase", "lbl": "comp"}, {"f": "most " + w, "k": "phrase", "lbl": "sup"}]
    if w.endswith("y"):
        c, s = w[:-1] + "ier", w[:-1] + "iest"
    elif w.endswith("e"):
        c, s = w + "r", w + "st"
    elif is_cvc(w):
        c, s = w + w[-1] + "er", w + w[-1] + "est"
    else:
        c, s = w + "er", w + "est"
    out.append({"f": c, "k": "reg", "s": suffix_of(w, c), "lbl": "comp"})
    out.append({"f": s, "k": "reg", "s": suffix_of(w, s), "lbl": "sup"})
    return out


forms_out = {}
for w in words:
    low = w.lower()
    types = POS.get(low, [])
    forms = [{"f": w, "k": "base", "lbl": "base"}]
    seen = {w.lower()}

    def add(lst):
        for item in lst:
            key = item["f"].lower()
            if " " in key and item.get("k") != "phrase":
                continue
            if key in seen or len(forms) >= 8:
                continue
            seen.add(key)
            forms.append(item)

    if "verb" in types:
        add(verb_forms(low))
    if "noun" in types:
        add(noun_forms(low))
    if "adjective" in types and not (set(types) & {"preposition", "conjunction"}):
        add(adj_forms(low))

    for item in forms:
        ex = pick_example(item["f"], SENT_INDEX.get(SENT.get(w, "")))
        if ex is not None:
            item["ex"] = ex
    item0 = forms[0]
    if "ex" not in item0 and SENT.get(w):
        item0["ex"] = SENT_INDEX.get(SENT[w])
    forms_out[w] = {"pos": types, "ipa": IPA.get(low, ""), "forms": forms}

(DATA / "forms.json").write_text(json.dumps(forms_out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
(DATA / "sent_list.json").write_text(json.dumps(SENT_LIST, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print("words:", len(forms_out), "sentences:", len(SENT_LIST))
cov = sum(1 for v in forms_out.values() if len(v["forms"]) > 1)
ex = sum(1 for v in forms_out.values() for f in v["forms"] if "ex" in f)
print("multi-form words:", cov, "form examples:", ex)
print(json.dumps(forms_out.get("abandon"), ensure_ascii=False)[:500])
print(json.dumps(forms_out.get("be"), ensure_ascii=False)[:500])
