import { Translation } from "./de";

export const en: Translation = {
  // Navigation
  nav: {
    home: "Home",
    quran: "Quran",
    duas: "Duas",
    dhikr: "Dhikr",
    settings: "Settings",
  },

  // Home Page
  home: {
    title: "Quran & Hadith AI Chat",
    subtitle: "Your Islamic Companion",
    categories: {
      quran: "The Quran",
      duas: "Duas",
      prayerTimes: "Prayer Times",
      qibla: "Qibla Direction",
      stories: "Prophet Stories",
      dhikr: "Dhikr & Adhkar",
      progress: "Progress",
      quiz: "Quiz",
    },
    ayatOfDay: {
      title: "Verse of the Day",
      readVerse: "Go to Surah",
      theme: "Theme",
      source: "Source",
    },
    prayerWidget: {
      title: "Next Prayer",
      startsIn: "Prayer time starts in:",
      setup: "Tap here to set up prayer times",
    },
    aiChat: {
      title: "AI Assistant",
      subtitle: "Ask questions about Quran and Hadith",
      placeholder: "Enter your question...",
      send: "Send",
      remainingMessages: "{{count}} messages remaining today",
      greeting: "As-salamu alaikum! How can I help you?",
    },
    continueReading: {
      title: "Continue Reading",
      continue: "Continue",
      delete: "Delete",
    },
  },

  // Prayer Times
  prayer: {
    title: "Prayer Times",
    prayers: {
      fajr: "Fajr",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    },
    current: "Current",
    next: "Next Prayer",
    startsIn: "starts in",
    location: "Location",
    auto: "Automatic",
    manual: "Manual",
    edit: "Edit",
    selectLocation: "Select Location",
    searchCity: "Search city...",
    useAutoLocation: "Automatic",
    useManualLocation: "Manual",
    adjust: "Adjust",
    adjustTime: "Adjust Time",
    currentTime: "Current Time",
    originalTime: "Original Time",
    reset: "Reset",
    save: "Save",
    cancel: "Cancel",
    permissions: {
      denied: "Location access denied",
      enable: "Please enable location access in your browser settings",
    },
  },

  // Quran
  quran: {
    title: "The Holy Quran",
    search: "Search surahs...",
    verses: "{{count}} verses",
    revelation: "Revealed in",
    makkah: "Makkah",
    madinah: "Madinah",
    play: "Play",
    pause: "Pause",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
    tabs: {
      all: "All",
      favorites: "Favorites",
    },
    reader: {
      settings: "Settings",
      playing: "Playing (Verse {{current}}/{{total}})",
      repeat: "Repeat: {{count}}x",
      selectRepeat: "Select Repeats",
      bookmark: "Bookmark",
      copy: "Copy",
      share: "Share",
      verseNumber: "Verse {{number}}",
    },
  },

  // Duas
  duas: {
    title: "Duas (Supplications)",
    categories: {
      morning: "Morning",
      evening: "Evening",
      prayer: "Prayer",
      forgiveness: "Forgiveness",
      health: "Health",
      wealth: "Wealth",
      knowledge: "Knowledge",
      family: "Family",
      travel: "Travel",
      exams: "Exams",
      anxiety: "Anxiety",
      children: "Children",
      devotion: "Devotion",
      guidance: "Guidance",
    },
    arabic: "Arabic",
    transliteration: "Transliteration",
    translation: "Translation",
    source: "Source",
  },

  // Dhikr
  dhikr: {
    title: "Dhikr & Adhkar",
    categories: {
      morning: "Morning Adhkar",
      evening: "Evening Adhkar",
      afterPrayer: "After Prayer",
      beforeSleep: "Before Sleep",
      afterWudu: "After Wudu",
      general: "General",
    },
    counter: {
      title: "Dhikr Counter",
      tap: "Tap to Count",
      count: "{{current}} of {{target}}",
      complete: "Mashallah! Completed",
      reset: "Reset",
    },
    arabic: "Arabic",
    transliteration: "Transliteration",
    translation: "Translation",
    reward: "Reward",
  },

  // Quiz
  quiz: {
    title: "Islamic Knowledge Quiz",
    start: "Start Quiz",
    question: "Question {{current}} of {{total}}",
    checkAnswer: "Check Answer",
    nextQuestion: "Next Question",
    correct: "Correct!",
    incorrect: "Unfortunately incorrect",
    explanation: "Explanation",
    results: {
      title: "Quiz Completed!",
      score: "Your Score",
      correct: "{{count}} correct",
      incorrect: "{{count}} incorrect",
      restart: "Play Again",
      home: "Back to Home",
    },
  },

  // Progress/Statistics
  progress: {
    title: "Progress",
    reading: {
      title: "Reading Progress",
      totalTime: "Total Time",
      todayTime: "Today",
      versesRead: "Verses Read",
      surahs: "Surahs",
    },
    quiz: {
      title: "Quiz Statistics",
      questionsAnswered: "Questions Answered",
      correctAnswers: "Correct Answers",
      accuracy: "Accuracy",
    },
    dhikr: {
      title: "Dhikr Statistics",
      totalCount: "Total Count",
      sessionsCompleted: "Sessions Completed",
    },
    share: "Share Progress",
  },

  // Settings
  settings: {
    title: "Settings",
    appLanguage: {
      title: "App Language",
      description: "Choose language for the entire app",
    },
    darkMode: {
      title: "Dark Mode",
      description: "Enable dark mode for better readability at night",
    },
    transliteration: {
      title: "Transliteration",
      description: "Show Latin script under Arabic text",
    },
    translationLanguage: {
      title: "Translation Language",
      description: "Choose language for Quran translations",
    },
    readingTheme: {
      title: "Reading View",
      description: "Choose a theme for a comfortable reading experience",
    },
    reciter: {
      title: "Select Reciter",
      description: "Choose your preferred Quran reciter",
    },
    language: {
      title: "Language",
      subtitle: "Select app language",
      german: "German",
      turkish: "Turkish",
      english: "English",
    },
    translation: {
      title: "Quran Translation",
      subtitle: "Select translation language",
    },
    theme: {
      title: "Reading Theme",
      subtitle: "Choose your preferred reading theme",
      modern: "Modern (Mint Green)",
      classic: "Classic (Dark Blue)",
      sepia: "Sepia (Beige)",
      dark: "Dark",
    },
    notifications: {
      title: "Notifications",
      subtitle: "Prayer times and reminders",
      enable: "Enable Notifications",
      dailyVerse: "Daily Verse",
      readingReminder: "Reading Reminder",
    },
    widgets: {
      title: "Widgets",
      subtitle: "Customize home screen",
      prayerTimes: "Show Prayer Times Widget",
    },
    about: {
      title: "About",
      version: "Version",
      developer: "Developer",
    },
  },

  // Qibla
  qibla: {
    title: "Qibla Direction",
    subtitle: "Find the prayer direction towards Makkah",
    activate: "Activate Compass",
    calibrate: "Calibrate your device by moving it in a figure-8 pattern",
    aligned: "You are aligned with Qibla",
    direction: "Qibla Direction",
    distance: "Distance to Makkah",
    permissions: {
      denied: "Compass access denied",
      enable: "Please enable compass access",
    },
  },

  // Stories
  stories: {
    title: "Prophet Stories",
    readMore: "Read More",
    readLess: "Show Less",
    source: "Source",
  },

  // Common
  common: {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    all: "All",
    none: "None",
    yes: "Yes",
    no: "No",
    ok: "OK",
  },

  // Time units
  time: {
    hours: "{{count}}h",
    minutes: "{{count}}m",
    seconds: "{{count}}s",
    days: "{{count}} days",
    weeks: "{{count}} weeks",
    months: "{{count}} months",
  },

  // Toast messages
  toast: {
    verseCopied: "Verse copied!",
    verseShared: "Verse shared",
    bookmarkAdded: "Bookmark added",
    bookmarkRemoved: "Bookmark removed",
    favoriteAdded: "Added to favorites",
    favoriteRemoved: "Removed from favorites",
    settingsSaved: "Settings saved",
    error: "An error occurred",
    rateLimit: "Daily limit reached. Please try again tomorrow.",
    audioError: "Audio could not be played",
    locationError: "Location could not be determined",
  },
};
