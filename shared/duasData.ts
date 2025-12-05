export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  category: string;
}

export interface DuaCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const duaCategories: DuaCategory[] = [
  {
    id: "children",
    name: "Kinder",
    icon: "baby",
    description: "Bittgebete für und über Kinder"
  },
  {
    id: "devotion",
    name: "Hingabe",
    icon: "heart",
    description: "Bittgebete für spirituelle Nähe zu Allah"
  },
  {
    id: "guidance",
    name: "Führung",
    icon: "compass",
    description: "Bittgebete um Rechtleitung"
  },
  {
    id: "healing",
    name: "Heilung",
    icon: "heart-pulse",
    description: "Bittgebete bei Krankheit und Schmerz"
  },
  {
    id: "hereafter",
    name: "Jenseits",
    icon: "infinity",
    description: "Bittgebete für das Leben nach dem Tod"
  },
  {
    id: "marriage",
    name: "Ehe",
    icon: "heart-handshake",
    description: "Bittgebete für Ehe und Partnerschaft"
  },
  {
    id: "mercy",
    name: "Barmherzigkeit",
    icon: "hand-heart",
    description: "Bittgebete um Allahs Gnade"
  },
  {
    id: "parents",
    name: "Eltern",
    icon: "users",
    description: "Bittgebete für die Eltern"
  },
  {
    id: "patience",
    name: "Geduld",
    icon: "hourglass",
    description: "Bittgebete um Geduld in schweren Zeiten"
  },
  {
    id: "protection",
    name: "Schutz",
    icon: "shield",
    description: "Bittgebete um Schutz vor Übel"
  },
  {
    id: "repentance",
    name: "Reue",
    icon: "hand",
    description: "Bittgebete um Vergebung"
  },
  {
    id: "righteous-company",
    name: "Rechtschaffene Gesellschaft",
    icon: "users-round",
    description: "Bittgebete für gute Gefährten"
  },
  {
    id: "sleeping",
    name: "Schlafen",
    icon: "moon",
    description: "Bittgebete vor dem Schlafengehen"
  },
  {
    id: "strength",
    name: "Stärke",
    icon: "zap",
    description: "Bittgebete um innere Kraft"
  }
];

