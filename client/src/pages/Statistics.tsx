import { useState, useEffect } from "react";
import { ArrowLeft, BarChart, Clock, Flame, BookOpen, Target, Brain, Award, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocation } from "wouter";
import {
  getStatistics,
  getVersesReadToday,
  getTimeSpentToday,
  getRecentSessions,
  getTotalProgressPercentage,
  formatTime,
  type ReadingSession,
} from "@/lib/statistics";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";
import { getDhikrStatistics, type DhikrStats } from "@/lib/dhikrStats";
import { Sparkles } from "lucide-react";

export function Statistics() {
  const { themeConfig } = useReadingTheme();
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState(getStatistics());
  const [versesToday, setVersesToday] = useState(0);
  const [timeToday, setTimeToday] = useState(0);
  const [recentSessions, setRecentSessions] = useState<ReadingSession[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [quizStats, setQuizStats] = useState({ totalQuestions: 0, correctAnswers: 0 });
  const [dhikrStats, setDhikrStats] = useState<DhikrStats | null>(null);

  useEffect(() => {
    // Load statistics
    const statistics = getStatistics();
    setStats(statistics);
    setVersesToday(getVersesReadToday());
    setTimeToday(getTimeSpentToday());
    setRecentSessions(getRecentSessions(7)); // Last 7 days
    setTotalProgress(getTotalProgressPercentage());
    
    // Load quiz statistics
    const savedQuizStats = localStorage.getItem('quizStats');
    if (savedQuizStats) {
      setQuizStats(JSON.parse(savedQuizStats));
    }
    
    // Load Dhikr statistics
    setDhikrStats(getDhikrStatistics());
  }, []);

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Header */}
      <div className="bg-teal-600 dark:bg-teal-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-teal-700 dark:hover:bg-teal-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Fortschritt</h1>
            <p className="text-teal-100 text-sm">Ihr Lesefortschritt im Überblick</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Progress */}
          <div className={`${themeConfig.colors.card} rounded-xl p-6 shadow-md border ${themeConfig.colors.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Target className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className={`font-semibold ${themeConfig.colors.text}`}>Gesamtfortschritt</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {totalProgress.toFixed(1)}%
              </div>
              <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                {stats.totalVersesRead} von 6.236 Versen gelesen
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                <div
                  className="bg-teal-600 dark:bg-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 gap-2 text-teal-600 dark:text-teal-400"
                onClick={() => {
                  const text = `🕌 Ich habe ${totalProgress.toFixed(1)}% vom Koran gelesen - ${stats.totalVersesRead} von 6.236 Versen! 📖`;
                  if (navigator.share) {
                    navigator.share({ text }).catch(() => {
                      navigator.clipboard.writeText(text);
                      toast.success('In Zwischenablage kopiert');
                    });
                  } else {
                    navigator.clipboard.writeText(text);
                    toast.success('In Zwischenablage kopiert');
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                Teilen
              </Button>
            </div>
          </div>

          {/* Current Streak */}
          <div className={`${themeConfig.colors.card} rounded-xl p-6 shadow-md border ${themeConfig.colors.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className={`font-semibold ${themeConfig.colors.text}`}>Aktuelle Serie</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.currentStreak}
              </div>
              <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                Tage in Folge
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Längste Serie: {stats.longestStreak} Tage
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 gap-2 text-orange-600 dark:text-orange-400"
                onClick={() => {
                  const text = `🔥 Ich habe eine ${stats.currentStreak}-Tage-Serie beim Koran-Lesen! Längste Serie: ${stats.longestStreak} Tage 📚`;
                  if (navigator.share) {
                    navigator.share({ text }).catch(() => {
                      navigator.clipboard.writeText(text);
                      toast.success('In Zwischenablage kopiert');
                    });
                  } else {
                    navigator.clipboard.writeText(text);
                    toast.success('In Zwischenablage kopiert');
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                Teilen
              </Button>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className={`${themeConfig.colors.card} rounded-xl p-6 shadow-md border ${themeConfig.colors.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`font-semibold ${themeConfig.colors.text}`}>Quiz-Punkte</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {quizStats.correctAnswers}/{quizStats.totalQuestions}
              </div>
              <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                Richtige Antworten
              </div>
              {quizStats.totalQuestions > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Erfolgsquote: {Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100)}%
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 gap-2 text-purple-600 dark:text-purple-400"
                onClick={() => {
                  const successRate = quizStats.totalQuestions > 0 ? Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100) : 0;
                  const text = `🧠 Ich habe ${quizStats.correctAnswers}/${quizStats.totalQuestions} Quizfragen richtig beantwortet! Erfolgsquote: ${successRate}% 🎯`;
                  if (navigator.share) {
                    navigator.share({ text }).catch(() => {
                      navigator.clipboard.writeText(text);
                      toast.success('In Zwischenablage kopiert');
                    });
                  } else {
                    navigator.clipboard.writeText(text);
                    toast.success('In Zwischenablage kopiert');
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                Teilen
              </Button>
            </div>
          </div>

          {/* Total Time */}
          <div className={`${themeConfig.colors.card} rounded-xl p-6 shadow-md border ${themeConfig.colors.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`font-semibold ${themeConfig.colors.text}`}>Gesamtzeit</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(stats.totalTimeSpent)}
              </div>
              <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                Insgesamt gelesen
              </div>
            </div>
          </div>

          {/* Dhikr Stats */}
          {dhikrStats && (
            <div className={`${themeConfig.colors.card} rounded-xl p-6 shadow-md border ${themeConfig.colors.border}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className={`font-semibold ${themeConfig.colors.text}`}>Dhikr-Zähler</h3>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {dhikrStats.totalDhikrCount.toLocaleString()}
                </div>
                <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                  Gesamt gezählt
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className={themeConfig.colors.textMuted}>
                    Heute: <span className="font-semibold text-amber-600 dark:text-amber-400">{dhikrStats.todayDhikrCount}</span>
                  </div>
                  <div className={themeConfig.colors.textMuted}>
                    Serie: <span className="font-semibold text-amber-600 dark:text-amber-400">{dhikrStats.currentStreak} Tage</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Today's Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Heute
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Gelesene Verse</span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{versesToday}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Lesezeit</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(timeToday)}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Letzte 7 Tage
          </h3>
          
          {recentSessions.length > 0 ? (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.date}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(session.date).toLocaleDateString("de-DE", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                    <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                      {session.surahs.length} Suren
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                      {session.versesRead} Verse
                    </div>
                    <div className={`text-sm ${themeConfig.colors.textSecondary}`}>
                      {formatTime(session.timeSpent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Noch keine Leseaktivität in den letzten 7 Tagen</p>
              <p className="text-sm mt-1">Beginnen Sie mit dem Lesen, um Ihren Fortschritt zu sehen!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
