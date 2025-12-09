import { Translation } from "./de";

export const tr: Translation = {
  // Navigation
  nav: {
    home: "Ana Sayfa",
    quran: "Kuran",
    duas: "Dualar",
    dhikr: "Zikirler",
    settings: "Ayarlar",
  },

  // Home Page
  home: {
    title: "Kuran & Hadis Yapay Zeka Sohbeti",
    subtitle: "İslami Rehberiniz",
    categories: {
      quran: "Kuran-ı Kerim",
      duas: "Dualar",
      prayerTimes: "Namaz Vakitleri",
      qibla: "Kıble Yönü",
      stories: "Peygamber Hikayeleri",
      dhikr: "Zikir & Dualar",
      progress: "İlerleme",
      quiz: "Bilgi Yarışması",
    },
    ayatOfDay: {
      title: "Günün Ayeti",
      readVerse: "Sureye Git",
      theme: "Konu",
      source: "Kaynak",
    },
    prayerWidget: {
      title: "Sonraki Namaz",
      startsIn: "Namaz vakti başlıyor:",
      setup: "Namaz vakitlerini ayarlamak için buraya dokunun",
    },
    aiChat: {
      title: "Yapay Zeka Asistanı",
      subtitle: "Kuran ve Hadis hakkında sorular sorun",
      placeholder: "Sorunuzu yazın...",
      send: "Gönder",
      remainingMessages: "Bugün {{count}} mesaj kaldı",
      greeting: "Esselamu aleykum! Size nasıl yardımcı olabilirim?",
    },
    continueReading: {
      title: "Okumaya Devam Et",
      continue: "Devam Et",
      delete: "Sil",
    },
  },

  // Prayer Times
  prayer: {
    title: "Namaz Vakitleri",
    prayers: {
      fajr: "İmsak",
      dhuhr: "Öğle",
      asr: "İkindi",
      maghrib: "Akşam",
      isha: "Yatsı",
    },
    current: "Şu An",
    next: "Sonraki Namaz",
    startsIn: "başlıyor",
    location: "Konum",
    auto: "Otomatik",
    manual: "Manuel",
    edit: "Düzenle",
    selectLocation: "Konum Seç",
    searchCity: "Şehir ara...",
    useAutoLocation: "Otomatik",
    useManualLocation: "Manuel",
    adjust: "Ayarla",
    adjustTime: "Zamanı Ayarla",
    currentTime: "Şu Anki Zaman",
    originalTime: "Orijinal Zaman",
    reset: "Sıfırla",
    save: "Kaydet",
    cancel: "İptal",
    permissions: {
      denied: "Konum erişimi reddedildi",
      enable: "Lütfen tarayıcı ayarlarınızdan konum erişimine izin verin",
    },
  },

  // Quran
  quran: {
    title: "Kuran-ı Kerim",
    search: "Sure ara...",
    verses: "{{count}} Ayet",
    revelation: "İndiği Yer",
    makkah: "Mekke",
    madinah: "Medine",
    play: "Oynat",
    pause: "Duraklat",
    favorite: "Favori",
    unfavorite: "Favoriden Çıkar",
    tabs: {
      all: "Tümü",
      favorites: "Favoriler",
    },
    reader: {
      settings: "Ayarlar",
      playing: "Oynatılıyor (Ayet {{current}}/{{total}})",
      repeat: "Tekrar: {{count}}x",
      selectRepeat: "Tekrar Sayısı Seç",
      bookmark: "Yer İmi",
      copy: "Kopyala",
      share: "Paylaş",
      verseNumber: "Ayet {{number}}",
    },
  },

  // Duas
  duas: {
    title: "Dualar",
    categories: {
      morning: "Sabah",
      evening: "Akşam",
      prayer: "Namaz",
      forgiveness: "Bağışlanma",
      health: "Sağlık",
      wealth: "Bereket",
      knowledge: "İlim",
      family: "Aile",
      travel: "Yolculuk",
      exams: "Sınavlar",
      anxiety: "Endişe",
      children: "Çocuklar",
      devotion: "İbadet",
      guidance: "Hidayet",
    },
    arabic: "Arapça",
    transliteration: "Okunuşu",
    translation: "Türkçe Anlamı",
    source: "Kaynak",
  },

  // Dhikr
  dhikr: {
    title: "Zikir & Dualar",
    categories: {
      morning: "Sabah Duaları",
      evening: "Akşam Duaları",
      afterPrayer: "Namaz Sonrası",
      beforeSleep: "Uyumadan Önce",
      afterWudu: "Abdest Sonrası",
      general: "Genel",
    },
    counter: {
      title: "Zikir Sayacı",
      tap: "Saymak için dokun",
      count: "{{current}} / {{target}}",
      complete: "Maşallah! Tamamlandı",
      reset: "Sıfırla",
    },
    arabic: "Arapça",
    transliteration: "Okunuşu",
    translation: "Türkçe Anlamı",
    reward: "Sevabı",
  },

  // Quiz
  quiz: {
    title: "İslami Bilgi Yarışması",
    start: "Yarışmayı Başlat",
    question: "Soru {{current}} / {{total}}",
    checkAnswer: "Cevabı Kontrol Et",
    nextQuestion: "Sonraki Soru",
    correct: "Doğru!",
    incorrect: "Maalesef yanlış",
    explanation: "Açıklama",
    results: {
      title: "Yarışma Tamamlandı!",
      score: "Puanınız",
      correct: "{{count}} doğru",
      incorrect: "{{count}} yanlış",
      restart: "Tekrar Oyna",
      home: "Ana Sayfaya Dön",
    },
  },

  // Progress/Statistics
  progress: {
    title: "İlerleme",
    reading: {
      title: "Okuma İlerlemesi",
      totalTime: "Toplam Süre",
      todayTime: "Bugün",
      versesRead: "Okunan Ayetler",
      surahs: "Sureler",
    },
    quiz: {
      title: "Yarışma İstatistikleri",
      questionsAnswered: "Cevaplanan Sorular",
      correctAnswers: "Doğru Cevaplar",
      accuracy: "Doğruluk Oranı",
    },
    dhikr: {
      title: "Zikir İstatistikleri",
      totalCount: "Toplam Sayım",
      sessionsCompleted: "Tamamlanan Oturumlar",
    },
    share: "İlerlemeyi Paylaş",
  },

  // Settings
  settings: {
    title: "Ayarlar",
    language: {
      title: "Dil",
      subtitle: "Uygulama dilini seçin",
      german: "Almanca",
      turkish: "Türkçe",
      english: "İngilizce",
    },
    translation: {
      title: "Kuran Çevirisi",
      subtitle: "Çeviri dilini seçin",
    },
    transliteration: {
      title: "Okunuşu Göster",
      subtitle: "Arapça ve çeviri arasında Latin harfleriyle okunuş",
    },
    theme: {
      title: "Okuma Teması",
      subtitle: "Tercih ettiğiniz okuma temasını seçin",
      modern: "Modern (Yeşil)",
      classic: "Klasik (Koyu Mavi)",
      sepia: "Sepya (Bej)",
      dark: "Koyu",
    },
    reciter: {
      title: "Okuyucu",
      subtitle: "Tercih ettiğiniz Kuran okuyucusunu seçin",
    },
    notifications: {
      title: "Bildirimler",
      subtitle: "Namaz vakitleri ve hatırlatmalar",
      enable: "Bildirimleri Etkinleştir",
      dailyVerse: "Günlük Ayet",
      readingReminder: "Okuma Hatırlatıcısı",
    },
    widgets: {
      title: "Widget'lar",
      subtitle: "Ana ekranı özelleştir",
      prayerTimes: "Namaz Vakitleri Widget'ını Göster",
    },
    about: {
      title: "Hakkında",
      version: "Sürüm",
      developer: "Geliştirici",
    },
  },

  // Qibla
  qibla: {
    title: "Kıble Yönü",
    subtitle: "Mekke'ye doğru namaz yönünü bulun",
    activate: "Pusulayı Etkinleştir",
    calibrate: "Cihazınızı 8 şeklinde hareket ettirerek kalibre edin",
    aligned: "Kıbleye yöneldiniz",
    direction: "Kıble Yönü",
    distance: "Mekke'ye Uzaklık",
    permissions: {
      denied: "Pusula erişimi reddedildi",
      enable: "Lütfen pusula erişimine izin verin",
    },
  },

  // Stories
  stories: {
    title: "Peygamber Hikayeleri",
    readMore: "Devamını Oku",
    readLess: "Daha Az Göster",
    source: "Kaynak",
  },

  // Common
  common: {
    loading: "Yükleniyor...",
    error: "Bir hata oluştu",
    retry: "Tekrar Dene",
    close: "Kapat",
    save: "Kaydet",
    cancel: "İptal",
    delete: "Sil",
    edit: "Düzenle",
    back: "Geri",
    next: "İleri",
    previous: "Geri",
    search: "Ara",
    filter: "Filtrele",
    all: "Tümü",
    none: "Hiçbiri",
    yes: "Evet",
    no: "Hayır",
    ok: "Tamam",
  },

  // Time units
  time: {
    hours: "{{count}}s",
    minutes: "{{count}}dk",
    seconds: "{{count}}sn",
    days: "{{count}} gün",
    weeks: "{{count}} hafta",
    months: "{{count}} ay",
  },

  // Toast messages
  toast: {
    verseCopied: "Ayet kopyalandı!",
    verseShared: "Ayet paylaşıldı",
    bookmarkAdded: "Yer imi eklendi",
    bookmarkRemoved: "Yer imi kaldırıldı",
    favoriteAdded: "Favorilere eklendi",
    favoriteRemoved: "Favorilerden çıkarıldı",
    settingsSaved: "Ayarlar kaydedildi",
    error: "Bir hata oluştu",
    rateLimit: "Günlük limit doldu. Lütfen yarın tekrar deneyin.",
    audioError: "Ses oynatılamadı",
    locationError: "Konum belirlenemedi",
  },
};
