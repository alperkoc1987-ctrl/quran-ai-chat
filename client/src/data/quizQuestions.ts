// Islamic Quiz Questions with 4 answer options
// Covering various topics: Quran, Prophets, Islamic History, Pillars of Islam, etc.

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
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
    question: "Wie lange dauerte die Offenbarung des Korans?",
    options: ["10 Jahre", "15 Jahre", "23 Jahre", "30 Jahre"],
    correctAnswer: 2,
    explanation: "Der Koran wurde über einen Zeitraum von 23 Jahren offenbart.",
    category: "Koran"
  },
  {
    id: 12,
    question: "Welcher Prophet baute die Kaaba?",
    options: ["Prophet Adam (AS)", "Prophet Ibrahim (AS)", "Prophet Ismail (AS)", "Prophet Ibrahim und Ismail (AS)"],
    correctAnswer: 3,
    explanation: "Prophet Ibrahim (Abraham) und sein Sohn Ismail (Ismael) bauten die Kaaba gemeinsam.",
    category: "Propheten"
  },
  {
    id: 13,
    question: "Welche Sure ist die längste im Koran?",
    options: ["Al-Fatiha", "Al-Baqarah", "Ali 'Imran", "An-Nisa"],
    correctAnswer: 1,
    explanation: "Sure Al-Baqarah (Sure 2) ist mit 286 Versen die längste Sure im Koran.",
    category: "Koran"
  },
  {
    id: 14,
    question: "Welche Sure ist die kürzeste im Koran?",
    options: ["Al-Ikhlas", "Al-Kawthar", "An-Nasr", "Al-Asr"],
    correctAnswer: 1,
    explanation: "Sure Al-Kawthar (Sure 108) ist mit nur 3 Versen die kürzeste Sure im Koran.",
    category: "Koran"
  },
  {
    id: 15,
    question: "Wie viele Mal wird das Wort 'Allah' im Koran erwähnt?",
    options: ["Etwa 1000 Mal", "Etwa 2000 Mal", "Etwa 2699 Mal", "Etwa 5000 Mal"],
    correctAnswer: 2,
    explanation: "Das Wort 'Allah' wird im Koran etwa 2699 Mal erwähnt.",
    category: "Koran"
  },
  {
    id: 16,
    question: "Welcher Prophet konnte mit Tieren sprechen?",
    options: ["Prophet Musa (AS)", "Prophet Sulaiman (AS)", "Prophet Yusuf (AS)", "Prophet Isa (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Sulaiman (Salomo) hatte die Gabe, mit Tieren und Vögeln zu sprechen.",
    category: "Propheten"
  },
  {
    id: 17,
    question: "In welchem Jahr fand die Hijra (Auswanderung nach Medina) statt?",
    options: ["610 n.Chr.", "622 n.Chr.", "630 n.Chr.", "632 n.Chr."],
    correctAnswer: 1,
    explanation: "Die Hijra fand im Jahr 622 n.Chr. statt und markiert den Beginn des islamischen Kalenders.",
    category: "Geschichte"
  },
  {
    id: 18,
    question: "Welcher Prophet wurde von einem Wal verschluckt?",
    options: ["Prophet Yunus (AS)", "Prophet Nuh (AS)", "Prophet Musa (AS)", "Prophet Dawud (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Yunus (Jona) wurde von einem großen Fisch (oft als Wal bezeichnet) verschluckt.",
    category: "Propheten"
  },
  {
    id: 19,
    question: "Wie viele Verse hat der Koran ungefähr?",
    options: ["5000", "6000", "6236", "7000"],
    correctAnswer: 2,
    explanation: "Der Koran hat etwa 6236 Verse (die genaue Zahl variiert je nach Zählweise).",
    category: "Koran"
  },
  {
    id: 20,
    question: "Welcher Monat ist der heiligste im islamischen Kalender?",
    options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
    correctAnswer: 2,
    explanation: "Ramadan ist der heiligste Monat, in dem Muslime fasten und der Koran offenbart wurde.",
    category: "Grundlagen"
  },
  {
    id: 21,
    question: "Welcher Prophet erhielt die Psalmen (Zabur)?",
    options: ["Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Dawud (AS)", "Prophet Isa (AS)"],
    correctAnswer: 2,
    explanation: "Prophet Dawud (David) erhielt die Psalmen (Zabur) als göttliche Offenbarung.",
    category: "Propheten"
  },
  {
    id: 22,
    question: "Wie viele Mal am Tag sollte ein Muslim beten?",
    options: ["3 Mal", "5 Mal", "7 Mal", "10 Mal"],
    correctAnswer: 1,
    explanation: "Ein Muslim sollte 5 Mal am Tag beten: Fajr, Dhuhr, Asr, Maghrib und Isha.",
    category: "Gebet"
  },
  {
    id: 23,
    question: "Welche Sure wird auch 'Sure der Aufrichtigkeit' genannt?",
    options: ["Al-Fatiha", "Al-Ikhlas", "Al-Falaq", "An-Nas"],
    correctAnswer: 1,
    explanation: "Sure Al-Ikhlas (Sure 112) bedeutet 'Die Aufrichtigkeit' und beschreibt die Einheit Allahs.",
    category: "Koran"
  },
  {
    id: 24,
    question: "Welcher Prophet wurde in den Brunnen geworfen?",
    options: ["Prophet Yusuf (AS)", "Prophet Musa (AS)", "Prophet Yunus (AS)", "Prophet Isa (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Yusuf (Josef) wurde von seinen Brüdern in einen Brunnen geworfen.",
    category: "Propheten"
  },
  {
    id: 25,
    question: "Wie viele Juz (Teile) hat der Koran?",
    options: ["20", "25", "30", "40"],
    correctAnswer: 2,
    explanation: "Der Koran ist in 30 Juz (Teile) unterteilt, was das Lesen während des Ramadan erleichtert.",
    category: "Koran"
  },
  {
    id: 26,
    question: "Welcher Prophet teilte das Meer?",
    options: ["Prophet Nuh (AS)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
    correctAnswer: 2,
    explanation: "Prophet Musa (Moses) teilte mit Allahs Erlaubnis das Rote Meer, um die Israeliten zu retten.",
    category: "Propheten"
  },
  {
    id: 27,
    question: "Welche Nacht im Ramadan ist besser als tausend Monate?",
    options: ["Die erste Nacht", "Die 15. Nacht", "Lailat al-Qadr", "Die letzte Nacht"],
    correctAnswer: 2,
    explanation: "Lailat al-Qadr (Die Nacht der Macht) ist besser als tausend Monate und fällt in eine der letzten 10 Nächte des Ramadan.",
    category: "Grundlagen"
  },
  {
    id: 28,
    question: "Welcher Prophet lebte 950 Jahre?",
    options: ["Prophet Adam (AS)", "Prophet Nuh (AS)", "Prophet Ibrahim (AS)", "Prophet Idris (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Nuh (Noah) lebte 950 Jahre und predigte seinem Volk über diesen langen Zeitraum.",
    category: "Propheten"
  },
  {
    id: 29,
    question: "Welche Stadt ist die heiligste im Islam?",
    options: ["Medina", "Jerusalem", "Mekka", "Kairo"],
    correctAnswer: 2,
    explanation: "Mekka ist die heiligste Stadt im Islam, wo sich die Kaaba befindet.",
    category: "Grundlagen"
  },
  {
    id: 30,
    question: "Welcher Engel ist für das Blasen der Posaune am Tag des Gerichts zuständig?",
    options: ["Jibril", "Mikail", "Israfil", "Malak al-Maut"],
    correctAnswer: 2,
    explanation: "Der Engel Israfil wird die Posaune am Tag des Gerichts blasen.",
    category: "Grundlagen"
  },
  {
    id: 31,
    question: "Welcher Prophet wurde ohne Vater geboren?",
    options: ["Prophet Adam (AS)", "Prophet Isa (AS)", "Prophet Yahya (AS)", "Prophet Ibrahim (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Isa (Jesus) wurde durch ein Wunder Allahs ohne Vater geboren.",
    category: "Propheten"
  },
  {
    id: 32,
    question: "Wie viele Säulen hat der Glaube (Iman)?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "Der Glaube hat 6 Säulen: Glaube an Allah, Engel, Bücher, Propheten, Jüngsten Tag und Qadar (Schicksal).",
    category: "Grundlagen"
  },
  {
    id: 33,
    question: "Welche Sure enthält das Ayat al-Kursi (Thronvers)?",
    options: ["Al-Fatiha", "Al-Baqarah", "Ali 'Imran", "An-Nisa"],
    correctAnswer: 1,
    explanation: "Ayat al-Kursi befindet sich in Sure Al-Baqarah, Vers 255.",
    category: "Koran"
  },
  {
    id: 34,
    question: "Welcher Gefährte wurde als 'Schwert Allahs' bezeichnet?",
    options: ["Abu Bakr", "Umar ibn al-Khattab", "Khalid ibn al-Walid", "Ali ibn Abi Talib"],
    correctAnswer: 2,
    explanation: "Khalid ibn al-Walid wurde vom Propheten (ﷺ) als 'Schwert Allahs' bezeichnet.",
    category: "Geschichte"
  },
  {
    id: 35,
    question: "Wie viele Rakaat hat das Fajr-Gebet?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 0,
    explanation: "Das Fajr-Gebet besteht aus 2 Rakaat.",
    category: "Gebet"
  },
  {
    id: 36,
    question: "Welcher Prophet baute die Arche?",
    options: ["Prophet Adam (AS)", "Prophet Nuh (AS)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Nuh (Noah) baute die Arche auf Allahs Befehl, um vor der Flut zu retten.",
    category: "Propheten"
  },
  {
    id: 37,
    question: "Welche Sure beginnt ohne Bismillah?",
    options: ["At-Tawbah", "Al-Anfal", "Al-Fatiha", "Al-Ikhlas"],
    correctAnswer: 0,
    explanation: "Sure At-Tawbah (Sure 9) ist die einzige Sure ohne Bismillah am Anfang.",
    category: "Koran"
  },
  {
    id: 38,
    question: "Wie heißt der erste Muezzin im Islam?",
    options: ["Abu Bakr", "Umar", "Bilal ibn Rabah", "Ali"],
    correctAnswer: 2,
    explanation: "Bilal ibn Rabah war der erste Muezzin im Islam.",
    category: "Geschichte"
  },
  {
    id: 39,
    question: "Welcher Prophet konnte Tote wieder zum Leben erwecken?",
    options: ["Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Ibrahim (AS)", "Prophet Sulaiman (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Isa (Jesus) konnte mit Allahs Erlaubnis Tote wieder zum Leben erwecken.",
    category: "Propheten"
  },
  {
    id: 40,
    question: "Wie viele Prozent Zakat muss man auf Vermögen zahlen?",
    options: ["1,5%", "2,5%", "5%", "10%"],
    correctAnswer: 1,
    explanation: "Die Zakat beträgt 2,5% des Vermögens, das ein Jahr lang im Besitz war.",
    category: "Grundlagen"
  },
  {
    id: 41,
    question: "Welcher Prophet wurde in Ägypten zum Minister ernannt?",
    options: ["Prophet Yusuf (AS)", "Prophet Musa (AS)", "Prophet Harun (AS)", "Prophet Lut (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Yusuf (Josef) wurde zum Minister über die Vorräte Ägyptens ernannt.",
    category: "Propheten"
  },
  {
    id: 42,
    question: "Welche Sure wird empfohlen, jeden Freitag zu lesen?",
    options: ["Al-Baqarah", "Ya-Sin", "Al-Kahf", "Al-Mulk"],
    correctAnswer: 2,
    explanation: "Sure Al-Kahf (Die Höhle) wird empfohlen, jeden Freitag zu lesen.",
    category: "Koran"
  },
  {
    id: 43,
    question: "Wie viele Tage dauert die Hajj-Pilgerfahrt mindestens?",
    options: ["3 Tage", "5 Tage", "7 Tage", "10 Tage"],
    correctAnswer: 1,
    explanation: "Die Hajj dauert mindestens 5 Tage, vom 8. bis 12. Dhul-Hijjah.",
    category: "Grundlagen"
  },
  {
    id: 44,
    question: "Welcher Engel ist für den Regen zuständig?",
    options: ["Jibril", "Mikail", "Israfil", "Malak al-Maut"],
    correctAnswer: 1,
    explanation: "Der Engel Mikail (Michael) ist für den Regen und die Versorgung zuständig.",
    category: "Grundlagen"
  },
  {
    id: 45,
    question: "Welcher Prophet hatte die Gabe, Eisen zu formen?",
    options: ["Prophet Sulaiman (AS)", "Prophet Dawud (AS)", "Prophet Musa (AS)", "Prophet Ibrahim (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Dawud (David) konnte Eisen mit seinen Händen formen.",
    category: "Propheten"
  },
  {
    id: 46,
    question: "Welche Sure wird vor dem Schlafengehen empfohlen?",
    options: ["Al-Fatiha", "Al-Mulk", "Ya-Sin", "Al-Baqarah"],
    correctAnswer: 1,
    explanation: "Sure Al-Mulk (Sure 67) wird empfohlen, vor dem Schlafengehen zu lesen.",
    category: "Koran"
  },
  {
    id: 47,
    question: "Wie viele Rakaat hat das Maghrib-Gebet?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "Das Maghrib-Gebet besteht aus 3 Rakaat.",
    category: "Gebet"
  },
  {
    id: 48,
    question: "Welcher Prophet wurde von seinen Brüdern verkauft?",
    options: ["Prophet Yusuf (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Yahya (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Yusuf (Josef) wurde von seinen Brüdern als Sklave verkauft.",
    category: "Propheten"
  },
  {
    id: 49,
    question: "Welche Sure enthält die Geschichte der Höhlenbewohner?",
    options: ["Al-Baqarah", "Al-Kahf", "Maryam", "Ta-Ha"],
    correctAnswer: 1,
    explanation: "Sure Al-Kahf (Die Höhle) erzählt die Geschichte der Höhlenbewohner.",
    category: "Koran"
  },
  {
    id: 50,
    question: "Wie heißt die Frau des Propheten Muhammad (ﷺ), die als erste zum Islam konvertierte?",
    options: ["Aisha", "Khadija", "Hafsa", "Fatima"],
    correctAnswer: 1,
    explanation: "Khadija bint Khuwaylid war die erste Person, die zum Islam konvertierte.",
    category: "Geschichte"
  },
  {
    id: 51,
    question: "Welcher Prophet sprach als Baby?",
    options: ["Prophet Isa (AS)", "Prophet Yahya (AS)", "Prophet Musa (AS)", "Prophet Ibrahim (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Isa (Jesus) sprach als Baby, um seine Mutter Maryam zu verteidigen.",
    category: "Propheten"
  },
  {
    id: 52,
    question: "Welche Sure enthält die Geschichte von Maryam (Maria)?",
    options: ["Al-Baqarah", "Ali 'Imran", "Maryam", "Al-Kahf"],
    correctAnswer: 2,
    explanation: "Sure Maryam (Sure 19) ist nach Maryam benannt und erzählt ihre Geschichte.",
    category: "Koran"
  },
  {
    id: 53,
    question: "Wie viele Rakaat hat das Dhuhr-Gebet?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Das Dhuhr-Gebet besteht aus 4 Rakaat.",
    category: "Gebet"
  },
  {
    id: 54,
    question: "Welcher Prophet wurde in einem Korb im Fluss ausgesetzt?",
    options: ["Prophet Musa (AS)", "Prophet Yusuf (AS)", "Prophet Ibrahim (AS)", "Prophet Isa (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Musa (Moses) wurde als Baby in einem Korb im Nil ausgesetzt.",
    category: "Propheten"
  },
  {
    id: 55,
    question: "Welche Sure wird auch 'Die Zuflucht' genannt?",
    options: ["Al-Ikhlas", "Al-Falaq", "An-Nas", "Al-Fatiha"],
    correctAnswer: 1,
    explanation: "Sure Al-Falaq (Sure 113) bedeutet 'Die Morgendämmerung' und dient als Schutzgebet.",
    category: "Koran"
  },
  {
    id: 56,
    question: "Welcher Kalif war der erste nach dem Propheten Muhammad (ﷺ)?",
    options: ["Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", "Abu Bakr as-Siddiq"],
    correctAnswer: 3,
    explanation: "Abu Bakr as-Siddiq war der erste Kalif nach dem Tod des Propheten (ﷺ).",
    category: "Geschichte"
  },
  {
    id: 57,
    question: "Welcher Prophet wurde von Feuer verschont?",
    options: ["Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Nuh (AS)", "Prophet Lut (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Ibrahim (Abraham) wurde ins Feuer geworfen, aber Allah machte es kühl und sicher für ihn.",
    category: "Propheten"
  },
  {
    id: 58,
    question: "Wie viele Mal wird das Wort 'Salat' (Gebet) im Koran erwähnt?",
    options: ["Etwa 50 Mal", "Etwa 67 Mal", "Etwa 100 Mal", "Etwa 150 Mal"],
    correctAnswer: 1,
    explanation: "Das Wort 'Salat' wird im Koran etwa 67 Mal erwähnt.",
    category: "Koran"
  },
  {
    id: 59,
    question: "Welcher Prophet hatte Kontrolle über die Dschinn?",
    options: ["Prophet Musa (AS)", "Prophet Sulaiman (AS)", "Prophet Dawud (AS)", "Prophet Isa (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Sulaiman (Salomo) hatte Kontrolle über die Dschinn und konnte mit ihnen kommunizieren.",
    category: "Propheten"
  },
  {
    id: 60,
    question: "Welche Sure wird auch 'Die Königsherrschaft' genannt?",
    options: ["Al-Mulk", "Al-Fatiha", "Ya-Sin", "Al-Baqarah"],
    correctAnswer: 0,
    explanation: "Sure Al-Mulk (Sure 67) bedeutet 'Die Königsherrschaft' oder 'Die Herrschaft'.",
    category: "Koran"
  },
  {
    id: 61,
    question: "Wie viele Rakaat hat das Asr-Gebet?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Das Asr-Gebet besteht aus 4 Rakaat.",
    category: "Gebet"
  },
  {
    id: 62,
    question: "Welcher Prophet wurde von seinem eigenen Volk abgelehnt?",
    options: ["Alle Propheten", "Nur Prophet Muhammad (ﷺ)", "Nur Prophet Nuh (AS)", "Nur Prophet Musa (AS)"],
    correctAnswer: 0,
    explanation: "Alle Propheten wurden zunächst von einem Teil ihres Volkes abgelehnt.",
    category: "Propheten"
  },
  {
    id: 63,
    question: "Welche Sure enthält die Geschichte von Pharao?",
    options: ["Al-Baqarah", "Yunus", "Ta-Ha", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Die Geschichte von Pharao wird in mehreren Suren erwähnt, darunter Al-Baqarah, Yunus und Ta-Ha.",
    category: "Koran"
  },
  {
    id: 64,
    question: "Wie viele Rakaat hat das Isha-Gebet?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Das Isha-Gebet besteht aus 4 Rakaat.",
    category: "Gebet"
  },
  {
    id: 65,
    question: "Welcher Prophet wurde von einem Vogel gefüttert?",
    options: ["Prophet Ibrahim (AS)", "Prophet Ilyas (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Ilyas (Elias) wurde von Vögeln mit Nahrung versorgt.",
    category: "Propheten"
  },
  {
    id: 66,
    question: "Welche Sure wird auch 'Die Menschen' genannt?",
    options: ["Al-Fatiha", "Al-Ikhlas", "Al-Falaq", "An-Nas"],
    correctAnswer: 3,
    explanation: "Sure An-Nas (Sure 114) bedeutet 'Die Menschen' und ist die letzte Sure im Koran.",
    category: "Koran"
  },
  {
    id: 67,
    question: "Welcher Gefährte war bekannt für sein Wissen über den Koran?",
    options: ["Abu Bakr", "Umar", "Abdullah ibn Masud", "Khalid ibn al-Walid"],
    correctAnswer: 2,
    explanation: "Abdullah ibn Masud war einer der größten Gelehrten des Korans unter den Gefährten.",
    category: "Geschichte"
  },
  {
    id: 68,
    question: "Welcher Prophet wurde zum Himmel erhoben?",
    options: ["Prophet Isa (AS)", "Prophet Idris (AS)", "Prophet Muhammad (ﷺ)", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Prophet Isa wurde zum Himmel erhoben, Prophet Idris ebenfalls, und Prophet Muhammad (ﷺ) während der Isra und Mi'raj.",
    category: "Propheten"
  },
  {
    id: 69,
    question: "Welche Sure enthält die Geschichte von Adam (AS)?",
    options: ["Al-Baqarah", "Al-A'raf", "Ta-Ha", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Die Geschichte von Adam wird in mehreren Suren erwähnt, darunter Al-Baqarah, Al-A'raf und Ta-Ha.",
    category: "Koran"
  },
  {
    id: 70,
    question: "Wie heißt das Gebet, das vor Sonnenaufgang verrichtet wird?",
    options: ["Dhuhr", "Asr", "Fajr", "Maghrib"],
    correctAnswer: 2,
    explanation: "Das Fajr-Gebet wird vor Sonnenaufgang verrichtet.",
    category: "Gebet"
  },
  {
    id: 71,
    question: "Welcher Prophet hatte 12 Söhne?",
    options: ["Prophet Ibrahim (AS)", "Prophet Yaqub (AS)", "Prophet Ismail (AS)", "Prophet Ishaq (AS)"],
    correctAnswer: 1,
    explanation: "Prophet Yaqub (Jakob) hatte 12 Söhne, die zu den 12 Stämmen Israels wurden.",
    category: "Propheten"
  },
  {
    id: 72,
    question: "Welche Sure wird auch 'Die Kuh' genannt?",
    options: ["Al-Fatiha", "Al-Baqarah", "Ali 'Imran", "An-Nisa"],
    correctAnswer: 1,
    explanation: "Sure Al-Baqarah (Sure 2) bedeutet 'Die Kuh' und ist die längste Sure im Koran.",
    category: "Koran"
  },
  {
    id: 73,
    question: "Welcher Kalif ließ den Koran in Buchform zusammenstellen?",
    options: ["Abu Bakr", "Umar", "Uthman", "Ali"],
    correctAnswer: 2,
    explanation: "Kalif Uthman ibn Affan ließ den Koran in einer einheitlichen Buchform zusammenstellen.",
    category: "Geschichte"
  },
  {
    id: 74,
    question: "Welcher Prophet wurde von Allah direkt angesprochen?",
    options: ["Prophet Musa (AS)", "Prophet Ibrahim (AS)", "Prophet Muhammad (ﷺ)", "Prophet Isa (AS)"],
    correctAnswer: 0,
    explanation: "Prophet Musa (Moses) wurde von Allah direkt angesprochen, weshalb er 'Kalimullah' (der mit Allah sprach) genannt wird.",
    category: "Propheten"
  },
  {
    id: 75,
    question: "Welche Sure wird auch 'Die Familie Imrans' genannt?",
    options: ["Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah"],
    correctAnswer: 1,
    explanation: "Sure Ali 'Imran (Sure 3) bedeutet 'Die Familie Imrans' und erzählt von der Familie Maryams.",
    category: "Koran"
  },
  {
    id: 76,
    question: "Wie viele Suren beginnen mit 'Alif Lam Mim'?",
    options: ["3", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "6 Suren beginnen mit den Buchstaben 'Alif Lam Mim': Al-Baqarah, Ali 'Imran, Al-Ankabut, Ar-Rum, Luqman und As-Sajda.",
    category: "Koran"
  },
  {
    id: 77,
    question: "Welcher Prophet wurde von seinem Bruder begleitet?",
    options: ["Prophet Musa und Harun (AS)", "Prophet Ibrahim und Ismail (AS)", "Prophet Yaqub und Yusuf (AS)", "Alle genannten"],
    correctAnswer: 0,
    explanation: "Prophet Musa (Moses) wurde von seinem Bruder Harun (Aaron) als Prophet begleitet.",
    category: "Propheten"
  },
  {
    id: 78,
    question: "Welche Sure wird auch 'Die Frauen' genannt?",
    options: ["Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah"],
    correctAnswer: 2,
    explanation: "Sure An-Nisa (Sure 4) bedeutet 'Die Frauen' und behandelt viele Rechte und Pflichten der Frauen.",
    category: "Koran"
  },
  {
    id: 79,
    question: "Welcher Gefährte war bekannt für seine Gerechtigkeit?",
    options: ["Abu Bakr", "Umar ibn al-Khattab", "Uthman", "Ali"],
    correctAnswer: 1,
    explanation: "Umar ibn al-Khattab war bekannt für seine strenge Gerechtigkeit und sein gerechtes Urteil.",
    category: "Geschichte"
  },
  {
    id: 80,
    question: "Welcher Prophet wurde von einem Engel im Traum besucht?",
    options: ["Prophet Ibrahim (AS)", "Prophet Yusuf (AS)", "Prophet Muhammad (ﷺ)", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Viele Propheten erhielten Offenbarungen durch Träume, darunter Ibrahim, Yusuf und Muhammad (ﷺ).",
    category: "Propheten"
  },
  {
    id: 81,
    question: "Welche Sure wird auch 'Der Tisch' genannt?",
    options: ["An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf"],
    correctAnswer: 1,
    explanation: "Sure Al-Ma'idah (Sure 5) bedeutet 'Der Tisch' und bezieht sich auf den Tisch, den die Jünger von Isa (AS) erbaten.",
    category: "Koran"
  },
  {
    id: 82,
    question: "Welcher Prophet wurde von seinem Volk gesteinigt?",
    options: ["Prophet Nuh (AS)", "Prophet Lut (AS)", "Prophet Shuayb (AS)", "Mehrere Propheten"],
    correctAnswer: 3,
    explanation: "Mehrere Propheten wurden von ihrem Volk bedroht oder angegriffen, darunter Nuh, Lut und Shuayb.",
    category: "Propheten"
  },
  {
    id: 83,
    question: "Welche Sure enthält die Geschichte von Dhul-Qarnayn?",
    options: ["Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya"],
    correctAnswer: 0,
    explanation: "Sure Al-Kahf (Die Höhle) erzählt die Geschichte von Dhul-Qarnayn, dem großen Herrscher.",
    category: "Koran"
  },
  {
    id: 84,
    question: "Welcher Engel ist für das Nehmen der Seelen zuständig?",
    options: ["Jibril", "Mikail", "Israfil", "Malak al-Maut"],
    correctAnswer: 3,
    explanation: "Malak al-Maut (der Todesengel) ist für das Nehmen der Seelen zuständig. Dies ist der authentische Name aus dem Koran.",
    category: "Grundlagen"
  },
  {
    id: 85,
    question: "Welcher Prophet wurde von seinem Sohn getrennt?",
    options: ["Prophet Yaqub (AS)", "Prophet Ibrahim (AS)", "Prophet Nuh (AS)", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Yaqub wurde von Yusuf getrennt, Ibrahim von Ismail, und Nuh von seinem ungläubigen Sohn.",
    category: "Propheten"
  }
];

// Get random questions for a quiz session (excluding already answered ones)
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  // Get answered question IDs from localStorage
  const answeredIds = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
  
  // Filter out already answered questions
  const unansweredQuestions = quizQuestions.filter(q => !answeredIds.includes(q.id));
  
  // If all questions have been answered, reset and use all questions
  const questionsPool = unansweredQuestions.length >= count ? unansweredQuestions : quizQuestions;
  
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
export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(quizQuestions.map(q => q.category)));
}
