# دليل التعديل

كل ما تحتاجه لتعديل التطبيق وإعادة بنائه بأمان.

## القاعدة الذهبية

```
عدّل src/ أو data/  →  python build/build.py  →  اختبر #selftest
```

لا تعدّل `dist/oxford5000-flashcards-final.html` أبدًا؛ سيُستبدل في البناء التالي.

## أوامر سريعة

```bash
python build/build.py                 # بناء عادي
python build/build.py --keep-js       # يحفظ build/app.injected.js للمراجعة
python -m http.server 8765            # خادم محلي (اختياري)
```

ثم افتح:

```
http://127.0.0.1:8765/dist/oxford5000-flashcards-final.html#selftest
```

أضف `?r=2` إذا لم يتحدث المتصفح بسبب الكاش.

## 1. تغيير نص أو إضافة مفتاح

1. أضف المفتاح إلى **كل** اللغات في `data/i18n.json` (166 مفتاحًا حاليًا).
2. استخدمه في `src/app.js`:

   ```js
   t('card.forms')                       // نص عادي
   t('search.count', { n: 12 })          // مع عنصر نائب
   tHtml('modal.empty.unknown')          // يحوّل \n إلى <br>
   ```

3. أو في `src/index.html` للعناصر الثابتة:

   ```html
   <span data-i18n="card.forms"></span>
   <button data-i18n-title="card.copy.title" data-i18n-aria="card.copy.title"></button>
   <input data-i18n-placeholder="card.note.placeholder">
   ```

4. أعد البناء. الاختبار الذاتي يفشل إذا نقص مفتاح في لغة أو اختلفت عناصر `{...}`
   بين اللغات.

الجدول الكامل في `docs/I18N.md`.

## 2. إضافة لغة واجهة

1. أضف عنصرًا إلى `_langs` في `data/i18n.json`:

   ```json
   { "code": "de", "name": "Deutsch", "dir": "ltr" }
   ```

2. انسخ كائن لغة كاملًا (مثل `"en"`) إلى مفتاح `"de"` وترجم القيم. لا تترك مفتاحًا
   ناقصًا. أبقِ العناصر النائبة كما هي.
3. أضف `"de"` إلى `LANGS` في `tools/translate.py` ثم:

   ```bash
   python tools/translate.py de
   python build/build.py
   ```

4. اللغة الإنجليزية لا تحتاج ملف ترجمة، لأن `wordTranslation` و`sentenceTranslation`
   تعيدان نصًا فارغًا عندما تكون لغة الواجهة `en`.

## 3. تغيير الألوان

الألوان الأساسية في بداية `src/styles.css`:

```css
:root{
  --paper: …;      /* خلفية البطاقة */
  --gold: …;       /* الكلمة الأساسية */
  --teal: …;       /* الإضافة المنتظمة */
  --brick: …;      /* التغيّر الشاذ */
  --ink-text: …;   /* النص الأساسي */
}
```

لكن التظليل يستخدم قيم `rgba` مستقلة في:

- `.sent-text mark.hl-base`
- `.sent-text .hl-suf`
- `.sent-text mark.hl-irr`
- `.legend-swatch.*`
- `.fc-word .hl-suf` و`.fc-word .hl-irr`

حدّثها معًا حتى يبقى مفتاح «شرح الألوان» مطابقًا لما يظهر في الجملة.

## 4. تغيير حجم البطاقة أو ترتيبها

- الحجم: `.deck{ width: …; height: … }` و`@media (max-width:480px)`.
- التمرير الداخلي: `.card{ overflow-y:auto }`.
- التوسيط الرأسي: `word-head{ margin-top:auto }` و`hint-row{ margin-bottom:auto }`.
  عند امتلاء المحتوى تصبح الهوامش صفرًا ويعمل التمرير.
- ترتيب المحتوى في `src/index.html`: `word-head` ثم `example-card` ثم `forms-bar`
  ثم `legend` ثم `translation-box` ثم `hint-row`.

## 5. إضافة كلمة أو حذفها

ترتيب `words` و`levels` هو مفتاح كل شيء. لا تعدّل كلمة واحدة يدويًا ثم تبني فقط؛
اتبع هذا الترتيب:

1. عدّل `data/words_cefr.json` (المصفوفتان بنفس الطول).
2. شغّل:

   ```bash
   python tools/fetch_meta.py
   python tools/build_forms.py
   python tools/translate.py ar fr es pt ru tr ur hi id zh
   python build/build.py
   ```

3. `fetch_meta.py` يجلب أجزاء الكلام وIPA، و`build_forms.py` يعيد بناء الفهارس،
   و`translate.py` يكمل الناقص فقط (لأنه يستأنف من الملفات الموجودة).

بديل أسرع للكلمات الجديدة: أضف الكلمة في نهاية المصفوفة، ثم أضف ترجمتها يدويًا في
كل `data/tr/<lang>.json` تحت `w`، وأضف جملة في `sentences.json` + `sent_list.json`.
لكن إعادة التوليد أضمن.

## 6. إضافة قاعدة صيغة جديدة

كل القواعد في `tools/build_forms.py`:

