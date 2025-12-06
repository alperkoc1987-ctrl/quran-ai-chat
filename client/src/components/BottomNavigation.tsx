import { Home, BookOpen, HandHeart, Sparkles, Settings } from "lucide-react";
import { useLocation } from "wouter";

export function BottomNavigation() {
  const [location, navigate] = useLocation();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: "quran",
      label: "Koran",
      icon: BookOpen,
      path: "/quran",
    },
    {
      id: "duas",
      label: "Duas",
      icon: HandHeart,
      path: "/duas",
    },
    {
      id: "dhikr",
      label: "Dhikr",
      icon: Sparkles,
      path: "/dhikr",
    },
    {
      id: "settings",
      label: "Einstellungen",
      icon: Settings,
      path: "/settings",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? "stroke-[2.5]" : "stroke-2"}`} />
                <span className={`text-xs ${active ? "font-semibold" : "font-medium"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
