/**
 * prophetStories.ts
 * Comprehensive data for Islamic prophet stories with Quranic verses and narratives
 */

export interface ProphetStoryDetail {
  id: string;
  prophet: string;
  prophetArabic: string;
  title: string;
  description: string;
  gradient: string;
  story: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      verses?: {
        reference: string;
        arabic: string;
        translation: string;
      }[];
    }[];
    lessons: string[];
  };
}

export const prophetStoriesData: ProphetStoryDetail[] = [
  {
    id: "adam",
    prophet: "Adam",
    prophetArabic: "آدم",
    title: "Prophet Adam (as)",
    description: "Die Erschaffung des ersten Menschen und die Prüfung im Paradies",
    gradient: "from-emerald-500 to-teal-600",
    story: {
      introduction: "Adam (Friede sei mit ihm) war der erste Mensch und Prophet, den Allah erschuf. Seine Geschichte lehrt uns über die Erschaffung der Menschheit, den freien Willen, die Reue und Allahs unendliche Barmherzigkeit.",
      sections: [
        {
          title: "Die Erschaffung Adams",
          content: "Allah erschuf Adam aus Lehm und hauchte ihm von Seinem Geist ein. Er lehrte Adam die Namen aller Dinge und erhob ihn über die Engel durch dieses Wissen. Die Engel warfen sich vor Adam nieder, wie Allah es befohlen hatte - alle außer Iblis (Satan), der sich aus Hochmut weigerte.",
          verses: [
            {
              reference: "Al-Baqarah 2:30-31",
              arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Und als dein Herr zu den Engeln sagte: 'Ich werde auf der Erde einen Statthalter einsetzen.'"
            }
          ]
        },
        {
          title: "Das Leben im Paradies",
          content: "Allah ließ Adam und seine Frau Hawwa (Eva) im Paradies wohnen. Sie durften von allem essen, außer von einem bestimmten Baum. Doch Satan flüsterte ihnen ein und verführte sie dazu, von diesem Baum zu essen. Sie bereuten ihre Tat zutiefst.",
          verses: [
            {
              reference: "Al-Baqarah 2:35-37",
              arabic: "فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ كَلِمَاتٍ فَتَابَ عَلَيْهِ",
              translation: "Da empfing Adam von seinem Herrn Worte, und Er wandte Sich ihm wieder zu."
            }
          ]
        },
        {
          title: "Die Herabsendung zur Erde",
          content: "Nach ihrer Reue vergab Allah ihnen und sandte sie zur Erde herab, wo ihre Nachkommen leben sollten. Allah versprach, dass Er Rechtleitung senden würde, und wer dieser folgt, wird weder Angst noch Trauer kennen.",
          verses: [
            {
              reference: "Al-Baqarah 2:38",
              arabic: "فَمَن تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
              translation: "Wer nun Meiner Rechtleitung folgt, der soll weder Angst haben noch traurig sein."
            }
          ]
        }
      ],
      lessons: [
        "Der Mensch wurde als Statthalter Allahs auf Erden erschaffen",
        "Hochmut und Ungehorsam führen zu Fall, wie bei Iblis",
        "Reue und Vergebung sind immer möglich durch Allahs Barmherzigkeit",
        "Satan ist der offene Feind des Menschen",
        "Wissen ist eine besondere Gabe Allahs an die Menschheit"
      ]
    }
  },
  {
    id: "nuh",
    prophet: "Nuh",
    prophetArabic: "نوح",
    title: "Prophet Nuh (as)",
    description: "Die große Flut und die Arche",
    gradient: "from-blue-500 to-cyan-600",
    story: {
      introduction: "Prophet Nuh (Noah) rief sein Volk 950 Jahre lang zu Allah, doch nur wenige folgten ihm. Die Geschichte der großen Flut zeigt Allahs Gerechtigkeit und die Konsequenzen von Unglauben und Arroganz.",
      sections: [
        {
          title: "Der Ruf zum Glauben",
          content: "Nuh wurde zu einem Volk gesandt, das Götzen anbetete. Er rief sie Tag und Nacht zu Allah, öffentlich und im Geheimen. Doch sie verspotteten ihn und weigerten sich, ihren Götzendienst aufzugeben. Nur eine kleine Gruppe von meist armen und schwachen Menschen glaubte an ihn.",
          verses: [
            {
              reference: "Nuh 71:5-7",
              arabic: "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا",
              translation: "Er sagte: 'Mein Herr, ich habe mein Volk bei Nacht und bei Tag gerufen.'"
            }
          ]
        },
        {
          title: "Der Bau der Arche",
          content: "Als Allah Nuh offenbarte, dass niemand mehr glauben würde, befahl Er ihm, eine Arche zu bauen. Die Ungläubigen verspotteten ihn, während er das Schiff mitten auf dem Land baute. Nuh nahm von jeder Tierart ein Paar mit an Bord sowie die Gläubigen.",
          verses: [
            {
              reference: "Hud 11:37-38",
              arabic: "وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا",
              translation: "Und baue das Schiff unter Unseren Augen und nach Unserer Eingebung."
            }
          ]
        },
        {
          title: "Die große Flut",
          content: "Als die Flut kam, verschlang sie alle Ungläubigen. Sogar der Sohn Nuhs, der sich weigerte zu glauben, ertrank trotz der Bitten seines Vaters. Die Arche trug die Gläubigen sicher über die Wasser, bis sie auf dem Berg Judi landete.",
          verses: [
            {
              reference: "Hud 11:42-43",
              arabic: "وَنَادَىٰ نُوحٌ ابْنَهُ وَكَانَ فِي مَعْزِلٍ يَا بُنَيَّ ارْكَب مَّعَنَا",
              translation: "Und Nuh rief seinem Sohn zu, der abseits war: 'O mein Sohn, steig mit uns ein!'"
            }
          ]
        }
      ],
      lessons: [
        "Geduld und Ausdauer im Ruf zu Allah, auch über lange Zeit",
        "Verwandtschaft schützt nicht vor Allahs Strafe bei Unglauben",
        "Allah rettet die Gläubigen, auch wenn sie in der Minderheit sind",
        "Hochmut und Ablehnung der Wahrheit führen zur Vernichtung",
        "Vertrauen auf Allah in scheinbar aussichtslosen Situationen"
      ]
    }
  },
  {
    id: "ibrahim",
    prophet: "Ibrahim",
    prophetArabic: "إبراهيم",
    title: "Prophet Ibrahim (as)",
    description: "Der Freund Allahs und Vater der Propheten",
    gradient: "from-amber-500 to-orange-600",
    story: {
      introduction: "Ibrahim (Abraham) wird als 'Khalilullah' - der Freund Allahs - bezeichnet und ist eine der bedeutendsten Figuren im Islam. Seine Geschichte erstreckt sich über Jahrzehnte und umfasst zahlreiche Prüfungen, die seine vollkommene Hingabe an Allah demonstrieren. Geboren in einer Zeit des Götzendienstes in Mesopotamien, stand Ibrahim gegen sein gesamtes Volk auf, um die Wahrheit des Monotheismus zu verkünden. Seine Reise führte ihn von Ur über Palästina bis nach Mekka, wo er zusammen mit seinem Sohn Ismail die Kaaba errichtete. Ibrahim ist der Stammvater der Propheten - durch seinen Sohn Ishaq (Isaak) kamen die Propheten der Israeliten, und durch Ismail kam der letzte Prophet Muhammad (Friede sei mit ihnen allen). Seine Geschichte lehrt uns über Mut, Geduld, Vertrauen auf Allah und die Bedeutung des reinen Monotheismus.",
      sections: [
        {
          title: "Die Jugend und Suche nach der Wahrheit",
          content: "Ibrahim wuchs in der Stadt Ur in Mesopotamien auf, in einer Gesellschaft, die tief im Götzendienst verwurzelt war. Sein Vater Azar war ein angesehener Götzenschnitzer, der Statuen herstellte und verkaufte. Doch Ibrahim war anders. Schon in jungen Jahren begann er, über die Schöpfung nachzudenken und die Wahrheit zu suchen. Er beobachtete die Sterne, den Mond und die Sonne und erkannte, dass diese vergänglichen Himmelskörper nicht Gott sein konnten. Als der Stern unterging, sagte er: 'Ich liebe nicht die Untergehenden.' Als der Mond unterging, sagte er: 'Wenn mein Herr mich nicht rechtleitet, werde ich gewiss zu den irregehenden Menschen gehören.' Und als die Sonne unterging, verkündete er mit Überzeugung: 'O mein Volk, ich sage mich los von dem, was ihr (Allah) beigesellt. Ich habe mein Angesicht in aufrichtigem Glauben Dem zugewandt, Der die Himmel und die Erde erschaffen hat, und ich gehöre nicht zu den Götzendienern.'",
          verses: [
            {
              reference: "Al-Anbiya 21:68-69",
              arabic: "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ",
              translation: "Wir sagten: 'O Feuer, sei kühl und Frieden für Ibrahim!'"
            }
          ]
        },
        {
          title: "Die Zerstörung der Götzen und das Feuer",
          content: "Ibrahim beschloss, seinem Volk die Sinnlosigkeit des Götzendienstes auf dramatische Weise zu demonstrieren. Als das Volk zu einem großen Fest auszog, blieb Ibrahim zurück. Er ging in den Tempel und zerstörte alle Götzen mit einer Axt - bis auf den größten, dem er die Axt in die Hand legte. Als das Volk zurückkehrte und die Zerstörung sah, waren sie entsetzt. Sie fragten: 'Wer hat das unseren Göttern angetan?' Ibrahim antwortete mit Ironie: 'Nein, dieser, der größte von ihnen, hat es getan. Fragt sie doch, wenn sie sprechen können!' Das Volk erkannte ihre eigene Unlogik - wie konnten sie Statuen anbeten, die sich nicht einmal selbst verteidigen konnten? Doch anstatt die Wahrheit anzunehmen, wurden sie wütend. Der König Nimrod befahl, Ibrahim zu verbrennen. Ein riesiges Feuer wurde entfacht, so groß, dass niemand nahe genug herankommen konnte, um Ibrahim hineinzuwerfen. Sie bauten eine Katapult und schleuderten ihn ins Feuer. Doch Allah befahl: 'O Feuer, sei Kühle und Frieden für Ibrahim!' Das Feuer verbrannte nur seine Fesseln. Ibrahim saß unversehrt im Feuer, als wäre es ein Garten. Dieses Wunder ließ einige Menschen an ihn glauben, doch die meisten blieben verstockt in ihrem Unglauben.",
          verses: [
            {
              reference: "Al-Anbiya 21:68-69",
              arabic: "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ",
              translation: "Wir sagten: 'O Feuer, sei Kühle und Frieden für Ibrahim!'"
            },
            {
              reference: "Al-Anbiya 21:62-63",
              arabic: "قَالُوا أَأَنتَ فَعَلْتَ هَٰذَا بِآلِهَتِنَا",
              translation: "Sie sagten: 'Bist du es, der unseren Göttern das angetan hat, o Ibrahim?'"
            }
          ]
        },
        {
          title: "Die ultimative Prüfung: Die Opferung Ismails",
          content: "Nach vielen Jahren der Geduld und des Wartens wurde Ibrahim im hohen Alter mit einem Sohn gesegnet - Ismail. Die Freude war unbeschreiblich, denn Ibrahim hatte sich lange nach einem rechtschaffenen Nachkommen gesehnt. Doch als Ismail heranwuchs und alt genug war, um mit seinem Vater zu arbeiten, kam die schwerste Prüfung. Ibrahim sah in einem Traum, dass er seinen geliebten Sohn opfern sollte. Für einen Propheten sind Träume Offenbarungen von Allah. Ibrahim war hin- und hergerissen zwischen seiner Liebe zu seinem Sohn und seinem Gehorsam gegenüber Allah. Er ging zu Ismail und erzählte ihm von dem Traum. Die Antwort des jungen Ismail zeigte seine eigene Hingabe: 'O mein Vater, tu, was dir befohlen wird. Du wirst mich, so Allah will, unter den Geduldigen finden.' Beide begaben sich zum Ort der Opferung. Ibrahim legte Ismail auf die Stirn nieder und setzte das Messer an. In diesem Moment der vollkommenen Unterwerfung rief Allah: 'O Ibrahim, du hast die Vision bereits wahr gemacht!' Ein Widder wurde vom Himmel gesandt, um Ismail zu ersetzen. Diese Geschichte lehrt uns, dass Allah nichts Unmögliches von uns verlangt, sondern unsere Bereitschaft und Hingabe prüft. Das Opferfest (Eid al-Adha) erinnert Muslime weltweit jährlich an diese beispiellose Hingabe.",
          verses: [
            {
              reference: "As-Saffat 37:102-107",
              arabic: "فَلَمَّا أَسْلَمَا وَتَلَّهُ لِلْجَبِينِ",
              translation: "Als sie sich beide ergeben hatten und er ihn auf die Stirn niedergeworfen hatte..."
            }
          ]
        },
        {
          title: "Der Bau der Kaaba",
          content: "Ibrahim und sein Sohn Ismail bauten gemeinsam die Kaaba in Mekka, das erste Haus der Anbetung Allahs auf Erden. Sie beteten zu Allah, ihre Nachkommen zu rechtschaffenen Muslimen zu machen und ihnen einen Gesandten zu schicken - eine Bitte, die mit Prophet Muhammad (saw) erfüllt wurde.",
          verses: [
            {
              reference: "Al-Baqarah 2:127",
              arabic: "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ",
              translation: "Und als Ibrahim die Grundmauern des Hauses errichtete, zusammen mit Ismail..."
            }
          ]
        }
      ],
      lessons: [
        "Vollkommene Hingabe und Gehorsam gegenüber Allah",
        "Mut, für die Wahrheit einzustehen, auch gegen die eigene Familie",
        "Vertrauen auf Allah in den schwierigsten Prüfungen",
        "Die Bedeutung des Monotheismus und der Ablehnung von Götzendienst",
        "Geduld und Dankbarkeit in allen Lebenslagen"
      ]
    }
  },
  {
    id: "musa",
    prophet: "Musa",
    prophetArabic: "موسى",
    title: "Prophet Musa (as)",
    description: "Die Befreiung der Israeliten aus Ägypten",
    gradient: "from-purple-500 to-indigo-600",
    story: {
      introduction: "Musa (Moses) ist einer der am häufigsten im Koran erwähnten Propheten. Seine Geschichte umfasst wundersame Zeichen, die Konfrontation mit dem Pharao und die Befreiung der Kinder Israels aus der Sklaverei.",
      sections: [
        {
          title: "Die wundersame Rettung",
          content: "Musa wurde in einer Zeit geboren, als der Pharao alle neugeborenen Jungen der Israeliten töten ließ. Seine Mutter legte ihn in einen Korb im Fluss, und er wurde von der Familie des Pharaos gefunden und aufgezogen. So wuchs er im Palast des Pharaos auf, beschützt durch Allahs Plan.",
          verses: [
            {
              reference: "Al-Qasas 28:7",
              arabic: "وَأَوْحَيْنَا إِلَىٰ أُمِّ مُوسَىٰ أَنْ أَرْضِعِيهِ",
              translation: "Und Wir gaben der Mutter Musas ein: 'Säuge ihn...'"
            }
          ]
        },
        {
          title: "Die Berufung am brennenden Busch",
          content: "Als Musa erwachsen war und Ägypten verlassen hatte, sah er ein Feuer am Berg Sinai. Dort sprach Allah zu ihm und berief ihn zum Propheten. Er gab ihm zwei Zeichen: seinen Stab, der sich in eine Schlange verwandelte, und seine Hand, die weiß leuchtete.",
          verses: [
            {
              reference: "Ta-Ha 20:11-14",
              arabic: "إِنِّي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي",
              translation: "Wahrlich, Ich bin Allah. Es gibt keinen Gott außer Mir. So diene Mir..."
            }
          ]
        },
        {
          title: "Die Konfrontation mit Pharao",
          content: "Musa kehrte nach Ägypten zurück und forderte den Pharao auf, die Israeliten freizulassen. Der Pharao lehnte ab und behauptete selbst ein Gott zu sein. Allah sandte Plagen über Ägypten, doch Pharaos Herz blieb verhärtet.",
          verses: [
            {
              reference: "Ash-Shu'ara 26:23-24",
              arabic: "قَالَ فِرْعَوْنُ وَمَا رَبُّ الْعَالَمِينَ",
              translation: "Pharao sagte: 'Und was ist der Herr der Welten?'"
            }
          ]
        },
        {
          title: "Die Teilung des Meeres",
          content: "Als Musa mit den Israeliten floh, verfolgte sie Pharao mit seiner Armee. Am Meer angekommen, schlug Musa mit seinem Stab, und Allah teilte das Meer. Die Israeliten gingen sicher hindurch, während Pharao und seine Armee ertranken, als das Wasser zurückkehrte.",
          verses: [
            {
              reference: "Ash-Shu'ara 26:63-66",
              arabic: "فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ",
              translation: "Da gaben Wir Musa ein: 'Schlag mit deinem Stab auf das Meer!'"
            }
          ]
        }
      ],
      lessons: [
        "Allahs Plan ist vollkommen, auch wenn wir ihn nicht verstehen",
        "Mut und Vertrauen auf Allah gegen übermächtige Gegner",
        "Hochmut und Tyrannei führen zum Untergang",
        "Allah rettet die Unterdrückten und bestraft die Unterdrücker",
        "Geduld und Standhaftigkeit im Angesicht von Schwierigkeiten"
      ]
    }
  },
  {
    id: "isa",
    prophet: "Isa",
    prophetArabic: "عيسى",
    title: "Prophet Isa (as)",
    description: "Die Geburt und Wunder von Jesus",
    gradient: "from-rose-500 to-pink-600",
    story: {
      introduction: "Isa (Jesus), Sohn der Maryam (Maria), ist einer der größten Propheten im Islam. Er wurde durch ein Wunder ohne Vater geboren und vollbrachte viele Zeichen mit Allahs Erlaubnis. Der Islam ehrt ihn als Propheten, lehnt aber seine Göttlichkeit ab.",
      sections: [
        {
          title: "Die wundersame Geburt",
          content: "Maryam war eine fromme und keusche Frau. Ein Engel erschien ihr und verkündete, dass sie einen Sohn gebären würde, obwohl kein Mann sie berührt hatte. Sie gebar Isa unter einer Palme, und das neugeborene Baby sprach, um die Unschuld seiner Mutter zu verteidigen.",
          verses: [
            {
              reference: "Maryam 19:19-21",
              arabic: "إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا",
              translation: "Ich bin nur der Gesandte deines Herrn, um dir einen reinen Jungen zu schenken."
            },
            {
              reference: "Maryam 19:30-31",
              arabic: "قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا",
              translation: "Er (Isa) sagte: 'Ich bin wahrlich Allahs Diener. Er hat mir die Schrift gegeben und mich zu einem Propheten gemacht.'"
            }
          ]
        },
        {
          title: "Die Wunder und die Botschaft",
          content: "Isa vollbrachte viele Wunder mit Allahs Erlaubnis: Er heilte Blinde und Aussätzige, erweckte Tote zum Leben und formte Vögel aus Ton, die lebendig wurden. Er kam mit dem Injil (Evangelium) und rief die Menschen zum Monotheismus auf.",
          verses: [
            {
              reference: "Al-Imran 3:49",
              arabic: "وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ",
              translation: "Und ich heile den Blindgeborenen und den Aussätzigen und erwecke die Toten mit Allahs Erlaubnis zum Leben."
            }
          ]
        },
        {
          title: "Die Ablehnung und Erhöhung",
          content: "Viele aus seinem Volk lehnten Isa ab und planten, ihn zu töten. Doch Allah rettete ihn und erhob ihn zu Sich. Im Islam glauben wir, dass Isa nicht gekreuzigt wurde, sondern dass Allah ihm einen ähnlich aussehenden Menschen erscheinen ließ. Isa wird vor dem Jüngsten Tag zurückkehren.",
          verses: [
            {
              reference: "An-Nisa 4:157-158",
              arabic: "وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ",
              translation: "Und sie haben ihn weder getötet noch gekreuzigt, sondern es erschien ihnen so."
            }
          ]
        }
      ],
      lessons: [
        "Allah erschafft, wie Er will, ohne Ursache oder Mittel",
        "Wunder geschehen nur durch Allahs Erlaubnis und Macht",
        "Propheten sind Menschen und Diener Allahs, keine Götter",
        "Die Wahrheit wird oft abgelehnt, doch Allah beschützt Seine Gesandten",
        "Geduld und Standhaftigkeit im Angesicht von Verleumdung"
      ]
    }
  },
  {
    id: "muhammad",
    prophet: "Muhammad",
    prophetArabic: "محمد",
    title: "Prophet Muhammad (saw)",
    description: "Das Leben des letzten Gesandten",
    gradient: "from-green-500 to-emerald-600",
    story: {
      introduction: "Muhammad (Friede und Segen seien auf ihm) ist der letzte Prophet und Gesandte Allahs. Er wurde mit dem Koran gesandt, der bis zum Jüngsten Tag gültig bleibt. Sein Leben ist ein vollkommenes Beispiel für alle Muslime.",
      sections: [
        {
          title: "Die frühen Jahre",
          content: "Muhammad wurde 570 n.Chr. in Mekka geboren. Sein Vater starb vor seiner Geburt, seine Mutter als er sechs Jahre alt war. Er wuchs bei seinem Großvater und später bei seinem Onkel Abu Talib auf. Er war bekannt für seine Ehrlichkeit und Vertrauenswürdigkeit und wurde 'Al-Amin' (der Vertrauenswürdige) genannt.",
        },
        {
          title: "Die erste Offenbarung",
          content: "Im Alter von 40 Jahren erhielt Muhammad die erste Offenbarung in der Höhle Hira. Der Engel Jibril (Gabriel) erschien ihm und sprach die ersten Verse des Korans. Dies markierte den Beginn seiner Prophetenschaft und seiner Mission, die Menschen zum Monotheismus zu rufen.",
          verses: [
            {
              reference: "Al-Alaq 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Lies im Namen deines Herrn, Der erschuf..."
            }
          ]
        },
        {
          title: "Die Verfolgung in Mekka",
          content: "Die Mekkaner, besonders die Führer des Stammes Quraisch, lehnten seine Botschaft ab und verfolgten ihn und seine Anhänger brutal. Trotz aller Schwierigkeiten blieb er standhaft und setzte seinen Ruf zu Allah fort. Die Muslime erduldeten Folter, Boykott und Verfolgung mit Geduld.",
        },
        {
          title: "Die Hijra nach Medina",
          content: "Im Jahr 622 n.Chr. wanderte Muhammad mit seinen Gefährten nach Medina aus. Dies markiert den Beginn der islamischen Zeitrechnung. In Medina gründete er die erste islamische Gesellschaft, basierend auf Gerechtigkeit, Gleichheit und Geschwisterlichkeit.",
          verses: [
            {
              reference: "At-Tawbah 9:40",
              arabic: "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ",
              translation: "Wenn ihr ihm nicht helft, so hat Allah ihm doch geholfen..."
            }
          ]
        },
        {
          title: "Der Sieg und die Vergebung",
          content: "Nach Jahren des Kampfes kehrte Muhammad 630 n.Chr. siegreich nach Mekka zurück. Anstatt Rache zu üben, vergab er seinen ehemaligen Feinden großmütig. Er reinigte die Kaaba von Götzen und etablierte den Islam in ganz Arabien. Er starb 632 n.Chr. nach seiner Abschiedspilgerfahrt.",
          verses: [
            {
              reference: "Al-Ma'idah 5:3",
              arabic: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ",
              translation: "Heute habe Ich euren Din (Religion) für euch vervollkommnet..."
            }
          ]
        }
      ],
      lessons: [
        "Geduld und Standhaftigkeit in der Verfolgung",
        "Vergebung und Barmherzigkeit gegenüber Feinden",
        "Die Bedeutung von Gerechtigkeit und Gleichheit",
        "Bescheidenheit trotz Erfolg und Macht",
        "Das vollkommene Vorbild für alle Aspekte des Lebens"
      ]
    }
  },
  {
    id: "yusuf",
    prophet: "Yusuf",
    prophetArabic: "يوسف",
    title: "Prophet Yusuf (as)",
    description: "Die Geschichte von Joseph und seinen Brüdern",
    gradient: "from-yellow-500 to-amber-600",
    story: {
      introduction: "Die Geschichte von Yusuf (Joseph) wird im Koran als 'die schönste der Geschichten' bezeichnet. Sie lehrt über Geduld, Vergebung, Vertrauen auf Allah und zeigt, wie Allah aus scheinbar hoffnungslosen Situationen Gutes hervorbringt.",
      sections: [
        {
          title: "Der Traum und die Eifersucht",
          content: "Als Kind hatte Yusuf einen Traum, in dem sich Sonne, Mond und elf Sterne vor ihm niederwarfen. Sein Vater Yaqub (Jakob) erkannte, dass dies eine Prophezeiung war. Yusufs Brüder wurden eifersüchtig auf die besondere Liebe ihres Vaters zu ihm und planten, ihn loszuwerden.",
          verses: [
            {
              reference: "Yusuf 12:4-5",
              arabic: "إِذْ قَالَ يُوسُفُ لِأَبِيهِ يَا أَبَتِ إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا",
              translation: "Als Yusuf zu seinem Vater sagte: 'O mein Vater, ich sah elf Sterne...'"
            }
          ]
        },
        {
          title: "Der Verrat und die Sklaverei",
          content: "Die Brüder warfen Yusuf in einen Brunnen und erzählten ihrem Vater, ein Wolf habe ihn gefressen. Eine Karawane fand Yusuf und verkaufte ihn als Sklaven in Ägypten. Trotz dieser Ungerechtigkeit blieb Yusuf geduldig und vertraute auf Allah.",
          verses: [
            {
              reference: "Yusuf 12:18",
              arabic: "فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ",
              translation: "Doch schöne Geduld! Und Allah ist Der, um Dessen Hilfe gebeten wird."
            }
          ]
        },
        {
          title: "Die Versuchung und das Gefängnis",
          content: "Yusuf wurde von der Frau seines Herrn verführt, doch er blieb standhaft und lehnte ab. Trotz seiner Unschuld wurde er ins Gefängnis geworfen. Dort deutete er die Träume seiner Mitgefangenen durch Allahs Gabe und behielt seinen Glauben.",
          verses: [
            {
              reference: "Yusuf 12:23-24",
              arabic: "إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ",
              translation: "Er ist mein Herr. Er hat mir eine gute Bleibe gegeben."
            }
          ]
        },
        {
          title: "Der Aufstieg zur Macht",
          content: "Als der König einen Traum hatte, den niemand deuten konnte, wurde Yusuf aus dem Gefängnis geholt. Er deutete den Traum und wurde zum Verwalter über die Vorräte Ägyptens ernannt. Seine Weisheit rettete Ägypten vor der Hungersnot.",
          verses: [
            {
              reference: "Yusuf 12:54-55",
              arabic: "إِنَّكَ الْيَوْمَ لَدَيْنَا مَكِينٌ أَمِينٌ",
              translation: "Du bist heute bei uns in einer hohen Stellung und genießt Vertrauen."
            }
          ]
        },
        {
          title: "Die Wiedervereinigung und Vergebung",
          content: "Als die Hungersnot kam, kamen Yusufs Brüder nach Ägypten, um Getreide zu kaufen. Sie erkannten ihn nicht, doch er erkannte sie. Nach mehreren Begegnungen gab er sich zu erkennen und vergab ihnen großmütig. Die Familie wurde wiedervereinigt, und der Traum erfüllte sich.",
          verses: [
            {
              reference: "Yusuf 12:92",
              arabic: "لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ",
              translation: "Kein Vorwurf soll heute gegen euch erhoben werden. Allah möge euch vergeben."
            }
          ]
        }
      ],
      lessons: [
        "Geduld in Prüfungen führt zu Erhöhung und Erfolg",
        "Vergebung ist ein Zeichen von Stärke und Glauben",
        "Allah verwandelt Schwierigkeiten in Segen",
        "Keuschheit und Gottesfurcht schützen vor Sünde",
        "Träume können Botschaften von Allah sein"
      ]
    }
  },
  {
    id: "sulaiman",
    prophet: "Sulaiman",
    prophetArabic: "سليمان",
    title: "Prophet Sulaiman (as)",
    description: "Der weise König und seine Herrschaft",
    gradient: "from-violet-500 to-purple-600",
    story: {
      introduction: "Sulaiman (Salomo) war der Sohn von Prophet Dawud (David) und erbte sowohl das Prophetentum als auch das Königreich. Allah gab ihm außergewöhnliche Gaben: die Fähigkeit, mit Tieren zu sprechen, Kontrolle über den Wind und die Jinn, und große Weisheit.",
      sections: [
        {
          title: "Die Gabe der Weisheit",
          content: "Sulaiman bat Allah nicht um Reichtum oder langes Leben, sondern um Weisheit und ein Königreich, wie es niemand nach ihm haben würde. Allah erhörte sein Gebet und gab ihm einzigartige Fähigkeiten. Er konnte die Sprache der Vögel und Tiere verstehen.",
          verses: [
            {
              reference: "Sad 38:35",
              arabic: "رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي",
              translation: "Mein Herr, vergib mir und schenke mir ein Königreich, wie es niemandem nach mir zukommt."
            }
          ]
        },
        {
          title: "Die Armee der Vögel und Jinn",
          content: "Sulaiman hatte eine Armee aus Menschen, Jinn und Vögeln. Die Jinn arbeiteten für ihn und bauten prächtige Bauwerke. Der Wiedehopf diente ihm als Bote und brachte ihm Nachrichten aus fernen Ländern. Der Wind trug ihn, wohin er wollte.",
          verses: [
            {
              reference: "An-Naml 27:16-17",
              arabic: "وَوَرِثَ سُلَيْمَانُ دَاوُودَ ۖ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنطِقَ الطَّيْرِ",
              translation: "Und Sulaiman beerbte Dawud und sagte: 'O ihr Menschen, uns ist die Sprache der Vögel gelehrt worden.'"
            }
          ]
        },
        {
          title: "Die Königin von Saba",
          content: "Der Wiedehopf berichtete Sulaiman von einem Volk in Saba, das die Sonne anbetete. Sulaiman lud ihre Königin Bilqis ein, den wahren Gott anzubeten. Als sie seinen Palast mit dem gläsernen Boden sah und seine Weisheit erkannte, nahm sie den Islam an.",
          verses: [
            {
              reference: "An-Naml 27:42-44",
              arabic: "قَالَتْ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي وَأَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ",
              translation: "Sie sagte: 'Mein Herr, ich habe mir selbst Unrecht getan, und ich ergebe mich mit Sulaiman Allah, dem Herrn der Welten.'"
            }
          ]
        },
        {
          title: "Die Prüfung und Bescheidenheit",
          content: "Trotz seines großen Reichtums und seiner Macht blieb Sulaiman bescheiden und dankbar gegenüber Allah. Er erkannte, dass all seine Gaben von Allah kamen. Als er einmal geprüft wurde, kehrte er sofort reumütig zu Allah zurück.",
          verses: [
            {
              reference: "Saba 34:13",
              arabic: "اعْمَلُوا آلَ دَاوُودَ شُكْرًا ۚ وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ",
              translation: "Arbeitet, o Familie Dawuds, in Dankbarkeit. Und wenige Meiner Diener sind dankbar."
            }
          ]
        }
      ],
      lessons: [
        "Wahre Macht kommt von Allah und sollte für Gutes genutzt werden",
        "Weisheit ist wertvoller als materieller Reichtum",
        "Dankbarkeit für Allahs Gaben ist eine Pflicht",
        "Bescheidenheit trotz Macht und Reichtum",
        "Die Natur gehorcht Allah und kann Seinen Dienern dienen"
      ]
    }
  },
  {
    id: "yunus",
    prophet: "Yunus",
    prophetArabic: "يونس",
    title: "Prophet Yunus (as)",
    description: "Der Prophet im Bauch des Wals - Eine Geschichte über Geduld, Reue und Allahs Barmherzigkeit",
    gradient: "from-teal-500 to-cyan-600",
    story: {
      introduction: "Prophet Yunus (Jona) wurde zu einem Volk gesandt, das sich im Unglauben und in Sünden verloren hatte. Seine Geschichte ist eine der bewegendsten im Koran und zeigt uns, wie Allah selbst in den dunkelsten Momenten Rettung gewährt, wenn wir zu Ihm zurückkehren. Yunus' Erfahrung im Bauch des Wals ist zu einem Symbol für Hoffnung und göttliche Barmherzigkeit geworden. Der Koran widmet eine ganze Sure seinem Namen (Sure Yunus) und erwähnt seine Geschichte an mehreren Stellen. Seine Reise lehrt uns über die Wichtigkeit von Geduld, die Gefahr von voreiligen Entscheidungen, die Kraft der aufrichtigen Reue und Allahs unendliche Vergebung.",
      sections: [
        {
          title: "Der Ruf zum Glauben und die Ablehnung",
          content: "Yunus wurde zum Volk von Ninive (im heutigen Irak) gesandt, einer großen Stadt mit über 100.000 Einwohnern, die tief im Götzendienst versunken waren. Er rief sie Tag und Nacht zu Allah, ermahnte sie, ihre Götzen aufzugeben und den Einen Gott anzubeten. Er warnte sie vor der Strafe Allahs, wenn sie nicht umkehren würden. Doch sein Volk hörte nicht auf ihn. Sie verspotteten ihn, lehnten seine Botschaft ab und verhärteten ihre Herzen. Yunus predigte jahrelang mit Hingabe und Geduld, doch die Menschen blieben verstockt. Die ständige Ablehnung und der Spott zermürbten ihn. Er sah keine Hoffnung mehr, dass sein Volk jemals glauben würde. In seiner Frustration und Enttäuschung traf Yunus eine voreilige Entscheidung - er verließ sein Volk, ohne auf Allahs Erlaubnis zu warten. Er dachte, seine Mission sei gescheitert und es gäbe keinen Grund mehr zu bleiben.",
          verses: [
            {
              reference: "As-Saffat 37:139-140",
              arabic: "وَإِنَّ يُونُسَ لَمِنَ الْمُرْسَلِينَ إِذْ أَبَقَ إِلَى الْفُلْكِ الْمَشْحُونِ",
              translation: "Und wahrlich, Yunus war einer der Gesandten. Als er zu dem beladenen Schiff floh."
            }
          ]
        },
        {
          title: "Die Flucht und der Sturm",
          content: "Yunus ging zum Hafen und bestieg ein Schiff, das aufs offene Meer hinausfuhr. Er wollte weit weg von seinem Volk, das ihn abgelehnt hatte. Doch man kann nicht vor Allahs Bestimmung fliehen. Mitten auf dem Meer geriet das Schiff in einen gewaltigen Sturm. Die Wellen türmten sich wie Berge, der Wind heulte, und das Schiff drohte zu sinken. Die Seeleute, erfahrene Männer des Meeres, erkannten, dass dies kein gewöhnlicher Sturm war. Nach ihrem Brauch glaubten sie, dass jemand an Bord sein musste, der eine schwere Sünde begangen hatte, und dass das Meer diese Person forderte. Sie beschlossen, das Los zu werfen, um herauszufinden, wer über Bord gehen sollte, damit das Schiff gerettet würde. Das Los fiel auf Yunus. Sie warfen das Los ein zweites Mal - wieder fiel es auf Yunus. Ein drittes Mal - und wieder zeigte es auf Yunus. Es gab keinen Zweifel mehr. Yunus erkannte in diesem Moment, dass dies Allahs Bestimmung war. Er hatte versucht, vor seiner Verantwortung zu fliehen, und nun musste er die Konsequenzen tragen. Mit Würde und Ergebenheit in Allahs Willen warf er sich selbst ins tobende Meer.",
          verses: [
            {
              reference: "As-Saffat 37:141",
              arabic: "فَسَاهَمَ فَكَانَ مِنَ الْمُدْحَضِينَ",
              translation: "Dann warf er das Los und war unter den Verlierern."
            }
          ]
        },
        {
          title: "Im Bauch des Wals - Die tiefste Dunkelheit",
          content: "Als Yunus ins Meer stürzte, sandte Allah einen riesigen Wal, der ihn verschlang. Yunus fand sich plötzlich in völliger Dunkelheit wieder - im Bauch des Wals, in den Tiefen des Meeres, in der Finsternis der Nacht. Drei Schichten der Dunkelheit umgaben ihn. Jeder andere hätte in dieser Situation die Hoffnung verloren. Doch Yunus erkannte, dass dies eine Prüfung war, und er wandte sich zu Allah. In dieser absoluten Dunkelheit und Einsamkeit, wo niemand ihn hören konnte außer Allah, rief Yunus zu seinem Herrn. Er erkannte seinen Fehler, bereute aufrichtig und bekannte seine Schwäche. Er sprach das berühmte Dua, das als 'Dua Yunus' bekannt wurde und das Muslime bis heute in schwierigen Zeiten rezitieren: 'La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin' - 'Es gibt keinen Gott außer Dir, gepriesen seist Du, ich war wahrlich einer der Ungerechten.' Diese Worte kamen aus tiefstem Herzen. Yunus gab seine Schuld zu, pries Allah trotz seiner verzweifelten Lage und flehte um Vergebung. Er verbrachte Tage und Nächte im Bauch des Wals, ständig Allah gedenkend und um Vergebung bittend. Der Wal wurde zu seinem Gefängnis, aber auch zu seinem Ort der spirituellen Läuterung.",
          verses: [
            {
              reference: "Al-Anbiya 21:87-88",
              arabic: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ",
              translation: "Es gibt keinen Gott außer Dir, gepriesen seist Du, ich war wahrlich einer der Ungerechten. Da erhörten Wir ihn und retteten ihn aus der Bedrängnis."
            },
            {
              reference: "As-Saffat 37:142-144",
              arabic: "فَالْتَقَمَهُ الْحُوتُ وَهُوَ مُلِيمٌ فَلَوْلَا أَنَّهُ كَانَ مِنَ الْمُسَبِّحِينَ لَلَبِثَ فِي بَطْنِهِ إِلَىٰ يَوْمِ يُبْعَثُونَ",
              translation: "Da verschlang ihn der Fisch, während er getadelt wurde. Und hätte er nicht zu denen gehört, die (Allah) preisen, wäre er gewiss in seinem Bauch geblieben bis zum Tag, an dem sie auferweckt werden."
            }
          ]
        },
        {
          title: "Die Rettung und Heilung",
          content: "Allah, Der Allbarmherzige, erhörte Yunus' aufrichtiges Gebet. Er befahl dem Wal, Yunus an einen Strand zu spucken. Der Wal gehorchte und brachte Yunus ans Ufer. Yunus lag erschöpft am Strand, sein Körper war geschwächt von der langen Zeit im Bauch des Wals, seine Haut war empfindlich geworden. Doch Allah kümmerte Sich um Seinen Diener. Er ließ eine Kürbispflanze über Yunus wachsen, deren große Blätter ihm Schatten spendeten und ihn vor der Sonne schützten. Die Früchte der Pflanze gaben ihm Nahrung und Kraft. Langsam erholte sich Yunus unter Allahs fürsorglicher Obhut. Diese Pflanze war ein Zeichen von Allahs Barmherzigkeit und Vergebung. Allah hatte Yunus nicht nur gerettet, sondern sorgte auch für seine vollständige Genesung. Yunus erkannte die Tiefe von Allahs Liebe und Fürsorge für Seine Diener, selbst wenn sie Fehler machen.",
          verses: [
            {
              reference: "As-Saffat 37:145-146",
              arabic: "فَنَبَذْنَاهُ بِالْعَرَاءِ وَهُوَ سَقِيمٌ وَأَنبَتْنَا عَلَيْهِ شَجَرَةً مِّن يَقْطِينٍ",
              translation: "Da warfen Wir ihn an einen kahlen Strand, während er krank war. Und Wir ließen über ihm einen Kürbisbaum wachsen."
            }
          ]
        },
        {
          title: "Die Rückkehr und das Wunder",
          content: "Nachdem Yunus sich erholt hatte, sandte Allah ihn zurück zu seinem Volk. Doch in seiner Abwesenheit war etwas Erstaunliches geschehen. Nachdem Yunus gegangen war, begannen die Zeichen von Allahs Strafe am Himmel zu erscheinen. Dunkle Wolken zogen auf, und die Menschen erkannten, dass die Warnung ihres Propheten wahr geworden war. In ihrer Angst und Verzweiflung erinnerten sie sich an Yunus' Worte. Sie bereuten aufrichtig, verließen ihre Götzen und riefen zu Allah um Vergebung. Sie gingen mit ihren Kindern und Tieren auf die Berge und flehten Allah an, sie zu verschonen. Ihre Reue war echt und kam von Herzen. Allah, Der Allvergebende, nahm ihre Reue an und wendete die Strafe ab. Die dunklen Wolken verzogen sich, und die Stadt wurde verschont. Als Yunus zurückkehrte, fand er sein Volk im Glauben vereint. Sie empfingen ihn mit Freude und Dankbarkeit. Das gesamte Volk von Ninive - über 100.000 Menschen - hatte sich zu Allah bekehrt. Dies war ein beispielloses Wunder. Yunus' Mission, die er für gescheitert gehalten hatte, war doch erfolgreich gewesen. Allah hatte aus seiner Prüfung einen großen Sieg gemacht. Das Volk von Ninive blieb für Generationen im Glauben und wurde zu einem Beispiel für die Kraft der aufrichtigen Reue.",
          verses: [
            {
              reference: "Yunus 10:98",
              arabic: "فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ لَمَّا آمَنُوا كَشَفْنَا عَنْهُمْ عَذَابَ الْخِزْيِ",
              translation: "Warum gab es denn keine Stadt, die geglaubt hätte, so dass ihr Glaube ihr genützt hätte, außer dem Volk des Yunus? Als sie glaubten, nahmen Wir die Strafe der Schande von ihnen hinweg."
            },
            {
              reference: "As-Saffat 37:147-148",
              arabic: "وَأَرْسَلْنَاهُ إِلَىٰ مِائَةِ أَلْفٍ أَوْ يَزِيدُونَ فَآمَنُوا فَمَتَّعْنَاهُمْ إِلَىٰ حِينٍ",
              translation: "Und Wir sandten ihn zu hunderttausend oder mehr. Und sie glaubten, so gewährten Wir ihnen Genuss auf Zeit."
            }
          ]
        }
      ],
      lessons: [
        "Geduld ist essentiell in der Dawah - man darf nicht voreilig aufgeben",
        "Man kann nicht vor Allahs Bestimmung fliehen",
        "Aufrichtige Reue wird immer von Allah angenommen, egal wie dunkel die Situation",
        "Das Gedenken Allahs (Dhikr) ist Licht in jeder Dunkelheit",
        "Allah kann aus scheinbarem Scheitern großen Erfolg machen",
        "Selbst Propheten machen Fehler, aber sie kehren zu Allah zurück",
        "Allahs Barmherzigkeit übertrifft Seinen Zorn",
        "Eine ganze Gemeinschaft kann durch aufrichtige Reue gerettet werden"
      ]
    }
  },
  {
    id: "ayyub",
    prophet: "Ayyub",
    prophetArabic: "أيوب",
    title: "Prophet Ayyub (as)",
    description: "Das Symbol der Geduld - Eine Geschichte über Standhaftigkeit in extremen Prüfungen",
    gradient: "from-purple-500 to-indigo-600",
    story: {
      introduction: "Prophet Ayyub (Hiob) ist das ultimative Symbol für Geduld (Sabr) und Standhaftigkeit im Islam. Seine Geschichte ist eine der bewegendsten Erzählungen über menschliches Leid und göttliche Prüfung. Ayyub war ein wohlhabender, gesunder und angesehener Mann mit einer großen Familie. Doch Allah prüfte ihn mit Verlusten, die jeden anderen Menschen hätten verzweifeln lassen. Trotz allem verlor Ayyub nie seinen Glauben an Allah. Seine Geschichte lehrt uns, dass Prüfungen nicht bedeuten, dass Allah uns nicht liebt - im Gegenteil, Allah prüft diejenigen, die Er liebt, um ihre Geduld zu läutern und ihren Rang zu erhöhen. Der Name Ayyub ist zum Synonym für Geduld geworden - wenn jemand große Geduld zeigt, sagt man 'Er hat die Geduld von Ayyub'.",
      sections: [
        {
          title: "Das gesegnete Leben vor der Prüfung",
          content: "Ayyub lebte in der Region von Hauran (zwischen Syrien und Jordanien) und stammte von den Nachkommen Ibrahims ab. Er war ein rechtschaffener Mann, der Allah aufrichtig diente und sein Volk zum Glauben aufrief. Allah hatte ihn mit immensem Reichtum gesegnet: Er besaß riesige Herden von Schafen, Ziegen, Kamelen und Rindern, die sich über weite Ländereien erstreckten. Er hatte fruchtbare Felder und Gärten. Seine Familie war groß und gesegnet - er hatte viele Söhne und Töchter, die alle gesund und rechtschaffen waren. Ayyub war nicht nur reich, sondern auch großzügig. Er nutzte seinen Reichtum, um den Armen zu helfen, Waisen zu versorgen und Bedürftige zu unterstützen. Er war in seiner Gemeinschaft hoch angesehen und respektiert. Die Menschen kamen zu ihm um Rat und Hilfe. Seine Frau war eine rechtschaffene, gläubige Frau, die ihn in seinem Dienst für Allah unterstützte. Ayyub war dankbar für all diese Segnungen und vergaß nie, dass alles von Allah kam. Er betete regelmäßig, fastete und gedachte Allahs Tag und Nacht. Sein Leben war ein Vorbild für Rechtschaffenheit und Dankbarkeit.",
          verses: [
            {
              reference: "Sad 38:41",
              arabic: "وَاذْكُرْ عَبْدَنَا أَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الشَّيْطَانُ بِنُصْبٍ وَعَذَابٍ",
              translation: "Und gedenke Unseres Dieners Ayyub, als er zu seinem Herrn rief: 'Satan hat mich mit Mühsal und Qual heimgesucht.'"
            }
          ]
        },
        {
          title: "Der Beginn der schweren Prüfungen",
          content: "Dann begann Allah, Ayyub auf eine Weise zu prüfen, die nur die stärksten Seelen ertragen können. Die Prüfungen kamen eine nach der anderen, wie Wellen, die über ihn hereinbrachen. Zuerst verlor er seinen Reichtum. Seine riesigen Herden wurden durch Krankheiten dahingerafft oder von Räubern gestohlen. Seine Felder wurden durch Naturkatastrophen zerstört. Der Mann, der einst einer der reichsten in seiner Region war, verlor alles. Doch Ayyub blieb standhaft und sagte: 'Allah hat gegeben, und Allah hat genommen. Gepriesen sei Allah.' Dann kam eine noch schwerere Prüfung. Seine Kinder versammelten sich in einem Haus, als plötzlich ein gewaltiger Sturm aufkam. Das Haus stürzte ein, und alle seine Söhne und Töchter starben auf einmal. Für jeden Vater ist der Verlust eines Kindes die schwerste Prüfung - Ayyub verlor alle seine Kinder an einem einzigen Tag. Der Schmerz war unbeschreiblich. Doch selbst in diesem Moment der tiefsten Trauer behielt Ayyub seine Geduld und seinen Glauben. Er weinte, denn er war ein Mensch mit Gefühlen, aber er rebellierte nicht gegen Allahs Bestimmung. Er sagte: 'Wahrlich, wir gehören Allah, und zu Ihm kehren wir zurück.'",
          verses: [
            {
              reference: "Al-Anbiya 21:83",
              arabic: "وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
              translation: "Und (gedenke) Ayyubs, als er zu seinem Herrn rief: 'Wahrlich, Unheil hat mich getroffen, und Du bist der Barmherzigste der Barmherzigen.'"
            }
          ]
        },
        {
          title: "Die Krankheit und die Isolation",
          content: "Als ob der Verlust von Reichtum und Kindern nicht genug wäre, wurde Ayyub nun mit einer schweren Krankheit geprüft. Sein ganzer Körper wurde von einer schmerzhaften Krankheit befallen. Geschwüre breiteten sich über seinen Körper aus, seine Haut wurde von Wunden bedeckt. Der Schmerz war konstant und unerträglich. Er konnte nicht mehr arbeiten, nicht mehr gehen wie früher. Die Krankheit dauerte Jahre - manche Überlieferungen sprechen von sieben Jahren, andere von noch längerer Zeit. Die Menschen, die ihn einst respektiert und um Hilfe gebeten hatten, begannen sich von ihm abzuwenden. Sie meinten, er müsse etwas Schreckliches getan haben, damit Allah ihn so bestrafte. Sie verstanden nicht, dass dies eine Prüfung und keine Strafe war. Freunde und Verwandte verließen ihn. Er wurde aus der Stadt verbannt und musste außerhalb auf einem Müllhaufen leben. Von all seinen Reichtümern, seiner Familie und seinen Freunden blieb ihm nur seine treue Ehefrau. Sie blieb bei ihm, pflegte seine Wunden, und arbeitete hart, um Essen für sie beide zu verdienen. Doch selbst sie wurde manchmal von der Verzweiflung überwältigt und wünschte sich, dass Ayyub Allah um Heilung bitten würde. Ayyub jedoch blieb geduldig. Er sagte: 'Wenn Allah mir Jahre des Wohlstands gegeben hat, sollte ich dann nicht auch Jahre der Prüfung ertragen?' Er beschwerte sich nie bei den Menschen über sein Leid. Er wandte sich nur an Allah im Gebet.",
          verses: [
            {
              reference: "Sad 38:42",
              arabic: "ارْكُضْ بِرِجْلِكَ ۖ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ",
              translation: "'Stampfe mit deinem Fuß auf. Dies ist ein kühles Bad und ein Trunk.'"
            }
          ]
        },
        {
          title: "Das Gebet und die Heilung",
          content: "Nach Jahren des Leidens, als Ayyubs Körper extrem geschwächt war, wandte er sich schließlich an Allah mit einem bescheidenen Bittgebet. Er klagte nicht über sein Leid, sondern drückte einfach seine Situation aus: 'Wahrlich, Unheil hat mich getroffen, und Du bist der Barmherzigste der Barmherzigen.' Dies war kein Gebet der Verzweiflung, sondern ein Gebet voller Vertrauen auf Allahs Barmherzigkeit. Er erkannte Allahs absolute Macht und Barmherzigkeit an. Allah, Der Seine geduldigen Diener liebt, erhörte Ayyubs Gebet sofort. Allah befahl ihm: 'Stampfe mit deinem Fuß auf den Boden.' Als Ayyub dies tat, sprudelte eine Quelle aus dem Boden hervor. Allah sagte ihm, er solle von diesem Wasser trinken und sich damit waschen. Das Wasser war kühl und heilend. Als Ayyub davon trank, heilte es seine inneren Leiden. Als er sich damit wusch, heilte es seine äußeren Wunden. Seine Haut wurde wieder gesund, seine Kraft kehrte zurück, und er wurde vollständig geheilt. Die Heilung war augenblicklich und vollständig - ein klares Wunder von Allah. Ayyubs Körper wurde nicht nur geheilt, sondern er wurde sogar schöner und stärker als zuvor. Seine Jugend kehrte zurück, und er strahlte vor Gesundheit.",
          verses: [
            {
              reference: "Al-Anbiya 21:84",
              arabic: "فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا",
              translation: "Da erhörten Wir ihn und nahmen das Unheil von ihm hinweg. Und Wir gaben ihm seine Familie zurück und noch einmal so viele dazu, als eine Barmherzigkeit von Uns."
            }
          ]
        },
        {
          title: "Die Wiederherstellung und doppelter Segen",
          content: "Allahs Barmherzigkeit hörte nicht bei der Heilung auf. Allah gab Ayyub alles zurück, was er verloren hatte - und noch mehr. Seine Kinder wurden ihm zurückgegeben (entweder durch Auferweckung oder durch neue Kinder - die Gelehrten haben unterschiedliche Meinungen). Sein Reichtum wurde nicht nur wiederhergestellt, sondern verdoppelt. Seine Herden wurden größer als je zuvor, seine Felder fruchtbarer, sein Wohlstand übertraf seinen früheren Reichtum. Die Menschen, die ihn verlassen hatten, kamen zurück und erkannten, dass Ayyubs Prüfung ein Zeichen von Allahs besonderer Liebe zu ihm gewesen war. Sie baten um Vergebung für ihr Verhalten. Ayyub vergab ihnen großmütig. Seine Frau, die all die Jahre bei ihm geblieben war und seine Wunden gepflegt hatte, wurde für ihre Treue und Geduld belohnt. Allah segnete sie mit Jugend und Schönheit. Ayyub lebte noch viele Jahre nach seiner Heilung, diente Allah und lehrte die Menschen über Geduld und Vertrauen auf Allah. Seine Geschichte wurde zu einem ewigen Beispiel für alle Generationen. Der Koran erwähnt ihn als einen der vorbildlichsten Diener Allahs. Allah sagt über ihn: 'Wahrlich, Wir fanden ihn geduldig. Ein vortrefflicher Diener! Er wandte sich stets (Allah) zu.'",
          verses: [
            {
              reference: "Sad 38:44",
              arabic: "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ",
              translation: "Wahrlich, Wir fanden ihn geduldig. Ein vortrefflicher Diener! Er wandte sich stets (zu Allah) zurück."
            }
          ]
        }
      ],
      lessons: [
        "Prüfungen sind nicht unbedingt Strafen - sie können Zeichen von Allahs Liebe sein",
        "Geduld (Sabr) in Zeiten der Not ist eine der höchsten Tugenden im Islam",
        "Man sollte sich nur bei Allah beschweren, nicht bei den Menschen",
        "Reichtum und Gesundheit sind Prüfungen, genauso wie Armut und Krankheit",
        "Allah prüft diejenigen, die Er liebt, um ihren Rang zu erhöhen",
        "Nach jeder Schwierigkeit kommt Erleichterung - Allahs Versprechen ist wahr",
        "Wahre Freunde und Familie bleiben in schweren Zeiten",
        "Dankbarkeit in guten Zeiten und Geduld in schlechten Zeiten sind die Zeichen wahrer Gläubiger",
        "Allahs Belohnung für Geduld übertrifft das Leid bei weitem"
      ]
    }
  },
  {
    id: "dawud",
    prophet: "Dawud",
    prophetArabic: "داوود",
    title: "Prophet Dawud (as)",
    description: "Der König-Prophet - Krieger, Richter und Sänger der Psalmen",
    gradient: "from-indigo-500 to-blue-600",
    story: {
      introduction: "Prophet Dawud (David) war eine einzigartige Figur in der Geschichte - er war gleichzeitig Prophet, König und Krieger. Allah gab ihm außergewöhnliche Gaben: eine wunderschöne Stimme, mit der er Allah pries, die Fähigkeit, Eisen mit seinen bloßen Händen zu formen, Weisheit im Urteil und Tapferkeit im Kampf. Er ist der Autor der Zabur (Psalmen), eines der vier großen offenbarten Bücher im Islam. Seine Geschichte beginnt als einfacher Hirte und endet als mächtiger König, doch durch all dies blieb er ein demütiger Diener Allahs. Dawud ist auch der Vater von Sulaiman, einem der weisesten Propheten. Seine Geschichte lehrt uns über Mut, Gerechtigkeit, Reue und die Wichtigkeit, Allah in allen Lebenslagen zu gedenken.",
      sections: [
        {
          title: "Der junge Hirte und Goliath",
          content: "Dawuds Geschichte beginnt in einer Zeit, als die Kinder Israels von einem tyrannischen König namens Jalut (Goliath) und seiner Armee bedroht wurden. Jalut war ein Riese von einem Mann, furchteinflößend in seiner Größe und Stärke. Kein Krieger wagte es, gegen ihn anzutreten. Der Prophet und König der Israeliten zu dieser Zeit war Talut (Saul), der seine Armee sammelte, um gegen Jalut zu kämpfen. Doch als die beiden Armeen sich gegenüberstanden, zögerten die Soldaten. Jalut forderte einen Einzelkampf heraus, doch niemand traute sich. In diesem Moment trat ein junger Hirte namens Dawud vor. Er war noch ein Jugendlicher, schlank und scheinbar schwach im Vergleich zu den erfahrenen Kriegern. Doch Dawud hatte etwas, das wichtiger war als körperliche Stärke - er hatte absolutes Vertrauen auf Allah. Er sagte: 'Allah wird mir helfen.' Talut versuchte, Dawud seine eigene Rüstung und sein Schwert zu geben, doch Dawud lehnte ab. Er nahm nur seine Hirtenstock, seine Schleuder und fünf glatte Steine aus einem Bach. Als Jalut den jungen Dawud sah, lachte er und verspottete ihn. Doch Dawud fürchtete sich nicht. Er legte einen Stein in seine Schleuder, zielte und schleuderte mit aller Kraft. Der Stein traf Jalut direkt an der Stirn, durchdrang seine Rüstung und tötete ihn auf der Stelle. Die Armee von Jalut, als sie ihren Anführer fallen sahen, floh in Panik. Die Israeliten gewannen einen überwältigenden Sieg. Dawud wurde zum Helden seines Volkes.",
          verses: [
            {
              reference: "Al-Baqarah 2:251",
              arabic: "فَهَزَمُوهُم بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ",
              translation: "So besiegten sie sie mit Allahs Erlaubnis, und Dawud tötete Jalut."
            }
          ]
        },
        {
          title: "Das Königtum und die Gerechtigkeit",
          content: "Nach diesem Sieg wurde Dawud zum König über die Kinder Israels ernannt. Doch er war kein gewöhnlicher König. Allah hatte ihn auch zum Propheten gemacht und ihm das Buch Zabur (Psalmen) offenbart. Dawud war bekannt für seine außergewöhnliche Gerechtigkeit und Weisheit im Urteil. Menschen kamen von weit her, um ihn um Rat und Urteil in ihren Streitigkeiten zu bitten. Der Koran erzählt eine berühmte Geschichte, die Dawuds Weisheit demonstriert: Zwei Männer kamen zu ihm mit einem Streit. Der eine hatte 99 Schafe, der andere nur ein einziges. Der reiche Mann verlangte auch noch das eine Schaf des armen Mannes. Dawud urteilte sofort, dass dies ungerecht sei. Doch dann erkannte er, dass dies eine Prüfung von Allah war - die beiden 'Männer' waren Engel, die gekommen waren, um Dawud eine Lektion zu erteilen. Allah wollte Dawud daran erinnern, dass selbst Propheten und Könige nicht vor Fehlern sicher sind und ständig wachsam sein müssen. Dawud erkannte seinen Fehler sofort, warf sich in Niederwerfung vor Allah und bat um Vergebung. Allah vergab ihm und erhöhte seinen Rang noch mehr. Diese Demut und schnelle Reue waren Zeichen von Dawuds Größe.",
          verses: [
            {
              reference: "Sad 38:26",
              arabic: "يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُم بَيْنَ النَّاسِ بِالْحَقِّ",
              translation: "O Dawud, Wir haben dich zum Statthalter auf Erden gemacht. So richte zwischen den Menschen in Gerechtigkeit."
            },
            {
              reference: "Sad 38:24",
              arabic: "فَاسْتَغْفَرَ رَبَّهُ وَخَرَّ رَاكِعًا وَأَنَابَ",
              translation: "Da bat er seinen Herrn um Vergebung, fiel nieder in Niederwerfung und wandte sich (Allah) reuig zu."
            }
          ]
        },
        {
          title: "Die Gaben: Die Stimme und das Eisen",
          content: "Allah segnete Dawud mit außergewöhnlichen Gaben, die kein anderer Prophet hatte. Seine Stimme war so schön und melodisch, dass wenn er die Zabur (Psalmen) rezitierte und Allah pries, die Berge mit ihm mitschwangen und die Vögel sich um ihn versammelten, um zuzuhören. Der Koran erwähnt dies mehrfach: 'Wir machten die Berge dienstbar, mit ihm zusammen Allah zu preisen am Abend und am Morgen. Und die Vögel in Scharen - alle wandten sich ihm zu.' Stellt euch vor: Dawud saß auf einem Berg, rezitierte die Psalmen mit seiner wunderschönen Stimme, und die Berge ringsum echoten seine Lobpreisungen, während Schwärme von Vögeln über ihm kreisten und mit ihrem Gesang einstimmten. Dies war ein Wunder, das die Macht und Majestät Allahs demonstrierte. Dawud hatte auch die einzigartige Fähigkeit, Eisen mit seinen bloßen Händen zu formen, als wäre es weicher Ton. Allah machte das Eisen für ihn geschmeidig. Er nutzte diese Gabe, um Rüstungen und Kettenhemden herzustellen. Diese Rüstungen waren perfekt ausbalanciert - stark genug, um Schutz zu bieten, aber flexibel genug, um Bewegungsfreiheit zu ermöglichen. Dawud lehrte die Menschen diese Kunst und revolutionierte damit die Kriegsführung seiner Zeit. Doch er nutzte seine Fähigkeiten nicht nur für den Krieg, sondern auch, um nützliche Werkzeuge für das tägliche Leben herzustellen.",
          verses: [
            {
              reference: "Saba 34:10",
              arabic: "وَلَقَدْ آتَيْنَا دَاوُودَ مِنَّا فَضْلًا ۖ يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ",
              translation: "Und wahrlich, Wir gaben Dawud von Uns eine Gunst: 'O ihr Berge, lobpreiset (Allah) mit ihm, und ihr Vögel!'"
            },
            {
              reference: "Saba 34:10-11",
              arabic: "وَأَلَنَّا لَهُ الْحَدِيدَ أَنِ اعْمَلْ سَابِغَاتٍ وَقَدِّرْ فِي السَّرْدِ",
              translation: "Und Wir machten das Eisen für ihn geschmeidig: 'Fertige vollständige Panzerhemden und bemiss das Ringgeflecht.'"
            }
          ]
        },
        {
          title: "Die Zabur (Psalmen) und das Gedenken Allahs",
          content: "Dawud war der Autor der Zabur, eines der vier großen offenbarten Bücher im Islam (zusammen mit der Tora, dem Evangelium und dem Koran). Die Zabur waren eine Sammlung von Gebeten, Lobpreisungen und Weisheiten. Sie waren nicht in erster Linie ein Buch der Gesetze wie die Tora, sondern ein Buch der spirituellen Erhebung und des Gottesgedenkens. Dawud rezitierte die Zabur mit seiner melodischen Stimme, und die Worte berührten die Herzen der Menschen tief. Die Zabur lehrten über Allahs Größe, Seine Barmherzigkeit, die Vergänglichkeit des weltlichen Lebens und die Wichtigkeit der Reue. Dawud selbst war ein Meister des Dhikr (Gedenken Allahs). Trotz seiner Pflichten als König nahm er sich jeden Tag Zeit für intensive Anbetung. Er fastete jeden zweiten Tag - ein Muster, das später als 'das Fasten Dawuds' bekannt wurde und vom Propheten Muhammad (Friede sei mit ihm) als die beste Form des freiwilligen Fastens gelobt wurde. Dawud stand jede Nacht auf, um Tahajjud (Nachtgebet) zu verrichten. Er teilte seine Nacht in drei Teile: ein Drittel für Schlaf, ein Drittel für Gebet und ein Drittel für die Rezitation der Zabur. Diese Hingabe an Allah, trotz seiner weltlichen Verantwortungen als König, machte ihn zu einem Vorbild für alle Gläubigen.",
          verses: [
            {
              reference: "Al-Isra 17:55",
              arabic: "وَآتَيْنَا دَاوُودَ زَبُورًا",
              translation: "Und Wir gaben Dawud die Zabur."
            },
            {
              reference: "Sad 38:17-18",
              arabic: "اصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاذْكُرْ عَبْدَنَا دَاوُودَ ذَا الْأَيْدِ ۖ إِنَّهُ أَوَّابٌ",
              translation: "Ertrage geduldig, was sie sagen, und gedenke Unseres Dieners Dawud, des Starken. Wahrlich, er wandte sich stets (Allah) zu."
            }
          ]
        },
        {
          title: "Das Vermächtnis und Sulaiman",
          content: "Dawud regierte viele Jahre mit Gerechtigkeit und Weisheit. Unter seiner Herrschaft erlebten die Kinder Israels eine Zeit des Friedens und Wohlstands. Er baute Jerusalem zu einer großen Stadt aus und machte sie zum religiösen und politischen Zentrum seines Königreichs. Dawud hatte mehrere Söhne, doch Allah wählte Sulaiman, um sein Nachfolger zu werden. Dawud erkannte früh, dass Sulaiman besondere Weisheit besaß, und bereitete ihn auf die Rolle des Königs und Propheten vor. Er lehrte Sulaiman alles, was er wusste - über Gerechtigkeit, Führung, Anbetung und die Kunst des Urteilens. Als Dawud alt wurde, übergab er das Königreich an Sulaiman. Dawud starb als geliebter König und Prophet, betrauert von seinem Volk. Sein Vermächtnis lebte nicht nur durch seinen Sohn Sulaiman weiter, sondern auch durch die Zabur, die bis heute rezitiert werden. Der Koran ehrt Dawud als einen der großen Propheten und erwähnt ihn 16 Mal. Seine Geschichte ist eine Erinnerung daran, dass wahre Größe nicht in weltlicher Macht liegt, sondern in der Hingabe an Allah, in Gerechtigkeit gegenüber den Menschen und in der Demut, Fehler zuzugeben und um Vergebung zu bitten.",
          verses: [
            {
              reference: "Al-Anbiya 21:78-79",
              arabic: "وَدَاوُودَ وَسُلَيْمَانَ إِذْ يَحْكُمَانِ فِي الْحَرْثِ... فَفَهَّمْنَاهَا سُلَيْمَانَ",
              translation: "Und (gedenke) Dawuds und Sulaimans, als sie über das Saatfeld urteilten... Und Wir gaben Sulaiman das Verständnis dafür."
            }
          ]
        }
      ],
      lessons: [
        "Vertrauen auf Allah kann selbst den scheinbar Schwächsten zum Sieg führen",
        "Wahre Führung verbindet weltliche Macht mit spiritueller Demut",
        "Gerechtigkeit muss unparteiisch sein, unabhängig von Status oder Reichtum",
        "Selbst Propheten machen Fehler, aber sie kehren sofort zu Allah zurück",
        "Allahs Gaben sollten zum Nutzen der Menschheit eingesetzt werden",
        "Ständiges Gedenken Allahs (Dhikr) ist essentiell, auch für Führer und Könige",
        "Das Fasten Dawuds (jeden zweiten Tag) ist die beste Form des freiwilligen Fastens",
        "Schönheit und Kunst (wie Dawuds Stimme) können Mittel sein, um Allah zu preisen",
        "Ein guter Führer bereitet seinen Nachfolger sorgfältig vor"
      ]
    }
  }
];
