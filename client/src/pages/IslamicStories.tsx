/**
 * IslamicStories.tsx
 * Page for Islamic stories categorized by prophets with full narratives
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { prophetStoriesData, ProphetStoryDetail } from "@/data/prophetStories";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function IslamicStories() {
  const [, navigate] = useLocation();
  const [selectedStory, setSelectedStory] = useState<ProphetStoryDetail | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (selectedStory) {
                setSelectedStory(null);
              } else {
                navigate("/");
              }
            }}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {selectedStory ? selectedStory.title : "Islamische Geschichten"}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedStory ? "Prophetengeschichte" : "Geschichten der Propheten"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!selectedStory ? (
          <>
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
              Entdecken Sie die inspirierenden Geschichten der Propheten aus dem Koran
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {prophetStoriesData.map((story) => (
                <Card
                  key={story.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-700 h-full"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="p-4 flex flex-col items-center text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${story.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 mb-3`}>
                      <span className="text-2xl text-white font-arabic">{story.prophetArabic}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {story.prophet}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {story.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="pr-4 space-y-6">
                {/* Prophet Header Card */}
                <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <div className={`w-20 h-20 bg-gradient-to-br ${selectedStory.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <span className="text-4xl text-white font-arabic">{selectedStory.prophetArabic}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
                    {selectedStory.title}
                  </h2>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
                    {selectedStory.description}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedStory.story.introduction}
                  </p>
                </Card>

                {/* Story Sections */}
                {selectedStory.story.sections.map((section, index) => (
                  <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedStory.gradient} text-white flex items-center justify-center text-sm font-bold`}>
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {section.content}
                    </p>

                    {/* Quranic Verses */}
                    {section.verses && section.verses.length > 0 && (
                      <div className="space-y-3 mt-4">
                        {section.verses.map((verse, vIndex) => (
                          <div
                            key={vIndex}
                            className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
                          >
                            <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 mb-2">
                              {verse.reference}
                            </p>
                            <p className="text-right text-xl font-arabic text-slate-800 dark:text-slate-100 mb-2 leading-loose">
                              {verse.arabic}
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                              {verse.translation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}

                {/* Lessons Learned */}
                <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    Lehren aus dieser Geschichte
                  </h3>
                  <ul className="space-y-2">
                    {selectedStory.story.lessons.map((lesson, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {lesson}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Info Footer */}
                <Card className="p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
                  <p className="text-sm text-teal-800 dark:text-teal-300 text-center">
                    Diese Geschichten stammen aus dem Heiligen Koran und der authentischen Sunnah
                  </p>
                </Card>
              </div>
            </ScrollArea>
          </div>
        )}
      </main>
    </div>
  );
}
