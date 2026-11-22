const DATA = __WORDS_JSON__;
const I18N = __I18N_JSON__;
const TR = __TRANSLATIONS_JSON__;
const ENTRIES = Array.isArray(DATA) ? DATA : (DATA.words || []);
const WORDS = ENTRIES;
const GUIDE = DATA.guide || {};

const ENTRY_BY_ID = new Map();
const WORD_TO_ENTRIES = new Map();
ENTRIES.forEach((e, idx) => {
  if(!e.id) e.id = idx + 1;
  e.toString = function() { return String(this.id); };
  ENTRY_BY_ID.set(e.id, e);
  ENTRY_BY_ID.set(String(e.id), e);
  const w = (e.word || '').toLowerCase();
  if(!WORD_TO_ENTRIES.has(w)) WORD_TO_ENTRIES.set(w, []);
  WORD_TO_ENTRIES.get(w).push(e);
});

function getEntry(idOrObj){
  if(!idOrObj) return null;
  if(typeof idOrObj === 'object' && idOrObj.id) return idOrObj;
  if(typeof idOrObj === 'number' || (typeof idOrObj === 'string' && /^\d+$/.test(idOrObj))){
    const num = Number(idOrObj);
    if(ENTRY_BY_ID.has(num)) return ENTRY_BY_ID.get(num);
  }
  if(typeof idOrObj === 'string'){
    const list = WORD_TO_ENTRIES.get(idOrObj.toLowerCase());
    if(list && list.length) return list[0];
  }
  return null;
}
const LEVEL_ORDER = ['a1','a2','b1','b2','c1'];
const LEVEL_LABELS = {a1:'A1', a2:'A2', b1:'B1', b2:'B2', c1:'C1'};
function LEVEL_NAMES(code){
  return t('level.' + code + '.name');
}

// ---------- Step 4: i18n ----------

const EXTRA_AR = {
  'modal.sort.aria': 'ترتيب القائمة',
  'lang.mode.single': 'لغة واحدة',
  'lang.mode.multi': 'اختيار عدة لغات',
  'tutorial.button': 'جولة تعليمية',
  'tutorial.title': 'جولة تعليمية كاملة',
  'tutorial.intro': 'تعرف على كل أجزاء الموقع خطوة بخطوة. ستتم إضافة الميزات الجديدة إلى هذه الجولة.',
  'feedback.button': 'إرسال ملاحظة',
  'feedback.title': 'أرسل ملاحظتك',
  'feedback.placeholder': 'اكتب اقتراحك أو المشكلة التي واجهتها...',
  'feedback.open': 'إرسال الملاحظة',
  'feedback.note': 'ستُرسل الملاحظة عبر نموذج Tally دون الحاجة إلى حساب أو بريد للمستخدم.',
  'feedback.setup': 'لم يتم ربط نموذج الاستقبال بعد. أضف رابط Tally في إعدادات الموقع.',
  'visitor.label': 'الزيارات العالمية',
  'visitor.loading': 'جارٍ التحميل...',
  'visitor.unavailable': 'غير متاح حاليًا',
  'tutorial.card.title': 'بطاقة الكلمة',
  'tutorial.card.text': 'استمع إلى الكلمة والمثال، اقرأ IPA، راجع الترجمة، ثم اختر أعرفها أو لا أعرفها.',
  'tutorial.levels.title': 'مستويات CEFR',
  'tutorial.levels.text': 'استخدم A1 إلى C1 للتركيز على مستوى مناسب لك.',
  'tutorial.lists.title': 'قوائم التقدم',
  'tutorial.lists.text': 'افتح أعداد أعرفها ولا أعرفها والمتبقية لمراجعة كلماتك في مجموعات مرتبة.',
  'tutorial.quiz.title': 'اختبار المراجعة',
  'tutorial.quiz.text': 'اختبر نفسك باختيار المعنى الصحيح، ثم اكتب جملة خاصة بك لتثبت قدرتك على الاستخدام.',
  'tutorial.language.title': 'اللغات والنطق',
  'tutorial.language.text': 'اختر لغة واحدة افتراضيًا، أو فعّل اختيار عدة لغات لعرض الترجمات معًا، وحدد UK أو US للنطق.',
  'tutorial.sync.title': 'الحفظ والنسخ الاحتياطي',
  'tutorial.sync.text': 'استخدم المزامنة والتحميل للاحتفاظ بتقدمك ونقله بين أجهزتك.',
  'tutorial.feedback.title': 'الملاحظات',
  'tutorial.feedback.text': 'أرسل اقتراحًا أو مشكلة عبر نموذج الملاحظات. ستصل الرسالة إلى صاحب الموقع دون الحاجة إلى حساب GitHub.',
  'tutorial.next': 'التالي',
  'tutorial.previous': 'السابق',
  'tutorial.finish': 'إنهاء الجولة',
  'tutorial.section.cards': 'بطاقات الكلمات',
  'tutorial.section.progress': 'التقدم والمراجعة',
  'tutorial.section.quiz': 'الاختبار',
  'tutorial.section.language': 'اللغة والنطق',
  'tutorial.section.tools': 'الأدوات',
  'tutorial.word.title': 'الكلمة والنسخ',
  'tutorial.word.text': 'اضغط على الكلمة لنسخها. الرقم في الأعلى يوضح موقعك، والشارة توضح مستوى CEFR. استخدم زر الاستماع لسماع نطق الكلمة.',
  'tutorial.example.title': 'المثال والترجمة',
  'tutorial.example.text': 'اقرأ المثال في سياقه، واضغط زر التشغيل لسماعه. الكلمة المستهدفة تكون مميزة داخل الجملة، وتظهر ترجمة المثال أسفلها.',
  'tutorial.ipa.title': 'النطق IPA',
  'tutorial.ipa.text': 'رمز IPA يوضح النطق بدقة ويساعدك على مقارنة النطق البريطاني والأمريكي. زر السماعة يستخدم صوت الجهاز المتاح.',
  'tutorial.forms.title': 'صيغ الكلمة',
  'tutorial.forms.text': 'تظهر هنا الصيغ المرتبطة مثل الجمع أو الماضي. اضغط على الصيغة لرؤية استخدامها وتمييزها داخل المثال إن توفر.',
  'tutorial.mark.title': 'أعرفها ولا أعرفها',
  'tutorial.mark.text': 'اختر أعرفها عندما تستطيع فهم الكلمة واستخدامها، ولا أعرفها عندما تحتاج مراجعة. يمكنك التراجع بالسهم أو زر التراجع.',
  'tutorial.review.title': 'المراجعة المتباعدة',
  'tutorial.review.text': 'الكلمات التي تحتاج مراجعة تظهر في موعدها. كلما أجبت بصدق تحسّن ترتيب ظهورها وفق تقدمك.',
  'tutorial.search.title': 'البحث',
  'tutorial.search.text': 'ابحث عن كلمة إنجليزية أو ترجمتها أو ملاحظتك، ثم افتحها مباشرة من نتائج البحث.',
  'tutorial.quizSentence.title': 'الجملة الشخصية',
  'tutorial.quizSentence.text': 'بعد اختيار المعنى تختفي الخيارات. اكتب جملة من إنشائك، لأن معرفة المعنى وحدها لا تكفي لإتقان الاستخدام.',
  'tutorial.multi.title': 'لغات متعددة',
  'tutorial.multi.text': 'الوضع الافتراضي يعرض لغة واحدة. فعّل اختيار عدة لغات لعرض أكثر من ترجمة، واضغط لغة لتجعلها لغة الواجهة الحالية.',
  'tutorial.speech.title': 'اختيار النطق',
  'tutorial.speech.text': 'من القائمة نفسها اختر النطق الأمريكي US أو البريطاني UK. سيحاول التطبيق اختيار الصوت المطابق ثم الصوت المحلي عند انقطاع الإنترنت.',
  'tutorial.download.title': 'التحميل والنسخ الاحتياطي',
  'tutorial.download.text': 'حمّل قوائمك ونتائجك كملفات نصية، واستخدم المزامنة أو رمز النقل لنقل التقدم إلى جهاز آخر.',
  'tutorial.tutorial.title': 'تحديث الجولة',
  'tutorial.tutorial.text': 'هذه الجولة منظمة في أقسام. عند إضافة ميزة جديدة يمكن إضافة خطوة وشرحها داخل TOUR_SECTIONS دون إعادة بناء الجولة من الصفر.',
  'settings.button': 'الإعدادات',
  'settings.title': 'تخصيص الموقع',
  'settings.fontScale': 'حجم النص',
  'settings.compact': 'بطاقات مضغوطة',
  'settings.ipa': 'إظهار IPA',
  'settings.forms': 'إظهار صيغ الكلمات',
  'settings.example': 'إظهار الأمثلة',
  'settings.translations': 'إظهار الترجمات',
  'settings.progress': 'إظهار شريط التقدم',
  'settings.largeControls': 'تكبير أزرار التحكم',
  'settings.motion': 'تقليل الحركة',
  'settings.reset': 'إعادة الإعدادات الافتراضية',
  'tutorial.section.settings': 'التخصيص',
  'tutorial.settings.title': 'تخصيص التجربة',
  'tutorial.settings.text': 'افتح الإعدادات لتغيير حجم النص، كثافة البطاقات، ظهور الأمثلة والترجمات وIPA والصيغ، حجم أزرار التحكم، وتقليل الحركة. كل اختيار يُحفظ على جهازك.',
  'forms.guide.button': 'شرح الصيغ',
  'forms.guide.title': 'كيف نستخدم صيغ الكلمة؟',
  'forms.guide.intro': 'كل صيغة تغيّر وظيفة الكلمة أو زمنها. اختر الصيغة المناسبة حسب موقع الكلمة في الجملة.',
  'forms.guide.base.use': 'الصيغة الأساسية للكلمة كما في المعجم، وتُستخدم عندما لا نحتاج لتصريفها.',
  'forms.guide.base.difference': 'هي الأصل الذي تُبنى عليه وتقارن به بقية الصيغ والتصريفات.',
  'forms.guide.singular.use': 'تُستخدم مع الاسم المفرد المعدود (شخص أو شيء واحد)، وغالبًا تسبقها أداة المفرد a أو an.',
  'forms.guide.singular.difference': 'تدل على شيء واحد فقط، بينما صيغة الجمع تدل على اثنين فأكثر.',
  'forms.guide.plural.use': 'تُستخدم مع أكثر من شخص أو شيء، مثل books وcars.',
  'forms.guide.plural.difference': 'تدل على الجمع وغالبًا تنتهي بـ s أو es، بينما الصيغة الأساسية تدل على المفرد.',
  'forms.guide.third.use': 'تُستخدم مع he أو she أو it في المضارع البسيط، وغالبًا تنتهي بـ s.',
  'forms.guide.third.difference': 'هي مضارع للغائب المفرد، وليست ماضيًا ولا صيغة مستمرة.',
  'forms.guide.S.use': 'مضارع الغائب المفرد، تُستخدم مع (he / she / it) في زمن المضارع البسيط بإضافة s أو es.',
  'forms.guide.S.difference': 'خاصة بالفاعل المفرد الغائب في المضارع فقط، وليست جمعاً ولا ماضياً.',
  'forms.guide.present.use': 'صيغة المضارع عند الحديث عن الحاضر أو العادات والحقائق.',
  'forms.guide.present.difference': 'تصف فعلًا حاضرًا، بينما past يصف فعلًا انتهى.',
  'forms.guide.past.use': 'تُستخدم لحدث وقع وانتهى في الماضي.',
  'forms.guide.past.difference': 'تحتاجها مع أزمنة الماضي، وتدل على اكتمال الحدث.',
  'forms.guide.V1.use': 'المصدر والتصريف الأول للفعل، تُستخدم في المضارع البسيط وبعد الأفعال المساعدة (to / will / can).',
  'forms.guide.V1.difference': 'هي الصيغة الأساسية المجردة للفعل قبل أي زيادة أو تصريف زمني.',
  'forms.guide.V2.use': 'التصريف الثاني (الماضي البسيط)، تُستخدم للتعبير عن حدث وقع وانتهى بالكامل في الماضي.',
  'forms.guide.V2.difference': 'تُستخدم وحدها كفعل رئيسي للماضي بدون الحاجة لأفعال مساعدة.',
  'forms.guide.V3.use': 'التصريف الثالث (اسم المفعول)، تُستخدم في الأزمنة التامة مع (have / has / had) والمبني للمجهول.',
  'forms.guide.V3.difference': 'تحتاج فعلاً مساعداً (مثل have أو be) ولا تُستخدم وحدها كفعل ماضٍ مستقل.',
  'forms.guide.pp.use': 'تُستخدم مع have أو has أو had، وأحيانًا في المبني للمجهول.',
  'forms.guide.pp.difference': 'لا تأتي عادة وحدها؛ تحتاج فعلًا مساعدًا لتكوين الزمن أو المبني للمجهول.',
  'forms.guide.pastpp.use': 'صيغة تجمع استعمال الماضي وصيغة اسم المفعول عندما تكون الكلمة غير منتظمة.',
  'forms.guide.pastpp.difference': 'قد تكون مختلفة عن past، لذلك يجب حفظ استعمالها مع have أو be.',
  'forms.guide.ing.use': 'تُستخدم مع be لوصف فعل مستمر، وقد تعمل كاسم أو صفة.',
  'forms.guide.ing.difference': 'تركّز على فعل جارٍ أو مستمر، وليست مجرد مضارع بسيط.',
  'forms.guide.ING.use': 'صيغة الـ -ing، تُستخدم مع أفعال (be) في الأزمنة المستمرة، أو كاسم فاعل/مصدر (Gerund).',
  'forms.guide.ING.difference': 'تُركّز على استمرارية الحدث في زمن معين أو تُحوّل الفعل إلى اسم.',
  'forms.guide.comp.use': 'تُستخدم لمقارنة صفة بين شيئين أو طرفين، وغالبًا تأتي متبوعة بـ than (مثل: more afraid than أو taller than).',
  'forms.guide.comp.difference': 'تقارن بين طرفين محددين فقط، بينما صيغة التفضيل تقارن طرفاً واحداً بجميع أفراد المجموعة.',
  'forms.guide.comparative.use': 'تُستخدم لمقارنة صفة بين شيئين أو طرفين، وغالبًا تأتي متبوعة بـ than (مثل: more afraid than أو taller than).',
  'forms.guide.comparative.difference': 'تقارن بين طرفين محددين فقط، بينما صيغة التفضيل تقارن طرفاً واحداً بجميع أفراد المجموعة.',
  'forms.guide.sup.use': 'تُستخدم لبيان أعلى أو أقل درجة لصفة داخل مجموعة كاملة، وغالبًا تسبقها the (مثل: the most afraid أو the tallest).',
  'forms.guide.sup.difference': 'تحدد الأفضل أو الأكثر/الأقل في المجموعة كلها، وليست مجرد مقارنة بين طرفين.',
  'forms.guide.superlative.use': 'تُستخدم لبيان أعلى أو أقل درجة لصفة داخل مجموعة كاملة، وغالبًا تسبقها the (مثل: the most afraid أو the tallest).',
  'forms.guide.superlative.difference': 'تحدد الأفضل أو الأكثر/الأقل في المجموعة كلها، وليست مجرد مقارنة بين طرفين.'
};

const EXTRA_EN = {
  'modal.sort.aria': 'Sort list',
  'lang.mode.single': 'One language',
  'lang.mode.multi': 'Choose multiple languages',
  'tutorial.button': 'Tutorial',
  'tutorial.title': 'Complete tutorial',
  'tutorial.intro': 'Learn every part of the site step by step. New features can be added to this tutorial.',
  'feedback.button': 'Send feedback',
  'feedback.title': 'Send your feedback',
  'feedback.placeholder': 'Share a suggestion or describe a problem...',
  'feedback.open': 'Send feedback',
  'feedback.note': 'Your feedback will be sent through Tally. No account or email is required for the user.',
  'feedback.setup': 'The feedback form is not connected yet. Add the Tally form URL in the site configuration.',
  'visitor.label': 'Global visits',
  'visitor.loading': 'Loading...',
  'visitor.unavailable': 'Currently unavailable',
  'tutorial.card.title': 'Word card',
  'tutorial.card.text': 'Listen to the word and example, check IPA, read the translation, then choose Know or Unknown.',
  'tutorial.levels.title': 'CEFR levels',
  'tutorial.levels.text': 'Use A1 to C1 to focus on a level that fits your learning goal.',
  'tutorial.lists.title': 'Progress lists',
  'tutorial.lists.text': 'Open Known, Unknown, and Remaining to review words in organized groups.',
  'tutorial.quiz.title': 'Review quiz',
  'tutorial.quiz.text': 'Choose the correct meaning, then write your own sentence to prove you can use the word.',
  'tutorial.language.title': 'Languages and pronunciation',
  'tutorial.language.text': 'One language is selected by default. Enable multiple languages to show translations together, and choose UK or US pronunciation.',
  'tutorial.sync.title': 'Saving and backup',
  'tutorial.sync.text': 'Use sync and download to keep a backup and move your progress between devices.',
  'tutorial.feedback.title': 'Feedback',
  'tutorial.feedback.text': 'Share a suggestion or problem through the feedback form. No GitHub account is required.',
  'tutorial.next': 'Next',
  'tutorial.previous': 'Previous',
  'tutorial.finish': 'Finish tutorial',
  'tutorial.section.cards': 'Word cards',
  'tutorial.section.progress': 'Progress and review',
  'tutorial.section.quiz': 'Quiz',
  'tutorial.section.language': 'Language and speech',
  'tutorial.section.tools': 'Tools',
  'tutorial.word.title': 'Word and copy',
  'tutorial.word.text': 'Click the word to copy it. The counter shows your position and the badge shows its CEFR level. Use the speaker button to hear it.',
  'tutorial.example.title': 'Example and translation',
  'tutorial.example.text': 'Read the example in context and use the play button to hear it. The target word is highlighted and the translation appears below.',
  'tutorial.ipa.title': 'IPA pronunciation',
  'tutorial.ipa.text': 'IPA gives a precise pronunciation reference and helps compare British and American pronunciation. The speaker uses an available device voice.',
  'tutorial.forms.title': 'Word forms',
  'tutorial.forms.text': 'Related forms such as plurals or past forms appear here. Select a form to review its use when data is available.',
  'tutorial.mark.title': 'Know and unknown',
  'tutorial.mark.text': 'Choose Know when you understand and can use the word, or Unknown when it needs review. Undo with the arrow or undo button.',
  'tutorial.review.title': 'Spaced review',
  'tutorial.review.text': 'Words become due for review over time. Honest answers improve when each word returns according to your progress.',
  'tutorial.search.title': 'Search',
  'tutorial.search.text': 'Search by English word, translation, or your note, then open a word directly from the results.',
  'tutorial.quizSentence.title': 'Personal sentence',
  'tutorial.quizSentence.text': 'After choosing a meaning, the options disappear. Write your own sentence because knowing a meaning is not the same as using a word.',
  'tutorial.multi.title': 'Multiple languages',
  'tutorial.multi.text': 'The default shows one language. Enable multiple languages to see several translations, then click a language to make it the current interface language.',
  'tutorial.speech.title': 'Pronunciation choice',
  'tutorial.speech.text': 'Choose US or UK pronunciation from the same menu. The app prefers a matching voice, then a local voice when offline.',
  'tutorial.download.title': 'Download and backup',
  'tutorial.download.text': 'Download your lists and quiz results as text files, or use sync and transfer codes to move progress to another device.',
  'tutorial.tutorial.title': 'Extending this tutorial',
  'tutorial.tutorial.text': 'This tutorial is organized into sections. Add a step and explanation to TOUR_SECTIONS when a new feature is introduced.',
  'settings.button': 'Settings',
  'settings.title': 'Customize the site',
  'settings.fontScale': 'Text size',
  'settings.compact': 'Compact cards',
  'settings.ipa': 'Show IPA',
  'settings.forms': 'Show word forms',
  'settings.example': 'Show examples',
  'settings.translations': 'Show translations',
  'settings.progress': 'Show progress bar',
  'settings.largeControls': 'Larger controls',
  'settings.motion': 'Reduce motion',
  'settings.reset': 'Reset preferences',
  'tutorial.section.settings': 'Customization',
  'tutorial.settings.title': 'Customize your experience',
  'tutorial.settings.text': 'Open Settings to change text size, card density, examples, translations, IPA, word forms, control size, and motion. Choices are saved on this device.',
  'forms.guide.button': 'Explain forms',
  'forms.guide.title': 'How do word forms work?',
  'forms.guide.intro': 'Each form changes the word’s function or tense. Choose the form that fits its position in the sentence.',
  'forms.guide.base.use': 'The base form is the normal dictionary form, used when no change is needed.',
  'forms.guide.base.difference': 'It is the root form used to compare the other forms.',
  'forms.guide.singular.use': 'Used for a single countable person or thing, often with "a" or "an".',
  'forms.guide.singular.difference': 'Refers to one item, while the plural refers to two or more.',
  'forms.guide.plural.use': 'Use it for more than one person or thing, such as books or cars.',
  'forms.guide.plural.difference': 'It marks more than one, while the base form often refers to one.',
  'forms.guide.third.use': 'Use it with he, she, or it in the present simple; it often ends in s.',
  'forms.guide.third.difference': 'It is third-person singular present, not past or continuous.',
  'forms.guide.S.use': 'Third-person singular present form, used with he, she, or it in the present simple.',
  'forms.guide.S.difference': 'Applies strictly to third-person singular in the present simple tense.',
  'forms.guide.present.use': 'Use it for the present, habits, or general facts.',
  'forms.guide.present.difference': 'It describes the present, while past describes a finished event.',
  'forms.guide.past.use': 'Use it for an event that happened and finished in the past.',
  'forms.guide.past.difference': 'It belongs to past-time sentences and does not by itself mean an action is continuing.',
  'forms.guide.V1.use': 'The base form / bare infinitive, used with plural pronouns & I/you, and after modals (to/will/can).',
  'forms.guide.V1.difference': 'The dictionary form of the verb before any inflection or tense change.',
  'forms.guide.V2.use': 'Past simple form, used to describe an event that happened and concluded in the past.',
  'forms.guide.V2.difference': 'Used on its own as the main past tense verb without auxiliary verbs.',
  'forms.guide.V3.use': 'Past participle form, used in perfect tenses (have/has/had) and passive voice (be).',
  'forms.guide.V3.difference': 'Requires an auxiliary verb like have or be and is not usually used alone as a main past verb.',
  'forms.guide.pp.use': 'Use it with have, has, or had, and sometimes in the passive voice.',
  'forms.guide.pp.difference': 'It normally needs an auxiliary verb to form a tense or passive construction.',
  'forms.guide.pastpp.use': 'This combines past and participle uses when an irregular word has a shared form.',
  'forms.guide.pastpp.difference': 'It can differ from past, so learn its use with have or be.',
  'forms.guide.ing.use': 'Use it with be for an ongoing action; it can also work as a noun or adjective.',
  'forms.guide.ing.difference': 'It focuses on an action in progress, not simply a present habit.',
  'forms.guide.ING.use': 'Continuous / gerund form (-ing), used with "be" for ongoing actions or as a verbal noun.',
  'forms.guide.ING.difference': 'Focuses on an action in progress or functions as a noun.',
  'forms.guide.comp.use': 'Use it to compare two things, often with than (e.g. more afraid than / faster than).',
  'forms.guide.comp.difference': 'It compares two specific things, while superlative compares one with a whole group.',
  'forms.guide.comparative.use': 'Use it to compare two things, often with than (e.g. more afraid than / faster than).',
  'forms.guide.comparative.difference': 'It compares two specific things, while superlative compares one with a whole group.',
  'forms.guide.sup.use': 'Use it for the highest or lowest degree in a group, often with the (e.g. the most afraid / the fastest).',
  'forms.guide.sup.difference': 'It identifies the top or bottom of a whole group rather than comparing only two things.',
  'forms.guide.superlative.use': 'Use it for the highest or lowest degree in a group, often with the (e.g. the most afraid / the fastest).',
  'forms.guide.superlative.difference': 'It identifies the top or bottom of a whole group rather than comparing only two things.'
};

const TALLY_FORM_URL = '';

const DEFAULT_LANG = 'ar';

let currentLang = DEFAULT_LANG;

function langList(){
  return (I18N && Array.isArray(I18N._langs)) ? I18N._langs : [];
}

function langExists(code){
  if(!code || typeof code !== 'string') return false;
  const list = langList();
  for(let i = 0; i < list.length; i++){
    if(list[i] && list[i].code === code) return true;
  }
  return false;
}

function langDir(code){
  const list = langList();
  for(let i = 0; i < list.length; i++){
    const l = list[i];
    if(l && l.code === code && (l.dir === 'rtl' || l.dir === 'ltr')) return l.dir;
  }
  return (code === 'ar' || code === 'ur') ? 'rtl' : 'ltr';
}

function fillParams(text, params){
  let s = String(text == null ? '' : text);
  if(params && typeof params === 'object'){
    Object.keys(params).forEach(name => {
      const v = params[name];
      s = s.split('{' + name + '}').join(v == null ? '' : String(v));
    });
  }
  return s;
}

function lookupKey(code, key){
  const bag = I18N ? I18N[code] : null;
  if(bag && typeof bag === 'object' && Object.prototype.hasOwnProperty.call(bag, key)
    && typeof bag[key] === 'string'){
    return bag[key];
  }
  return null;
}

function tFor(code, key, params){
  const k = String(key);
  let text = lookupKey(code, k);
  if(code === 'ar'){
    if(text === null && Object.prototype.hasOwnProperty.call(EXTRA_AR, k)) text = EXTRA_AR[k];
    if(text === null) text = lookupKey('en', k);
    if(text === null && Object.prototype.hasOwnProperty.call(EXTRA_EN, k)) text = EXTRA_EN[k];
  } else {
    if(text === null) text = lookupKey('en', k);
    if(text === null && Object.prototype.hasOwnProperty.call(EXTRA_EN, k)) text = EXTRA_EN[k];
  }
  if(text === null) text = k;
  return fillParams(text, params);
}

function t(key, params){
  try{
    return tFor(currentLang, key, params);
  }catch(e){
    return String(key);
  }
}

function tHtml(key, params){
  return esc(t(key, params)).split('\n').join('<br>');
}

function applyStaticI18n(){
  const nodes = document.querySelectorAll('[data-i18n]');
  for(let i = 0; i < nodes.length; i++){
    nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
  }
  const ph = document.querySelectorAll('[data-i18n-placeholder]');
  for(let i = 0; i < ph.length; i++){
    ph[i].setAttribute('placeholder', t(ph[i].getAttribute('data-i18n-placeholder')));
  }
  const ti = document.querySelectorAll('[data-i18n-title]');
  for(let i = 0; i < ti.length; i++){
    ti[i].setAttribute('title', t(ti[i].getAttribute('data-i18n-title')));
  }
  const ar = document.querySelectorAll('[data-i18n-aria]');
  for(let i = 0; i < ar.length; i++){
    ar[i].setAttribute('aria-label', t(ar[i].getAttribute('data-i18n-aria')));
  }
}

function updateLangSelect(){
  const sel = document.getElementById('langSelect');
  if(sel) sel.value = currentLang;
  const label = document.getElementById('langSelectLabel');
  const current = langList().find(l => l && l.code === currentLang);
  if(label) label.textContent = current ? (current.name || current.code) : currentLang;
  document.querySelectorAll('#langMenu [data-lang]').forEach(item => {
    const active = (state.ui.displayLangs || [currentLang]).indexOf(item.getAttribute('data-lang')) !== -1;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', active ? 'true' : 'false');
    const check = item.querySelector('.lang-option-check');
    if(check) check.textContent = active ? '✓' : '';
  });
  const code = document.getElementById('langCode');
  if(code) code.textContent = String(currentLang || '').toUpperCase();
  const multiLabel = document.getElementById('multiLangLabel');
  if(multiLabel) multiLabel.textContent = t('lang.mode.multi');
  const accentLabel = document.getElementById('speechAccentLabel');
  if(accentLabel) accentLabel.textContent = t('speech.accent.label');
  const accent = document.getElementById('speechAccent');
  if(accent){
    accent.setAttribute('aria-label', t('speech.accent.label'));
    const us = accent.querySelector('option[value="us"]');
    const uk = accent.querySelector('option[value="uk"]');
    if(us) us.textContent = t('speech.accent.us');
    if(uk) uk.textContent = t('speech.accent.uk');
  }
}

function buildLangSelect(){
  const sel = document.getElementById('langSelect');
  if(!sel) return;
  const options = [];
  langList().forEach(l => {
    if(!l || !l.code) return;
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.name || l.code;
    options.push(opt);
  });
  sel.replaceChildren(...options);
  sel.value = currentLang;
  sel.addEventListener('change', () => { applyLang(sel.value); });

  const menu = document.getElementById('langMenu');
  const trigger = document.getElementById('langSelectButton');
  if(!menu || !trigger) return;
  menu.innerHTML = langList().filter(l => l && l.code).map(l => (
    `<button type="button" class="lang-option" role="option" data-lang="${esc(l.code)}"
      aria-selected="${l.code === currentLang ? 'true' : 'false'}">
      <span class="lang-option-code">${esc(String(l.code).toUpperCase())}</span>
      <span>${esc(l.name || l.code)}</span><span class="lang-option-check" aria-hidden="true"></span>
    </button>`
  )).join('') + `<div class="language-mode">
    <label><input type="checkbox" id="multiLangToggle"> <span id="multiLangLabel"></span></label>
  </div><div class="speech-choice">
    <label id="speechAccentLabel" for="speechAccent">${esc(t('speech.accent.label'))}</label>
    <select id="speechAccent" aria-label="${esc(t('speech.accent.label'))}">
      <option value="us">${esc(t('speech.accent.us'))}</option>
      <option value="uk">${esc(t('speech.accent.uk'))}</option>
    </select>
  </div>`;
  const close = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };
  trigger.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    trigger.setAttribute('aria-expanded', menu.hidden ? 'false' : 'true');
  });
  const multiToggle = document.getElementById('multiLangToggle');
  if(multiToggle){
    multiToggle.checked = state.ui.multiLang === true;
    multiToggle.addEventListener('change', () => {
      state.ui.multiLang = multiToggle.checked;
      if(!multiToggle.checked) state.ui.displayLangs = [currentLang];
      scheduleSave();
      updateLangSelect();
      render();
    });
  }
  const multiLabel = document.getElementById('multiLangLabel');
  if(multiLabel) multiLabel.textContent = t(state.ui.multiLang ? 'lang.mode.multi' : 'lang.mode.multi');
  menu.querySelectorAll('[data-lang]').forEach(item => {
    item.addEventListener('click', () => {
      toggleDisplayLang(item.getAttribute('data-lang'));
    });
  });
  const accent = document.getElementById('speechAccent');
  if(accent){
    accent.value = state.ui.speechAccent || 'us';
    accent.addEventListener('change', () => {
      state.ui.speechAccent = accent.value === 'uk' ? 'uk' : 'us';
      scheduleSave();
    });
  }
  document.addEventListener('click', e => {
    if(!e.target.closest('.lang-switch')) close();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
  });
  updateLangSelect();
}

function applyLang(code){
  const next = langExists(code) ? code : DEFAULT_LANG;
  currentLang = next;
  if(state && state.ui) state.ui.lang = next;
  if(state && state.ui){
    if(state.ui.multiLang === true && state.ui.displayLangs.indexOf(next) === -1){
      state.ui.displayLangs.unshift(next);
    }else if(state.ui.multiLang !== true){
      state.ui.displayLangs = [next];
    }
  }
  scheduleSave();
  document.documentElement.lang = next;
  document.documentElement.dir = langDir(next);
  applyStaticI18n();
  document.title = t('brand.title') + ' - Oxford 5000';
  buildLevelBar();
  render();
  updateLangSelect();
  if(isReviewOpen()) renderReviewList(currentSearch());
  if(isSyncOpen()) renderSyncStatus();
  refreshSearchForLang();
  refreshMergeSummary();
  refreshQuizForLang();
  updateBackupBanner();
  updateDueLine();
}

function toggleDisplayLang(code){
  if(!langExists(code)) return;
  if(state.ui.multiLang !== true){
    currentLang = code;
    state.ui.lang = code;
    state.ui.displayLangs = [code];
    scheduleSave();
    document.documentElement.lang = currentLang;
    document.documentElement.dir = langDir(currentLang);
    applyStaticI18n();
    document.title = t('brand.title') + ' - Oxford 5000';
    buildLevelBar();
    render();
    updateLangSelect();
    return;
  }
  const selected = Array.isArray(state.ui.displayLangs) ? state.ui.displayLangs.slice() : [currentLang];
  const i = selected.indexOf(code);
  currentLang = code;
  if(i < 0){
    selected.push(code);
  }
  state.ui.displayLangs = selected;
  state.ui.lang = currentLang;
  scheduleSave();
  document.documentElement.lang = currentLang;
  document.documentElement.dir = langDir(currentLang);
  applyStaticI18n();
  document.title = t('brand.title') + ' - Oxford 5000';
  buildLevelBar();
  render();
  updateLangSelect();
}

const STORAGE_KEY = 'oxford5000_progress_v3';
const LEGACY_KEY = 'oxford5000_progress_v2';
const SEED_KEYS = ['all'].concat(LEVEL_ORDER);

const ENTRIES_BY_LEVEL = { all: ENTRIES.slice() };
LEVEL_ORDER.forEach(lvl => { ENTRIES_BY_LEVEL[lvl] = []; });
const ENTRY_LEVEL = new Map();
ENTRIES.forEach(e => {
  const lvl = (e.level || 'a1').toLowerCase();
  if(ENTRIES_BY_LEVEL[lvl]) ENTRIES_BY_LEVEL[lvl].push(e);
  ENTRY_LEVEL.set(e.id, lvl);
  ENTRY_LEVEL.set(e.word, lvl);
});

const WORDS_BY_LEVEL = ENTRIES_BY_LEVEL;
const WORD_LEVEL = ENTRY_LEVEL;

function wordsOfLevel(lvl){
  return ENTRIES_BY_LEVEL[lvl] || [];
}

const WORD_INDEX = new Map();
ENTRIES.forEach((e, i) => {
  if(!WORD_INDEX.has(e.id)) WORD_INDEX.set(e.id, i);
  if(!WORD_INDEX.has(e.word)) WORD_INDEX.set(e.word, i);
  if(!WORD_INDEX.has(e.word.toLowerCase())) WORD_INDEX.set(e.word.toLowerCase(), i);
});

let SENT_INDEX = null;
function sentIndexOf(sentence){
  if(!SENT_INDEX){
    SENT_INDEX = new Map();
    ENTRIES.forEach((e, i) => {
      if(e.example && !SENT_INDEX.has(e.example)) SENT_INDEX.set(e.example, i);
    });
  }
  return SENT_INDEX.has(sentence) ? SENT_INDEX.get(sentence) : -1;
}

