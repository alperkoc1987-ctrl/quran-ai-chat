// Islamic Quiz Questions - Multilingual (DE/EN/TR/AR)
// Each question has translations for all supported languages

export type Language = "de" | "en" | "tr" | "ar";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

// Multilingual questions database
export const quizQuestionsDB = {
  de: [
    {
      id: 1,
      question: "Wie viele Suren hat der Koran?",
      options: ["110", "114", "120", "99"],
      correctAnswer: 1,
      explanation: "Der Koran besteht aus 114 Suren, die in Mekka und Medina offenbart wurden.",
      category: "Koran"
    },
    {
      id: 2,
      question: "Welche Sure wird als 'Das Herz des Korans' bezeichnet?",
      options: ["Al-Fatiha", "Ya-Sin", "Al-Ikhlas", "Al-Baqarah"],
      correctAnswer: 1,
      explanation: "Sure Ya-Sin (Sure 36) wird oft als 'Das Herz des Korans' bezeichnet.",
      category: "Koran"
    },
    {
      id: 3,
      question: "Wie viele Propheten werden im Koran namentlich erwähnt?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 2,
      explanation: "Im Koran werden 25 Propheten namentlich erwähnt, darunter Adam, Noah, Abraham, Moses und Jesus (Friede sei mit ihnen allen).",
      category: "Propheten"
    },
    {
      id: 4,
      question: "Welcher Prophet wird am häufigsten im Koran erwähnt?",
      options: ["Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
      correctAnswer: 2,
      explanation: "Prophet Musa (Moses) wird am häufigsten im Koran erwähnt, mehr als 130 Mal.",
      category: "Propheten"
    },
    {
      id: 5,
      question: "Wie viele Säulen hat der Islam?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "Der Islam hat 5 Säulen: Shahada (Glaubensbekenntnis), Salat (Gebet), Zakat (Almosen), Saum (Fasten) und Hajj (Pilgerfahrt).",
      category: "Grundlagen"
    },
    {
      id: 6,
      question: "In welchem Monat wurde der Koran offenbart?",
      options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
      correctAnswer: 2,
      explanation: "Der Koran wurde im Monat Ramadan offenbart, in der Nacht der Macht (Lailat al-Qadr).",
      category: "Koran"
    },
    {
      id: 7,
      question: "Welche Sure enthält keinen Bismillah am Anfang?",
      options: ["At-Tawbah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
      correctAnswer: 0,
      explanation: "Sure At-Tawbah (Sure 9) ist die einzige Sure, die nicht mit Bismillah beginnt.",
      category: "Koran"
    },
    {
      id: 8,
      question: "Wie viele Pflichtgebete gibt es täglich?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "Es gibt 5 Pflichtgebete täglich: Fajr, Dhuhr, Asr, Maghrib und Isha.",
      category: "Gebet"
    },
    {
      id: 9,
      question: "Welcher Engel brachte die Offenbarung zu Prophet Muhammad (ﷺ)?",
      options: ["Mikail", "Israfil", "Jibril", "Malak al-Maut"],
      correctAnswer: 2,
      explanation: "Der Engel Jibril (Gabriel) brachte die Offenbarungen von Allah zu Prophet Muhammad (ﷺ).",
      category: "Grundlagen"
    },
    {
      id: 10,
      question: "Welche Sure wird als 'Die Eröffnende' bezeichnet?",
      options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
      correctAnswer: 1,
      explanation: "Sure Al-Fatiha (Sure 1) bedeutet 'Die Eröffnende' und wird in jedem Gebet rezitiert.",
      category: "Koran"
    },
    {
      id: 11,
      question: "Wie viele Verse hat Sure Al-Baqarah?",
      options: ["200", "250", "286", "300"],
      correctAnswer: 2,
      explanation: "Sure Al-Baqarah (Sure 2) hat 286 Verse und ist die längste Sure des Korans.",
      category: "Koran"
    },
    {
      id: 12,
      question: "Welcher Prophet wird als 'Freund Allahs' bezeichnet?",
      options: ["Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Nuh (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Ibrahim (Abraham) wird im Koran als 'Khalil Allah' (Freund Allahs) bezeichnet.",
      category: "Propheten"
    },
    {
      id: 13,
      question: "In welcher Sure wird die Geschichte von Yusuf erzählt?",
      options: ["Sure 10", "Sure 11", "Sure 12", "Sure 13"],
      correctAnswer: 2,
      explanation: "Sure Yusuf (Sure 12) erzählt die vollständige Geschichte des Propheten Yusuf (Joseph).",
      category: "Koran"
    },
    {
      id: 14,
      question: "Wie lange fasteten die Muslime im Ramadan?",
      options: ["Von Sonnenaufgang bis Sonnenuntergang", "24 Stunden", "Von Mitternacht bis Mittag", "Von Fajr bis Maghrib"],
      correctAnswer: 3,
      explanation: "Muslime fasten von Fajr (Morgengebet) bis Maghrib (Sonnenuntergang) während des Ramadan.",
      category: "Grundlagen"
    },
    {
      id: 15,
      question: "Welche Stadt ist die heiligste im Islam?",
      options: ["Medina", "Mekka", "Jerusalem", "Kairo"],
      correctAnswer: 1,
      explanation: "Mekka ist die heiligste Stadt im Islam und beherbergt die Kaaba.",
      category: "Grundlagen"
    },
    {
      id: 16,
      question: "Wie viele Rak'ahs hat das Maghrib-Gebet?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "Das Maghrib-Gebet besteht aus 3 Rak'ahs (Gebetseinheiten).",
      category: "Gebet"
    },
    {
      id: 17,
      question: "Welcher Monat ist der heiligste im islamischen Kalender?",
      options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
      correctAnswer: 2,
      explanation: "Ramadan ist der heiligste Monat im islamischen Kalender, in dem der Koran offenbart wurde.",
      category: "Grundlagen"
    },
    {
      id: 18,
      question: "Wie viele Säulen der Glaube gibt es im Islam?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "Es gibt 6 Säulen des Glaubens: Glaube an Allah, Engel, Bücher, Propheten, Jüngsten Tag und Schicksal.",
      category: "Grundlagen"
    },
    {
      id: 19,
      question: "Welcher Prophet war Zimmermann?",
      options: ["Prophet Nuh (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 2,
      explanation: "Prophet Isa (Jesus) war bekannt als Zimmermann, bevor er zum Propheten berufen wurde.",
      category: "Propheten"
    },
    {
      id: 20,
      question: "Wie viele Jalihs (Verse) hat der Koran ungefähr?",
      options: ["5000", "6000", "6236", "7000"],
      correctAnswer: 2,
      explanation: "Der Koran hat ungefähr 6236 Verse (Ayahs).",
      category: "Koran"
    },
    {
      id: 21,
      question: "Welcher Prophet lebte am längsten?",
      options: ["Prophet Nuh (AS)", "Prophet Adam (AS)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)"],
      correctAnswer: 0,
      explanation: "Prophet Nuh (Noah) lebte 950 Jahre, länger als jeder andere Prophet.",
      category: "Propheten"
    },
    {
      id: 22,
      question: "In welchem Jahr wurde die Hijra durchgeführt?",
      options: ["610 n.Chr.", "622 n.Chr.", "632 n.Chr.", "650 n.Chr."],
      correctAnswer: 1,
      explanation: "Die Hijra (Migration) fand 622 n.Chr. statt, als der Prophet Muhammad (ﷺ) von Mekka nach Medina auswanderte.",
      category: "Geschichte"
    },
    {
      id: 23,
      question: "Wie viele Pillar der Zakat gibt es?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "Zakat ist eine der 5 Säulen des Islam und ist eine Säule an sich.",
      category: "Grundlagen"
    },
    {
      id: 24,
      question: "Welche Sure behandelt die Rechte der Eltern?",
      options: ["Sure 2", "Sure 17", "Sure 20", "Sure 31"],
      correctAnswer: 1,
      explanation: "Sure Al-Isra (Sure 17) behandelt die Rechte der Eltern und ihre Behandlung.",
      category: "Koran"
    },
    {
      id: 25,
      question: "Wie viele Frauen waren Prophetinnen im Islam?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "Maryam (Maria) war die einzige Frau, die im Koran als Prophetin erwähnt wird.",
      category: "Propheten"
    },
    {
      id: 26,
      question: "Was ist Tawaf?",
      options: ["Das Fasten", "Das Umkreisen der Kaaba", "Das Gebet", "Das Almosen"],
      correctAnswer: 1,
      explanation: "Tawaf ist das Umkreisen der Kaaba, ein wichtiger Teil der Hajj und Umrah.",
      category: "Grundlagen"
    },
    {
      id: 27,
      question: "Welcher Prophet war König?",
      options: ["Prophet Musa (AS)", "Prophet Sulaiman (AS)", "Prophet Ibrahim (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Sulaiman (Solomon) war König und Allah gab ihm ein Königreich, das niemand nach ihm erhalten würde.",
      category: "Propheten"
    },
    {
      id: 28,
      question: "Wie heißt die Nacht der Offenbarung des Korans?",
      options: ["Lailat al-Isra", "Lailat al-Qadr", "Lailat al-Badr", "Lailat al-Hijra"],
      correctAnswer: 1,
      explanation: "Lailat al-Qadr (Nacht der Macht) ist die Nacht, in der der Koran offenbart wurde.",
      category: "Koran"
    },
    {
      id: 29,
      question: "Welcher Prophet wurde in einem Fisch verschluckt?",
      options: ["Prophet Musa (AS)", "Prophet Yunus (AS)", "Prophet Nuh (AS)", "Prophet Sulaiman (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Yunus (Jonah) wurde von einem großen Fisch verschluckt und verbrachte Tage in seinem Bauch.",
      category: "Propheten"
    },
    {
      id: 30,
      question: "Was ist Shahada?",
      options: ["Das Gebet", "Das Glaubensbekenntnis", "Das Fasten", "Die Pilgerfahrt"],
      correctAnswer: 1,
      explanation: "Shahada ist das islamische Glaubensbekenntnis: 'Es gibt keinen Gott außer Allah und Muhammad ist sein Gesandter'.",
      category: "Grundlagen"
    },
    {
      id: 31,
      question: "Wie viele Engel tragen den Thron Allahs?",
      options: ["2", "4", "8", "16"],
      correctAnswer: 2,
      explanation: "Nach islamischer Überlieferung tragen 8 Engel den Thron Allahs.",
      category: "Grundlagen"
    },
    {
      id: 32,
      question: "Welche Sure wird als 'Die Kuh' bezeichnet?",
      options: ["Sure 1", "Sure 2", "Sure 3", "Sure 4"],
      correctAnswer: 1,
      explanation: "Sure Al-Baqarah (Sure 2) wird 'Die Kuh' genannt, da sie die Geschichte einer Kuh enthält.",
      category: "Koran"
    },
    {
      id: 33,
      question: "Wie viele Rak'ahs hat das Fajr-Gebet?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "Das Fajr-Gebet besteht aus 2 Rak'ahs (Gebetseinheiten).",
      category: "Gebet"
    },
    {
      id: 34,
      question: "Welcher Prophet war Arzt?",
      options: ["Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Ibrahim (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Isa (Jesus) war bekannt für seine Heilungen und wird im Koran als Heiler erwähnt.",
      category: "Propheten"
    },
    {
      id: 35,
      question: "Was ist Wudu?",
      options: ["Das Gebet", "Die rituelle Waschung", "Das Fasten", "Das Almosen"],
      correctAnswer: 1,
      explanation: "Wudu ist die rituelle Waschung vor dem Gebet, ein wichtiger Teil der islamischen Praxis.",
      category: "Grundlagen"
    },
    {
      id: 36,
      question: "Wie viele Rak'ahs hat das Dhuhr-Gebet?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Das Dhuhr-Gebet besteht aus 4 Rak'ahs (Gebetseinheiten).",
      category: "Gebet"
    },
    {
      id: 37,
      question: "Welcher Prophet war Schafhirte?",
      options: ["Prophet Musa (AS)", "Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "Alle der oben genannten"],
      correctAnswer: 3,
      explanation: "Viele Propheten waren Schafhirten, einschließlich Musa, Muhammad und Ibrahim.",
      category: "Propheten"
    },
    {
      id: 38,
      question: "Wie viele Rak'ahs hat das Asr-Gebet?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Das Asr-Gebet besteht aus 4 Rak'ahs (Gebetseinheiten).",
      category: "Gebet"
    },
    {
      id: 39,
      question: "Was ist Zakat al-Fitr?",
      options: ["Almosen während Ramadan", "Almosen am Ende des Ramadan", "Almosen am Anfang des Ramadan", "Almosen für die Armen"],
      correctAnswer: 1,
      explanation: "Zakat al-Fitr ist das Almosen, das am Ende des Ramadan vor dem Eid-Gebet gegeben wird.",
      category: "Grundlagen"
    },
    {
      id: 40,
      question: "Wie viele Rak'ahs hat das Isha-Gebet?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Das Isha-Gebet besteht aus 4 Rak'ahs (Gebetseinheiten).",
      category: "Gebet"
    }
  ],
  en: [
    {
      id: 1,
      question: "How many Surahs does the Quran have?",
      options: ["110", "114", "120", "99"],
      correctAnswer: 1,
      explanation: "The Quran consists of 114 Surahs revealed in Mecca and Medina.",
      category: "Quran"
    },
    {
      id: 2,
      question: "Which Surah is known as 'The Heart of the Quran'?",
      options: ["Al-Fatiha", "Ya-Sin", "Al-Ikhlas", "Al-Baqarah"],
      correctAnswer: 1,
      explanation: "Surah Ya-Sin (Surah 36) is often referred to as 'The Heart of the Quran'.",
      category: "Quran"
    },
    {
      id: 3,
      question: "How many Prophets are mentioned by name in the Quran?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 2,
      explanation: "25 Prophets are mentioned by name in the Quran, including Adam, Noah, Abraham, Moses and Jesus (peace be upon them all).",
      category: "Prophets"
    },
    {
      id: 4,
      question: "Which Prophet is mentioned most frequently in the Quran?",
      options: ["Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
      correctAnswer: 2,
      explanation: "Prophet Musa (Moses) is mentioned most frequently in the Quran, more than 130 times.",
      category: "Prophets"
    },
    {
      id: 5,
      question: "How many pillars does Islam have?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "Islam has 5 pillars: Shahada (Declaration of Faith), Salat (Prayer), Zakat (Alms), Saum (Fasting) and Hajj (Pilgrimage).",
      category: "Basics"
    },
    {
      id: 6,
      question: "In which month was the Quran revealed?",
      options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
      correctAnswer: 2,
      explanation: "The Quran was revealed in the month of Ramadan, in the Night of Power (Lailat al-Qadr).",
      category: "Quran"
    },
    {
      id: 7,
      question: "Which Surah does not contain Bismillah at the beginning?",
      options: ["At-Tawbah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
      correctAnswer: 0,
      explanation: "Surah At-Tawbah (Surah 9) is the only Surah that does not begin with Bismillah.",
      category: "Quran"
    },
    {
      id: 8,
      question: "How many obligatory prayers are there daily?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "There are 5 obligatory prayers daily: Fajr, Dhuhr, Asr, Maghrib and Isha.",
      category: "Prayer"
    },
    {
      id: 9,
      question: "Which angel brought the revelation to Prophet Muhammad (ﷺ)?",
      options: ["Mikail", "Israfil", "Jibril", "Malak al-Maut"],
      correctAnswer: 2,
      explanation: "The angel Jibril (Gabriel) brought the revelations from Allah to Prophet Muhammad (ﷺ).",
      category: "Basics"
    },
    {
      id: 10,
      question: "Which Surah is known as 'The Opening'?",
      options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
      correctAnswer: 1,
      explanation: "Surah Al-Fatiha (Surah 1) means 'The Opening' and is recited in every prayer.",
      category: "Quran"
    },
    {
      id: 11,
      question: "How many verses does Surah Al-Baqarah have?",
      options: ["200", "250", "286", "300"],
      correctAnswer: 2,
      explanation: "Surah Al-Baqarah (Surah 2) has 286 verses and is the longest Surah in the Quran.",
      category: "Quran"
    },
    {
      id: 12,
      question: "Which Prophet is called 'The Friend of Allah'?",
      options: ["Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Nuh (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Ibrahim (Abraham) is called 'Khalil Allah' (Friend of Allah) in the Quran.",
      category: "Prophets"
    },
    {
      id: 13,
      question: "In which Surah is the story of Yusuf told?",
      options: ["Surah 10", "Surah 11", "Surah 12", "Surah 13"],
      correctAnswer: 2,
      explanation: "Surah Yusuf (Surah 12) tells the complete story of Prophet Yusuf (Joseph).",
      category: "Quran"
    },
    {
      id: 14,
      question: "How long do Muslims fast during Ramadan?",
      options: ["From sunrise to sunset", "24 hours", "From midnight to noon", "From Fajr to Maghrib"],
      correctAnswer: 3,
      explanation: "Muslims fast from Fajr (dawn prayer) to Maghrib (sunset) during Ramadan.",
      category: "Basics"
    },
    {
      id: 15,
      question: "Which city is the holiest in Islam?",
      options: ["Medina", "Mecca", "Jerusalem", "Cairo"],
      correctAnswer: 1,
      explanation: "Mecca is the holiest city in Islam and is home to the Kaaba.",
      category: "Basics"
    },
    {
      id: 16,
      question: "How many Rak'ahs does the Maghrib prayer have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "The Maghrib prayer consists of 3 Rak'ahs (units of prayer).",
      category: "Prayer"
    },
    {
      id: 17,
      question: "Which month is the holiest in the Islamic calendar?",
      options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
      correctAnswer: 2,
      explanation: "Ramadan is the holiest month in the Islamic calendar, when the Quran was revealed.",
      category: "Basics"
    },
    {
      id: 18,
      question: "How many pillars of faith are there in Islam?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "There are 6 pillars of faith: belief in Allah, angels, scriptures, prophets, the Day of Judgment, and destiny.",
      category: "Basics"
    },
    {
      id: 19,
      question: "Which Prophet was a carpenter?",
      options: ["Prophet Nuh (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 2,
      explanation: "Prophet Isa (Jesus) was known to be a carpenter before being called to prophethood.",
      category: "Prophets"
    },
    {
      id: 20,
      question: "Approximately how many verses does the Quran have?",
      options: ["5000", "6000", "6236", "7000"],
      correctAnswer: 2,
      explanation: "The Quran has approximately 6236 verses (Ayahs).",
      category: "Quran"
    },
    {
      id: 21,
      question: "Which Prophet lived the longest?",
      options: ["Prophet Nuh (AS)", "Prophet Adam (AS)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)"],
      correctAnswer: 0,
      explanation: "Prophet Nuh (Noah) lived 950 years, longer than any other prophet.",
      category: "Prophets"
    },
    {
      id: 22,
      question: "In which year did the Hijra take place?",
      options: ["610 CE", "622 CE", "632 CE", "650 CE"],
      correctAnswer: 1,
      explanation: "The Hijra (migration) took place in 622 CE when Prophet Muhammad (ﷺ) migrated from Mecca to Medina.",
      category: "History"
    },
    {
      id: 23,
      question: "How many pillars of Zakat are there?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "Zakat is one of the 5 pillars of Islam and is a pillar in itself.",
      category: "Basics"
    },
    {
      id: 24,
      question: "Which Surah deals with the rights of parents?",
      options: ["Surah 2", "Surah 17", "Surah 20", "Surah 31"],
      correctAnswer: 1,
      explanation: "Surah Al-Isra (Surah 17) deals with the rights of parents and their treatment.",
      category: "Quran"
    },
    {
      id: 25,
      question: "How many women were prophetesses in Islam?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "Maryam (Mary) was the only woman mentioned as a prophetess in the Quran.",
      category: "Prophets"
    },
    {
      id: 26,
      question: "What is Tawaf?",
      options: ["Fasting", "Circumambulating the Kaaba", "Prayer", "Charity"],
      correctAnswer: 1,
      explanation: "Tawaf is the circumambulation of the Kaaba, an important part of Hajj and Umrah.",
      category: "Basics"
    },
    {
      id: 27,
      question: "Which Prophet was a king?",
      options: ["Prophet Musa (AS)", "Prophet Sulaiman (AS)", "Prophet Ibrahim (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Sulaiman (Solomon) was a king and Allah gave him a kingdom that no one after him would have.",
      category: "Prophets"
    },
    {
      id: 28,
      question: "What is the night of revelation of the Quran called?",
      options: ["Lailat al-Isra", "Lailat al-Qadr", "Lailat al-Badr", "Lailat al-Hijra"],
      correctAnswer: 1,
      explanation: "Lailat al-Qadr (Night of Power) is the night when the Quran was revealed.",
      category: "Quran"
    },
    {
      id: 29,
      question: "Which Prophet was swallowed by a fish?",
      options: ["Prophet Musa (AS)", "Prophet Yunus (AS)", "Prophet Nuh (AS)", "Prophet Sulaiman (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Yunus (Jonah) was swallowed by a great fish and spent days in its belly.",
      category: "Prophets"
    },
    {
      id: 30,
      question: "What is Shahada?",
      options: ["Prayer", "Declaration of Faith", "Fasting", "Pilgrimage"],
      correctAnswer: 1,
      explanation: "Shahada is the Islamic Declaration of Faith: 'There is no god but Allah and Muhammad is His messenger'.",
      category: "Basics"
    },
    {
      id: 31,
      question: "How many angels carry the Throne of Allah?",
      options: ["2", "4", "8", "16"],
      correctAnswer: 2,
      explanation: "According to Islamic tradition, 8 angels carry the Throne of Allah.",
      category: "Basics"
    },
    {
      id: 32,
      question: "Which Surah is known as 'The Cow'?",
      options: ["Surah 1", "Surah 2", "Surah 3", "Surah 4"],
      correctAnswer: 1,
      explanation: "Surah Al-Baqarah (Surah 2) is called 'The Cow' because it contains the story of a cow.",
      category: "Quran"
    },
    {
      id: 33,
      question: "How many Rak'ahs does the Fajr prayer have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "The Fajr prayer consists of 2 Rak'ahs (units of prayer).",
      category: "Prayer"
    },
    {
      id: 34,
      question: "Which Prophet was a physician?",
      options: ["Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Ibrahim (AS)", "Prophet Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Prophet Isa (Jesus) was known for his healing miracles and is mentioned as a healer in the Quran.",
      category: "Prophets"
    },
    {
      id: 35,
      question: "What is Wudu?",
      options: ["Prayer", "Ritual purification", "Fasting", "Charity"],
      correctAnswer: 1,
      explanation: "Wudu is ritual purification before prayer, an important part of Islamic practice.",
      category: "Basics"
    },
    {
      id: 36,
      question: "How many Rak'ahs does the Dhuhr prayer have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "The Dhuhr prayer consists of 4 Rak'ahs (units of prayer).",
      category: "Prayer"
    },
    {
      id: 37,
      question: "Which Prophet was a shepherd?",
      options: ["Prophet Musa (AS)", "Prophet Muhammad (ﷺ)", "Prophet Ibrahim (AS)", "All of the above"],
      correctAnswer: 3,
      explanation: "Many prophets were shepherds, including Musa, Muhammad, and Ibrahim.",
      category: "Prophets"
    },
    {
      id: 38,
      question: "How many Rak'ahs does the Asr prayer have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "The Asr prayer consists of 4 Rak'ahs (units of prayer).",
      category: "Prayer"
    },
    {
      id: 39,
      question: "What is Zakat al-Fitr?",
      options: ["Charity during Ramadan", "Charity at the end of Ramadan", "Charity at the start of Ramadan", "Charity for the poor"],
      correctAnswer: 1,
      explanation: "Zakat al-Fitr is charity given at the end of Ramadan before the Eid prayer.",
      category: "Basics"
    },
    {
      id: 40,
      question: "How many Rak'ahs does the Isha prayer have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "The Isha prayer consists of 4 Rak'ahs (units of prayer).",
      category: "Prayer"
    }
  ],
  tr: [
    {
      id: 1,
      question: "Kuran kaç sure içerir?",
      options: ["110", "114", "120", "99"],
      correctAnswer: 1,
      explanation: "Kuran, Mekke ve Medine'de vahyedilen 114 sureden oluşur.",
      category: "Kuran"
    },
    {
      id: 2,
      question: "Hangi sure 'Kuran'ın Kalbi' olarak bilinir?",
      options: ["Al-Fatiha", "Ya-Sin", "Al-Ikhlas", "Al-Baqarah"],
      correctAnswer: 1,
      explanation: "Sure Ya-Sin (Sure 36) genellikle 'Kuran'ın Kalbi' olarak bilinir.",
      category: "Kuran"
    },
    {
      id: 3,
      question: "Kuran'da kaç peygamber isimle anılır?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 2,
      explanation: "Kuran'da 25 peygamber isimle anılır; bunlar arasında Adem, Nuh, İbrahim, Musa ve İsa (hepsine selam olsun) yer alır.",
      category: "Peygamberler"
    },
    {
      id: 4,
      question: "Hangi peygamber Kuran'da en sık anılır?",
      options: ["Peygamber Muhammed (ﷺ)", "Peygamber İbrahim (AS)", "Peygamber Musa (AS)", "Peygamber İsa (AS)"],
      correctAnswer: 2,
      explanation: "Peygamber Musa (Musa), Kuran'da en sık anılan peygamberdir, 130'den fazla kez geçer.",
      category: "Peygamberler"
    },
    {
      id: 5,
      question: "İslam'ın kaç şartı vardır?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "İslam'ın 5 şartı vardır: Şehadet (İman İlanı), Namaz, Zakat, Oruç ve Hac.",
      category: "Temel Bilgiler"
    },
    {
      id: 6,
      question: "Kuran hangi ayda vahyedilmiştir?",
      options: ["Muharram", "Rajab", "Ramazan", "Zilhicce"],
      correctAnswer: 2,
      explanation: "Kuran, Ramazan ayında, Kadir Gecesi'nde (Lailat al-Qadr) vahyedilmiştir.",
      category: "Kuran"
    },
    {
      id: 7,
      question: "Hangi sure başında Besmele yoktur?",
      options: ["Tevbe", "Fatiha", "İhlas", "Nas"],
      correctAnswer: 0,
      explanation: "Tevbe Suresi (Sure 9), başında Besmele olmayan tek suredir.",
      category: "Kuran"
    },
    {
      id: 8,
      question: "Günde kaç farz namaz vardır?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "Günde 5 farz namaz vardır: Sabah, Öğle, İkindi, Akşam ve Yatsı.",
      category: "Namaz"
    },
    {
      id: 9,
      question: "Peygamber Muhammed'e (ﷺ) vahyi hangi melek getirdi?",
      options: ["Mikail", "İsrafil", "Cebrail", "Azrail"],
      correctAnswer: 2,
      explanation: "Melek Cebrail (Gabriel), Allah'ın vahyini Peygamber Muhammed'e (ﷺ) getirmiştir.",
      category: "Temel Bilgiler"
    },
    {
      id: 10,
      question: "Hangi sure 'Açılış' olarak bilinir?",
      options: ["Bakara", "Fatiha", "İhlas", "Nas"],
      correctAnswer: 1,
      explanation: "Fatiha Suresi (Sure 1) 'Açılış' anlamına gelir ve her namazda okunur.",
      category: "Kuran"
    },
    {
      id: 11,
      question: "Bakara Suresi kaç ayete sahiptir?",
      options: ["200", "250", "286", "300"],
      correctAnswer: 2,
      explanation: "Bakara Suresi (Sure 2) 286 ayete sahiptir ve Kuran'ın en uzun suresidir.",
      category: "Kuran"
    },
    {
      id: 12,
      question: "Hangi peygamber 'Allah'ın Dostu' olarak bilinir?",
      options: ["Peygamber Muhammed (ﷺ)", "Peygamber İbrahim (AS)", "Peygamber Musa (AS)", "Peygamber Nuh (AS)"],
      correctAnswer: 1,
      explanation: "Peygamber İbrahim (Abraham) Kuran'da 'Halil Allah' (Allah'ın Dostu) olarak bilinir.",
      category: "Peygamberler"
    },
    {
      id: 13,
      question: "Yusuf'un hikayesi hangi surede anlatılır?",
      options: ["Sure 10", "Sure 11", "Sure 12", "Sure 13"],
      correctAnswer: 2,
      explanation: "Yusuf Suresi (Sure 12) Peygamber Yusuf'un (Yusuf) tam hikayesini anlatır.",
      category: "Kuran"
    },
    {
      id: 14,
      question: "Müslümanlar Ramazan'da ne kadar oruç tutarlar?",
      options: ["Gündoğumundan gün batımına", "24 saat", "Gece yarısından öğlene", "Sabah namazından akşam namazına"],
      correctAnswer: 3,
      explanation: "Müslümanlar Ramazan'da sabah namazından (Fajr) akşam namazına (Maghrib) kadar oruç tutarlar.",
      category: "Temel Bilgiler"
    },
    {
      id: 15,
      question: "İslam'da en kutsal şehir hangisidir?",
      options: ["Medine", "Mekke", "Kudüs", "Kahire"],
      correctAnswer: 1,
      explanation: "Mekke İslam'ın en kutsal şehridir ve Kaabe'nin bulunduğu yerdir.",
      category: "Temel Bilgiler"
    },
    {
      id: 16,
      question: "Akşam namazı kaç rekat'tır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "Akşam namazı 3 rekat'tan oluşur.",
      category: "Namaz"
    },
    {
      id: 17,
      question: "İslami takvimde en kutsal ay hangisidir?",
      options: ["Muharrem", "Recep", "Ramazan", "Zilhicce"],
      correctAnswer: 2,
      explanation: "Ramazan İslami takvimde en kutsal aydır ve Kuran'ın indirildiği aydır.",
      category: "Temel Bilgiler"
    },
    {
      id: 18,
      question: "İslam'da imanın kaç şartı vardır?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "İslam'da 6 imanın şartı vardır: Allah'a, meleklere, kitaplara, peygamberlere, ahiret gününe ve kadere inanmak.",
      category: "Temel Bilgiler"
    },
    {
      id: 19,
      question: "Hangi peygamber marangoz idi?",
      options: ["Peygamber Nuh (AS)", "Peygamber Musa (AS)", "Peygamber İsa (AS)", "Peygamber Yusuf (AS)"],
      correctAnswer: 2,
      explanation: "Peygamber İsa (Jesus) peygamberliğe çağrılmadan önce marangoz olarak bilinir.",
      category: "Peygamberler"
    },
    {
      id: 20,
      question: "Kuran'ın yaklaşık kaç ayeti vardır?",
      options: ["5000", "6000", "6236", "7000"],
      correctAnswer: 2,
      explanation: "Kuran'ın yaklaşık 6236 ayeti (Ayahs) vardır.",
      category: "Kuran"
    },
    {
      id: 21,
      question: "Hangi peygamber en uzun yaşadı?",
      options: ["Peygamber Nuh (AS)", "Peygamber Adem (AS)", "Peygamber İbrahim (AS)", "Peygamber Musa (AS)"],
      correctAnswer: 0,
      explanation: "Peygamber Nuh (Noah) 950 yıl yaşamış, diğer tüm peygamberlerden daha uzun.",
      category: "Peygamberler"
    },
    {
      id: 22,
      question: "Hicret hangi yılda gerçekleşti?",
      options: ["610 CE", "622 CE", "632 CE", "650 CE"],
      correctAnswer: 1,
      explanation: "Hicret 622 CE'de gerçekleşti, Peygamber Muhammed (ﷺ) Mekke'den Medine'ye göç ettiğinde.",
      category: "İslam Tarihi"
    },
    {
      id: 23,
      question: "Zekat'ın kaç şartı vardır?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "Zekat İslam'ın 5 şartından biridir ve kendi başına bir şarttır.",
      category: "Temel Bilgiler"
    },
    {
      id: 24,
      question: "Hangi sure ebeveynlerin haklarından bahseder?",
      options: ["Sure 2", "Sure 17", "Sure 20", "Sure 31"],
      correctAnswer: 1,
      explanation: "İsra Suresi (Sure 17) ebeveynlerin haklarından ve onlara karşı davranıştan bahseder.",
      category: "Kuran"
    },
    {
      id: 25,
      question: "İslam'da kaç kadın peygamber vardı?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "Meryem (Mary) Kuran'da peygamber olarak anılan tek kadındır.",
      category: "Peygamberler"
    },
    {
      id: 26,
      question: "Tavaf nedir?",
      options: ["Oruç", "Kaabe'yi dolanmak", "Namaz", "Sadaka"],
      correctAnswer: 1,
      explanation: "Tavaf Kaabe'yi dolanmaktır, Hac ve Umre'nin önemli bir parçasıdır.",
      category: "Temel Bilgiler"
    },
    {
      id: 27,
      question: "Hangi peygamber kral idi?",
      options: ["Peygamber Musa (AS)", "Peygamber Süleyman (AS)", "Peygamber İbrahim (AS)", "Peygamber Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Peygamber Süleyman (Solomon) kraldı ve Allah ona kendisinden sonra kimseye verilmeyecek bir krallık verdi.",
      category: "Peygamberler"
    },
    {
      id: 28,
      question: "Kuran'ın indirildiği gece ne denir?",
      options: ["Lailat al-Isra", "Lailat al-Qadr", "Lailat al-Badr", "Lailat al-Hijra"],
      correctAnswer: 1,
      explanation: "Lailat al-Qadr (Kadir Gecesi) Kuran'ın indirildiği gecedir.",
      category: "Kuran"
    },
    {
      id: 29,
      question: "Hangi peygamber bir balık tarafından yutuldu?",
      options: ["Peygamber Musa (AS)", "Peygamber Yunus (AS)", "Peygamber Nuh (AS)", "Peygamber Süleyman (AS)"],
      correctAnswer: 1,
      explanation: "Peygamber Yunus (Jonah) büyük bir balık tarafından yutuldu ve günler boyunca onun karnında kaldı.",
      category: "Peygamberler"
    },
    {
      id: 30,
      question: "Şehadet nedir?",
      options: ["Namaz", "İman İlanı", "Oruç", "Hac"],
      correctAnswer: 1,
      explanation: "Şehadet İslami İman İlanıdır: 'Allah'tan başka tanrı yoktur ve Muhammed O'nun elçisidir'.",
      category: "Temel Bilgiler"
    },
    {
      id: 31,
      question: "Allah'ın Arş'ını kaç melek taşır?",
      options: ["2", "4", "8", "16"],
      correctAnswer: 2,
      explanation: "İslami geleneğe göre 8 melek Allah'ın Arş'ını taşır.",
      category: "Temel Bilgiler"
    },
    {
      id: 32,
      question: "Hangi sure 'İnek' olarak bilinir?",
      options: ["Sure 1", "Sure 2", "Sure 3", "Sure 4"],
      correctAnswer: 1,
      explanation: "Bakara Suresi (Sure 2) 'İnek' olarak bilinir çünkü bir ineğin hikayesini içerir.",
      category: "Kuran"
    },
    {
      id: 33,
      question: "Sabah namazı kaç rekat'tır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "Sabah namazı 2 rekat'tan oluşur.",
      category: "Namaz"
    },
    {
      id: 34,
      question: "Hangi peygamber doktor idi?",
      options: ["Peygamber Musa (AS)", "Peygamber İsa (AS)", "Peygamber İbrahim (AS)", "Peygamber Yusuf (AS)"],
      correctAnswer: 1,
      explanation: "Peygamber İsa (Jesus) şifa mucizelerine sahip olması ile bilinir ve Kuran'da iyileştirici olarak anılır.",
      category: "Peygamberler"
    },
    {
      id: 35,
      question: "Abdest nedir?",
      options: ["Namaz", "Ritüel temizlik", "Oruç", "Sadaka"],
      correctAnswer: 1,
      explanation: "Abdest namazdan önce yapılan ritüel temizliktir, İslami uygulamanın önemli bir parçasıdır.",
      category: "Temel Bilgiler"
    },
    {
      id: 36,
      question: "Öğle namazı kaç rekat'tır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Öğle namazı 4 rekat'tan oluşur.",
      category: "Namaz"
    },
    {
      id: 37,
      question: "Hangi peygamber çoban idi?",
      options: ["Peygamber Musa (AS)", "Peygamber Muhammed (ﷺ)", "Peygamber İbrahim (AS)", "Hepsi yukarıdaki"],
      correctAnswer: 3,
      explanation: "Musa, Muhammed ve İbrahim dahil olmak üzere birçok peygamber çoban idi.",
      category: "Peygamberler"
    },
    {
      id: 38,
      question: "İkindi namazı kaç rekat'tır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "İkindi namazı 4 rekat'tan oluşur.",
      category: "Namaz"
    },
    {
      id: 39,
      question: "Zakat al-Fitr nedir?",
      options: ["Ramazan'da sadaka", "Ramazan'ın sonunda sadaka", "Ramazan'ın başında sadaka", "Yoksullar için sadaka"],
      correctAnswer: 1,
      explanation: "Zakat al-Fitr Ramazan'ın sonunda, Bayram namazından önce verilen sadakadır.",
      category: "Temel Bilgiler"
    },
    {
      id: 40,
      question: "Yatsı namazı kaç rekat'tır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Yatsı namazı 4 rekat'tan oluşur.",
      category: "Namaz"
    }
  ],
  ar: [
    {
      id: 1,
      question: "كم عدد سور القرآن الكريم؟",
      options: ["110", "114", "120", "99"],
      correctAnswer: 1,
      explanation: "يتكون القرآن من 114 سورة نزلت في مكة والمدينة.",
      category: "القرآن"
    },
    {
      id: 2,
      question: "أي سورة تُعرف بـ 'قلب القرآن'؟",
      options: ["الفاتحة", "يس", "الإخلاص", "البقرة"],
      correctAnswer: 1,
      explanation: "سورة يس (السورة 36) تُعرف غالباً بـ 'قلب القرآن'.",
      category: "القرآن"
    },
    {
      id: 3,
      question: "كم عدد الأنبياء المذكورين بالاسم في القرآن؟",
      options: ["15", "20", "25", "30"],
      correctAnswer: 2,
      explanation: "يُذكر 25 نبياً بالاسم في القرآن، بما فيهم آدم ونوح وإبراهيم وموسى وعيسى عليهم السلام.",
      category: "الأنبياء"
    },
    {
      id: 4,
      question: "أي نبي يُذكر أكثر من غيره في القرآن؟",
      options: ["النبي محمد (ﷺ)", "النبي إبراهيم (AS)", "النبي موسى (AS)", "النبي عيسى (AS)"],
      correctAnswer: 2,
      explanation: "النبي موسى عليه السلام يُذكر أكثر من غيره في القرآن، أكثر من 130 مرة.",
      category: "الأنبياء"
    },
    {
      id: 5,
      question: "كم عدد أركان الإسلام؟",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "للإسلام 5 أركان: الشهادة والصلاة والزكاة والصوم والحج.",
      category: "الأساسيات"
    },
    {
      id: 6,
      question: "في أي شهر نزل القرآن الكريم؟",
      options: ["محرم", "رجب", "رمضان", "ذو الحجة"],
      correctAnswer: 2,
      explanation: "نزل القرآن في شهر رمضان، في ليلة القدر (لیلة القدر).",
      category: "القرآن"
    },
    {
      id: 7,
      question: "أي سورة لا تبدأ بالبسملة؟",
      options: ["التوبة", "الفاتحة", "الإخلاص", "الناس"],
      correctAnswer: 0,
      explanation: "سورة التوبة (السورة 9) هي السورة الوحيدة التي لا تبدأ بالبسملة.",
      category: "القرآن"
    },
    {
      id: 8,
      question: "كم عدد الصلوات المفروضة يومياً؟",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "هناك 5 صلوات مفروضة يومياً: الفجر والظهر والعصر والمغرب والعشاء.",
      category: "الصلاة"
    },
    {
      id: 9,
      question: "أي ملاك أحضر الوحي إلى النبي محمد (ﷺ)؟",
      options: ["ميكائيل", "إسرافيل", "جبريل", "ملك الموت"],
      correctAnswer: 2,
      explanation: "الملاك جبريل (Gabriel) أحضر الوحي من الله إلى النبي محمد (ﷺ).",
      category: "الأساسيات"
    },
    {
      id: 10,
      question: "أي سورة تُعرف بـ 'الفاتحة'?",
      options: ["البقرة", "الفاتحة", "الإخلاص", "الناس"],
      correctAnswer: 1,
      explanation: "سورة الفاتحة (السورة 1) تعني 'الفاتحة' وتُقرأ في كل صلاة.",
      category: "القرآن"
    },
    {
      id: 11,
      question: "كم عدد آيات سورة البقرة؟",
      options: ["200", "250", "286", "300"],
      correctAnswer: 2,
      explanation: "سورة البقرة (السورة 2) تحتوي على 286 آية وهي أطول سورة في القرآن.",
      category: "القرآن"
    },
    {
      id: 12,
      question: "أي نبي يُدعى 'خليل الله'؟",
      options: ["النبي محمد (ﷺ)", "النبي إبراهيم (AS)", "النبي موسى (AS)", "النبي نوح (AS)"],
      correctAnswer: 1,
      explanation: "النبي إبراهيم عليه السلام يُدعى 'خليل الله' (خليل الله) في القرآن الكريم.",
      category: "الأنبياء"
    },
    {
      id: 13,
      question: "في أي سورة تُروى قصة يوسف؟",
      options: ["السورة 10", "السورة 11", "السورة 12", "السورة 13"],
      correctAnswer: 2,
      explanation: "سورة يوسف (السورة 12) تروي القصة الكاملة للنبي يوسف عليه السلام.",
      category: "القرآن"
    },
    {
      id: 14,
      question: "كم ساعة يصوم المسلمون في رمضان؟",
      options: ["من الفجر إلى الغروب", "24 ساعة", "من منتصف الليل إلى الظهر", "من الفجر إلى المغرب"],
      correctAnswer: 3,
      explanation: "يصوم المسلمون من الفجر (صلاة الفجر) إلى المغرب (الغروب) خلال شهر رمضان.",
      category: "الأساسيات"
    },
    {
      id: 15,
      question: "أي مدينة هي الأقدس في الإسلام؟",
      options: ["المدينة المنورة", "مكة المكرمة", "القدس", "القاهرة"],
      correctAnswer: 1,
      explanation: "مكة المكرمة هي أقدس مدينة في الإسلام وتضم الكعبة الشريفة.",
      category: "الأساسيات"
    },
    {
      id: 16,
      question: "كم عدد ركعات صلاة المغرب؟",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "صلاة المغرب تتكون من 3 ركعات.",
      category: "الصلاة"
    },
    {
      id: 17,
      question: "أي شهر هو الأقدس في التقويم الإسلامي؟",
      options: ["محرم", "رجب", "رمضان", "ذو الحجة"],
      correctAnswer: 2,
      explanation: "رمضان هو الشهر الأقدس في التقويم الإسلامي وفيه نزل القرآن الكريم.",
      category: "الأساسيات"
    },
    {
      id: 18,
      question: "كم عدد أركان الإيمان في الإسلام؟",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "أركان الإيمان ستة: الإيمان بالله والملائكة والكتب والرسل واليوم الآخر والقدر.",
      category: "الأساسيات"
    },
    {
      id: 19,
      question: "أي نبي كان نجاراً؟",
      options: ["النبي نوح (AS)", "النبي موسى (AS)", "النبي عيسى (AS)", "النبي يوسف (AS)"],
      correctAnswer: 2,
      explanation: "النبي عيسى عليه السلام كان معروفاً بأنه نجار قبل أن يُبعث نبياً.",
      category: "الأنبياء"
    },
    {
      id: 20,
      question: "كم عدد آيات القرآن تقريباً؟",
      options: ["5000", "6000", "6236", "7000"],
      correctAnswer: 2,
      explanation: "القرآن الكريم يحتوي على حوالي 6236 آية (أيات).",
      category: "القرآن"
    },
    {
      id: 21,
      question: "أي نبي عاش أطول عمراً؟",
      options: ["النبي نوح (AS)", "النبي آدم (AS)", "النبي إبراهيم (AS)", "النبي موسى (AS)"],
      correctAnswer: 0,
      explanation: "النبي نوح عليه السلام عاش 950 سنة، أطول من جميع الأنبياء الآخرين.",
      category: "الأنبياء"
    },
    {
      id: 22,
      question: "في أي سنة حدثت الهجرة النبوية؟",
      options: ["610 م", "622 م", "632 م", "650 م"],
      correctAnswer: 1,
      explanation: "الهجرة النبوية حدثت سنة 622 م عندما هاجر النبي محمد (ﷺ) من مكة إلى المدينة.",
      category: "التاريخ الإسلامي"
    },
    {
      id: 23,
      question: "كم عدد أركان الزكاة؟",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "الزكاة هي أحد أركان الإسلام الخمسة وهي ركن واحد.",
      category: "الأساسيات"
    },
    {
      id: 24,
      question: "أي سورة تتحدث عن حقوق الوالدين؟",
      options: ["السورة 2", "السورة 17", "السورة 20", "السورة 31"],
      correctAnswer: 1,
      explanation: "سورة الإسراء (السورة 17) تتحدث عن حقوق الوالدين والمعاملة الحسنة لهما.",
      category: "القرآن"
    },
    {
      id: 25,
      question: "كم عدد النبيات في الإسلام؟",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "مريم عليها السلام هي الوحيدة المذكورة كنبية في القرآن الكريم.",
      category: "الأنبياء"
    },
    {
      id: 26,
      question: "ما معنى الطواف؟",
      options: ["الصيام", "الدوران حول الكعبة", "الصلاة", "الصدقة"],
      correctAnswer: 1,
      explanation: "الطواف هو الدوران حول الكعبة الشريفة وهو جزء مهم من الحج والعمرة.",
      category: "الأساسيات"
    },
    {
      id: 27,
      question: "أي نبي كان ملكاً؟",
      options: ["النبي موسى (AS)", "النبي سليمان (AS)", "النبي إبراهيم (AS)", "النبي يوسف (AS)"],
      correctAnswer: 1,
      explanation: "النبي سليمان عليه السلام كان ملكاً وأعطاه الله ملكاً لم يُعط لأحد من بعده.",
      category: "الأنبياء"
    },
    {
      id: 28,
      question: "ما اسم الليلة التي نزل فيها القرآن؟",
      options: ["ليلة الإسراء", "ليلة القدر", "ليلة بدر", "ليلة الهجرة"],
      correctAnswer: 1,
      explanation: "ليلة القدر هي الليلة التي نزل فيها القرآن الكريم.",
      category: "القرآن"
    },
    {
      id: 29,
      question: "أي نبي ابتلعه الحوت؟",
      options: ["النبي موسى (AS)", "النبي يونس (AS)", "النبي نوح (AS)", "النبي سليمان (AS)"],
      correctAnswer: 1,
      explanation: "النبي يونس عليه السلام ابتلعه حوت عظيم وقضى أياماً في بطنه.",
      category: "الأنبياء"
    },
    {
      id: 30,
      question: "ما معنى الشهادة؟",
      options: ["الصلاة", "الإقرار بالإيمان", "الصيام", "الحج"],
      correctAnswer: 1,
      explanation: "الشهادة هي الإقرار الإسلامي بالإيمان: 'لا إله إلا الله وأن محمداً رسول الله'.",
      category: "الأساسيات"
    },
    {
      id: 31,
      question: "كم ملاكاً يحملون عرش الله؟",
      options: ["2", "4", "8", "16"],
      correctAnswer: 2,
      explanation: "حسب التقليد الإسلامي، 8 ملائكة يحملون عرش الله تعالى.",
      category: "الأساسيات"
    },
    {
      id: 32,
      question: "أي سورة تُعرف بـ 'البقرة'؟",
      options: ["السورة 1", "السورة 2", "السورة 3", "السورة 4"],
      correctAnswer: 1,
      explanation: "سورة البقرة (السورة 2) تُسمى بهذا الاسم لأنها تحتوي على قصة البقرة.",
      category: "القرآن"
    },
    {
      id: 33,
      question: "كم عدد ركعات صلاة الفجر؟",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "صلاة الفجر تتكون من ركعتين فقط.",
      category: "الصلاة"
    },
    {
      id: 34,
      question: "أي نبي كان طبيباً؟",
      options: ["النبي موسى (AS)", "النبي عيسى (AS)", "النبي إبراهيم (AS)", "النبي يوسف (AS)"],
      correctAnswer: 1,
      explanation: "النبي عيسى عليه السلام معروف بمعجزاته الطبية والشفائية المذكورة في القرآن.",
      category: "الأنبياء"
    },
    {
      id: 35,
      question: "ما معنى الوضوء؟",
      options: ["الصلاة", "الطهارة الشرعية", "الصيام", "الصدقة"],
      correctAnswer: 1,
      explanation: "الوضوء هو الطهارة الشرعية قبل الصلاة وهو جزء مهم من الممارسة الإسلامية.",
      category: "الأساسيات"
    },
    {
      id: 36,
      question: "كم عدد ركعات صلاة الظهر؟",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "صلاة الظهر تتكون من 4 ركعات.",
      category: "الصلاة"
    },
    {
      id: 37,
      question: "أي نبي كان راعياً؟",
      options: ["النبي موسى (AS)", "النبي محمد (ﷺ)", "النبي إبراهيم (AS)", "جميع ما سبق"],
      correctAnswer: 3,
      explanation: "العديد من الأنبياء كانوا رعاة للغنم، بما فيهم موسى ومحمد وإبراهيم عليهم السلام.",
      category: "الأنبياء"
    },
    {
      id: 38,
      question: "كم عدد ركعات صلاة العصر؟",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "صلاة العصر تتكون من 4 ركعات.",
      category: "الصلاة"
    },
    {
      id: 39,
      question: "ما معنى زكاة الفطر؟",
      options: ["الصدقة في رمضان", "الصدقة في نهاية رمضان", "الصدقة في بداية رمضان", "الصدقة للفقراء"],
      correctAnswer: 1,
      explanation: "زكاة الفطر هي الصدقة التي تُعطى في نهاية شهر رمضان قبل صلاة العيد.",
      category: "الأساسيات"
    },
    {
      id: 40,
      question: "كم عدد ركعات صلاة العشاء؟",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "صلاة العشاء تتكون من 4 ركعات.",
      category: "الصلاة"
    }
  ]
};

// Get questions for a specific language
export function getQuestionsByLanguage(language: Language): QuizQuestion[] {
  return quizQuestionsDB[language] || quizQuestionsDB['en'];
}

// Legacy function for backwards compatibility
export const quizQuestions: QuizQuestion[] = quizQuestionsDB['de'];

// Get random questions for a quiz session (excluding already answered ones)
export function getRandomQuestions(count: number = 10, language: Language = 'de'): QuizQuestion[] {
  const questions = getQuestionsByLanguage(language);
  
  // Get answered question IDs from localStorage
  const answeredIds = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
  
  // Filter out already answered questions
  const unansweredQuestions = questions.filter(q => !answeredIds.includes(q.id));
  
  // If all questions have been answered, reset and use all questions
  const questionsPool = unansweredQuestions.length >= count ? unansweredQuestions : questions;
  
  // If resetting, clear the answered questions list
  if (unansweredQuestions.length < count) {
    localStorage.setItem('answeredQuestions', '[]');
  }
  
  // Shuffle and return
  const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questionsPool.length));
}

// Mark a question as answered
export function markQuestionAsAnswered(questionId: number) {
  const answeredIds = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
  if (!answeredIds.includes(questionId)) {
    answeredIds.push(questionId);
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredIds));
  }
}

// Get count of answered questions
export function getAnsweredCount(): number {
  const answeredIds = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
  return answeredIds.length;
}

// Reset answered questions
export function resetAnsweredQuestions() {
  localStorage.setItem('answeredQuestions', '[]');
}

// Get questions by category
export function getQuestionsByCategory(category: string, language: Language = 'de'): QuizQuestion[] {
  const questions = getQuestionsByLanguage(language);
  return questions.filter(q => q.category === category);
}

// Get all categories
export function getAllCategories(language: Language = 'de'): string[] {
  const questions = getQuestionsByLanguage(language);
  return Array.from(new Set(questions.map(q => q.category)));
}
