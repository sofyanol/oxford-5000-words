# البنية التقنية

## 1. لماذا ملف واحد؟

التطبيق يجب أن يعمل بمجرد فتح ملف HTML، بلا خادم وبلا إنترنت، وأن يُنقل بالنسخ فقط.
لذلك تُحقن كل البيانات والترجمات داخل ملف واحد عند البناء. المصدر مقسّم إلى ثلاثة
ملفات مقروءة، والبناء يجمعها.

```
src/index.html ──┐
src/styles.css ──┼── build/build.py ──> dist/oxford5000-flashcards-final.html
src/app.js ──────┤        ▲
data/*.json ─────┘        │
data/tr/*.json ───────────┘
```

`build/build.py`:

1. يقرأ `index.html` و`styles.css` و`app.js`.
2. يستبدل `__WORDS_JSON__` و`__I18N_JSON__` و`__SENTENCES_JSON__` و`__FORMS_JSON__`
   و`__SENT_LIST_JSON__` و`__TRANSLATIONS_JSON__` داخل `app.js` بالنصوص المقابلة.
3. يحوّل ملفات `data/tr/<lang>.json` إلى مصفوفات مفهرسة (`w` و`s`) بدل كائنات
   مفاتيحها نصوص إنجليزية، لتقليل الحجم إلى النصف تقريبًا.
4. يستبدل وسم `<link>` بمحتوى CSS ووسم `<script src>` بمحتوى JS.
5. يضمّن `START-HERE.md` كاملًا كتعليق HTML بعد `<!DOCTYPE html>`، فيحمل الملف
   النهائي تعليماته معه حتى لو نُقل وحده.
6. يتحقق من عدم بقاء أي عنصر نائب، ثم يكتب الملف النهائي في `dist/`.

كل عنصر نائب يجب أن يظهر مرة واحدة بالضبط؛ البناء يفشل برسالة واضحة إن لم يحدث ذلك.

الخطوط (IBM Plex وNoto) تُحمّل من Google Fonts عند توفر الإنترنت. عند انقطاعه
يستخدم المتصفح خطوط النظام، وكل الوظائف تعمل بلا تغيير. لا تُضمّن الخطوط في الملف
إلا إذا أردت حجمًا أكبر بكثير مقابل شكل ثابت تمامًا.

## 2. تسلسل التشغيل

```js
loadState();            // قراءة localStorage أو ترقية v2 أو إنشاء حالة جديدة
wireEvents();           // ربط كل الأزرار والمودالات والسحب والاختصارات
buildLangSelect();      // تعبئة قائمة اللغات من I18N._langs
applyLang(savedLang);   // تطبيق النصوص والاتجاه ثم render()
renderSyncStatus();
maybeAutoSync();        // مزامنة تلقائية إن كانت مفعّلة
```

`applyLang` هو نقطة التبديل المركزية:

```js
applyLang(code):
  currentLang = code; state.ui.lang = code; save
  <html lang dir> = code / langDir(code)
  applyStaticI18n()        // كل عناصر data-i18n وdata-i18n-title/aria/placeholder
  buildLevelBar(); render()
  updateLangSelect()       // يحدّث القائمة وشارة AR/EN
  refreshSearchForLang(); refreshQuizForLang(); refreshReviewList(); ...
```

أي شاشة مفتوحة (بحث، مراجعة، اختبار، مزامنة) تُحدّث نفسها من هذه الدالة، لذلك تغيير
اللغة لا يترك نصًا قديمًا.

## 3. خريطة الوحدات في `src/app.js`

