import { ArrowLeft, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AINotice() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  const content = {
    de: {
      title: "Hinweis zu KI-Inhalten",
      text: "Diese App nutzt künstliche Intelligenz zur Unterstützung bei religiösen und informativen Inhalten. Die bereitgestellten Antworten dienen ausschließlich der Information und ersetzen keine religiöse Beratung durch qualifizierte Gelehrte."
    },
    en: {
      title: "AI Content Notice",
      text: "This app uses artificial intelligence to support religious and informational content. The provided responses are for informational purposes only and do not replace guidance from qualified scholars."
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
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
