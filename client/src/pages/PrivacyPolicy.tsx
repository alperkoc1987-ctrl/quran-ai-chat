import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  const content = {
    de: {
      title: "Datenschutzerklärung",
      sections: [
        {
          heading: "1. Verantwortlicher",
          text: "Verantwortlich für die Datenverarbeitung ist:\nAlper Koc\nFriedrich Ebert Straße 135c\n67574 Osthofen\nDeutschland\nE-Mail: Alper.koc1987@gmail.com"
        },
        {
          heading: "2. Allgemeines",
          text: "Der Schutz Ihrer Daten ist uns wichtig. Diese App ist so konzipiert, dass möglichst wenige Daten verarbeitet werden."
        },
        {
          heading: "3. Technisch notwendige Daten",
          text: "Beim Aufruf der App können technisch notwendige Daten verarbeitet werden, um die App bereitzustellen und abzusichern. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs sowie technische Informationen zum verwendeten Gerät und Browser gehören."
        },
        {
          heading: "4. Hosting",
          text: "Die App wird über einen externen Hosting-Anbieter betrieben, zum Beispiel Vercel. Dabei werden technisch notwendige Daten verarbeitet, um den Betrieb und die Sicherheit der Anwendung zu gewährleisten."
        },
        {
          heading: "5. Lokale Speicherung auf dem Gerät",
          text: "Die App speichert bestimmte Einstellungen lokal auf dem Endgerät, zum Beispiel die ausgewählte Sprache. Diese Daten verbleiben auf dem Gerät und werden nicht automatisch an uns übertragen."
        },
        {
          heading: "6. KI-Funktionen",
          text: "Die Chat- und KI-Funktionen dieser App nutzen die Google Gemini API. Wenn Sie die Chat-Funktion verwenden, werden Ihre Eingaben an Google übertragen, um Antworten zu generieren. Google verarbeitet diese Daten gemäß seiner Datenschutzrichtlinie. Es erfolgt keine dauerhafte Speicherung Ihrer personenbezogenen Inhalte auf unseren Servern."
        },
        {
          heading: "7. Weitergabe von Daten",
          text: "Es erfolgt keine Weitergabe personenbezogener Daten zu Werbezwecken."
        },
        {
          heading: "8. Rechte der betroffenen Personen",
          text: "Nutzer haben im Rahmen der gesetzlichen Bestimmungen das Recht auf Auskunft, Berichtigung und Löschung ihrer personenbezogenen Daten."
        },
        {
          heading: "9. Kontakt",
          text: "Bei Fragen zum Datenschutz wenden Sie sich bitte an:\nAlper.koc1987@gmail.com"
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. Controller",
          text: "The controller responsible for data processing is:\nAlper Koc\nFriedrich Ebert Straße 135c\n67574 Osthofen\nGermany\nEmail: Alper.koc1987@gmail.com"
        },
        {
          heading: "2. General Information",
          text: "We take the protection of your personal data seriously. This app is designed to process as little data as possible."
        },
        {
          heading: "3. Technically Necessary Data",
          text: "When using the app, technically necessary data may be processed to ensure proper operation and security. This may include IP address, date and time of access, and technical information about the device or browser used."
        },
        {
          heading: "4. Hosting",
          text: "The app is hosted by an external service provider, for example Vercel. Technically necessary data may be processed to ensure functionality and security."
        },
        {
          heading: "5. Local Storage on the Device",
          text: "The app stores certain settings locally on your device, such as the selected language. This data remains on the device and is not automatically transmitted to us."
        },
        {
          heading: "6. AI Functions",
          text: "The chat and AI features of this app use the Google Gemini API. When you use the chat function, your inputs are transmitted to Google to generate responses. Google processes this data according to its privacy policy. We do not permanently store your personal content on our servers."
        },
        {
          heading: "7. Data Sharing",
          text: "No personal data is shared with third parties for advertising purposes."
        },
        {
          heading: "8. User Rights",
          text: "Users have the right to request information, correction, or deletion of their personal data within the scope of applicable laws."
        },
        {
          heading: "9. Contact",
          text: "For questions regarding data protection, please contact:\nAlper.koc1987@gmail.com"
        }
      ]
    },
    tr: {
      title: "Gizlilik Politikası",
      sections: [
        {
          heading: "1. Sorumlu Kurum",
          text: "Veri işlemeden sorumlu kurum:\nAlper Koc\nFriedrich Ebert Straße 135c\n67574 Osthofen\nAlmanya\nE-posta: Alper.koc1987@gmail.com"
        },
        {
          heading: "2. Genel Bilgiler",
          text: "Kişisel verilerinizin korunması bizim için önemlidir. Bu uygulama, mümkün olduğunca az veri işlemek için tasarlanmıştır."
        },
        {
          heading: "3. Teknik Olarak Gerekli Veriler",
          text: "Uygulamayı kullanırken, uygun işlev ve güvenliği sağlamak için teknik olarak gerekli veriler işlenebilir. Buna IP adresi, erişim tarihi ve saati ve kullanılan cihaz veya tarayıcı hakkında teknik bilgiler dahil olabilir."
        },
        {
          heading: "4. Barındırma",
          text: "Uygulama, örneğin Vercel gibi harici bir hizmet sağlayıcı tarafından barındırılmaktadır. İşlevsellik ve güvenliği sağlamak için teknik veriler işlenebilir."
        },
        {
          heading: "5. Cihazda Yerel Depolama",
          text: "Uygulama, seçilen dil gibi belirli ayarları cihazınızda yerel olarak depolar. Bu veriler cihazda kalır ve otomatik olarak bize iletilmez."
        },
        {
          heading: "6. Yapay Zeka Özellikleri",
          text: "Bu uygulamannın sohbet ve yapay zeka özellikleri Google Gemini API'sini kullanır. Sohbet işlevini kullandığınızda, girdileriniz yanıtlar oluşturmak için Google'a iletilir. Google verilerinizi kendi gizlilik politikasına göre işler. Kişisel içeriğinizi sunucularımızda kalıcı olarak depolamayız."
        },
        {
          heading: "7. Veri Paylaşımı",
          text: "Kişisel veriler reklam amaçları için üçüncü taraflara paylaşılmaz."
        },
        {
          heading: "8. Kullanıcı Hakları",
          text: "Kullanıcılar, uygulanabilir yasaların kapsamı içinde kişisel verilerine ilişkin bilgi, düzeltme veya silme talebinde bulunma hakkına sahiptir."
        },
        {
          heading: "9. İletişim",
          text: "Veri koruma hakkında sorularınız için lütfen İletişim kurun:\nAlper.koc1987@gmail.com"
        }
      ]
    },
    ar: {
      title: "سياسة الخصوصية",
      sections: [
        {
          heading: "1. المسؤول عن معالجة البيانات",
          text: "المسؤول عن معالجة البيانات:\nAlper Koc\nFriedrich Ebert Straße 135c\n67574 Osthofen\nألمانيا\nالبريد الإلكتروني: Alper.koc1987@gmail.com"
        },
        {
          heading: "2. معلومات عامة",
          text: "نحن نعتبر حماية بياناتك الشخصية مهمة جداً. تم تصميم هذا التطبيق لمعالجة أقل بيانات ممكنة."
        },
        {
          heading: "3. البيانات الضرورية تقنياً",
          text: "عند استخدام التطبيق، قد يتم معالجة البيانات الضرورية تقنياً لضمان التشغيل السليم والأمان. قد يتضمن هذا عنوان IP والتاريخ والوقت والمعلومات التقنية حول الجهاز أو متصفح الويب المستخدم."
        },
        {
          heading: "4. الاستضافة",
          text: "يتم استضافة التطبيق بواسطة مزود خدمة خارجي، على سبيل المثال Vercel. قد يتم معالجة البيانات الضرورية تقنياً لضمان الوظائف والأمان."
        },
        {
          heading: "5. التخزين المحلي على الجهاز",
          text: "يقوم التطبيق بتخزين إعدادات معينة محلياً على جهازك، مثل اللغة المختارة. بقيت هذه البيانات على الجهاز ولا يتم نقلها إلينا تلقائياً."
        },
        {
          heading: "6. وظائف الذكاء الاصطناعي",
          text: "تستخدم ميزات الدردشة والذكاء الاصطناعي في هذا التطبيق Google Gemini API. عند استخدام وظيفة الدردشة، يتم نقل مدخلاتك إلى Google لإنشاء الردود. تعالج Google بياناتك وفقاً لسياسة الخصوصية الخاصة بها. لا نقوم بتخزين محتواك الشخصي بشكل دائم على خوادمنا."
        },
        {
          heading: "7. مشاركة البيانات",
          text: "لا يتم مشاركة البيانات الشخصية مع أطراف ثالثة لأغراض إعلانية."
        },
        {
          heading: "8. حقوق المستخدمين",
          text: "يحق للمستخدمين الطلب بمعلومات وتصحيح وحذف بياناتهم الشخصية في حدود القانون الساري."
        },
        {
          heading: "9. الاتصال",
          text: "للأسئلة بشأن حماية البيانات، يرجى الاتصال بنا:\nAlper.koc1987@gmail.com"
        }
      ]
    }
  };

  const lang = language === 'de' || language === 'en' ? language : 'en';
  const text = content[lang];

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="text-emerald-600 dark:text-emerald-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {text.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm space-y-6">
            {text.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  {section.heading}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
