const fs = require('fs');

const updates = {
  tr: {
    appLanguage: { title: "Uygulama Dili", description: "Tüm uygulama için dil seçin" },
    darkMode: { title: "Karanlık Mod", description: "Gece daha iyi okunabilirlik için karanlık modu etkinleştirin" },
    transliteration: { title: "Transliterasyon", description: "Arapça metnin altında Latin harfleriyle yazılışı göster" },
    translationLanguage: { title: "Çeviri Dili", description: "Kuran çevirileri için dil seçin" },
    readingTheme: { title: "Okuma Görünümü", description: "Rahat bir okuma deneyimi için bir tema seçin" },
    reciter: { title: "Okuyucu Seç", description: "Tercih ettiğiniz Kuran okuyucusunu seçin" }
  },
  en: {
    appLanguage: { title: "App Language", description: "Choose language for the entire app" },
    darkMode: { title: "Dark Mode", description: "Enable dark mode for better readability at night" },
    transliteration: { title: "Transliteration", description: "Show Latin script under Arabic text" },
    translationLanguage: { title: "Translation Language", description: "Choose language for Quran translations" },
    readingTheme: { title: "Reading View", description: "Choose a theme for a comfortable reading experience" },
    reciter: { title: "Select Reciter", description: "Choose your preferred Quran reciter" }
  },
  ar: {
    appLanguage: { title: "لغة التطبيق", description: "اختر اللغة للتطبيق بأكمله" },
    darkMode: { title: "الوضع الداكن", description: "تفعيل الوضع الداكن لقراءة أفضل في الليل" },
    transliteration: { title: "النسخ الصوتي", description: "عرض النص اللاتيني تحت النص العربي" },
    translationLanguage: { title: "لغة الترجمة", description: "اختر اللغة لترجمات القرآن" },
    readingTheme: { title: "مظهر القراءة", description: "اختر سمة لتجربة قراءة مريحة" },
    reciter: { title: "اختر القارئ", description: "اختر قارئ القرآن المفضل لديك" }
  },
  fr: {
    appLanguage: { title: "Langue de l'application", description: "Choisir la langue pour toute l'application" },
    darkMode: { title: "Mode sombre", description: "Activer le mode sombre pour une meilleure lisibilité la nuit" },
    transliteration: { title: "Translittération", description: "Afficher l'écriture latine sous le texte arabe" },
    translationLanguage: { title: "Langue de traduction", description: "Choisir la langue pour les traductions du Coran" },
    readingTheme: { title: "Thème de lecture", description: "Choisir un thème pour une expérience de lecture confortable" },
    reciter: { title: "Sélectionner le récitateur", description: "Choisir votre récitateur du Coran préféré" }
  },
  id: {
    appLanguage: { title: "Bahasa Aplikasi", description: "Pilih bahasa untuk seluruh aplikasi" },
    darkMode: { title: "Mode Gelap", description: "Aktifkan mode gelap untuk keterbacaan lebih baik di malam hari" },
    transliteration: { title: "Transliterasi", description: "Tampilkan tulisan Latin di bawah teks Arab" },
    translationLanguage: { title: "Bahasa Terjemahan", description: "Pilih bahasa untuk terjemahan Al-Qur'an" },
    readingTheme: { title: "Tampilan Baca", description: "Pilih tema untuk pengalaman membaca yang nyaman" },
    reciter: { title: "Pilih Qari", description: "Pilih qari Al-Qur'an favorit Anda" }
  },
  ur: {
    appLanguage: { title: "ایپ کی زبان", description: "پوری ایپ کے لیے زبان منتخب کریں" },
    darkMode: { title: "ڈارک موڈ", description: "رات کو بہتر پڑھنے کے لیے ڈارک موڈ فعال کریں" },
    transliteration: { title: "نقل حرفی", description: "عربی متن کے نیچے لاطینی رسم الخط دکھائیں" },
    translationLanguage: { title: "ترجمہ کی زبان", description: "قرآن کے تراجم کے لیے زبان منتخب کریں" },
    readingTheme: { title: "پڑھنے کا منظر", description: "آرام دہ پڑھنے کے تجربے کے لیے ایک تھیم منتخب کریں" },
    reciter: { title: "قاری منتخب کریں", description: "اپنے پسندیدہ قرآن قاری کو منتخب کریں" }
  }
};

for (const [lang, keys] of Object.entries(updates)) {
  const file = `${lang}.ts`;
  let content = fs.readFileSync(file, 'utf8');
  
  // Find settings section and add new keys
  const settingsMatch = content.match(/settings:\s*{[\s\S]*?title:\s*"[^"]+"/);
  if (settingsMatch) {
    const insertPos = settingsMatch.index + settingsMatch[0].length;
    const newKeys = `,
    appLanguage: {
      title: "${keys.appLanguage.title}",
      description: "${keys.appLanguage.description}",
    },
    darkMode: {
      title: "${keys.darkMode.title}",
      description: "${keys.darkMode.description}",
    },
    transliteration: {
      title: "${keys.transliteration.title}",
      description: "${keys.transliteration.description}",
    },
    translationLanguage: {
      title: "${keys.translationLanguage.title}",
      description: "${keys.translationLanguage.description}",
    },
    readingTheme: {
      title: "${keys.readingTheme.title}",
      description: "${keys.readingTheme.description}",
    },
    reciter: {
      title: "${keys.reciter.title}",
      description: "${keys.reciter.description}",
    }`;
    
    content = content.slice(0, insertPos) + newKeys + content.slice(insertPos);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
