/**
 * duasData.ts
 * Authentic Duas (supplications) from Quran and Sunnah
 * Multilingual support: German (de), English (en), Turkish (tr), Arabic (ar)
 */

export interface DuaTranslations {
  de: string;
  en: string;
  tr: string;
  ar: string;
}

export interface Dua {
  id: string;
  title: DuaTranslations;
  arabic: string;
  transliteration: string;
  translation: DuaTranslations;
  source: DuaTranslations;
  category: string;
}

export interface DuaCategory {
  id: string;
  name: DuaTranslations;
  icon: string;
  description: DuaTranslations;
}

export const duaCategories: DuaCategory[] = [
  {
    id: "healing",
    name: {
      de: "Heilung",
      en: "Healing",
      tr: "Şifa",
      ar: "الشفاء"
    },
    icon: "heart-pulse",
    description: {
      de: "Bittgebete bei Krankheit und Schmerz",
      en: "Supplications for illness and pain",
      tr: "Hastalık ve acı için dualar",
      ar: "أدعية للمرض والألم"
    }
  },
  {
    id: "protection",
    name: {
      de: "Schutz",
      en: "Protection",
      tr: "Koruma",
      ar: "الحماية"
    },
    icon: "shield",
    description: {
      de: "Bittgebete um Schutz vor Übel",
      en: "Supplications for protection from evil",
      tr: "Kötülükten korunma duaları",
      ar: "أدعية للحماية من الشر"
    }
  },
  {
    id: "parents",
    name: {
      de: "Eltern",
      en: "Parents",
      tr: "Ebeveynler",
      ar: "الوالدين"
    },
    icon: "users",
    description: {
      de: "Bittgebete für die Eltern",
      en: "Supplications for parents",
      tr: "Ebeveynler için dualar",
      ar: "أدعية للوالدين"
    }
  },
  {
    id: "guidance",
    name: {
      de: "Führung",
      en: "Guidance",
      tr: "Hidayet",
      ar: "الهداية"
    },
    icon: "compass",
    description: {
      de: "Bittgebete um Rechtleitung",
      en: "Supplications for guidance",
      tr: "Doğru yol için dualar",
      ar: "أدعية للهداية"
    }
  },
  {
    id: "repentance",
    name: {
      de: "Reue",
      en: "Repentance",
      tr: "Tevbe",
      ar: "التوبة"
    },
    icon: "hand",
    description: {
      de: "Bittgebete um Vergebung",
      en: "Supplications for forgiveness",
      tr: "Bağışlanma duaları",
      ar: "أدعية للمغفرة"
    }
  },
  {
    id: "mercy",
    name: {
      de: "Barmherzigkeit",
      en: "Mercy",
      tr: "Merhamet",
      ar: "الرحمة"
    },
    icon: "hand-heart",
    description: {
      de: "Bittgebete um Allahs Gnade",
      en: "Supplications for Allah's mercy",
      tr: "Allah'ın rahmeti için dualar",
      ar: "أدعية لرحمة الله"
    }
  },
  {
    id: "children",
    name: {
      de: "Kinder",
      en: "Children",
      tr: "Çocuklar",
      ar: "الأطفال"
    },
    icon: "baby",
    description: {
      de: "Bittgebete für und über Kinder",
      en: "Supplications for and about children",
      tr: "Çocuklar için ve hakkında dualar",
      ar: "أدعية للأطفال وعنهم"
    }
  },
  {
    id: "patience",
    name: {
      de: "Geduld",
      en: "Patience",
      tr: "Sabır",
      ar: "الصبر"
    },
    icon: "hourglass",
    description: {
      de: "Bittgebete um Geduld in schweren Zeiten",
      en: "Supplications for patience in difficult times",
      tr: "Zor zamanlarda sabır duaları",
      ar: "أدعية للصبر في الأوقات الصعبة"
    }
  },
  {
    id: "strength",
    name: {
      de: "Stärke",
      en: "Strength",
      tr: "Güç",
      ar: "القوة"
    },
    icon: "zap",
    description: {
      de: "Bittgebete um innere Kraft",
      en: "Supplications for inner strength",
      tr: "İç güç için dualar",
      ar: "أدعية للقوة الداخلية"
    }
  },
  {
    id: "sleeping",
    name: {
      de: "Schlafen",
      en: "Sleeping",
      tr: "Uyku",
      ar: "النوم"
    },
    icon: "moon",
    description: {
      de: "Bittgebete vor dem Schlafengehen",
      en: "Supplications before sleeping",
      tr: "Uyumadan önce dualar",
      ar: "أدعية قبل النوم"
    }
  }
];

