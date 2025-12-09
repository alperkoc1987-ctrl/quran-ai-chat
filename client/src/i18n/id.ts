import { Translation } from "./de";

export const id: Translation = {
  nav: { home: "Beranda", quran: "Al-Qur'an", duas: "Doa", dhikr: "Dzikir", settings: "Pengaturan" },
  home: {
    title: "Chat AI Al-Qur'an & Hadits",
    subtitle: "Pendamping Islami Anda",
    categories: { quran: "Al-Qur'an", duas: "Doa-doa", prayerTimes: "Waktu Shalat", qibla: "Arah Kiblat", stories: "Kisah Para Nabi", dhikr: "Dzikir & Wirid", progress: "Kemajuan", quiz: "Kuis" },
    ayatOfDay: { title: "Ayat Hari Ini", readVerse: "Ke Surah", theme: "Tema", source: "Sumber" },
    prayerWidget: { title: "Shalat Berikutnya", startsIn: "Waktu shalat dimulai dalam:", setup: "Ketuk di sini untuk mengatur waktu shalat" },
    aiChat: { title: "Asisten AI", subtitle: "Tanyakan tentang Al-Qur'an dan Hadits", placeholder: "Masukkan pertanyaan Anda...", send: "Kirim", remainingMessages: "{{count}} pesan tersisa hari ini", greeting: "Assalamu'alaikum! Bagaimana saya bisa membantu Anda?" },
    continueReading: { title: "Lanjutkan Membaca", continue: "Lanjutkan", delete: "Hapus" }
  },
  prayer: {
    title: "Waktu Shalat",
    prayers: { fajr: "Subuh", dhuhr: "Dzuhur", asr: "Ashar", maghrib: "Maghrib", isha: "Isya" },
    current: "Sekarang", next: "Shalat Berikutnya", startsIn: "dimulai dalam", location: "Lokasi", auto: "Otomatis", manual: "Manual", edit: "Edit", selectLocation: "Pilih Lokasi", searchCity: "Cari kota...", useAutoLocation: "Otomatis", useManualLocation: "Manual", adjust: "Sesuaikan", adjustTime: "Sesuaikan Waktu", currentTime: "Waktu Saat Ini", originalTime: "Waktu Asli", reset: "Reset", save: "Simpan", cancel: "Batal",
    permissions: { denied: "Akses lokasi ditolak", enable: "Harap aktifkan akses lokasi di pengaturan browser" }
  },
  quran: {
    title: "Al-Qur'an Al-Karim",
    search: "Cari surah...", verses: "{{count}} ayat", revelation: "Diturunkan di", makkah: "Makkah", madinah: "Madinah", play: "Putar", pause: "Jeda", favorite: "Favorit", unfavorite: "Hapus Favorit",
    tabs: { all: "Semua", favorites: "Favorit" },
    reader: { settings: "Pengaturan", playing: "Memutar (Ayat {{current}}/{{total}})", repeat: "Ulangi: {{count}}x", selectRepeat: "Pilih Pengulangan", bookmark: "Tandai", copy: "Salin", share: "Bagikan", verseNumber: "Ayat {{number}}" }
  },
  duas: {
    title: "Doa-doa",
    categories: { morning: "Pagi", evening: "Sore", prayer: "Shalat", forgiveness: "Ampunan", health: "Kesehatan", wealth: "Rezeki", knowledge: "Ilmu", family: "Keluarga", travel: "Perjalanan", exams: "Ujian", anxiety: "Kecemasan", children: "Anak-anak", devotion: "Ibadah", guidance: "Petunjuk" },
    arabic: "Arab", transliteration: "Transliterasi", translation: "Terjemahan", source: "Sumber"
  },
  dhikr: {
    title: "Dzikir & Wirid",
    categories: { morning: "Dzikir Pagi", evening: "Dzikir Petang", afterPrayer: "Setelah Shalat", beforeSleep: "Sebelum Tidur", afterWudu: "Setelah Wudhu", general: "Umum" },
    counter: { title: "Penghitung Dzikir", tap: "Ketuk untuk Menghitung", count: "{{current}} dari {{target}}", complete: "Masya Allah! Selesai", reset: "Reset" },
    arabic: "Arab", transliteration: "Transliterasi", translation: "Terjemahan", reward: "Pahala"
  },
  quiz: {
    title: "Kuis Pengetahuan Islam", start: "Mulai Kuis", question: "Pertanyaan {{current}} dari {{total}}", checkAnswer: "Periksa Jawaban", nextQuestion: "Pertanyaan Berikutnya", correct: "Benar!", incorrect: "Sayangnya salah", explanation: "Penjelasan",
    results: { title: "Kuis Selesai!", score: "Skor Anda", correct: "{{count}} benar", incorrect: "{{count}} salah", restart: "Main Lagi", home: "Kembali ke Beranda" }
  },
  progress: {
    title: "Kemajuan",
    reading: { title: "Kemajuan Membaca", totalTime: "Total Waktu", todayTime: "Hari Ini", versesRead: "Ayat Dibaca", surahs: "Surah" },
    quiz: { title: "Statistik Kuis", questionsAnswered: "Pertanyaan Dijawab", correctAnswers: "Jawaban Benar", accuracy: "Akurasi" },
    dhikr: { title: "Statistik Dzikir", totalCount: "Total Hitungan", sessionsCompleted: "Sesi Selesai" },
    share: "Bagikan Kemajuan"
  },
  settings: {
    title: "Pengaturan",
    appLanguage: { title: "Bahasa Aplikasi", description: "Pilih bahasa untuk seluruh aplikasi" },
    darkMode: { title: "Mode Gelap", description: "Aktifkan mode gelap untuk keterbacaan lebih baik di malam hari" },
    transliteration: { title: "Transliterasi", description: "Tampilkan tulisan Latin di bawah teks Arab" },
    translationLanguage: { title: "Bahasa Terjemahan", description: "Pilih bahasa untuk terjemahan Al-Qur'an" },
    readingTheme: { title: "Tampilan Baca", description: "Pilih tema untuk pengalaman membaca yang nyaman" },
    reciter: { title: "Pilih Qari", description: "Pilih qari Al-Qur'an favorit Anda" },
    language: { title: "Bahasa", subtitle: "Pilih bahasa aplikasi", german: "Jerman", turkish: "Turki", english: "Inggris" },
    translation: { title: "Terjemahan Al-Qur'an", subtitle: "Pilih bahasa terjemahan" },
    theme: { title: "Tema Bacaan", subtitle: "Pilih tema bacaan favorit Anda", modern: "Modern (Hijau Mint)", classic: "Klasik (Biru Gelap)", sepia: "Sepia (Krem)", dark: "Gelap" },
    notifications: { title: "Notifikasi", subtitle: "Waktu shalat dan pengingat", enable: "Aktifkan Notifikasi", dailyVerse: "Ayat Harian", readingReminder: "Pengingat Membaca" },
    widgets: { title: "Widget", subtitle: "Sesuaikan layar beranda", prayerTimes: "Tampilkan Widget Waktu Shalat" },
    about: { title: "Tentang", version: "Versi", developer: "Pengembang" }
  },
  qibla: {
    title: "Arah Kiblat", subtitle: "Temukan arah shalat ke Makkah", activate: "Aktifkan Kompas", calibrate: "Kalibrasi perangkat Anda dengan menggerakkannya membentuk angka 8", aligned: "Anda sudah menghadap kiblat", direction: "Arah Kiblat", distance: "Jarak ke Makkah",
    permissions: { denied: "Akses kompas ditolak", enable: "Harap aktifkan akses kompas" }
  },
  stories: { title: "Kisah Para Nabi", readMore: "Baca Selengkapnya", readLess: "Tampilkan Lebih Sedikit", source: "Sumber" },
  common: { loading: "Memuat...", error: "Terjadi kesalahan", retry: "Coba Lagi", close: "Tutup", save: "Simpan", cancel: "Batal", delete: "Hapus", edit: "Edit", back: "Kembali", next: "Berikutnya", previous: "Sebelumnya", search: "Cari", filter: "Filter", all: "Semua", none: "Tidak Ada", yes: "Ya", no: "Tidak", ok: "OK" },
  time: { hours: "{{count}}j", minutes: "{{count}}m", seconds: "{{count}}d", days: "{{count}} hari", weeks: "{{count}} minggu", months: "{{count}} bulan" },
  toast: { verseCopied: "Ayat disalin!", verseShared: "Ayat dibagikan", bookmarkAdded: "Penanda ditambahkan", bookmarkRemoved: "Penanda dihapus", favoriteAdded: "Ditambahkan ke favorit", favoriteRemoved: "Dihapus dari favorit", settingsSaved: "Pengaturan disimpan", error: "Terjadi kesalahan", rateLimit: "Batas harian tercapai. Silakan coba lagi besok.", audioError: "Audio tidak dapat diputar", locationError: "Lokasi tidak dapat ditentukan" }
};