export const duas: Dua[] = [
  // Healing
  {
    id: "healing-1",
    title: "Dua bei Krankheit",
    arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Adhhib al-ba's Rabb an-nas, ishfi wa anta ash-Shafi, la shifa'a illa shifa'uk, shifaan la yughadiru saqaman",
    translation: "Nimm die Krankheit hinweg, O Herr der Menschen! Heile, denn Du bist der Heiler. Es gibt keine Heilung außer Deiner Heilung, eine Heilung, die keine Krankheit zurücklässt.",
    source: "Sahih al-Bukhari 5675",
    category: "healing"
  },
  {
    id: "healing-2",
    title: "Kurzes Heilungs-Dua",
    arabic: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ",
    transliteration: "Bismillahi arqika, min kulli shay'in yu'dhika, min sharri kulli nafsin aw 'aynin hasidin Allahu yashfika, bismillahi arqika",
    translation: "Im Namen Allahs spreche ich über dich, von allem, was dir schadet, vom Übel jeder Seele oder neidischen Blicks, möge Allah dich heilen, im Namen Allahs spreche ich über dich.",
    source: "Sahih Muslim 2186",
    category: "healing"
  },
  // Protection
  {
    id: "protection-1",
    title: "Morgen- und Abendschutz",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi kalimat-illah at-tammat min sharri ma khalaq",
    translation: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.",
    source: "Sahih Muslim 2708",
    category: "protection"
  },
  {
    id: "protection-2",
    title: "Schutz vor dem bösen Blick",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bi kalimat-illah at-tammah min kulli shaytanin wa hammah wa min kulli 'aynin lammah",
    translation: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor jedem Satan und giftigen Tier und vor jedem bösen Blick.",
    source: "Sahih al-Bukhari 3371",
    category: "protection"
  },
  // Parents
  {
    id: "parents-1",
    title: "Dua für die Eltern",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayani saghira",
    translation: "Mein Herr, erbarme Dich ihrer, wie sie mich aufzogen, als ich klein war.",
    source: "Quran 17:24",
    category: "parents"
  },
  // Guidance
  {
    id: "guidance-1",
    title: "Dua um Rechtleitung",
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahumma ihdini wa saddidni",
    translation: "O Allah, leite mich recht und mache mich standhaft.",
    source: "Sahih Muslim 2725",
    category: "guidance"
  },
  {
    id: "guidance-2",
    title: "Dua für den rechten Weg",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'aluka al-huda wa at-tuqa wa al-'afafa wa al-ghina",
    translation: "O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Selbstgenügsamkeit.",
    source: "Sahih Muslim 2721",
    category: "guidance"
  },
  // Patience
  {
    id: "patience-1",
    title: "Dua um Geduld",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana",
    translation: "Unser Herr, gieße Geduld über uns aus und festige unsere Schritte.",
    source: "Quran 2:250",
    category: "patience"
  },
  // Repentance
  {
    id: "repentance-1",
    title: "Sayyid al-Istighfar (Meister der Vergebungsbitte)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta Rabbi la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika ma istatat, a'udhu bika min sharri ma sana't, abu'u laka bi ni'matika 'alayy, wa abu'u bi dhanbi faghfir li, fa innahu la yaghfir adh-dhunuba illa ant",
    translation: "O Allah, Du bist mein Herr, es gibt keinen Gott außer Dir. Du hast mich erschaffen und ich bin Dein Diener. Ich halte an Deinem Bund und Versprechen fest, so gut ich kann. Ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe. Ich erkenne Deine Gunst mir gegenüber an und ich gestehe meine Sünde ein, so vergib mir, denn wahrlich, niemand vergibt die Sünden außer Dir.",
    source: "Sahih al-Bukhari 6306",
    category: "repentance"
  },
  // Sleeping
  {
    id: "sleeping-1",
    title: "Dua vor dem Schlafengehen",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Deinem Namen, O Allah, sterbe ich und lebe ich.",
    source: "Sahih al-Bukhari 6312",
    category: "sleeping"
  },
  {
    id: "sleeping-2",
    title: "Ayat al-Kursi vor dem Schlafen",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration: "Allahu la ilaha illa huwa al-Hayy al-Qayyum, la ta'khudhuhu sinatun wa la nawm",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf.",
    source: "Quran 2:255",
    category: "sleeping"
  },
  // Strength
  {
    id: "strength-1",
    title: "Dua um Stärke",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
    transliteration: "Allahumma inni a'udhu bika min al-'ajzi wa al-kasal",
    translation: "O Allah, ich suche Zuflucht bei Dir vor Schwäche und Faulheit.",
    source: "Sahih al-Bukhari 6369",
    category: "strength"
  },
  // Mercy
  {
    id: "mercy-1",
    title: "Dua um Barmherzigkeit",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fi ad-dunya hasanatan wa fi al-akhirati hasanatan wa qina 'adhab an-nar",
    translation: "Unser Herr, gib uns im Diesseits Gutes und im Jenseits Gutes und bewahre uns vor der Strafe des Feuers.",
    source: "Quran 2:201",
    category: "mercy"
  },
  // Children
  {
    id: "children-1",
    title: "Dua für rechtschaffene Nachkommen",
    arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibah, innaka sami' ad-du'a",
    translation: "Mein Herr, schenke mir von Dir aus gute Nachkommenschaft. Du bist wahrlich der Erhörer des Bittgebets.",
    source: "Quran 3:38",
    category: "children"
  },
  // Marriage
  {
    id: "marriage-1",
    title: "Dua für Ehepartner",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
    translation: "Unser Herr, schenke uns an unseren Gattinnen und unseren Nachkommen Grund zur Freude.",
    source: "Quran 25:74",
    category: "marriage"
  },
  // Devotion
  {
    id: "devotion-1",
    title: "Dua für spirituelle Nähe",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi ishrah li sadri wa yassir li amri",
    translation: "Mein Herr, weite mir meine Brust und erleichtere mir meine Angelegenheit.",
    source: "Quran 20:25-26",
    category: "devotion"
  },
  // Hereafter
  {
    id: "hereafter-1",
    title: "Dua für das Jenseits",
    arabic: "رَبَّنَا آتِنَا فِي الْآخِرَةِ حَسَنَةً",
    transliteration: "Rabbana atina fi al-akhirati hasanah",
    translation: "Unser Herr, gib uns im Jenseits Gutes.",
    source: "Quran 2:201",
    category: "hereafter"
  },
  // Righteous Company
  {
    id: "righteous-company-1",
    title: "Dua für gute Gefährten",
    arabic: "رَبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ",
    transliteration: "Rabbi anzilni munzalan mubarakan wa anta khayru al-munzilin",
    translation: "Mein Herr, lass mich an einem gesegneten Ort niedergehen, und Du bist der Beste, der niedergehen lässt.",
    source: "Quran 23:29",
    category: "righteous-company"
  }
];

export function getDuasByCategory(categoryId: string): Dua[] {
  return duas.filter(dua => dua.category === categoryId);
}

export function getCategoryById(categoryId: string): DuaCategory | undefined {
  return duaCategories.find(cat => cat.id === categoryId);
}
