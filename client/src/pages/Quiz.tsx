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
      
      // Scroll to top to show the new question
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const newQuestions = getRandomQuestions(10);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Loading state
  if (!currentQuestion) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={themeConfig.colors.textSecondary}>Quiz wird geladen...</p>
        </div>
      </div>
    );
  }

  // Quiz completed screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className={`min-h-screen ${themeConfig.colors.background} pb-20`}>
        {/* Header */}
        <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm border-b ${themeConfig.colors.border} sticky top-0 z-50`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className={themeConfig.colors.textSecondary}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${themeConfig.colors.accent} rounded-xl flex items-center justify-center`}>
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
          <Card className={`p-8 text-center ${themeConfig.colors.card}`}>
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
              {passed ? (
                <Trophy className="w-12 h-12 text-green-500" />
              ) : (
                <Sparkles className="w-12 h-12 text-orange-500" />
              )}
            </div>

            <h2 className={`text-3xl font-bold ${themeConfig.colors.text} mb-2`}>
              {passed ? "Ausgezeichnet!" : "Gut gemacht!"}
            </h2>
            <p className={`${themeConfig.colors.textSecondary} mb-6`}>
              {passed 
                ? "Du hast das Quiz erfolgreich bestanden!" 
                : "Übe weiter, um dein Wissen zu vertiefen!"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`${themeConfig.colors.backgroundSecondary} rounded-lg p-4`}>
                <div className="text-3xl font-bold text-teal-500 mb-1">
                  {score}/{questions.length}
                </div>
                <div className={`text-sm ${themeConfig.colors.textSecondary}`}>Richtige Antworten</div>
              </div>
              <div className={`${themeConfig.colors.backgroundSecondary} rounded-lg p-4`}>
                <div className="text-3xl font-bold text-teal-500 mb-1">
                  {percentage}%
                </div>
                <div className={`text-sm ${themeConfig.colors.textSecondary}`}>Erfolgsquote</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleRestartQuiz}
                className={`flex-1 ${themeConfig.colors.buttonPrimary} ${themeConfig.colors.buttonPrimaryHover} ${themeConfig.colors.buttonPrimaryText}`}
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
    <div className={`min-h-screen ${themeConfig.colors.background} pb-20`}>
      {/* Header */}
      <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm border-b ${themeConfig.colors.border} sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className={themeConfig.colors.textSecondary}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${themeConfig.colors.accent} rounded-xl flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${themeConfig.colors.text}`}>Islamisches Quiz</h1>
                  <p className={`text-xs ${themeConfig.colors.textSecondary}`}>Teste dein Wissen</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-sm font-medium ${themeConfig.colors.text}`}>
                  Frage {currentQuestionIndex + 1}/{questions.length}
                </div>
                <div className={`text-xs ${themeConfig.colors.textSecondary}`}>
                  Punkte: {score}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className={`${themeConfig.colors.card} h-2 opacity-30`}>
        <div
          className={`${themeConfig.colors.buttonPrimary} h-full transition-all duration-300`}
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-8 pb-24 max-w-3xl">
        <Card className={`p-6 md:p-8 ${themeConfig.colors.card}`}>
          {/* Category Badge */}
          <div className={`inline-block px-3 py-1 ${themeConfig.colors.accent} text-white rounded-full text-sm font-medium mb-6 opacity-80`}>
            {currentQuestion.category}
          </div>

          {/* Question Text */}
          <h2 className={`text-2xl md:text-3xl font-bold ${themeConfig.colors.text} mb-8`}>
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
                      ? "border-green-500 bg-green-500/20"
                      : showWrongAnswer
                      ? "border-red-500 bg-red-500/20"
                      : isSelected
                      ? `border-teal-500 bg-teal-500/20`
                      : `${themeConfig.colors.border} hover:border-teal-500`
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${themeConfig.colors.text} font-medium`}>{option}</span>
                    {showCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {showWrongAnswer && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && currentQuestion.explanation && (
            <div className={`${themeConfig.colors.backgroundSecondary} rounded-lg p-4 mb-6`}>
              <h3 className={`font-semibold ${themeConfig.colors.text} mb-2`}>Erklärung:</h3>
              <p className={themeConfig.colors.textSecondary}>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`w-full ${themeConfig.colors.buttonPrimary} ${themeConfig.colors.buttonPrimaryHover} ${themeConfig.colors.buttonPrimaryText}`}
              >
                Antwort bestätigen
              </Button>
            ) : (
              <Button
                id="next-question-button"
                onClick={handleNextQuestion}
                className={`w-full ${themeConfig.colors.buttonPrimary} ${themeConfig.colors.buttonPrimaryHover} ${themeConfig.colors.buttonPrimaryText}`}
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