function makeDeviceId(){
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  try{
    const bytes = new Uint8Array(12);
    if(window.crypto && window.crypto.getRandomValues){
      window.crypto.getRandomValues(bytes);
    } else {
      for(let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    for(let i = 0; i < bytes.length; i++) out += chars.charAt(bytes[i] % chars.length);
  }catch(e){
    out = '';
    for(let i = 0; i < 12; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out || 'dev000000000';
}

function defaultUi(){
  const seed = {};
  SEED_KEYS.forEach(k => { seed[k] = null; });
  return {
    currentLevel: 'all',
    seed: seed,
    sort: 'level_asc',
    lastBackupAt: null,
    lastLinkAt: null,
    changesSinceBackup: 0,
    snoozeUntil: null,
    lang: DEFAULT_LANG,
    displayLangs: [DEFAULT_LANG],
    multiLang: false,
    onboardingSeen: false,
    speechAccent: 'us',
    audioSpeed: 1.0,
    habit: {
      streak: 0,
      lastActiveDate: null,
      bestStreak: 0,
      todayCount: 0,
      todayDate: null,
      goal: 20,
      celebratedDate: null
    },
    records: {
      timeAttackBest: 0,
      matchBestTime: null,
      matchBestCombo: 0
    },
    preferences: {
      fontScale: 100,
      compactCards: false,
      showIpa: true,
      showForms: true,
      showExample: true,
      showTranslations: true,
      showProgress: true,
      largeControls: false,
      reducedMotion: false,
      autoPronounce: false
    },
    quizSettings: defaultQuizSettings(),
    quizStreak: { last: null, n: 0 },
    lastQuiz: { date: null, correct: 0, total: 0 }
  };
}

function cloneUi(ui){
  const out = defaultUi();
  if(ui && typeof ui === 'object'){
    const lvl = ui.currentLevel;
    if(lvl === 'all' || LEVEL_ORDER.indexOf(lvl) !== -1) out.currentLevel = lvl;
    if(typeof ui.sort === 'string' && ui.sort) out.sort = ui.sort;
    const seed = (ui.seed && typeof ui.seed === 'object') ? ui.seed : {};
    SEED_KEYS.forEach(k => {
      out.seed[k] = (typeof seed[k] === 'number') ? seed[k] : null;
    });
    out.lastBackupAt = Number.isFinite(ui.lastBackupAt) ? ui.lastBackupAt : null;
    out.lastLinkAt = Number.isFinite(ui.lastLinkAt) ? ui.lastLinkAt : null;
    out.changesSinceBackup = Number.isFinite(ui.changesSinceBackup) ? ui.changesSinceBackup : 0;
    out.snoozeUntil = Number.isFinite(ui.snoozeUntil) ? ui.snoozeUntil : null;
    if(typeof ui.lang === 'string' && langExists(ui.lang)) out.lang = ui.lang;
    if(Array.isArray(ui.displayLangs)){
      const selected = ui.displayLangs.filter(code => langExists(code));
      if(selected.length) out.displayLangs = Array.from(new Set(selected));
    }
    if(out.displayLangs.indexOf(out.lang) === -1) out.displayLangs.unshift(out.lang);
    out.multiLang = ui.multiLang === true;
    if(!out.multiLang) out.displayLangs = [out.lang];
    out.onboardingSeen = ui.onboardingSeen === true;
    if(ui.speechAccent === 'uk' || ui.speechAccent === 'us') out.speechAccent = ui.speechAccent;
    if(Number.isFinite(ui.audioSpeed) && ui.audioSpeed > 0 && ui.audioSpeed <= 2) out.audioSpeed = ui.audioSpeed;

    if(ui.habit && typeof ui.habit === 'object'){
      const h = ui.habit;
      out.habit.streak = Number.isFinite(h.streak) ? Math.max(0, Math.floor(h.streak)) : 0;
      out.habit.lastActiveDate = (typeof h.lastActiveDate === 'string') ? h.lastActiveDate : null;
      out.habit.bestStreak = Number.isFinite(h.bestStreak) ? Math.max(0, Math.floor(h.bestStreak)) : 0;
      out.habit.todayCount = Number.isFinite(h.todayCount) ? Math.max(0, Math.floor(h.todayCount)) : 0;
      out.habit.todayDate = (typeof h.todayDate === 'string') ? h.todayDate : null;
      out.habit.goal = Number.isFinite(h.goal) ? Math.max(5, Math.floor(h.goal)) : 20;
      out.habit.celebratedDate = (typeof h.celebratedDate === 'string') ? h.celebratedDate : null;
    }

    if(ui.records && typeof ui.records === 'object'){
      const r = ui.records;
      out.records.timeAttackBest = Number.isFinite(r.timeAttackBest) ? Math.max(0, Math.floor(r.timeAttackBest)) : 0;
      out.records.matchBestTime = Number.isFinite(r.matchBestTime) ? Math.max(0, Math.floor(r.matchBestTime)) : null;
      out.records.matchBestCombo = Number.isFinite(r.matchBestCombo) ? Math.max(0, Math.floor(r.matchBestCombo)) : 0;
    }

    if(ui.preferences && typeof ui.preferences === 'object'){
      const p = ui.preferences;
      if(Number.isFinite(p.fontScale)) out.preferences.fontScale = Math.max(90, Math.min(120, Math.round(p.fontScale)));
      out.preferences.compactCards = p.compactCards === true;
      out.preferences.showIpa = p.showIpa !== false;
      out.preferences.showForms = p.showForms !== false;
      out.preferences.showExample = p.showExample !== false;
      out.preferences.showTranslations = p.showTranslations !== false;
      out.preferences.showProgress = p.showProgress !== false;
      out.preferences.largeControls = p.largeControls === true;
      out.preferences.reducedMotion = p.reducedMotion === true;
      out.preferences.autoPronounce = p.autoPronounce === true;
    }

    const qs = (ui.quizSettings && typeof ui.quizSettings === 'object') ? ui.quizSettings : {};
    if(qs.source === 'due' || qs.source === 'all') out.quizSettings.source = qs.source;
    if(qs.level === 'all' || LEVEL_ORDER.indexOf(qs.level) !== -1) out.quizSettings.level = qs.level;
    if(qs.count === 10 || qs.count === 20 || qs.count === 0) out.quizSettings.count = qs.count;

    if(ui.quizStreak && typeof ui.quizStreak === 'object'){
      out.quizStreak.last = (typeof ui.quizStreak.last === 'string') ? ui.quizStreak.last : null;
      out.quizStreak.n = Number.isFinite(ui.quizStreak.n) ? Math.max(0, Math.floor(ui.quizStreak.n)) : 0;
    }
    if(ui.lastQuiz && typeof ui.lastQuiz === 'object'){
      out.lastQuiz.date = (typeof ui.lastQuiz.date === 'string') ? ui.lastQuiz.date : null;
      out.lastQuiz.correct = Number.isFinite(ui.lastQuiz.correct) ? Math.max(0, Math.floor(ui.lastQuiz.correct)) : 0;
      out.lastQuiz.total = Number.isFinite(ui.lastQuiz.total) ? Math.max(0, Math.floor(ui.lastQuiz.total)) : 0;
    }
  }
  return out;
}

function freshState(){
  return {
    v: 3,
    deviceId: makeDeviceId(),
    marks: {},
    notes: {},
    customEdits: {},
    srs: {},
    ui: defaultUi(),
    history: []
  };
}

function normalizeState(s){
  const out = freshState();
  if(!s || typeof s !== 'object') return out;
  out.deviceId = (typeof s.deviceId === 'string' && s.deviceId) ? s.deviceId : out.deviceId;
  out.ui = cloneUi(s.ui);
  if(s.marks && typeof s.marks === 'object'){
    Object.keys(s.marks).forEach(w => {
      const m = s.marks[w];
      if(m && (m.s === 'k' || m.s === 'u' || m.s === 'r')){
        out.marks[w] = { s: m.s, t: Number(m.t) || 0 };
      }
    });
  }
  if(s.notes && typeof s.notes === 'object'){
    Object.keys(s.notes).forEach(w => {
      const n = s.notes[w];
      if(n && typeof n.v === 'string'){
        out.notes[w] = { v: n.v, t: Number(n.t) || 0 };
      }
    });
  }
  if(s.customEdits && typeof s.customEdits === 'object'){
    Object.keys(s.customEdits).forEach(k => {
      const ed = s.customEdits[k];
      if(ed && typeof ed === 'object'){
        out.customEdits[k] = {
          tr: typeof ed.tr === 'string' ? ed.tr.slice(0, 300) : '',
          ex: typeof ed.ex === 'string' ? ed.ex.slice(0, 500) : '',
          ex_tr: typeof ed.ex_tr === 'string' ? ed.ex_tr.slice(0, 500) : '',
          forms: typeof ed.forms === 'string' ? ed.forms.slice(0, 300) : '',
          t: Number(ed.t) || 0
        };
      }
    });
  }
  if(s.srs && typeof s.srs === 'object'){
    Object.keys(s.srs).forEach(w => {
      const e = s.srs[w];
      if(e && Number.isInteger(e.box) && e.box >= 1 && e.box <= 5
        && Number.isFinite(e.due) && Number.isFinite(e.t)){
        out.srs[w] = { box: e.box, due: Number(e.due), t: Number(e.t) };
      }
    });
  }
  if(Array.isArray(s.history)){
    out.history = s.history.filter(h => h && typeof h.word === 'string').map(h => ({
      word: h.word,
      prev: (h.prev && (h.prev.s === 'k' || h.prev.s === 'u' || h.prev.s === 'r'))
        ? { s: h.prev.s, t: Number(h.prev.t) || 0 }
        : null
    })).slice(-50);
  }
  return out;
}

// Converts the old index-based v2 object into a v3 state without touching v2 storage.
function migrateV2(oldObj, WORDS, now){
  const out = freshState();
  if(!oldObj || typeof oldObj !== 'object') return out;
  const known = (oldObj.known && typeof oldObj.known === 'object') ? oldObj.known : {};
  const unknown = (oldObj.unknown && typeof oldObj.unknown === 'object') ? oldObj.unknown : {};
  const notes = (oldObj.translations && typeof oldObj.translations === 'object') ? oldObj.translations : {};

  function addMark(idx, s){
    const i = Number(idx);
    if(!Number.isInteger(i) || i < 0 || i >= WORDS.length || !WORDS[i]) return;
    if(out.marks[WORDS[i]]) return;
    out.marks[WORDS[i]] = { s: s, t: now };
  }

  Object.keys(known).forEach(k => { if(known[k]) addMark(k, 'k'); });
  Object.keys(unknown).forEach(k => { if(unknown[k]) addMark(k, 'u'); });
  Object.keys(notes).forEach(k => {
    const i = Number(k);
    if(!Number.isInteger(i) || i < 0 || i >= WORDS.length || !WORDS[i]) return;
    const v = notes[k];
    if(typeof v === 'string' && v !== '') out.notes[WORDS[i]] = { v: v, t: now };
  });

  const lvl = oldObj.currentLevel;
  if(lvl === 'all' || LEVEL_ORDER.indexOf(lvl) !== -1) out.ui.currentLevel = lvl;
  return out;
}

// Pure merge. ui/history/deviceId come from `a`. Marks use priority k > u > r on equal timestamps.
// Notes with equal timestamps are tie-broken by value so the result is commutative.
function mergeStates(a, b){
  const A = (a && typeof a === 'object') ? a : {};
  const B = (b && typeof b === 'object') ? b : {};
  const AM = (A.marks && typeof A.marks === 'object') ? A.marks : {};
  const BM = (B.marks && typeof B.marks === 'object') ? B.marks : {};
  const AN = (A.notes && typeof A.notes === 'object') ? A.notes : {};
  const BN = (B.notes && typeof B.notes === 'object') ? B.notes : {};
  const AS = (A.srs && typeof A.srs === 'object') ? A.srs : {};
  const BS = (B.srs && typeof B.srs === 'object') ? B.srs : {};

  const out = {
    v: 3,
    deviceId: A.deviceId || B.deviceId || null,
    marks: {},
    notes: {},
    customEdits: {},
    srs: {},
    ui: cloneUi(A.ui || B.ui),
    history: Array.isArray(A.history) ? A.history.slice() : []
  };

  const RANK = { k: 3, u: 2, r: 1 };

  const mkeys = Object.keys(AM).concat(Object.keys(BM));
  for(let i = 0; i < mkeys.length; i++){
    const w = mkeys[i];
    if(out.marks[w] !== undefined) continue;
    const x = AM[w];
    const y = BM[w];
    let win;
    if(!x) win = y;
    else if(!y) win = x;
    else {
      const xt = Number(x.t) || 0;
      const yt = Number(y.t) || 0;
      if(yt > xt) win = y;
      else if(xt > yt) win = x;
      else win = ((RANK[y.s] || 0) > (RANK[x.s] || 0)) ? y : x;
    }
    if(win) out.marks[w] = { s: win.s, t: Number(win.t) || 0 };
  }

  const nkeys = Object.keys(AN).concat(Object.keys(BN));
  for(let i = 0; i < nkeys.length; i++){
    const w = nkeys[i];
    if(out.notes[w] !== undefined) continue;
    const x = AN[w];
    const y = BN[w];
    let win;
    if(!x) win = y;
    else if(!y) win = x;
    else {
      const xt = Number(x.t) || 0;
      const yt = Number(y.t) || 0;
      if(yt > xt) win = y;
      else if(xt > yt) win = x;
      else if(x.v === y.v) win = x;
      else win = (String(y.v) > String(x.v)) ? y : x;
    }
    if(win) out.notes[w] = { v: String(win.v == null ? '' : win.v), t: Number(win.t) || 0 };
  }

  const skeys = Object.keys(AS).concat(Object.keys(BS));
  for(let i = 0; i < skeys.length; i++){
    const w = skeys[i];
    if(out.srs[w] !== undefined) continue;
    const x = AS[w];
    const y = BS[w];
    let win;
    if(!x) win = y;
    else if(!y) win = x;
    else {
      const xt = Number(x.t) || 0;
      const yt = Number(y.t) || 0;
      if(yt > xt) win = y;
      else if(xt > yt) win = x;
      else if((Number(y.box) || 0) !== (Number(x.box) || 0)) win = ((Number(y.box) || 0) > (Number(x.box) || 0)) ? y : x;
      else win = ((Number(y.due) || 0) > (Number(x.due) || 0)) ? y : x;
    }
    if(win) out.srs[w] = { box: Number(win.box) || 1, due: Number(win.due) || 0, t: Number(win.t) || 0 };
  }

  const AE = (A.customEdits && typeof A.customEdits === 'object') ? A.customEdits : {};
  const BE = (B.customEdits && typeof B.customEdits === 'object') ? B.customEdits : {};
  const ekeys = Object.keys(AE).concat(Object.keys(BE));
  for(let i = 0; i < ekeys.length; i++){
    const k = ekeys[i];
    if(out.customEdits[k] !== undefined) continue;
    const x = AE[k];
    const y = BE[k];
    let win;
    if(!x) win = y;
    else if(!y) win = x;
    else {
      const xt = Number(x.t) || 0;
      const yt = Number(y.t) || 0;
      if(yt > xt) win = y;
      else if(xt > yt) win = x;
      else win = x;
    }
    if(win){
      out.customEdits[k] = {
        tr: typeof win.tr === 'string' ? win.tr : '',
        ex: typeof win.ex === 'string' ? win.ex : '',
        ex_tr: typeof win.ex_tr === 'string' ? win.ex_tr : '',
        forms: typeof win.forms === 'string' ? win.forms : '',
        t: Number(win.t) || 0
      };
    }
  }

  return out;
}

function applyMark(marks, word, s, now){
  const next = Object.assign({}, marks);
  next[word] = { s: s, t: now };
  return next;
}

function pushHistoryEntry(history, entry){
  const h = Array.isArray(history) ? history.slice() : [];
  h.push(entry);
  while(h.length > 50) h.shift();
  return h;
}

function applyUndo(marks, entry, now){
  const next = Object.assign({}, marks);
  if(!entry) return next;
  const wordKey = typeof entry.word === 'string' ? entry.word : null;
  const idKey = entry.id != null ? entry.id : null;
  const newStatus = entry.prev ? { s: entry.prev.s, t: now } : { s: 'r', t: now };

  if(wordKey){
    next[wordKey] = newStatus;
  }
  if(idKey != null){
    next[idKey] = newStatus;
    next[String(idKey)] = newStatus;
  }
  return next;
}

// ---------- Step 2: shared, DOM-free progress functions ----------

function buildProgress(s){
  const src = (s && typeof s === 'object') ? s : {};
  const out = {
    app: 'oxford5000',
    v: 3,
    exportedAt: Date.now(),
    deviceId: src.deviceId,
    marks: {},
    notes: {}
  };

  const marks = (src.marks && typeof src.marks === 'object') ? src.marks : {};
  Object.keys(marks).forEach(w => {
    const m = marks[w];
    if(m) out.marks[w] = { s: m.s, t: m.t };
  });

  const notes = (src.notes && typeof src.notes === 'object') ? src.notes : {};
  Object.keys(notes).forEach(w => {
    const n = notes[w];
    if(n) out.notes[w] = { v: n.v, t: n.t };
  });

  if(src.srs && typeof src.srs === 'object'){
    out.srs = {};
    Object.keys(src.srs).forEach(w => {
      const e = src.srs[w];
      if(e) out.srs[w] = { box: e.box, due: e.due, t: e.t };
    });
  }

  if(src.customEdits && typeof src.customEdits === 'object'){
    out.customEdits = {};
    Object.keys(src.customEdits).forEach(k => {
      const ed = src.customEdits[k];
      if(ed) out.customEdits[k] = {
        tr: String(ed.tr || '').slice(0, 300),
        ex: String(ed.ex || '').slice(0, 500),
        ex_tr: String(ed.ex_tr || '').slice(0, 500),
        forms: String(ed.forms || '').slice(0, 300),
        t: Number(ed.t) || 0
      };
    });
  }

  return out;
}

function validateImport(obj, WORDS, now){
  if(!obj || typeof obj !== 'object' || Array.isArray(obj)){
    return { ok: false, clean: null, skipped: 0, error: 'invalid' };
  }
  if(obj.app !== 'oxford5000' || obj.v !== 3){
    return { ok: false, clean: null, skipped: 0, error: 'notours' };
  }

  const wordSet = new Set();
  if(Array.isArray(WORDS)){
    WORDS.forEach(item => {
      if(typeof item === 'object' && item !== null){
        wordSet.add(String(item.id));
        wordSet.add(item.word);
      } else {
        wordSet.add(String(item));
      }
    });
  }
  const maxT = now + 86400000;
  const maxDue = now + 60 * 86400000;
  const clampT = t => (t > maxT ? now : t);

  const clean = {
    app: 'oxford5000',
    v: 3,
    deviceId: (typeof obj.deviceId === 'string') ? obj.deviceId : '',
    marks: {},
    notes: {}
  };

  let skipped = 0;

  const marks = (obj.marks && typeof obj.marks === 'object') ? obj.marks : {};
  Object.keys(marks).forEach(w => {
    const m = marks[w];
    if(wordSet.has(w) && m && (m.s === 'k' || m.s === 'u' || m.s === 'r') && Number.isFinite(m.t)){
      clean.marks[w] = { s: m.s, t: clampT(m.t) };
    } else {
      skipped++;
    }
  });

  const notes = (obj.notes && typeof obj.notes === 'object') ? obj.notes : {};
  Object.keys(notes).forEach(w => {
    const n = notes[w];
    if(wordSet.has(w) && n && typeof n.v === 'string' && n.v.length <= 300 && Number.isFinite(n.t)){
      clean.notes[w] = { v: n.v, t: clampT(n.t) };
    } else {
      skipped++;
    }
  });

  if(obj.srs && typeof obj.srs === 'object'){
    clean.srs = {};
    Object.keys(obj.srs).forEach(w => {
      const e = obj.srs[w];
      if(wordSet.has(w) && e && Number.isInteger(e.box) && e.box >= 1 && e.box <= 5
        && Number.isFinite(e.due) && Number.isFinite(e.t)){
        clean.srs[w] = {
          box: e.box,
          due: Math.min(e.due, maxDue),
          t: clampT(e.t)
        };
      } else {
        skipped++;
      }
    });
  }

  if(obj.customEdits && typeof obj.customEdits === 'object'){
    clean.customEdits = {};
    Object.keys(obj.customEdits).forEach(k => {
      const ed = obj.customEdits[k];
      if(wordSet.has(k) && ed && typeof ed === 'object' && Number.isFinite(ed.t)){
        clean.customEdits[k] = {
          tr: typeof ed.tr === 'string' ? ed.tr.slice(0, 300) : '',
          ex: typeof ed.ex === 'string' ? ed.ex.slice(0, 500) : '',
          ex_tr: typeof ed.ex_tr === 'string' ? ed.ex_tr.slice(0, 500) : '',
          forms: typeof ed.forms === 'string' ? ed.forms.slice(0, 300) : '',
          t: clampT(ed.t)
        };
      } else {
        skipped++;
      }
    });
  }

  clean.skipped = skipped;
  return { ok: true, clean: clean, skipped: skipped, error: null };
}

function sameFieldMap(a, b, fields){
  const x = (a && typeof a === 'object') ? a : {};
  const y = (b && typeof b === 'object') ? b : {};
  const xk = Object.keys(x).sort();
  const yk = Object.keys(y).sort();
  if(xk.length !== yk.length) return false;
  for(let i = 0; i < xk.length; i++){
    if(xk[i] !== yk[i]) return false;
    const xv = x[xk[i]];
    const yv = y[yk[i]];
    if(!xv || !yv) return false;
    for(let j = 0; j < fields.length; j++){
      if(xv[fields[j]] !== yv[fields[j]]) return false;
    }
  }
  return true;
}

function sameProgress(a, b){
  if(!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  return sameFieldMap(a.marks, b.marks, ['s', 't'])
    && sameFieldMap(a.notes, b.notes, ['v', 't'])
    && sameFieldMap(a.srs || {}, b.srs || {}, ['box', 'due', 't'])
    && sameFieldMap(a.customEdits || {}, b.customEdits || {}, ['tr', 'ex', 'ex_tr', 'forms', 't']);
}

function b64urlEncode(bytes){
  let bin = '';
  for(let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function b64urlDecode(str){
  const clean = String(str || '').replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if(!/^[A-Za-z0-9+/]*={0,2}$/.test(clean)) throw new Error('invalid base64');
  const pad = clean.length % 4 ? '='.repeat(4 - (clean.length % 4)) : '';
  const bin = atob(clean + pad);
  const bytes = new Uint8Array(bin.length);
  for(let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// ---------- Compact sync code (OX6) ----------
//
// OX5 stored the whole progress as JSON, so a full deck produced an 80k-character
// code. OX6 stores word indexes instead of word strings, timestamps as small
// offsets from the export date, and notes as UTF-8. A 4-byte fingerprint of the
// word list makes sure indexes are only decoded against the same dataset.

const SYNC_PAYLOAD_VERSION = 1;
const SYNC_MARK_STATES = ['k', 'u', 'r'];
const SYNC_MAX_NOTE_CHARS = 300;
const SYNC_MAX_TEXT_BYTES = 1200;
const SYNC_MAX_DEVICE_BYTES = 64;
const SYNC_MAX_INPUT_CHARS = 204800;

let WORDS_FINGERPRINT = null;
let WORD_POSITIONS = null;

function wordsFingerprint(){
  if(WORDS_FINGERPRINT !== null) return WORDS_FINGERPRINT;
  let h = 0x811c9dc5;
  for(let i = 0; i < ENTRIES.length; i++){
    const s = String(ENTRIES[i].word || '') + ':' + String(ENTRIES[i].id);
    for(let j = 0; j < s.length; j++){
      h ^= s.charCodeAt(j);
      h = Math.imul(h, 0x01000193);
    }
    h ^= 10;
    h = Math.imul(h, 0x01000193);
  }
  WORDS_FINGERPRINT = h >>> 0;
  return WORDS_FINGERPRINT;
}

function wordPosition(wordOrId){
  if(!WORD_POSITIONS){
    WORD_POSITIONS = Object.create(null);
    for(let i = 0; i < ENTRIES.length; i++){
      WORD_POSITIONS[ENTRIES[i].id] = i;
      WORD_POSITIONS[ENTRIES[i].word] = i;
    }
  }
  const at = WORD_POSITIONS[wordOrId];
  return (typeof at === 'number') ? at : -1;
}

function makeSyncWriter(){
  const out = [];
  const w = {
    byte(v){ out.push(v & 255); },
    u32(v){
      const n = v >>> 0;
      out.push(n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255);
    },
    varint(v){
      let n = Math.floor(v);
      if(!(n >= 0)) n = 0;
      while(n >= 128){
        out.push((n % 128) | 128);
        n = Math.floor(n / 128);
      }
      out.push(n);
    },
    sint(v){
      const n = Math.floor(v);
      w.varint(n >= 0 ? n * 2 : (-n) * 2 - 1);
    },
    text(s){
      const b = new TextEncoder().encode(String(s == null ? '' : s));
      w.varint(b.length);
      for(let i = 0; i < b.length; i++) out.push(b[i]);
    },
    bytes(){ return new Uint8Array(out); }
  };
  return w;
}

function makeSyncReader(bytes){
  let pos = 0;
  const r = {
    byte(){
      if(pos >= bytes.length) throw new Error('payload ended');
      return bytes[pos++];
    },
    u32(){
      const a = r.byte();
      const b = r.byte();
      const c = r.byte();
      const d = r.byte();
      return (a | (b << 8) | (c << 16) | (d << 24)) >>> 0;
    },
    varint(){
      let value = 0;
      let scale = 1;
      for(let i = 0; i < 5; i++){
        const b = r.byte();
        value += (b & 127) * scale;
        if(!(b & 128)) return value;
        scale *= 128;
      }
      throw new Error('bad varint');
    },
    sint(){
      const z = r.varint();
      return (z % 2 === 0) ? (z / 2) : -((z + 1) / 2);
    },
    text(maxBytes){
      const n = r.varint();
      if(n > maxBytes || pos + n > bytes.length) throw new Error('bad text');
      const slice = bytes.subarray(pos, pos + n);
      pos += n;
      return new TextDecoder().decode(slice);
    },
    done(){ return pos >= bytes.length; }
  };
  return r;
}

function encodeSyncPayload(progress, fingerprint, isDelta){
  const p = (progress && typeof progress === 'object') ? progress : {};
  const baseSec = Math.floor((Number(p.exportedAt) || Date.now()) / 1000);
  const w = makeSyncWriter();

  w.byte(SYNC_PAYLOAD_VERSION);
  w.byte(isDelta ? 1 : 0);
  w.u32(fingerprint >>> 0);
  w.varint(baseSec);
  w.text(String(p.deviceId || '').slice(0, 64));

  const marks = (p.marks && typeof p.marks === 'object') ? p.marks : {};
  const markRows = [];
  Object.keys(marks).forEach(word => {
    const at = wordPosition(word);
    const m = marks[word];
    if(at < 0 || !m) return;
    const code = (m.s === 'k') ? 0 : (m.s === 'u') ? 1 : (m.s === 'r') ? 2 : -1;
    if(code < 0) return;
    markRows.push([at, code, Math.floor((Number(m.t) || 0) / 1000)]);
  });
  markRows.sort((a, b) => a[0] - b[0]);
  w.varint(markRows.length);
  let prev = -1;
  for(let i = 0; i < markRows.length; i++){
    const row = markRows[i];
    w.varint(row[0] - prev - 1);
    prev = row[0];
    w.byte(row[1]);
    w.sint(row[2] - baseSec);
  }

  const notes = (p.notes && typeof p.notes === 'object') ? p.notes : {};
  const noteRows = [];
  Object.keys(notes).forEach(word => {
    const at = wordPosition(word);
    const n = notes[word];
    if(at < 0 || !n || typeof n.v !== 'string') return;
    if(n.v.length > SYNC_MAX_NOTE_CHARS) return;
    noteRows.push([at, n.v, Math.floor((Number(n.t) || 0) / 1000)]);
  });
  noteRows.sort((a, b) => a[0] - b[0]);
  w.varint(noteRows.length);
  prev = -1;
  for(let i = 0; i < noteRows.length; i++){
    const row = noteRows[i];
    w.varint(row[0] - prev - 1);
    prev = row[0];
    w.text(row[1]);
    w.sint(row[2] - baseSec);
  }

  const srs = (p.srs && typeof p.srs === 'object') ? p.srs : {};
  const srsRows = [];
  Object.keys(srs).forEach(word => {
    const at = wordPosition(word);
    const e = srs[word];
    if(at < 0 || !e) return;
    const box = Number(e.box);
    if(!(box >= 1 && box <= 5)) return;
    if(!Number.isFinite(e.due) || !Number.isFinite(e.t)) return;
    srsRows.push([at, Math.floor(box), Math.floor(e.due / 1000), Math.floor(e.t / 1000)]);
  });
  srsRows.sort((a, b) => a[0] - b[0]);
  w.varint(srsRows.length);
  prev = -1;
  for(let i = 0; i < srsRows.length; i++){
    const row = srsRows[i];
    w.varint(row[0] - prev - 1);
    prev = row[0];
    w.byte(row[1]);
    w.sint(row[2] - baseSec);
    w.sint(row[3] - baseSec);
  }

  const customEdits = (p.customEdits && typeof p.customEdits === 'object') ? p.customEdits : {};
  const editRows = [];
  Object.keys(customEdits).forEach(word => {
    const at = wordPosition(word);
    const ed = customEdits[word];
    if(at < 0 || !ed) return;
    editRows.push([at, String(ed.tr || ''), String(ed.ex || ''), String(ed.ex_tr || ''), String(ed.forms || ''), Math.floor((Number(ed.t) || 0) / 1000)]);
  });
  if(editRows.length > 0){
    editRows.sort((a, b) => a[0] - b[0]);
    w.varint(editRows.length);
    let prev = -1;
    for(let i = 0; i < editRows.length; i++){
      const row = editRows[i];
      w.varint(row[0] - prev - 1);
      prev = row[0];
      w.text(row[1]);
      w.text(row[2]);
      w.text(row[3]);
      w.text(row[4]);
      w.sint(row[5] - baseSec);
    }
  }

  return w.bytes();
}

function decodeSyncPayload(bytes, fingerprint){
  const r = makeSyncReader(bytes);
  const version = r.byte();
  if(version !== SYNC_PAYLOAD_VERSION) throw new Error('unsupported payload');

  const flags = r.byte();
  const fp = r.u32();
  if((fp >>> 0) !== (fingerprint >>> 0)){
    const err = new Error('data version mismatch');
    err.syncKey = 'version';
    throw err;
  }

  const baseSec = r.varint();
  const deviceId = r.text(SYNC_MAX_DEVICE_BYTES);
  const out = {
    app: 'oxford5000',
    v: 3,
    exportedAt: baseSec * 1000,
    deviceId: deviceId,
    syncDelta: (flags & 1) === 1,
    marks: {},
    notes: {},
    srs: {},
    customEdits: {}
  };

  let count = r.varint();
  if(count > WORDS.length) throw new Error('too many marks');
  let prev = -1;
  for(let i = 0; i < count; i++){
    const at = prev + r.varint() + 1;
    if(at < 0 || at >= WORDS.length) throw new Error('mark index');
    const state = r.byte();
    if(state > 2) throw new Error('mark state');
    const t = (baseSec + r.sint()) * 1000;
    out.marks[WORDS[at]] = { s: SYNC_MARK_STATES[state], t: Math.max(0, t) };
    prev = at;
  }

  count = r.varint();
  if(count > WORDS.length) throw new Error('too many notes');
  prev = -1;
  for(let i = 0; i < count; i++){
    const at = prev + r.varint() + 1;
    if(at < 0 || at >= WORDS.length) throw new Error('note index');
    const v = r.text(SYNC_MAX_TEXT_BYTES);
    const t = (baseSec + r.sint()) * 1000;
    out.notes[WORDS[at]] = { v: v, t: Math.max(0, t) };
    prev = at;
  }

  count = r.varint();
  if(count > WORDS.length) throw new Error('too many srs');
  prev = -1;
  for(let i = 0; i < count; i++){
    const at = prev + r.varint() + 1;
    if(at < 0 || at >= WORDS.length) throw new Error('srs index');
    const box = r.byte();
    if(box < 1 || box > 5) throw new Error('srs box');
    const due = (baseSec + r.sint()) * 1000;
    const t = (baseSec + r.sint()) * 1000;
    out.srs[WORDS[at]] = { box: box, due: due, t: Math.max(0, t) };
    prev = at;
  }

  if(!r.done()){
    let eCount = r.varint();
    if(eCount > WORDS.length) throw new Error('too many custom edits');
    let ePrev = -1;
    for(let i = 0; i < eCount; i++){
      const at = ePrev + r.varint() + 1;
      if(at < 0 || at >= WORDS.length) throw new Error('custom edit index');
      const tr = r.text(SYNC_MAX_TEXT_BYTES);
      const ex = r.text(SYNC_MAX_TEXT_BYTES);
      const ex_tr = r.text(SYNC_MAX_TEXT_BYTES);
      const forms = r.text(SYNC_MAX_TEXT_BYTES);
      const t = (baseSec + r.sint()) * 1000;
      out.customEdits[WORDS[at]] = { tr: tr, ex: ex, ex_tr: ex_tr, forms: forms, t: Math.max(0, t) };
      ePrev = at;
    }
  }

  if(!r.done()) throw new Error('trailing payload');
  return out;
}

function extractSyncPayload(text){
  let value = String(text == null ? '' : text).trim();
  if(!value) return '';
  const match = value.match(/[#?&]sync=([^&\s]+)/i);
  if(match){
    let raw = match[1];
    try{ raw = decodeURIComponent(raw); }catch(e){ raw = match[1]; }
    value = raw.replace(/[^A-Za-z0-9._-]+$/, '').trim();
  } else {
    value = value.replace(/^[<("'`\s]+/, '').replace(/[>)"'`\s]+$/, '').trim();
  }
  return value;
}

async function encodeSyncCode(progress, fingerprintOverride, isDelta){
  const fp = Number.isFinite(fingerprintOverride) ? fingerprintOverride : wordsFingerprint();
  const payload = encodeSyncPayload(progress, fp, !!isDelta);
  if(typeof CompressionStream === 'function'){
    try{
      const compressed = new Blob([payload]).stream().pipeThrough(new CompressionStream('gzip'));
      const buf = await new Response(compressed).arrayBuffer();
      if(buf.byteLength < payload.length){
        return 'OX6.' + b64urlEncode(new Uint8Array(buf));
      }
    }catch(e){ /* fall back to the raw payload */ }
  }
  return 'OX6u.' + b64urlEncode(payload);
}

async function decodeSyncCode(code){
  if(typeof code !== 'string') throw new Error('invalid sync code');
  const value = extractSyncPayload(code);

  if(!value || value.length > SYNC_MAX_INPUT_CHARS) throw new Error('invalid sync code');

  if(value.indexOf('OX6u.') === 0){
    return decodeSyncPayload(b64urlDecode(value.slice(5)), wordsFingerprint());
  }

  if(value.indexOf('OX6.') === 0){
    if(typeof DecompressionStream !== 'function') throw new Error('decompression unsupported');
    const bytes = b64urlDecode(value.slice(4));
    if(bytes.length > 262144) throw new Error('compressed payload too large');
    const decompressed = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const buf = await new Response(decompressed).arrayBuffer();
    if(buf.byteLength > 1048576) throw new Error('payload too large');
    return decodeSyncPayload(new Uint8Array(buf), wordsFingerprint());
  }

  // Codes created before version 6 still decode, by word name.
  if(value.indexOf('OX5u.') === 0){
    const bytes = b64urlDecode(value.slice(5));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  if(value.indexOf('OX5.') === 0){
    if(typeof DecompressionStream !== 'function') throw new Error('decompression unsupported');
    const bytes = b64urlDecode(value.slice(4));
    if(bytes.length > 1048576) throw new Error('compressed payload too large');
    const decompressed = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const buf = await new Response(decompressed).arrayBuffer();
    if(buf.byteLength > 4194304) throw new Error('payload too large');
    return JSON.parse(new TextDecoder().decode(buf));
  }

  throw new Error('invalid sync code');
}

function syncLinkBase(){
  return location.href.split('#')[0].split('?')[0];
}

function buildSyncLink(code){
  return syncLinkBase() + '#sync=' + code;
}

function changesSince(progress, sinceMs){
  const p = (progress && typeof progress === 'object') ? progress : {};
  if(!Number.isFinite(sinceMs) || sinceMs <= 0) return p;
  const out = {
    app: 'oxford5000',
    v: 3,
    exportedAt: p.exportedAt || Date.now(),
    deviceId: p.deviceId,
    marks: {},
    notes: {},
    srs: {},
    customEdits: {}
  };
  ['marks', 'notes', 'srs', 'customEdits'].forEach(kind => {
    const bag = (p[kind] && typeof p[kind] === 'object') ? p[kind] : {};
    Object.keys(bag).forEach(word => {
      const entry = bag[word];
      if(entry && Number(entry.t) > sinceMs) out[kind][word] = entry;
    });
  });
  return out;
}

function progressItemCount(progress){
  const p = (progress && typeof progress === 'object') ? progress : {};
  const size = k => (p[k] && typeof p[k] === 'object') ? Object.keys(p[k]).length : 0;
  return size('marks') + size('notes') + size('srs') + size('customEdits');
}

function buildShareUrl(code){
  return 'https://t.me/share/url?url=' + encodeURIComponent(code);
}

function tgErrorKey(httpStatus, json){
  const desc = (json && typeof json.description === 'string') ? json.description : '';
  if(httpStatus === 401) return 'token';
  if(httpStatus === 404 && /not found/i.test(desc)) return 'token';
  if(httpStatus === 400 && /chat not found/i.test(desc)) return 'chat';
  return 'net';
}

function pickRemoteDocument(chatJson, updatesJson){
  const pinned = chatJson && chatJson.result && chatJson.result.pinned_message;
  if(pinned && pinned.document && pinned.document.file_id) return pinned.document.file_id;

  const updates = (updatesJson && Array.isArray(updatesJson.result)) ? updatesJson.result : [];
  for(let i = updates.length - 1; i >= 0; i--){
    const msg = updates[i] && updates[i].message;
    const doc = msg && msg.document;
    if(doc && doc.file_id && typeof doc.file_name === 'string'
      && doc.file_name.indexOf('oxford5000-progress') === 0){
      return doc.file_id;
    }
  }
  return null;
}

// ---------- Step 3: spaced repetition (pure helpers) ----------

const SRS_DAY = 86400000;

function srsIntervalDays(box){
  if(box <= 1) return 0;
  if(box === 2) return 1;
  if(box === 3) return 3;
  if(box === 4) return 7;
  return 14;
}

function nextSrs(entry, passed, now){
  const box = (entry && Number.isInteger(entry.box)) ? entry.box : 1;
  if(passed){
    const nb = Math.min(box + 1, 5);
    return { box: nb, due: now + srsIntervalDays(nb) * SRS_DAY, t: now };
  }
  return { box: 1, due: now + 10 * 60 * 1000, t: now };
}

function isDue(entry, now){
  return !!entry && Number.isFinite(entry.due) && entry.due <= now;
}

function applySrsOnMark(srs, word, prevMark, newStatus, now){
  const out = Object.assign({}, srs || {});
  const wasUnknown = !!(prevMark && prevMark.s === 'u');
  if(newStatus === 'u' && (!wasUnknown || !out[word])){
    out[word] = { box: 1, due: now, t: now };
  }
  return out;
}

function defaultQuizSettings(){
  return {
    source: 'all',
    level: 'all',
    count: 10
  };
}

// Quiz words: always words whose current mark is 'u' and that have a meaning.
function quizPool(source, level){
  const now = Date.now();
  return WORDS.filter(w => {
    const id = (typeof w === 'object' && w !== null) ? w.id : w;
    const m = state.marks[id] || state.marks[String(id)] || (w && w.word ? state.marks[w.word] : null);
    if(!m || m.s !== 'u') return false;
    const lvl = (typeof w === 'object' && w !== null) ? (w.level || '').toLowerCase() : (WORD_LEVEL.get(w) || 'a1');
    if(level !== 'all' && lvl !== level) return false;
    if(source === 'due'){
      const e = state.srs[id] || state.srs[String(id)] || (w && w.word ? state.srs[w.word] : null);
      if(e && !isDue(e, now)) return false;
    }
    return answerFor(w).trim() !== '';
  });
}

// Due words first (oldest due first), then the rest by level then alphabetically.
// Only words whose current mark is 'u' may enter the queue.
function buildQuizQueue(words, marks, srs, now){
  const due = [];
  const rest = [];
  const list = words || [];
  for(let i = 0; i < list.length; i++){
    const raw = list[i];
    const entry = getEntry(raw);
    const key = entry ? entry.id : raw;
    const wordStr = entry ? entry.word : String(raw);
    const m = marks && (marks[key] || marks[String(key)] || marks[wordStr]);
    if(!m || m.s !== 'u') continue;
    const e = srs && (srs[key] || srs[String(key)] || srs[wordStr]);
    if(!e || isDue(e, now)) due.push({ w: raw, due: (e && Number(e.due)) || now, wordStr: wordStr });
    else rest.push({ w: raw, wordStr: wordStr });
  }
  due.sort((a, b) => (a.due - b.due) || a.wordStr.localeCompare(b.wordStr));
  rest.sort((a, b) => {
    const la = (getEntry(a.w) ? getEntry(a.w).level : WORD_LEVEL.get(a.wordStr)) || 'a1';
    const lb = (getEntry(b.w) ? getEntry(b.w).level : WORD_LEVEL.get(b.wordStr)) || 'a1';
    const d = LEVEL_ORDER.indexOf(String(la).toLowerCase()) - LEVEL_ORDER.indexOf(String(lb).toLowerCase());
    return d || a.wordStr.localeCompare(b.wordStr);
  });
  return due.map(x => x.w).concat(rest.map(x => x.w));
}

function shuffleArray(arr){
  const a = (arr || []).slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

// Unique distractors only: never the correct answer, never a duplicate.
function buildDistractorOptions(correct, pool, count){
  const needle = String(correct == null ? '' : correct);
  const seen = new Set([needle]);
  const out = [];
  const arr = shuffleArray(pool || []);
  for(let i = 0; i < arr.length && out.length < count; i++){
    const s = String(arr[i] == null ? '' : arr[i]);
    if(s === '' || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

function notedWords(){
  return WORDS.filter(w => answerFor(w).trim() !== '');
}

function dueReviewCount(){
  const now = Date.now();
  let n = 0;
  for(let i = 0; i < WORDS.length; i++){
    const w = WORDS[i];
    const m = state.marks[w];
    if(!m || m.s !== 'u') continue;
    const e = state.srs[w];
    if(!e || isDue(e, now)) n++;
  }
  return n;
}

function updateDueLine(){
  const el = document.getElementById('dueLine');
  if(!el) return;
  const unknown = countStatus('u');
  const n = dueReviewCount();
  if(n === 0 || unknown === 0){
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.hidden = false;
  el.textContent = t('quiz.due', { n: n });
}

let state = freshState();
function showStorageWarning(){
  const el = document.getElementById('storageWarning');
  if(el) el.classList.add('show');
}

function hideStorageWarning(){
  const el = document.getElementById('storageWarning');
  if(el) el.classList.remove('show');
}

function loadState(){
  let next = null;
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(parsed && parsed.v === 3) next = normalizeState(parsed);
    }
  }catch(e){ next = null; }

  if(!next){
    try{
      const oldRaw = localStorage.getItem(LEGACY_KEY);
      if(oldRaw){
        const oldObj = JSON.parse(oldRaw);
        next = migrateV2(oldObj, WORDS, Date.now());
        try{
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }catch(e){
          showStorageWarning();
        }
      }
    }catch(e){ next = null; }
  }

  state = next || freshState();
}

function saveState(){
  try{
    let stored = null;
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        const parsed = JSON.parse(raw);
        if(parsed && parsed.v === 3) stored = normalizeState(parsed);
      }
    }catch(inner){
      stored = null;
    }

    if(stored){
      const merged = mergeStates(stored, state);
      // ui/history/deviceId are device-local, so keep the ones this tab is working with.
      merged.ui = state.ui;
      merged.history = state.history;
      merged.deviceId = state.deviceId;
      state = merged;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    hideStorageWarning();
    return true;
  }catch(e){
    showStorageWarning();
    return false;
  }
}

let saveTimer = null;

function scheduleSave(){
  if(saveTimer !== null) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveState();
  }, 300);
}

function flushSave(){
  if(saveTimer === null) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  saveState();
}

let persistAsked = false;

function requestPersistOnce(){
  if(persistAsked) return;
  persistAsked = true;
  try{
    if(navigator.storage && typeof navigator.storage.persist === 'function'){
      navigator.storage.persist();
    }
  }catch(e){ /* ignore */ }
}

const knowCountEl = document.getElementById('knowCount');
const unknowCountEl = document.getElementById('unknowCount');
const leftCountEl = document.getElementById('leftCount');
const progressFillEl = document.getElementById('progressFill');
const levelBar = document.getElementById('levelBar');
const ORIGINAL_MAIN_HTML = document.getElementById('mainArea').innerHTML;

function wordsOfLevel(level){
  return WORDS_BY_LEVEL[level] || [];
}

function noteText(word){
  const n = state.notes[word];
  return (n && typeof n.v === 'string') ? n.v : '';
}

// ---------- translations, word forms and example sentences ----------

let currentAudio = null;

function stopCurrentAudio(){
  if(currentAudio){
    try{ currentAudio.pause(); }catch(_){}
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  document.querySelectorAll('.audio-btn.playing').forEach(b => b.classList.remove('playing'));
}

function playAudio(src, btn){
  stopCurrentAudio();
  if(!src){
    if(btn) btn.disabled = true;
    return;
  }
  const audio = new Audio(src);
  const speed = (state.ui && Number.isFinite(state.ui.audioSpeed)) ? state.ui.audioSpeed : 1.0;
  audio.playbackRate = speed;
  currentAudio = audio;
  if(btn) btn.classList.add('playing');
  audio.onended = () => {
    if(btn) btn.classList.remove('playing');
    if(currentAudio === audio) currentAudio = null;
  };
  audio.onerror = (e) => {
    console.warn('Audio load error for', src, e);
    if(btn) btn.classList.remove('playing');
    if(currentAudio === audio) currentAudio = null;
  };
  audio.play().then(() => {}).catch(err => {
    if(err && err.name !== 'AbortError'){
      console.warn('Audio playback error:', err);
    }
    if(btn) btn.classList.remove('playing');
    if(currentAudio === audio) currentAudio = null;
  });
}

const SPEED_STEPS = [1.0, 0.8, 0.6];

function updateAudioSpeedButton(){
  const btn = document.getElementById('btnAudioSpeed');
  const lbl = document.getElementById('audioSpeedLabel');
  const speed = (state.ui && Number.isFinite(state.ui.audioSpeed)) ? state.ui.audioSpeed : 1.0;
  const speedStr = speed.toFixed(1) + 'x';
  if(lbl) lbl.textContent = speedStr;
  if(btn) btn.title = t('audio.speed.title', { speed: speedStr });
}

function cycleAudioSpeed(){
  const cur = (state.ui && Number.isFinite(state.ui.audioSpeed)) ? state.ui.audioSpeed : 1.0;
  let idx = SPEED_STEPS.indexOf(cur);
  if(idx === -1) idx = 0;
  const next = SPEED_STEPS[(idx + 1) % SPEED_STEPS.length];
  state.ui.audioSpeed = next;
  scheduleSave();
  updateAudioSpeedButton();
}

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.08){
  try{
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }catch(_){}
}

function playMatchSuccessSound(){
  playTone(523.25, 'triangle', 0.1, 0.09);
  setTimeout(() => playTone(659.25, 'triangle', 0.12, 0.09), 80);
  setTimeout(() => playTone(783.99, 'triangle', 0.22, 0.1), 160);
}

function playMatchErrorSound(){
  playTone(220, 'sawtooth', 0.15, 0.06);
}

function showToast(msg){
  let tEl = document.getElementById('globalToast');
  if(!tEl){
    tEl = document.createElement('div');
    tEl.id = 'globalToast';
    tEl.className = 'global-toast';
    document.body.appendChild(tEl);
  }
  tEl.textContent = msg;
  tEl.classList.add('show');
  setTimeout(() => { if(tEl) tEl.classList.remove('show'); }, 2400);
}

function triggerCelebration(){
  if(document.getElementById('confettiCanvas')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'confettiCanvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if(!ctx) return;

  const colors = ['#d9a441', '#b9822b', '#1f6f6d', '#3a8a4f', '#b8543f', '#f6f1e4'];
  const particles = [];
  const count = 70;
  for(let i = 0; i < count; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.35) - 20,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2.5,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  const start = performance.now();
  const duration = 2500;

  function frame(now){
    const elapsed = now - start;
    if(elapsed > duration){
      if(canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fade = elapsed > duration - 600 ? (duration - elapsed) / 600 : 1;

    for(let i = 0; i < particles.length; i++){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, fade);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function updateHabitDate(){
  if(!state.ui) state.ui = defaultUi();
  if(!state.ui.habit) state.ui.habit = defaultUi().habit;
  const today = localDateStr();
  const habit = state.ui.habit;

  if(!habit.todayDate){
    habit.todayDate = today;
    habit.todayCount = 0;
  } else if(habit.todayDate !== today){
    const todayMs = new Date(today).getTime();
    const lastMs = habit.lastActiveDate ? new Date(habit.lastActiveDate).getTime() : 0;
    const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));
    if(diffDays > 1){
      habit.streak = 0;
    }
    habit.todayDate = today;
    habit.todayCount = 0;
    habit.celebratedDate = null;
  }
}

function incrementDailyProgress(amount = 1){
  if(!state.ui) state.ui = defaultUi();
  if(!state.ui.habit) state.ui.habit = defaultUi().habit;
  updateHabitDate();
  const today = localDateStr();
  const habit = state.ui.habit;
  const prev = habit.todayCount || 0;
  habit.todayCount = prev + (amount > 0 ? amount : 1);

  if(habit.lastActiveDate !== today){
    const todayMs = new Date(today).getTime();
    const lastMs = habit.lastActiveDate ? new Date(habit.lastActiveDate).getTime() : 0;
    const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));
    if(diffDays === 1){
      habit.streak = (habit.streak || 0) + 1;
    } else {
      habit.streak = 1;
    }
    habit.lastActiveDate = today;
    habit.bestStreak = Math.max(habit.bestStreak || 0, habit.streak);
  }

  const goal = habit.goal || 20;
  if(prev < goal && habit.todayCount >= goal && habit.celebratedDate !== today){
    habit.celebratedDate = today;
    triggerCelebration();
    showToast(t('habit.completed'));
  }

  scheduleSave();
  renderHabitDisplay();
}

function renderHabitDisplay(){
  if(!state.ui || !state.ui.habit) return;
  updateHabitDate();
  const habit = state.ui.habit;
  const streak = habit.streak || 0;
  const count = habit.todayCount || 0;
  const goal = habit.goal || 20;

  const streakEl = document.getElementById('habitStreakCount');
  if(streakEl) streakEl.textContent = String(streak);

  const goalEl = document.getElementById('habitGoalProgress');
  if(goalEl) goalEl.textContent = `${count}/${goal}`;

  const pill = document.getElementById('openHabit');
  if(pill){
    pill.classList.toggle('goal-reached', count >= goal);
    pill.title = t('habit.today', { n: count, goal: goal });
  }

  const mStreak = document.getElementById('habitModalStreak');
  if(mStreak) mStreak.textContent = String(streak);

  const mStreakLabel = document.getElementById('habitModalStreakLabel');
  if(mStreakLabel) mStreakLabel.textContent = t('habit.streak', { n: streak });

  const mEncouragement = document.getElementById('habitModalEncouragement');
  if(mEncouragement){
    mEncouragement.textContent = count >= goal ? t('habit.completed') : (streak > 0 ? t('habit.encouragement') : t('habit.resetNotice'));
  }

  const mTodayLabel = document.getElementById('habitModalTodayLabel');
  if(mTodayLabel) mTodayLabel.textContent = t('habit.today', { n: count, goal: goal });

  const pct = Math.min(100, Math.round(count / goal * 100));
  const mTodayPct = document.getElementById('habitModalTodayPct');
  if(mTodayPct) mTodayPct.textContent = pct + '%';

  const mMeter = document.getElementById('habitModalMeter');
  if(mMeter) mMeter.style.width = pct + '%';

  document.querySelectorAll('.habit-target-btn').forEach(btn => {
    const g = Number(btn.getAttribute('data-goal'));
    btn.classList.toggle('active', g === goal);
  });
}

function openHabitModal(){
  const overlay = document.getElementById('habitOverlay');
  if(!overlay) return;
  renderHabitDisplay();
  overlay.classList.add('show');
}

function closeHabitModal(){
  const overlay = document.getElementById('habitOverlay');
  if(overlay) overlay.classList.remove('show');
}

function updateCardAudio(entry){
  stopCurrentAudio();
  const btnUk = document.getElementById('btnAudioUk');
  const btnUs = document.getElementById('btnAudioUs');
  if(!entry){
    if(btnUk) btnUk.disabled = true;
    if(btnUs) btnUs.disabled = true;
    return;
  }

  const wordName = entry.word || 'word';
  if(btnUk){
    btnUk.disabled = !entry.audio_uk;
    btnUk.setAttribute('aria-label', `Play British pronunciation of ${wordName}`);
    btnUk.onclick = () => playAudio(entry.audio_uk, btnUk);
    btnUk.onkeydown = (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        playAudio(entry.audio_uk, btnUk);
      }
    };
  }

  if(btnUs){
    btnUs.disabled = !entry.audio_us;
    btnUs.setAttribute('aria-label', `Play American pronunciation of ${wordName}`);
    btnUs.onclick = () => playAudio(entry.audio_us, btnUs);
    btnUs.onkeydown = (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        playAudio(entry.audio_us, btnUs);
      }
    };
  }
}

function sentenceFor(wordOrEntry){
  const e = getEntry(wordOrEntry);
  return e ? (e.example || '') : '';
}

function escapeRegExp(s){
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function trPack(){
  if(!TR || typeof TR !== 'object') return null;
  const p = TR[currentLang];
  return (p && typeof p === 'object') ? p : null;
}

function selectedDisplayLangs(){
  const selected = (state.ui && Array.isArray(state.ui.displayLangs))
    ? state.ui.displayLangs.filter(langExists) : [];
  return selected.length ? selected : [currentLang];
}

function translationEntries(word, sentence){
  return selectedDisplayLangs().map(code => {
    const pack = TR && TR[code];
    if(!pack || code === 'en') return null;
    const source = sentence ? pack.s : pack.w;
    let value = '';
    if(Array.isArray(source)){
      const index = sentence ? sentIndexOf(sentence) : WORD_INDEX.get(word);
      if(typeof index === 'number' && index >= 0) value = source[index] || '';
    }else if(source){
      value = sentence ? source[sentence] : source[word];
    }
    return typeof value === 'string' && value.trim()
      ? { code: code, value: value.trim() } : null;
  }).filter(Boolean);
}

function wordTranslation(wordOrEntry){
  const e = getEntry(wordOrEntry);
  const word = e ? e.word : String(wordOrEntry || '');
  if(e && state.customEdits){
    const ed = state.customEdits[e.id] || state.customEdits[e.word];
    if(ed && ed.tr) return ed.tr;
  }
  if(currentLang === 'en') return e ? (e.sense || e.word) : word;
  const entries = translationEntries(word, '');
  const match = entries.find(entry => entry.code === currentLang);
  if(match) return match.value;
  if(currentLang === 'ar' && entries.length) return entries[0].value;
  return e ? (e.sense || e.word) : word;
}

function sentenceTranslation(sentenceOrEntry){
  const e = getEntry(sentenceOrEntry);
  if(e && state.customEdits){
    const ed = state.customEdits[e.id] || state.customEdits[e.word];
    if(ed && ed.ex_tr) return ed.ex_tr;
  }
  if(currentLang === 'en') return '';
  const sentence = e ? (e.example || '') : String(sentenceOrEntry || '');
  const entries = translationEntries('', sentence);
  const match = entries.find(entry => entry.code === currentLang);
  if(match) return match.value;
  if(currentLang === 'ar' && entries.length) return entries[0].value;
  return '';
}

function answerFor(wordOrEntry){
  const e = getEntry(wordOrEntry);
  const key = e ? e.id : wordOrEntry;
  if(e && state.customEdits){
    const ed = state.customEdits[e.id] || state.customEdits[e.word];
    if(ed && ed.tr) return ed.tr;
  }
  const note = noteText(key).trim() || (e ? noteText(e.word).trim() : '');
  if(note) return note;
  if(currentLang === 'ar'){
    const tr = wordTranslation(e ? e.word : wordOrEntry);
    if(tr) return tr;
    if(e && Array.isArray(e.categories_ar) && e.categories_ar.length){
      return e.categories_ar.join('، ');
    }
    return e ? (e.sense || e.word) : String(wordOrEntry || '');
  }
  if(currentLang === 'en'){
    if(e && e.sense) return e.sense;
    if(e && Array.isArray(e.categories) && e.categories.length){
      return e.categories.join(', ');
    }
    return e ? e.word : String(wordOrEntry || '');
  }
  const tr = wordTranslation(e ? e.word : wordOrEntry);
  if(tr) return tr;
  if(e && e.sense) return e.sense;
  if(e && Array.isArray(e.categories) && e.categories.length){
    return e.categories.map(c => t('cat.' + c) || c).join(', ');
  }
  return e ? e.word : String(wordOrEntry || '');
}

function formData(wordOrEntry){
  const e = getEntry(wordOrEntry);
  if(!e) return null;
  return {
    forms: formsFor(e),
    summary: e.forms_summary || ''
  };
}

function formsFor(wordOrEntry){
  const e = getEntry(wordOrEntry);
  if(!e) return [{ f: String(wordOrEntry || ''), k: 'base', lbl: 'base' }];
  const out = [];
  if(e.verb_forms && typeof e.verb_forms === 'object'){
    const vf = e.verb_forms;
    if(vf.V1_base) out.push({ f: vf.V1_base, k: 'base', lbl: 'V1' });
    if(vf.V2_past_simple) out.push({ f: vf.V2_past_simple, k: vf.type === 'regular' ? 'reg' : 'irr', s: 'ed', lbl: 'V2' });
    if(vf.V3_past_participle) out.push({ f: vf.V3_past_participle, k: vf.type === 'regular' ? 'reg' : 'irr', s: 'ed', lbl: 'V3' });
    if(vf.ING_present_participle) out.push({ f: vf.ING_present_participle, k: 'reg', s: 'ing', lbl: 'ING' });
    if(vf.S_third_person_singular) out.push({ f: vf.S_third_person_singular, k: 'reg', s: 's', lbl: 'S' });
  } else if(e.noun_forms && typeof e.noun_forms === 'object'){
    const nf = e.noun_forms;
    if(nf.singular) out.push({ f: nf.singular, k: 'base', lbl: 'singular' });
    if(nf.plural) out.push({ f: nf.plural, k: 'reg', s: 's', lbl: 'plural' });
  } else if(e.adjective_forms && typeof e.adjective_forms === 'object'){
    const af = e.adjective_forms;
    out.push({ f: e.word, k: 'base', lbl: 'base' });
    if(af.comparative) out.push({ f: af.comparative, k: 'reg', lbl: 'comp' });
    if(af.superlative) out.push({ f: af.superlative, k: 'reg', lbl: 'sup' });
  }
  if(!out.length){
    out.push({ f: e.word, k: 'base', lbl: 'base' });
  }
  return out;
}

function ipaFor(wordOrEntry){
  return '';
}

function sentenceByIndex(i){
  return (typeof i === 'number' && i >= 0 && i < ENTRIES.length) ? (ENTRIES[i].example || '') : '';
}

function formChipHtml(f){
  if(!f || !f.f) return '';
  if(f.k === 'reg' && f.s && f.f.toLowerCase().endsWith(String(f.s).toLowerCase())){
    const stem = f.f.slice(0, f.f.length - String(f.s).length);
    return esc(stem) + '<i class="hl-suf">' + esc(f.f.slice(-f.s.length)) + '</i>';
  }
  if(f.k === 'irr') return '<i class="hl-irr">' + esc(f.f) + '</i>';
  return esc(f.f);
}

function highlightSentence(sentence, word, forms){
  const text = String(sentence == null ? '' : sentence);
  if(!text) return '';
  const entry = getEntry(word);
  const list = (Array.isArray(forms) && forms.length ? forms.slice() : formsFor(word).slice())
    .filter(f => f && typeof f.f === 'string' && f.f);
  if(entry && entry.example_form_used){
    list.push({ f: entry.example_form_used, k: 'base', lbl: 'form' });
  }
  if(entry && entry.word && entry.word.includes(',')){
    entry.word.split(',').forEach(part => {
      const p = part.trim();
      if(p) list.push({ f: p, k: 'base', lbl: 'base' });
    });
  }
  if(!list.length) return esc(text);

  const map = {};
  list.forEach(f => { map[f.f.toLowerCase()] = f; });
  const pattern = list.toSorted((a, b) => b.f.length - a.f.length)
    .map(f => escapeRegExp(f.f).replace(/\s+/g, '\\s+'))
    .join('|');
  const re = new RegExp('\\b(' + pattern + ')\\b', 'gi');

  let out = '';
  let last = 0;
  let m = re.exec(text);
  while(m){
    out += esc(text.slice(last, m.index));
    const matched = m[0];
    const f = map[matched.toLowerCase()];
    if(f && f.k === 'irr'){
      out += '<mark class="hl-irr">' + esc(matched) + '</mark>';
    } else if(f && f.k === 'reg' && f.s && matched.length > String(f.s).length){
      const cut = matched.length - String(f.s).length;
      out += '<mark class="hl-base">' + esc(matched.slice(0, cut)) + '</mark>'
        + '<span class="hl-suf">' + esc(matched.slice(cut)) + '</span>';
    } else {
      out += '<mark class="hl-base">' + esc(matched) + '</mark>';
    }
    last = m.index + matched.length;
    if(matched.length === 0) re.lastIndex++;
    m = re.exec(text);
  }
  out += esc(text.slice(last));
  return out;
}

let cardFormIndex = 0;
let cardFormWord = '';

function updateCardMeta(wordOrEntry){
  const entry = getEntry(wordOrEntry);
  const word = entry ? entry.word : String(wordOrEntry || '');

  const posEl = document.getElementById('cardPos');
  if(posEl){
    posEl.textContent = entry ? (entry.pos || '') : '';
    posEl.hidden = !entry || !entry.pos;
  }

  const catArEl = document.getElementById('cardCatAr');
  if(catArEl){
    let cats = '';
    if(entry){
      if(currentLang === 'ar'){
        cats = Array.isArray(entry.categories_ar) ? entry.categories_ar.join(', ') : (entry.categories_ar || '');
      } else {
        cats = Array.isArray(entry.categories) ? entry.categories.map(c => t('cat.' + c) || c).join(', ') : (entry.categories || '');
      }
    }
    catArEl.textContent = cats;
    catArEl.hidden = !cats;
  }

  const badgeCustom = document.getElementById('cardCustomBadge');
  if(badgeCustom){
    const hasCustom = entry && state.customEdits && (state.customEdits[entry.id] || state.customEdits[entry.word]);
    badgeCustom.hidden = !hasCustom;
  }

  const senseEl = document.getElementById('cardSense');
  if(senseEl){
    senseEl.textContent = entry ? (entry.sense || '') : '';
    senseEl.hidden = !entry || !entry.sense;
  }

  const ipaEl = document.getElementById('cardIpa');
  if(ipaEl) ipaEl.hidden = true;

  const trEl = document.getElementById('cardTranslation');
  if(trEl){
    const custom = entry && state.customEdits && (state.customEdits[entry.id] || state.customEdits[entry.word]);
    let html = '';
    if(custom && custom.tr){
      html = `<span class="translation-line"><b>${esc(t('edit.customBadge'))}</b> ${esc(custom.tr)}</span>`;
    } else {
      const entries = translationEntries(word, '');
      html = entries.map(e =>
        `<span class="translation-line" lang="${esc(e.code)}"><b>${esc(e.code.toUpperCase())}</b> ${esc(e.value)}</span>`
      ).join('');
    }
    trEl.innerHTML = html;
    trEl.hidden = !html || !state.ui.preferences.showTranslations;
  }
  const speakEl = document.getElementById('speakMain');
  if(speakEl) speakEl.hidden = true;
}

function speakWord(word){
  speakEnglishText(word);
}

function speakEnglishText(text){
  const value = String(text == null ? '' : text).trim();
  if(!value || typeof window.speechSynthesis !== 'object' || typeof window.SpeechSynthesisUtterance !== 'function') return;
  try{
    window.speechSynthesis.cancel();
    const accent = state.ui && state.ui.speechAccent === 'uk' ? 'uk' : 'us';
    const targetLang = accent === 'uk' ? 'en-GB' : 'en-US';
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = targetLang;
    utterance.rate = (state.ui && Number.isFinite(state.ui.audioSpeed)) ? state.ui.audioSpeed : 1.0;
    const voices = typeof window.speechSynthesis.getVoices === 'function'
      ? window.speechSynthesis.getVoices() : [];
    const matching = voices.filter(v => v && new RegExp('^' + targetLang.replace('-', '[-_]'), 'i').test(v.lang));
    const english = voices.filter(v => v && /^en(-|_)/i.test(v.lang));
    const preferred = matching.find(v => v.localService === true)
      || (navigator.onLine === false ? english.find(v => v.localService === true) : null)
      || matching.find(v => /google|natural|premium|enhanced/i.test(v.name || ''))
      || matching[0]
      || english.find(v => v.localService === true)
      || english.find(v => /google|natural|premium|enhanced/i.test(v.name || ''))
      || english[0];
    if(preferred) utterance.voice = preferred;
    utterance.rate = 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }catch(e){
    // Speech is an optional browser capability; IPA remains available.
  }
}

function speakCurrentExample(){
  const el = document.getElementById('cardSentenceText');
  if(el) speakEnglishText(el.textContent);
}

function normalizeFormKey(lbl){
  const l = String(lbl || '').trim();
  const lower = l.toLowerCase();
  if(lower === 'comparative' || lower === 'comp') return 'comp';
  if(lower === 'superlative' || lower === 'sup') return 'sup';
  if(lower === 'singular' || lower === 'base' || lower === 'v1' || lower === 'present') return 'base';
  if(lower === 'plural') return 'plural';
  if(lower === 'v2' || lower === 'past') return 'past';
  if(lower === 'v3' || lower === 'pp' || lower === 'pastpp') return 'pp';
  if(lower === 'ing') return 'ing';
  if(lower === 's' || lower === 'third') return 'third';
  return l;
}

function formLabel(f){
  const raw = (f && f.lbl) ? f.lbl : 'base';
  const norm = normalizeFormKey(raw);
  const key = 'form.' + norm;
  const val = t(key);
  if(val !== key) return val;
  const rawVal = t('form.' + raw);
  if(rawVal !== ('form.' + raw)) return rawVal;
  return raw;
}

function openFormsGuide(){
  const overlay = document.getElementById('formsGuideOverlay');
  const content = document.getElementById('formsGuideContent');
  const word = cardFormWord || displayedWord;
  const forms = formsFor(word);
  if(!overlay || !content || !Array.isArray(forms) || !forms.length) return;
  content.innerHTML = `<p class="forms-guide-intro">${esc(t('forms.guide.intro'))}</p>
    <div class="forms-guide-list">${forms.map((form) => {
      const raw = form.lbl || 'base';
      const norm = normalizeFormKey(raw);
      let useText = t('forms.guide.' + norm + '.use');
      if(useText === ('forms.guide.' + norm + '.use')){
        const alt = t('forms.guide.' + raw + '.use');
        if(alt !== ('forms.guide.' + raw + '.use')) useText = alt;
      }
      let diffText = t('forms.guide.' + norm + '.difference');
      if(diffText === ('forms.guide.' + norm + '.difference')){
        const alt = t('forms.guide.' + raw + '.difference');
        if(alt !== ('forms.guide.' + raw + '.difference')) diffText = alt;
      }
      return `<article class="forms-guide-item">
        <div class="forms-guide-word"><span class="fc-word">${formChipHtml(form)}</span><span>${esc(formLabel(form))}</span></div>
        <p><b>${esc(useText)}</b></p>
        <p class="forms-guide-difference">${esc(diffText)}</p>
      </article>`;
    }).join('')}</div>`;
  overlay.classList.add('show');
}

function closeFormsGuide(){
  const overlay = document.getElementById('formsGuideOverlay');
  if(overlay) overlay.classList.remove('show');
}

function buildFormsBar(word, forms){
  const bar = document.getElementById('formsBar');
  if(!bar) return;
  const entry = getEntry(word);
  const custom = entry && state.customEdits && (state.customEdits[entry.id] || state.customEdits[entry.word]);
  const summary = (custom && custom.forms) ? custom.forms : (entry ? entry.forms_summary : '');
  if(!state.ui.preferences.showForms || !summary || summary === 'no changing forms'){
    bar.hidden = true;
    bar.replaceChildren();
    return;
  }
  bar.hidden = false;
  bar.innerHTML = `<div class="forms-heading"><span class="forms-label">${esc(t('card.forms'))}</span>
    <button type="button" class="forms-guide-button" id="openFormsGuide">${esc(t('forms.guide.button'))}</button></div>
    <div class="forms-scroll" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
      <span class="forms-summary-badge" style="font-size:12px;font-weight:600;color:var(--teal-deep);padding:3px 8px;background:rgba(31,111,109,.08);border-radius:6px;direction:ltr;">${esc(summary)}</span>
    </div>`;

  const guideButton = document.getElementById('openFormsGuide');
  if(guideButton) guideButton.addEventListener('click', openFormsGuide);
}

function updateCardSentence(word){
  renderCardExample(word);
}

function renderCardExample(wordOrEntry){
  const box = document.getElementById('cardSentence');
  const textEl = document.getElementById('cardSentenceText');
  const trEl = document.getElementById('cardSentenceTr');
  if(!box || !textEl) return;

  const entry = getEntry(wordOrEntry);
  const word = entry ? entry.word : String(wordOrEntry || '');

  if(word !== cardFormWord){
    cardFormWord = word;
    cardFormIndex = 0;
  }

  const forms = formsFor(entry || word);
  updateCardMeta(entry || word);

  const custom = entry && state.customEdits && (state.customEdits[entry.id] || state.customEdits[entry.word]);
  const sentence = (custom && custom.ex) ? custom.ex : (entry ? (entry.example || '') : sentenceFor(word));
  buildFormsBar(entry || word, forms);

  if(!sentence || !state.ui.preferences.showExample){
    box.hidden = true;
    textEl.replaceChildren();
    if(trEl){ trEl.textContent = ''; trEl.hidden = true; }
    return;
  }

  box.hidden = false;
  textEl.lang = 'en';
  textEl.innerHTML = highlightSentence(sentence, entry || word, forms);

  if(trEl){
    let html = '';
    if(custom && custom.ex_tr){
      html = `<span class="translation-line"><b>${esc(t('edit.customBadge'))}</b> ${esc(custom.ex_tr)}</span>`;
    } else {
      const entries = translationEntries('', sentence);
      html = entries.map(entry =>
        `<span class="translation-line" lang="${esc(entry.code)}"><b>${esc(entry.code.toUpperCase())}</b> ${esc(entry.value)}</span>`
      ).join('');
    }
    trEl.innerHTML = html;
    trEl.hidden = !html || !state.ui.preferences.showTranslations;
  }
}

function isMarkedWord(wordOrEntry){
  const e = getEntry(wordOrEntry);
  const id = e ? e.id : wordOrEntry;
  const word = e ? e.word : wordOrEntry;
  const m = state.marks[id] || state.marks[String(id)] || (word ? state.marks[word] : null);
  return !!m && (m.s === 'k' || m.s === 'u');
}

function countStatus(s){
  let n = 0;
  for(let i = 0; i < WORDS.length; i++){
    const m = state.marks[WORDS[i]];
    if(m && m.s === s) n++;
  }
  return n;
}

function mulberry32(a){
  return function(){
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, rand){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

let pendingUndoItem = null;

function deckQueue(level){
  const src = wordsOfLevel(level);
  const base = [];
  for(let i = 0; i < src.length; i++){
    if(!isMarkedWord(src[i])) base.push(src[i]);
  }
  let res;
  const seed = state.ui.seed[level];
  if(typeof seed === 'number'){
    res = seededShuffle(base, mulberry32(seed));
  } else {
    res = base;
  }
  if(pendingUndoItem != null){
    const target = pendingUndoItem;
    const idx = res.findIndex(x => {
      if(!x) return false;
      if(x === target) return true;
      if(typeof x === 'object'){
        if(x.id === target || String(x.id) === String(target)) return true;
        if(x.word === target) return true;
      }
      return false;
    });
    if(idx > -1){
      const [it] = res.splice(idx, 1);
      res.unshift(it);
    }
  }
  return res;
}

function buildLevelBar(){
  const buttons = [];

  const allBtn = document.createElement('div');
  allBtn.className = 'level-btn' + (state.ui.currentLevel === 'all' ? ' active' : '');
  allBtn.innerHTML = `${esc(t('level.all'))}<small>${WORDS.length}</small>`;
  allBtn.addEventListener('click', () => switchLevel('all'));
  buttons.push(allBtn);

  LEVEL_ORDER.forEach(lvl => {
    const btn = document.createElement('div');
    btn.className = 'level-btn' + (state.ui.currentLevel === lvl ? ' active' : '');
    btn.innerHTML = `${LEVEL_LABELS[lvl]}<small>${wordsOfLevel(lvl).length}</small>`;
    btn.title = LEVEL_NAMES(lvl);
    btn.addEventListener('click', () => switchLevel(lvl));
    buttons.push(btn);
  });

  levelBar.replaceChildren(...buttons);
}

function switchLevel(level){
  pendingUndoItem = null;
  state.ui.currentLevel = level;
  scheduleSave();
  buildLevelBar();
  render();
}

function setCardWord(word){
  const el = document.getElementById('theWord');
  if(!el) return;
  if(el.childNodes.length && el.childNodes[0].nodeType === 3){
    el.childNodes[0].textContent = word + ' ';
  } else {
    el.insertBefore(document.createTextNode(word + ' '), el.firstChild);
  }
}

let displayedWord = null;
let cardLocked = false;

function render(){
  cardLocked = false;
  updateBackupBanner();
  updateDueLine();

  const total = WORDS.length;
  const known = countStatus('k');
  const unknown = countStatus('u');
  knowCountEl.textContent = String(known);
  unknowCountEl.textContent = String(unknown);
  leftCountEl.textContent = String(total - known - unknown);
  progressFillEl.style.width = (total ? ((known + unknown) / total * 100) : 0).toFixed(2) + '%';

  const undoBtn = document.getElementById('btnUndo');
  if(undoBtn) undoBtn.disabled = state.history.length === 0;

  const shuffleBtn = document.getElementById('btnShuffle');
  if(shuffleBtn){
    shuffleBtn.textContent = (typeof state.ui.seed[state.ui.currentLevel] === 'number')
      ? t('toolbar.shuffle.off')
      : t('toolbar.shuffle');
  }

  const level = state.ui.currentLevel;
  const queue = deckQueue(level);

  if(queue.length === 0){
    displayedWord = null;
    showFinished();
    return;
  }

  restoreDeckMarkup();

  const item = queue[0];
  const entry = getEntry(item);
  const word = entry ? entry.word : String(item);
  displayedEntry = entry;
  displayedWord = word;

  const levelWords = wordsOfLevel(level);
  const markedInLevel = levelWords.filter(isMarkedWord).length;

  const wordPosEl = document.getElementById('wordPos');
  if(wordPosEl) wordPosEl.textContent = `${markedInLevel + 1} / ${levelWords.length}`;

  const lvlBadgeEl = document.getElementById('lvlBadge');
  const currentLvl = (entry ? entry.level : WORD_LEVEL.get(word)) || 'A1';
  if(lvlBadgeEl) lvlBadgeEl.textContent = currentLvl.toUpperCase();

  setCardWord(word);
  updateCardAudio(entry);
  updateCardSentence(entry || word);
  updateAudioSpeedButton();
  renderHabitDisplay();

  if(state.ui && state.ui.preferences && state.ui.preferences.autoPronounce && entry && location.hash !== '#selftest'){
    const accent = state.ui.speechAccent || 'us';
    const audioSrc = (accent === 'uk' && entry.audio_uk) ? entry.audio_uk : (entry.audio_us || entry.audio_uk);
    if(audioSrc){
      setTimeout(() => {
        const btn = (accent === 'uk') ? document.getElementById('btnAudioUk') : document.getElementById('btnAudioUs');
        playAudio(audioSrc, btn);
      }, 150);
    }
  }

  const input = document.getElementById('translationInput');
  if(input) input.value = noteText(entry ? entry.id : word) || noteText(word);

  const card = document.getElementById('card');
  if(card) card.className = 'card enter';

  const bk = document.getElementById('badgeKnow');
  const bu = document.getElementById('badgeUnknow');
  if(bk) bk.style.opacity = 0;
  if(bu) bu.style.opacity = 0;
}

function restoreDeckMarkup(){
  if(document.getElementById('card')) return;
  document.getElementById('mainArea').innerHTML = ORIGINAL_MAIN_HTML;
  wireEvents();
}

function showFinished(){
  const level = state.ui.currentLevel;
  const label = (level === 'all') ? t('level.all') : LEVEL_LABELS[level];
  const total = wordsOfLevel(level).length;
  const known = countStatus('k');
  const unknown = countStatus('u');

  document.getElementById('mainArea').innerHTML = `
    <div class="finished">
      <h2>${esc(t('finished.title'))}</h2>
      <p>
        ${esc(t('finished.reviewed', { n: total, level: label }))}<br>
        ${esc(t('finished.counts', { known: known, unknown: unknown }))}
      </p>
      <div class="toolbar" style="margin:0;justify-content:center;">
        <button class="tool-btn primary" id="btnDownload2">${esc(t('toolbar.download'))}</button>
        <button class="tool-btn" id="btnReset2">${esc(t('toolbar.reset'))}</button>
      </div>
    </div>`;

  const d2 = document.getElementById('btnDownload2');
  if(d2) d2.addEventListener('click', downloadUnknown);
  const r2 = document.getElementById('btnReset2');
  if(r2) r2.addEventListener('click', resetAll);
}

let displayedEntry = null;

function markWord(known){
  if(cardLocked) return;
  pendingUndoItem = null;
  const entry = displayedEntry;
  const word = displayedWord;
  if(!word && !entry) return;

  cardLocked = true;
  stopCurrentAudio();

  const id = entry ? entry.id : word;
  const prev = state.marks[id] || (entry ? state.marks[entry.word] : null);
  state.history = pushHistoryEntry(state.history, {
    id: id,
    word: word,
    prev: prev ? { s: prev.s, t: prev.t } : null
  });

  state.marks = applyMark(state.marks, id, known ? 'k' : 'u', Date.now());
  state.srs = applySrsOnMark(state.srs, id, prev, known ? 'k' : 'u', Date.now());
  bumpChanges();
  incrementDailyProgress(1);

  const card = document.getElementById('card');
  if(card) card.classList.add(known ? 'leave-left' : 'leave-right');

  scheduleSave();
  requestPersistOnce();

  setTimeout(() => {
    cardLocked = false;
    render();
  }, 260);
}

function undo(){
  if(state.history.length === 0) return;
  const last = state.history.pop();
  state.marks = applyUndo(state.marks, last, Date.now());
  pendingUndoItem = last ? (last.id != null ? last.id : last.word) : null;
  bumpChanges();
  cardLocked = false;
  scheduleSave();
  render();
}

function resetAll(){
  if(!confirm(t('confirm.reset'))) return;
  const deviceId = state.deviceId;
  state = freshState();
  state.deviceId = deviceId;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }catch(e){
    showStorageWarning();
  }
  location.reload();
}

function toggleShuffle(){
  const level = state.ui.currentLevel;
  if(typeof state.ui.seed[level] === 'number'){
    state.ui.seed[level] = null;
  } else {
    state.ui.seed[level] = Math.floor(Math.random() * 2147483646) + 1;
  }
  scheduleSave();
  render();
}

function buildUnknownWords(){
  const out = [];
  for(let i = 0; i < WORDS.length; i++){
    const m = state.marks[WORDS[i]];
    if(m && m.s === 'u') out.push(WORDS[i]);
  }
  return out;
}

function saveTextFile(text, filename){
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFileNamePart(name){
  return String(name == null ? '' : name).replace(/[\\/:*?"<>|]/g, '').trim();
}

function downloadWords(words, fileLabel, emptyMessage){
  if(words.length === 0){
    alert(emptyMessage);
    return;
  }
  const lines = words.map(w => {
    const entry = getEntry(w);
    const wordText = entry ? entry.word : (typeof w === 'object' && w !== null ? (w.word || '') : String(w || ''));
    const tr = noteText(w).trim() || wordTranslation(w).trim();
    return tr ? `${wordText} - ${tr}` : wordText;
  });
  const date = new Date().toISOString().slice(0, 10);
  saveTextFile(lines.join('\n'), `${safeFileNamePart(fileLabel)} ${date}.txt`);
}

function downloadUnknown(){
  const list = sortWords(buildUnknownWords(), 'alpha_asc');
  downloadWords(list, t('file.unknown'), t('alert.noUnknown'));
}

function downloadCurrentList(){
  const cfg = MODE_CONFIG[currentMode];
  const list = sortWords(cfg.getWords(), state.ui.sort);
  downloadWords(list, t(cfg.fileKey), t('alert.listEmpty'));
}

function exportToAnki(filter = 'unknown'){
  let list = [];
  if(filter === 'unknown'){
    list = sortWords(buildUnknownWords(), 'alpha_asc');
    if(!list.length) list = wordsOfStatus('u');
    if(!list.length) list = wordsOfStatus('r');
  } else if(filter === 'due'){
    list = dueWords(Date.now());
  } else if(filter === 'level'){
    list = wordsOfLevel(state.ui.currentLevel);
  } else {
    list = WORDS;
  }

  if(!list.length){
    alert(t('alert.noUnknown'));
    return;
  }

  const lines = [
    '#separator:tab',
    '#html:true',
    '#tags column:7',
    ['Word', 'Part of Speech', 'CEFR', 'IPA', 'Translation/Definition', 'Context Sentence', 'Tags'].join('\t')
  ];

  list.forEach(w => {
    const e = getEntry(w);
    if(!e) return;
    const word = e.word;
    const pos = e.pos || '';
    const level = (e.level || '').toUpperCase();
    const ipa = e.ipa || '';
    const tr = wordTranslation(e.word) || noteText(e.id) || noteText(e.word) || e.definition || '';
    const ex = e.example || '';
    const tags = `oxford5000 ${level.toLowerCase()}`;
    const clean = str => String(str || '').replace(/\t/g, ' ').replace(/[\r\n]+/g, '<br>');
    lines.push([clean(word), clean(pos), clean(level), clean(ipa), clean(tr), clean(ex), tags].join('\t'));
  });

  const tsv = '\uFEFF' + lines.join('\n');
  const date = new Date().toISOString().slice(0, 10);
  saveTextFile(tsv, `oxford5000-anki-${filter}-${date}.tsv`);
  showToast(t('export.anki.success', { n: list.length }));
}
const MODE_CONFIG = {
  unknown: {
    titleKey: 'modal.unknown.title',
    badgeClass: 'brick',
    getWords: () => WORDS.filter(w => {
      const id = (typeof w === 'object' && w !== null) ? w.id : w;
      const m = state.marks[id] || state.marks[String(id)] || (w && w.word ? state.marks[w.word] : null);
      return !!m && m.s === 'u';
    }),
    rowType: 'removable',
    emptyKey: 'modal.empty.unknown',
    fileKey: 'file.unknown'
  },
  known: {
    titleKey: 'modal.known.title',
    badgeClass: 'teal',
    getWords: () => WORDS.filter(w => {
      const id = (typeof w === 'object' && w !== null) ? w.id : w;
      const m = state.marks[id] || state.marks[String(id)] || (w && w.word ? state.marks[w.word] : null);
      return !!m && m.s === 'k';
    }),
    rowType: 'removable',
    emptyKey: 'modal.empty.known',
    fileKey: 'file.known'
  },
  left: {
    titleKey: 'modal.left.title',
    badgeClass: 'gold',
    getWords: () => WORDS.filter(w => !isMarkedWord(w)),
    rowType: 'quickmark',
    emptyKey: 'modal.empty.left',
    fileKey: 'file.left'
  }
};

let currentMode = 'unknown';
let listLimit = 100;
let searchTimer = null;
let lastFocused = null;

function sortWords(words, mode){
  const arr = words.slice();
  const lvlPos = w => {
    const lvl = (typeof w === 'object' && w !== null) ? (w.level || '').toLowerCase() : (WORD_LEVEL.get(w) || 'a1');
    return LEVEL_ORDER.indexOf(lvl);
  };
  const wordOf = w => (typeof w === 'object' && w !== null ? (w.word || '') : String(w || ''));
  if(mode === 'level_desc'){
    arr.sort((a, b) => (lvlPos(b) - lvlPos(a)) || wordOf(a).localeCompare(wordOf(b)));
  } else if(mode === 'alpha_asc'){
    arr.sort((a, b) => wordOf(a).localeCompare(wordOf(b)));
  } else if(mode === 'alpha_desc'){
    arr.sort((a, b) => wordOf(b).localeCompare(wordOf(a)));
  } else {
    arr.sort((a, b) => (lvlPos(a) - lvlPos(b)) || wordOf(a).localeCompare(wordOf(b)));
  }
  return arr;
}

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function currentSearch(){
  const el = document.getElementById('reviewSearch');
  return el ? el.value : '';
}

// ---------- Word Explorer & Smart Search Overhaul ----------

let explorerState = {
  query: '',
  level: 'all',
  status: 'all',
  pos: 'all',
  sort: 'alpha_asc'
};

function isSearchOpen(){
  const overlay = document.getElementById('searchOverlay');
  return !!overlay && overlay.classList.contains('show');
}

function openSearchModal(){
  const overlay = document.getElementById('searchOverlay');
  if(!overlay) return;
  lastFocused = document.activeElement;
  overlay.classList.add('show');
  renderExplorer();
  requestAnimationFrame(() => {
    const input = document.getElementById('searchInput');
    if(input){
      try{ input.focus(); }catch(e){ /* focus is optional */ }
    }
  });
}

function closeSearch(){
  const overlay = document.getElementById('searchOverlay');
  if(!overlay) return;
  overlay.classList.remove('show');
  if(lastFocused && typeof lastFocused.focus === 'function'){
    try{ lastFocused.focus(); }catch(e){ /* focus is optional */ }
  }
  lastFocused = null;
}

function highlightWordInText(text, word){
  if(!text || !word) return esc(text || '');
  const w = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try{
    const reg = new RegExp(`(^|[^a-zA-Z0-9])(${w})([^a-zA-Z0-9]|$)`, 'gi');
    return esc(text).replace(reg, '$1<b class="hl-word">$2</b>$3');
  }catch(_){
    return esc(text);
  }
}

function filterExplorerWords(){
  const now = Date.now();
  const q = (explorerState.query || '').trim().toLowerCase();
  const lvl = explorerState.level;
  const stFilter = explorerState.status;
  const posFilter = explorerState.pos;

  const filtered = [];
  for(let i = 0; i < WORDS.length; i++){
    const e = WORDS[i];
    const word = (e && e.word) ? e.word : String(e || '');
    const lw = word.toLowerCase();

    // Level filter
    const eLvl = (e && e.level ? e.level : (WORD_LEVEL.get(word) || 'a1')).toLowerCase();
    if(lvl !== 'all' && eLvl !== lvl) continue;

    // Status filter
    const id = (e && typeof e.id !== 'undefined') ? e.id : word;
    const m = state.marks[id] || state.marks[String(id)] || state.marks[word];
    const st = (m && m.s === 'k') ? 'k' : ((m && m.s === 'u') ? 'u' : 'r');
    const srsEntry = state.srs[id] || state.srs[String(id)] || state.srs[word];
    const isDueWord = (st === 'u') && isDue(srsEntry, now);

    if(stFilter === 'k' && st !== 'k') continue;
    if(stFilter === 'u' && st !== 'u') continue;
    if(stFilter === 'due' && !isDueWord) continue;
    if(stFilter === 'r' && st !== 'r') continue;

    // Part of Speech filter
    if(posFilter !== 'all'){
      const pos = (e && e.pos ? e.pos : '').toLowerCase();
      const isVerb = pos.includes('verb') || !!(e && e.verb_forms);
      const isNoun = pos.includes('noun') || !!(e && e.noun_forms);
      const isAdj = pos.includes('adj') || !!(e && e.adjective_forms);
      if(posFilter === 'verb' && !isVerb) continue;
      if(posFilter === 'noun' && !isNoun) continue;
      if(posFilter === 'adj' && !isAdj) continue;
      if(posFilter === 'other' && (isVerb || isNoun || isAdj)) continue;
    }

    // Search Query filter
    let matchScore = 0;
    if(q){
      if(lw === q) matchScore = 100;
      else if(lw.startsWith(q)) matchScore = 80;
      else if(lw.includes(q)) matchScore = 60;
      else {
        const custom = state.customEdits && (state.customEdits[id] || state.customEdits[word]);
        const tr = (custom && custom.tr) ? custom.tr : wordTranslation(word);
        const ltr = tr.toLowerCase();
        if(ltr.includes(q)) matchScore = 50;
        else {
          const sense = (e && e.sense ? e.sense : '').toLowerCase();
          if(sense.includes(q)) matchScore = 40;
          else {
            const ex = (custom && custom.ex) ? custom.ex : (e && e.example ? e.example : '');
            if(ex.toLowerCase().includes(q)) matchScore = 30;
            else continue;
          }
        }
      }
    }

    filtered.push({ e: e, word: word, id: id, score: matchScore, st: st, isDue: isDueWord, lvl: eLvl });
  }

  // Sorting
  const sort = explorerState.sort;
  filtered.sort((a, b) => {
    if(q && a.score !== b.score) return b.score - a.score;
    if(sort === 'alpha_asc') return a.word.localeCompare(b.word);
    if(sort === 'alpha_desc') return b.word.localeCompare(a.word);
    if(sort === 'level_asc'){
      const d = LEVEL_ORDER.indexOf(a.lvl) - LEVEL_ORDER.indexOf(b.lvl);
      return d || a.word.localeCompare(b.word);
    }
    if(sort === 'level_desc'){
      const d = LEVEL_ORDER.indexOf(b.lvl) - LEVEL_ORDER.indexOf(a.lvl);
      return d || a.word.localeCompare(b.word);
    }
    if(sort === 'status_unknown'){
      const sa = a.st === 'u' ? 0 : (a.st === 'r' ? 1 : 2);
      const sb = b.st === 'u' ? 0 : (b.st === 'r' ? 1 : 2);
      return (sa - sb) || a.word.localeCompare(b.word);
    }
    if(sort === 'status_due'){
      const da = a.isDue ? 0 : 1;
      const db = b.isDue ? 0 : 1;
      return (da - db) || a.word.localeCompare(b.word);
    }
    if(sort === 'status_known'){
      const ka = a.st === 'k' ? 0 : 1;
      const kb = b.st === 'k' ? 0 : 1;
      return (ka - kb) || a.word.localeCompare(b.word);
    }
    if(sort === 'importance'){
      const ia = (a.e && a.e.list && a.e.list.includes('3000')) ? 0 : 1;
      const ib = (b.e && b.e.list && b.e.list.includes('3000')) ? 0 : 1;
      return (ia - ib) || a.word.localeCompare(b.word);
    }
    if(sort === 'random'){
      return (Number(a.id) * 17 + a.word.length) % 11 - (Number(b.id) * 17 + b.word.length) % 11;
    }
    return a.word.localeCompare(b.word);
  });

  return filtered;
}

function explorerCardHtml(item){
  const e = item.e;
  const word = item.word;
  const id = item.id;
  const custom = state.customEdits && (state.customEdits[id] || state.customEdits[word]);
  const tr = (custom && custom.tr) ? custom.tr : wordTranslation(word);
  const sense = (e && e.sense) ? e.sense : '';
  const pos = (e && e.pos) ? e.pos : '';
  const lvl = item.lvl || 'a1';
  const st = item.st;
  const isDue = item.isDue;

  let stClass = st;
  let stLabel = t('search.status.' + st);
  if(isDue){
    stClass = 'due';
    stLabel = t('quiz.source.due');
  }

  // Forms breakdown
  let formsHtml = '';
  if(custom && custom.forms){
    formsHtml = `<span class="exp-form-chip"><b>${esc(t('edit.forms'))}:</b> ${esc(custom.forms)}</span>`;
  } else {
    const forms = formsFor(e || word);
    if(Array.isArray(forms) && forms.length){
      formsHtml = forms.map(f => `<span class="exp-form-chip"><b>${esc(formLabel(f))}:</b> ${esc(f.f)}</span>`).join(' ');
    } else if(e && e.forms_summary && e.forms_summary !== 'no changing forms'){
      formsHtml = `<span class="exp-form-chip">${esc(e.forms_summary)}</span>`;
    }
  }

  // Example sentence
  const exText = (custom && custom.ex) ? custom.ex : (e && e.example ? e.example : '');
  const exTr = (custom && custom.ex_tr) ? custom.ex_tr : sentenceTranslation(exText);
  const hlExample = highlightWordInText(exText, word);

  return `<article class="explorer-card" data-word-id="${esc(id)}">
    <div class="exp-card-header">
      <div class="exp-word-cluster">
        <span class="exp-word">${esc(word)}</span>
        <button type="button" class="exp-audio-btn" data-audio-id="${esc(id)}" title="${esc(t('card.speak.title'))}" aria-label="${esc(t('card.speak.title'))}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </button>
        <span class="exp-lvl-badge lvl-${esc(lvl)}">${esc(lvl.toUpperCase())}</span>
        ${pos ? `<span class="exp-pos-badge">${esc(pos)}</span>` : ''}
      </div>
      <div class="exp-card-actions">
        <span class="exp-status-pill ${stClass}">${esc(stLabel)}</span>
        <button type="button" class="exp-jump-btn" data-jump-id="${esc(id)}" title="${esc(t('search.studyWord'))}">${esc(t('search.studyWord'))}</button>
      </div>
    </div>
    <div class="exp-card-meaning">
      <div class="exp-tr-row">
        <span class="exp-tr-text">${esc(tr)}</span>
        ${custom && custom.tr ? `<span class="custom-badge" style="display:inline-block;margin-inline-start:6px;">${esc(t('edit.customBadge'))}</span>` : ''}
      </div>
      ${sense ? `<div class="exp-sense-text">${esc(sense)}</div>` : ''}
    </div>
    ${formsHtml ? `<div class="exp-forms-row">${formsHtml}</div>` : ''}
    ${exText ? `
    <div class="exp-example-box">
      <div class="exp-example-en">“${hlExample}”</div>
      ${exTr ? `<div class="exp-example-tr">${esc(exTr)}</div>` : ''}
    </div>` : ''}
  </article>`;
}

function jumpToWord(entryOrId){
  const entry = getEntry(entryOrId);
  if(!entry) return;
  closeSearch();

  const lvl = (entry.level || 'all').toLowerCase();
  state.ui.currentLevel = lvl;
  buildLevelBar();

  restoreDeckMarkup();
  displayedEntry = entry;
  displayedWord = entry.word;
  cardFormWord = entry.word;

  const total = WORDS.length;
  const known = countStatus('k');
  const unknown = countStatus('u');
  const levelWords = wordsOfLevel(lvl);
  const markedInLevel = levelWords.filter(isMarkedWord).length;

  const wordPosEl = document.getElementById('wordPos');
  if(wordPosEl) wordPosEl.textContent = `${markedInLevel + 1} / ${levelWords.length}`;
  const lvlBadgeEl = document.getElementById('lvlBadge');
  if(lvlBadgeEl) lvlBadgeEl.textContent = (entry.level || 'A1').toUpperCase();
  const wordCountEl = document.getElementById('wordCount');
  if(wordCountEl) wordCountEl.textContent = `${known + unknown} / ${total}`;

  setCardWord(entry.word);
  updateCardAudio(entry);
  updateCardSentence(entry);

  const input = document.getElementById('translationInput');
  if(input) input.value = noteText(entry.id) || noteText(entry.word);

  const card = document.getElementById('card');
  if(card){
    card.className = 'card enter';
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function renderExplorer(){
  const list = document.getElementById('searchList');
  const countEl = document.getElementById('searchCount');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if(!list) return;

  if(input && explorerState.query !== input.value){
    explorerState.query = input.value;
  }
  if(clearBtn){
    clearBtn.classList.toggle('show', !!(input && input.value));
  }

  const results = filterExplorerWords();
  const limit = 80;

  if(countEl){
    countEl.hidden = false;
    countEl.textContent = t('search.shownCount', { n: Math.min(results.length, limit), total: results.length });
  }

  if(!results.length){
    list.innerHTML = `<div class="review-empty">${esc(t('search.nomatch'))}</div>`;
    return;
  }

  list.innerHTML = results.slice(0, limit).map(explorerCardHtml).join('');

  // Wire up audio buttons and jump buttons inside cards
  list.querySelectorAll('[data-audio-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-audio-id');
      const entry = getEntry(id);
      if(!entry) return;
      if(entry.audio_uk || entry.audio_us){
        const src = (state.ui.speechAcc === 'us' && entry.audio_us) ? entry.audio_us : (entry.audio_uk || entry.audio_us);
        playAudio(src, btn);
      } else {
        speakEnglishText(entry.word);
      }
    });
  });

  list.querySelectorAll('[data-jump-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-jump-id');
      jumpToWord(id);
    });
  });
}

function searchWords(query){
  const qStr = (typeof query === 'object' && query !== null) ? query.word : String(query || '');
  const q = qStr.trim().toLowerCase();
  if(!q) return [];
  const hits = [];
  for(let i = 0; i < WORDS.length; i++){
    const item = WORDS[i];
    const word = (typeof item === 'object' && item !== null) ? item.word : String(item || '');
    const lw = word.toLowerCase();
    let score = -1;
    if(lw === q) score = 0;
    else if(lw.indexOf(q) === 0) score = 1;
    else if(lw.indexOf(q) !== -1) score = 2;
    if(score === -1){
      const note = noteText(item).toLowerCase();
      if(note && note.indexOf(q) !== -1) score = 3;
    }
    if(score === -1){
      const tr = wordTranslation(word).toLowerCase();
      if(tr && tr.indexOf(q) !== -1) score = 4;
    }
    if(score !== -1) hits.push({ w: item, word: word, s: score });
  }
  hits.sort((a, b) => (a.s - b.s) || a.word.localeCompare(b.word));
  return hits.map(x => x.w);
}

function renderSearchResults(){
  renderExplorer();
}

function refreshSearchForLang(){
  if(!isSearchOpen()) return;
  renderExplorer();
}

function isReviewOpen(){
  const overlay = document.getElementById('reviewOverlay');
  return !!overlay && overlay.classList.contains('show');
}

function reviewRowHtml(wordOrEntry, rowType){
  const entry = getEntry(wordOrEntry);
  const word = entry ? entry.word : String(wordOrEntry || '');
  const id = entry ? entry.id : word;
  const lvl = (entry ? (entry.level || '').toLowerCase() : WORD_LEVEL.get(word)) || 'a1';
  const example = entry ? entry.example : sentenceFor(word);
  const ipa = ipaFor(word);
  const head = `<span class="rw-word" data-copy="${esc(word)}" title="${esc(t('card.copy.title'))}">${esc(word)}</span>`
    + (entry && entry.pos ? ` <small class="rw-pos" style="font-size:11px;color:var(--teal-deep);">${esc(entry.pos)}</small>` : '')
    + `<span class="rw-lvl ${esc(lvl)}">${esc(LEVEL_LABELS[lvl] || '')}</span>`;
  const details = `<div class="rw-details">
      ${ipa ? `<span class="rw-ipa" dir="ltr">${esc(ipa)}</span>` : ''}
      ${example ? `<span class="rw-example" dir="ltr">${esc(example)}</span>` : ''}
      ${example ? `<button type="button" class="rw-speak" data-speak-word="${esc(word)}" title="${esc(t('card.speak.title'))}" aria-label="${esc(t('card.speak.title'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></button>` : ''}
    </div>`;

  if(rowType === 'removable'){
    const tr = wordTranslation(word).trim();
    return `<div class="review-row">
      <div class="rw-top">
        <div class="rw-word-col">${head}</div>
        <button type="button" class="rw-del" data-del="${esc(word)}" title="${esc(t('modal.row.remove'))}" aria-label="${esc(t('a11y.delete'))}">✕</button>
      </div>
      ${tr ? `<div class="rw-auto">${esc(tr)}</div>` : ''}
      ${details}
      <input class="rw-tr" dir="auto" data-tr="${esc(word)}" value="${esc(noteText(word))}" placeholder="${esc(t('modal.row.notePlaceholder'))}">
    </div>`;
  }

  const trq = wordTranslation(word).trim();
  return `<div class="review-row row-quickmark">
    <div class="rw-top">
      <div class="rw-word-col">${head}</div>
      <div class="rw-quick-actions">
        <button type="button" class="rw-mini unknow" data-mark="unknow" data-word="${esc(word)}" title="${esc(t('card.unknow'))}" aria-label="${esc(t('card.unknow'))}">✕</button>
        <button type="button" class="rw-mini know" data-mark="know" data-word="${esc(word)}" title="${esc(t('card.know'))}" aria-label="${esc(t('card.know'))}">✓</button>
      </div>
    </div>
    ${trq ? `<div class="rw-auto">${esc(trq)}</div>` : ''}
    ${details}
  </div>`;
}

function renderReviewSummary(allWords){
  const el = document.getElementById('reviewSummary');
  if(!el) return;
  if(!allWords.length){
    el.replaceChildren();
    return;
  }
  const counts = {};
  LEVEL_ORDER.forEach(l => { counts[l] = 0; });
  allWords.forEach(w => {
    const lvl = (typeof w === 'object' && w !== null) ? (w.level || '').toLowerCase() : (WORD_LEVEL.get(w) || 'a1');
    counts[lvl] = (counts[lvl] || 0) + 1;
  });
  el.innerHTML = LEVEL_ORDER.filter(l => counts[l]).map(l => (
    `<span class="review-sum-chip ${l}"><b>${esc(LEVEL_LABELS[l])}</b><i>${counts[l]}</i></span>`
  )).join('');
}

function renderReviewList(filter){
  const cfg = MODE_CONFIG[currentMode];
  const allWords = cfg.getWords();

  const countEl = document.getElementById('reviewCount');
  countEl.textContent = String(allWords.length);
  countEl.className = 'review-count ' + cfg.badgeClass;
  document.getElementById('reviewTitle').textContent = t(cfg.titleKey);

  const clearBtn = document.getElementById('btnClearAll');
  clearBtn.style.display = (cfg.rowType === 'quickmark') ? 'none' : '';

  const listEl = document.getElementById('reviewList');
  renderReviewSummary(allWords);

  if(allWords.length === 0){
    listEl.innerHTML = `<div class="review-empty">${tHtml(cfg.emptyKey)}</div>`;
    return;
  }

  const text = (filter === undefined) ? currentSearch() : filter;
  const q = String(text || '').trim().toLowerCase();
  const sorted = sortWords(allWords, state.ui.sort);
  const filtered = q ? sorted.filter(w => (
    w.toLowerCase().includes(q)
      || noteText(w).toLowerCase().includes(q)
      || wordTranslation(w).toLowerCase().includes(q)
  )) : sorted;

  if(filtered.length === 0){
    listEl.innerHTML = `<div class="review-empty">${esc(t('modal.nomatch'))}</div>`;
    return;
  }

  const shown = filtered.slice(0, listLimit);
  const byLevel = state.ui.sort === 'level_asc' || state.ui.sort === 'level_desc';
  let html = '';

  if(byLevel){
    const levels = state.ui.sort === 'level_desc' ? LEVEL_ORDER.toReversed() : LEVEL_ORDER;
    levels.forEach(lvl => {
      const getLvl = w => (typeof w === 'object' && w !== null) ? (w.level || '').toLowerCase() : (WORD_LEVEL.get(w) || 'a1');
      const rows = shown.filter(w => getLvl(w) === lvl);
      if(!rows.length) return;
      const totalAt = filtered.filter(w => getLvl(w) === lvl).length;
      html += `<div class="review-group-head">
        <span class="review-group-badge ${lvl}">${esc(LEVEL_LABELS[lvl])}</span>
        <span class="review-group-line"></span>
        <span class="review-group-count">${totalAt}</span>
      </div>`;
      html += rows.map(w => reviewRowHtml(w, cfg.rowType)).join('');
    });
  } else {
    html = shown.map(w => reviewRowHtml(w, cfg.rowType)).join('');
  }

  if(filtered.length > listLimit){
    html += '<div style="text-align:center;padding:12px 0 16px;">'
      + `<button type="button" class="tool-btn" data-more="1">${esc(t('modal.more'))}</button>`
      + '</div>';
  }

  listEl.innerHTML = html;
}

function openListModal(mode){
  currentMode = mode;
  lastFocused = document.activeElement;
  listLimit = 100;

  const quizFromList = document.getElementById('btnQuizFromList');
  if(quizFromList) quizFromList.style.display = (mode === 'unknown') ? '' : 'none';

  if(searchTimer !== null){
    clearTimeout(searchTimer);
    searchTimer = null;
  }

  document.getElementById('reviewSearch').value = '';
  document.getElementById('reviewSort').value = state.ui.sort;

  renderReviewList('');
  document.getElementById('reviewOverlay').classList.add('show');

  requestAnimationFrame(() => {
    const closeBtn = document.getElementById('closeReview');
    if(closeBtn) closeBtn.focus();
  });
}

function closeReview(){
  const overlay = document.getElementById('reviewOverlay');
  if(!overlay.classList.contains('show')) return;
  overlay.classList.remove('show');

  if(searchTimer !== null){
    clearTimeout(searchTimer);
    searchTimer = null;
  }

  if(lastFocused && typeof lastFocused.focus === 'function'){
    lastFocused.focus();
  }
  lastFocused = null;
}

function trapFocusIn(panel, e){
  if(!panel) return;

  const nodes = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const focusables = Array.prototype.filter.call(nodes, el => (
    !el.disabled && el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null
  ));

  if(focusables.length === 0){
    e.preventDefault();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if(e.shiftKey && document.activeElement === first){
    e.preventDefault();
    last.focus();
  } else if(!e.shiftKey && document.activeElement === last){
    e.preventDefault();
    first.focus();
  }
}

function trapFocus(e){
  trapFocusIn(document.querySelector('#reviewOverlay .review-panel'), e);
}

function copyText(text, toastEl){
  const done = () => {
    if(toastEl){
      toastEl.classList.add('show');
      setTimeout(() => toastEl.classList.remove('show'), 900);
    }
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text)
      .then(() => { done(); return true; })
      .catch(() => { fallbackCopy(text, done); return true; });
  }
  fallbackCopy(text, done);
  return Promise.resolve(true);
}

function fallbackCopy(text, done){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); }catch(e){ /* ignore */ }
  document.body.removeChild(ta);
  if(done) done();
}
// ---------- Step 2: backup reminders, import/merge, file and code sync ----------

const TG_KEY = 'oxford5000_tg';
const PREMERGE_KEY = 'oxford5000_premerge';

function bumpChanges(n){
  if(!state.ui) state.ui = defaultUi();
  const step = (typeof n === 'number' && n > 0) ? n : 1;
  state.ui.changesSinceBackup = (Number(state.ui.changesSinceBackup) || 0) + step;
  updateBackupBanner();
}

function updateBackupBanner(){
  const el = document.getElementById('backupBanner');
  if(!el) return;
  const ui = state.ui || defaultUi();
  const changes = Number(ui.changesSinceBackup) || 0;
  const last = Number.isFinite(ui.lastBackupAt) ? ui.lastBackupAt : null;
  const snooze = Number.isFinite(ui.snoozeUntil) ? ui.snoozeUntil : 0;
  const stale = (last === null) || (Date.now() - last > 7 * 86400000);
  el.classList.toggle('show', changes >= 25 && stale && Date.now() > snooze);
}

let lastMergeStats = null;

function hideMergeSummary(){
  const box = document.getElementById('mergeSummary');
  if(box) box.hidden = true;
  lastMergeStats = null;
}

function showMergeSummary(stats){
  const box = document.getElementById('mergeSummary');
  const text = document.getElementById('mergeSummaryText');
  if(!box || !text) return;
  lastMergeStats = stats;
  text.textContent = t('sync.summary', {
    added: stats.added,
    updated: stats.updated,
    notes: stats.notes,
    skipped: stats.skipped
  });
  box.hidden = false;
}

function refreshMergeSummary(){
  if(!lastMergeStats) return;
  const box = document.getElementById('mergeSummary');
  const text = document.getElementById('mergeSummaryText');
  if(!box || !text || box.hidden) return;
  text.textContent = t('sync.summary', {
    added: lastMergeStats.added,
    updated: lastMergeStats.updated,
    notes: lastMergeStats.notes,
    skipped: lastMergeStats.skipped
  });
}

function isSyncOpen(){
  const overlay = document.getElementById('syncOverlay');
  return !!overlay && overlay.classList.contains('show');
}

function openSyncModal(){
  lastFocused = document.activeElement;
  hideMergeSummary();
  renderSyncStatus();
  document.getElementById('syncOverlay').classList.add('show');
  requestAnimationFrame(() => {
    const btn = document.getElementById('closeSync');
    if(btn) btn.focus();
  });
}

function closeSync(){
  const overlay = document.getElementById('syncOverlay');
  if(!overlay || !overlay.classList.contains('show')) return;
  overlay.classList.remove('show');
  if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  lastFocused = null;
}

function refreshOpenModals(){
  if(isReviewOpen()) renderReviewList(currentSearch());
  if(isSyncOpen()) renderSyncStatus();
}

function applyIncoming(clean){
  const beforeMarks = state.marks;
  const beforeNotes = state.notes;

  try{
    localStorage.setItem(PREMERGE_KEY, JSON.stringify(state));
  }catch(e){ /* snapshot unavailable */ }

  state = mergeStates(state, clean);

  let added = 0;
  let updated = 0;
  let notes = 0;

  const inMarks = (clean && clean.marks && typeof clean.marks === 'object') ? clean.marks : {};
  Object.keys(inMarks).forEach(w => {
    const oldMark = beforeMarks[w];
    const newMark = state.marks[w];
    if(!oldMark){
      added++;
    } else if(!newMark || oldMark.s !== newMark.s || oldMark.t !== newMark.t){
      updated++;
    }
  });

  const inNotes = (clean && clean.notes && typeof clean.notes === 'object') ? clean.notes : {};
  Object.keys(inNotes).forEach(w => {
    const oldNote = beforeNotes[w];
    const newNote = state.notes[w];
    if(!oldNote || !newNote || oldNote.v !== newNote.v || oldNote.t !== newNote.t){
      notes++;
    }
  });

  saveState();
  buildLevelBar();
  render();
  refreshOpenModals();

  return {
    added: added,
    updated: updated,
    notes: notes,
    skipped: (clean && Number(clean.skipped)) || 0
  };
}

function undoSyncMerge(){
  let raw = null;
  try{
    raw = localStorage.getItem(PREMERGE_KEY);
  }catch(e){
    raw = null;
  }
  if(!raw){
    hideMergeSummary();
    return;
  }

  let prev = null;
  try{
    prev = normalizeState(JSON.parse(raw));
  }catch(e){
    prev = null;
  }
  if(!prev){
    hideMergeSummary();
    return;
  }

  state = prev;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.removeItem(PREMERGE_KEY);
  }catch(e){
    showStorageWarning();
  }

  buildLevelBar();
  render();
  refreshOpenModals();
  hideMergeSummary();
  showSyncMsg('', '');
}

function localDateStr(d){
  const date = d || new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function progressFileName(){
  return 'oxford5000-progress-' + localDateStr() + '.json';
}

function progressJson(){
  return JSON.stringify(buildProgress(state), null, 2);
}

function makeProgressFile(){
  const json = progressJson();
  const name = progressFileName();
  try{
    return new File([json], name, { type: 'application/json' });
  }catch(e){
    return new Blob([json], { type: 'application/json' });
  }
}

function markBackupDone(){
  state.ui.lastBackupAt = Date.now();
  state.ui.changesSinceBackup = 0;
  scheduleSave();
  updateBackupBanner();
  renderSyncStatus();
}

function downloadProgressFile(){
  const blob = makeProgressFile();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = progressFileName();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  markBackupDone();
}

function setSyncStatus(elId, text, kind){
  const el = document.getElementById(elId);
  if(!el) return;
  el.textContent = text || '';
  el.className = 'sync-status' + (kind ? ' ' + kind : '');
}

function showSyncMsg(text, kind){ setSyncStatus('syncMsg', text, kind); }
function showCodeMsg(text, kind){ setSyncStatus('codeMsg', text, kind); }
function showTgMsg(text, kind){ setSyncStatus('tgStatus', text, kind); }

function readFileText(file){
  if(file && typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('read failed'));
    reader.readAsText(file);
  });
}

async function importProgressFile(file){
  hideMergeSummary();
  if(!file){
    showSyncMsg(t('sync.err.invalid'), 'error');
    return;
  }
  if(file.size > 2 * 1024 * 1024){
    showSyncMsg(t('sync.err.invalid'), 'error');
    return;
  }

  let obj = null;
  try{
    obj = JSON.parse(await readFileText(file));
  }catch(e){
    showSyncMsg(t('sync.err.invalid'), 'error');
    return;
  }

  const v = validateImport(obj, WORDS, Date.now());
  if(!v.ok){
    showSyncMsg(v.error === 'notours'
      ? t('sync.err.notOurs')
      : t('sync.err.invalid'), 'error');
    return;
  }

  const stats = applyIncoming(v.clean);
  showSyncMsg('', '');
  showMergeSummary(stats);
}

async function sendProgressToTelegram(){
  const file = makeProgressFile();
  let canShare = false;
  try{
    canShare = !!(navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
  }catch(e){
    canShare = false;
  }

  if(canShare){
    try{
      await navigator.share({ files: [file], title: 'Oxford 5000' });
      showSyncMsg('', '');
      markBackupDone();
      return;
    }catch(err){
      if(err && err.name === 'AbortError') return;
    }
  }

  downloadProgressFile();
  showSyncMsg(t('sync.tg.fallback'), 'ok');
}

let lastSyncLink = '';

function showLinkMsg(text, kind){ setSyncStatus('linkMsg', text, kind); }

function linkReadyMessage(link, count, isDelta){
  const key = isDelta ? 'sync.quick.readyDelta' : 'sync.quick.readyFull';
  let msg = t(key, { n: count, c: link.length });
  if(link.length > 4000) msg += '\n' + t('sync.code.long');
  if(location.protocol === 'file:') msg += '\n' + t('sync.quick.local');
  return msg;
}

// Build a link. "delta" sends only entries changed since the last generated
// link, which keeps everyday sync to a few hundred characters. A full link is
// the safe choice for a device that has never received this progress.
async function makeSyncLink(mode){
  const progress = buildProgress(state);
  const wantDelta = (mode === 'delta');
  const since = (wantDelta && state.ui && Number.isFinite(state.ui.lastLinkAt)) ? state.ui.lastLinkAt : 0;
  let source = since ? changesSince(progress, since) : progress;
  let isDelta = !!since;
  let count = progressItemCount(source);

  if(isDelta && count === 0){
    source = progress;
    isDelta = false;
    count = progressItemCount(source);
  }

  const code = await encodeSyncCode(source, undefined, isDelta);
  const link = buildSyncLink(code);
  lastSyncLink = link;

  const out = document.getElementById('syncLinkOut');
  if(out) out.value = link;

  try{ await copyText(link); }catch(e){ /* the field still shows the link */ }

  state.ui.lastLinkAt = typeof progress.exportedAt === 'number' ? progress.exportedAt : Date.now();
  scheduleSave();
  showLinkMsg(linkReadyMessage(link, count, isDelta), 'ok');
  return true;
}

async function shareSyncLink(){
  try{
    if(!lastSyncLink) await makeSyncLink('full');
    if(!lastSyncLink) return;

    if(navigator.share){
      try{
        await navigator.share({ title: 'Oxford 5000', url: lastSyncLink });
        return;
      }catch(err){
        if(err && err.name === 'AbortError') return;
      }
    }

    await copyText(lastSyncLink);
    showLinkMsg(t('sync.quick.copied'), 'ok');
  }catch(e){
    showLinkMsg(t('sync.code.invalid'), 'error');
  }
}

async function mergeSyncText(text){
  const value = extractSyncPayload(text);
  if(!value) throw new Error('invalid sync code');
  const obj = await decodeSyncCode(value);
  const v = validateImport(obj, WORDS, Date.now());
  if(!v.ok) throw new Error('invalid sync code');
  const stats = applyIncoming(v.clean);
  showMergeSummary(stats);
  const box = document.getElementById('mergeSummary');
  if(box && typeof box.scrollIntoView === 'function'){
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  return stats;
}

async function pasteAndMerge(){
  let text = '';
  try{
    if(navigator.clipboard && typeof navigator.clipboard.readText === 'function'){
      text = await navigator.clipboard.readText();
    }
  }catch(e){ text = ''; }

  if(!text || !text.trim()){
    showLinkMsg(t('sync.quick.pasteHint'), 'error');
    const input = document.getElementById('syncCodeInput');
    if(input){
      input.focus();
      if(typeof input.scrollIntoView === 'function') input.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    return;
  }

  hideMergeSummary();
  try{
    await mergeSyncText(text);
    showLinkMsg(t('sync.quick.merged'), 'ok');
    const input = document.getElementById('syncCodeInput');
    if(input) input.value = '';
  }catch(e){
    const key = (e && e.syncKey === 'version') ? 'sync.err.version' : 'sync.code.invalid';
    showLinkMsg(t(key), 'error');
  }
}

function codeMessage(code){
  let msg = t('sync.code.length', { n: code.length });
  if(code.length > 3500) msg += '\n' + t('sync.code.long');
  return msg;
}

async function copySyncCode(){
  try{
    const code = await encodeSyncCode(buildProgress(state));
    await copyText(code);
    showCodeMsg(codeMessage(code), 'ok');
  }catch(e){
    showCodeMsg(t('sync.code.invalid'), 'error');
  }
}

async function sendSyncCode(){
  try{
    const code = await encodeSyncCode(buildProgress(state));
    await copyText(code);
    window.open(buildShareUrl(code), '_blank', 'noopener');
    showCodeMsg(codeMessage(code), 'ok');
  }catch(e){
    showCodeMsg(t('sync.code.invalid'), 'error');
  }
}

async function mergeSyncCode(){
  const input = document.getElementById('syncCodeInput');
  const btn = document.getElementById('btnMergeCode');
  const text = input ? input.value.trim() : '';
  if(!text){
    showCodeMsg(t('sync.code.invalid'), 'error');
    return;
  }

  if(btn) btn.disabled = true;
  hideMergeSummary();
  try{
    await mergeSyncText(text);
    showCodeMsg('', '');
    showLinkMsg(t('sync.quick.merged'), 'ok');
    input.value = '';
  }catch(e){
    const key = (e && e.syncKey === 'version') ? 'sync.err.version' : 'sync.code.invalid';
    showCodeMsg(t(key), 'error');
  }finally{
    if(btn) btn.disabled = false;
  }
}

async function applyHashSync(){
  const raw = location.hash || '';
  if(raw.indexOf('#sync=') !== 0) return false;

  const clearHash = () => {
    try{ history.replaceState(null, '', syncLinkBase() + location.search); }catch(e){ /* keep hash */ }
  };
  const payload = extractSyncPayload(raw);
  if(!payload){ clearHash(); return false; }

  try{
    const obj = await decodeSyncCode(payload);
    const wasDelta = !!obj.syncDelta;
    const v = validateImport(obj, WORDS, Date.now());
    if(!v.ok) throw new Error('invalid sync code');
    const stats = applyIncoming(v.clean);
    clearHash();
    openSyncModal();
    showMergeSummary(stats);
    showLinkMsg(t('sync.quick.merged') + (wasDelta ? '\n' + t('sync.quick.deltaWarn') : ''), 'ok');
    return true;
  }catch(err){
    clearHash();
    openSyncModal();
    const key = (err && err.syncKey === 'version') ? 'sync.err.version' : 'sync.code.invalid';
    showLinkMsg(t(key), 'error');
    return false;
  }
}

// ---------- Step 2: optional personal Telegram bot ----------

function loadTg(){
  const empty = { token: '', chatId: '', lastPinnedId: null, lastSyncAt: null };
  try{
    const raw = localStorage.getItem(TG_KEY);
    if(!raw) return empty;
    const o = JSON.parse(raw);
    if(!o || typeof o !== 'object') return empty;
    return {
      token: (typeof o.token === 'string') ? o.token : '',
      chatId: (typeof o.chatId === 'string' || typeof o.chatId === 'number') ? o.chatId : '',
      lastPinnedId: (typeof o.lastPinnedId === 'number' || typeof o.lastPinnedId === 'string') ? o.lastPinnedId : null,
      lastSyncAt: Number.isFinite(o.lastSyncAt) ? o.lastSyncAt : null
    };
  }catch(e){
    return empty;
  }
}

function saveTg(tg){
  try{
    localStorage.setItem(TG_KEY, JSON.stringify({
      token: tg.token || '',
      chatId: tg.chatId || '',
      lastPinnedId: (tg.lastPinnedId === undefined) ? null : tg.lastPinnedId,
      lastSyncAt: Number.isFinite(tg.lastSyncAt) ? tg.lastSyncAt : null
    }));
    return true;
  }catch(e){
    return false;
  }
}

function showTgErr(key){
  if(key === 'token') showTgMsg(t('sync.bot.err.token'), 'error');
  else if(key === 'chat') showTgMsg(t('sync.bot.err.chat'), 'error');
  else showTgMsg(t('sync.bot.err.net'), 'error');
}

function renderSyncStatus(){
  const lastLine = document.getElementById('lastBackupLine');
  if(lastLine){
    const last = (state.ui && Number.isFinite(state.ui.lastBackupAt)) ? state.ui.lastBackupAt : null;
    lastLine.textContent = t('sync.lastBackup', {
      date: last ? new Date(last).toLocaleDateString() : t('sync.never')
    });
  }

  const tg = loadTg();
  const tokenEl = document.getElementById('tgToken');
  const chatEl = document.getElementById('tgChatId');
  if(tokenEl && document.activeElement !== tokenEl) tokenEl.value = tg.token;
  if(chatEl && document.activeElement !== chatEl) chatEl.value = tg.chatId ? String(tg.chatId) : '';

  const lastSyncEl = document.getElementById('lastSyncLine');
  if(lastSyncEl){
    lastSyncEl.textContent = tg.lastSyncAt ? t('sync.bot.last', { time: new Date(tg.lastSyncAt).toLocaleString() }) : '';
  }

  const configured = !!(tg.token && tg.chatId);
  const syncBtn = document.getElementById('btnSyncNow');
  if(syncBtn) syncBtn.disabled = !configured;
  const detectBtn = document.getElementById('btnDetectChat');
  if(detectBtn) detectBtn.disabled = !tg.token;
  const unlinkBtn = document.getElementById('btnUnlinkBot');
  if(unlinkBtn) unlinkBtn.disabled = !tg.token && !tg.chatId;
}

async function tgApi(method, params){
  const tg = loadTg();
  if(!tg.token){
    const err = new Error('token');
    err.key = 'token';
    throw err;
  }

  const p = params || {};
  let res = null;
  try{
    if(method === 'sendDocument'){
      const fd = new FormData();
      Object.keys(p).forEach(k => {
        if(k === 'document'){
          fd.append('document', p[k], progressFileName());
        } else if(p[k] !== undefined && p[k] !== null){
          fd.append(k, String(p[k]));
        }
      });
      res = await fetch('https://api.telegram.org/bot' + tg.token + '/' + method, {
        method: 'POST',
        body: fd
      });
    } else {
      res = await fetch('https://api.telegram.org/bot' + tg.token + '/' + method, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      });
    }
  }catch(e){
    const err = new Error('net');
    err.key = 'net';
    throw err;
  }

  let json = null;
  try{
    json = await res.json();
  }catch(e){
    json = null;
  }

  if(!res.ok || !json || json.ok === false){
    const err = new Error('telegram');
    err.key = tgErrorKey(res.status, json);
    throw err;
  }
  return json;
}

async function tgDownloadJson(filePath){
  const tg = loadTg();
  if(!tg.token || !filePath){
    const err = new Error('net');
    err.key = 'net';
    throw err;
  }

  let res = null;
  try{
    res = await fetch('https://api.telegram.org/file/bot' + tg.token + '/' + filePath);
  }catch(e){
    const err = new Error('net');
    err.key = 'net';
    throw err;
  }
  if(!res.ok){
    const err = new Error('net');
    err.key = 'net';
    throw err;
  }

  try{
    return await res.json();
  }catch(e){
    const err = new Error('net');
    err.key = 'net';
    throw err;
  }
}

async function detectChatId(){
  const btn = document.getElementById('btnDetectChat');
  const input = document.getElementById('tgChatId');
  if(btn) btn.disabled = true;
  showTgMsg('', '');
  try{
    const json = await tgApi('getUpdates', { limit: 100 });
    const updates = Array.isArray(json.result) ? json.result : [];
    let found = null;
    for(let i = updates.length - 1; i >= 0; i--){
      const msg = updates[i] && updates[i].message;
      if(msg && msg.chat && msg.chat.type === 'private' && msg.chat.id != null){
        found = msg.chat.id;
        break;
      }
    }
    if(found === null){
      showTgMsg(t('sync.bot.err.nochat'), 'error');
    } else {
      if(input) input.value = String(found);
      showTgMsg('', '');
    }
  }catch(err){
    showTgErr(err && err.key);
  }finally{
    if(btn) btn.disabled = false;
    renderSyncStatus();
  }
}

function saveBotSettings(){
  const tokenEl = document.getElementById('tgToken');
  const chatEl = document.getElementById('tgChatId');
  const token = tokenEl ? tokenEl.value.trim() : '';
  const chatId = chatEl ? chatEl.value.trim() : '';
  const old = loadTg();
  const changed = (old.token !== token) || (String(old.chatId) !== String(chatId));

  saveTg({
    token: token,
    chatId: chatId,
    lastPinnedId: changed ? null : old.lastPinnedId,
    lastSyncAt: changed ? null : old.lastSyncAt
  });
  showTgMsg('', '');
  renderSyncStatus();
}

function unlinkBot(){
  try{
    localStorage.removeItem(TG_KEY);
  }catch(e){ /* ignore */ }
  const tokenEl = document.getElementById('tgToken');
  const chatEl = document.getElementById('tgChatId');
  if(tokenEl) tokenEl.value = '';
  if(chatEl) chatEl.value = '';
  showTgMsg('', '');
  renderSyncStatus();
}

let syncRunning = false;
let lastSyncAttempt = 0;

async function syncNow(silent){
  if(syncRunning) return false;

  const tg = loadTg();
  if(!tg.token || !tg.chatId){
    if(!silent) showTgErr('token');
    return false;
  }

  syncRunning = true;
  const btn = document.getElementById('btnSyncNow');
  if(btn) btn.disabled = true;
  if(!silent) showTgMsg('', '');

  try{
    const chatJson = await tgApi('getChat', { chat_id: tg.chatId });
    let fileId = pickRemoteDocument(chatJson, null);

    if(!fileId){
      const updatesJson = await tgApi('getUpdates', { limit: 100 });
      fileId = pickRemoteDocument(chatJson, updatesJson);
    }

    let remoteClean = null;
    if(fileId){
      const fileJson = await tgApi('getFile', { file_id: fileId });
      const filePath = fileJson.result && fileJson.result.file_path;
      if(filePath){
        const remoteObj = await tgDownloadJson(filePath);
        const v = validateImport(remoteObj, WORDS, Date.now());
        if(v.ok){
          remoteClean = v.clean;
          applyIncoming(v.clean);
        }
      }
    } else if(!silent){
      showTgMsg(t('sync.bot.firstUpload'), 'ok');
    }

    const local = buildProgress(state);
    if(!remoteClean || !sameProgress(local, remoteClean)){
      const sent = await tgApi('sendDocument', {
        chat_id: tg.chatId,
        document: makeProgressFile(),
        caption: 'oxford5000 v3'
      });

      const messageId = sent.result && sent.result.message_id;
      if(messageId != null){
        try{
          await tgApi('pinChatMessage', {
            chat_id: tg.chatId,
            message_id: messageId,
            disable_notification: true
          });
        }catch(e){ /* pin is best effort */ }

        if(tg.lastPinnedId && String(tg.lastPinnedId) !== String(messageId)){
          try{
            await tgApi('unpinChatMessage', {
              chat_id: tg.chatId,
              message_id: tg.lastPinnedId
            });
          }catch(e){ /* old pin may already be gone */ }
        }
        tg.lastPinnedId = messageId;
      }
    }

    tg.lastSyncAt = Date.now();
    saveTg(tg);
    showTgMsg(t('sync.bot.ok'), 'ok');
    renderSyncStatus();
    render();
    return true;
  }catch(err){
    if(!silent) showTgErr(err && err.key);
    return false;
  }finally{
    syncRunning = false;
    if(btn) btn.disabled = false;
    renderSyncStatus();
  }
}

function maybeAutoSync(){
  try{
    const tg = loadTg();
    if(!tg.token || !tg.chatId) return;
    const now = Date.now();
    if(now - lastSyncAttempt < 60000) return;
    if(tg.lastSyncAt && (now - tg.lastSyncAt) < 60000) return;
    lastSyncAttempt = now;
    syncNow(true);
  }catch(e){ /* auto sync must never break the app */ }
}

let dragActive = false;
let dragStartX = 0;
let dragCurrentX = 0;

function onDragStart(x){
  const card = document.getElementById('card');
  if(!card) return;
  dragActive = true;
  dragStartX = x;
  dragCurrentX = x;
  card.style.transition = 'none';
}

function onDragMove(x){
  if(!dragActive) return;
  const card = document.getElementById('card');
  if(!card) return;

  dragCurrentX = x;
  const dx = dragCurrentX - dragStartX;
  card.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`;

  const bk = document.getElementById('badgeKnow');
  const bu = document.getElementById('badgeUnknow');
  if(!bk || !bu) return;

  if(dx < -20){
    bk.style.opacity = Math.min(1, -dx / 100);
    bu.style.opacity = 0;
  } else if(dx > 20){
    bu.style.opacity = Math.min(1, dx / 100);
    bk.style.opacity = 0;
  } else {
    bk.style.opacity = 0;
    bu.style.opacity = 0;
  }
}

function onDragEnd(){
  if(!dragActive) return;
  dragActive = false;

  const card = document.getElementById('card');
  if(card){
    card.style.transition = '';
    card.style.transform = '';
  }

  const dx = dragCurrentX - dragStartX;
  if(dx < -90){
    markWord(true);
  } else if(dx > 90){
    markWord(false);
  } else {
    const bk = document.getElementById('badgeKnow');
    const bu = document.getElementById('badgeUnknow');
    if(bk) bk.style.opacity = 0;
    if(bu) bu.style.opacity = 0;
  }
}

// ---------- Step 3: quiz UI and session ----------

let quizSession = null;

function isQuizOpen(){
  const overlay = document.getElementById('quizOverlay');
  return !!overlay && overlay.classList.contains('show');
}

function currentQuizItem(){
  if(!quizSession) return null;
  return quizSession.items[quizSession.index] || null;
}

function playCatSound(){
  try{
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1050, now);
    filter.Q.setValueAtTime(2.5, now);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.48);

    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.linearRampToValueAtTime(0.28, now + 0.08);
    oscGain.gain.exponentialRampToValueAtTime(0.18, now + 0.28);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);

    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(210, now);
    sub.frequency.exponentialRampToValueAtTime(390, now + 0.14);
    sub.frequency.exponentialRampToValueAtTime(170, now + 0.48);

    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ctx.destination);

    sub.connect(subGain);
    subGain.connect(ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + 0.55);
    sub.stop(now + 0.55);

    setTimeout(() => {
      try{ ctx.close(); }catch(e){}
    }, 700);
  }catch(e){
    /* Web Audio optional */
  }
}

let quizTimerId = null;

function clearQuizTimer(){
  if(quizTimerId){
    clearInterval(quizTimerId);
    quizTimerId = null;
  }
}

function startQuizTimer(){
  clearQuizTimer();
  quizTimerId = setInterval(() => {
    if(!quizSession || quizSession.mode !== 'timeAttack' || quizSession.ended){
      clearQuizTimer();
      return;
    }
    quizSession.timeLeft--;
    updateQuizTimerDisplay();
    if(quizSession.timeLeft <= 0){
      clearQuizTimer();
      finishTimeAttack();
    }
  }, 1000);
}

function updateQuizTimerDisplay(){
  const badge = document.getElementById('quizTimerBadge');
  if(!badge || !quizSession) return;
  badge.textContent = `⏱️ ${quizSession.timeLeft}s`;
  badge.classList.toggle('urgent', quizSession.timeLeft <= 6);
}

function finishTimeAttack(){
  clearQuizTimer();
  if(!quizSession) return;
  quizSession.ended = true;
  quizSession.endedAt = Date.now();
  const body = document.getElementById('quizBody');
  if(!body) return;

  const score = quizSession.score || 0;
  const streak = quizSession.bestStreak || 0;

  if(!state.ui.records) state.ui.records = { timeAttackBest: 0, matchBestTime: null, matchBestCombo: 0 };
  state.ui.records.timeAttackBest = Math.max(state.ui.records.timeAttackBest || 0, score);
  scheduleSave();

  body.innerHTML = `<div class="quiz-screen" style="text-align:center;padding:16px 8px;">
    <h3 style="font-size:22px;margin:10px 0;color:var(--gold-deep);">${esc(t('quiz.timeUp'))}</h3>
    <div class="quiz-stats" style="font-size:15px;line-height:2.2;padding:16px;margin:16px 0;">
      <b style="font-size:17px;color:var(--teal-deep);">${esc(t('quiz.speedScore', { n: score }))}</b><br>
      <span>${esc(t('quiz.fastestStreak', { n: streak }))}</span>
    </div>
    <div class="quiz-start-actions" style="display:flex;gap:10px;justify-content:center;margin-top:20px;">
      <button type="button" class="tool-btn primary" id="quizAttackReplay">${esc(t('quiz.mode.timeAttack'))}</button>
      <button type="button" class="tool-btn" id="quizAttackBack">${esc(t('modal.close'))}</button>
    </div>
  </div>`;

  const replayBtn = document.getElementById('quizAttackReplay');
  if(replayBtn) replayBtn.addEventListener('click', () => {
    state.ui.quizSettings.mode = 'timeAttack';
    startQuiz();
  });
  const backBtn = document.getElementById('quizAttackBack');
  if(backBtn) backBtn.addEventListener('click', () => closeQuiz(true));
}

function isEditWordOpen(){
  const overlay = document.getElementById('editWordOverlay');
  return !!overlay && overlay.classList.contains('show');
}

function openEditWordModal(focusId){
  const overlay = document.getElementById('editWordOverlay');
  if(!overlay) return;
  const word = displayedWord;
  const entry = getEntry(word);
  if(!entry) return;

  const custom = state.customEdits && (state.customEdits[entry.id] || state.customEdits[entry.word]);
  const trInput = document.getElementById('editWordTr');
  const exInput = document.getElementById('editWordEx');
  const exTrInput = document.getElementById('editWordExTr');
  const formsInput = document.getElementById('editWordForms');
  const badge = document.getElementById('editWordBadge');
  const statusEl = document.getElementById('editWordStatus');

  if(badge) badge.textContent = entry.word + (entry.level ? ' · ' + entry.level : '');
  if(statusEl) statusEl.hidden = true;

  if(trInput) trInput.value = (custom && custom.tr) ? custom.tr : wordTranslation(entry);
  if(exInput) exInput.value = (custom && custom.ex) ? custom.ex : (entry.example || '');
  if(exTrInput) exTrInput.value = (custom && custom.ex_tr) ? custom.ex_tr : sentenceTranslation(entry.example || '');
  if(formsInput) formsInput.value = (custom && custom.forms) ? custom.forms : (entry.forms_summary || '');

  overlay.classList.add('show');
  requestAnimationFrame(() => {
    const target = focusId ? document.getElementById(focusId) : trInput;
    if(target) target.focus();
  });
}

function closeEditWordModal(){
  const overlay = document.getElementById('editWordOverlay');
  if(overlay) overlay.classList.remove('show');
}

function saveCustomEdit(){
  const word = displayedWord;
  const entry = getEntry(word);
  if(!entry) return;

  const trInput = document.getElementById('editWordTr');
  const exInput = document.getElementById('editWordEx');
  const exTrInput = document.getElementById('editWordExTr');
  const formsInput = document.getElementById('editWordForms');
  const statusEl = document.getElementById('editWordStatus');

  if(!state.customEdits) state.customEdits = {};
  state.customEdits[entry.id] = {
    tr: trInput ? trInput.value.trim() : '',
    ex: exInput ? exInput.value.trim() : '',
    ex_tr: exTrInput ? exTrInput.value.trim() : '',
    forms: formsInput ? formsInput.value.trim() : '',
    t: Date.now()
  };

  scheduleSave();
  updateCardMeta(entry);
  renderCardExample(entry);

  if(statusEl){
    statusEl.textContent = t('edit.saved');
    statusEl.hidden = false;
  }
  setTimeout(() => {
    closeEditWordModal();
  }, 600);
}

function resetCustomEdit(){
  const word = displayedWord;
  const entry = getEntry(word);
  if(!entry) return;

  if(state.customEdits){
    delete state.customEdits[entry.id];
    delete state.customEdits[entry.word];
  }

  scheduleSave();
  updateCardMeta(entry);
  renderCardExample(entry);

  const trInput = document.getElementById('editWordTr');
  const exInput = document.getElementById('editWordEx');
  const exTrInput = document.getElementById('editWordExTr');
  const formsInput = document.getElementById('editWordForms');
  const statusEl = document.getElementById('editWordStatus');

  if(trInput) trInput.value = wordTranslation(entry);
  if(exInput) exInput.value = entry.example || '';
  if(exTrInput) exTrInput.value = sentenceTranslation(entry.example || '');
  if(formsInput) formsInput.value = entry.forms_summary || '';

  if(statusEl){
    statusEl.textContent = t('edit.reset');
    statusEl.hidden = false;
  }
}

// ---------- Word Match Challenge (Memory Pairs Game) ----------

let matchSession = null;
let matchTimerInterval = null;

function openWordMatch(filterLevel){
  const overlay = document.getElementById('matchOverlay');
  if(!overlay) return;
  const level = filterLevel || state.ui.currentLevel || 'all';
  const pool = wordsOfLevel(level);
  if(pool.length < 6){
    showToast(t('alert.listEmpty'));
    return;
  }

  const count = Math.min(8, pool.length);
  const shuffledPool = shuffleArray(pool.slice());
  const selected = [];
  for(let i = 0; i < shuffledPool.length && selected.length < count; i++){
    const e = getEntry(shuffledPool[i]);
    if(e && e.word && (wordTranslation(e.word) || e.definition)){
      selected.push(e);
    }
  }

  if(selected.length < 4){
    showToast(t('alert.listEmpty'));
    return;
  }

  const cards = [];
  selected.forEach((entry, idx) => {
    const tr = wordTranslation(entry.word) || noteText(entry.id) || entry.definition;
    cards.push({
      id: `w_${idx}`,
      pairId: idx,
      type: 'word',
      text: entry.word,
      pos: entry.pos || '',
      matched: false
    });
    cards.push({
      id: `t_${idx}`,
      pairId: idx,
      type: 'trans',
      text: tr,
      pos: '',
      matched: false
    });
  });

  const shuffledCards = shuffleArray(cards);

  matchSession = {
    level: level,
    cards: shuffledCards,
    pairsCount: selected.length,
    matchedPairs: 0,
    firstSelected: null,
    locked: false,
    startTime: Date.now(),
    elapsedSeconds: 0,
    combo: 0,
    bestCombo: 0
  };

  clearInterval(matchTimerInterval);
  matchTimerInterval = setInterval(updateMatchTimer, 1000);

  renderMatchGrid();
  updateMatchTopBar();
  const winScreen = document.getElementById('matchWinScreen');
  if(winScreen) winScreen.hidden = true;
  const grid = document.getElementById('matchGrid');
  if(grid) grid.hidden = false;

  overlay.classList.add('show');
}

function closeWordMatch(){
  clearInterval(matchTimerInterval);
  matchTimerInterval = null;
  matchSession = null;
  const overlay = document.getElementById('matchOverlay');
  if(overlay) overlay.classList.remove('show');
}

function updateMatchTimer(){
  if(!matchSession) return;
  matchSession.elapsedSeconds = Math.floor((Date.now() - matchSession.startTime) / 1000);
  const mm = String(Math.floor(matchSession.elapsedSeconds / 60)).padStart(2, '0');
  const ss = String(matchSession.elapsedSeconds % 60).padStart(2, '0');
  const el = document.getElementById('matchTimer');
  if(el) el.textContent = `⏱️ ${mm}:${ss}`;
}

function updateMatchTopBar(){
  if(!matchSession) return;
  const scoreEl = document.getElementById('matchScore');
  if(scoreEl) scoreEl.textContent = t('match.score', { n: matchSession.matchedPairs, total: matchSession.pairsCount });
  const comboEl = document.getElementById('matchCombo');
  if(comboEl) comboEl.textContent = t('match.combo', { n: matchSession.combo });
}

function renderMatchGrid(){
  const grid = document.getElementById('matchGrid');
  if(!grid || !matchSession) return;

  grid.innerHTML = matchSession.cards.map((card, i) => `
    <button type="button" class="match-card-btn${card.matched ? ' matched' : ''}" data-match-idx="${i}">
      <span class="match-card-lang-tag">${card.type === 'word' ? 'EN' : currentLang.toUpperCase()}</span>
      <span>${esc(card.text)}</span>
    </button>
  `).join('');

  grid.querySelectorAll('[data-match-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-match-idx'));
      onMatchCardClick(idx);
    });
  });
}

function onMatchCardClick(idx){
  if(!matchSession || matchSession.locked) return;
  const cards = matchSession.cards;
  const card = cards[idx];
  if(!card || card.matched) return;

  const grid = document.getElementById('matchGrid');
  const btns = grid ? grid.querySelectorAll('.match-card-btn') : [];
  const currentBtn = btns[idx];

  if(matchSession.firstSelected === null){
    matchSession.firstSelected = idx;
    if(currentBtn) currentBtn.classList.add('selected');
    return;
  }

  if(matchSession.firstSelected === idx){
    matchSession.firstSelected = null;
    if(currentBtn) currentBtn.classList.remove('selected');
    return;
  }

  const firstIdx = matchSession.firstSelected;
  const firstCard = cards[firstIdx];
  const firstBtn = btns[firstIdx];
  if(currentBtn) currentBtn.classList.add('selected');

  const isMatch = (firstCard.pairId === card.pairId && firstCard.type !== card.type);

  if(isMatch){
    firstCard.matched = true;
    card.matched = true;
    matchSession.matchedPairs++;
    matchSession.combo++;
    matchSession.bestCombo = Math.max(matchSession.bestCombo, matchSession.combo);
    matchSession.firstSelected = null;

    if(firstBtn){
      firstBtn.classList.remove('selected');
      firstBtn.classList.add('matched');
    }
    if(currentBtn){
      currentBtn.classList.remove('selected');
      currentBtn.classList.add('matched');
    }

    playMatchSuccessSound();
    updateMatchTopBar();

    if(matchSession.matchedPairs === matchSession.pairsCount){
      finishWordMatch();
    }
  } else {
    matchSession.locked = true;
    matchSession.combo = 0;
    updateMatchTopBar();
    playMatchErrorSound();

    if(firstBtn) firstBtn.classList.add('mismatch');
    if(currentBtn) currentBtn.classList.add('mismatch');

    setTimeout(() => {
      if(firstBtn) firstBtn.classList.remove('selected', 'mismatch');
      if(currentBtn) currentBtn.classList.remove('selected', 'mismatch');
      matchSession.firstSelected = null;
      matchSession.locked = false;
    }, 550);
  }
}

function finishWordMatch(){
  clearInterval(matchTimerInterval);
  const totalSeconds = matchSession.elapsedSeconds;
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  const timeStr = `${mm}:${ss}`;

  if(!state.ui.records) state.ui.records = { timeAttackBest: 0, matchBestTime: null, matchBestCombo: 0 };
  if(state.ui.records.matchBestTime === null || totalSeconds < state.ui.records.matchBestTime){
    state.ui.records.matchBestTime = totalSeconds;
  }
  state.ui.records.matchBestCombo = Math.max(state.ui.records.matchBestCombo || 0, matchSession.bestCombo);

  incrementDailyProgress(matchSession.pairsCount);
  triggerCelebration();

  const grid = document.getElementById('matchGrid');
  if(grid) grid.hidden = true;
  const win = document.getElementById('matchWinScreen');
  if(win){
    win.hidden = false;
    win.innerHTML = `
      <div class="match-win-title">${esc(t('match.completed'))}</div>
      <div class="match-win-stats">
        <p>${esc(t('match.time', { time: timeStr }))} &nbsp;|&nbsp; ${esc(t('match.combo', { n: matchSession.bestCombo }))}</p>
      </div>
      <button type="button" class="tool-btn primary" id="btnMatchPlayAgain">${esc(t('match.playAgain'))}</button>
    `;
    const playAgainBtn = document.getElementById('btnMatchPlayAgain');
    if(playAgainBtn) playAgainBtn.addEventListener('click', () => openWordMatch(matchSession.level));
  }
}

// ---------- Visual Learning Analytics & CEFR Radar ----------

function openAnalyticsModal(){
  const overlay = document.getElementById('analyticsOverlay');
  const body = document.getElementById('analyticsBody');
  if(!overlay || !body) return;

  const totalWords = WORDS.length;
  const knownTotal = countStatus('k');
  const overallPct = totalWords ? Math.round(knownTotal / totalWords * 100) : 0;

  const levelStats = {};
  LEVEL_ORDER.forEach(lvl => {
    const words = wordsOfLevel(lvl);
    let k = 0, u = 0;
    words.forEach(w => {
      const e = getEntry(w);
      const id = e ? e.id : w;
      const m = state.marks[id] || (e ? state.marks[e.word] : null);
      if(m && m.s === 'k') k++;
      else if(m && m.s === 'u') u++;
    });
    const pct = words.length ? Math.round(k / words.length * 100) : 0;
    levelStats[lvl] = { total: words.length, known: k, unknown: u, pct: pct };
  });

  const cx = 150, cy = 150, r = 100;
  const gridPolys = [0.25, 0.5, 0.75, 1.0].map(scale => {
    const pts = LEVEL_ORDER.map((lvl, i) => {
      const angle = (i * 72 - 90) * Math.PI / 180;
      const x = cx + r * scale * Math.cos(angle);
      const y = cy + r * scale * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="rgba(216,205,178,0.7)" stroke-width="1" />`;
  }).join('');

  const axes = LEVEL_ORDER.map((lvl, i) => {
    const angle = (i * 72 - 90) * Math.PI / 180;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const lx = cx + (r + 20) * Math.cos(angle);
    const ly = cy + (r + 20) * Math.sin(angle) + 4;
    return `
      <line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(216,205,178,0.7)" stroke-width="1" />
      <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-family="var(--font-mono)" font-size="12" font-weight="800" fill="var(--ink-text)">${LEVEL_LABELS[lvl]}</text>
    `;
  }).join('');

  const userPts = LEVEL_ORDER.map((lvl, i) => {
    const scale = Math.max(0.08, levelStats[lvl].pct / 100);
    const angle = (i * 72 - 90) * Math.PI / 180;
    const x = cx + r * scale * Math.cos(angle);
    const y = cy + r * scale * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const radarSvg = `
    <svg class="analytics-radar-svg" viewBox="0 0 300 300">
      ${gridPolys}
      ${axes}
      <polygon points="${userPts}" fill="rgba(217, 164, 65, 0.35)" stroke="#d9a441" stroke-width="2.5" />
      ${LEVEL_ORDER.map((lvl, i) => {
        const scale = Math.max(0.08, levelStats[lvl].pct / 100);
        const angle = (i * 72 - 90) * Math.PI / 180;
        const x = cx + r * scale * Math.cos(angle);
        const y = cy + r * scale * Math.sin(angle);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#d9a441" stroke="#fff" stroke-width="1.5" />`;
      }).join('')}
    </svg>
  `;

  const srsBoxes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  Object.keys(state.srs || {}).forEach(k => {
    const b = state.srs[k].box;
    if(b >= 1 && b <= 5) srsBoxes[b]++;
  });

  const records = state.ui.records || {};
  const timeAttackBest = records.timeAttackBest || (state.ui.quizStreak ? state.ui.quizStreak.n : 0);
  const bestStreak = (state.ui.habit && state.ui.habit.bestStreak) ? state.ui.habit.bestStreak : (state.ui.habit ? state.ui.habit.streak : 0);

  body.innerHTML = `
    <div class="analytics-hero-card">
      <div class="analytics-hero-left">
        <h4>${esc(t('analytics.totalMastery'))}</h4>
        <p>${esc(t('analytics.wordsMastered', { n: knownTotal, total: totalWords, pct: overallPct }))}</p>
      </div>
      <div class="analytics-pct-badge">${overallPct}%</div>
    </div>

    <div>
      <h4 class="analytics-section-title">🎯 ${esc(t('analytics.cefrDistribution'))}</h4>
      <div class="analytics-radar-wrap">
        ${radarSvg}
      </div>
      <div class="cefr-bars-container" style="margin-top:14px;">
        ${LEVEL_ORDER.map(lvl => `
          <div class="cefr-bar-row">
            <span class="cefr-bar-label ${lvl}">${LEVEL_LABELS[lvl]}</span>
            <div class="cefr-bar-track">
              <div class="cefr-bar-fill ${lvl}" style="width:${levelStats[lvl].pct}%"></div>
            </div>
            <span class="cefr-bar-stats">${levelStats[lvl].known}/${levelStats[lvl].total} (${levelStats[lvl].pct}%)</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <h4 class="analytics-section-title">📦 ${esc(t('analytics.srsDistribution'))}</h4>
      <div class="srs-boxes-grid">
        ${[1, 2, 3, 4, 5].map(b => `
          <div class="srs-box-tile">
            <span class="srs-box-name">Box ${b}</span>
            <span class="srs-box-count">${srsBoxes[b]}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <h4 class="analytics-section-title">🏆 ${esc(t('analytics.highScores'))}</h4>
      <div class="records-grid">
        <div class="record-tile">
          <span class="record-label">${esc(t('analytics.timeAttackRecord', { score: timeAttackBest }))}</span>
          <span class="record-val">${timeAttackBest} words</span>
        </div>
        <div class="record-tile">
          <span class="record-label">${esc(t('analytics.bestStreak', { days: bestStreak }))}</span>
          <span class="record-val">${bestStreak} days 🔥</span>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('show');
}

function closeAnalyticsModal(){
  const overlay = document.getElementById('analyticsOverlay');
  if(overlay) overlay.classList.remove('show');
}

function openQuizModal(){
  lastFocused = document.activeElement;
  quizSession = null;
  clearQuizTimer();
  renderQuizStart();
  const overlay = document.getElementById('quizOverlay');
  if(!overlay) return;
  overlay.classList.add('show');
  requestAnimationFrame(() => {
    const btn = document.getElementById('closeQuiz');
    if(btn) btn.focus();
  });
}

function closeQuiz(force){
  if(!isQuizOpen()) return;
  if(quizSession && !quizSession.ended && !force){
    if(!confirm(t('quiz.confirmExit'))) return;
  }
  clearQuizTimer();
  const overlay = document.getElementById('quizOverlay');
  overlay.classList.remove('show');
  quizSession = null;
  updateDueLine();
  if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  lastFocused = null;
}

function saveQuizSettings(){
  scheduleSave();
}

function renderQuizStart(){
  const body = document.getElementById('quizBody');
  if(!body) return;

  const s = state.ui.quizSettings;
  const pool = quizPool(s.source, s.level);
  const streak = state.ui.quizStreak || { last: null, n: 0 };
  const last = state.ui.lastQuiz || { correct: 0, total: 0 };

  const levelOptions = ['all'].concat(LEVEL_ORDER).map(l => (
    `<option value="${esc(l)}"${s.level === l ? ' selected' : ''}>${esc(l === 'all' ? t('level.all') : LEVEL_LABELS[l])}</option>`
  )).join('');

  body.innerHTML = `<div class="quiz-screen">
    <p class="quiz-hint">${esc(t('quiz.hint'))}</p>

    <div class="quiz-field">
      <span class="quiz-field-label">${esc(t('quiz.mode'))}</span>
      <div class="quiz-group">
        <label class="quiz-radio"><input type="radio" name="quizMode" value="standard"${(!s.mode || s.mode === 'standard') ? ' checked' : ''}>${esc(t('quiz.mode.standard'))}</label>
        <label class="quiz-radio"><input type="radio" name="quizMode" value="timeAttack"${s.mode === 'timeAttack' ? ' checked' : ''}>${esc(t('quiz.mode.timeAttack'))}</label>
        <label class="quiz-radio"><input type="radio" name="quizMode" value="listening"${s.mode === 'listening' ? ' checked' : ''}>${esc(t('quiz.mode.listening'))}</label>
        <label class="quiz-radio"><input type="radio" name="quizMode" value="spelling"${s.mode === 'spelling' ? ' checked' : ''}>${esc(t('quiz.mode.spelling'))}</label>
      </div>
    </div>

    <div class="quiz-field">
      <span class="quiz-field-label">${esc(t('quiz.source'))}</span>
      <div class="quiz-group">
        <label class="quiz-radio"><input type="radio" name="quizSource" value="all"${s.source === 'all' ? ' checked' : ''}>${esc(t('quiz.source.all'))}</label>
        <label class="quiz-radio"><input type="radio" name="quizSource" value="due"${s.source === 'due' ? ' checked' : ''}>${esc(t('quiz.source.due'))}</label>
      </div>
    </div>

    <div class="quiz-field">
      <label class="quiz-field-label" for="quizLevel">${esc(t('quiz.level'))}</label>
      <select id="quizLevel">${levelOptions}</select>
    </div>

    <div class="quiz-field">
      <span class="quiz-field-label">${esc(t('quiz.count'))}</span>
      <div class="quiz-group">
        <label class="quiz-radio"><input type="radio" name="quizCount" value="10"${s.count === 10 ? ' checked' : ''}>10</label>
        <label class="quiz-radio"><input type="radio" name="quizCount" value="20"${s.count === 20 ? ' checked' : ''}>20</label>
        <label class="quiz-radio"><input type="radio" name="quizCount" value="0"${s.count === 0 ? ' checked' : ''}>${esc(t('level.all'))}</label>
      </div>
    </div>

    <p class="quiz-available${pool.length ? '' : ' empty'}">${esc(t('quiz.available', { n: pool.length }))}</p>

    <div class="quiz-stats">
      ${esc(t('quiz.streak', { n: Number(streak.n) || 0 }))}<br>
      ${esc(t('quiz.last', { correct: Number(last.correct) || 0, total: Number(last.total) || 0 }))}
    </div>

    ${pool.length === 0 ? `<p class="quiz-empty">${esc(t('quiz.empty'))}</p>` : ''}

    <div class="quiz-start-actions">
      <button type="button" class="tool-btn primary" id="quizStartBtn"${pool.length === 0 ? ' disabled' : ''}>${esc(t('quiz.start'))}</button>
    </div>
  </div>`;

  body.querySelectorAll('input[name="quizMode"]').forEach(el => {
    el.addEventListener('change', () => {
      if(!el.checked) return;
      state.ui.quizSettings.mode = el.value;
      saveQuizSettings();
      renderQuizStart();
    });
  });

  body.querySelectorAll('input[name="quizSource"]').forEach(el => {
    el.addEventListener('change', () => {
      if(!el.checked) return;
      state.ui.quizSettings.source = el.value;
      saveQuizSettings();
      renderQuizStart();
    });
  });

  const levelSel = document.getElementById('quizLevel');
  if(levelSel){
    levelSel.addEventListener('change', () => {
      state.ui.quizSettings.level = levelSel.value;
      saveQuizSettings();
      renderQuizStart();
    });
  }

  body.querySelectorAll('input[name="quizCount"]').forEach(el => {
    el.addEventListener('change', () => {
      if(!el.checked) return;
      state.ui.quizSettings.count = Number(el.value);
      saveQuizSettings();
      renderQuizStart();
    });
  });

  const startBtn = document.getElementById('quizStartBtn');
  if(startBtn) startBtn.addEventListener('click', () => startQuiz());
}

function startQuiz(onlyWords){
  const s = state.ui.quizSettings;
  const source = (onlyWords && onlyWords.length) ? onlyWords.slice() : quizPool(s.source, s.level);
  const now = Date.now();
  let queue = buildQuizQueue(source, state.marks, state.srs, now);
  if(!queue.length){
    renderQuizStart();
    return;
  }

  if(!onlyWords){
    const limit = (s.count === 0) ? queue.length : s.count;
    queue = queue.slice(0, limit);
  }

  const answers = notedWords().map(w => answerFor(w).trim()).filter(Boolean);
  if(answers.length < 4){
    renderQuizStart();
    return;
  }

  const items = queue.map(w => ({ word: w, type: 'mc', result: null, extra: false, answered: false, state: {} }));

  quizSession = {
    mode: s.mode || 'standard',
    timeLeft: 30,
    score: 0,
    streak: 0,
    bestStreak: 0,
    items: items,
    initialWords: queue.slice(),
    answers: answers,
    index: 0,
    startedAt: now,
    endedAt: null,
    ended: false,
    first: {},
    final: {},
    personalSentences: {},
    mistakes: new Set()
  };

  if(quizSession.mode === 'timeAttack'){
    startQuizTimer();
  }

  renderQuizQuestion();
}

function renderQuizQuestion(keep){
  const body = document.getElementById('quizBody');
  if(!body || !quizSession) return;
  const item = currentQuizItem();
  if(!item){ finishQuiz(); return; }

  const total = quizSession.items.length;
  const entry = getEntry(item.word);
  const displayWord = entry ? entry.word : String(item.word);
  const lvl = entry ? (entry.level || '').toLowerCase() : (WORD_LEVEL.get(displayWord) || 'a1');
  const pct = total ? ((quizSession.index + 1) / total * 100) : 0;

  if(!keep){
    item.answered = false;
    item.state = {};
  }

  const isTimeAttack = quizSession.mode === 'timeAttack';
  const timerHtml = isTimeAttack
    ? `<span class="quiz-timer-badge${quizSession.timeLeft <= 6 ? ' urgent' : ''}" id="quizTimerBadge">⏱️ ${quizSession.timeLeft}s</span>`
    : '';

  body.innerHTML = `<div class="quiz-screen">
    <div class="quiz-topline">
      <span>${esc(t('quiz.progress', { n: quizSession.index + 1, total: total }))}</span>
      <div style="display:flex;align-items:center;gap:8px;">
        ${timerHtml}
        <span class="quiz-lvl">${esc(LEVEL_LABELS[lvl] || '')}</span>
      </div>
    </div>
    <div class="quiz-bar"><i style="width:${pct.toFixed(2)}%"></i></div>
    <div id="quizQuestionArea"></div>
    <div id="quizFeedbackArea"></div>
  </div>`;

  const area = document.getElementById('quizQuestionArea');
  if(quizSession && quizSession.mode === 'spelling'){
    renderSpellingQuestion(area, item);
  } else {
    renderMcQuestion(area, item);
  }
}

function renderMcQuestion(area, item){
  const entry = getEntry(item.word);
  const displayWord = entry ? entry.word : String(item.word);
  const pos = (entry && entry.pos) ? entry.pos : '';
  const correct = (item.state && item.state.correct) ? item.state.correct : answerFor(entry || displayWord).trim();
  const saved = (item.state && Array.isArray(item.state.options) && item.state.options.length)
    ? item.state.options.slice()
    : null;
  const pool = (quizSession && Array.isArray(quizSession.answers)) ? quizSession.answers : [];

  const distractors = saved ? [] : buildDistractorOptions(correct, pool, 3);
  if(!saved && distractors.length < 3){
    nextQuizQuestion();
    return;
  }

  const options = saved || shuffleArray([correct].concat(distractors));
  item.state.options = options;
  item.state.correct = correct;

  const isListening = quizSession && quizSession.mode === 'listening';
  if(isListening){
    area.innerHTML = `<div class="quiz-prompt">
        <div class="quiz-question-lead">${esc(t('quiz.listenPrompt'))}</div>
        <div class="quiz-listening-hero">
          <button type="button" class="quiz-listening-pulse" id="btnQuizListeningPulse" title="${esc(t('quiz.listenAgain'))}" aria-label="${esc(t('quiz.listenAgain'))}">
            🎧
          </button>
          <button type="button" class="quiz-listening-replay-btn" id="btnQuizSpeak">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <span>${esc(t('quiz.listenAgain'))}</span>
          </button>
          <div class="quiz-hidden-word-box" id="quizHiddenWordBox">
            <span class="quiz-hidden-mask">•••••••</span>
          </div>
        </div>
      </div>
      <div class="quiz-options" id="quizOptions">
        ${options.map((op, i) => `<button type="button" class="quiz-option" data-opt="${i}">
          <span class="num">${i + 1}</span><span>${esc(op)}</span>
        </button>`).join('')}
      </div>`;
  } else {
    area.innerHTML = `<div class="quiz-prompt">
        <div class="quiz-question-lead">${esc(t('quiz.questionPrompt'))}</div>
        <div class="quiz-question-main">
          <span class="quiz-question-word">${esc(displayWord)}</span>
          ${pos ? `<span class="quiz-question-pos">${esc(pos)}</span>` : ''}
          <button type="button" class="quiz-audio-btn" id="btnQuizSpeak" title="${esc(t('card.speak.title'))}" aria-label="${esc(t('card.speak.title'))}">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          </button>
        </div>
      </div>
      <div class="quiz-options" id="quizOptions">
        ${options.map((op, i) => `<button type="button" class="quiz-option" data-opt="${i}">
          <span class="num">${i + 1}</span><span>${esc(op)}</span>
        </button>`).join('')}
      </div>`;
  }

  const playWordAudio = () => {
    const speakBtn = document.getElementById('btnQuizSpeak');
    if(entry && (entry.audio_uk || entry.audio_us)){
      const src = (state.ui.speechAcc === 'us' && entry.audio_us) ? entry.audio_us : (entry.audio_uk || entry.audio_us);
      playAudio(src, speakBtn);
    } else {
      speakEnglishText(displayWord);
    }
  };

  const speakBtn = document.getElementById('btnQuizSpeak');
  if(speakBtn) speakBtn.addEventListener('click', (e) => { e.stopPropagation(); playWordAudio(); });
  const pulseBtn = document.getElementById('btnQuizListeningPulse');
  if(pulseBtn) pulseBtn.addEventListener('click', (e) => { e.stopPropagation(); playWordAudio(); });

  if(isListening){
    setTimeout(playWordAudio, 180);
  }

  area.querySelectorAll('[data-opt]').forEach(btn => {
    btn.addEventListener('click', () => selectMcOption(Number(btn.getAttribute('data-opt'))));
  });
}

function renderSpellingQuestion(area, item){
  const entry = getEntry(item.word);
  const displayWord = entry ? entry.word : String(item.word);
  const pos = (entry && entry.pos) ? entry.pos : '';
  const ipa = (entry && entry.ipa) ? entry.ipa : '';
  const meaning = answerFor(entry || displayWord).trim();
  const example = (entry && entry.example) ? entry.example : '';

  let clozeSentence = '';
  if(example){
    const escWord = escapeRegExp(displayWord);
    const forms = formsFor(displayWord);
    let pattern = escWord;
    if(forms && forms.length){
      pattern = [displayWord].concat(forms.map(f => f.f)).sort((a,b) => b.length - a.length).map(escapeRegExp).join('|');
    }
    const re = new RegExp('\\b(' + pattern + ')\\b', 'gi');
    clozeSentence = esc(example).replace(re, '<span class="quiz-cloze-blank">______</span>');
  }

  area.innerHTML = `
    <div class="quiz-spelling-wrap">
      <div class="quiz-spelling-lead">${esc(t('quiz.spelling.prompt'))}</div>
      <button type="button" class="quiz-spelling-audio-btn" id="btnQuizSpellingAudio" title="${esc(t('quiz.listenAgain'))}" aria-label="${esc(t('quiz.listenAgain'))}">
        🔊
      </button>
      <div class="quiz-spelling-meaning">
        <span>${esc(meaning)}</span>
        ${pos ? `<span class="quiz-question-pos" style="margin-inline-start:8px;">${esc(pos)}</span>` : ''}
      </div>
      ${clozeSentence ? `<div class="quiz-spelling-cloze">"${clozeSentence}"</div>` : ''}
      <div class="quiz-spelling-input-row">
        <input type="text" id="quizSpellingInput" class="quiz-spelling-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t('quiz.spelling.placeholder'))}">
        <button type="button" class="tool-btn primary" id="btnQuizSpellingCheck">${esc(t('quiz.spelling.check'))}</button>
      </div>
      <div id="quizSpellingHintArea" hidden></div>
      <div class="quiz-spelling-actions">
        <button type="button" class="tool-btn" id="btnQuizSpellingHint">${esc(t('quiz.spelling.showHint'))}</button>
        <button type="button" class="tool-btn" id="btnQuizSpellingGiveUp">${esc(t('quiz.spelling.giveUp'))}</button>
      </div>
    </div>
  `;

  const playWordAudio = () => {
    const audioBtn = document.getElementById('btnQuizSpellingAudio');
    if(entry && (entry.audio_uk || entry.audio_us)){
      const src = (state.ui.speechAcc === 'us' && entry.audio_us) ? entry.audio_us : (entry.audio_uk || entry.audio_us);
      playAudio(src, audioBtn);
    } else {
      speakEnglishText(displayWord);
    }
  };

  const audioBtn = document.getElementById('btnQuizSpellingAudio');
  if(audioBtn) audioBtn.addEventListener('click', playWordAudio);
  setTimeout(playWordAudio, 180);

  const input = document.getElementById('quizSpellingInput');
  const checkBtn = document.getElementById('btnQuizSpellingCheck');
  const hintBtn = document.getElementById('btnQuizSpellingHint');
  const giveUpBtn = document.getElementById('btnQuizSpellingGiveUp');
  const hintArea = document.getElementById('quizSpellingHintArea');

  if(input) setTimeout(() => { try { input.focus(); } catch(e){} }, 100);

  let hintCount = 0;
  if(hintBtn && hintArea){
    hintBtn.addEventListener('click', () => {
      hintCount++;
      hintArea.hidden = false;
      if(ipa && hintCount === 1){
        hintArea.innerHTML = `<span class="quiz-spelling-hint-text">IPA: /${esc(ipa)}/ (${displayWord.length} letters)</span>`;
      } else {
        const revealed = displayWord.slice(0, Math.min(hintCount, displayWord.length - 1));
        const mask = revealed + '•'.repeat(Math.max(0, displayWord.length - revealed.length));
        hintArea.innerHTML = `<span class="quiz-spelling-hint-text">Hint: ${esc(mask)}</span>`;
      }
      if(input) input.focus();
    });
  }

  const doSubmit = () => {
    if(!input || item.answered) return;
    const typed = input.value.trim().toLowerCase();
    const target = displayWord.trim().toLowerCase();
    if(!typed) return;

    if(typed === target){
      input.classList.remove('shake-error');
      input.style.borderColor = '#3a8a4f';
      input.style.background = 'rgba(58, 138, 79, 0.15)';
      playTone(587.33, 'triangle', 0.15, 0.1);
      answerQuestion(true, { spelling: true });
    } else {
      input.classList.remove('shake-error');
      void input.offsetWidth;
      input.classList.add('shake-error');
      playTone(220, 'sawtooth', 0.18, 0.08);
      showToast(t('quiz.spelling.incorrect'));
      input.focus();
    }
  };

  if(checkBtn) checkBtn.addEventListener('click', doSubmit);
  if(input){
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        e.preventDefault();
        doSubmit();
      }
    });
  }

  if(giveUpBtn){
    giveUpBtn.addEventListener('click', () => {
      if(item.answered) return;
      if(input) input.value = displayWord;
      answerQuestion(false, { spelling: true });
    });
  }
}

function selectMcOption(i){
  const item = currentQuizItem();
  if(!item || item.type !== 'mc' || item.answered) return;
  const options = (item.state && item.state.options) ? item.state.options : [];
  if(i < 0 || i >= options.length) return;

  const passed = options[i] === item.state.correct;
  item.state.picked = i;

  document.querySelectorAll('#quizOptions [data-opt]').forEach(btn => {
    const idx = Number(btn.getAttribute('data-opt'));
    btn.disabled = true;
    if(options[idx] === item.state.correct) btn.classList.add('correct');
    else if(idx === i) btn.classList.add('wrong');
  });

  if(quizSession && quizSession.mode === 'listening'){
    const box = document.getElementById('quizHiddenWordBox');
    if(box){
      const entry = getEntry(item.word);
      const displayWord = entry ? entry.word : String(item.word);
      const pos = (entry && entry.pos) ? entry.pos : '';
      box.innerHTML = `<span class="quiz-revealed-word">${esc(displayWord)}</span>${pos ? `<span class="quiz-question-pos" style="margin-inline-start:8px;">${esc(pos)}</span>` : ''}`;
    }
  }

  const isTimeAttack = quizSession && quizSession.mode === 'timeAttack';
  if(isTimeAttack){
    answerQuestion(passed, { timeAttack: true });
    if(passed){
      quizSession.timeLeft += 2;
      quizSession.score = (quizSession.score || 0) + 1;
      quizSession.streak = (quizSession.streak || 0) + 1;
      quizSession.bestStreak = Math.max(quizSession.bestStreak || 0, quizSession.streak);
      const badge = document.getElementById('quizTimerBadge');
      if(badge){
        const f = document.createElement('span');
        f.className = 'plus-two-float';
        f.textContent = '+2s';
        badge.appendChild(f);
        setTimeout(() => f.remove(), 650);
      }
      updateQuizTimerDisplay();
      setTimeout(() => nextQuizQuestion(), 280);
    } else {
      playCatSound();
      quizSession.streak = 0;
      const panel = document.querySelector('#quizOverlay .quiz-panel');
      if(panel){
        panel.classList.remove('time-attack-wrong');
        void panel.offsetWidth;
        panel.classList.add('time-attack-wrong');
        setTimeout(() => panel.classList.remove('time-attack-wrong'), 450);
      }
      setTimeout(() => nextQuizQuestion(), 400);
    }
    return;
  }

  answerQuestion(passed, {});
}

function answerQuestion(passed, info){
  const item = currentQuizItem();
  if(!item || item.answered) return;

  item.answered = true;
  item.result = passed;
  const word = item.word;
  const now = Date.now();

  if(item.extra){
    quizSession.final[word] = passed;
  } else {
    quizSession.first[word] = passed;
    quizSession.final[word] = passed;

    state.srs = Object.assign({}, state.srs);
    state.srs[word] = nextSrs(state.srs[word], passed, now);
    scheduleSave();
    updateDueLine();

    if(!passed && !quizSession.mistakes.has(word)){
      quizSession.mistakes.add(word);
      quizSession.items.push({ word: word, type: 'mc', result: null, extra: true, answered: false, state: {} });
    }
  }

  incrementDailyProgress(1);

  if(info && info.timeAttack){
    return;
  }

  renderQuizFeedback(passed, info || {});
}

function renderQuizFeedback(passed, info){
  const item = currentQuizItem();
  if(!item) return;

  const q = document.getElementById('quizQuestionArea');
  if(q){
    q.querySelectorAll('[data-opt]').forEach(btn => { btn.disabled = true; });
  }

  const correctText = (item.state && item.state.correct) ? item.state.correct : answerFor(item.word);
  const note = noteText(item.word).trim();
  const builtIn = wordTranslation(item.word).trim();
  const area = document.getElementById('quizFeedbackArea');
  if(!area) return;

  const extraLines = [];
  if(builtIn && builtIn !== correctText) extraLines.push(`<p class="quiz-yournote">${esc(builtIn)}</p>`);
  if(note && note !== correctText && note !== builtIn) extraLines.push(`<p class="quiz-yournote">${esc(note)}</p>`);

  const isListening = quizSession && quizSession.mode === 'listening';
  const entry = getEntry(item.word);
  const displayWord = entry ? entry.word : String(item.word);
  const wordRevealedLabel = t('quiz.wordRevealed');
  const revealedHtml = isListening
    ? `<div class="quiz-revealed-banner"><span>${esc(wordRevealedLabel)}${wordRevealedLabel.endsWith(':') || wordRevealedLabel.endsWith('：') ? '' : ':'}</span> <strong>${esc(displayWord)}</strong></div>`
    : '';

  area.innerHTML = `<div class="quiz-feedback ${passed ? 'ok' : 'no'}">
    <b>${esc(passed ? t('quiz.correct') : t('quiz.wrong'))}</b>
    ${revealedHtml}
    <p><span class="quiz-correct">${esc(correctText)}</span></p>
    ${extraLines.join('')}
    <label class="quiz-sentence-prompt" for="quizSentenceInput">${esc(t('quiz.personalSentence.prompt', { word: displayWord }))}</label>
    <textarea id="quizSentenceInput" class="quiz-personal-sentence" rows="2" dir="ltr" lang="en" placeholder="${esc(t('quiz.personalSentence.placeholder'))}"></textarea>
    <div class="quiz-actions">
      <button type="button" class="tool-btn primary" id="quizSaveSentence" disabled>${esc(t('quiz.personalSentence.save'))}</button>
      <button type="button" class="tool-btn primary" id="quizNext" disabled>${esc(t('quiz.next'))}</button>
    </div>
  </div>`;

  const sentenceInput = document.getElementById('quizSentenceInput');
  const saveSentence = document.getElementById('quizSaveSentence');
  const next = document.getElementById('quizNext');
  if(sentenceInput && saveSentence && next){
    sentenceInput.addEventListener('input', () => {
      saveSentence.disabled = sentenceInput.value.trim().length < 3;
    });
    saveSentence.addEventListener('click', () => {
      const sentence = sentenceInput.value.trim();
      if(sentence.length < 3) return;
      quizSession.personalSentences[item.word] = sentence;
      sentenceInput.disabled = true;
      saveSentence.disabled = true;
      next.disabled = false;
      next.focus();
    });
  }
  if(next){
    next.addEventListener('click', nextQuizQuestion);
    try{ next.focus(); }catch(e){ /* focus is optional */ }
  }
}

function nextQuizQuestion(){
  if(!quizSession) return;
  quizSession.index++;
  if(quizSession.index >= quizSession.items.length){
    finishQuiz();
    return;
  }
  renderQuizQuestion();
}

function finishQuiz(){
  if(!quizSession) return;
  clearQuizTimer();
  if(quizSession.mode === 'timeAttack'){
    finishTimeAttack();
    return;
  }
  const now = Date.now();
  quizSession.endedAt = now;
  quizSession.ended = true;

  const words = quizSession.initialWords;
  let correct = 0;
  words.forEach(w => { if(quizSession.final[w]) correct++; });

  const today = localDateStr();
  const yesterday = localDateStr(new Date(now - SRS_DAY));
  const st = state.ui.quizStreak || { last: null, n: 0 };
  let n = 1;
  if(st.last === today) n = Math.max(1, st.n);
  else if(st.last === yesterday) n = Math.max(1, st.n) + 1;

  state.ui.quizStreak = { last: today, n: n };
  state.ui.lastQuiz = { date: today, correct: correct, total: words.length };
  scheduleSave();
  updateDueLine();
  renderQuizEnd();
}

function renderQuizEnd(){
  const body = document.getElementById('quizBody');
  if(!body || !quizSession) return;

  const words = quizSession.initialWords;
  let correct = 0;
  words.forEach(w => { if(quizSession.final[w]) correct++; });
  const total = words.length;
  const pct = total ? Math.round(correct / total * 100) : 0;

  const secs = Math.max(0, Math.round(((quizSession.endedAt || Date.now()) - quizSession.startedAt) / 1000));
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  const rows = words.map(w => {
    const passed = !!quizSession.final[w];
    const entry = getEntry(w);
    const displayWord = entry ? entry.word : String(w);
    const key = entry ? entry.id : w;
    const srsEntry = state.srs[key] || state.srs[String(key)] || state.srs[displayWord];
    const box = srsEntry ? srsEntry.box : 1;
    const lvl = entry ? (entry.level || '').toLowerCase() : (WORD_LEVEL.get(displayWord) || 'a1');
    const pre = (passed && box === 5) ? ' checked' : '';
    return `<div class="quiz-end-row">
      <label class="quiz-check quiz-transfer" style="margin:0;">
        <input type="checkbox" data-transfer="${esc(key)}"${pre}>
        <span>${esc(t('quiz.moveToKnown'))}</span>
      </label>
      <span class="quiz-res ${passed ? 'ok' : 'no'}">${passed ? '✓' : '✕'}</span>
      <span class="quiz-row-word">${esc(displayWord)}</span>
      <span class="quiz-lvl">${esc(LEVEL_LABELS[lvl] || '')}</span>
      <span class="quiz-row-note">${esc(noteText(key) || noteText(displayWord) || wordTranslation(displayWord))}</span>
      <span class="quiz-stage">${esc(t('quiz.row.box', { n: box }))}</span>
    </div>`;
  }).join('');

  const wrongCount = words.filter(w => !quizSession.final[w]).length;

  body.innerHTML = `<div class="quiz-screen">
    <p class="quiz-end-score">${esc(t('quiz.result.score', { correct: correct, total: total, pct: pct }))}</p>
    <p class="quiz-end-time">${esc(t('quiz.result.time', { time: mm + ':' + ss }))}</p>
    <div class="quiz-end-list">${rows}</div>
    <div class="quiz-end-actions">
      <button type="button" class="tool-btn primary" id="quizApply">${esc(t('quiz.apply'))}</button>
      <button type="button" class="tool-btn" id="quizRetryWrong"${wrongCount ? '' : ' disabled'}>${esc(t('quiz.retryWrong'))}</button>
      <button type="button" class="tool-btn" id="quizDownload">${esc(t('quiz.downloadResults'))}</button>
      <button type="button" class="tool-btn" id="quizCloseEnd">${esc(t('modal.close'))}</button>
    </div>
  </div>`;

  const applyBtn = document.getElementById('quizApply');
  if(applyBtn) applyBtn.addEventListener('click', applyQuizTransfers);

  const retryBtn = document.getElementById('quizRetryWrong');
  if(retryBtn) retryBtn.addEventListener('click', retryQuizWrong);

  const dlBtn = document.getElementById('quizDownload');
  if(dlBtn) dlBtn.addEventListener('click', downloadQuizResults);

  const closeBtn = document.getElementById('quizCloseEnd');
  if(closeBtn) closeBtn.addEventListener('click', () => closeQuiz(true));
}

function applyQuizTransfers(){
  if(!quizSession) return;
  const boxes = Array.prototype.slice.call(document.querySelectorAll('#quizBody [data-transfer]'));
  const words = boxes.filter(el => el.checked).map(el => el.getAttribute('data-transfer'));
  if(words.length){
    const now = Date.now();
    words.forEach(w => {
      state.marks = applyMark(state.marks, w, 'k', now);
    });
    bumpChanges();
    saveState();
    buildLevelBar();
    render();
  }
  closeQuiz(true);
}

function retryQuizWrong(){
  if(!quizSession) return;
  const wrong = quizSession.initialWords.filter(w => !quizSession.final[w]);
  if(!wrong.length) return;
  startQuiz(wrong);
}

function downloadQuizResults(){
  if(!quizSession) return;
  const lines = quizSession.initialWords.map(w => {
    const ok = !!quizSession.final[w];
    const own = quizSession.personalSentences && quizSession.personalSentences[w]
      ? ` - ${quizSession.personalSentences[w]}` : '';
    return `${ok ? '✓' : '✕'} - ${w} - ${(noteText(w).trim() || wordTranslation(w).trim())}${own}`;
  });
  saveTextFile(lines.join('\n'), safeFileNamePart(t('file.quiz')) + ' ' + localDateStr() + '.txt');
}

function refreshQuizForLang(){
  if(!isQuizOpen()) return;
  if(!quizSession){ renderQuizStart(); return; }
  if(quizSession.ended){ renderQuizEnd(); return; }
  const item = currentQuizItem();
  if(!item){ renderQuizStart(); return; }
  // An answered question keeps its frozen feedback; the new language applies from the next one.
  if(item.answered) return;

  item.answered = false;
  item.state = {};
  renderQuizQuestion();
}

function openOnboarding(){
  const overlay = document.getElementById('onboardingOverlay');
  if(overlay) overlay.classList.add('show');
}

function closeOnboarding(){
  const overlay = document.getElementById('onboardingOverlay');
  if(overlay) overlay.classList.remove('show');
  state.ui.onboardingSeen = true;
  scheduleSave();
}

const TOUR_SECTIONS = [
  {
    id: 'cards',
    title: 'tutorial.section.cards',
    steps: [
      ['tutorial.card.title', 'tutorial.card.text', '#card'],
      ['tutorial.word.title', 'tutorial.word.text', '#theWord'],
      ['tutorial.example.title', 'tutorial.example.text', '#cardSentence'],
      ['tutorial.ipa.title', 'tutorial.ipa.text', '#cardIpa'],
      ['tutorial.forms.title', 'tutorial.forms.text', '#formsBar'],
      ['tutorial.mark.title', 'tutorial.mark.text', '#btnKnow']
    ]
  },
  {
    id: 'progress',
    title: 'tutorial.section.progress',
    steps: [
      ['tutorial.levels.title', 'tutorial.levels.text', '#levelBar'],
      ['tutorial.lists.title', 'tutorial.lists.text', '#openUnknown'],
      ['tutorial.review.title', 'tutorial.review.text', '#dueLine'],
      ['tutorial.search.title', 'tutorial.search.text', '#btnSearch']
    ]
  },
  {
    id: 'quiz',
    title: 'tutorial.section.quiz',
    steps: [
      ['tutorial.quiz.title', 'tutorial.quiz.text', '#btnQuiz'],
      ['tutorial.quizSentence.title', 'tutorial.quizSentence.text', '#btnQuiz']
    ]
  },
  {
    id: 'language',
    title: 'tutorial.section.language',
    steps: [
      ['tutorial.language.title', 'tutorial.language.text', '#langSelectButton'],
      ['tutorial.multi.title', 'tutorial.multi.text', '#langSelectButton'],
      ['tutorial.speech.title', 'tutorial.speech.text', '#langSelectButton']
    ]
  },
  {
    id: 'tools',
    title: 'tutorial.section.tools',
    steps: [
      ['tutorial.sync.title', 'tutorial.sync.text', '#btnSync'],
      ['tutorial.download.title', 'tutorial.download.text', '#btnDownload'],
      ['tutorial.feedback.title', 'tutorial.feedback.text', '#openFeedback'],
      ['tutorial.tutorial.title', 'tutorial.tutorial.text', '#openTutorial']
    ]
  },
];

let tutorialSectionIndex = 0;
let tutorialIndex = 0;

function tutorialSteps(){
  return TOUR_SECTIONS[tutorialSectionIndex].steps;
}

function positionTutorialPanel(){
  const overlay = document.getElementById('tutorialOverlay');
  const panel = overlay && overlay.querySelector('.tutorial-panel');
  const target = tutorialSteps()[tutorialIndex] && document.querySelector(tutorialSteps()[tutorialIndex][2]);
  if(!panel || !target) return;
  const rect = target.getBoundingClientRect();
  const margin = 14;
  const viewportHeight = window.innerHeight;
  const panelWidth = Math.min(390, window.innerWidth - margin * 2);
  const maxPanelHeight = Math.max(160, viewportHeight - margin * 2);
  panel.style.maxHeight = maxPanelHeight + 'px';
  const panelHeight = Math.min(panel.scrollHeight || panel.offsetHeight || 300, maxPanelHeight);
  let left = Math.max(margin, Math.min(window.innerWidth - panelWidth - margin, rect.left + rect.width / 2 - panelWidth / 2));
  let top = rect.bottom + margin;
  if(top + panelHeight > viewportHeight - margin) top = rect.top - panelHeight - margin;
  top = Math.max(margin, Math.min(viewportHeight - panelHeight - margin, top));
  panel.style.width = panelWidth + 'px';
  panel.style.left = left + 'px';
  panel.style.top = top + 'px';
  const positioned = panel.getBoundingClientRect();
  if(positioned.bottom > viewportHeight - margin){
    panel.style.top = Math.max(margin, top - (positioned.bottom - viewportHeight + margin)) + 'px';
  }else if(positioned.top < margin){
    panel.style.top = margin + 'px';
  }
}

function renderTutorialStep(){
  const sectionList = document.getElementById('tutorialCategories');
  const steps = document.getElementById('tutorialSteps');
  const progress = document.getElementById('tutorialProgress');
  const previous = document.getElementById('tutorialPrevious');
  const next = document.getElementById('tutorialNext');
  const section = TOUR_SECTIONS[tutorialSectionIndex];
  const step = tutorialSteps()[tutorialIndex];
  if(!steps || !step) return;
  if(sectionList){
    sectionList.innerHTML = TOUR_SECTIONS.map((item, index) =>
      `<button type="button" class="tutorial-category${index === tutorialSectionIndex ? ' active' : ''}" data-tour-section="${index}">${esc(t(item.title))}<span>${item.steps.length}</span></button>`
    ).join('');
    sectionList.querySelectorAll('[data-tour-section]').forEach(button => {
      button.addEventListener('click', () => {
        tutorialSectionIndex = Number(button.getAttribute('data-tour-section')) || 0;
        tutorialIndex = 0;
        renderTutorialStep();
      });
    });
  }
  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  const target = document.querySelector(step[2]);
  if(target) target.classList.add('tour-highlight');
  steps.innerHTML = `<span class="tutorial-number">${tutorialIndex + 1}</span><div><h4>${esc(t(step[0]))}</h4><p>${esc(t(step[1]))}</p></div>`;
  if(progress) progress.textContent = t(section.title) + ' · ' + (tutorialIndex + 1) + ' / ' + section.steps.length;
  if(previous) previous.disabled = tutorialIndex === 0;
  if(next){
    next.textContent = tutorialIndex === section.steps.length - 1 ? t('tutorial.finish') : t('tutorial.next');
  }
  requestAnimationFrame(positionTutorialPanel);
}

function openTutorial(){
  const overlay = document.getElementById('tutorialOverlay');
  if(!overlay) return;
  tutorialSectionIndex = 0;
  tutorialIndex = 0;
  renderTutorialStep();
  overlay.classList.add('show');
}

function closeTutorial(){
  const overlay = document.getElementById('tutorialOverlay');
  if(overlay) overlay.classList.remove('show');
  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
}

window.addEventListener('resize', () => {
  const overlay = document.getElementById('tutorialOverlay');
  if(overlay && overlay.classList.contains('show')) requestAnimationFrame(positionTutorialPanel);
});

function moveTutorial(direction){
  const steps = tutorialSteps();
  if(direction > 0 && tutorialIndex === steps.length - 1){
    if(tutorialSectionIndex < TOUR_SECTIONS.length - 1){
      tutorialSectionIndex++;
      tutorialIndex = 0;
    }else{
      closeTutorial();
      return;
    }
  }else if(direction < 0 && tutorialIndex === 0){
    if(tutorialSectionIndex > 0){
      tutorialSectionIndex--;
      tutorialIndex = tutorialSteps().length - 1;
    }
  }else{
    tutorialIndex = Math.max(0, Math.min(steps.length - 1, tutorialIndex + direction));
  }
  renderTutorialStep();
}

let currentWhatsNewTab = 'tab-update14';

function isWhatsNewOpen(){
  const el = document.getElementById('whatsNewOverlay');
  return !!(el && el.classList.contains('show'));
}

function openWhatsNew(tab){
  const overlay = document.getElementById('whatsNewOverlay');
  if(!overlay) return;
  renderWhatsNewContent(tab || 'tab-update14');
  overlay.classList.add('show');
  requestAnimationFrame(() => {
    const btn = document.getElementById('closeWhatsNew');
    if(btn) btn.focus();
  });
}

function closeWhatsNew(){
  const overlay = document.getElementById('whatsNewOverlay');
  if(overlay) overlay.classList.remove('show');
}

function renderWhatsNewContent(activeTab){
  if(activeTab) currentWhatsNewTab = activeTab;
  const contentEl = document.getElementById('whatsNewContent');
  if(!contentEl) return;

  document.querySelectorAll('.whats-new-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === currentWhatsNewTab);
  });

  const isAr = (currentLang === 'ar');

  if(currentWhatsNewTab === 'tab-update14'){
    contentEl.innerHTML = `
      <div class="wn-section">
        <div class="wn-release-title">
          <span>🌟 ${isAr ? 'تحديث Oxford 5000 - الإصدار 1.4' : 'Oxford 5000 - Update 1.4'}</span>
          <span class="wn-tag">${isAr ? 'أحدث إصدار' : 'Latest Release'}</span>
        </div>
        <p class="wn-release-meta">${isAr ? 'إصدار ثوري يقدم عادات الدراسة اليومية، التحكم بسرعة الصوت، نمط اختبار الإملاء والكتابة، لعبة مطابقة الكلمات، والتحليلات البصرية الشاملة.' : 'A milestone release introducing daily study habit streaks, audio speed controls, interactive spelling quiz, rapid word match game, and visual learning analytics.'}</p>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🔥</span> <span>${isAr ? '1. عادات الدراسة اليومية وعداد السلسلة والاحتفال' : '1. Daily Study Habit, Goals & Streak Counter'}</span></div>
          <p>${isAr ? 'تتبع ذكي ومستمر لأيام دراستك المتتالية 🔥، مع إمكانية تحديد هدفك اليومي (10 أو 20 أو 50 أو 100 بطاقة)، وشريط تقدم بصري مع احتفال جزيئات نارية عند إنجاز الهدف.' : 'Track consecutive study days with glowing fire streak badges 🔥, custom daily targets (10, 20, 50, 100 cards), and celebratory confetti animations upon completion.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🎧</span> <span>${isAr ? '2. التحكم المتقدم بالنطق الصوتي وسرعة التشغيل' : '2. Audio Speed Control & Auto-Pronounce'}</span></div>
          <p>${isAr ? 'مفتاح سريع للتبديل بين سرعات النطق (1.0x / 0.8x / 0.6x) للاستماع الدقيق للحروف والأصوات الصعبة، مع خيار النطق الصوتي التلقائي عند الانتقال للبطاقة التالية.' : 'Clean playback speed selector (1.0x, 0.8x, 0.6x) for clear phonetic articulation, plus optional auto-pronounce on advancing to the next card.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">✍️</span> <span>${isAr ? '3. نمط اختبار الإملاء والكتابة التفاعلي' : '3. Interactive Spelling & Writing Quiz'}</span></div>
          <p>${isAr ? 'نمط اختبار رابع يركز على الاسترجاع النشط: استمع للنطق الصوتي واكتب الكلمة الإنجليزية مع فحص فوري، وتلميحات IPA، وكشف الأحرف.' : 'A dedicated active recall writing mode: listen to native audio, view definition and cloze context, then type the word with instant feedback and IPA hints.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🧩</span> <span>${isAr ? '4. تحدي مطابقة الكلمات السريع (لعبة الأزواج)' : '4. Fast-Paced Word Match Challenge'}</span></div>
          <p>${isAr ? 'لعبة تفاعلية ممتعة: طابق بين الكلمات الإنجليزية ومعانيها عبر لمس البطاقات لتفريغ اللوحة ضد العداد الزمني مع مؤثرات صوتية وبصرية متناسقة.' : 'An engaging rapid-fire mini-game: tap matching English words and translations to clear the board against a timer with combo multiplier streaks.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">📊</span> <span>${isAr ? '5. إحصائيات التعلم ورادار مستويات CEFR' : '5. Visual Learning Analytics & CEFR Radar'}</span></div>
          <p>${isAr ? 'نافذة تحليلات بيانية شاملة تتضمن مخطط رادار خماسي الأضلاع لمستويات الإطار الأوروبي (A1-C1)، وتوزيع نظام لايتنر للتكرار المتباعد، وأرقامك القياسية.' : 'Visual radar polygon chart tracking mastery across CEFR levels (A1-C1), spaced repetition box distributions, and personal best high scores.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">📥</span> <span>${isAr ? '6. تصدير مباشر بضغطة زر إلى برنامج Anki' : '6. One-Click Export to Anki (TSV)'}</span></div>
          <p>${isAr ? 'تصدير الكلمات غير المعروفة أو المستحقة للمراجعة كحزمة متوافقة 100% مع تطبيق Anki العالمي بترميز UTF-8 وبكافة الحقول التفصيلية.' : 'Export unknown or due words formatted with tabs and UTF-8 BOM for instant, seamless import into Anki decks with full metadata.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">📱</span> <span>${isAr ? '7. دعم التثبيت الكامل كتطبيق PWA دون إنترنت' : '7. PWA Offline Installation & Service Worker'}</span></div>
          <p>${isAr ? 'إمكانية تثبيت التطبيق على سطح المكتب أو الشاشة الرئيسية للهاتف عبر ملف Manifest وService Worker ليعمل بسرعة فائقة وبدون أي اتصال بالإنترنت.' : 'Install Oxford 5000 on desktop or mobile home screens as a standalone Progressive Web App with offline service worker caching.'}</p>
        </div>
      </div>
    `;
  } else if(currentWhatsNewTab === 'tab-guide'){
    contentEl.innerHTML = `
      <div class="wn-section">
        <div class="wn-release-title">
          <span>📖 ${isAr ? 'دليل الموقع الشامل لكافة المزايا' : 'Complete Site Guide & Features'}</span>
        </div>
        <p class="wn-release-meta">${isAr ? 'دليل كتابي كامل يشرح كل ركن وزر وخاصية في الموقع خطوة بخطوة.' : 'Everything you need to master English vocabulary efficiently with Oxford 5000.'}</p>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🃏</span> <span>${isAr ? '1. بطاقات المفردات (Flashcards)' : '1. Flashcards & Word Details'}</span></div>
          <p>${isAr ? 'كل بطاقة تعرض: الكلمة الإنجليزية، مستواها الأوروبي (A1 إلى C1)، نوعها (فعل، اسم، صفة)، الرمز الصوتي IPA، زري نطق بصوت حقيقي أصلي (UK و US)، جملة سياقية معتمدة، وتصريفات وصيغ الكلمة. انقر على أيقونة القلم ✏️ لتخصيص الترجمة أو المثال.' : 'Each card shows the word, CEFR level (A1-C1), part of speech, IPA pronunciation, native UK/US audio buttons, and verified examples. Click ✏️ to customize.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🧠</span> <span>${isAr ? '2. نظام التكرار المتباعد (SRS)' : '2. Spaced Repetition (SRS)'}</span></div>
          <p>${isAr ? 'نظام ذكي يجدول مراجعة الكلمات وفق فترات تصاعدية علمية (المرحلة 1: بعد يوم، المرحلة 2: بعد 3 أيام، المرحلة 3: بعد أسبوع، المرحلة 4: بعد أسبوعين، المرحلة 5: بعد شهر). الإجابة الصحيحة ترفع الكلمة لمرحلة أعلى لتثبيتها في الذاكرة طويلة المدى، بينما الخطأ يعيدها للمراجعة اليومية.' : 'Spaced repetition schedules words in progressive intervals (1d, 3d, 7d, 14d, 30d). Correct answers promote words to higher stages.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🎯</span> <span>${isAr ? '3. أنماط الاختبار الثلاثة (Quiz Modes)' : '3. Quiz Modes'}</span></div>
          <p>${isAr ? '• <b>الاختبار القياسي:</b> اختيار من متعدد من 4 خيارات للكلمات غير المعروفة أو المستحقة للمراجعة.<br>• <b>سباق الوقت:</b> اختبار سريع مع عداد زمني يبدأ بـ 30 ثانية ويكافئك بـ +2 ثانية لكل إجابة صحيحة.<br>• <b>اختبار الاستماع فقط:</b> الاستماع لنطق الكلمة واختيار المعنى الصحيح دون رؤية النص الإنجليزي.' : '• Standard Multiple Choice<br>• Time Attack Speed Race (+2s per correct)<br>• Audio Listening Mode (guess by ear)'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">📐</span> <span>${isAr ? '4. صيغ وتصريفات الكلمات (Word Forms)' : '4. Word Forms & Grammar Guide'}</span></div>
          <p>${isAr ? 'دليل متكامل لتصريفات الكلمات يوضح أزمنة الأفعال (V1, V2 past, V3 participle, -ing, -s)، جموع الأسماء المفردة وغير المنتظمة، ومقارنات وتفضيل الصفات (Comparative & Superlative) مع أمثلة توضيحية لكل صيغة.' : 'Clear breakdown of verb tenses, irregular plurals, and comparative/superlative adjective forms backed by contextual examples.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">📂</span> <span>${isAr ? '5. القوائم والمراجعة الذكية' : '5. Smart Queues & Word Lists'}</span></div>
          <p>${isAr ? 'يمكنك في أي لحظة تصفح قائمة الكلمات غير المعروفة، الكلمات المتقنة، أو المستحقة اليوم، مع تقسيمها حسب المستويات A1..C1 وبدء اختبار مخصص لأي مجموعة بنقرة واحدة.' : 'Browse unknown words, mastered words, or due words grouped by CEFR difficulty. Start a custom review anytime.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🔄</span> <span>${isAr ? '6. المزامنة الفورية والخصوصية التامة (OX6 Sync)' : '6. Instant Serverless Sync (OX6)'}</span></div>
          <p>${isAr ? 'لا حاجة لإنشاء حساب أو إدخال بيانات شخصية. تقدمك وملاحظاتك وتعديلاتك محفوظة في متصفحك. استخدم زر "مزامنة" لتوليد رابط مشفر ذكي أو كود OX6 لنقل تقدمك فورا بين الحاسوب والهاتف.' : 'Zero account signups required. Your progress is kept securely in your browser. Generate compact OX6 sync links to transfer between devices.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🌐</span> <span>${isAr ? '7. دعم 12 لغة وعمل بدون إنترنت (Offline-First)' : '7. 12 Languages & Offline-First'}</span></div>
          <p>${isAr ? 'التطبيق متاح بـ 12 لغة كاملة (العربية، الإنجليزية، الإسبانية، الفرنسية، الألمانية، البرتغالية، الروسية، التركية، الأردية، الهندية، الإندونيسية، الصينية) ويعمل كملف HTML مستقل حتى عند انقطاع الإنترنت.' : 'Available in 12 languages and runs 100% offline from a single standalone file.'}</p>
        </div>
      </div>
    `;
  } else if(currentWhatsNewTab === 'tab-archive'){
    contentEl.innerHTML = `
      <div class="wn-section">
        <div class="wn-release-title">
          <span>📜 ${isAr ? 'سجل كافة التحديثات من 1.0 إلى 1.4' : 'Full Changelog Archive (1.0 - 1.4)'}</span>
        </div>
        <p class="wn-release-meta">${isAr ? 'سجل تاريخي يوثق تطور تطبيق Oxford 5000 منذ إطلاقه الأول وحتى أحدث إصدار.' : 'Historical log of Oxford 5000 releases from inception to the latest version.'}</p>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🚀</span> <span>Update 1.3 - ${isAr ? 'قفزة التفاعل والسرعة والاستكشاف' : 'Interactivity, Speed & Listening'}</span> <span class="wn-tag">v1.3.0</span></div>
          <p>${isAr ? 'إضافة مود سباق الوقت مع مواء القطة، اختبار الاستماع الصوتي فقط، مستكشف الكلمات المتقدم بـ 8 طرق فرز وفلاتر الأقسام، محرر الكلمات والترجمة والمثال مع دعم المزامنة، شارة النجمة العائمة ودليل الموقع الشامل، تظليل النصوص الذهبي، وتحسين محاذاة الأيقونات.' : 'Time Attack mode with cat meow sound, Audio Listening quiz, Smart Word Explorer with 8 sorts, Custom Word & Sentence Editor with sync, Floating Star badge & complete site guide, stylish text selection, and centered footer icons.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🎙️</span> <span>Update 1.2 - ${isAr ? 'ترقية قاعدة البيانات والنطق الصوتي المزدوج' : 'Oxford 5000 Full & Dual Audio'}</span> <span class="wn-tag">v1.2.0</span></div>
          <p>${isAr ? 'اعتماد قاعدة بيانات Oxford 5000 Full بـ 5,325 كلمة كاملة، ربط 5,230 كلمة بملفي نطق أصلي (بريطاني UK وأمريكي US)، تغطية 100% للأمثلة السياقية، إضافة اللغة الهولندية، وزر دعم المشروع الصغير.' : 'Expanded dataset to 5,325 words, native British UK and American US pronunciation for 5,230 words, 100% example coverage, and Dutch language support.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🧭</span> <span>Update 1.1 - ${isAr ? 'الجولة التعليمية وتصنيف الصيغ' : 'Guided Tour & Word Forms'}</span> <span class="wn-tag">v1.1.0</span></div>
          <p>${isAr ? 'إضافة الجولة التعليمية المقسمة بخطوات واضحة، دليل استخدام صيغ الكلمات والفروق بينها، حجب الصيغ غير الموثقة، تحسين طبقات النوافذ وسلاسة اللمس على الجوال.' : 'Structured tutorial tour, dedicated word forms explanation panel, filtered unverified forms, improved modal layering and mobile touch control.'}</p>
        </div>

        <div class="wn-card">
          <div class="wn-card-head"><span class="wn-card-icon">🌱</span> <span>Update 1.0 - ${isAr ? 'الإطلاق الأولي لنظام المفردات الذكي' : 'Initial Release'}</span> <span class="wn-tag">v1.0.0</span></div>
          <p>${isAr ? 'إطلاق تطبيق البطاقات التعليمية المستقل مع 4,954 كلمة، خوارزمية التكرار المتباعد SRS، اختبار الاختيار من متعدد، المزامنة السريعة عبر روابط OX6، حفظ البيانات محلياً، والعمل الكامل بدون إنترنت.' : 'Initial release with 4,954 Oxford words, SRS spaced repetition, multiple choice quizzes, serverless OX6 sync links, and offline-first single HTML build.'}</p>
        </div>
      </div>
    `;
  }
}

function openFeedback(){
  const overlay = document.getElementById('feedbackOverlay');
  if(overlay) overlay.classList.add('show');
}

function closeFeedback(){
  const overlay = document.getElementById('feedbackOverlay');
  if(overlay) overlay.classList.remove('show');
}

function applyPreferences(){
  const p = state.ui.preferences || defaultUi().preferences;
  document.documentElement.style.setProperty('--font-scale', String((p.fontScale || 100) / 100));
  document.documentElement.classList.toggle('compact-cards', p.compactCards === true);
  document.documentElement.classList.toggle('large-controls', p.largeControls === true);
  document.documentElement.classList.toggle('reduce-motion', p.reducedMotion === true);
  const progress = document.querySelector('.progress-track');
  if(progress) progress.hidden = p.showProgress === false;
}

function openSettings(){
  const overlay = document.getElementById('settingsOverlay');
  if(!overlay) return;
  const p = state.ui.preferences;
  const scale = document.getElementById('settingsFontScale');
  const scaleValue = document.getElementById('settingsFontScaleValue');
  const compact = document.getElementById('settingsCompact');
  const ipa = document.getElementById('settingsIpa');
  const forms = document.getElementById('settingsForms');
  const example = document.getElementById('settingsExample');
  const translations = document.getElementById('settingsTranslations');
  const progress = document.getElementById('settingsProgress');
  const largeControls = document.getElementById('settingsLargeControls');
  const motion = document.getElementById('settingsMotion');
  const autoPronounce = document.getElementById('settingsAutoPronounce');
  if(scale) scale.value = String(p.fontScale);
  if(scaleValue) scaleValue.textContent = p.fontScale + '%';
  if(compact) compact.checked = p.compactCards;
  if(ipa) ipa.checked = p.showIpa;
  if(forms) forms.checked = p.showForms;
  if(example) example.checked = p.showExample;
  if(translations) translations.checked = p.showTranslations;
  if(progress) progress.checked = p.showProgress;
  if(largeControls) largeControls.checked = p.largeControls;
  if(motion) motion.checked = p.reducedMotion;
  if(autoPronounce) autoPronounce.checked = p.autoPronounce === true;
  overlay.classList.add('show');
}

function closeSettings(){
  const overlay = document.getElementById('settingsOverlay');
  if(overlay) overlay.classList.remove('show');
}

function savePreferences(){
  state.ui.preferences = state.ui.preferences || defaultUi().preferences;
  scheduleSave();
  applyPreferences();
  render();
}

function resetPreferences(){
  state.ui.preferences = defaultUi().preferences;
  openSettings();
  savePreferences();
}

function wireSettings(){
  const scale = document.getElementById('settingsFontScale');
  const compact = document.getElementById('settingsCompact');
  const ipa = document.getElementById('settingsIpa');
  const forms = document.getElementById('settingsForms');
  const example = document.getElementById('settingsExample');
  const translations = document.getElementById('settingsTranslations');
  const progress = document.getElementById('settingsProgress');
  const largeControls = document.getElementById('settingsLargeControls');
  const motion = document.getElementById('settingsMotion');
  const autoPronounce = document.getElementById('settingsAutoPronounce');
  if(scale) scale.addEventListener('input', () => {
    state.ui.preferences.fontScale = Math.max(90, Math.min(120, Number(scale.value) || 100));
    const value = document.getElementById('settingsFontScaleValue');
    if(value) value.textContent = state.ui.preferences.fontScale + '%';
    savePreferences();
  });
  if(compact) compact.addEventListener('change', () => { state.ui.preferences.compactCards = compact.checked; savePreferences(); });
  if(ipa) ipa.addEventListener('change', () => { state.ui.preferences.showIpa = ipa.checked; savePreferences(); });
  if(forms) forms.addEventListener('change', () => { state.ui.preferences.showForms = forms.checked; savePreferences(); });
  if(example) example.addEventListener('change', () => { state.ui.preferences.showExample = example.checked; savePreferences(); });
  if(translations) translations.addEventListener('change', () => { state.ui.preferences.showTranslations = translations.checked; savePreferences(); });
  if(progress) progress.addEventListener('change', () => { state.ui.preferences.showProgress = progress.checked; savePreferences(); });
  if(largeControls) largeControls.addEventListener('change', () => { state.ui.preferences.largeControls = largeControls.checked; savePreferences(); });
  if(motion) motion.addEventListener('change', () => { state.ui.preferences.reducedMotion = motion.checked; savePreferences(); });
  if(autoPronounce) autoPronounce.addEventListener('change', () => { state.ui.preferences.autoPronounce = autoPronounce.checked; savePreferences(); });
}

function submitFeedback(){
  const input = document.getElementById('feedbackInput');
  const body = input ? input.value.trim() : '';
  if(!body){
    if(input) input.focus();
    return;
  }
  if(!TALLY_FORM_URL){
    const status = document.getElementById('feedbackStatus');
    if(status) status.textContent = t('feedback.setup');
    return;
  }
  const url = TALLY_FORM_URL + (TALLY_FORM_URL.indexOf('?') >= 0 ? '&' : '?') + 'feedback=' + encodeURIComponent(body);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function loadVisitorCount(){
  const output = document.getElementById('visitorCount');
  if(!output) return;
  fetch('https://abacus.jasoncameron.dev/hit/oxford5000/visits', { method: 'GET', cache: 'no-store' })
    .then(response => {
      if(!response.ok) throw new Error('visitor counter request failed');
      return response.json();
    })
    .then(data => {
      const count = data && data.value;
      if(!Number.isFinite(Number(count))) throw new Error('visitor counter returned invalid data');
      output.textContent = Number(count).toLocaleString();
    })
    .catch(() => {
      output.textContent = t('visitor.unavailable');
    });
}

function wireEvents(){
  const btnKnow = document.getElementById('btnKnow');
  if(btnKnow) btnKnow.addEventListener('click', () => markWord(true));

  const btnUnknow = document.getElementById('btnUnknow');
  if(btnUnknow) btnUnknow.addEventListener('click', () => markWord(false));

  const btnUndo = document.getElementById('btnUndo');
  if(btnUndo) btnUndo.addEventListener('click', undo);

  const btnSync = document.getElementById('btnSync');
  if(btnSync) btnSync.addEventListener('click', openSyncModal);

  const btnShuffle = document.getElementById('btnShuffle');
  if(btnShuffle) btnShuffle.addEventListener('click', toggleShuffle);

  const btnReset = document.getElementById('btnReset');
  if(btnReset) btnReset.addEventListener('click', resetAll);

  const btnDownload = document.getElementById('btnDownload');
  if(btnDownload) btnDownload.addEventListener('click', downloadUnknown);

  const btnQuiz = document.getElementById('btnQuiz');
  if(btnQuiz) btnQuiz.addEventListener('click', openQuizModal);
  const closeOnboardingBtn = document.getElementById('closeOnboarding');
  if(closeOnboardingBtn) closeOnboardingBtn.addEventListener('click', closeOnboarding);
  const startOnboarding = document.getElementById('startOnboarding');
  if(startOnboarding) startOnboarding.addEventListener('click', closeOnboarding);
  const whatsNewBadge = document.getElementById('whatsNewBadge');
  if(whatsNewBadge) whatsNewBadge.addEventListener('click', () => openWhatsNew('tab-update14'));
  const closeWhatsNewBtn = document.getElementById('closeWhatsNew');
  if(closeWhatsNewBtn) closeWhatsNewBtn.addEventListener('click', closeWhatsNew);
  const whatsNewOverlayEl = document.getElementById('whatsNewOverlay');
  if(whatsNewOverlayEl){
    whatsNewOverlayEl.addEventListener('click', (e) => {
      if(e.target === whatsNewOverlayEl) closeWhatsNew();
    });
  }
  document.querySelectorAll('.whats-new-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      renderWhatsNewContent(btn.getAttribute('data-tab'));
    });
  });

  const tutorialButton = document.getElementById('openTutorial');
  if(tutorialButton) tutorialButton.addEventListener('click', () => openWhatsNew('tab-guide'));
  const closeTutorialButton = document.getElementById('closeTutorial');
  if(closeTutorialButton) closeTutorialButton.addEventListener('click', closeTutorial);
  const tutorialPrevious = document.getElementById('tutorialPrevious');
  if(tutorialPrevious) tutorialPrevious.addEventListener('click', () => moveTutorial(-1));
  const tutorialNext = document.getElementById('tutorialNext');
  if(tutorialNext) tutorialNext.addEventListener('click', () => moveTutorial(1));
  const feedbackButton = document.getElementById('openFeedback');
  if(feedbackButton) feedbackButton.addEventListener('click', openFeedback);
  const closeFormsGuideButton = document.getElementById('closeFormsGuide');
  if(closeFormsGuideButton) closeFormsGuideButton.addEventListener('click', closeFormsGuide);
  const closeFeedbackButton = document.getElementById('closeFeedback');
  if(closeFeedbackButton) closeFeedbackButton.addEventListener('click', closeFeedback);
  const submitFeedbackButton = document.getElementById('submitFeedback');
  if(submitFeedbackButton) submitFeedbackButton.addEventListener('click', submitFeedback);
  const wordEl = document.getElementById('theWord');
  if(wordEl){
    wordEl.addEventListener('click', () => {
      if(displayedWord) copyText(displayedWord, document.getElementById('copyToast'));
    });
  }
  const speakMain = document.getElementById('speakMain');
  if(speakMain) speakMain.addEventListener('click', () => speakWord(displayedWord));
  // Example pronunciation removed per user request

  const ta = document.getElementById('translationInput');
  if(ta){
    ta.addEventListener('input', (e) => {
      if(!displayedWord) return;
      state.notes[displayedWord] = { v: e.target.value, t: Date.now() };
      bumpChanges();
      scheduleSave();
    });
  }

  const card = document.getElementById('card');
  if(card){
    card.addEventListener('mousedown', (e) => {
      if(e.target.closest('.translation-input') || e.target.closest('.the-word') || e.target.closest('.example-card') || e.target.closest('.forms-bar') || e.target.closest('.legend') || e.target.closest('.card-edit-btn') || e.target.closest('.sent-edit-btn')) return;
      onDragStart(e.clientX);
    });
    card.addEventListener('touchstart', (e) => {
      if(e.target.closest('.translation-input') || e.target.closest('.the-word') || e.target.closest('.example-card') || e.target.closest('.forms-bar') || e.target.closest('.legend') || e.target.closest('.card-edit-btn') || e.target.closest('.sent-edit-btn')) return;
      onDragStart(e.touches[0].clientX);
    }, { passive: true });
    card.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX), { passive: true });
    card.addEventListener('touchend', onDragEnd);
  }

  const btnEditCard = document.getElementById('btnEditCard');
  if(btnEditCard) btnEditCard.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditWordModal('editWordTr');
  });

  const btnEditExample = document.getElementById('btnEditExample');
  if(btnEditExample) btnEditExample.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditWordModal('editWordEx');
  });

  const closeEditWordBtn = document.getElementById('closeEditWord');
  if(closeEditWordBtn) closeEditWordBtn.addEventListener('click', closeEditWordModal);

  const btnSaveEditWord = document.getElementById('btnSaveEditWord');
  if(btnSaveEditWord) btnSaveEditWord.addEventListener('click', saveCustomEdit);

  const btnResetEditWord = document.getElementById('btnResetEditWord');
  if(btnResetEditWord) btnResetEditWord.addEventListener('click', resetCustomEdit);

  const editWordOverlayEl = document.getElementById('editWordOverlay');
  if(editWordOverlayEl){
    editWordOverlayEl.addEventListener('click', (e) => {
      if(e.target.id === 'editWordOverlay') closeEditWordModal();
    });
  }

  // Audio speed button
  const btnSpeed = document.getElementById('btnAudioSpeed');
  if(btnSpeed) btnSpeed.addEventListener('click', cycleAudioSpeed);

  // Habit modal
  const openHabitBtn = document.getElementById('openHabit');
  if(openHabitBtn) openHabitBtn.addEventListener('click', openHabitModal);
  const closeHabitBtn = document.getElementById('closeHabit');
  if(closeHabitBtn) closeHabitBtn.addEventListener('click', closeHabitModal);
  const habitOverlayEl = document.getElementById('habitOverlay');
  if(habitOverlayEl){
    habitOverlayEl.addEventListener('click', (e) => {
      if(e.target === habitOverlayEl) closeHabitModal();
    });
  }
  document.querySelectorAll('.habit-target-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = Number(btn.getAttribute('data-goal'));
      if(g && state.ui && state.ui.habit){
        state.ui.habit.goal = g;
        scheduleSave();
        renderHabitDisplay();
      }
    });
  });

  // Word match challenge
  const btnMatch = document.getElementById('btnMatch');
  if(btnMatch) btnMatch.addEventListener('click', () => openWordMatch());
  const closeMatchBtn = document.getElementById('closeMatch');
  if(closeMatchBtn) closeMatchBtn.addEventListener('click', closeWordMatch);
  const matchOverlayEl = document.getElementById('matchOverlay');
  if(matchOverlayEl){
    matchOverlayEl.addEventListener('click', (e) => {
      if(e.target === matchOverlayEl) closeWordMatch();
    });
  }

  // Visual learning analytics
  const btnAnalytics = document.getElementById('btnAnalytics');
  if(btnAnalytics) btnAnalytics.addEventListener('click', openAnalyticsModal);
  const closeAnalyticsBtn = document.getElementById('closeAnalytics');
  if(closeAnalyticsBtn) closeAnalyticsBtn.addEventListener('click', closeAnalyticsModal);
  const analyticsOverlayEl = document.getElementById('analyticsOverlay');
  if(analyticsOverlayEl){
    analyticsOverlayEl.addEventListener('click', (e) => {
      if(e.target === analyticsOverlayEl) closeAnalyticsModal();
    });
  }

  // Anki Export
  const btnExportAnki = document.getElementById('btnExportAnki');
  if(btnExportAnki) btnExportAnki.addEventListener('click', () => exportToAnki('unknown'));

  // Settings
  const openSettingsBtn = document.getElementById('openSettings');
  if(openSettingsBtn) openSettingsBtn.addEventListener('click', openSettings);
  const closeSettingsBtn = document.getElementById('closeSettings');
  if(closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
  const btnResetSettings = document.getElementById('btnResetSettings');
  if(btnResetSettings) btnResetSettings.addEventListener('click', resetPreferences);
  const settingsOverlayEl = document.getElementById('settingsOverlay');
  if(settingsOverlayEl){
    settingsOverlayEl.addEventListener('click', (e) => {
      if(e.target === settingsOverlayEl) closeSettings();
    });
  }
  wireSettings();
}

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && isWhatsNewOpen()){
    e.preventDefault();
    closeWhatsNew();
    return;
  }
  if(e.key === 'Escape' && isEditWordOpen()){
    e.preventDefault();
    closeEditWordModal();
    return;
  }
  const habitModal = document.getElementById('habitOverlay');
  if(e.key === 'Escape' && habitModal && habitModal.classList.contains('show')){
    e.preventDefault();
    closeHabitModal();
    return;
  }
  const analyticsModal = document.getElementById('analyticsOverlay');
  if(e.key === 'Escape' && analyticsModal && analyticsModal.classList.contains('show')){
    e.preventDefault();
    closeAnalyticsModal();
    return;
  }
  const matchModal = document.getElementById('matchOverlay');
  if(e.key === 'Escape' && matchModal && matchModal.classList.contains('show')){
    e.preventDefault();
    closeWordMatch();
    return;
  }
  const settingsModal = document.getElementById('settingsOverlay');
  if(e.key === 'Escape' && settingsModal && settingsModal.classList.contains('show')){
    e.preventDefault();
    closeSettings();
    return;
  }
  const tutorial = document.getElementById('tutorialOverlay');
  const feedback = document.getElementById('feedbackOverlay');
  if(e.key === 'Escape' && tutorial && tutorial.classList.contains('show')){
    e.preventDefault();
    closeTutorial();
    return;
  }
  if(e.key === 'Escape' && feedback && feedback.classList.contains('show')){
    e.preventDefault();
    closeFeedback();
    return;
  }
  const onboarding = document.getElementById('onboardingOverlay');
  if(onboarding && onboarding.classList.contains('show') && e.key === 'Escape'){
    e.preventDefault();
    closeOnboarding();
    return;
  }
  if(isQuizOpen()){
    if(e.key === 'Escape'){
      e.preventDefault();
      closeQuiz(false);
      return;
    }

    const quizPanel = document.querySelector('#quizOverlay .quiz-panel');

    if(e.key === 'Tab'){
      trapFocusIn(quizPanel, e);
      return;
    }

    if(!quizSession || quizSession.ended) return;

    const item = currentQuizItem();
    if(!item) return;

    const active = document.activeElement;
    const inField = !!(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT'));
    const onButton = !!(active && active.tagName === 'BUTTON');

    if(e.key === 'Enter'){
      if(inField || onButton) return;
      if(document.getElementById('quizNext')){
        e.preventDefault();
        nextQuizQuestion();
      }
      return;
    }

    if(/^[1-4]$/.test(e.key) && !inField && !onButton && item.type === 'mc' && !item.answered){
      e.preventDefault();
      selectMcOption(Number(e.key) - 1);
      return;
    }

    return;
  }

  if(isSyncOpen()){
    if(e.key === 'Escape'){
      e.preventDefault();
      closeSync();
      return;
    }
    if(e.key === 'Tab'){
      trapFocusIn(document.querySelector('#syncOverlay .sync-panel'), e);
      return;
    }
    return;
  }

  if(isSearchOpen()){
    if(e.key === 'Escape'){
      e.preventDefault();
      closeSearch();
      return;
    }
    if(e.key === 'Tab'){
      trapFocusIn(document.querySelector('#searchOverlay .search-panel'), e);
      return;
    }
    return;
  }

  if(isReviewOpen()){
    if(e.key === 'Escape'){
      e.preventDefault();
      closeReview();
      return;
    }
    if(e.key === 'Tab'){
      trapFocus(e);
      return;
    }
    return;
  }

  const active = document.activeElement;
  if(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;

  if(e.key === 'ArrowLeft'){
    e.preventDefault();
    markWord(true);
  } else if(e.key === 'ArrowRight'){
    e.preventDefault();
    markWord(false);
  } else if(e.key === 'Backspace'){
    e.preventDefault();
    undo();
  } else if(e.key === '/'){
    e.preventDefault();
    openSearchModal();
  }
});

