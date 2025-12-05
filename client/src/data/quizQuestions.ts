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
    options: ["Mikail", "Israfil", "Jibril", "Azrail"],
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
    options: ["Jibril", "Mikail", "Israfil", "Azrail"],
    correctAnswer: 2,
    explanation: "Der Engel Israfil wird die Posaune am Tag des Gerichts blasen.",
    category: "Grundlagen"
  }
];

// Get random questions for a quiz session
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, quizQuestions.length));
}

// Get questions by category
export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(quizQuestions.map(q => q.category)));
}
