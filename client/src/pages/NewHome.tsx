import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, HandHeart, Clock, Compass, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function NewHome() {
  const [chatExpanded, setChatExpanded] = useState(false);

  const categories = [
    {
      id: "quran",
      title: "Der Koran",
      description: "Lesen Sie den heiligen Koran",
      icon: BookOpen,
      link: "/quran",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "duas",
      title: "Duas",
      description: "Bittgebete für jede Lebenslage",
      icon: HandHeart,
      link: "/duas",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "prayer-times",
      title: "Gebetszeiten",
      description: "Finden Sie Ihre lokalen Gebetszeiten",
      icon: Clock,
      link: "/prayer-times",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "qibla",
      title: "Qibla-Richtung",
      description: "Finden Sie die Richtung nach Mekka",
      icon: Compass,
      link: "/qibla",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Koran & Hadith KI-Chat</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">Ihr islamischer Begleiter</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Collapsible AI Chat Section */}
      <div className="container mx-auto px-4 py-4">
        <Card className="overflow-hidden">
          <button
            onClick={() => setChatExpanded(!chatExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-slate-900 dark:text-white">KI-Assistent</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Stellen Sie Fragen zum Koran und Hadith</p>
              </div>
            </div>
            {chatExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            )}
          </button>
          
          {chatExpanded && (
            <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700 pt-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Fragen Sie nach Versen, Duas oder islamischen Themen. Beispiel: "Zeige mir ein Dua bei Trauer"
              </p>
              <Link href="/chat">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Chat öffnen
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Main Content - Category Cards */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={category.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-600 transition-all">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Diese KI-Antworten dienen nur zu Informationszwecken. Bitte konsultieren Sie einen islamischen Gelehrten für wichtige religiöse Fragen.
          </p>
        </div>
      </main>
    </div>
  );
}
