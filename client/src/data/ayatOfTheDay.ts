// Ayat des Tages - Carefully curated special and inspirational verses from the Quran
// Each verse is selected for its profound meaning and relevance to daily life

export interface AyatOfTheDay {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  arabicText: string;
  germanTranslation: string;
  theme: string;
}

export const ayatCollection: AyatOfTheDay[] = [
  {
    surahNumber: 2,
    verseNumber: 255,
    surahName: "Al-Baqarah",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    germanTranslation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen und Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört (alles), was in den Himmeln und was auf der Erde ist.",
    theme: "Ayat al-Kursi - Der Thronvers"
  },
  {
    surahNumber: 94,
    verseNumber: 5,
    surahName: "Ash-Sharh",
    arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    germanTranslation: "Denn wahrlich, mit jeder Schwierigkeit kommt Erleichterung.",
    theme: "Hoffnung in schweren Zeiten"
  },
  {
    surahNumber: 94,
    verseNumber: 6,
    surahName: "Ash-Sharh",
    arabicText: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    germanTranslation: "Wahrlich, mit jeder Schwierigkeit kommt Erleichterung.",
    theme: "Geduld und Hoffnung"
  },
  {
    surahNumber: 13,
    verseNumber: 28,
    surahName: "Ar-Ra'd",
    arabicText: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    germanTranslation: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
    theme: "Seelenfrieden durch Gedenken"
  },
  {
    surahNumber: 3,
    verseNumber: 159,
    surahName: "Ali 'Imran",
    arabicText: "فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ",
    germanTranslation: "Darum verzeihe ihnen und bitte für sie um Vergebung und ziehe sie in der Angelegenheit zu Rate.",
    theme: "Vergebung und Beratung"
  },
  {
    surahNumber: 29,
    verseNumber: 69,
    surahName: "Al-Ankabut",
    arabicText: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    germanTranslation: "Diejenigen aber, die sich um Unseretwillen abmühen, werden Wir ganz gewiß Unsere Wege leiten.",
    theme: "Anstrengung wird belohnt"
  },
  {
    surahNumber: 2,
    verseNumber: 286,
    surahName: "Al-Baqarah",
    arabicText: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    germanTranslation: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag.",
    theme: "Gottes Barmherzigkeit"
  },
  {
    surahNumber: 39,
    verseNumber: 53,
    surahName: "Az-Zumar",
    arabicText: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    germanTranslation: "Sag: O Meine Diener, die ihr gegen euch selbst maßlos gewesen seid, verliert nicht die Hoffnung auf Allahs Barmherzigkeit.",
    theme: "Hoffnung auf Vergebung"
  },
  {
    surahNumber: 65,
    verseNumber: 3,
    surahName: "At-Talaq",
    arabicText: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    germanTranslation: "Und wer auf Allah vertraut, für den ist Er seine Genüge.",
    theme: "Vertrauen auf Allah"
  },
  {
    surahNumber: 16,
    verseNumber: 97,
    surahName: "An-Nahl",
    arabicText: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
    germanTranslation: "Wer rechtschaffen handelt, ob männlich oder weiblich, und dabei gläubig ist, dem werden Wir ganz gewiß ein gutes Leben gewähren.",
    theme: "Belohnung für gute Taten"
  },
  {
    surahNumber: 3,
    verseNumber: 200,
    surahName: "Ali 'Imran",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
    germanTranslation: "O die ihr glaubt, seid standhaft und haltet in Geduld aus und seid kampfbereit und fürchtet Allah, auf daß es euch wohl ergehen möge!",
    theme: "Geduld und Standhaftigkeit"
  },
  {
    surahNumber: 49,
    verseNumber: 13,
    surahName: "Al-Hujurat",
    arabicText: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    germanTranslation: "Gewiß, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch.",
    theme: "Wahre Ehre durch Gottesfurcht"
  },
  {
    surahNumber: 2,
    verseNumber: 153,
    surahName: "Al-Baqarah",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    germanTranslation: "O die ihr glaubt, sucht Hilfe in der Standhaftigkeit und im Gebet! Allah ist mit den Standhaften.",
    theme: "Kraft durch Gebet und Geduld"
  },
  {
    surahNumber: 17,
    verseNumber: 23,
    surahName: "Al-Isra",
    arabicText: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    germanTranslation: "Und dein Herr hat bestimmt, daß ihr nur Ihm dienen und zu den Eltern gütig sein sollt.",
    theme: "Respekt vor den Eltern"
  },
  {
    surahNumber: 55,
    verseNumber: 13,
    surahName: "Ar-Rahman",
    arabicText: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    germanTranslation: "Welche der Wohltaten eures Herrn wollt ihr beide denn leugnen?",
    theme: "Dankbarkeit für Gottes Gaben"
  },
  {
    surahNumber: 20,
    verseNumber: 130,
    surahName: "Ta-Ha",
    arabicText: "فَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا",
    germanTranslation: "So sei standhaft gegenüber dem, was sie sagen, und lobpreise deinen Herrn vor dem Aufgang der Sonne und vor ihrem Untergang.",
    theme: "Lobpreisung zu allen Zeiten"
  },
  {
    surahNumber: 24,
    verseNumber: 35,
    surahName: "An-Nur",
    arabicText: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    germanTranslation: "Allah ist das Licht der Himmel und der Erde.",
    theme: "Göttliches Licht"
  },
  {
    surahNumber: 33,
    verseNumber: 41,
    surahName: "Al-Ahzab",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
    germanTranslation: "O die ihr glaubt, gedenkt Allahs in häufigem Gedenken.",
    theme: "Häufiges Gedenken Allahs"
  },
  {
    surahNumber: 25,
    verseNumber: 63,
    surahName: "Al-Furqan",
    arabicText: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا",
    germanTranslation: "Die Diener des Allerbarmers sind diejenigen, die maßvoll auf der Erde umhergehen.",
    theme: "Bescheidenheit und Demut"
  },
  {
    surahNumber: 41,
    verseNumber: 34,
    surahName: "Fussilat",
    arabicText: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
    germanTranslation: "Und nicht gleich sind die gute und die böse Tat. Wehre (das Böse) mit einer Tat ab, die besser ist.",
    theme: "Mit Gutem Böses abwehren"
  },
  {
    surahNumber: 18,
    verseNumber: 46,
    surahName: "Al-Kahf",
    arabicText: "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا",
    germanTranslation: "Besitz und Söhne sind Schmuck des diesseitigen Lebens. Was bleibenden Wert hat, die rechtschaffenen Werke, bringen besseren Lohn bei deinem Herrn.",
    theme: "Wahre Werte im Leben"
  },
  {
    surahNumber: 31,
    verseNumber: 19,
    surahName: "Luqman",
    arabicText: "وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ",
    germanTranslation: "Halte das rechte Maß in deinem Gang und dämpfe deine Stimme.",
    theme: "Anstand und gutes Benehmen"
  },
  {
    surahNumber: 57,
    verseNumber: 20,
    surahName: "Al-Hadid",
    arabicText: "اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ",
    germanTranslation: "Wisset, daß das diesseitige Leben nur Spiel und Zerstreuung ist, Schmuck und gegenseitige Prahlerei unter euch.",
    theme: "Vergänglichkeit des Diesseits"
  },
  {
    surahNumber: 4,
    verseNumber: 58,
    surahName: "An-Nisa",
    arabicText: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
    germanTranslation: "Allah befiehlt euch, die anvertrauten Güter ihren Eigentümern zurückzugeben.",
    theme: "Vertrauenswürdigkeit"
  },
  {
    surahNumber: 103,
    verseNumber: 1,
    surahName: "Al-Asr",
    arabicText: "وَالْعَصْرِ",
    germanTranslation: "Bei der Zeit!",
    theme: "Die Bedeutung der Zeit"
  },
  {
    surahNumber: 103,
    verseNumber: 2,
    surahName: "Al-Asr",
    arabicText: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    germanTranslation: "Der Mensch befindet sich wahrlich in Verlust,",
    theme: "Warnung vor Verlust"
  },
  {
    surahNumber: 103,
    verseNumber: 3,
    surahName: "Al-Asr",
    arabicText: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    germanTranslation: "außer denjenigen, die glauben und rechtschaffene Werke tun und einander die Wahrheit eindringlich empfehlen und einander zur Standhaftigkeit ermahnen.",
    theme: "Der Weg zur Rettung"
  },
  {
    surahNumber: 59,
    verseNumber: 18,
    surahName: "Al-Hashr",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
    germanTranslation: "O die ihr glaubt, fürchtet Allah. Und jede Seele schaue nach dem, was sie für morgen vorausschickt.",
    theme: "Vorbereitung auf das Jenseits"
  },
  {
    surahNumber: 7,
    verseNumber: 56,
    surahName: "Al-A'raf",
    arabicText: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا",
    germanTranslation: "Und stiftet nicht Unheil auf der Erde, nachdem sie in Ordnung gebracht worden ist, und ruft Ihn in Furcht und Begehren an.",
    theme: "Bewahrung der Schöpfung"
  },
  {
    surahNumber: 42,
    verseNumber: 40,
    surahName: "Ash-Shura",
    arabicText: "وَجَزَاءُ سَيِّئَةٍ سَيِّئَةٌ مِّثْلُهَا ۖ فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللَّهِ",
    germanTranslation: "Die Vergeltung für eine böse Tat ist eine ihr gleiche böse Tat. Wer aber verzeiht und Besserung bringt, dessen Lohn obliegt Allah.",
    theme: "Vergebung ist besser als Vergeltung"
  }
];

// Get the Ayat for today based on the day of the year
export function getTodaysAyat(): AyatOfTheDay {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Cycle through the collection
  const index = dayOfYear % ayatCollection.length;
  return ayatCollection[index];
}