window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
window.addEventListener('mouseup', onDragEnd);

window.addEventListener('storage', (e) => {
  if(e.key !== STORAGE_KEY || !e.newValue) return;
  let parsed;
  try{
    parsed = JSON.parse(e.newValue);
  }catch(err){
    return;
  }
  if(!parsed || parsed.v !== 3) return;

  state = mergeStates(state, normalizeState(parsed));

  buildLevelBar();
  render();
  if(isReviewOpen()) renderReviewList(currentSearch());
  if(isSyncOpen()) renderSyncStatus();
});

document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'hidden'){
    flushSave();
    return;
  }
  maybeAutoSync();
});
window.addEventListener('pagehide', flushSave);

document.getElementById('openUnknown').addEventListener('click', () => openListModal('unknown'));
document.getElementById('openKnown').addEventListener('click', () => openListModal('known'));
document.getElementById('openLeft').addEventListener('click', () => openListModal('left'));
document.getElementById('closeReview').addEventListener('click', closeReview);

const btnSearch = document.getElementById('btnSearch');
if(btnSearch) btnSearch.addEventListener('click', openSearchModal);

const closeSearchBtn = document.getElementById('closeSearch');
if(closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

const searchInputEl = document.getElementById('searchInput');
if(searchInputEl) searchInputEl.addEventListener('input', () => {
  explorerState.query = searchInputEl.value;
  renderExplorer();
});

const searchClearBtn = document.getElementById('searchClearBtn');
if(searchClearBtn) searchClearBtn.addEventListener('click', () => {
  if(searchInputEl) searchInputEl.value = '';
  explorerState.query = '';
  renderExplorer();
  if(searchInputEl) searchInputEl.focus();
});

const searchSortSelect = document.getElementById('searchSortSelect');
if(searchSortSelect) searchSortSelect.addEventListener('change', () => {
  explorerState.sort = searchSortSelect.value;
  renderExplorer();
});

// Explorer filter pills
document.querySelectorAll('#searchLevelFilters [data-filter-level]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#searchLevelFilters [data-filter-level]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    explorerState.level = btn.getAttribute('data-filter-level') || 'all';
    renderExplorer();
  });
});

