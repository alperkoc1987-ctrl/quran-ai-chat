import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransliterationProvider } from "./contexts/TransliterationContext";
import NewHome from "./pages/NewHome";
import Chat from "./pages/Chat";
import Duas from "./pages/Duas";
import DuaDetail from "./pages/DuaDetail";
import PrayerTimes from "./pages/PrayerTimes";
import Qibla from "./pages/Qibla";
import SurahReader from "./pages/SurahReader";
import IslamicStories from "./pages/IslamicStories";
import SignsOfTheHour from "./pages/SignsOfTheHour";
import Settings from "./pages/Settings";
import Bookmarks from "./pages/Bookmarks";
import PrayerSettings from "./pages/PrayerSettings";

import { Statistics } from "./pages/Statistics";
import Quiz from "./pages/Quiz"; // Quiz feature added

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={NewHome} />
      <Route path="/chat" component={Chat} />
      <Route path="/quran" component={Chat} />
      <Route path="/surah/:number" component={SurahReader} />
      <Route path="/duas" component={Duas} />
      <Route path="/duas/:categoryId" component={DuaDetail} />
      <Route path="/prayer-times" component={PrayerTimes} />
      <Route path="/qibla" component={Qibla} />
      <Route path="/stories" component={IslamicStories} />
      <Route path="/signs" component={SignsOfTheHour} />
      <Route path="/settings" component={Settings} />
      <Route path="/prayer-settings" component={PrayerSettings} />
      <Route path="/bookmarks" component={Bookmarks} />

      <Route path="/statistics" component={Statistics} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable={true}
      >
        <TransliterationProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TransliterationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
