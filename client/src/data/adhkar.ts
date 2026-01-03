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
  
  // Evening Adhkar
  {
    id: "evening_ayat_kursi",
    category: "evening",
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
      de: "Wer Ayat al-Kursi vor dem Schlafengehen rezitiert, wird von Allah beschützt und der Satan wird sich ihm nicht nähern bis zum Morgen.",
      en: "Whoever recites Ayat al-Kursi before going to sleep will be protected by Allah and Satan will not come near him until morning.",
      tr: "Uyumadan önce Ayetel Kürsi'yi okuyan kimse Allah tarafından korunur ve sabaha kadar Şeytan ona yaklaşamaz.",
      ar: "من قرأ آية الكرسي عند النوم لم يزل عليه من الله حافظ ولا يقربه شيطان حتى يصبح."
    },
    source: {
      de: "Sahih Bukhari 2311",
      en: "Sahih Bukhari 2311",
      tr: "Sahih Buhari 2311",
      ar: "صحيح البخاري 2311"
    },
    reward: {
      de: "Schutz vor Satan die ganze Nacht",
      en: "Protection from Satan throughout the night",
      tr: "Gece boyunca Şeytan'dan korunma",
      ar: "الحماية من الشيطان طوال الليل"
    },
    title: "Ayat al-Kursi",
  },
  
  // Before Sleep Adhkar
  {
    id: "before_sleep_last_ayat_baqarah",
    category: "before_sleep",
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Amana ar-Rasulu bima unzila ilayhi min Rabbihi wal-mu'minun. Kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulihi la nufarriqu bayna ahadin min rusulihi wa qalu sami'na wa ata'na ghufranaka Rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha mak-tasabat. Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bihi wa'fu 'anna waghfir lana warhamna anta mawlana fansurna 'alal-qawmil-kafirin.",
    translation: {
      de: "Der Gesandte glaubt an das, was zu ihm von seinem Herrn herabgesandt wurde, und ebenso die Gläubigen. Alle glauben an Allah, Seine Engel, Seine Bücher und Seine Gesandten - wir machen keinen Unterschied zwischen Seinen Gesandten. Und sie sagen: Wir hören und gehorchen. Gewähre uns Deine Vergebung, unser Herr, und zu Dir ist die Heimkehr. Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag. Ihr kommt zugute, was sie erworben hat, und angelastet wird ihr, was sie sich zuschulden kommen ließ. Unser Herr, belange uns nicht, wenn wir vergessen oder einen Fehler begehen. Unser Herr, lege uns keine Bürde auf, wie Du sie jenen auferlegt hast, die vor uns waren. Unser Herr, bürde uns nichts auf, wozu wir keine Kraft haben. Verzeihe uns, vergib uns und erbarme Dich unser! Du bist unser Beschützer, so hilf uns gegen das ungläubige Volk.",
      en: "The Messenger believes in what has been revealed to him from his Lord, and so do the believers. Each one believes in Allah, His Angels, His Books, and His Messengers - we make no distinction between any of His Messengers. And they say: We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the final destination. Allah does not burden a soul beyond what it can bear. It will have the reward it earned, and it will suffer the consequence it deserves. Our Lord, do not punish us if we forget or make a mistake. Our Lord, do not lay upon us a burden like that which You laid upon those before us. Our Lord, do not burden us with that which we have no ability to bear. Pardon us, forgive us, and have mercy upon us. You are our Protector, so give us victory over the disbelieving people.",
      tr: "Peygamber, Rabbinden kendisine indirilene iman etti, mü'minler de. Her biri Allah'a, meleklerine, kitaplarına ve peygamberlerine iman etti. O'nun peygamberleri arasında ayırım yapmayız. Dediler ki: İşittik ve itaat ettik. Rabbimiz, mağfiretini dileriz. Dönüş ancak sanadır. Allah hiç kimseyi gücünün yetmeyeceği şeyle mükellef tutmaz. Herkesin kazandığı iyilik kendi lehinedir, kötülük de kendi aleyhinedir. Rabbimiz, unutur veya yanılırsak bizi sorumlu tutma. Rabbimiz, bize bizden öncekilere yüklediğin gibi ağır yük yükleme. Rabbimiz, gücümüzün yetmeyeceği şeyi bize yükleme. Bizi affet, bizi bağışla, bize merhamet et. Sen bizim Mevlamızsın. Kâfir topluma karşı bize yardım et.",
      ar: "آمن الرسول بما أنزل إليه من ربه والمؤمنون، كل آمن بالله وملائكته وكتبه ورسله، لا نفرق بين أحد من رسله، وقالوا سمعنا وأطعنا غفرانك ربنا وإليك المصير. لا يكلف الله نفساً إلا وسعها، لها ما كسبت وعليها ما اكتسبت، ربنا لا تؤاخذنا إن نسينا أو أخطأنا، ربنا ولا تحمل علينا إصراً كما حملته على الذين من قبلنا، ربنا ولا تحملنا ما لا طاقة لنا به، واعف عنا واغفر لنا وارحمنا، أنت مولانا فانصرنا على القوم الكافرين."
    },
    count: 1,
    hadith: {
      de: "Wer die letzten beiden Verse der Sura Al-Baqarah in der Nacht rezitiert, dem genügen sie.",
      en: "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.",
      tr: "Gece Bakara suresinin son iki ayetini okuyan kimseye bunlar yeter.",
      ar: "من قرأ بالآيتين من آخر سورة البقرة في ليلة كفتاه."
    },
    source: {
      de: "Sahih Bukhari 5009, Sahih Muslim 807",
      en: "Sahih Bukhari 5009, Sahih Muslim 807",
      tr: "Sahih Buhari 5009, Sahih Muslim 807",
      ar: "صحيح البخاري 5009، صحيح مسلم 807"
    },
    reward: {
      de: "Schutz in der Nacht, Genüge für alle Bedürfnisse",
      en: "Protection during the night, sufficiency for all needs",
      tr: "Gece korunma, tüm ihtiyaçlar için yeterlilik",
      ar: "الحماية في الليل، الكفاية لجميع الحاجات"
    },
    title: "Letzte 2 Verse Al-Baqarah",
  },
  {
    id: "before_sleep_bismillah",
    category: "before_sleep",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
    transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uhu. In amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin.",
    translation: {
      de: "In Deinem Namen, mein Herr, lege ich mich nieder, und in Deinem Namen werde ich aufstehen. Wenn Du meine Seele zu Dir nimmst, so erbarme Dich ihrer, und wenn Du sie zurücksendest, so beschütze sie, wie Du Deine rechtschaffenen Diener beschützt.",
      en: "In Your name, my Lord, I lie down and in Your name I rise. If You take my soul, have mercy upon it, and if You send it back, protect it as You protect Your righteous servants.",
      tr: "Senin adınla Rabbim, yanıma uzanıyorum ve seninle kalkacağım. Eğer canımı alırsan ona merhamet et, eğer geri gönderirsen onu salih kullarını koruduğun gibi koru.",
      ar: "باسمك ربي وضعت جنبي وبك أرفعه، إن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين."
    },
    count: 1,
    hadith: {
      de: "Wenn du zu Bett gehst, sprich: 'Bismika Rabbi wada'tu janbi...'",
      en: "When you go to bed, say: 'Bismika Rabbi wada'tu janbi...'",
      tr: "Yatağa girdiğinde şöyle söyle: 'Bismika Rabbi vada'tu cenbi...'",
      ar: "إذا أويت إلى فراشك فقل: باسمك ربي وضعت جنبي..."
    },
    source: {
      de: "Sahih Bukhari 6320, Sahih Muslim 2714",
      en: "Sahih Bukhari 6320, Sahih Muslim 2714",
      tr: "Sahih Buhari 6320, Sahih Muslim 2714",
      ar: "صحيح البخاري 6320، صحيح مسلم 2714"
    },
    reward: {
      de: "Schutz während des Schlafs, Barmherzigkeit Allahs",
      en: "Protection during sleep, mercy of Allah",
      tr: "Uyku sırasında korunma, Allah'ın rahmeti",
      ar: "الحماية أثناء النوم، رحمة الله"
    },
    title: "Schlaf-Dua",
  },
  
  // After Wudu
  {
    id: "after_wudu_shahada",
    category: "after_wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
    translation: {
      de: "Ich bezeuge, dass es keinen Gott gibt außer Allah allein, Er hat keinen Partner, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist.",
      en: "I bear witness that there is no deity except Allah alone, He has no partner, and I bear witness that Muhammad is His servant and messenger.",
      tr: "Şehadet ederim ki Allah'tan başka ilah yoktur, O tektir, ortağı yoktur ve şehadet ederim ki Muhammed O'nun kulu ve elçisidir.",
      ar: "أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله."
    },
    count: 1,
    hadith: {
      de: "Wer die Gebetswaschung vollzieht und dann sagt: 'Ashhadu an la ilaha illallah...', dem werden die acht Tore des Paradieses geöffnet, und er darf durch welches er will eintreten.",
      en: "Whoever performs ablution and then says: 'Ashhadu an la ilaha illallah...', the eight gates of Paradise will be opened for him, and he may enter through whichever he wishes.",
      tr: "Kim abdest alır ve sonra 'Eşhedü en la ilahe illallah...' derse, Cennetin sekiz kapısı ona açılır ve dilediği kapıdan girebilir.",
      ar: "من توضأ فأحسن الوضوء ثم قال: أشهد أن لا إله إلا الله... فتحت له أبواب الجنة الثمانية يدخل من أيها شاء."
    },
    source: {
      de: "Sahih Muslim 234",
      en: "Sahih Muslim 234",
      tr: "Sahih Muslim 234",
      ar: "صحيح مسلم 234"
    },
    reward: {
      de: "Öffnung der acht Tore des Paradieses",
      en: "Opening of the eight gates of Paradise",
      tr: "Cennetin sekiz kapısının açılması",
      ar: "فتح أبواب الجنة الثمانية"
    },
    title: "Shahada nach Wudu",
  },
  {
    id: "morning_subhanallah_azim",
    category: "morning",
    arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahil-Azim wa bihamdihi",
    translation: {
      de: "Gepriesen sei Allah, der Allmächtige, und Ihm gebührt alles Lob",
      en: "Glory be to Allah, the Magnificent, and praise be to Him",
      tr: "Yüce Allah'ı tüm eksikliklerden tenzih ederim ve O'na hamd ederim",
      ar: "سبحان الله العظيم وبحمده"
    },
    count: 100,
    hadith: {
      de: "Zwei Worte, die leicht auf der Zunge sind, schwer in der Waage und geliebt vom Barmherzigen: Subhan Allahil-Azim wa bihamdihi, Subhan Allahil-Azim.",
      en: "Two words that are light on the tongue, heavy on the scale, and beloved to the Most Merciful: Subhan Allahil-Azim wa bihamdihi, Subhan Allahil-Azim.",
      tr: "Dilde hafif, mizanda ağır ve Rahman'ın sevdiği iki kelime: Sübhanallahil Azim ve bihamdihi, Sübhanallahil Azim.",
      ar: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله العظيم وبحمده، سبحان الله العظيم."
    },
    source: {
      de: "Sahih Bukhari 6406, Sahih Muslim 2694",
      en: "Sahih Bukhari 6406, Sahih Muslim 2694",
      tr: "Sahih Buhari 6406, Sahih Muslim 2694",
      ar: "صحيح البخاري 6406، صحيح مسلم 2694"
    },
    reward: {
      de: "Schwer in der Waage am Tag des Gerichts, geliebt von Allah",
      en: "Heavy on the scale on the Day of Judgment, beloved to Allah",
      tr: "Kıyamet gününde mizanda ağır, Allah'ın sevdiği",
      ar: "ثقيلة في الميزان يوم القيامة، محبوبة عند الله"
    },
    title: "Tasbih Al-Azim 100x",
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