document.querySelectorAll('#searchStatusFilters [data-filter-status]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#searchStatusFilters [data-filter-status]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    explorerState.status = btn.getAttribute('data-filter-status') || 'all';
    renderExplorer();
  });
});

document.querySelectorAll('#searchPosFilters [data-filter-pos]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#searchPosFilters [data-filter-pos]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    explorerState.pos = btn.getAttribute('data-filter-pos') || 'all';
    renderExplorer();
  });
});

const searchOverlayEl = document.getElementById('searchOverlay');
if(searchOverlayEl){
  searchOverlayEl.addEventListener('click', (e) => {
    if(e.target.id === 'searchOverlay') closeSearch();
  });
}

document.getElementById('reviewOverlay').addEventListener('click', (e) => {
  if(e.target.id === 'reviewOverlay') closeReview();
});

document.getElementById('btnDownloadFromReview').addEventListener('click', downloadCurrentList);

const btnQuizFromList = document.getElementById('btnQuizFromList');
if(btnQuizFromList){
  btnQuizFromList.addEventListener('click', () => {
    state.ui.quizSettings.source = 'all';
    saveQuizSettings();
    closeReview();
    openQuizModal();
  });
}

const closeQuizBtn = document.getElementById('closeQuiz');
if(closeQuizBtn) closeQuizBtn.addEventListener('click', () => closeQuiz(false));

