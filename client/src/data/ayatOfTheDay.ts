// Ayat des Tages - Carefully curated special and inspirational verses from the Quran
// Each verse is selected for its profound meaning and relevance to daily life

export interface AyatOfTheDay {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  arabicText: string;
  translations: {
    de: string;
    en: string;
    tr: string;
    ar: string;
  };
  themes: {
    de: string;
    en: string;
    tr: string;
    ar: string;
  };
}

export const ayatCollection: AyatOfTheDay[] = [
  {
    surahNumber: 2,
    verseNumber: 255,
    surahName: "Al-Baqarah",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    translations: {
      de: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen und Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört (alles), was in den Himmeln und was auf der Erde ist.",
      en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
      tr: "Allah - O'ndan başka ilah yoktur. Hayy (daima yaşayan), Kayyum (kendi kendine yeterli) olan O'dur. Uyku ve uyuklama O'na dokunmaz. Göklerde ve yerde olanların hepsi O'nundur.",
      ar: "الله - لا إله إلا هو، الحي القيوم. لا تأخذه سنة ولا نوم. له ما في السماوات وما في الأرض."
    },
    themes: {
      de: "Ayat al-Kursi - Der Thronvers",
      en: "Ayat al-Kursi - The Throne Verse",
      tr: "Ayat al-Kursi - Arş Ayeti",
      ar: "آية الكرسي - آية العرش"
    }
  },
  {
    surahNumber: 94,
    verseNumber: 5,
    surahName: "Ash-Sharh",
    arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translations: {
      de: "Denn wahrlich, mit jeder Schwierigkeit kommt Erleichterung.",
      en: "For indeed, with hardship will be ease.",
      tr: "Çünkü şüphesiz ki zorlukla birlikte kolaylık vardır.",
      ar: "فإن مع العسر يسرا"
    },
    themes: {
      de: "Hoffnung in schweren Zeiten",
      en: "Hope in Difficult Times",
      tr: "Zor Zamanlarda Umut",
      ar: "الأمل في الأوقات الصعبة"
    }
  },
  {
    surahNumber: 94,
    verseNumber: 6,
    surahName: "Ash-Sharh",
    arabicText: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translations: {
      de: "Wahrlich, mit jeder Schwierigkeit kommt Erleichterung.",
      en: "Indeed, with hardship comes ease.",
      tr: "Şüphesiz ki zorlukla birlikte kolaylık vardır.",
      ar: "إن مع العسر يسرا"
    },
    themes: {
      de: "Geduld und Hoffnung",
      en: "Patience and Hope",
      tr: "Sabır ve Umut",
      ar: "الصبر والأمل"
    }
  },
  {
    surahNumber: 13,
    verseNumber: 28,
    surahName: "Ar-Ra'd",
    arabicText: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translations: {
      de: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
      en: "Unquestionably, by the remembrance of Allah, hearts are assured.",
      tr: "Dikkat edin! Allah'ı anma ile kalpler huzur bulur.",
      ar: "ألا بذكر الله تطمئن القلوب"
    },
    themes: {
      de: "Seelenfrieden durch Gedenken",
      en: "Peace of Heart Through Remembrance",
      tr: "Zikir Yoluyla Kalp Huzuru",
      ar: "سلام القلب بالذكر"
    }
  },
  {
    surahNumber: 3,
    verseNumber: 159,
    surahName: "Ali 'Imran",
    arabicText: "فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ",
    translations: {
      de: "Darum verzeihe ihnen und bitte für sie um Vergebung und ziehe sie in der Angelegenheit zu Rate.",
      en: "So pardon them and ask forgiveness for them and consult them in the matter.",
      tr: "Onları affet, onlar için bağışlanma dile ve onları işlerde danış.",
      ar: "فاعف عنهم واستغفر لهم وشاورهم في الأمر"
    },
    themes: {
      de: "Vergebung und Beratung",
      en: "Forgiveness and Consultation",
      tr: "Affetme ve Danışma",
      ar: "العفو والشورى"
    }
  },
  {
    surahNumber: 29,
    verseNumber: 69,
    surahName: "Al-Ankabut",
    arabicText: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    translations: {
      de: "Diejenigen aber, die sich um Unseretwillen abmühen, werden Wir ganz gewiß Unsere Wege leiten.",
      en: "And those who strive for Us - We will surely guide them to Our ways.",
      tr: "Bizim için çabalayan kimseleri, elbette kendi yollarımıza iletir veririz.",
      ar: "والذين جاهدوا فينا لنهدينهم سبلنا"
    },
    themes: {
      de: "Anstrengung wird belohnt",
      en: "Effort is Rewarded",
      tr: "Çaba Ödüllendirilir",
      ar: "الجهد يُكافأ"
    }
  },
  {
    surahNumber: 2,
    verseNumber: 286,
    surahName: "Al-Baqarah",
    arabicText: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translations: {
      de: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag.",
      en: "Allah does not charge a soul except with that within its capacity.",
      tr: "Allah, bir nefsi ancak gücü kadar yükler.",
      ar: "لا يكلف الله نفسا إلا وسعها"
    },
    themes: {
      de: "Gottes Barmherzigkeit",
      en: "God's Mercy",
      tr: "Allah'ın Merhameti",
      ar: "رحمة الله"
    }
  },
  {
    surahNumber: 39,
    verseNumber: 53,
    surahName: "Az-Zumar",
    arabicText: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    translations: {
      de: "Sag: O Meine Diener, die ihr gegen euch selbst maßlos gewesen seid, verliert nicht die Hoffnung auf Allahs Barmherzigkeit.",
      en: "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah.'",
      tr: "De ki: 'Ey nefislerine zulüm yapan kullarım! Allah'ın rahmetinden ümit kesmeyiniz.'",
      ar: "قل يا عبادي الذين أسرفوا على أنفسهم لا تقنطوا من رحمة الله"
    },
    themes: {
      de: "Hoffnung auf Vergebung",
      en: "Hope for Forgiveness",
      tr: "Affedilme Umudunun",
      ar: "الأمل في المغفرة"
    }
  },
  {
    surahNumber: 65,
    verseNumber: 3,
    surahName: "At-Talaq",
    arabicText: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translations: {
      de: "Und wer auf Allah vertraut, für den ist Er seine Genüge.",
      en: "And whoever relies upon Allah - then He is sufficient for him.",
      tr: "Kim Allah'a tevekkül ederse, O ona yeter.",
      ar: "ومن يتوكل على الله فهو حسبه"
    },
    themes: {
      de: "Vertrauen auf Allah",
      en: "Trust in Allah",
      tr: "Allah'a Güven",
      ar: "الثقة بالله"
    }
  },
  {
    surahNumber: 16,
    verseNumber: 97,
    surahName: "An-Nahl",
    arabicText: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
    translations: {
      de: "Wer rechtschaffen handelt, ob männlich oder weiblich, und dabei gläubig ist, dem werden Wir ganz gewiß ein gutes Leben gewähren.",
      en: "Whoever does righteousness, whether male or female, while he or she is a believer - We will surely cause him to live a good life.",
      tr: "Kim salih amel işlerse, erkek olsun kadın olsun, mü'min olduğu halde, elbette onu güzel bir hayatla yaşatırız.",
      ar: "من عمل صالحا من ذكر أو أنثى وهو مؤمن فلنحيينه حياة طيبة"
    },
    themes: {
      de: "Belohnung für gute Taten",
      en: "Reward for Good Deeds",
      tr: "İyi İşlerin Ödülü",
      ar: "جزاء العمل الصالح"
    }
  },
  {
    surahNumber: 3,
    verseNumber: 200,
    surahName: "Ali 'Imran",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
    translations: {
      de: "O die ihr glaubt, seid standhaft und haltet in Geduld aus und seid kampfbereit und fürchtet Allah, auf daß es euch wohl ergehen möge!",
      en: "O you who have believed, persevere and endure and remain stationed and fear Allah that you might be successful.",
      tr: "Ey iman edenler! Sabredin, sabrında dayanın, rıbatta bulunun ve Allah'tan korkun ki kurtuluşa eresiniz.",
      ar: "يا أيها الذين آمنوا اصبروا وصابروا ورابطوا واتقوا الله لعلكم تفلحون"
    },
    themes: {
      de: "Geduld und Standhaftigkeit",
      en: "Patience and Perseverance",
      tr: "Sabır ve Kararlılık",
      ar: "الصبر والثبات"
    }
  },
  {
    surahNumber: 49,
    verseNumber: 13,
    surahName: "Al-Hujurat",
    arabicText: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    translations: {
      de: "Gewiß, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch.",
      en: "Indeed, the most noble of you in the sight of Allah is the most righteous of you.",
      tr: "Şüphesiz ki Allah katında en şerefliniz, en takva sahibinizdir.",
      ar: "إن أكرمكم عند الله أتقاكم"
    },
    themes: {
      de: "Wahre Ehre durch Gottesfurcht",
      en: "True Honor Through Piety",
      tr: "Takva Yoluyla Gerçek Şeref",
      ar: "الشرف الحقيقي بالتقوى"
    }
  },
  {
    surahNumber: 2,
    verseNumber: 153,
    surahName: "Al-Baqarah",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translations: {
      de: "O die ihr glaubt, sucht Hilfe in der Standhaftigkeit und im Gebet! Allah ist mit den Standhaften.",
      en: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
      tr: "Ey iman edenler! Sabır ve namaz ile yardım isteyin. Şüphesiz Allah sabredenlerle beraberdir.",
      ar: "يا أيها الذين آمنوا استعينوا بالصبر والصلاة إن الله مع الصابرين"
    },
    themes: {
      de: "Kraft durch Gebet und Geduld",
      en: "Strength Through Prayer and Patience",
      tr: "Dua ve Sabırla Güç",
      ar: "القوة بالدعاء والصبر"
    }
  },
  {
    surahNumber: 17,
    verseNumber: 23,
    surahName: "Al-Isra",
    arabicText: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    translations: {
      de: "Und dein Herr hat bestimmt, daß ihr nur Ihm dienen und zu den Eltern gütig sein sollt.",
      en: "And your Lord has decreed that you not worship except Him, and to parents, good treatment.",
      tr: "Rabbın hükmetti ki, yalnız O'na ibadette bulunun ve ana-babaya iyilik yapın.",
      ar: "وقضى ربك ألا تعبدوا إلا إياه وبالوالدين إحسانا"
    },
    themes: {
      de: "Respekt vor den Eltern",
      en: "Respect for Parents",
      tr: "Ebeveynlere Saygı",
      ar: "احترام الوالدين"
    }
  },
  {
    surahNumber: 55,
    verseNumber: 13,
    surahName: "Ar-Rahman",
    arabicText: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    translations: {
      de: "Welche der Wohltaten eures Herrn wollt ihr beide denn leugnen?",
      en: "So which of the favors of your Lord would you deny?",
      tr: "Öyleyse Rabbinizin hangi nimetini yalanlarsınız?",
      ar: "فبأي آلاء ربكما تكذبان"
    },
    themes: {
      de: "Dankbarkeit für Gottes Gaben",
      en: "Gratitude for God's Blessings",
      tr: "Allah'ın Nimetlerine Şükür",
      ar: "شكر نعم الله"
    }
  },
  {
    surahNumber: 20,
    verseNumber: 130,
    surahName: "Ta-Ha",
    arabicText: "فَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا",
    translations: {
      de: "So sei standhaft gegenüber dem, was sie sagen, und lobpreise deinen Herrn vor dem Aufgang der Sonne und vor ihrem Untergang.",
      en: "So be patient over what they say, and exalt [Allah] with praise of your Lord before the rising of the sun and before its setting.",
      tr: "Onların söylediklerine karşı sabredin ve Rabbinizi güneş doğmadan ve batmadan önce tesbih edin.",
      ar: "فاصبر على ما يقولون وسبح بحمد ربك قبل طلوع الشمس وقبل غروبها"
    },
    themes: {
      de: "Lobpreisung zu allen Zeiten",
      en: "Praise at All Times",
      tr: "Her Zaman Hamd ve Tesbih",
      ar: "التسبيح في كل وقت"
    }
  },
  {
    surahNumber: 24,
    verseNumber: 35,
    surahName: "An-Nur",
    arabicText: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    translations: {
      de: "Allah ist das Licht der Himmel und der Erde.",
      en: "Allah is the Light of the heavens and the earth.",
      tr: "Allah göklerin ve yerin nurudur.",
      ar: "الله نور السماوات والأرض"
    },
    themes: {
      de: "Göttliches Licht",
      en: "Divine Light",
      tr: "İlahi Nur",
      ar: "النور الإلهي"
    }
  },
  {
    surahNumber: 33,
    verseNumber: 41,
    surahName: "Al-Ahzab",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
    translations: {
      de: "O die ihr glaubt, gedenkt Allahs in häufigem Gedenken.",
      en: "O you who have believed, remember Allah with much remembrance.",
      tr: "Ey iman edenler! Allah'ı çok anın.",
      ar: "يا أيها الذين آمنوا اذكروا الله ذكرا كثيرا"
    },
    themes: {
      de: "Häufiges Gedenken Allahs",
      en: "Frequent Remembrance of Allah",
      tr: "Çok Zikir",
      ar: "الذكر الكثير"
    }
  },
  {
    surahNumber: 25,
    verseNumber: 63,
    surahName: "Al-Furqan",
    arabicText: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا",
    translations: {
      de: "Die Diener des Allerbarmers sind diejenigen, die maßvoll auf der Erde umhergehen.",
      en: "And the servants of the Most Merciful are those who walk upon the earth in humility.",
      tr: "Rahmân'ın kulları, yeryüzünde mütevazı bir şekilde yürüyenlerdir.",
      ar: "وعباد الرحمن الذين يمشون على الأرض هونا"
    },
    themes: {
      de: "Bescheidenheit und Demut",
      en: "Humility and Modesty",
      tr: "Tevazu ve Alçakgönüllülük",
      ar: "التواضع والتذلل"
    }
  },
  {
    surahNumber: 41,
    verseNumber: 34,
    surahName: "Fussilat",
    arabicText: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
    translations: {
      de: "Und nicht gleich sind die gute und die böse Tat. Wehre (das Böse) mit einer Tat ab, die besser ist.",
      en: "Not equal are the good deed and the bad deed. Repel [evil] by that [deed] which is better.",
      tr: "İyi ile kötü bir değildir. Kötülüğü daha güzel bir şekilde def et.",
      ar: "ولا تستوي الحسنة ولا السيئة ادفع بالتي هي أحسن"
    },
    themes: {
      de: "Mit Gutem Böses abwehren",
      en: "Repel Evil With Good",
      tr: "İyi ile Kötülüğü Def Etme",
      ar: "الدفع بالحسنة"
    }
  },
  {
    surahNumber: 18,
    verseNumber: 46,
    surahName: "Al-Kahf",
    arabicText: "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا",
    translations: {
      de: "Besitz und Söhne sind Schmuck des diesseitigen Lebens. Was bleibenden Wert hat, die rechtschaffenen Werke, bringen besseren Lohn bei deinem Herrn.",
      en: "Wealth and children are adornments of worldly life. But the everlasting good deeds are better with your Lord for reward.",
      tr: "Mal ve oğullar dünya hayatının ziynetidir. Fakat kalıcı salih amellerdir, Rabbinin katında daha hayırlı ve daha güzel sonuç verendir.",
      ar: "المال والبنون زينة الحياة الدنيا والباقيات الصالحات خير عند ربك ثوابا"
    },
    themes: {
      de: "Wahre Werte im Leben",
      en: "True Values in Life",
      tr: "Hayatta Gerçek Değerler",
      ar: "القيم الحقيقية في الحياة"
    }
  },
  {
    surahNumber: 31,
    verseNumber: 19,
    surahName: "Luqman",
    arabicText: "وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ",
    translations: {
      de: "Halte das rechte Maß in deinem Gang und dämpfe deine Stimme.",
      en: "And be moderate in your pace and lower your voice.",
      tr: "Yürüyüşünde ölçülü ol ve sesini alçalt.",
      ar: "واقصد في مشيك واغضض من صوتك"
    },
    themes: {
      de: "Anstand und gutes Benehmen",
      en: "Decorum and Good Manners",
      tr: "Adap ve İyi Davranış",
      ar: "الأدب والسلوك الحسن"
    }
  },
  {
    surahNumber: 57,
    verseNumber: 20,
    surahName: "Al-Hadid",
    arabicText: "اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ",
    translations: {
      de: "Wisset, daß das diesseitige Leben nur Spiel und Zerstreuung ist, Schmuck und gegenseitige Prahlerei unter euch.",
      en: "Know that the worldly life is but amusement and diversion and adornment and boasting to one another.",
      tr: "Bilin ki dünya hayatı ancak oyun ve eğlence, ziynet ve aranızda övünüştür.",
      ar: "اعلموا أنما الحياة الدنيا لعب ولهو وزينة وتفاخر بينكم"
    },
    themes: {
      de: "Vergänglichkeit des Diesseits",
      en: "Transience of Worldly Life",
      tr: "Dünya Hayatının Geçiciliği",
      ar: "زوال الحياة الدنيا"
    }
  },
  {
    surahNumber: 4,
    verseNumber: 58,
    surahName: "An-Nisa",
    arabicText: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
    translations: {
      de: "Allah befiehlt euch, die anvertrauten Güter ihren Eigentümern zurückzugeben.",
      en: "Indeed, Allah commands you to render trusts to whom they are due.",
      tr: "Allah size, emanetleri ehlilerine teslim etmenizi emreder.",
      ar: "إن الله يأمركم أن تؤدوا الأمانات إلى أهلها"
    },
    themes: {
      de: "Vertrauenswürdigkeit",
      en: "Trustworthiness",
      tr: "Güvenilirlik",
      ar: "الأمانة"
    }
  },
  {
    surahNumber: 103,
    verseNumber: 1,
    surahName: "Al-Asr",
    arabicText: "وَالْعَصْرِ",
    translations: {
      de: "Bei der Zeit!",
      en: "By time,",
      tr: "Asır (zaman) hakkı için,",
      ar: "والعصر"
    },
    themes: {
      de: "Die Bedeutung der Zeit",
      en: "The Importance of Time",
      tr: "Zamanın Önemi",
      ar: "أهمية الوقت"
    }
  },
  {
    surahNumber: 103,
    verseNumber: 2,
    surahName: "Al-Asr",
    arabicText: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    translations: {
      de: "Der Mensch befindet sich wahrlich in Verlust,",
      en: "Indeed, mankind is in loss,",
      tr: "İnsan şüphesiz bir ziyatta (kayıpta) bulunmaktadır.",
      ar: "إن الإنسان لفي خسر"
    },
    themes: {
      de: "Warnung vor Verlust",
      en: "Warning Against Loss",
      tr: "Kayıp Uyarısı",
      ar: "تحذير من الخسران"
    }
  },
  {
    surahNumber: 103,
    verseNumber: 3,
    surahName: "Al-Asr",
    arabicText: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    translations: {
      de: "außer denjenigen, die glauben und rechtschaffene Werke tun und einander die Wahrheit eindringlich empfehlen und einander zur Standhaftigkeit ermahnen.",
      en: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
      tr: "Ancak iman edenler, salih amel işleyenler, birbirlerine hak tavsiyesinde bulunanlar ve birbirlerine sabır tavsiyesinde bulunanlar müstesna.",
      ar: "إلا الذين آمنوا وعملوا الصالحات وتواصوا بالحق وتواصوا بالصبر"
    },
    themes: {
      de: "Der Weg zur Rettung",
      en: "The Path to Salvation",
      tr: "Kurtuluş Yolu",
      ar: "طريق النجاة"
    }
  },
  {
    surahNumber: 59,
    verseNumber: 18,
    surahName: "Al-Hashr",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
    translations: {
      de: "O die ihr glaubt, fürchtet Allah. Und jede Seele schaue nach dem, was sie für morgen vorausschickt.",
      en: "O you who have believed, fear Allah. And let every soul look to what it has put forward for tomorrow.",
      tr: "Ey iman edenler! Allah'tan korkun. Her nefs, yarın için ne gönderdiğine baksın.",
      ar: "يا أيها الذين آمنوا اتقوا الله ولتنظر نفس ما قدمت لغد"
    },
    themes: {
      de: "Vorbereitung auf das Jenseits",
      en: "Preparation for the Afterlife",
      tr: "Ahirete Hazırlık",
      ar: "الاستعداد للآخرة"
    }
  },
  {
    surahNumber: 7,
    verseNumber: 56,
    surahName: "Al-A'raf",
    arabicText: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا",
    translations: {
      de: "Und stiftet nicht Unheil auf der Erde, nachdem sie in Ordnung gebracht worden ist, und ruft Ihn in Furcht und Begehren an.",
      en: "And cause not corruption upon the earth after its reformation. And invoke Him in fear and aspiration.",
      tr: "Yeryüzünde ıslah edildikten sonra bozma yapıp, O'nu korku ve ümit içinde çağırın.",
      ar: "ولا تفسدوا في الأرض بعد إصلاحها وادعوه خوفا وطمعا"
    },
    themes: {
      de: "Bewahrung der Schöpfung",
      en: "Preservation of Creation",
      tr: "Yaratılışın Korunması",
      ar: "حماية الخلق"
    }
  },
  {
    surahNumber: 42,
    verseNumber: 40,
    surahName: "Ash-Shura",
    arabicText: "وَجَزَاءُ سَيِّئَةٍ سَيِّئَةٌ مِّثْلُهَا ۖ فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللَّهِ",
    translations: {
      de: "Die Vergeltung für eine böse Tat ist eine ihr gleiche böse Tat. Wer aber verzeiht und Besserung bringt, dessen Lohn obliegt Allah.",
      en: "And the retribution for an evil act is an evil act like thereof; but whoever pardons and makes reconciliation - his reward is [due] from Allah.",
      tr: "Kötü bir işin karşılığı, ona eşit bir kötülüktür. Fakat kim affederse ve ıslah ederse, onun ecri Allah'a aittir.",
      ar: "وجزاء سيئة سيئة مثلها فمن عفا وأصلح فأجره على الله"
    },
    themes: {
      de: "Vergebung ist besser als Vergeltung",
      en: "Forgiveness is Better Than Retaliation",
      tr: "Affetme İntikamdan Daha İyidir",
      ar: "العفو خير من الانتقام"
    }
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
