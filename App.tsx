import React, { useState } from 'react';
import { ReadingContext, SpreadType, TarotCard } from './types';
import { SPREADS } from './constants';
import QuestionSelector from './components/QuestionSelector';
import SpreadView from './components/SpreadView';
import ReadingResult from './components/ReadingResult';
import Encyclopedia from './components/Encyclopedia';

enum View {
  HOME = 'home',
  PREPARE_READING = 'prepare',
  SPREAD = 'spread',
  RESULT = 'result',
  LEARN = 'learn'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [context, setContext] = useState<ReadingContext>({
    question: '',
    category: '',
    spread: SpreadType.DAILY,
    selectedCards: []
  });

  const startReading = (spreadId: SpreadType) => {
    setContext(prev => ({ ...prev, spread: spreadId, selectedCards: [] }));
    // If daily, skip question for simplicity, or set default
    if (spreadId === SpreadType.DAILY) {
      setContext(prev => ({ 
        ...prev, 
        spread: spreadId, 
        question: "今日的宇宙指引", 
        category: "每日靜心" 
      }));
      setCurrentView(View.SPREAD);
    } else {
      setCurrentView(View.PREPARE_READING);
    }
  };

  const handleQuestionConfirmed = (q: string, c: string) => {
    setContext(prev => ({ ...prev, question: q, category: c }));
    setCurrentView(View.SPREAD);
  };

  const handleCardsSelected = (cards: TarotCard[]) => {
    setContext(prev => ({ ...prev, selectedCards: cards }));
    setCurrentView(View.RESULT);
  };

  const resetApp = () => {
    setCurrentView(View.HOME);
    setContext({
      question: '',
      category: '',
      spread: SpreadType.DAILY,
      selectedCards: []
    });
  };

  // --- Navigation Bar ---
  const renderNav = () => (
    <nav className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 p-4 flex justify-around items-center z-50 md:static md:top-0 md:bottom-auto md:shadow-sm">
       <button 
         onClick={() => setCurrentView(View.HOME)}
         className={`flex flex-col items-center ${currentView === View.HOME ? 'text-stone-800 font-bold' : 'text-stone-400'}`}
       >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
         </svg>
         <span className="text-xs mt-1">宇宙區</span>
       </button>
       
       <button 
         onClick={() => startReading(SpreadType.DAILY)}
         className={`flex flex-col items-center ${context.spread === SpreadType.DAILY && currentView !== View.LEARN && currentView !== View.HOME ? 'text-stone-800 font-bold' : 'text-stone-400'}`}
       >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
         </svg>
         <span className="text-xs mt-1">每日禪卡</span>
       </button>

       <button 
         onClick={() => setCurrentView(View.LEARN)}
         className={`flex flex-col items-center ${currentView === View.LEARN ? 'text-stone-800 font-bold' : 'text-stone-400'}`}
       >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
         </svg>
         <span className="text-xs mt-1">認識禪卡</span>
       </button>
    </nav>
  );

  // --- Main View Switcher ---
  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fadeIn">
            <div className="mb-10 relative text-center">
               <div className="w-32 h-32 bg-orange-100 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-xl opacity-50"></div>
               <h1 className="text-4xl md:text-6xl font-serif text-stone-800 relative z-10 tracking-wider mb-3">Zen Insight</h1>
               <p className="text-center text-stone-500 font-serif tracking-widest text-sm md:text-base">
                 認識自己，連結宇宙意識，好好生活
               </p>
            </div>

            <div className="grid gap-6 w-full max-w-md">
              <button 
                onClick={() => startReading(SpreadType.DAILY)}
                className="bg-stone-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all text-left relative overflow-hidden group"
              >
                <h3 className="text-xl font-bold font-serif mb-2">每日禪卡提醒</h3>
                <p className="text-stone-300 text-sm font-light">抽取今日的靜心指引，覺察當下</p>
              </button>

              <button 
                onClick={() => startReading(SpreadType.THREE_CARD)}
                className="bg-white text-stone-800 border border-stone-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
              >
                <h3 className="text-xl font-bold font-serif mb-2 text-stone-800">三張牌陣解讀</h3>
                <p className="text-stone-500 text-sm font-light">過去 • 現在 • 未來 的能量流動</p>
              </button>

              <button 
                onClick={() => startReading(SpreadType.PENTAGRAM)}
                className="bg-white text-stone-800 border border-stone-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
              >
                <h3 className="text-xl font-bold font-serif mb-2 text-stone-800">五芒星牌陣</h3>
                <p className="text-stone-500 text-sm font-light">深入探索：阻礙、行動與結果</p>
              </button>
            </div>
          </div>
        );

      case View.PREPARE_READING:
        return (
          <div className="pt-8 px-4">
             <button onClick={() => setCurrentView(View.HOME)} className="mb-4 text-stone-500 flex items-center text-sm hover:text-stone-800 transition-colors">
               ← 返回宇宙區
             </button>
             <QuestionSelector onConfirm={handleQuestionConfirmed} />
          </div>
        );

      case View.SPREAD:
        const config = SPREADS.find(s => s.id === context.spread)!;
        return <SpreadView spreadConfig={config} onCardsSelected={handleCardsSelected} />;

      case View.RESULT:
        const resultConfig = SPREADS.find(s => s.id === context.spread)!;
        return <ReadingResult context={context} spreadConfig={resultConfig} onReset={resetApp} />;

      case View.LEARN:
        return <Encyclopedia />;
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans">
      <header className="p-4 flex justify-between items-center md:hidden">
         <span className="font-serif text-stone-800 font-bold tracking-wider">Zen Insight</span>
      </header>
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {renderNav()}
    </div>
  );
};

export default App;