const quizOverlayEl = document.getElementById('quizOverlay');
if(quizOverlayEl){
  quizOverlayEl.addEventListener('click', (e) => {
    if(e.target.id === 'quizOverlay') closeQuiz(false);
  });
}

document.getElementById('warnDownload').addEventListener('click', downloadUnknown);

const openSyncBtn = document.getElementById('openSync');
if(openSyncBtn) openSyncBtn.addEventListener('click', openSyncModal);

const closeSyncBtn = document.getElementById('closeSync');
if(closeSyncBtn) closeSyncBtn.addEventListener('click', closeSync);

const syncOverlayEl = document.getElementById('syncOverlay');
if(syncOverlayEl){
  syncOverlayEl.addEventListener('click', (e) => {
    if(e.target.id === 'syncOverlay') closeSync();
  });
}

const btnExportProgress = document.getElementById('btnExportProgress');
if(btnExportProgress) btnExportProgress.addEventListener('click', downloadProgressFile);

const btnImportProgress = document.getElementById('btnImportProgress');
const importFileEl = document.getElementById('importFile');
if(btnImportProgress && importFileEl){
  btnImportProgress.addEventListener('click', () => { importFileEl.click(); });
  importFileEl.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if(!file) return;
    await importProgressFile(file);
  });
}

