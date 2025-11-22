import React from 'react';
import { ReadingContext, SpreadConfig } from '../types';
import Card from './Card';

interface Props {
  context: ReadingContext;
  spreadConfig: SpreadConfig;
  onReset: () => void;
}

const ReadingResult: React.FC<Props> = ({ context, spreadConfig, onReset }) => {
  
  // Helper to render description with bold headings
  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.includes('【') && line.includes('】')) {
        return <p key={i} className="font-bold text-stone-800 mt-3 mb-1">{line}</p>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-1">{line}</p>;
    });
  };

  // Layout logic for different spreads
  const renderCardLayout = () => {
    if (spreadConfig.id === 'daily') {
      return (
        <div className="flex flex-col items-center mb-8">
          <div className="text-center mb-6">
            <p className="text-stone-600 mb-4 font-serif font-bold tracking-widest uppercase text-sm">今日指引</p>
            <Card card={context.selectedCards[0]} isFlipped={true} size="lg" className="shadow-2xl mx-auto" />
          </div>
          
          {/* Single Card Description */}
          <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-sm border border-stone-100 text-stone-600 leading-relaxed text-sm md:text-base">
            <h4 className="text-xl font-serif font-bold text-stone-900 mb-3">{context.selectedCards[0].name}</h4>
            {renderDescription(context.selectedCards[0].description)}
          </div>
        </div>
      );
    }

    if (spreadConfig.id === 'three_card') {
      return (
        <div className="flex flex-col gap-8 mb-8 max-w-4xl mx-auto px-2">
           {context.selectedCards.map((card, idx) => (
             <div key={card.id} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex flex-col md:flex-row gap-6 items-center md:items-start">
               <div className="flex-shrink-0 flex flex-col items-center">
                  <p className="text-stone-500 mb-2 text-xs font-bold tracking-wider uppercase">
                    {spreadConfig.positions[idx]}
                  </p>
                  <Card card={card} isFlipped={true} size="md" />
               </div>
               <div className="flex-grow text-left pt-2">
                  <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">{card.name}</h4>
                  <div className="text-sm text-stone-600 leading-relaxed">
                    {renderDescription(card.description)}
                  </div>
               </div>
             </div>
           ))}
        </div>
      );
    }
    
    // Pentagram layout
    if (spreadConfig.id === 'pentagram') {
      return (
        <div className="flex flex-col gap-4 mb-8 max-w-2xl mx-auto">
           <div className="mb-6 text-center">
             <div className="relative inline-block">
                <Card card={context.selectedCards[0]} isFlipped={true} size="sm" className="mx-auto mb-2" />
                <div className="absolute -top-3 -right-3 bg-stone-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
             </div>
             <p className="text-xs text-stone-500 mt-1 font-bold">核心：{spreadConfig.positions[0]}</p>
           </div>

           <div className="space-y-4">
            {context.selectedCards.map((card, idx) => (
              <div key={card.id} className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 border-b border-stone-100 pb-2">
                  <span className="bg-stone-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{idx + 1}</span>
                  <span className="text-sm font-bold text-stone-700">{spreadConfig.positions[idx]}</span>
                  <span className="text-stone-300">|</span>
                  <span className="font-serif font-bold text-stone-900">{card.name}</span>
                </div>
                <div className="text-sm text-stone-600 pl-8 leading-relaxed">
                   {renderDescription(card.description)}
                </div>
              </div>
            ))}
           </div>
        </div>
      );
    }
  };

  return (
    <div className="animate-fadeIn pb-20 w-full max-w-3xl mx-auto px-4">
      <div className="mb-8 text-center pt-8">
        <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold mb-2">{spreadConfig.name}</h2>
        <p className="text-stone-500 text-sm font-light">
          問題：{context.question}
        </p>
      </div>

      {renderCardLayout()}

      <div className="mt-12 text-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-900 transition-all shadow-lg font-serif tracking-widest uppercase text-sm"
        >
          再次抽卡
        </button>
      </div>
    </div>
  );
};

export default ReadingResult;