- `IRREG_VERBS`: خريطة الفعل إلى (الماضي، التام).
- `IRREG_PLURALS`: الجموع الشاذة.
- `IRREG_ADJ`: درجات المقارنة الشاذة.
- `DOUBLING`: أفعال تضاعف الحرف الأخير مع أنها متعددة المقاطع.
- `verb_forms`, `noun_forms`, `adj_forms`: الاشتقاق المنتظم.
- `pick_example`: اختيار جملة تحتوي الصيغة من المدونة.

بعد التعديل:

```bash
python tools/build_forms.py
python build/build.py
```

لاحظ أن `forms.json` و`sent_list.json` يُكتبان معًا، ويجب بناء الاثنين.

## 7. تغيير سلوك الاختبار

| ما تريده | المكان |
|---|---|
| المصدر والمستوى والعدد الافتراضي | `defaultQuizSettings` |
| معنى الإجابة الصحيحة | `answerFor` (ملاحظة المستخدم ثم الترجمة) |
| شكل السؤال والخيارات | `renderMcQuestion` |
| شكل البدائل | `buildDistractorOptions` |
| الانتقال بعد الخطأ | `answerQuestion` |
| شاشة النهاية | `renderQuizEnd` |

الاختبار الحالي **خيارات فقط** باتجاه «كلمة إنجليزية ← معنى». لا توجد بطاقات
ذاتية ولا كتابة ولا اتجاه معاكس. تغيير الاتجاه أو إضافة وضع كتابة يحتاج تعديل
`renderQuizQuestion`، ومفاتيح i18n جديدة، وتحديث `selfTest`.

قاعدة مهمة: أي سؤال يجب أن يبقى قابلًا للإجابة حتى لو تغيّرت اللغة. استخدم
`refreshQuizForLang` ولا تخزّن نصوص الخيارات في الحالة بشكل دائم.

## 8. تغيير شكل رابط المزامنة

- الترميز في `encodeSyncPayload` / `decodeSyncPayload`، والرابط في
  `buildSyncLink` / `extractSyncPayload`.
- `OX6` ثنائي ومضغوط، ويقرأ `OX5` و`OX5u` القديمة.
- أي تغيير في ترتيب الحقول أو دقة الطوابع الزمنية يحتاج رفع إصدار الحمولة
  وإبقاء قراءة الإصدار السابق.
- اختبر: رابط كامل في تبويب بأصل آخر، ورابط تحديثات، ورمزًا مقطوعًا، ورمزًا من
  بصمة كلمات مختلفة.

## 9. تغيير التكرار المتباعد

`srsIntervalDays` تحدد الفواصل، و`nextSrs` تحدد الانتقال عند النجاح والفشل. بعد أي
تغيير حدّث الاختبارات 13 و14 و15 في `selfTest`، ثم أعد البناء وتأكد من
`SELFTEST PASS`.

## 10. ترقية تخزين الحالة (نادر)

إذا غيّرت شكل `state`:

1. ارفع `v` إلى 4 في `freshState`.
2. أضف ترقية من 3 إلى 4 داخل `loadState`/`normalizeState`.
3. أبقِ قراءة v2 وv3 حتى لا يفقد المستخدم تقدمه.
4. حدّث `mergeStates` و`validateImport` والاختبارات.

## 11. الأمان: رمز بوت تلقرام

- يُخزَّن في `localStorage` تحت `oxford5000_tg` فقط.
- لا يوضع في `state` ولا في ملف التصدير ولا في `history`.
- لا تطبعه في الكونسول ولا ترسله إلى أي عنوان غير `api.telegram.org`.
- زر «إلغاء الربط» يمسح المفتاح بالكامل.

## 12. أخطاء شائعة

| العرض | السبب |
|---|---|
| `error: __X_JSON__ must appear exactly once` | العنصر النائب تغيّر أو تكرر في `src/app.js` |
| `SELFTEST` يظهر خطأ i18n | مفتاح ناقص أو عنصر `{n}` غير مطابق بين اللغات |
| الكلمات تظهر بلا ترجمة | لا يوجد `data/tr/<lang>.json` أو أن `sent_list.json` تغيّر بعد الترجمة |
| الأمثلة لا تتغير مع الصيغة | `ex` مفقود في `forms.json` أو أن `sent_list.json` أُعيد ترتيبه |
| التغييرات لا تظهر | المتصفح يستخدم كاش؛ أضف `?r=` جديدًا |

## 12. التحقق قبل التسليم

1. `python build/build.py`
2. افتح `dist/...#selftest` وتأكد من `SELFTEST PASS` وعدم وجود أخطاء كونسول.
3. جرّب بالعربية والإنجليزية: كلمة بصيغ شاذة (write)، وكلمة بجمع شاذ (child).
4. جرّب تبديل اللغة والبطاقة مفتوحة، والاختبار مفتوح.
5. جرّب البحث بالكلمة وبالترجمة.
6. جرّب وضع الكتابة مرة صحيحة ومرة خاطئة.
7. تأكد أن `dist` لا يحتوي أي `__PLACEHOLDER__`.
