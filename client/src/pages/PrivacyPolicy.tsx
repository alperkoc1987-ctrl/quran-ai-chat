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
          text: "Wenn die App eine Chat- oder KI-Funktion enthält, werden die vom Nutzer eingegebenen Texte verarbeitet, um Antworten zu generieren. Es erfolgt keine dauerhafte Speicherung personenbezogener Inhalte."
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
          text: "If the app includes chat or AI-based features, user inputs are processed to generate responses. No permanent storage of personal content is intended."
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
