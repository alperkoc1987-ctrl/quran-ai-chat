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
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen...",
    count: 1,
    hadith: "Wer Ayat al-Kursi nach jedem Pflichtgebet rezitiert, dem steht nichts im Wege zum Paradies außer dem Tod.",
    source: "An-Nasa'i in Al-Kubra (9928), authentifiziert von Al-Albani",
    reward: "Schutz bis zum nächsten Gebet, Eintritt ins Paradies",
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
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen...",
    count: 1,
    hadith: "Wer Ayat al-Kursi vor dem Schlafengehen rezitiert, wird von Allah beschützt und der Satan wird sich ihm nicht nähern bis zum Morgen.",
    source: "Sahih Bukhari 2311",
    reward: "Schutz vor Satan die ganze Nacht",
  },
  {
    id: "evening_last_two_ayat_baqarah",
    category: "evening",
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ...",
    transliteration: "Amana ar-Rasulu bima unzila ilayhi min Rabbihi...",
    translation: "Der Gesandte glaubt an das, was zu ihm von seinem Herrn herabgesandt wurde...",
    count: 1,
    hadith: "Wer die letzten beiden Verse von Surat Al-Baqarah in der Nacht rezitiert, dem genügen sie (als Schutz).",
    source: "Sahih Bukhari 5009, Sahih Muslim 807",
    reward: "Ausreichender Schutz für die Nacht",
  },
  
  // After Prayer
  {
    id: "after_prayer_subhanallah_33",
    category: "after_prayer",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan Allah",
    translation: "Gepriesen sei Allah",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal Subhan Allah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und dann das 100. vervollständigt mit: La ilaha illallahu wahdahu la sharika lah..., dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung aller Sünden",
  },
  {
    id: "after_prayer_alhamdulillah_33",
    category: "after_prayer",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "Alles Lob gebührt Allah",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal Subhan Allah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und dann das 100. vervollständigt mit: La ilaha illallahu wahdahu la sharika lah..., dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung aller Sünden",
  },
  {
    id: "after_prayer_allahu_akbar_33",
    category: "after_prayer",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah ist der Größte",
    count: 33,
    hadith: "Wer nach jedem Gebet 33 Mal Subhan Allah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und dann das 100. vervollständigt mit: La ilaha illallahu wahdahu la sharika lah..., dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
    source: "Sahih Muslim 597",
    reward: "Vergebung aller Sünden",
  },
  {
    id: "after_prayer_tahlil_100",
    category: "after_prayer",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadir",
    translation: "Es gibt keinen Gott außer Allah allein, Er hat keinen Partner. Ihm gehört die Herrschaft und Ihm gebührt alles Lob, und Er hat Macht über alle Dinge",
    count: 1,
    hadith: "Dies vervollständigt die 100 nach den 33+33+33 Tasbih, Tahmid, Takbir.",
    source: "Sahih Muslim 597",
    reward: "Vervollständigung der 100, Vergebung der Sünden",
  },
  
  // Before Sleep
  {
    id: "before_sleep_ayat_kursi",
    category: "before_sleep",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen...",
    count: 1,
    hadith: "Wer Ayat al-Kursi vor dem Schlafengehen rezitiert, wird von Allah beschützt und der Satan wird sich ihm nicht nähern bis zum Morgen.",
    source: "Sahih Bukhari 2311",
    reward: "Schutz vor Satan die ganze Nacht",
  },
  {
    id: "before_sleep_al_ikhlas_falaq_nas",
    category: "before_sleep",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...",
    transliteration: "Qul Huwa Allahu Ahad... Qul A'udhu bi Rabbil-Falaq... Qul A'udhu bi Rabbin-Nas...",
    translation: "Sag: Er ist Allah, der Eine... Sag: Ich suche Zuflucht beim Herrn der Morgendämmerung... Sag: Ich suche Zuflucht beim Herrn der Menschen...",
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
    hadith: "Wenn du zu Bett gehst, sage: 'Bismika Allahumma amutu wa ahya.' Und wenn du aufwachst, sage: 'Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.'",
    source: "Sahih Bukhari 6324",
    reward: "Erinnerung an Allah beim Schlafen und Aufwachen",
  },
  
  // After Wudu
  {
    id: "after_wudu_shahada",
    category: "after_wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa Rasuluh",
    translation: "Ich bezeuge, dass es keinen Gott gibt außer Allah allein, Er hat keinen Partner, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist",
    count: 1,
    hadith: "Wer die Gebetswaschung (Wudu) perfekt vollzieht und dann sagt: 'Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa Rasuluh', dem werden die acht Tore des Paradieses geöffnet, und er kann durch welches er will eintreten.",
    source: "Sahih Muslim 234",
    reward: "Die 8 Tore des Paradieses werden geöffnet",
  },
  
  // General Dhikr
  {
    id: "general_istighfar",
    category: "general",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "Ich bitte Allah um Vergebung",
    count: 100,
    hadith: "Wer regelmäßig um Vergebung bittet, dem wird Allah einen Ausweg aus jeder Sorge schaffen und Erleichterung von jeder Bedrängnis geben und ihn von dort versorgen, wo er es nicht erwartet.",
    source: "Abu Dawud 1518, authentifiziert von Al-Albani",
    reward: "Ausweg aus Sorgen, Erleichterung, unerwartete Versorgung",
  },
  {
    id: "general_salawat",
    category: "general",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad",
    translation: "O Allah, segne Muhammad und die Familie Muhammads",
    count: 10,
    hadith: "Wer 10 Mal Salawat auf mich spricht, dem sendet Allah 100 Segnungen.",
    source: "Sahih Muslim 384",
    reward: "Allah sendet 100 Segnungen zurück",
  },
  {
    id: "general_la_hawla",
    category: "general",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    translation: "Es gibt keine Macht und keine Kraft außer durch Allah",
    count: 1,
    hadith: "Dies ist einer der Schätze des Paradieses.",
    source: "Sahih Bukhari 4205, Sahih Muslim 2704",
    reward: "Ein Schatz aus den Schätzen des Paradieses",
  },
];

export const DHIKR_CATEGORIES = {
  morning: {
    id: "morning",
    name: "Morgen-Adhkar",
    description: "Erinnerungen für den Morgen",
    icon: "sunrise",
  },
  evening: {
    id: "evening",
    name: "Abend-Adhkar",
    description: "Erinnerungen für den Abend",
    icon: "sunset",
  },
  after_prayer: {
    id: "after_prayer",
    name: "Nach dem Gebet",
    description: "Dhikr nach den Pflichtgebeten",
    icon: "prayer",
  },
  before_sleep: {
    id: "before_sleep",
    name: "Vor dem Schlafen",
    description: "Erinnerungen vor dem Schlafengehen",
    icon: "moon",
  },
  after_wudu: {
    id: "after_wudu",
    name: "Nach der Gebetswaschung",
    description: "Dhikr nach dem Wudu",
    icon: "droplet",
  },
  general: {
    id: "general",
    name: "Allgemeine Adhkar",
    description: "Dhikr für jede Zeit",
    icon: "sparkles",
  },
} as const;

export function getDhikrByCategory(category: DhikrCategory): Dhikr[] {
  return ADHKAR.filter(dhikr => dhikr.category === category);
}

export function getAllDhikr(): Dhikr[] {
  return ADHKAR;
}

export function getDhikrById(id: string): Dhikr | undefined {
  return ADHKAR.find(dhikr => dhikr.id === id);
}
