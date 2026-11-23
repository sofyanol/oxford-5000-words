import json

path = "data/i18n.json"
with open(path, "r", encoding="utf-8") as f:
    d = json.load(f)

emoji_map = {
    "ar": {
        "card.know": "أعرفها ✅",
        "card.unknow": "لا أعرفها ❌",
        "card.undo": "تراجع ↩️",
        "quiz.button": "اختبرني 📝",
        "match.button": "مطابقة الكلمات 🧩",
        "toolbar.handsfree": "تشغيل تلقائي 🎧",
        "analytics.button": "الإحصائيات 📊",
        "toolbar.badges": "الإنجازات 🏆",
        "toolbar.leeches": "الكلمات الصعبة 🎯",
        "toolbar.print": "طباعة ورقية 🖨️",
        "toolbar.ambient": "أصوات التركيز 🌧️",
        "sync.button": "مزامنة 🔄",
        "toolbar.reset": "البدء من جديد 🔁",
        "toolbar.download": "تحميل الكلمات 📥",
        "toolbar.toolsHub": "أدوات إضافية ⚡",
        "toolbar.toolsHubClose": "إخفاء الأدوات ✖️",
        "settings.reset": "استعادة الافتراضي 🔄"
    },
    "en": {
        "card.know": "Know it ✅",
        "card.unknow": "Don't know ❌",
        "card.undo": "Undo ↩️",
        "quiz.button": "Quiz Me 📝",
        "match.button": "Word Match 🧩",
        "toolbar.handsfree": "Hands-Free 🎧",
        "analytics.button": "Analytics 📊",
        "toolbar.badges": "Badges 🏆",
        "toolbar.leeches": "Tricky Words 🎯",
        "toolbar.print": "Print Sheets 🖨️",
        "toolbar.ambient": "Focus Sounds 🌧️",
        "sync.button": "Sync 🔄",
        "toolbar.reset": "Start Over 🔁",
        "toolbar.download": "Download Words 📥",
        "toolbar.toolsHub": "More Tools ⚡",
        "toolbar.toolsHubClose": "Hide Tools ✖️",
        "settings.reset": "Reset Settings 🔄"
    }
}

# For other languages, ensure toolbar.toolsHub and toolbar.toolsHubClose exist with appropriate flags/emojis
default_tools_hub = {
    "fr": ("Plus d'outils ⚡", "Masquer ✖️"),
    "es": ("Más herramientas ⚡", "Ocultar ✖️"),
    "de": ("Mehr Werkzeuge ⚡", "Schließen ✖️"),
    "pt": ("Mais ferramentas ⚡", "Ocultar ✖️"),
    "ru": ("Больше утилит ⚡", "Скрыть ✖️"),
    "tr": ("Daha Fazla Araç ⚡", "Gizle ✖️"),
    "ur": ("مزید ٹولز ⚡", "چھپائیں ✖️"),
    "hi": ("अधिक उपकरण ⚡", "छिपाएं ✖️"),
    "id": ("Alat Lainnya ⚡", "Sembunyikan ✖️"),
    "zh": ("更多工具 ⚡", "收起 ✖️"),
    "nl": ("Meer hulpmiddelen ⚡", "Verbergen ✖️")
}

for lang, vals in emoji_map.items():
    if lang in d and isinstance(d[lang], dict):
        for k, v in vals.items():
            d[lang][k] = v

for lang, (open_txt, close_txt) in default_tools_hub.items():
    if lang in d and isinstance(d[lang], dict):
        d[lang]["toolbar.toolsHub"] = open_txt
        d[lang]["toolbar.toolsHubClose"] = close_txt
        # Add emojis to common keys in this lang if missing
        for key, emoji in [
            ("card.know", " ✅"),
            ("card.unknow", " ❌"),
            ("card.undo", " ↩️"),
            ("quiz.button", " 📝"),
            ("sync.button", " 🔄"),
            ("toolbar.reset", " 🔁"),
            ("toolbar.download", " 📥"),
            ("settings.reset", " 🔄")
        ]:
            if key in d[lang] and isinstance(d[lang][key], str):
                base = d[lang][key].replace("✅","").replace("❌","").replace("↩️","").replace("📝","").replace("🔄","").replace("🔁","").replace("📥","").strip()
                d[lang][key] = base + emoji

with open(path, "w", encoding="utf-8") as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print("Updated data/i18n.json with emojis!")
