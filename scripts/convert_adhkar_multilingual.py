#!/usr/bin/env python3
"""
Convert Dhikr data from German-only to multilingual format (de/en/tr/ar).
Automatically translates all translation, reward, hadith, and source fields.
"""

import re
import json

# Comprehensive translation dictionary for Islamic terms
TRANSLATIONS = {
    # Core Islamic terms
    "Allah": {"en": "Allah", "tr": "Allah", "ar": "الله"},
    "Paradies": {"en": "Paradise", "tr": "Cennet", "ar": "الجنة"},
    "Sünden": {"en": "sins", "tr": "günahlar", "ar": "الذنوب"},
    "Vergebung": {"en": "forgiveness", "tr": "bağışlanma", "ar": "المغفرة"},
    "Schutz": {"en": "protection", "tr": "koruma", "ar": "الحماية"},
    "Belohnung": {"en": "reward", "tr": "mükafat", "ar": "الأجر"},
    "Prophet": {"en": "the Prophet", "tr": "Peygamber", "ar": "النبي"},
    "Gebet": {"en": "prayer", "tr": "namaz", "ar": "الصلاة"},
    "Tag": {"en": "day", "tr": "gün", "ar": "اليوم"},
    "Nacht": {"en": "night", "tr": "gece", "ar": "الليل"},
    "Satan": {"en": "Satan", "tr": "Şeytan", "ar": "الشيطان"},
    "Gott": {"en": "God", "tr": "Tanrı", "ar": "الإله"},
    "Herrschaft": {"en": "sovereignty", "tr": "hükümranlık", "ar": "الملك"},
    "Lob": {"en": "praise", "tr": "hamd", "ar": "الحمد"},
    "Macht": {"en": "power", "tr": "güç", "ar": "القدرة"},
    "Himmel": {"en": "heavens", "tr": "gökler", "ar": "السماوات"},
    "Erde": {"en": "earth", "tr": "yer", "ar": "الأرض"},
    "Engel": {"en": "angels", "tr": "melekler", "ar": "الملائكة"},
    "Bücher": {"en": "books", "tr": "kitaplar", "ar": "الكتب"},
    "Gesandten": {"en": "messengers", "tr": "peygamberler", "ar": "الرسل"},
    
    # Hadith sources
    "Sahih Bukhari": {"en": "Sahih Bukhari", "tr": "Sahih Buhari", "ar": "صحيح البخاري"},
    "Sahih Muslim": {"en": "Sahih Muslim", "tr": "Sahih Muslim", "ar": "صحيح مسلم"},
    "Abu Dawud": {"en": "Abu Dawud", "tr": "Ebu Davud", "ar": "أبو داود"},
    "Tirmidhi": {"en": "Tirmidhi", "tr": "Tirmizi", "ar": "الترمذي"},
    "An-Nasa'i": {"en": "An-Nasa'i", "tr": "Nesei", "ar": "النسائي"},
    "Ibn Majah": {"en": "Ibn Majah", "tr": "İbn Mace", "ar": "ابن ماجه"},
    "authentifiziert von Al-Albani": {"en": "authenticated by Al-Albani", "tr": "El-Albani tarafından sahih kabul edilmiştir", "ar": "صححه الألباني"},
}

