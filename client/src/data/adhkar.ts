/**
 * adhkar.ts
 * Authentic Adhkar (remembrances) with Hadiths following Ahlul Sunnah
 * Sources: Sahih Bukhari, Sahih Muslim, Abu Dawud, Tirmidhi, Ibn Majah
 * 
 * Multilingual support: German (de), English (en), Turkish (tr), Arabic (ar)
 */

export interface DhikrTranslations {
  de: string;
  en: string;
  tr: string;
  ar: string;
}

export interface Dhikr {
  id: string;
  category: DhikrCategory;
  arabic: string;
  transliteration: string;
  translation: DhikrTranslations;
  count: number; // Recommended repetitions
  hadith: DhikrTranslations;
  source: DhikrTranslations; // Hadith reference
  reward: DhikrTranslations; // Fadl/Benefit
  audioUrl?: string;
  title?: string; // Display title for list and header (e.g., "Ayat al-Kursi", "Letzte 2 Verse Al-Baqarah")
  shortName?: string; // Deprecated: use title instead
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
    translation: {
      de: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es denn, der bei Ihm Fürsprache einlegen könnte - außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, doch sie umfassen nichts von Seinem Wissen - außer, was Er will. Sein Thronschemel umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Er ist der Erhabene und Allgewaltige.",
      en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Throne extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      tr: "Allah, O'ndan başka ilah yoktur. Diri ve Kayyum olan O'dur. O'nu ne uyuklama tutar ne de uyku. Göklerde ve yerde ne varsa hepsi O'nundur. İzni olmadan O'nun katında kim şefaat edebilir? O, kulların önlerindeki ve arkalarındaki her şeyi bilir. Onlar, O'nun ilminden, kendisinin dilediği kadarından başka bir şeyi kavrayamazlar. O'nun Kürsüsü gökleri ve yeri kaplayıp kuşatmıştır. Onların korunması O'na güç gelmez. O, yüceler yücesi ve pek büyüktür.",
      ar: "الله لا إله إلا هو الحي القيوم، لا تأخذه سنة ولا نوم، له ما في السماوات وما في الأرض، من ذا الذي يشفع عنده إلا بإذنه، يعلم ما بين أيديهم وما خلفهم، ولا يحيطون بشيء من علمه إلا بما شاء، وسع كرسيه السماوات والأرض، ولا يؤوده حفظهما، وهو العلي العظيم."
    },
    count: 1,
    hadith: {
      de: "Wer Ayat al-Kursi nach jedem Pflichtgebet rezitiert, dem steht nichts im Wege zum Paradies außer dem Tod.",
      en: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing stands between him and Paradise except death.",
      tr: "Her farz namazdan sonra Ayetel Kürsi'yi okuyan kimse ile Cennet arasında ölümden başka bir engel yoktur.",
      ar: "من قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت."
    },
    source: {
      de: "An-Nasa'i in Al-Kubra (9928), authentifiziert von Al-Albani",
      en: "An-Nasa'i in Al-Kubra (9928), authenticated by Al-Albani",
      tr: "Nesei, El-Kübra'da (9928), El-Albani tarafından sahih kabul edilmiştir",
      ar: "النسائي في الكبرى (9928)، صححه الألباني"
    },
    reward: {
      de: "Schutz bis zum nächsten Gebet, Eintritt ins Paradies",
      en: "Protection until the next prayer, entry into Paradise",
      tr: "Bir sonraki namaza kadar koruma, Cennete giriş",
      ar: "الحماية حتى الصلاة التالية، دخول الجنة"
    },
    title: "Ayat al-Kursi",
  },
  {
    id: "morning_subhanallah_100",
    category: "morning",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahi wa bihamdihi",
    translation: {
      de: "Gepriesen sei Allah und Ihm gebührt alles Lob",
      en: "Glory be to Allah and praise be to Him",
      tr: "Allah'ı tüm eksikliklerden tenzih ederim ve O'na hamd ederim",
      ar: "سبحان الله وبحمده"
    },
    count: 100,
    hadith: {
      de: "Wer 100 Mal am Tag sagt: 'Subhan Allahi wa bihamdihi', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
      en: "Whoever says 'Subhan Allahi wa bihamdihi' 100 times a day, his sins will be forgiven even if they are like the foam of the sea.",
      tr: "Günde 100 kez 'Sübhanallahi ve bihamdihi' diyen kimsenin günahları, deniz köpüğü kadar olsa bile bağışlanır.",
      ar: "من قال: سبحان الله وبحمده، في يوم مائة مرة، حطت خطاياه وإن كانت مثل زبد البحر."
    },
    source: {
      de: "Sahih Bukhari 6405, Sahih Muslim 2691",
      en: "Sahih Bukhari 6405, Sahih Muslim 2691",
      tr: "Sahih Buhari 6405, Sahih Muslim 2691",
      ar: "صحيح البخاري 6405، صحيح مسلم 2691"
    },
    reward: {
      de: "Vergebung aller Sünden, selbst wenn sie wie Meeresschaum sind",
      en: "Forgiveness of all sins, even if they are like sea foam",
      tr: "Deniz köpüğü kadar olsa bile tüm günahların bağışlanması",
      ar: "مغفرة جميع الذنوب ولو كانت مثل زبد البحر"
    },
    title: "Tasbih 100x",
  },
  {
    id: "morning_la_ilaha_illallah",
    category: "morning",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadir",
    translation: {
      de: "Es gibt keinen Gott außer Allah allein, Er hat keinen Partner. Ihm gehört die Herrschaft und Ihm gebührt alles Lob, und Er hat Macht über alle Dinge",
      en: "There is no deity except Allah alone, He has no partner. To Him belongs sovereignty and to Him belongs all praise, and He has power over all things",
      tr: "Allah'tan başka ilah yoktur, O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nadır ve O her şeye kadirdir",
      ar: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير"
    },
    count: 100,
    hadith: {
      de: "Wer dies 100 Mal am Tag sagt, erhält die Belohnung, als hätte er 100 Sklaven befreit, und 100 gute Taten werden für ihn aufgeschrieben, und 100 schlechte Taten werden von ihm gelöscht, und es ist ein Schutz vor dem Satan für diesen Tag.",
      en: "Whoever says this 100 times a day will have the reward of freeing 100 slaves, and 100 good deeds will be recorded for him, and 100 bad deeds will be erased from him, and it will be a protection from Satan for that day.",
      tr: "Bunu günde 100 kez söyleyen kimse, 100 köle azat etmiş gibi sevap kazanır, 100 iyilik yazılır, 100 kötülüğü silinir ve o gün Şeytan'dan korunur.",
      ar: "من قالها مائة مرة في يوم كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة، وكانت له حرزاً من الشيطان يومه ذلك."
    },
    source: {
      de: "Sahih Bukhari 3293, Sahih Muslim 2691",
      en: "Sahih Bukhari 3293, Sahih Muslim 2691",
      tr: "Sahih Buhari 3293, Sahih Muslim 2691",
      ar: "صحيح البخاري 3293، صحيح مسلم 2691"
    },
    reward: {
      de: "Belohnung wie 100 befreite Sklaven, 100 Hasanat, Schutz vor Satan",
      en: "Reward like freeing 100 slaves, 100 good deeds, protection from Satan",
      tr: "100 köle azat etme sevabı, 100 sevap, Şeytan'dan korunma",
      ar: "أجر كعتق مائة رقبة، مائة حسنة، حماية من الشيطان"
    },
    title: "Tahlil 100x",
  },
  
  // After Prayer Adhkar
  {
    id: "after_prayer_subhanallah",
    category: "after_prayer",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan Allah",
    translation: {
      de: "Gepriesen sei Allah",
      en: "Glory be to Allah",
      tr: "Allah'ı tüm eksikliklerden tenzih ederim",
      ar: "سبحان الله"
    },
    count: 33,
    hadith: {
      de: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
      en: "Whoever says SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 33 times after every prayer, and concludes with 'La ilaha illallahu wahdahu la sharika lah...', his sins will be forgiven even if they are like the foam of the sea.",
      tr: "Her namazdan sonra 33 kez Sübhanallah, 33 kez Elhamdülillah, 33 kez Allahu Ekber diyen ve sonunda 'La ilahe illallahu vahdehü la şerike leh...' diyen kimsenin günahları deniz köpüğü kadar olsa bile bağışlanır.",
      ar: "من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، وقال تمام المائة: لا إله إلا الله وحده لا شريك له... غفرت خطاياه وإن كانت مثل زبد البحر."
    },
    source: {
      de: "Sahih Muslim 597",
      en: "Sahih Muslim 597",
      tr: "Sahih Muslim 597",
      ar: "صحيح مسلم 597"
    },
    reward: {
      de: "Vergebung der Sünden",
      en: "Forgiveness of sins",
      tr: "Günahların bağışlanması",
      ar: "مغفرة الذنوب"
    },
    title: "Tasbih 33x",
  },
  {
    id: "after_prayer_alhamdulillah",
    category: "after_prayer",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: {
      de: "Alles Lob gebührt Allah",
      en: "All praise is due to Allah",
      tr: "Hamd Allah'a mahsustur",
      ar: "الحمد لله"
    },
    count: 33,
    hadith: {
      de: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
      en: "Whoever says SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 33 times after every prayer, and concludes with 'La ilaha illallahu wahdahu la sharika lah...', his sins will be forgiven even if they are like the foam of the sea.",
      tr: "Her namazdan sonra 33 kez Sübhanallah, 33 kez Elhamdülillah, 33 kez Allahu Ekber diyen ve sonunda 'La ilahe illallahu vahdehü la şerike leh...' diyen kimsenin günahları deniz köpüğü kadar olsa bile bağışlanır.",
      ar: "من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، وقال تمام المائة: لا إله إلا الله وحده لا شريك له... غفرت خطاياه وإن كانت مثل زبد البحر."
    },
    source: {
      de: "Sahih Muslim 597",
      en: "Sahih Muslim 597",
      tr: "Sahih Muslim 597",
      ar: "صحيح مسلم 597"
    },
    reward: {
      de: "Vergebung der Sünden",
      en: "Forgiveness of sins",
      tr: "Günahların bağışlanması",
      ar: "مغفرة الذنوب"
    },
    title: "Tahmid 33x",
  },
  {
    id: "after_prayer_allahu_akbar",
    category: "after_prayer",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: {
      de: "Allah ist der Größte",
      en: "Allah is the Greatest",
      tr: "Allah en büyüktür",
      ar: "الله أكبر"
    },
    count: 33,
    hadith: {
      de: "Wer nach jedem Gebet 33 Mal SubhanAllah, 33 Mal Alhamdulillah und 33 Mal Allahu Akbar sagt, und zum Abschluss sagt: 'La ilaha illallahu wahdahu la sharika lah...', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.",
      en: "Whoever says SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 33 times after every prayer, and concludes with 'La ilaha illallahu wahdahu la sharika lah...', his sins will be forgiven even if they are like the foam of the sea.",
      tr: "Her namazdan sonra 33 kez Sübhanallah, 33 kez Elhamdülillah, 33 kez Allahu Ekber diyen ve sonunda 'La ilahe illallahu vahdehü la şerike leh...' diyen kimsenin günahları deniz köpüğü kadar olsa bile bağışlanır.",
      ar: "من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، وقال تمام المائة: لا إله إلا الله وحده لا شريك له... غفرت خطاياه وإن كانت مثل زبد البحر."
    },
    source: {
      de: "Sahih Muslim 597",
      en: "Sahih Muslim 597",
      tr: "Sahih Muslim 597",
      ar: "صحيح مسلم 597"
    },
    reward: {
      de: "Vergebung der Sünden",
      en: "Forgiveness of sins",
      tr: "Günahların bağışlanması",
      ar: "مغفرة الذنوب"
    },
    title: "Takbir 33x",
  },
  
  // General Adhkar
  {
    id: "general_astaghfirullah",
    category: "general",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: {
      de: "Ich bitte Allah um Vergebung",
      en: "I seek forgiveness from Allah",
      tr: "Allah'tan bağışlanma dilerim",
      ar: "أستغفر الله"
    },
    count: 100,
    hadith: {
      de: "Der Prophet (ﷺ) sagte: 'Bei Allah, ich bitte Allah mehr als 70 Mal am Tag um Vergebung und wende mich Ihm in Reue zu.'",
      en: "The Prophet (ﷺ) said: 'By Allah, I seek Allah's forgiveness and turn to Him in repentance more than 70 times a day.'",
      tr: "Peygamber (s.a.v.) şöyle buyurdu: 'Allah'a yemin ederim ki, ben günde 70 defadan fazla Allah'tan bağışlanma diler ve O'na dönerim.'",
      ar: "قال النبي صلى الله عليه وسلم: والله إني لأستغفر الله وأتوب إليه في اليوم أكثر من سبعين مرة."
    },
    source: {
      de: "Sahih Bukhari 6307",
      en: "Sahih Bukhari 6307",
      tr: "Sahih Buhari 6307",
      ar: "صحيح البخاري 6307"
    },
    reward: {
      de: "Vergebung der Sünden, Reinigung des Herzens",
      en: "Forgiveness of sins, purification of the heart",
      tr: "Günahların bağışlanması, kalbin temizlenmesi",
      ar: "مغفرة الذنوب، تطهير القلب"
    },
    title: "Istighfar 100x",
  },
];

// Helper function to get category name key for translations
export function getCategoryNameKey(category: DhikrCategory): string {
  const categoryMap: Record<DhikrCategory, string> = {
    morning: "morningDhikr",
    evening: "eveningDhikr",
    after_prayer: "afterPrayer",
    before_sleep: "beforeSleep",
    after_wudu: "afterWudu",
    general: "generalDhikr",
  };
  return categoryMap[category];
}

// Helper function to get category description key for translations
export function getCategoryDescKey(category: DhikrCategory): string {
  const categoryMap: Record<DhikrCategory, string> = {
    morning: "morningDhikrDesc",
    evening: "eveningDhikrDesc",
    after_prayer: "afterPrayerDesc",
    before_sleep: "beforeSleepDesc",
    after_wudu: "afterWuduDesc",
    general: "generalDhikrDesc",
  };
  return categoryMap[category];
}

// Helper function to get Dhikr by ID
export function getDhikrById(id: string): Dhikr | undefined {
  return ADHKAR.find(dhikr => dhikr.id === id);
}
