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
  }
];
