/**
 * SignsOfTheHour.tsx
 * Page for Signs of the Hour (Zeichen der Stunde) - Islamic eschatology
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Info } from "lucide-react";
import { useLocation } from "wouter";

interface Sign {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  category: "minor" | "major";
  gradient: string;
}

const signs: Sign[] = [
  // Minor Signs
  {
    id: "knowledge-decrease",
    title: "Abnahme des Wissens",
    titleArabic: "ذهاب العلم",
    description: "Das religiöse Wissen wird abnehmen und Unwissenheit wird zunehmen",
    category: "minor",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "time-passing",
    title: "Zeit vergeht schneller",
    titleArabic: "تقارب الزمان",
    description: "Die Zeit wird schneller vergehen und die Jahre werden wie Monate erscheinen",
    category: "minor",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: "tall-buildings",
    title: "Hohe Gebäude",
    titleArabic: "تطاول البنيان",
    description: "Menschen werden in hohen Gebäuden wetteifern",
    category: "minor",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "earthquakes",
    title: "Häufige Erdbeben",
    titleArabic: "كثرة الزلازل",
    description: "Erdbeben werden häufiger auftreten",
    category: "minor",
    gradient: "from-amber-500 to-orange-600",
  },
  
  // Major Signs
  {
    id: "mahdi",
    title: "Erscheinen des Mahdi",
    titleArabic: "ظهور المهدي",
    description: "Der Mahdi wird erscheinen und Gerechtigkeit auf der Erde verbreiten",
    category: "major",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "dajjal",
    title: "Erscheinen des Dajjal",
    titleArabic: "خروج الدجال",
    description: "Der falsche Messias (Dajjal) wird erscheinen und große Versuchung bringen",
    category: "major",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "isa-return",
    title: "Rückkehr von Isa (as)",
    titleArabic: "نزول عيسى",
    description: "Prophet Isa (Jesus) wird vom Himmel herabsteigen",
    category: "major",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "yajuj-majuj",
    title: "Ya'juj und Ma'juj",
    titleArabic: "خروج يأجوج ومأجوج",
    description: "Die Völker von Gog und Magog werden freigelassen",
    category: "major",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "sun-west",
    title: "Sonne geht im Westen auf",
    titleArabic: "طلوع الشمس من مغربها",
    description: "Die Sonne wird im Westen aufgehen",
    category: "major",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "smoke",
    title: "Der Rauch",
    titleArabic: "الدخان",
    description: "Ein großer Rauch wird die Erde bedecken",
    category: "major",
    gradient: "from-slate-500 to-gray-600",
  },
];

export default function SignsOfTheHour() {
  const [, navigate] = useLocation();
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);
  const [filter, setFilter] = useState<"all" | "minor" | "major">("all");

  const filteredSigns = signs.filter(
    (sign) => filter === "all" || sign.category === filter
  );

  const minorCount = signs.filter((s) => s.category === "minor").length;
  const majorCount = signs.filter((s) => s.category === "major").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Zeichen der Stunde</h1>
              <p className="text-sm text-slate-600">Islamische Eschatologie</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!selectedSign ? (
          <>
            {/* Info Banner */}
            <Card className="mb-6 p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Über die Zeichen der Stunde</p>
                  <p>
                    Die Zeichen der Stunde sind Ereignisse, die vor dem Tag des Jüngsten Gerichts eintreten werden.
                    Sie werden in kleine (Ashrat as-Sa'ah as-Sughra) und große (Ashrat as-Sa'ah al-Kubra) Zeichen unterteilt.
                  </p>
                </div>
              </div>
            </Card>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 justify-center flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gradient-to-r from-purple-500 to-pink-600" : ""}
              >
                Alle ({signs.length})
              </Button>
              <Button
                variant={filter === "minor" ? "default" : "outline"}
                onClick={() => setFilter("minor")}
                className={filter === "minor" ? "bg-gradient-to-r from-blue-500 to-cyan-600" : ""}
              >
                Kleine Zeichen ({minorCount})
              </Button>
              <Button
                variant={filter === "major" ? "default" : "outline"}
                onClick={() => setFilter("major")}
                className={filter === "major" ? "bg-gradient-to-r from-red-500 to-rose-600" : ""}
              >
                Große Zeichen ({majorCount})
              </Button>
            </div>

            {/* Signs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSigns.map((sign) => (
                <Card
                  key={sign.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200"
                  onClick={() => setSelectedSign(sign)}
                >
                  <div className="p-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${sign.gradient} rounded-lg flex items-center justify-center mb-3`}>
                      <span className="text-lg text-white font-arabic">{sign.titleArabic.slice(0, 2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-slate-900 flex-1">
                        {sign.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sign.category === "minor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {sign.category === "minor" ? "Klein" : "Groß"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {sign.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedSign(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Übersicht
            </Button>

            <Card className="p-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedSign.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                <span className="text-3xl text-white font-arabic">{selectedSign.titleArabic.slice(0, 3)}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-center text-slate-900">
                  {selectedSign.title}
                </h2>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  selectedSign.category === "minor"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {selectedSign.category === "minor" ? "Kleines Zeichen" : "Großes Zeichen"}
                </span>
              </div>
              <p className="text-center text-lg text-slate-700 mb-2 font-arabic">
                {selectedSign.titleArabic}
              </p>
              <p className="text-center text-slate-600 mb-6">
                {selectedSign.description}
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-sm text-amber-800">
                  📚 Detaillierte Informationen und Hadithe werden bald hinzugefügt
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