const btnUndoMerge = document.getElementById('btnUndoMerge');
if(btnUndoMerge) btnUndoMerge.addEventListener('click', undoSyncMerge);

const btnSendTelegram = document.getElementById('btnSendTelegram');
if(btnSendTelegram) btnSendTelegram.addEventListener('click', sendProgressToTelegram);

const btnCopyCode = document.getElementById('btnCopyCode');
if(btnCopyCode) btnCopyCode.addEventListener('click', copySyncCode);

const btnSendCode = document.getElementById('btnSendCode');
if(btnSendCode) btnSendCode.addEventListener('click', sendSyncCode);

const btnMergeCode = document.getElementById('btnMergeCode');
if(btnMergeCode) btnMergeCode.addEventListener('click', mergeSyncCode);

const btnMakeLink = document.getElementById('btnMakeLink');
if(btnMakeLink) btnMakeLink.addEventListener('click', () => { makeSyncLink('full').catch(() => showLinkMsg(t('sync.code.invalid'), 'error')); });

const btnUpdateLink = document.getElementById('btnUpdateLink');
if(btnUpdateLink) btnUpdateLink.addEventListener('click', () => { makeSyncLink('delta').catch(() => showLinkMsg(t('sync.code.invalid'), 'error')); });

const btnShareLink = document.getElementById('btnShareLink');
if(btnShareLink) btnShareLink.addEventListener('click', shareSyncLink);

