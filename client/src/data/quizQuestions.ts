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
      question: "أي سورة تُعرف بـ 'الفاتحة'؟",
      options: ["البقرة", "الفاتحة", "الإخلاص", "الناس"],
      correctAnswer: 1,
      explanation: "سورة الفاتحة (السورة 1) تعني 'الفاتحة' وتُقرأ في كل صلاة.",
      category: "القرآن"
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
