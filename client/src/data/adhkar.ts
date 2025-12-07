/**
 * adhkar.ts
 * Authentic Adhkar (remembrances) with Hadiths following Ahlul Sunnah
 * Sources: Sahih Bukhari, Sahih Muslim, Abu Dawud, Tirmidhi, Ibn Majah
 */

export interface Dhikr {
  id: string;
  category: DhikrCategory;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number; // Recommended repetitions
  hadith: string;
  source: string; // Hadith reference
  reward: string; // Fadl/Benefit
  audioUrl?: string;
  shortName?: string; // Short display name for header (e.g., "Ayat al-Kursi")
}

export type DhikrCategory = 
  | "morning" 
  | "evening" 
  | "after_prayer" 
  | "before_sleep" 
  | "general"
  | "after_wudu";

export const ADHKAR: Dhikr[] = [
  // Morning Adhkar
  {
    id: "morning_ayat_kursi",
    category: "morning",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishay'im-min 'ilmihi illa bima sha'a. Wasi'a Kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifdhuhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es denn, der bei Ihm Fürsprache einlegen könnte - außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, doch sie umfassen nichts von Seinem Wissen - außer, was Er will. Sein Thronschemel umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Er ist der Erhabene und Allgewaltige.",
    count: 1,
    hadith: "Wer Ayat al-Kursi nach jedem Pflichtgebet rezitiert, dem steht nichts im Wege zum Paradies außer dem Tod.",
    source: "An-Nasa'i in Al-Kubra (9928), authentifiziert von Al-Albani",
    reward: "Schutz bis zum nächsten Gebet, Eintritt ins Paradies",
    shortName: "Ayat al-Kursi",
  },
  {
    id: "morning_subhanallah_100",
    category: "morning",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahi wa bihamdihi",
    translation: "Gepriesen sei Allah und Ihm gebührt alles Lob",
    count: 100,
    hadith: "Wer 100 Mal am Tag sagt: 'Subhan Allahi wa bihamdihi', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Bukhari 6405, Sahih Muslim 2691",
    reward: "Vergebung aller Sünden, selbst wenn sie wie Meeresschaum sind",
  },
  {
    id: "morning_subhanallah_azim",
    category: "morning",
    arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahil-Azim wa bihamdihi",
    translation: "Gepriesen sei Allah, der Allmächtige, und Ihm gebührt alles Lob",
    count: 100,
    hadith: "Zwei Worte, die leicht auf der Zunge sind, schwer in der Waage und geliebt vom Barmherzigen: Subhan Allahil-Azim wa bihamdihi, Subhan Allahil-Azim.",
    source: "Sahih Bukhari 6406, Sahih Muslim 2694",
    reward: "Schwer in der Waage am Tag des Gerichts, geliebt von Allah",
  },
  {
    id: "morning_la_ilaha_illallah",
    category: "morning",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadir",
    translation: "Es gibt keinen Gott außer Allah allein, Er hat keinen Partner. Ihm gehört die Herrschaft und Ihm gebührt alles Lob, und Er hat Macht über alle Dinge",
    count: 100,
    hadith: "Wer dies 100 Mal am Tag sagt, erhält die Belohnung, als hätte er 100 Sklaven befreit, und 100 gute Taten werden für ihn aufgeschrieben, und 100 schlechte Taten werden von ihm gelöscht, und es ist ein Schutz vor dem Satan für diesen Tag.",
    source: "Sahih Bukhari 3293, Sahih Muslim 2691",
    reward: "Belohnung wie 100 befreite Sklaven, 100 Hasanat, Schutz vor Satan",
  },
  
  // Evening Adhkar
  {
    id: "evening_ayat_kursi",
    category: "evening",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishay'im-min 'ilmihi illa bima sha'a. Wasi'a Kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifdhuhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es denn, der bei Ihm Fürsprache einlegen könnte - außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, doch sie umfassen nichts von Seinem Wissen - außer, was Er will. Sein Thronschemel umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Er ist der Erhabene und Allgewaltige.",
    count: 1,
    hadith: "Wer Ayat al-Kursi vor dem Schlafengehen rezitiert, wird von Allah beschützt und der Satan wird sich ihm nicht nähern bis zum Morgen.",
    source: "Sahih Bukhari 2311",
    reward: "Schutz vor Satan die ganze Nacht",
    shortName: "Ayat al-Kursi",
  },
  {
    id: "evening_last_two_ayat_baqarah",
    category: "evening",
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Amana ar-Rasulu bima unzila ilayhi min Rabbihi wal-mu'minun. Kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulihi la nufarriqu bayna ahadin min rusulihi wa qalu sami'na wa ata'na ghufranaka Rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha mak-tasabat. Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bihi wa'fu 'anna waghfir lana warhamna anta mawlana fansurna 'alal-qawmil-kafirin.",
    translation: "Der Gesandte glaubt an das, was zu ihm von seinem Herrn herabgesandt wurde, und ebenso die Gläubigen. Alle glauben an Allah, Seine Engel, Seine Bücher und Seine Gesandten - wir machen keinen Unterschied zwischen Seinen Gesandten. Und sie sagen: Wir hören und gehorchen. Gewähre uns Deine Vergebung, unser Herr, und zu Dir ist die Heimkehr. Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag. Ihr kommt zugute, was sie erworben hat, und angelastet wird ihr, was sie sich zuschulden kommen ließ. Unser Herr, belange uns nicht, wenn wir vergessen oder einen Fehler begehen. Unser Herr, lege uns keine Bürde auf, wie Du sie jenen auferlegt hast, die vor uns waren. Unser Herr, bürde uns nichts auf, wozu wir keine Kraft haben. Verzeihe uns, vergib uns und erbarme Dich unser! Du bist unser Beschützer, so hilf uns gegen das ungläubige Volk.",
    count: 1,
    hadith: "Wer die letzten beiden Verse von Surat Al-Baqarah in der Nacht rezitiert, dem genügen sie (als Schutz).",
    source: "Sahih Bukhari 5009, Sahih Muslim 807",
    reward: "Ausreichender Schutz für die Nacht",
    shortName: "Letzte 2 Verse Al-Baqarah",
  },
  
  // After Prayer
  {
    id: "after_prayer_subhanallah_33",
    category: "after_prayer",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan Allah",
    translation: "Gepriesen sei Allah",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung der Sünden",
  },
  {
    id: "after_prayer_alhamdulillah_33",
    category: "after_prayer",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "Alles Lob gebührt Allah",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung der Sünden",
  },
  {
    id: "after_prayer_allahu_akbar_33",
    category: "after_prayer",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah ist der Größte",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung der Sünden",
  },
  
  // Before Sleep
  {
    id: "before_sleep_ayat_kursi",
    category: "before_sleep",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishay'im-min 'ilmihi illa bima sha'a. Wasi'a Kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifdhuhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es denn, der bei Ihm Fürsprache einlegen könnte - außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, doch sie umfassen nichts von Seinem Wissen - außer, was Er will. Sein Thronschemel umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Er ist der Erhabene und Allgewaltige.",
    count: 1,
    hadith: "Wer Ayat al-Kursi vor dem Schlafengehen rezitiert, wird von Allah beschützt und der Satan wird sich ihm nicht nähern bis zum Morgen.",
    source: "Sahih Bukhari 2311",
    reward: "Schutz vor Satan die ganze Nacht",
    shortName: "Ayat al-Kursi",
  },
  {
    id: "before_sleep_surah_ikhlas",
    category: "before_sleep",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Bismillahir-Rahmanir-Rahim. Qul Huwa Allahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakul-lahu kufuwan ahad.",
    translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sag: Er ist Allah, ein Einziger. Allah, der Absolute. Er hat nicht gezeugt und ist nicht gezeugt worden. Und niemand ist Ihm jemals gleich.",
    count: 3,
    hadith: "Der Prophet (ﷺ) pflegte vor dem Schlafengehen seine Hände zusammenzulegen, in sie zu blasen und Surat Al-Ikhlas, Al-Falaq und An-Nas zu rezitieren, dann strich er damit über seinen Körper, beginnend mit seinem Kopf und Gesicht und dem vorderen Teil seines Körpers. Er tat dies drei Mal.",
    source: "Sahih Bukhari 5017",
    reward: "Vollständiger Schutz vor allem Übel",
  },
  {
    id: "before_sleep_surah_falaq",
    category: "before_sleep",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Bismillahir-Rahmanir-Rahim. Qul a'udhu bi-Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sag: Ich nehme Zuflucht beim Herrn der Morgendämmerung. Vor dem Übel dessen, was Er erschaffen hat. Und vor dem Übel der Dunkelheit, wenn sie hereinbricht. Und vor dem Übel derer, die auf Knoten blasen. Und vor dem Übel des Neidischen, wenn er neidet.",
    count: 3,
    hadith: "Der Prophet (ﷺ) pflegte vor dem Schlafengehen seine Hände zusammenzulegen, in sie zu blasen und Surat Al-Ikhlas, Al-Falaq und An-Nas zu rezitieren, dann strich er damit über seinen Körper, beginnend mit seinem Kopf und Gesicht und dem vorderen Teil seines Körpers. Er tat dies drei Mal.",
    source: "Sahih Bukhari 5017",
    reward: "Vollständiger Schutz vor allem Übel",
  },
  {
    id: "before_sleep_surah_nas",
    category: "before_sleep",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Bismillahir-Rahmanir-Rahim. Qul a'udhu bi-Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sag: Ich nehme Zuflucht beim Herrn der Menschen. Dem König der Menschen. Dem Gott der Menschen. Vor dem Übel des Einflüsterers, der entweicht und wiederkehrt. Der in die Brüste der Menschen einflüstert. Von den Dschinn und den Menschen.",
    count: 3,
    hadith: "Der Prophet (ﷺ) pflegte vor dem Schlafengehen seine Hände zusammenzulegen, in sie zu blasen und Surat Al-Ikhlas, Al-Falaq und An-Nas zu rezitieren, dann strich er damit über seinen Körper, beginnend mit seinem Kopf und Gesicht und dem vorderen Teil seines Körpers. Er tat dies drei Mal.",
    source: "Sahih Bukhari 5017",
    reward: "Vollständiger Schutz vor allem Übel",
  },
  {
    id: "before_sleep_bismika_allahumma",
    category: "before_sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Deinem Namen, O Allah, sterbe ich und lebe ich",
    count: 1,
    hadith: "Wenn du dich zu Bett legst, sag: 'Bismika Allahumma amutu wa ahya'. Und wenn du aufwachst, sag: 'Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur'.",
    source: "Sahih Bukhari 6324",
    reward: "Erinnerung an Allah beim Schlafen und Aufwachen",
  },
  
  // After Wudu
  {
    id: "after_wudu_shahada",
    category: "after_wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh",
    translation: "Ich bezeuge, dass es keinen Gott gibt außer Allah allein, Er hat keinen Partner, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist",
    count: 1,
    hadith: "Wer Wudu vollzieht und es gut macht, dann sagt: 'Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh', dem werden die acht Tore des Paradieses geöffnet, und er kann durch welches er will eintreten.",
    source: "Sahih Muslim 234",
    reward: "Die acht Tore des Paradieses werden geöffnet",
    shortName: "Shahada nach Wudu",
  },
  
  // General Dhikr
  {
    id: "general_istighfar",
    category: "general",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "Ich bitte Allah um Vergebung",
    count: 100,
    hadith: "Der Prophet (ﷺ) sagte: 'Bei Allah, ich bitte Allah mehr als 70 Mal am Tag um Vergebung und wende mich Ihm in Reue zu.'",
    source: "Sahih Bukhari 6307",
    reward: "Vergebung der Sünden, Reinigung des Herzens",
  },
  {
    id: "general_salawat",
    category: "general",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidun Majid.",
    translation: "O Allah, segne Muhammad und die Familie Muhammads, wie Du Ibrahim und die Familie Ibrahims gesegnet hast. Wahrlich, Du bist Lobenswürdig und Ruhmreich. O Allah, gewähre Baraka für Muhammad und die Familie Muhammads, wie Du Baraka für Ibrahim und die Familie Ibrahims gewährt hast. Wahrlich, Du bist Lobenswürdig und Ruhmreich.",
    count: 10,
    hadith: "Wer einmal Salawat auf mich spricht, dem wird Allah zehn Mal Segen gewähren, zehn Sünden werden von ihm gelöscht und er wird um zehn Stufen erhöht.",
    source: "Sahih Muslim 384",
    reward: "10-facher Segen von Allah, Vergebung, Erhöhung der Stufen",
  },
  {
    id: "general_la_hawla",
    category: "general",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    translation: "Es gibt keine Macht und keine Kraft außer durch Allah",
    count: 1,
    hadith: "La hawla wa la quwwata illa billah ist ein Schatz aus den Schätzen des Paradieses.",
    source: "Sahih Bukhari 4205, Sahih Muslim 2704",
    reward: "Ein Schatz aus den Schätzen des Paradieses",
  },
  {
    id: "general_hasbunallah",
    category: "general",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    translation: "Allah genügt uns, und Er ist der beste Sachwalter",
    count: 7,
    hadith: "Dies waren die Worte, die Ibrahim (عليه السلام) sagte, als er ins Feuer geworfen wurde, und Muhammad (ﷺ) sagte sie, als ihm gesagt wurde: 'Die Menschen haben sich gegen euch versammelt, also fürchtet sie.' Aber es verstärkte nur ihren Glauben und sie sagten: 'Hasbunallahu wa ni'mal-wakil'.",
    source: "Sahih Bukhari 4563",
    reward: "Schutz vor Feinden, Stärkung des Glaubens",
  },
];