export const duas: Dua[] = [
  // Healing
  {
    id: "healing-1",
    title: {
      de: "Dua bei Krankheit",
      en: "Dua for Illness",
      tr: "Hastalık Duası",
      ar: "دعاء المرض"
    },
    arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Adhhib al-ba's Rabb an-nas, ishfi wa anta ash-Shafi, la shifa'a illa shifa'uk, shifaan la yughadiru saqaman",
    translation: {
      de: "Nimm die Krankheit hinweg, O Herr der Menschen! Heile, denn Du bist der Heiler. Es gibt keine Heilung außer Deiner Heilung, eine Heilung, die keine Krankheit zurücklässt.",
      en: "Remove the hardship, O Lord of mankind! Heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness.",
      tr: "Hastalığı gider ey insanların Rabbi! Şifa ver, çünkü şifa veren Sensin. Senin şifandan başka şifa yoktur, hastalık bırakmayan bir şifa.",
      ar: "أذهب الباس رب الناس، اشف وأنت الشافي، لا شفاء إلا شفاؤك، شفاءً لا يغادر سقماً"
    },
    source: {
      de: "Sahih al-Bukhari 5675",
      en: "Sahih al-Bukhari 5675",
      tr: "Sahih Buhari 5675",
      ar: "صحيح البخاري 5675"
    },
    category: "healing"
  },
  {
    id: "healing-2",
    title: {
      de: "Kurzes Heilungs-Dua",
      en: "Short Healing Dua",
      tr: "Kısa Şifa Duası",
      ar: "دعاء شفاء قصير"
    },
    arabic: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ",
    transliteration: "Bismillahi arqika, min kulli shay'in yu'dhika, min sharri kulli nafsin aw 'aynin hasidin Allahu yashfika, bismillahi arqika",
    translation: {
      de: "Im Namen Allahs spreche ich über dich, von allem, was dir schadet, vom Übel jeder Seele oder neidischen Blicks, möge Allah dich heilen, im Namen Allahs spreche ich über dich.",
      en: "In the name of Allah I recite over you, from everything that harms you, from the evil of every soul or envious eye, may Allah heal you, in the name of Allah I recite over you.",
      tr: "Allah'ın adıyla sana okuyorum, sana zarar veren her şeyden, her nefsin veya haset dolu gözün şerrinden, Allah sana şifa versin, Allah'ın adıyla sana okuyorum.",
      ar: "بسم الله أرقيك، من كل شيء يؤذيك، من شر كل نفس أو عين حاسد الله يشفيك، بسم الله أرقيك"
    },
    source: {
      de: "Sahih Muslim 2186",
      en: "Sahih Muslim 2186",
      tr: "Sahih Muslim 2186",
      ar: "صحيح مسلم 2186"
    },
    category: "healing"
  },
  // Protection
  {
    id: "protection-1",
    title: {
      de: "Morgen- und Abendschutz",
      en: "Morning and Evening Protection",
      tr: "Sabah ve Akşam Koruması",
      ar: "حماية الصباح والمساء"
    },
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi kalimat-illah at-tammat min sharri ma khalaq",
    translation: {
      de: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.",
      en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      tr: "Allah'ın mükemmel kelimelerinde, yarattığı şeylerin şerrinden sığınırım.",
      ar: "أعوذ بكلمات الله التامات من شر ما خلق"
    },
    source: {
      de: "Sahih Muslim 2708",
      en: "Sahih Muslim 2708",
      tr: "Sahih Muslim 2708",
      ar: "صحيح مسلم 2708"
    },
    category: "protection"
  },
  {
    id: "protection-2",
    title: {
      de: "Schutz vor dem bösen Blick",
      en: "Protection from Evil Eye",
      tr: "Nazardan Korunma",
      ar: "الحماية من العين الحاسدة"
    },
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bi kalimat-illah at-tammah min kulli shaytanin wa hammah wa min kulli 'aynin lammah",
    translation: {
      de: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor jedem Satan und giftigen Tier und vor jedem bösen Blick.",
      en: "I seek refuge in the perfect words of Allah from every devil and poisonous creature, and from every evil eye.",
      tr: "Allah'ın mükemmel kelimelerinde, her şeytandan, zehirli yaratıktan ve her kötü gözden sığınırım.",
      ar: "أعوذ بكلمات الله التامة من كل شيطان وهامة ومن كل عين لامة"
    },
    source: {
      de: "Sahih al-Bukhari 3371",
      en: "Sahih al-Bukhari 3371",
      tr: "Sahih Buhari 3371",
      ar: "صحيح البخاري 3371"
    },
    category: "protection"
  },
  // Parents
  {
    id: "parents-1",
    title: {
      de: "Dua für die Eltern",
      en: "Dua for Parents",
      tr: "Ebeveynler İçin Dua",
      ar: "دعاء للوالدين"
    },
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayani saghira",
    translation: {
      de: "Mein Herr, erbarme Dich ihrer, wie sie mich aufzogen, als ich klein war.",
      en: "My Lord, have mercy upon them as they brought me up when I was small.",
      tr: "Rabbim, ben küçükken beni yetiştirdikleri gibi onlara merhamet et.",
      ar: "رب ارحمهما كما ربياني صغيراً"
    },
    source: {
      de: "Quran 17:24",
      en: "Quran 17:24",
      tr: "Kuran 17:24",
      ar: "القرآن 17:24"
    },
    category: "parents"
  },
  // Guidance
  {
    id: "guidance-1",
    title: {
      de: "Dua um Rechtleitung",
      en: "Dua for Guidance",
      tr: "Hidayet Duası",
      ar: "دعاء الهداية"
    },
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahumma ihdini wa saddidni",
    translation: {
      de: "O Allah, leite mich recht und mache mich standhaft.",
      en: "O Allah, guide me and make me steadfast.",
      tr: "Allah'ım, bana hidayet ver ve beni doğru yolda sabit kıl.",
      ar: "اللهم اهدني وسددني"
    },
    source: {
      de: "Sahih Muslim 2725",
      en: "Sahih Muslim 2725",
      tr: "Sahih Muslim 2725",
      ar: "صحيح مسلم 2725"
    },
    category: "guidance"
  },
  {
    id: "guidance-2",
    title: {
      de: "Dua für den rechten Weg",
      en: "Dua for the Right Path",
      tr: "Doğru Yol Duası",
      ar: "دعاء الطريق الصحيح"
    },
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'aluka al-huda wa at-tuqa wa al-'afafa wa al-ghina",
    translation: {
      de: "O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Selbstgenügsamkeit.",
      en: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
      tr: "Allah'ım, senden hidayet, takva, iffet ve zenginlik istiyorum.",
      ar: "اللهم إني أسألك الهدى والتقى والعفاف والغنى"
    },
    source: {
      de: "Sahih Muslim 2721",
      en: "Sahih Muslim 2721",
      tr: "Sahih Muslim 2721",
      ar: "صحيح مسلم 2721"
    },
    category: "guidance"
  },
  // Repentance
  {
    id: "repentance-1",
    title: {
      de: "Sayyid al-Istighfar",
      en: "Master of Seeking Forgiveness",
      tr: "İstiğfarın Efendisi",
      ar: "سيد الاستغفار"
    },
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta Rabbi la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika ma istatat, a'udhu bika min sharri ma sana't, abu'u laka bi ni'matika 'alayy, wa abu'u bi dhanbi faghfir li, fa innahu la yaghfir adh-dhunuba illa ant",
    translation: {
      de: "O Allah, Du bist mein Herr, es gibt keinen Gott außer Dir. Du hast mich erschaffen und ich bin Dein Diener. Ich halte an Deinem Bund und Versprechen fest, so gut ich kann. Ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe. Ich erkenne Deine Gunst mir gegenüber an und ich gestehe meine Sünde ein, so vergib mir, denn wahrlich, niemand vergibt die Sünden außer Dir.",
      en: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant. I am upon Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for indeed, no one forgives sins except You.",
      tr: "Allah'ım, Sen benim Rabbimsin, Senden başka ilah yoktur. Sen beni yarattın ve ben Senin kulunum. Gücüm yettiğince ahdine ve vaadine bağlıyım. Yaptığım kötülüğün şerrinden Sana sığınırım. Bana verdiğin nimetini kabul ediyorum ve günahımı itiraf ediyorum, beni bağışla, çünkü günahları Senden başka kimse bağışlamaz.",
      ar: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت"
    },
    source: {
      de: "Sahih al-Bukhari 6306",
      en: "Sahih al-Bukhari 6306",
      tr: "Sahih Buhari 6306",
      ar: "صحيح البخاري 6306"
    },
    category: "repentance"
  },
  // Mercy
  {
    id: "mercy-1",
    title: {
      de: "Dua um Barmherzigkeit",
      en: "Dua for Mercy",
      tr: "Merhamet Duası",
      ar: "دعاء الرحمة"
    },
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fi ad-dunya hasanatan wa fi al-akhirati hasanatan wa qina 'adhab an-nar",
    translation: {
      de: "Unser Herr, gib uns im Diesseits Gutes und im Jenseits Gutes und bewahre uns vor der Strafe des Feuers.",
      en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
      tr: "Rabbimiz, bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.",
      ar: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار"
    },
    source: {
      de: "Quran 2:201",
      en: "Quran 2:201",
      tr: "Kuran 2:201",
      ar: "القرآن 2:201"
    },
    category: "mercy"
  },
  // Children
  {
    id: "children-1",
    title: {
      de: "Dua für rechtschaffene Nachkommen",
      en: "Dua for Righteous Offspring",
      tr: "Salih Evlat Duası",
      ar: "دعاء الذرية الصالحة"
    },
    arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibah, innaka sami' ad-du'a",
    translation: {
      de: "Mein Herr, schenke mir von Dir aus gute Nachkommenschaft. Du bist wahrlich der Erhörer des Bittgebets.",
      en: "My Lord, grant me from Yourself good offspring. Indeed, You are the Hearer of supplication.",
      tr: "Rabbim, bana katından iyi bir nesil bağışla. Şüphesiz Sen duayı işitensin.",
      ar: "رب هب لي من لدنك ذرية طيبة إنك سميع الدعاء"
    },
    source: {
      de: "Quran 3:38",
      en: "Quran 3:38",
      tr: "Kuran 3:38",
      ar: "القرآن 3:38"
    },
    category: "children"
  },
  // Patience
  {
    id: "patience-1",
    title: {
      de: "Dua um Geduld",
      en: "Dua for Patience",
      tr: "Sabır Duası",
      ar: "دعاء الصبر"
    },
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana",
    translation: {
      de: "Unser Herr, gieße Geduld über uns aus und festige unsere Schritte.",
      en: "Our Lord, pour upon us patience and make our steps firm.",
      tr: "Rabbimiz, üzerimize sabır yağdır ve adımlarımızı sağlamlaştır.",
      ar: "ربنا أفرغ علينا صبراً وثبت أقدامنا"
    },
    source: {
      de: "Quran 2:250",
      en: "Quran 2:250",
      tr: "Kuran 2:250",
      ar: "القرآن 2:250"
    },
    category: "patience"
  },
  // Strength
  {
    id: "strength-1",
    title: {
      de: "Dua um Stärke",
      en: "Dua for Strength",
      tr: "Güç Duası",
      ar: "دعاء القوة"
    },
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
    transliteration: "Allahumma inni a'udhu bika min al-'ajzi wa al-kasal",
    translation: {
      de: "O Allah, ich suche Zuflucht bei Dir vor Schwäche und Faulheit.",
      en: "O Allah, I seek refuge in You from weakness and laziness.",
      tr: "Allah'ım, acizlikten ve tembellikten Sana sığınırım.",
      ar: "اللهم إني أعوذ بك من العجز والكسل"
    },
    source: {
      de: "Sahih al-Bukhari 6369",
      en: "Sahih al-Bukhari 6369",
      tr: "Sahih Buhari 6369",
      ar: "صحيح البخاري 6369"
    },
    category: "strength"
  },
  // Sleeping
  {
    id: "sleeping-1",
    title: {
      de: "Dua vor dem Schlafengehen",
      en: "Dua Before Sleeping",
      tr: "Uyumadan Önce Dua",
      ar: "دعاء قبل النوم"
    },
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: {
      de: "In Deinem Namen, O Allah, sterbe ich und lebe ich.",
      en: "In Your name, O Allah, I die and I live.",
      tr: "Senin adınla Allah'ım, ölür ve yaşarım.",
      ar: "باسمك اللهم أموت وأحيا"
    },
    source: {
      de: "Sahih al-Bukhari 6312",
      en: "Sahih al-Bukhari 6312",
      tr: "Sahih Buhari 6312",
      ar: "صحيح البخاري 6312"
    },
    category: "sleeping"
  }
];

// Helper function to get category by ID
export function getCategoryById(categoryId: string): DuaCategory | undefined {
  return duaCategories.find(c => c.id === categoryId);
}

// Helper function to get Dua by ID
export function getDuaById(id: string): Dua | undefined {
  return duas.find(dua => dua.id === id);
}

// Helper function to get Duas by category
export function getDuasByCategory(categoryId: string): Dua[] {
  return duas.filter(dua => dua.category === categoryId);
}