| القسم | أهم الدوال | المسؤولية |
|---|---|---|
| i18n | `t`, `tFor`, `tHtml`, `fillParams`, `langExists`, `langDir`, `applyStaticI18n` | كل نص مرئي، الاتجاه، الاستبدال |
| الحالة المشتركة | `freshState`, `normalizeState`, `migrateV2`, `mergeStates`, `validateImport`, `buildProgress` | تخزين v3، دمج بلا فقدان بيانات |
| التكرار المتباعد | `nextSrs`, `srsIntervalDays`, `applySrsOnMark`, `buildQuizQueue` | صناديق 1..5 |
| البطاقة والبيانات | `sentenceFor`, `formsFor`, `ipaFor`, `wordTranslation`, `sentenceTranslation`, `answerFor`, `highlightSentence`, `renderCardExample`, `buildFormsBar` | محتوى البطاقة والتلوين |
| البحث | `searchWords`, `searchRowHtml`, `renderSearchResults` | بحث في الكلمة والترجمة والملاحظة |
| النسخ الاحتياطي | `downloadProgressFile`, `readFileText`, `applyIncoming`, `encodeSyncCode`, `encodeSyncPayload`, `decodeSyncPayload` | ملف تقدم ورمز مشاركة OX5/OX6 |
| المزامنة السريعة | `buildSyncLink`, `extractSyncPayload`, `changesSince`, `progressItemCount`, `syncDelta` | رابط كامل أو رابط تحديثات |
| تلقرام | `tgApi`, `saveTg`, `unlinkBot`, `pickRemoteDocument` | مزامنة اختيارية |
| الاختبار | `renderQuizStart`, `renderMcQuestion`, `answerQuestion`, `finishQuiz` | جلسة اختبار خيارات فقط |
| القوائم | `renderReviewList`, `renderReviewSummary`, `reviewRowHtml`, `openListModal` | تصنيف حسب المستوى والبحث والتحميل |
| الواجهة | `render`, `renderCardExample`, `markWord`, `undo`, `switchLevel` | شاشة البطاقات |
| الاختبار الذاتي | `selfTest` | يظهر عند `#selftest` |

## 4. تدفق البيانات في البطاقة

```
setCardWord(word)
  ├─ title / level badge / counters
  ├─ updateCardSentence(word)
  │    └─ renderCardExample(word)
  │         ├─ formsFor(word)   → [{f, k, s?, lbl, ex?}, ...]
  │         ├─ اختيار الصيغة cardFormIndex (0 = الأساس)
  │         ├─ sentence = SENT_LIST[form.ex] أو SENTENCES[word]
  │         ├─ highlightSentence(sentence, word, forms)
  │         ├─ sentenceTranslation(sentence) من TR[lang].s
  │         ├─ updateCardMeta(word)  → IPA + wordTranslation
  │         └─ buildFormsBar(word, forms)
  └─ translation textarea = noteText(word)
```

`highlightSentence` يبني تعبيرًا منتظمًا من كل الصيغ، ثم:

- `k: 'irr'` → `<mark class="hl-irr">` (تغيّر شاذ).
- `k: 'reg'` مع لاحقة `s` → `<mark class="hl-base">` للجذع + `<span class="hl-suf">`
  للاحقة.
- غير ذلك → `<mark class="hl-base">` للكلمة كما هي.

`formChipHtml` يطبّق نفس التلوين داخل زر الصيغة.

## 5. حالة التطبيق والتخزين

مفتاح التخزين: `oxford5000_progress_v3`. المفتاح القديم: `oxford5000_progress_v2`.

```js
{
  v: 3,
  deviceId: "…",                 // لتمييز الأجهزة عند الدمج
  marks: { word: { s: "k"|"u"|"r", t: 1700000000000 } },
  notes: { word: { v: "ملاحظة", t: 1700000000000 } },
  srs:   { word: { box: 1..5, due: 1700000000000, t: … } },
  ui: {
    currentLevel, seed: { all, a1..c1 }, sort,
    lastBackupAt, changesSinceBackup, snoozeUntil,
    lang, quizSettings, quizStreak, lastQuiz
  },
  history: [ { word, prev } ]     // آخر 50 عملية تراجع
}
```

- `s`: `k` معروفة، `u` غير معروفة، `r` لم تُراجع/أُزيلت.
- الدمج `mergeStates` تبادلي وتجميعي: الأحدث `t` يفوز، وعند تساوي الوقت تفوز `k`
  على `u`، والملاحظة الأحدث تفوز. هذا يمنع فقدان التقدم عند المزامنة.
- التصدير `buildProgress` لا يحتوي `ui` ولا `history` ولا أي إعدادات تلقرام.
- رمز بوت تلقرام في مفتاح منفصل `oxford5000_tg` ولا يدخل `state` أبدًا.

### التكرار المتباعد

| الصندوق | الفاصل |
|---|---|
| 1 | فورًا (0 يوم) |
| 2 | يوم |
| 3 | 3 أيام |
| 4 | 7 أيام |
| 5 | 14 يومًا |

النجاح يرفع الصندوق واحدًا، والفشل يعيده إلى 1 مع إعادة بعد 10 دقائق.

النموذج `mergeStates` يدمج الحالة الواردة مع المحلية ولا يحذف ما ليس في الواردة. لهذا
لا يمكن حذف تصنيف قديم بكتابة حالة فارغة عبر `saveState`؛ تنظيف التخزين يتطلب
`localStorage.setItem` مباشرًا أو واجهة إزالة.

### رموز المزامنة OX6

```
OX6u.<base64url payload>
```