const btnPasteMerge = document.getElementById('btnPasteMerge');
if(btnPasteMerge) btnPasteMerge.addEventListener('click', pasteAndMerge);

const btnDetectChat = document.getElementById('btnDetectChat');
if(btnDetectChat) btnDetectChat.addEventListener('click', detectChatId);

const btnSaveBot = document.getElementById('btnSaveBot');
if(btnSaveBot) btnSaveBot.addEventListener('click', saveBotSettings);

const btnUnlinkBot = document.getElementById('btnUnlinkBot');
if(btnUnlinkBot) btnUnlinkBot.addEventListener('click', unlinkBot);

const btnSyncNow = document.getElementById('btnSyncNow');
if(btnSyncNow) btnSyncNow.addEventListener('click', () => { syncNow(false); });

const backupNowBtn = document.getElementById('backupNow');
if(backupNowBtn) backupNowBtn.addEventListener('click', sendProgressToTelegram);

const backupLaterBtn = document.getElementById('backupLater');
if(backupLaterBtn){
  backupLaterBtn.addEventListener('click', () => {
    state.ui.snoozeUntil = Date.now() + 3 * 86400000;
    scheduleSave();
    updateBackupBanner();
  });
}

document.getElementById('reviewList').addEventListener('click', (e) => {
  const speak = e.target.closest('[data-speak-word]');
  if(speak){
    speakWord(speak.getAttribute('data-speak-word'));
    return;
  }
  const moreBtn = e.target.closest('[data-more]');
  if(moreBtn){
    listLimit += 100;
    renderReviewList(currentSearch());
    return;
  }

  const delBtn = e.target.closest('[data-del]');
  if(delBtn){
    const word = delBtn.getAttribute('data-del');
    if(word){
      state.marks = applyMark(state.marks, word, 'r', Date.now());
      bumpChanges();
      scheduleSave();
      renderReviewList(currentSearch());
      render();
    }
    return;
  }

  const markBtn = e.target.closest('[data-mark]');
  if(markBtn){
    const word = markBtn.getAttribute('data-word');
    if(word){
      const prev = state.marks[word];
      state.history = pushHistoryEntry(state.history, {
        word: word,
        prev: prev ? { s: prev.s, t: prev.t } : null
      });
      const s = (markBtn.getAttribute('data-mark') === 'know') ? 'k' : 'u';
      state.marks = applyMark(state.marks, word, s, Date.now());
      state.srs = applySrsOnMark(state.srs, word, prev, s, Date.now());
      bumpChanges();
      scheduleSave();
      requestPersistOnce();
      renderReviewList(currentSearch());
      render();
    }
    return;
  }

  const copyEl = e.target.closest('[data-copy]');
  if(copyEl){
    const word = copyEl.getAttribute('data-copy');
    if(word) copyText(word);
  }
});

