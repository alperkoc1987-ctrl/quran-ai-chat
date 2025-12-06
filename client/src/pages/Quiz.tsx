import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, ArrowLeft, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { getRandomQuestions, QuizQuestion, markQuestionAsAnswered, getAnsweredCount } from "@/data/quizQuestions";
import confetti from "canvas-confetti";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

// Ensure confetti is properly initialized
if (typeof window !== 'undefined' && !window.confetti) {
  (window as any).confetti = confetti;
}

export default function Quiz() {
  const { themeConfig } = useReadingTheme();
  const [, navigate] = useLocation();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialize quiz
  useEffect(() => {
    const quizQuestions = getRandomQuestions(10);
    setQuestions(quizQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return; // Prevent changing answer after showing result
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      // Trigger confetti animation for correct answer
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#06b6d4'],
          disableForReducedMotion: true
        });
      } catch (error) {
        console.error('Confetti error:', error);
      }
    }

    setShowResult(true);
    setAnsweredQuestions(answeredQuestions + 1);

    // Mark question as answered to prevent repetition
    markQuestionAsAnswered(currentQuestion.id);

    // Auto-scroll to the "Nächste Frage" button after a short delay
    setTimeout(() => {
      const nextButton = document.getElementById('next-question-button');
      if (nextButton) {
        nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    // Save quiz stats to localStorage
    const quizStats = JSON.parse(localStorage.getItem('quizStats') || '{"totalQuestions": 0, "correctAnswers": 0}');
    quizStats.totalQuestions += 1;
    if (isCorrect) {
      quizStats.correctAnswers += 1;
    }
    localStorage.setItem('quizStats', JSON.stringify(quizStats));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      // Big celebration for completing the quiz
      try {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#10b981', '#14b8a6', '#06b6d4', '#8b5cf6', '#ec4899'],
          disableForReducedMotion: true
        });
      } catch (error) {
        console.error('Confetti error:', error);
      }
    }
  };

  const handleRestartQuiz = () => {
    const quizQuestions = getRandomQuestions(10);
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={themeConfig.colors.textSecondary}>Quiz wird geladen...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className={`min-h-screen ${themeConfig.colors.background}`}>
        {/* Header */}
        <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm border-b ${themeConfig.colors.border} sticky top-0 z-50`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-slate-600 dark:text-slate-400"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${themeConfig.colors.text}`}>Quiz Abgeschlossen!</h1>
                  <p className={`text-xs ${themeConfig.colors.textSecondary}`}>Dein Ergebnis</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Results */}
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
              {passed ? (
                <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
              ) : (
                <Sparkles className="w-12 h-12 text-orange-600 dark:text-orange-400" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {passed ? "Ausgezeichnet!" : "Gut gemacht!"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {passed 
                ? "Du hast das Quiz erfolgreich bestanden!" 
                : "Übe weiter, um dein Wissen zu vertiefen!"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                  {score}/{questions.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Richtige Antworten</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {percentage}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Erfolgsquote</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleRestartQuiz}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                Neues Quiz starten
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="flex-1"
              >
                Zur Startseite
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-slate-600 dark:text-slate-400"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Islamisches Quiz</h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Teste dein Wissen</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  Frage {currentQuestionIndex + 1}/{questions.length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Punkte: {score}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-slate-200 dark:bg-slate-700 h-2">
        <div
          className="bg-gradient-to-r from-teal-500 to-emerald-600 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-8 pb-24 max-w-3xl">
        <Card className="p-6 md:p-8">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm font-medium mb-6">
            {currentQuestion.category}
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrectAnswer = showResult && isCorrect;
              const showWrongAnswer = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrectAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : showWrongAnswer
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : isSelected
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-medium">{option}</span>
                    {showCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {showWrongAnswer && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
            }`}>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Erklärung:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                Antwort bestätigen
              </Button>
            ) : (
              <Button
                id="next-question-button"
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {currentQuestionIndex < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