- الحرف بعد `OX6` (`u` أو `g`) يشير إلى gzip عند استخدام `CompressionStream`.
- الحمولة: إصدار، بصمة FNV-1a لقائمة الكلمات، `deviceId`، `exportedAt`،
  `syncDelta`، مصفوفات التصنيفات والملاحظات وSRS مفهرسة بترتيب `WORDS`.
- الطوابع الزمنية بالثواني لتوفير المساحة؛ أي دقة أقل من ثانية تُقص.
- `encodeSyncCode` يختار `OX6` تلقائيًا ويسقط إلى `OX5u` عند غياب ضغط المتصفح.
- `decodeSyncCode` يقرأ `OX6` و`OX5`/`OX5u`، ويتحقق من البصمة والطول قبل الدمج.
- `buildSyncLink` يضع الرمز بعد `#sync=`، و`extractSyncPayload` يقبل رابطًا أو
  رمزًا خامًا أو `?sync=`.
- `changesSince(progress, lastLinkAt)` يبني حمولة `syncDelta: true`، وواجهة
  المزامنة تحذّر عند فتح رابط تحديثات على جهاز لا يملك أساسًا.
- عند فتح `#sync=` يحدث الدمج تلقائيًا، يُمسح الهاش، وتُفتح نافذة المزامنة
  بالملخص. `lastLinkAt` محفوظ في `ui`.

## 6. الاختبار

`quizSession` كائن في الذاكرة (لا يُحفظ):

```js
{ items:[{word, type:'mc', extra, answered, result, state:{options, correct, picked}}],
  initialWords, answers, index, startedAt, endedAt, ended, first, final, mistakes:Set }
```

- نوع واحد فقط: `mc` باتجاه «كلمة إنجليزية ← اختر المعنى». لا بطاقات ذاتية ولا
  كتابة ولا اتجاه معنى←كلمة.
- `answerFor(word)` = ملاحظة المستخدم إن وُجدت، وإلا الترجمة المدمجة.
- البدائل تُبنى من إجابات الكلمات الأخرى (`buildDistractorOptions`)، وتحتاج
  أربع إجابات مختلفة على الأقل وإلا تعذّر بدء الاختبار.
- الإجابة الخاطئة تضيف سؤالًا إضافيًا لنفس الكلمة، بنفس النوع `mc`.
- `quizPool(source, level)` يقبل فقط الكلمات المصنّفة `u` ولها معنى؛ المصدر
  `all` يعني كل غير المعروفة، و`due` يعني المستحقة فقط.
- تغيير اللغة أثناء سؤال لم يُجب عنه يعيد بناء الخيارات باللغة الجديدة؛ السؤال
  المجاب يبقى مجمّدًا حتى لا تتغير نتيجته بأثر رجعي.

## 7. الصوت

يوفر التطبيق نطقًا اختياريًا عبر `speechSynthesis` للكلمة والجملة عندما يدعم
المتصفح ذلك. يفضّل اختيار الصوت المحلي (`localService`) عند عدم الاتصال، ويمكن
للمتعلم اختيار نطق أمريكي أو بريطاني إذا كانت الأصوات متوفرة. لا يُفترض وجود
صوت بعينه على كل جهاز؛ لذلك يبقى IPA مرجعًا نصيًا ثابتًا بجانب الكلمة.

## 8. الاختبار الذاتي

`selfTest()` دالة واحدة تعمل عند `#selftest` وتتحقق من:

- ترقية v2 والحفاظ على الملاحظات.
- تبادلية وتجميعية الدمج، والتراجع، وسقف السجل.
- الاستيراد والتصدير ورمز المشاركة، وأخطاء تلقرام.
- OX6: بصمة الإصدار، والفرق، والرابط، وقبول `OX5`، ورفض القص، وحجم أصغر.
- التكرار المتباعد وقائمة الاختبار والبدائل.
- إعدادات الاختبار (خيارات فقط) ومجموعة الكلمات غير المعروفة.
- اكتمال مفاتيح i18n واتجاه اللغات وتحديث النصوص.
- الجمل والتلوين والترجمة والصيغ والنطق الدولي والنطق الصوتي عند توفره.
- البحث بالكلمة وبالترجمة والملاحظة.
- تجميع القوائم حسب المستوى وملخص الشرائح، وتوسيط الكروت.
- وجود أزرار النطق عند توفر `speechSynthesis` وخلوّ الاختبار من أوضاع الكتابة
  والبطاقات الذاتية.

أي فشل يظهر كخطأ `console.assert`، والنجاح يطبع `SELFTEST PASS`.