export function getDhikrByCategory(category: DhikrCategory): Dhikr[] {
  return ADHKAR.filter(dhikr => dhikr.category === category);
}

export function getAllCategories(): DhikrCategory[] {
  return ["morning", "evening", "after_prayer", "before_sleep", "after_wudu", "general"];
}

export function getCategoryName(category: DhikrCategory): string {
  const names: Record<DhikrCategory, string> = {
    morning: "Morgen-Adhkar",
    evening: "Abend-Adhkar",
    after_prayer: "Nach dem Gebet",
    before_sleep: "Vor dem Schlafen",
    after_wudu: "Nach Wudu",
    general: "Allgemeine Dhikr",
  };
  return names[category];
}

export function getDhikrById(id: string): Dhikr | undefined {
  return ADHKAR.find(dhikr => dhikr.id === id);
}

export const DHIKR_CATEGORIES: Record<DhikrCategory, { name: string; description: string }> = {
  morning: {
    name: "Morgen-Adhkar",
    description: "Erinnerungen für den Morgen nach dem Fajr-Gebet",
  },
  evening: {
    name: "Abend-Adhkar",
    description: "Erinnerungen für den Abend vor dem Maghrib-Gebet",
  },
  after_prayer: {
    name: "Nach dem Gebet",
    description: "Dhikr nach den fünf täglichen Gebeten",
  },
  before_sleep: {
    name: "Vor dem Schlafen",
    description: "Schutz-Duas und Erinnerungen vor dem Schlafengehen",
  },
  after_wudu: {
    name: "Nach Wudu",
    description: "Dhikr nach der rituellen Waschung",
  },
  general: {
    name: "Allgemeine Dhikr",
    description: "Erinnerungen für jede Zeit und Gelegenheit",
  },
};
