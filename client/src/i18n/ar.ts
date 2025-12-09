import { Translation } from "./de";

export const ar: Translation = {
  // Navigation
  nav: {
    home: "الرئيسية",
    quran: "القرآن",
    duas: "الأدعية",
    dhikr: "الأذكار",
    settings: "الإعدادات",
  },

  // Home Page
  home: {
    title: "دردشة القرآن والحديث بالذكاء الاصطناعي",
    subtitle: "رفيقك الإسلامي",
    categories: {
      quran: "القرآن الكريم",
      duas: "الأدعية",
      prayerTimes: "أوقات الصلاة",
      qibla: "اتجاه القبلة",
      stories: "قصص الأنبياء",
      dhikr: "الأذكار",
      progress: "التقدم",
      quiz: "المسابقة",
    },
    ayatOfDay: {
      title: "آية اليوم",
      readVerse: "اذهب إلى السورة",
      theme: "الموضوع",
      source: "المصدر",
    },
    prayerWidget: {
      title: "الصلاة التالية",
      startsIn: "وقت الصلاة يبدأ في:",
      setup: "اضغط هنا لإعداد أوقات الصلاة",
    },
    aiChat: {
      title: "المساعد الذكي",
      subtitle: "اسأل أسئلة عن القرآن والحديث",
      placeholder: "أدخل سؤالك...",
      send: "إرسال",
      remainingMessages: "{{count}} رسائل متبقية اليوم",
      greeting: "السلام عليكم! كيف يمكنني مساعدتك؟",
    },
    continueReading: {
      title: "متابعة القراءة",
      continue: "متابعة",
      delete: "حذف",
    },
  },

  // Prayer Times
  prayer: {
    title: "أوقات الصلاة",
    prayers: {
      fajr: "الفجر",
      dhuhr: "الظهر",
      asr: "العصر",
      maghrib: "المغرب",
      isha: "العشاء",
    },
    current: "الحالي",
    next: "الصلاة التالية",
    startsIn: "يبدأ في",
    location: "الموقع",
    auto: "تلقائي",
    manual: "يدوي",
    edit: "تعديل",
    selectLocation: "اختر الموقع",
    searchCity: "ابحث عن مدينة...",
    useAutoLocation: "تلقائي",
    useManualLocation: "يدوي",
    adjust: "ضبط",
    adjustTime: "ضبط الوقت",
    currentTime: "الوقت الحالي",
    originalTime: "الوقت الأصلي",
    reset: "إعادة تعيين",
    save: "حفظ",
    cancel: "إلغاء",
    permissions: {
      denied: "تم رفض الوصول إلى الموقع",
      enable: "يرجى تمكين الوصول إلى الموقع في إعدادات المتصفح",
    },
  },

  // Quran
  quran: {
    title: "القرآن الكريم",
    search: "ابحث عن السور...",
    verses: "{{count}} آية",
    revelation: "نزلت في",
    makkah: "مكة",
    madinah: "المدينة",
    play: "تشغيل",
    pause: "إيقاف",
    favorite: "مفضلة",
    unfavorite: "إزالة من المفضلة",
    tabs: {
      all: "الكل",
      favorites: "المفضلات",
    },
    reader: {
      settings: "الإعدادات",
      playing: "يتم التشغيل (الآية {{current}}/{{total}})",
      repeat: "تكرار: {{count}}x",
      selectRepeat: "اختر عدد التكرار",
      bookmark: "إشارة مرجعية",
      copy: "نسخ",
      share: "مشاركة",
      verseNumber: "الآية {{number}}",
    },
  },

  // Duas
  duas: {
    title: "الأدعية",
    categories: {
      morning: "الصباح",
      evening: "المساء",
      prayer: "الصلاة",
      forgiveness: "المغفرة",
      health: "الصحة",
      wealth: "الرزق",
      knowledge: "العلم",
      family: "الأسرة",
      travel: "السفر",
      exams: "الامتحانات",
      anxiety: "القلق",
      children: "الأطفال",
      devotion: "العبادة",
      guidance: "الهداية",
    },
    arabic: "العربية",
    transliteration: "النطق",
    translation: "الترجمة",
    source: "المصدر",
  },

  // Dhikr
  dhikr: {
    title: "الأذكار",
    categories: {
      morning: "أذكار الصباح",
      evening: "أذكار المساء",
      afterPrayer: "بعد الصلاة",
      beforeSleep: "قبل النوم",
      afterWudu: "بعد الوضوء",
      general: "عامة",
    },
    counter: {
      title: "عداد الذكر",
      tap: "اضغط للعد",
      count: "{{current}} من {{target}}",
      complete: "ماشاء الله! اكتمل",
      reset: "إعادة تعيين",
    },
    arabic: "العربية",
    transliteration: "النطق",
    translation: "الترجمة",
    reward: "الأجر",
  },

  // Quiz
  quiz: {
    title: "مسابقة المعرفة الإسلامية",
    start: "ابدأ المسابقة",
    question: "السؤال {{current}} من {{total}}",
    checkAnswer: "تحقق من الإجابة",
    nextQuestion: "السؤال التالي",
    correct: "صحيح!",
    incorrect: "للأسف خطأ",
    explanation: "الشرح",
    results: {
      title: "اكتملت المسابقة!",
      score: "نتيجتك",
      correct: "{{count}} صحيح",
      incorrect: "{{count}} خطأ",
      restart: "العب مرة أخرى",
      home: "العودة إلى الرئيسية",
    },
  },

  // Progress/Statistics
  progress: {
    title: "التقدم",
    reading: {
      title: "تقدم القراءة",
      totalTime: "الوقت الإجمالي",
      todayTime: "اليوم",
      versesRead: "الآيات المقروءة",
      surahs: "السور",
    },
    quiz: {
      title: "إحصائيات المسابقة",
      questionsAnswered: "الأسئلة المجابة",
      correctAnswers: "الإجابات الصحيحة",
      accuracy: "الدقة",
    },
    dhikr: {
      title: "إحصائيات الذكر",
      totalCount: "العدد الإجمالي",
      sessionsCompleted: "الجلسات المكتملة",
    },
    share: "مشاركة التقدم",
  },

  // Settings
  settings: {
    title: "الإعدادات",
    language: {
      title: "اللغة",
      subtitle: "اختر لغة التطبيق",
      german: "الألمانية",
      turkish: "التركية",
      english: "الإنجليزية",
    },
    translation: {
      title: "ترجمة القرآن",
      subtitle: "اختر لغة الترجمة",
    },
    transliteration: {
      title: "إظهار النطق",
      subtitle: "النطق بالحروف اللاتينية بين العربية والترجمة",
    },
    theme: {
      title: "موضوع القراءة",
      subtitle: "اختر موضوع القراءة المفضل لديك",
      modern: "حديث (أخضر نعناعي)",
      classic: "كلاسيكي (أزرق داكن)",
      sepia: "بني فاتح",
      dark: "داكن",
    },
    reciter: {
      title: "القارئ",
      subtitle: "اختر قارئ القرآن المفضل لديك",
    },
    notifications: {
      title: "الإشعارات",
      subtitle: "أوقات الصلاة والتذكيرات",
      enable: "تفعيل الإشعارات",
      dailyVerse: "آية يومية",
      readingReminder: "تذكير القراءة",
    },
    widgets: {
      title: "الأدوات",
      subtitle: "تخصيص الشاشة الرئيسية",
      prayerTimes: "إظهار أداة أوقات الصلاة",
    },
    about: {
      title: "حول",
      version: "الإصدار",
      developer: "المطور",
    },
  },

  // Qibla
  qibla: {
    title: "اتجاه القبلة",
    subtitle: "اعثر على اتجاه الصلاة نحو مكة",
    activate: "تفعيل البوصلة",
    calibrate: "قم بمعايرة جهازك عن طريق تحريكه في شكل 8",
    aligned: "أنت متجه نحو القبلة",
    direction: "اتجاه القبلة",
    distance: "المسافة إلى مكة",
    permissions: {
      denied: "تم رفض الوصول إلى البوصلة",
      enable: "يرجى تمكين الوصول إلى البوصلة",
    },
  },

  // Stories
  stories: {
    title: "قصص الأنبياء",
    readMore: "اقرأ المزيد",
    readLess: "إظهار أقل",
    source: "المصدر",
  },

  // Common
  common: {
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    retry: "إعادة المحاولة",
    close: "إغلاق",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    search: "بحث",
    filter: "تصفية",
    all: "الكل",
    none: "لا شيء",
    yes: "نعم",
    no: "لا",
    ok: "حسناً",
  },

  // Time units
  time: {
    hours: "{{count}}س",
    minutes: "{{count}}د",
    seconds: "{{count}}ث",
    days: "{{count}} أيام",
    weeks: "{{count}} أسابيع",
    months: "{{count}} أشهر",
  },

  // Toast messages
  toast: {
    verseCopied: "تم نسخ الآية!",
    verseShared: "تمت مشاركة الآية",
    bookmarkAdded: "تمت إضافة الإشارة المرجعية",
    bookmarkRemoved: "تمت إزالة الإشارة المرجعية",
    favoriteAdded: "تمت الإضافة إلى المفضلات",
    favoriteRemoved: "تمت الإزالة من المفضلات",
    settingsSaved: "تم حفظ الإعدادات",
    error: "حدث خطأ",
    rateLimit: "تم الوصول إلى الحد اليومي. يرجى المحاولة غداً.",
    audioError: "تعذر تشغيل الصوت",
    locationError: "تعذر تحديد الموقع",
  },
};