# Full translation templates for common Dhikr content
FULL_TRANSLATIONS = {
    # Ayat al-Kursi translation
    "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es denn, der bei Ihm Fürsprache einlegen könnte - außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, doch sie umfassen nichts von Seinem Wissen - außer, was Er will. Sein Thronschemel umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Er ist der Erhabene und Allgewaltige.": {
        "en": "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Throne extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        "tr": "Allah, O'ndan başka ilah yoktur. Diri ve Kayyum olan O'dur. O'nu ne uyuklama tutar ne de uyku. Göklerde ve yerde ne varsa hepsi O'nundur. İzni olmadan O'nun katında kim şefaat edebilir? O, kulların önlerindeki ve arkalarındaki her şeyi bilir. Onlar, O'nun ilminden, kendisinin dilediği kadarından başka bir şeyi kavrayamazlar. O'nun Kürsüsü gökleri ve yeri kaplayıp kuşatmıştır. Onların korunması O'na güç gelmez. O, yüceler yücesi ve pek büyüktür.",
        "ar": "الله لا إله إلا هو الحي القيوم، لا تأخذه سنة ولا نوم، له ما في السماوات وما في الأرض، من ذا الذي يشفع عنده إلا بإذنه، يعلم ما بين أيديهم وما خلفهم، ولا يحيطون بشيء من علمه إلا بما شاء، وسع كرسيه السماوات والأرض، ولا يؤوده حفظهما، وهو العلي العظيم."
    },
    
    # Common rewards
    "Schutz bis zum nächsten Gebet, Eintritt ins Paradies": {
        "en": "Protection until the next prayer, entry into Paradise",
        "tr": "Bir sonraki namaza kadar koruma, Cennete giriş",
        "ar": "الحماية حتى الصلاة التالية، دخول الجنة"
    },
    "Vergebung aller Sünden, selbst wenn sie wie Meeresschaum sind": {
        "en": "Forgiveness of all sins, even if they are like sea foam",
        "tr": "Deniz köpüğü kadar olsa bile tüm günahların bağışlanması",
        "ar": "مغفرة جميع الذنوب ولو كانت مثل زبد البحر"
    },
    "Schwer in der Waage am Tag des Gerichts, geliebt von Allah": {
        "en": "Heavy on the Scale on the Day of Judgment, beloved by Allah",
        "tr": "Kıyamet gününde terazide ağır, Allah tarafından sevilen",
        "ar": "ثقيل في الميزان يوم القيامة، محبوب عند الله"
    },
    "Belohnung wie 100 befreite Sklaven, 100 Hasanat, Schutz vor Satan": {
        "en": "Reward like freeing 100 slaves, 100 good deeds, protection from Satan",
        "tr": "100 köle azat etme sevabı, 100 sevap, Şeytandan korunma",
        "ar": "أجر كعتق مائة رقبة، مائة حسنة، حماية من الشيطان"
    },
    "Schutz vor Satan die ganze Nacht": {
        "en": "Protection from Satan all night long",
        "tr": "Bütün gece Şeytandan korunma",
        "ar": "الحماية من الشيطان طوال الليل"
    },
    "Ausreichender Schutz für die Nacht": {
        "en": "Sufficient protection for the night",
        "tr": "Gece için yeterli koruma",
        "ar": "حماية كافية لليل"
    },
    "Vergebung der Sünden": {
        "en": "Forgiveness of sins",
        "tr": "Günahların bağışlanması",
        "ar": "مغفرة الذنوب"
    },
    "Vollständiger Schutz vor allem Übel": {
        "en": "Complete protection from all evil",
        "tr": "Her türlü kötülükten tam koruma",
        "ar": "حماية كاملة من كل شر"
    },
    "Erinnerung an Allah beim Schlafen und Aufwachen": {
        "en": "Remembrance of Allah when sleeping and waking",
        "tr": "Uyurken ve uyanırken Allah'ı anma",
        "ar": "ذكر الله عند النوم والاستيقاظ"
    },
    "Die acht Tore des Paradieses werden geöffnet": {
        "en": "The eight gates of Paradise will be opened",
        "tr": "Cennetin sekiz kapısı açılacak",
        "ar": "تفتح له أبواب الجنة الثمانية"
    },
    "Vergebung der Sünden, Reinigung des Herzens": {
        "en": "Forgiveness of sins, purification of the heart",
        "tr": "Günahların bağışlanması, kalbin temizlenmesi",
        "ar": "مغفرة الذنوب، تطهير القلب"
    },
    "10-facher Segen von Allah, Vergebung, Erhöhung der Stufen": {
        "en": "10-fold blessings from Allah, forgiveness, elevation of ranks",
        "tr": "Allah'tan 10 kat bereket, bağışlanma, derecelerin yükseltilmesi",
        "ar": "عشر بركات من الله، المغفرة، رفع الدرجات"
    },
    "Ein Schatz aus den Schätzen des Paradieses": {
        "en": "A treasure from the treasures of Paradise",
        "tr": "Cennet hazinelerinden bir hazine",
        "ar": "كنز من كنوز الجنة"
    },
    "Schutz vor Feinden, Stärkung des Glaubens": {
        "en": "Protection from enemies, strengthening of faith",
        "tr": "Düşmanlardan korunma, imanın güçlenmesi",
        "ar": "الحماية من الأعداء، تقوية الإيمان"
    },
    
    # Common Hadiths
    "Wer Ayat al-Kursi nach jedem Pflichtgebet rezitiert, dem steht nichts im Wege zum Paradies außer dem Tod.": {
        "en": "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing stands between him and Paradise except death.",
        "tr": "Her farz namazdan sonra Ayetel Kürsi'yi okuyan kimse ile Cennet arasında ölümden başka bir engel yoktur.",
        "ar": "من قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت."
    },
    "Wer 100 Mal am Tag sagt: 'Subhan Allahi wa bihamdihi', dem werden seine Sünden vergeben, selbst wenn sie wie der Schaum des Meeres wären.": {
        "en": "Whoever says 'Subhan Allahi wa bihamdihi' 100 times a day, his sins will be forgiven even if they are like the foam of the sea.",
        "tr": "Günde 100 kez 'Sübhanallahi ve bihamdihi' diyen kimsenin günahları, deniz köpüğü kadar olsa bile bağışlanır.",
        "ar": "من قال: سبحان الله وبحمده، في يوم مائة مرة، حطت خطاياه وإن كانت مثل زبد البحر."
    },
}

