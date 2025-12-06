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
  },
  {
    id: "travel",
    name: "Reisen",
    icon: "plane",
    description: "Bittgebete für sichere Reisen"
  },
  {
    id: "exams",
    name: "Prüfungen & Lernen",
    icon: "graduation-cap",
    description: "Bittgebete für Erfolg in Prüfungen und beim Lernen"
  },
  {
    id: "anxiety",
    name: "Angst & Sorgen",
    icon: "heart-pulse",
    description: "Bittgebete bei Angst, Stress und Sorgen"
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
  },
  // Travel
  {
    id: "travel-1",
    title: "Dua beim Verlassen des Hauses",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'ala Allah, wa la hawla wa la quwwata illa billah",
    translation: "Im Namen Allahs, ich vertraue auf Allah, und es gibt keine Macht und keine Kraft außer durch Allah.",
    source: "Abu Dawud 5095",
    category: "travel"
  },
  {
    id: "travel-2",
    title: "Dua beim Besteigen eines Fahrzeugs",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhana alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
    translation: "Gepriesen sei Der, Der uns dies dienstbar gemacht hat, und wir wären nicht imstande gewesen, es zu bezähmen. Und wahrlich, zu unserem Herrn kehren wir zurück.",
    source: "Quran 43:13-14",
    category: "travel"
  },
  {
    id: "travel-3",
    title: "Dua für sichere Reise",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ وَمِنَ الْعَمَلِ مَا تَرْضَىٰ",
    transliteration: "Allahumma inna nas'aluka fi safarina hadha al-birra wa at-taqwa, wa mina al-'amali ma tarda",
    translation: "O Allah, wir bitten Dich auf dieser Reise um Rechtschaffenheit und Gottesfurcht, und um Taten, mit denen Du zufrieden bist.",
    source: "Muslim 1342",
    category: "travel"
  },
  {
    id: "travel-4",
    title: "Dua bei Rückkehr von der Reise",
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    transliteration: "Ayibuna ta'ibuna 'abiduna lirabbina hamidun",
    translation: "Wir kehren zurück, bereuen, dienen unserem Herrn und preisen Ihn.",
    source: "Sahih al-Bukhari 1797",
    category: "travel"
  },
  {
    id: "travel-5",
    title: "Dua für Schutz auf Reisen",
    arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ",
    transliteration: "Allahumma anta as-sahibu fi as-safar, wa al-khalifatu fi al-ahl",
    translation: "O Allah, Du bist der Begleiter auf der Reise und der Beschützer der Familie.",
    source: "Muslim 1342",
    category: "travel"
  },
  // Exams & Learning
  {
    id: "exams-1",
    title: "Dua für Wissen und Verständnis",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "Mein Herr, mehre mein Wissen.",
    source: "Quran 20:114",
    category: "exams"
  },
  {
    id: "exams-2",
    title: "Dua vor einer Prüfung",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزَنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alu al-hazana idha shi'ta sahla",
    translation: "O Allah, nichts ist leicht außer dem, was Du leicht machst, und Du machst das Schwierige leicht, wenn Du willst.",
    source: "Ibn Hibban 2427",
    category: "exams"
  },
  {
    id: "exams-3",
    title: "Dua für gutes Gedächtnis",
    arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي",
    transliteration: "Allahumma infa'ni bima 'allamtani wa 'allimni ma yanfa'uni",
    translation: "O Allah, lass mich von dem profitieren, was Du mich gelehrt hast, und lehre mich, was mir nützt.",
    source: "Ibn Majah 251",
    category: "exams"
  },
  {
    id: "exams-4",
    title: "Dua für Konzentration beim Lernen",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi ishrah li sadri wa yassir li amri wahlul 'uqdatan min lisani yafqahu qawli",
    translation: "Mein Herr, weite mir meine Brust, erleichtere mir meine Angelegenheit und löse den Knoten meiner Zunge, damit sie meine Rede verstehen.",
    source: "Quran 20:25-28",
    category: "exams"
  },
  {
    id: "exams-5",
    title: "Dua nach der Prüfung",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
    transliteration: "Allahumma inni a'udhu bika min 'ilmin la yanfa'",
    translation: "O Allah, ich suche Zuflucht bei Dir vor Wissen, das nicht nützt.",
    source: "Muslim 2722",
    category: "exams"
  },
  // Anxiety & Worry
  {
    id: "anxiety-1",
    title: "Dua bei Angst und Sorgen",
    arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي",
    transliteration: "Allahumma inni 'abduka ibnu 'abdika ibnu amatika, nasiyati biyadika, madin fiyya hukmuka, 'adlun fiyya qada'uka, as'aluka bikulli ismin huwa laka an taj'ala al-Qur'ana rabi'a qalbi",
    translation: "O Allah, ich bin Dein Diener, Sohn Deines Dieners, Sohn Deiner Dienerin. Mein Schicksal ist in Deiner Hand, Dein Urteil über mich ist wirksam, Deine Entscheidung über mich ist gerecht. Ich bitte Dich bei jedem Namen, der Dir gehört, dass Du den Koran zum Frühling meines Herzens machst.",
    source: "Ahmad 3712",
    category: "anxiety"
  },
  {
    id: "anxiety-2",
    title: "Dua gegen Stress",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ",
    transliteration: "Allahumma inni a'udhu bika mina al-hammi wa al-hazan wa al-'ajzi wa al-kasal",
    translation: "O Allah, ich suche Zuflucht bei Dir vor Sorge, Trauer, Schwäche und Trägheit.",
    source: "Sahih al-Bukhari 6369",
    category: "anxiety"
  },
  {
    id: "anxiety-3",
    title: "Dua für innere Ruhe",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    transliteration: "Ala bidhikri Allahi tatma'innu al-qulub",
    translation: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
    source: "Quran 13:28",
    category: "anxiety"
  },
  {
    id: "anxiety-4",
    title: "Dua bei Bedrängnis",
    arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa anta subhanaka inni kuntu mina az-zalimin",
    translation: "Es gibt keinen Gott außer Dir, gepriesen seist Du, ich war wahrlich einer der Ungerechten.",
    source: "Quran 21:87 (Dua Yunus)",
    category: "anxiety"
  },
  {
    id: "anxiety-5",
    title: "Dua für Vertrauen auf Allah",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbuna Allahu wa ni'ma al-wakil",
    translation: "Allah genügt uns, und Er ist der beste Sachwalter.",
    source: "Quran 3:173",
    category: "anxiety"
  },
  // Additional duas for existing categories
  {
    id: "healing-3",
    title: "Dua für vollständige Heilung",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي",
    transliteration: "Allahumma Rabba an-nas, adhhib al-ba'sa washfi anta ash-Shafi",
    translation: "O Allah, Herr der Menschen, nimm die Krankheit hinweg und heile, Du bist der Heiler.",
    source: "Sahih al-Bukhari 5743",
    category: "healing"
  },
  {
    id: "protection-2",
    title: "Dua für Schutz vor allem Übel",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimat Allahi at-tammati min sharri ma khalaq",
    translation: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.",
    source: "Muslim 2708",
    category: "protection"
  },
  {
    id: "patience-2",
    title: "Dua um Geduld in schweren Zeiten",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimin",
    translation: "Unser Herr, gib uns reichlich Geduld und lass uns als Muslime sterben.",
    source: "Quran 7:126",
    category: "patience"
  },
  {
    id: "guidance-2",
    title: "Dua um Rechtleitung zum geraden Weg",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdina as-sirata al-mustaqim",
    translation: "Führe uns den geraden Weg.",
    source: "Quran 1:6",
    category: "guidance"
  },
  {
    id: "repentance-2",
    title: "Dua um Vergebung und Reue",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakun anna mina al-khasirin",
    translation: "Unser Herr, wir haben uns selbst Unrecht getan, und wenn Du uns nicht vergibst und Dich unser erbarmst, werden wir gewiss zu den Verlierern gehören.",
    source: "Quran 7:23",
    category: "repentance"
  }
];

export function getDuasByCategory(categoryId: string): Dua[] {
  return duas.filter(dua => dua.category === categoryId);
}

export function getCategoryById(categoryId: string): DuaCategory | undefined {
  return duaCategories.find(cat => cat.id === categoryId);
}
