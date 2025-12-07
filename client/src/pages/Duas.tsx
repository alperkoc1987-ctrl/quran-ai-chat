import { Card } from "@/components/ui/card";
import { duaCategories } from "@shared/duasData.ts";
import { Link } from "wouter";
import { ArrowLeft, Baby, Heart, Compass as CompassIcon, HeartPulse, Infinity, HeartHandshake, HandHeart, Users, Hourglass, Shield, Hand, UsersRound, Moon, Zap } from "lucide-react";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

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
  const { themeConfig } = useReadingTheme();
  
  return (
    <div className={`min-h-screen ${themeConfig.colors.background} pb-20`}>
      {/* Header */}
      <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm ${themeConfig.colors.border} border-b sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className={`w-10 h-10 rounded-lg ${themeConfig.colors.cardHover} flex items-center justify-center transition-colors`}>
                <ArrowLeft className={`w-5 h-5 ${themeConfig.colors.text}`} />
              </button>
            </Link>
            <div>
              <h1 className={`text-xl font-bold ${themeConfig.colors.text}`}>Duas</h1>
              <p className={`text-xs ${themeConfig.colors.textSecondary}`}>Bittgebete für jede Lebenslage</p>
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
                <Card className={`group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 ${themeConfig.colors.border} ${themeConfig.colors.cardHover} ${themeConfig.colors.card}`}>
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${themeConfig.colors.accent} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 opacity-20`}>
                        <Icon className={`w-7 h-7 ${themeConfig.colors.accent.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${themeConfig.colors.text} mb-1`}>
                          {category.name}
                        </h3>
                        <p className={`text-xs ${themeConfig.colors.textSecondary}`}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`h-1 ${themeConfig.colors.buttonPrimary} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
