import json
import os

path = os.path.join(os.path.dirname(__file__), '..', 'data', 'i18n.json')
with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f)

new_keys = {
    'quiz.mode': {
        'ar': 'نوع الاختبار', 'en': 'Quiz Mode', 'fr': 'Mode de quiz', 'es': 'Modo de cuestionario',
        'pt': 'Modo de teste', 'ru': 'Режим теста', 'tr': 'Test Modu', 'ur': 'کوئز موڈ',
        'hi': 'क्विज़ मोड', 'id': 'Mode Kuis', 'zh': '测验模式', 'nl': 'Quizmodus'
    },
    'quiz.mode.standard': {
        'ar': 'الوضع القياسي', 'en': 'Standard Mode', 'fr': 'Mode standard', 'es': 'Modo estándar',
        'pt': 'Modo padrão', 'ru': 'Стандартный режим', 'tr': 'Standart Mod', 'ur': 'معیاری موڈ',
        'hi': 'मानक मोड', 'id': 'Mode Standar', 'zh': '标准模式', 'nl': 'Standaardmodus'
    },
    'quiz.mode.timeAttack': {
        'ar': 'سباق الوقت ⚡', 'en': 'Time Attack ⚡', 'fr': 'Course contre la montre ⚡', 'es': 'Contrarreloj ⚡',
        'pt': 'Corrida contra o tempo ⚡', 'ru': 'Гонка со временем ⚡', 'tr': 'Zaman Yarışı ⚡', 'ur': 'وقت کی دوڑ ⚡',
        'hi': 'समय की दौड़ ⚡', 'id': 'Adu Waktu ⚡', 'zh': '竞速挑战 ⚡', 'nl': 'Tijdrit ⚡'
    },
    'quiz.timeRemaining': {
        'ar': 'الوقت: {n} ث', 'en': 'Time: {n}s', 'fr': 'Temps : {n}s', 'es': 'Tiempo: {n}s',
        'pt': 'Tempo: {n}s', 'ru': 'Время: {n}с', 'tr': 'Süre: {n}s', 'ur': 'وقت: {n} سیکنڈ',
        'hi': 'समय: {n} से', 'id': 'Waktu: {n}d', 'zh': '时间：{n}秒', 'nl': 'Tijd: {n}s'
    },
    'quiz.timeUp': {
        'ar': 'انتهى الوقت!', 'en': 'Time Up!', 'fr': 'Temps écoulé !', 'es': '¡Tiempo agotado!',
        'pt': 'Tempo esgotado!', 'ru': 'Время вышло!', 'tr': 'Süre doldu!', 'ur': 'وقت ختم ہو گیا!',
        'hi': 'समय समाप्त!', 'id': 'Waktu habis!', 'zh': '时间到！', 'nl': 'Tijd is om!'
    },
    'quiz.speedScore': {
        'ar': 'إجمالي الإجابات: {n}', 'en': 'Total answered: {n}', 'fr': 'Total répondu : {n}', 'es': 'Total respondido: {n}',
        'pt': 'Total respondido: {n}', 'ru': 'Всего ответов: {n}', 'tr': 'Toplam cevaplanan: {n}', 'ur': 'کل جوابات: {n}',
        'hi': 'कुल उत्तर दिए: {n}', 'id': 'Total dijawab: {n}', 'zh': '已答总数：{n}', 'nl': 'Totaal beantwoord: {n}'
    },
    'quiz.fastestStreak': {
        'ar': 'أطول سلسلة صحيحة: {n}', 'en': 'Best streak: {n}', 'fr': 'Meilleure série : {n}', 'es': 'Mejor racha: {n}',
        'pt': 'Melhor sequência: {n}', 'ru': 'Лучшая серия: {n}', 'tr': 'En iyi seri: {n}', 'ur': 'بہترین تسلسل: {n}',
        'hi': 'सर्वश्रेष्ठ स्ट्रीक: {n}', 'id': 'Rangkaian terbaik: {n}', 'zh': '最高连续正确：{n}', 'nl': 'Beste reeks: {n}'
    },
    'edit.button': {
        'ar': 'تعديل الكلمة', 'en': 'Edit Word', 'fr': 'Modifier le mot', 'es': 'Editar palabra',
        'pt': 'Editar palavra', 'ru': 'Редактировать слово', 'tr': 'Kelimeyi Düzenle', 'ur': 'لفظ میں ترمیم کریں',
        'hi': 'शब्द संपादित करें', 'id': 'Edit Kata', 'zh': '编辑单词', 'nl': 'Woord bewerken'
    },
    'edit.title': {
        'ar': 'تعديل محتوى الكلمة', 'en': 'Edit Word Content', 'fr': 'Modifier le contenu du mot', 'es': 'Editar contenido de la palabra',
        'pt': 'Editar conteúdo da palavra', 'ru': 'Редактировать содержание слова', 'tr': 'Kelime İçeriğini Düzenle', 'ur': 'لفظ کا مواد تبدیل کریں',
        'hi': 'शब्द सामग्री संपादित करें', 'id': 'Edit Konten Kata', 'zh': '编辑单词内容', 'nl': 'Woordinhoud bewerken'
    },
    'edit.tr': {
        'ar': 'الترجمة المخصصة', 'en': 'Custom Translation', 'fr': 'Traduction personnalisée', 'es': 'Traducción personalizada',
        'pt': 'Tradução personalizada', 'ru': 'Пользовательский перевод', 'tr': 'Özel Çeviri', 'ur': 'اپنی مرضی کا ترجمہ',
        'hi': 'कस्टम अनुवाद', 'id': 'Terjemahan Kustom', 'zh': '自定义翻译', 'nl': 'Aangepaste vertaling'
    },
    'edit.example': {
        'ar': 'المثال الإنجليزي', 'en': 'English Example', 'fr': 'Exemple en anglais', 'es': 'Ejemplo en inglés',
        'pt': 'Exemplo em inglês', 'ru': 'Пример на английском', 'tr': 'İngilizce Örnek', 'ur': 'انگریزی مثال',
        'hi': 'अंग्रेज़ी उदाहरण', 'id': 'Contoh Bahasa Inggris', 'zh': '英文例句', 'nl': 'Engels voorbeeld'
    },
    'edit.exampleTr': {
        'ar': 'ترجمة المثال', 'en': 'Example Translation', 'fr': "Traduction de l'exemple", 'es': 'Traducción del ejemplo',
        'pt': 'Tradução do exemplo', 'ru': 'Перевод примера', 'tr': 'Örnek Çevirisi', 'ur': 'مثال کا ترجمہ',
        'hi': 'उदाहरण अनुवाद', 'id': 'Terjemahan Contoh', 'zh': '例句翻译', 'nl': 'Vertaling van voorbeeld'
    },
    'edit.forms': {
        'ar': 'ملخص الصيغ والتصريفات', 'en': 'Forms & Inflections Summary', 'fr': 'Résumé des formes et flexions', 'es': 'Resumen de formas y flexiones',
        'pt': 'Resumo de formas e flexões', 'ru': 'Сводка форм и спряжений', 'tr': 'Biçim ve Çekim Özeti', 'ur': 'اشکال و گردان کا خلاصہ',
        'hi': 'रूप और रूपांतर सारांश', 'id': 'Ringkasan Bentuk & Infleksi', 'zh': '词形与变位摘要', 'nl': 'Vormen- en vervoegingenoverzicht'
    },
    'edit.save': {
        'ar': 'حفظ التعديل', 'en': 'Save Changes', 'fr': 'Enregistrer', 'es': 'Guardar cambios',
        'pt': 'Salvar alterações', 'ru': 'Сохранить изменения', 'tr': 'Değişiklikleri Kaydet', 'ur': 'تبدیلیاں محفوظ کریں',
        'hi': 'परिवर्तन सहेजें', 'id': 'Simpan Perubahan', 'zh': '保存修改', 'nl': 'Wijzigingen opslaan'
    },
    'edit.reset': {
        'ar': 'استعادة الأصل', 'en': 'Reset to Original', 'fr': 'Rétablir l’original', 'es': 'Restablecer original',
        'pt': 'Restaurar original', 'ru': 'Восстановить исходное', 'tr': 'Orijinale Sıfırla', 'ur': 'اصل پر واپس جائیں',
        'hi': 'मूल पर रीसेट करें', 'id': 'Kembalikan ke Asli', 'zh': '恢复默认', 'nl': 'Herstellen naar origineel'
    },
    'edit.saved': {
        'ar': 'تم حفظ التعديل بنجاح', 'en': 'Saved successfully', 'fr': 'Enregistré avec succès', 'es': 'Guardado con éxito',
        'pt': 'Salvo com sucesso', 'ru': 'Успешно сохранено', 'tr': 'Başarıyla kaydedildi', 'ur': 'کامیابی سے محفوظ ہو گیا',
        'hi': 'सफलतापूर्वक सहेजा गया', 'id': 'Berhasil disimpan', 'zh': '保存成功', 'nl': 'Succesvol opgeslagen'
    },
    'edit.customBadge': {
        'ar': 'معدّلة', 'en': 'Custom', 'fr': 'Modifié', 'es': 'Personalizado',
        'pt': 'Personalizado', 'ru': 'Изменено', 'tr': 'Özel', 'ur': 'ترمیم شدہ',
        'hi': 'कस्टम', 'id': 'Kustom', 'zh': '已修改', 'nl': 'Aangepast'
    },
    'cat.noun': {'ar': 'اسم', 'en': 'noun', 'fr': 'nom', 'es': 'sustantivo', 'pt': 'substantivo', 'ru': 'существительное', 'tr': 'isim', 'ur': 'اسم', 'hi': 'संज्ञा', 'id': 'kata benda', 'zh': '名词', 'nl': 'zelfstandig naamwoord'},
    'cat.verb': {'ar': 'فعل', 'en': 'verb', 'fr': 'verbe', 'es': 'verbo', 'pt': 'verbo', 'ru': 'глагол', 'tr': 'fiil', 'ur': 'فعل', 'hi': 'क्रिया', 'id': 'kata kerja', 'zh': '动词', 'nl': 'werkwoord'},
    'cat.adjective': {'ar': 'صفة', 'en': 'adjective', 'fr': 'adjectif', 'es': 'adjetivo', 'pt': 'adjetivo', 'ru': 'прилагательное', 'tr': 'sıfat', 'ur': 'صفت', 'hi': 'विशेषण', 'id': 'kata sifat', 'zh': '形容词', 'nl': 'bijvoeglijk naamwoord'},
    'cat.adverb': {'ar': 'ظرف', 'en': 'adverb', 'fr': 'adverbe', 'es': 'adverbio', 'pt': 'advérbio', 'ru': 'наречие', 'tr': 'zarf', 'ur': 'متعلق فعل', 'hi': 'क्रियाविशेषण', 'id': 'kata keterangan', 'zh': '副词', 'nl': 'bijwoord'},
    'cat.preposition': {'ar': 'حرف جر', 'en': 'preposition', 'fr': 'préposition', 'es': 'preposición', 'pt': 'preposição', 'ru': 'предлог', 'tr': 'edat', 'ur': 'حرف جار', 'hi': 'सम्बन्धबोधक', 'id': 'preposisi', 'zh': '介词', 'nl': 'voorzetsel'},
    'cat.pronoun': {'ar': 'ضمير', 'en': 'pronoun', 'fr': 'pronom', 'es': 'pronombre', 'pt': 'pronome', 'ru': 'местоимение', 'tr': 'zamir', 'ur': 'ضمیر', 'hi': 'सर्वनाम', 'id': 'kata ganti', 'zh': '代词', 'nl': 'voornaamwoord'},
    'cat.conjunction': {'ar': 'أداة ربط', 'en': 'conjunction', 'fr': 'conjonction', 'es': 'conjunción', 'pt': 'conjunção', 'ru': 'союз', 'tr': 'bağlaç', 'ur': 'حرف ربط', 'hi': 'समुच्चयबोधक', 'id': 'konjungsi', 'zh': '连词', 'nl': 'voegwoord'},
    'cat.exclamation': {'ar': 'صيغة تعجب', 'en': 'exclamation', 'fr': 'interjection', 'es': 'exclamación', 'pt': 'interjeição', 'ru': 'междометие', 'tr': 'ünlem', 'ur': 'حرف استعجاب', 'hi': 'विस्मयादिबोधक', 'id': 'kata seru', 'zh': '感叹词', 'nl': 'tussenwerpsel'},
    'cat.determiner': {'ar': 'محدد', 'en': 'determiner', 'fr': 'déterminant', 'es': 'determinate', 'pt': 'determinante', 'ru': 'определитель', 'tr': 'belirteç', 'ur': 'حرف تعیین', 'hi': 'निर्धारक', 'id': 'kata penentu', 'zh': '限定词', 'nl': 'lidwoord/bepaler'},
    'cat.number': {'ar': 'عدد', 'en': 'number', 'fr': 'nombre', 'es': 'número', 'pt': 'número', 'ru': 'числительное', 'tr': 'sayı', 'ur': 'عدد', 'hi': 'संख्या', 'id': 'angka/bilangan', 'zh': '数词', 'nl': 'telwoord'},
    'cat.auxiliary verb': {'ar': 'فعل مساعد', 'en': 'auxiliary verb', 'fr': 'verbe auxiliaire', 'es': 'verbo auxiliar', 'pt': 'verbo auxiliar', 'ru': 'вспомогательный глагол', 'tr': 'yardımcı fiil', 'ur': 'امدادی فعل', 'hi': 'सहायक क्रिया', 'id': 'kata kerja bantu', 'zh': '助动词', 'nl': 'hulpwerkwoord'},
    'cat.modal verb': {'ar': 'فعل ناقص', 'en': 'modal verb', 'fr': 'verbe modal', 'es': 'verbo modal', 'pt': 'verbo modal', 'ru': 'модальный глагол', 'tr': 'modal fiil', 'ur': 'فعل ناقص', 'hi': 'मोडल क्रिया', 'id': 'kata kerja modal', 'zh': '情态动词', 'nl': 'modaal hulpwerkwoord'},
    'cat.definite article': {'ar': 'أداة تعريف', 'en': 'definite article', 'fr': 'article défini', 'es': 'artículo definido', 'pt': 'artigo definido', 'ru': 'определенный артикль', 'tr': 'belirli tanımlık', 'ur': 'حرف معرفہ', 'hi': 'निश्चित उपपद', 'id': 'kata sandang tentu', 'zh': '定冠词', 'nl': 'bepaald lidwoord'},
    'cat.indefinite article': {'ar': 'أداة تنكير', 'en': 'indefinite article', 'fr': 'article indéfini', 'es': 'artículo indefinido', 'pt': 'artigo indefinido', 'ru': 'неопределенный артикль', 'tr': 'belirsiz tanımlık', 'ur': 'حرف نکرہ', 'hi': 'अनिश्चित उपपद', 'id': 'kata sandang tak tentu', 'zh': '不定冠词', 'nl': 'onbepaald lidwoord'},
    'cat.infinitive marker': {'ar': 'علامة المصدر', 'en': 'infinitive marker', 'fr': 'marqueur d’infinitif', 'es': 'marcador de infinitivo', 'pt': 'marcador de infinitivo', 'ru': 'частица инфинитива', 'tr': 'mastar eki', 'ur': 'علامت مصدر', 'hi': 'अनंत मार्कर', 'id': 'penanda infinitif', 'zh': '不定式标记', 'nl': 'infinitiefpartikel'}
}

for k, trans in new_keys.items():
    for lang, val in trans.items():
        if lang in d:
            d[lang][k] = val

with open(path, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print('Updated i18n.json successfully. Counts per lang:')
for l in d:
    if l != '_langs':
        print(f'{l}: {len(d[l])}')