document.getElementById('reviewList').addEventListener('input', (e) => {
  const word = e.target.getAttribute('data-tr');
  if(word === null) return;
  state.notes[word] = { v: e.target.value, t: Date.now() };
  bumpChanges();
  scheduleSave();
});

const reviewSearchEl = document.getElementById('reviewSearch');
reviewSearchEl.addEventListener('input', () => {
  listLimit = 100;
  if(searchTimer !== null) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchTimer = null;
    renderReviewList(reviewSearchEl.value);
  }, 150);
});

document.getElementById('reviewSort').addEventListener('change', (e) => {
  state.ui.sort = e.target.value;
  listLimit = 100;
  scheduleSave();
  renderReviewList(reviewSearchEl.value);
});

document.getElementById('btnClearAll').addEventListener('click', () => {
  const cfg = MODE_CONFIG[currentMode];
  if(cfg.rowType === 'quickmark') return;

  const words = cfg.getWords();
  if(words.length === 0) return;
  if(!confirm(t('confirm.clear'))) return;

  const now = Date.now();
  words.forEach(w => {
    state.marks = applyMark(state.marks, w, 'r', now);
  });
  bumpChanges();

  scheduleSave();
  listLimit = 100;
  renderReviewList('');
  render();
});

function sameMarkMap(a, b){
  const ak = Object.keys(a || {}).sort();
  const bk = Object.keys(b || {}).sort();
  if(ak.length !== bk.length) return false;
  for(let i = 0; i < ak.length; i++){
    if(ak[i] !== bk[i]) return false;
    const x = a[ak[i]];
    const y = b[bk[i]];
    if(!x || !y || x.s !== y.s || x.t !== y.t) return false;
  }
  return true;
}

function sameNoteMap(a, b){
  const ak = Object.keys(a || {}).sort();
  const bk = Object.keys(b || {}).sort();
  if(ak.length !== bk.length) return false;
  for(let i = 0; i < ak.length; i++){
    if(ak[i] !== bk[i]) return false;
    const x = a[ak[i]];
    const y = b[bk[i]];
    if(!x || !y || x.v !== y.v || x.t !== y.t) return false;
  }
  return true;
}

async function selfTest(){
  // 1. Migration converts indexes to words and keeps translations.
  const sample = ['alpha', 'beta', 'gamma', 'delta'];
  const oldV2 = {
    known: { 0: true, 2: true },
    unknown: { 1: true },
    translations: { 1: 'beta-note', 3: 'delta-note' },
    currentLevel: 'b1'
  };
  const mig = migrateV2(oldV2, sample, 1700000000000);
  console.assert(mig.v === 3, 'migrate: v3');
  console.assert(mig.marks.alpha && mig.marks.alpha.s === 'k', 'migrate: known index -> word');
  console.assert(mig.marks.gamma && mig.marks.gamma.s === 'k', 'migrate: second known index -> word');
  console.assert(mig.marks.beta && mig.marks.beta.s === 'u', 'migrate: unknown index -> word');
  console.assert(mig.notes.beta && mig.notes.beta.v === 'beta-note', 'migrate: first translation kept');
  console.assert(mig.notes.delta && mig.notes.delta.v === 'delta-note', 'migrate: second translation kept');
  console.assert(mig.ui.currentLevel === 'b1', 'migrate: current level kept');

  // 2. Merge is commutative, idempotent and lets the larger timestamp win.
  const A = {
    v: 3,
    deviceId: 'dev-a',
    marks: {
      alpha: { s: 'u', t: 5 },
      beta: { s: 'k', t: 9 },
      delta: { s: 'u', t: 8 },
      epsilon: { s: 'k', t: 10 }
    },
    notes: {
      alpha: { v: 'note-a', t: 3 },
      beta: { v: 'note-b', t: 1 },
      zeta: { v: 'note-z', t: 6 }
    },
    ui: defaultUi(),
    history: []
  };
  const B = {
    v: 3,
    deviceId: 'dev-b',
    marks: {
      alpha: { s: 'k', t: 5 },
      gamma: { s: 'r', t: 7 },
      delta: { s: 'k', t: 10 },
      epsilon: { s: 'u', t: 12 }
    },
    notes: {
      alpha: { v: 'note-c', t: 2 },
      beta: { v: 'note-d', t: 4 },
      zeta: { v: 'note-s', t: 6 }
    },
    ui: defaultUi(),
    history: []
  };

  const ab = mergeStates(A, B);
  const ba = mergeStates(B, A);
  const aa = mergeStates(A, A);

  console.assert(sameMarkMap(ab.marks, ba.marks), 'merge: marks commutative');
  console.assert(sameNoteMap(ab.notes, ba.notes), 'merge: notes commutative');
  console.assert(sameMarkMap(aa.marks, A.marks), 'merge: marks idempotent');
  console.assert(sameNoteMap(aa.notes, A.notes), 'merge: notes idempotent');
  console.assert(ab.marks.alpha.s === 'k', 'merge: priority k > u on equal timestamp');
  console.assert(ab.marks.delta.s === 'k' && ab.marks.delta.t === 10, 'merge: larger timestamp wins');
  console.assert(ab.marks.epsilon.s === 'u' && ab.marks.epsilon.t === 12, 'merge: newer status beats priority');
  console.assert(ab.notes.beta.v === 'note-d' && ab.notes.beta.t === 4, 'merge: newer note wins');

  // 3. Undo after re-marking restores the earlier status with a new timestamp.
  let marks = { alpha: { s: 'u', t: 1 } };
  const prevAlpha = marks.alpha;
  marks = applyMark(marks, 'alpha', 'k', 2);
  console.assert(marks.alpha.s === 'k', 'undo: re-mark applied');
  marks = applyUndo(marks, { word: 'alpha', prev: prevAlpha }, 3);
  console.assert(marks.alpha.s === 'u' && marks.alpha.t === 3, 'undo: earlier status restored with new t');

  const emptyUndo = applyUndo({}, { word: 'beta', prev: null }, 4);
  console.assert(emptyUndo.beta.s === 'r' && emptyUndo.beta.t === 4, 'undo: unmarked word becomes r');

  // 4. History is capped at 50 entries.
  let hist = [];
  for(let i = 0; i < 60; i++){
    hist = pushHistoryEntry(hist, { word: 'w' + i, prev: null });
  }
  console.assert(hist.length === 50, 'history: length capped at 50');
  console.assert(hist[0].word === 'w10', 'history: oldest entries dropped');

  // 5. deckQueue never contains a marked word.
  const savedState = state;
  const testState = normalizeState(freshState());
  testState.marks[WORDS[0]] = { s: 'k', t: 1 };
  testState.marks[WORDS[1]] = { s: 'u', t: 1 };
  testState.marks[WORDS[2]] = { s: 'r', t: 1 };
  state = testState;

  const queue = deckQueue('all');
  console.assert(queue.indexOf(WORDS[0]) === -1, 'deck: known word excluded');
  console.assert(queue.indexOf(WORDS[1]) === -1, 'deck: unknown word excluded');
  console.assert(queue.indexOf(WORDS[2]) !== -1, 'deck: removed word is back');

  state = savedState;

  // 6. Step 2: validateImport rejects bad input.
  const now = Date.now();
  const goodMark = {};
  goodMark[WORDS[0]] = { s: 'k', t: now };
  const goodNote = {};
  goodNote[WORDS[1]] = { v: 'sample-note', t: now };
  const baseImport = { app: 'oxford5000', v: 3, deviceId: 'dev-test', marks: goodMark, notes: goodNote };
  const cloneBase = () => structuredClone(baseImport);

  console.assert(validateImport(baseImport, WORDS, now).ok, 'import: valid file accepted');

  const badApp = cloneBase();
  badApp.app = 'other';
  console.assert(!validateImport(badApp, WORDS, now).ok, 'import: wrong app rejected');

  const badV = cloneBase();
  badV.v = 2;
  console.assert(!validateImport(badV, WORDS, now).ok, 'import: wrong version rejected');

  const badWord = cloneBase();
  badWord.marks.zzzznotaword = { s: 'k', t: now };
  const vBadWord = validateImport(badWord, WORDS, now);
  console.assert(vBadWord.ok && !vBadWord.clean.marks.zzzznotaword && vBadWord.skipped >= 1, 'import: unknown word dropped');

  const badStatus = cloneBase();
  badStatus.marks[WORDS[0]].s = 'x';
  const vBadStatus = validateImport(badStatus, WORDS, now);
  console.assert(vBadStatus.ok && !vBadStatus.clean.marks[WORDS[0]] && vBadStatus.skipped >= 1, 'import: bad mark status dropped');

  const longNote = cloneBase();
  longNote.notes[WORDS[1]].v = 'a'.repeat(301);
  const vLongNote = validateImport(longNote, WORDS, now);
  console.assert(vLongNote.ok && !vLongNote.clean.notes[WORDS[1]] && vLongNote.skipped >= 1, 'import: long note dropped');

  // 7. Step 2: future timestamps are clamped to now.
  const future = cloneBase();
  future.marks[WORDS[0]].t = now + 10 * 86400000;
  const vFuture = validateImport(future, WORDS, now);
  console.assert(vFuture.ok && vFuture.clean.marks[WORDS[0]].t === now, 'import: future t clamped to now');

  // 8. Step 2: export -> validate -> merge reproduces the same progress.
  const srcState = normalizeState(freshState());
  srcState.marks[WORDS[0]] = { s: 'k', t: 1000 };
  srcState.marks[WORDS[2]] = { s: 'u', t: 2000 };
  srcState.notes[WORDS[1]] = { v: 'saved-note', t: 2000 };
  const exported = buildProgress(srcState);
  const vExported = validateImport(exported, WORDS, now);
  console.assert(vExported.ok, 'progress: exported file validates');

  const emptyState = normalizeState(freshState());
  const mergedProgress = mergeStates(emptyState, vExported.clean);
  console.assert(sameProgress(exported, mergedProgress), 'progress: export+merge reproduces marks and notes');

  const mergedTwice = mergeStates(mergedProgress, vExported.clean);
  console.assert(sameProgress(mergedProgress, mergedTwice), 'progress: second merge changes nothing');

  // 9. Step 2: exported progress has no ui, history or bot keys.
  const forbidden = ['ui', 'history', 'token', 'chatId'];
  const leaked = forbidden.filter(k => Object.prototype.hasOwnProperty.call(exported, k));
  console.assert(leaked.length === 0, 'progress: no ui/history/token/chatId keys');

  // 10. Step 2: sync code round trip and rejection of junk.
  if(typeof CompressionStream === 'function' && typeof DecompressionStream === 'function'){
    const code = await encodeSyncCode(exported);
    const decoded = await decodeSyncCode(code);
    console.assert(sameProgress(exported, decoded), 'code: round trip keeps progress');
  }
  let codeRejected = false;
  try{
    await decodeSyncCode('hello');
  }catch(e){
    codeRejected = true;
  }
  console.assert(codeRejected, 'code: invalid text throws');

  // 10b. OX6: compact binary code, links, deltas and version guard.
  const rich = buildProgress(srcState);
  rich.srs[WORDS[3]] = { box: 3, due: 1000 + 5 * 86400000, t: 1000 };
  rich.notes[WORDS[4]] = { v: 'ملاحظة قصيرة', t: 1000 };
  const richCode = await encodeSyncCode(rich);
  const richDecoded = await decodeSyncCode(richCode);
  console.assert(sameProgress(rich, richDecoded), 'OX6: marks, notes and SRS round trip');
  console.assert(richDecoded.deviceId === rich.deviceId && richDecoded.syncDelta === false, 'OX6: identity kept, full link flagged');

  const legacyCode = 'OX5u.' + b64urlEncode(new TextEncoder().encode(JSON.stringify(rich)));
  const legacyDecoded = await decodeSyncCode(legacyCode);
  console.assert(sameProgress(rich, legacyDecoded), 'OX6: old OX5 codes still decode');
  console.assert(richCode.length < legacyCode.length * 0.5, 'OX6: at least twice as small as the JSON code');

  const link = buildSyncLink(richCode);
  console.assert(extractSyncPayload(link) === richCode, 'OX6: payload extracted from a link');
  console.assert(extractSyncPayload('https://x/y?sync=' + encodeURIComponent(richCode)) === richCode, 'OX6: payload extracted from a query');

  const delta = changesSince(rich, 1000);
  console.assert(progressItemCount(delta) === 2, 'OX6: delta keeps only newer entries');
  const deltaDecoded = await decodeSyncCode(await encodeSyncCode(delta, undefined, true));
  console.assert(deltaDecoded.syncDelta === true, 'OX6: delta link is flagged');

  let versionRejected = false;
  try{ decodeSyncPayload(encodeSyncPayload(rich, 12345), wordsFingerprint()); }
  catch(e){ versionRejected = e.syncKey === 'version'; }
  console.assert(versionRejected, 'OX6: a different word data version is rejected');

  const goodPayload = encodeSyncPayload(rich, wordsFingerprint());
  let truncRejected = false;
  try{ decodeSyncPayload(goodPayload.slice(0, goodPayload.length - 3), wordsFingerprint()); }
  catch(e){ truncRejected = true; }
  console.assert(truncRejected, 'OX6: a truncated payload is rejected');

  // 11. Step 2: telegram errors map to the right keys.
  console.assert(tgErrorKey(401, {}) === 'token', 'tg: 401 maps to token');
  console.assert(tgErrorKey(400, { description: 'Bad Request: chat not found' }) === 'chat', 'tg: chat not found maps to chat');
  console.assert(tgErrorKey(0, null) === 'net', 'tg: network failure maps to net');

  // 12. Step 2: pickRemoteDocument prefers pin, then newest update.
  const pinnedMock = { result: { pinned_message: { document: { file_id: 'pinned1' } } } };
  console.assert(pickRemoteDocument(pinnedMock, null) === 'pinned1', 'tg: pinned document used');

  const updatesMock = { result: [
    { message: { document: { file_id: 'old', file_name: 'oxford5000-progress-2020-01-01.json' } } },
    { message: { document: { file_id: 'new', file_name: 'oxford5000-progress-2020-01-02.json' } } }
  ] };
  console.assert(pickRemoteDocument(null, updatesMock) === 'new', 'tg: newest update wins');
  console.assert(pickRemoteDocument({ result: {} }, { result: [] }) === null, 'tg: no document returns null');

  // 13. Step 3: nextSrs intervals.
  const srsNow = 2000000000000;
  const s2 = nextSrs({ box: 1, due: 0, t: 0 }, true, srsNow);
  console.assert(s2.box === 2 && s2.due === srsNow + 86400000 && s2.t === srsNow, 'srs: pass 1 -> 2 in 1 day');

  const s5 = nextSrs({ box: 5, due: 0, t: 0 }, true, srsNow);
  console.assert(s5.box === 5 && s5.due === srsNow + 14 * 86400000, 'srs: pass at box 5 stays 5 in 14 days');

  const sFail = nextSrs({ box: 4, due: 0, t: 0 }, false, srsNow);
  console.assert(sFail.box === 1 && sFail.due === srsNow + 10 * 60 * 1000, 'srs: fail returns to box 1 in 10 minutes');

  // 14. Step 3: merge keeps the srs entry with the larger t.
  const srsA = { v: 3, deviceId: 'a', marks: {}, notes: {}, srs: {}, ui: defaultUi(), history: [] };
  const srsB = { v: 3, deviceId: 'b', marks: {}, notes: {}, srs: {}, ui: defaultUi(), history: [] };
  srsA.srs.alpha = { box: 2, due: 10, t: 5 };
  srsB.srs.alpha = { box: 4, due: 20, t: 9 };
  const srsMerged = mergeStates(srsA, srsB);
  console.assert(srsMerged.srs.alpha.box === 4 && srsMerged.srs.alpha.t === 9, 'srs: newer t wins in merge');
  console.assert(sameProgress(mergeStates(srsA, srsB), mergeStates(srsB, srsA)), 'srs: merge is commutative');

  // 15. Step 3: validateImport rejects box 9 and clamps due.
  const badBox = { app: 'oxford5000', v: 3, marks: {}, notes: {}, srs: {} };
  badBox.srs[WORDS[0]] = { box: 9, due: now, t: now };
  const vBadBox = validateImport(badBox, WORDS, now);
  console.assert(vBadBox.ok && !vBadBox.clean.srs[WORDS[0]] && vBadBox.skipped >= 1, 'srs: box 9 rejected');

  const farDue = { app: 'oxford5000', v: 3, marks: {}, notes: {}, srs: {} };
  farDue.srs[WORDS[1]] = { box: 3, due: now + 61 * 86400000, t: now };
  const vFarDue = validateImport(farDue, WORDS, now);
  console.assert(vFarDue.ok && vFarDue.clean.srs[WORDS[1]].due === now + 60 * 86400000, 'srs: due clamped to 60 days');

  // 16. Step 3: queue puts due words first and never includes non-u words.
  const qWords = [WORDS[0], WORDS[1], WORDS[2], WORDS[3]];
  const qMarks = {};
  qMarks[WORDS[0]] = { s: 'u', t: 1 };
  qMarks[WORDS[1]] = { s: 'k', t: 1 };
  qMarks[WORDS[2]] = { s: 'u', t: 1 };
  const qSrs = {};
  qSrs[WORDS[0]] = { box: 2, due: now + 5 * 86400000, t: 1 };
  qSrs[WORDS[2]] = { box: 1, due: now - 86400000, t: 1 };
  const qOrder = buildQuizQueue(qWords, qMarks, qSrs, now);
  console.assert(qOrder.length === 2, 'quiz: only u words in queue');
  console.assert(qOrder[0] === WORDS[2] && qOrder[1] === WORDS[0], 'quiz: due words come first');
  console.assert(qOrder.indexOf(WORDS[1]) === -1 && qOrder.indexOf(WORDS[3]) === -1, 'quiz: known and unmarked excluded');

  // 17. Step 3: distractors are unique and never the correct answer.
  const distract = buildDistractorOptions('right', ['right', 'w1', 'w1', 'w2', 'w3', 'w4'], 3);
  console.assert(distract.length === 3, 'quiz: three distractors built');
  console.assert(new Set(distract).size === distract.length, 'quiz: distractors unique');
  console.assert(distract.indexOf('right') === -1, 'quiz: correct answer never a distractor');

  // 18. Step 4: every language has every key with the same placeholders.
  function placeholdersOf(text){
    const out = [];
    const re = /\{[A-Za-z0-9_]+\}/g;
    const s = String(text == null ? '' : text);
    let m = re.exec(s);
    while(m){
      out.push(m[0]);
      m = re.exec(s);
    }
    return out.sort().join(',');
  }
  const arKeys = Object.keys(I18N.ar || {});
  let keysOk = arKeys.length > 0;
  I18N._langs.forEach(l => {
    const bag = I18N[l.code] || {};
    if(Object.keys(bag).length !== arKeys.length) keysOk = false;
    arKeys.forEach(k => {
      if(typeof bag[k] !== 'string') keysOk = false;
      else if(placeholdersOf(bag[k]) !== placeholdersOf(I18N.ar[k])) keysOk = false;
    });
  });
  console.assert(keysOk, 'i18n: all languages share keys and placeholders');

  // 19. Step 4: missing keys fall back to the key, placeholders are all replaced.
  console.assert(t('missing.key') === 'missing.key', 'i18n: missing key returns the key');
  let bracesOk = true;
  I18N._langs.forEach(l => {
    const text = tFor(l.code, 'quiz.progress', { n: 3, total: 10 });
    if(text.indexOf('{') !== -1 || text.indexOf('}') !== -1) bracesOk = false;
  });
  console.assert(bracesOk, 'i18n: no placeholder left after translation');

  // 20. Step 4: direction comes from the language table.
  applyLang('en');
  console.assert(document.documentElement.dir === 'ltr', 'i18n: en is ltr');
  applyLang('ur');
  console.assert(document.documentElement.dir === 'rtl', 'i18n: ur is rtl');
  applyLang('ar');
  console.assert(document.documentElement.dir === 'rtl', 'i18n: ar is rtl');

  // 21. Step 4: switching language updates static and generated text.
  const arKnowText = document.getElementById('btnKnow').textContent;
  const arLevelText = levelBar.children[0] ? levelBar.children[0].textContent : '';
  applyLang('fr');
  console.assert(document.getElementById('btnKnow').textContent !== arKnowText, 'i18n: know button translated');
  console.assert(levelBar.children[0] && levelBar.children[0].textContent !== arLevelText, 'i18n: level bar translated');
  applyLang('ar');
  console.assert(document.getElementById('btnKnow').textContent === arKnowText, 'i18n: arabic restored');

  // 22. Step 4: multi-line text becomes markup.
  const emptyHtml = tHtml('modal.empty.unknown');
  console.assert(emptyHtml.indexOf('<br>') !== -1 && emptyHtml.indexOf('\n') === -1, 'i18n: newline becomes br');

  // 23. Sentences & Dataset: all 5325 entries are loaded and each has an example
  console.assert(ENTRIES && ENTRIES.length === 5325, 'dataset: 5325 entries loaded');
  console.assert(ENTRIES.every(e => !!e.example && String(e.example).trim() !== ''), 'sentences: every entry has an example');
  const sampleEntry = ENTRIES[0];
  const sentHtml = highlightSentence(sampleEntry.example, sampleEntry);
  console.assert(sentHtml.indexOf('<mark') !== -1, 'sentences: form or word highlighted');
  const sentMissingHtml = highlightSentence('A simple sentence.', 'zzzznotaword');
  console.assert(sentMissingHtml.indexOf('<mark') === -1, 'sentences: no mark when word absent');

  // 24. Every word has a known CEFR level, used by the grouped lists.
  console.assert(ENTRIES.every(e => LEVEL_ORDER.indexOf((e.level || '').toLowerCase()) !== -1), 'levels: every word has a level');

  // 25. Search finds words and notes, and ignores empty queries.
  console.assert(searchWords('').length === 0, 'search: empty query has no results');
  console.assert(searchWords('zzzznotaword').length === 0, 'search: unknown query has no results');
  const firstWord = WORDS[0];
  const firstHits = searchWords(firstWord);
  console.assert(firstHits.indexOf(firstWord) !== -1, 'search: exact word is found');
  const savedNote = state.notes[firstWord];
  state.notes[firstWord] = { v: 'zzz-search-note', t: Date.now() };
  console.assert(searchWords('zzz-search-note').indexOf(firstWord) !== -1, 'search: note text is searchable');
  if(savedNote) state.notes[firstWord] = savedNote;
  else delete state.notes[firstWord];

  // 26. The quiz is multiple choice only, and it reviews unknown words by default.
  const quizDefaults = defaultQuizSettings();
  console.assert(quizDefaults.source === 'all' && quizDefaults.count === 10, 'quiz: unknown words are the default source');
  console.assert(!('answerMode' in quizDefaults) && !('types' in quizDefaults), 'quiz: typing and card modes removed');
  const uiQuiz = defaultUi();
  uiQuiz.quizSettings.answerMode = 'type';
  uiQuiz.quizSettings.types = { cards: true, mc: false };
  const uiQuizClean = cloneUi(uiQuiz);
  console.assert(!('answerMode' in uiQuizClean.quizSettings) && !('types' in uiQuizClean.quizSettings), 'quiz: legacy settings ignored');

  const quizWord = WORDS.find(w => wordTranslation(w) !== '');
  const knownWord = WORDS.find(w => w !== quizWord);
  const keepMarks = state.marks;
  const keepSrs = state.srs;
  state.marks = {};
  state.srs = {};
  state.marks[quizWord] = { s: 'u', t: 1 };
  state.marks[knownWord] = { s: 'k', t: 1 };
  const poolAll = quizPool('all', 'all');
  console.assert(poolAll.indexOf(quizWord) !== -1, 'quiz: unknown words enter the pool');
  console.assert(poolAll.indexOf(knownWord) === -1, 'quiz: known words stay out');
  state.marks = keepMarks;
  state.srs = keepSrs;

  // 27. The word lists group words by level and show a level summary.
  const keepMode = currentMode;
  const keepSort = state.ui.sort;
  const keepMarks2 = state.marks;
  state.marks = {};
  state.marks[quizWord] = { s: 'u', t: 1 };
  currentMode = 'unknown';
  state.ui.sort = 'level_asc';
  renderReviewList('');
  const summaryChips = document.querySelectorAll('#reviewSummary .review-sum-chip');
  console.assert(summaryChips.length >= 1, 'list: level summary rendered');
  console.assert(document.querySelectorAll('#reviewList .review-group-head').length >= 1, 'list: words grouped by level');
  state.marks = keepMarks2;
  state.ui.sort = keepSort;
  currentMode = keepMode;
  renderReviewList('');

  // 28. Audio and Forms coverage:
  const hasUkCount = ENTRIES.filter(e => !!e.audio_uk).length;
  const hasUsCount = ENTRIES.filter(e => !!e.audio_us).length;
  const noAudioCount = ENTRIES.filter(e => !e.audio_uk && !e.audio_us).length;
  console.assert(hasUkCount === 5230, 'audio: 5230 entries have UK audio');
  console.assert(hasUsCount === 5230, 'audio: 5230 entries have US audio');
  console.assert(noAudioCount === 95, 'audio: 95 entries have no audio');
  console.assert(!!document.getElementById('btnAudioUk'), 'ui: UK audio button wired');
  console.assert(!!document.getElementById('btnAudioUs'), 'ui: US audio button wired');

  // 28. Highlight classes tell the base word, a regular ending and an irregular change apart.
  const regHtml = highlightSentence('She abandoned the car.', 'abandon', formsFor('abandon'));
  console.assert(regHtml.indexOf('hl-suf') !== -1 && regHtml.indexOf('hl-irr') === -1, 'forms: regular ending highlighted');
  const irrHtml = highlightSentence('He wrote a letter.', 'write', formsFor('write'));
  console.assert(irrHtml.indexOf('hl-irr') !== -1, 'forms: irregular change highlighted');
  const baseHtml = highlightSentence('They abandon the car.', 'abandon', formsFor('abandon'));
  console.assert(baseHtml.indexOf('hl-base') !== -1, 'forms: base word highlighted');

  // 29. Translations are wired to the word, the sentence and the quiz answer.
  const trEntry = ENTRIES.find(e => wordTranslation(e.word) !== '');
  console.assert(!!trEntry, 'translation: words translated in the current language');
  console.assert(answerFor(trEntry) !== '', 'translation: built-in meaning is the default answer');
  const savedTrNote = state.notes[trEntry.id];
  state.notes[trEntry.id] = { v: 'zzz-translation-note', t: Date.now() };
  console.assert(answerFor(trEntry) === 'zzz-translation-note', 'translation: user note wins over built-in meaning');
  if(savedTrNote) state.notes[trEntry.id] = savedTrNote;
  else delete state.notes[trEntry.id];

  // 30. The form chip marks the ending that was added.
  const chip = formChipHtml({ f: 'abandoned', k: 'reg', s: 'ed' });
  console.assert(chip.indexOf('hl-suf') !== -1, 'forms: chip highlights the suffix');
  const irrChip = formChipHtml({ f: 'wrote', k: 'irr' });
  console.assert(irrChip.indexOf('hl-irr') !== -1, 'forms: chip marks irregular forms');

  // 32. The quiz remains multiple-choice only and pronunciation is optional.
  console.assert(!('answerMode' in defaultQuizSettings()) && !('types' in defaultQuizSettings()), 'quiz: typing and card modes removed');
  console.assert(!!document.getElementById('speakMain'), 'card: pronunciation control wired');
  console.assert(!document.getElementById('speakSentence'), 'card: example pronunciation control removed');
  console.assert(!!document.getElementById('btnAudioUk') && !!document.getElementById('btnAudioUs'), 'card: UK/US audio controls wired');
  console.assert(document.querySelectorAll('.social-icon svg').length >= 2, 'footer: social icons rendered');
  console.assert(!!document.querySelector('.coffee-support'), 'footer: coffee support control rendered');
  console.assert(document.querySelectorAll('#langMenu [data-lang]').length === langList().length, 'language menu: all languages rendered');
  const mainRect = document.getElementById('mainArea').getBoundingClientRect();
  const deckRect = document.getElementById('deck').getBoundingClientRect();
  const deckCenter = (deckRect.left + deckRect.right) / 2;
  const mainCenter = (mainRect.left + mainRect.right) / 2;
  console.assert(Math.abs(deckCenter - mainCenter) < 2, 'layout: deck is centered');

  // 33. Update 1.4 features:
  console.assert(!!document.getElementById('openHabit'), 'habit: habit counter pill present');
  console.assert(!!document.getElementById('habitOverlay'), 'habit: habit overlay modal present');
  console.assert(!!document.getElementById('btnAudioSpeed'), 'audio: audio playback speed button present');
  console.assert(!!document.getElementById('btnMatch'), 'match: word match button present');
  console.assert(!!document.getElementById('matchOverlay'), 'match: word match overlay present');
  console.assert(!!document.getElementById('btnAnalytics'), 'analytics: learning analytics button present');
  console.assert(!!document.getElementById('analyticsOverlay'), 'analytics: analytics overlay present');
  console.assert(!!document.getElementById('btnExportAnki'), 'anki: export to Anki button present');
  console.assert(!!document.getElementById('openSettings'), 'settings: preferences modal button present');
  console.assert(!!document.querySelector('link[rel="manifest"]'), 'pwa: manifest link present');

  console.log('SELFTEST PASS');
}

function initExamplesNotice(){
  const notice = document.getElementById('examplesNotice');
  const closeBtn = document.getElementById('closeExamplesNotice');
  if(!notice) return;

  const KEY_DISMISSED = 'oxford5000_notice_dismissed';
  const KEY_SEEN = 'oxford5000_notice_seen';

  try {
    if(localStorage.getItem(KEY_DISMISSED)) return;
    if(sessionStorage.getItem(KEY_SEEN)) return;
    sessionStorage.setItem(KEY_SEEN, '1');
  } catch(_) {}

  function dismiss(){
    notice.classList.remove('show');
    try { localStorage.setItem(KEY_DISMISSED, '1'); } catch(_) {}
  }

  if(closeBtn){
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });
  }

  notice.addEventListener('click', () => {
    notice.classList.remove('show');
  });

  setTimeout(() => {
    notice.classList.add('show');
    setTimeout(() => {
      notice.classList.remove('show');
    }, 8000);
  }, 1400);
}

loadState();
applyPreferences();
wireEvents();
buildLangSelect();
applyLang((state.ui && state.ui.lang) ? state.ui.lang : DEFAULT_LANG);
if(!state.ui.onboardingSeen && location.hash !== '#selftest') openOnboarding();
loadVisitorCount();
renderSyncStatus();
maybeAutoSync();
initExamplesNotice();
if(location.hash !== '#selftest') applyHashSync();

if(location.hash === '#selftest'){
  selfTest();
}

if('serviceWorker' in navigator && location.protocol.startsWith('http') && location.hash !== '#selftest'){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
