import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Impressum() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  const content = {
    de: {
      title: "Impressum",
      subtitle: "Angaben gemäß § 5 TMG",
      name: "Alper Koc",
      address: "Friedrich Ebert Straße 135c",
      city: "67574 Osthofen",
      country: "Deutschland",
      email: "E-Mail: Alper.koc1987@gmail.com"
    },
    en: {
      title: "Legal Notice",
      subtitle: "Information according to applicable laws",
      name: "Alper Koc",
      address: "Friedrich Ebert Straße 135c",
      city: "67574 Osthofen",
      country: "Germany",
      email: "Email: Alper.koc1987@gmail.com"
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
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
              {text.subtitle}
            </h2>
            
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p className="font-medium">{text.name}</p>
              <p>{text.address}</p>
              <p>{text.city}</p>
              <p>{text.country}</p>
              <p className="mt-4">{text.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
