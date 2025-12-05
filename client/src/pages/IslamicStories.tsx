/**
 * IslamicStories.tsx
 * Page for Islamic stories categorized by prophets
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useLocation } from "wouter";

interface ProphetStory {
  id: string;
  prophet: string;
  prophetArabic: string;
  title: string;
  description: string;
  gradient: string;
}

const prophetStories: ProphetStory[] = [
  {
    id: "adam",
    prophet: "Adam",
    prophetArabic: "آدم",
    title: "Prophet Adam (as)",
    description: "Die Erschaffung des ersten Menschen und die Prüfung im Paradies",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "nuh",
    prophet: "Nuh",
    prophetArabic: "نوح",
    title: "Prophet Nuh (as)",
    description: "Die große Flut und die Arche",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "ibrahim",
    prophet: "Ibrahim",
    prophetArabic: "إبراهيم",
    title: "Prophet Ibrahim (as)",
    description: "Der Freund Allahs und Vater der Propheten",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "musa",
    prophet: "Musa",
    prophetArabic: "موسى",
    title: "Prophet Musa (as)",
    description: "Die Befreiung der Israeliten aus Ägypten",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "isa",
    prophet: "Isa",
    prophetArabic: "عيسى",
    title: "Prophet Isa (as)",
    description: "Die Geburt und Wunder von Jesus",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "muhammad",
    prophet: "Muhammad",
    prophetArabic: "محمد",
    title: "Prophet Muhammad (saw)",
    description: "Das Leben des letzten Gesandten",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "yusuf",
    prophet: "Yusuf",
    prophetArabic: "يوسف",
    title: "Prophet Yusuf (as)",
    description: "Die Geschichte von Joseph und seinen Brüdern",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "sulaiman",
    prophet: "Sulaiman",
    prophetArabic: "سليمان",
    title: "Prophet Sulaiman (as)",
    description: "Der weise König und seine Herrschaft",
    gradient: "from-violet-500 to-purple-600",
  },
];

export default function IslamicStories() {
  const [, navigate] = useLocation();
  const [selectedStory, setSelectedStory] = useState<ProphetStory | null>(null);

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
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Islamische Geschichten</h1>
              <p className="text-sm text-slate-600">Geschichten der Propheten</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!selectedStory ? (
          <>
            <p className="text-slate-700 mb-6 text-center">
              Entdecken Sie die inspirierenden Geschichten der Propheten aus dem Koran
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {prophetStories.map((story) => (
                <Card
                  key={story.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200 h-full"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="p-4 flex flex-col items-center text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${story.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 mb-3`}>
                      <span className="text-2xl text-white font-arabic">{story.prophetArabic}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {story.prophet}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {story.description}
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
              onClick={() => setSelectedStory(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Übersicht
            </Button>

            <Card className="p-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedStory.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                <span className="text-4xl text-white font-arabic">{selectedStory.prophetArabic}</span>
              </div>
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
                {selectedStory.title}
              </h2>
              <p className="text-center text-slate-600 mb-6">
                {selectedStory.description}
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-sm text-amber-800">
                  📚 Detaillierte Geschichten werden bald hinzugefügt
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