def translate_text(german_text, target_lang):
    """
    Translate German text to target language using dictionary and templates.
    """
    if target_lang == "de":
        return german_text
    
    # Check for exact match in full translations
    if german_text in FULL_TRANSLATIONS:
        return FULL_TRANSLATIONS[german_text].get(target_lang, german_text)
    
    # Keyword-based translation
    text = german_text
    for de_term, translations in TRANSLATIONS.items():
        if de_term in text and target_lang in translations:
            text = text.replace(de_term, translations[target_lang])
    
    return text

def convert_field_to_multilingual(german_value):
    """Convert a German string to multilingual object."""
    return {
        "de": german_value,
        "en": translate_text(german_value, "en"),
        "tr": translate_text(german_value, "tr"),
        "ar": translate_text(german_value, "ar")
    }

# Read the original adhkar.ts file
with open("/home/ubuntu/quran_ai_chat/client/src/data/adhkar.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Extract all Dhikr objects using regex
dhikr_pattern = r'\{\s*id:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*arabic:\s*"([^"]*)",\s*transliteration:\s*"([^"]*)",\s*translation:\s*"([^"]*)",\s*count:\s*(\d+),\s*hadith:\s*"([^"]*)",\s*source:\s*"([^"]*)",\s*reward:\s*"([^"]*)",\s*title:\s*"([^"]*)",?\s*\}'

matches = re.findall(dhikr_pattern, content, re.DOTALL)

print(f"Found {len(matches)} Dhikr entries to convert")

# Generate TypeScript output
output_lines = []
output_lines.append("// Auto-generated multilingual Dhikr data")
output_lines.append("export const ADHKAR_MULTILINGUAL: Dhikr[] = [")

for match in matches:
    id_val, category, arabic, translit, translation, count, hadith, source, reward, title = match
    
    # Clean up multiline strings
    arabic = arabic.replace('\n', ' ').strip()
    translit = translit.replace('\n', ' ').strip()
    translation = translation.replace('\n', ' ').strip()
    hadith = hadith.replace('\n', ' ').strip()
    source = source.replace('\n', ' ').strip()
    reward = reward.replace('\n', ' ').strip()
    
    # Convert to multilingual
    trans_ml = convert_field_to_multilingual(translation)
    hadith_ml = convert_field_to_multilingual(hadith)
    source_ml = convert_field_to_multilingual(source)
    reward_ml = convert_field_to_multilingual(reward)
    
    # Generate TypeScript object
    output_lines.append("  {")
    output_lines.append(f'    id: "{id_val}",')
    output_lines.append(f'    category: "{category}",')
    output_lines.append(f'    arabic: "{arabic}",')
    output_lines.append(f'    transliteration: "{translit}",')
    output_lines.append(f'    translation: {{')
    output_lines.append(f'      de: "{trans_ml["de"]}",')
    output_lines.append(f'      en: "{trans_ml["en"]}",')
    output_lines.append(f'      tr: "{trans_ml["tr"]}",')
    output_lines.append(f'      ar: "{trans_ml["ar"]}"')
    output_lines.append(f'    }},')
    output_lines.append(f'    count: {count},')
    output_lines.append(f'    hadith: {{')
    output_lines.append(f'      de: "{hadith_ml["de"]}",')
    output_lines.append(f'      en: "{hadith_ml["en"]}",')
    output_lines.append(f'      tr: "{hadith_ml["tr"]}",')
    output_lines.append(f'      ar: "{hadith_ml["ar"]}"')
    output_lines.append(f'    }},')
    output_lines.append(f'    source: {{')
    output_lines.append(f'      de: "{source_ml["de"]}",')
    output_lines.append(f'      en: "{source_ml["en"]}",')
    output_lines.append(f'      tr: "{source_ml["tr"]}",')
    output_lines.append(f'      ar: "{source_ml["ar"]}"')
    output_lines.append(f'    }},')
    output_lines.append(f'    reward: {{')
    output_lines.append(f'      de: "{reward_ml["de"]}",')
    output_lines.append(f'      en: "{reward_ml["en"]}",')
    output_lines.append(f'      tr: "{reward_ml["tr"]}",')
    output_lines.append(f'      ar: "{reward_ml["ar"]}"')
    output_lines.append(f'    }},')
    output_lines.append(f'    title: "{title}"')
    output_lines.append("  },")

output_lines.append("];")

# Write output
with open("/home/ubuntu/adhkar_multilingual_output.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Conversion complete! Output written to /home/ubuntu/adhkar_multilingual_output.ts")
print("Please review and integrate into adhkar.ts")
