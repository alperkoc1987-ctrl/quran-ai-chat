import { Card } from "@/components/ui/card";
import { duaCategories } from "@shared/duasData.ts";
import { Link } from "wouter";
import { ArrowLeft, Baby, Heart, Compass as CompassIcon, HeartPulse, Infinity, HeartHandshake, HandHeart, Users, Hourglass, Shield, Hand, UsersRound, Moon, Zap } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "baby": Baby,
  "heart": Heart,
  "compass": CompassIcon,
  "heart-pulse": HeartPulse,
  "infinity": Infinity,
  "heart-handshake": HeartHandshake,
  "hand-heart": HandHeart,
  "users": Users,
  "hourglass": Hourglass,
  "shield": Shield,
  "hand": Hand,
  "users-round": UsersRound,
  "moon": Moon,
  "zap": Zap
};

export default function Duas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Duas</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Bittgebete für jede Lebenslage</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {duaCategories.map((category) => {
            const Icon = iconMap[category.icon] || Heart;
            return (
              <Link key={category.id} href={`/duas/${category.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
