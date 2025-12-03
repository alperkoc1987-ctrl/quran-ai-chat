    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="container max-w-6xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
                Koran & Hadith KI-Chat
              </h1>
              <p className="text-[10px] md:text-sm text-gray-500 leading-tight">
                Stellen Sie Ihre Fragen und lesen Sie den Koran
              </p>
            </div>
            {/* Mobile Settings Button (visible only on mobile, right aligned) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700 -mr-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            
            <div className="flex items-center gap-2">
              {/* Desktop Settings Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                className="hidden md:flex text-gray-500 hover:text-gray-700"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="gap-2 h-8 md:h-9 text-xs md:text-sm"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                <span className="inline">Neu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
