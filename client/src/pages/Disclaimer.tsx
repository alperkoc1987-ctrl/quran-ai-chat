import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Disclaimer() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  const content = {
    de: {
      title: "Haftungsausschluss",
      text: "Die Inhalte dieser App dienen der Information. Trotz sorgfältiger Erstellung wird keine Gewähr für Vollständigkeit, Aktualität oder Richtigkeit übernommen."
    },
    en: {
      title: "Disclaimer",
      text: "The content of this app is provided for informational purposes only. Despite careful preparation, no guarantee is given for completeness, accuracy, or timeliness."
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
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {text.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
