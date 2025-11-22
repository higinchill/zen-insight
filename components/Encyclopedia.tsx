import React, { useState } from 'react';
import { OSHO_CARDS } from '../constants';
import { CardSuit, TarotCard } from '../types';
import Card from './Card';

const Encyclopedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(CardSuit.MAJOR);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const tabs = [
    CardSuit.MAJOR,
    CardSuit.FIRE,
    CardSuit.WATER,
    CardSuit.CLOUDS,
    CardSuit.RAINBOW
  ];

  // Filter cards based on tab
  const filteredCards = OSHO_CARDS.filter(c => c.suit === activeTab);

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.includes('【') && line.includes('】')) {
        return <p key={i} className="font-bold text-stone-800 mt-4 mb-2 text-lg">{line}</p>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-2 leading-relaxed text-stone-600">{line}</p>;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24">
      <h2 className="text-3xl font-serif text-center text-orange-900 mb-8 mt-6">認識奧修禪卡</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 sticky top-0 bg-stone-50/95 backdrop-blur-sm py-4 z-20 border-b border-stone-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 font-serif tracking-wide ${
              activeTab === tab 
                ? 'bg-stone-800 text-white shadow-lg scale-105' 
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:border-stone-300'
            }`}
          >
            {tab.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <div 
              key={card.id} 
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-3 transform transition-transform duration-300 group-hover:scale-105">
                <Card card={card} isFlipped={true} size="md" className="pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-colors" />
              </div>
              
              <h4 className="font-bold text-stone-800 text-center text-sm md:text-base mb-1 font-serif">
                {card.name.split(' (')[0]}
              </h4>
              <p className="text-xs text-stone-400 mb-3 font-serif italic">
                {card.name.split(' (')[1]?.replace(')', '')}
              </p>
              
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 bg-stone-50 text-stone-500 text-xs rounded-full border border-stone-100 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors">
                  查看詳情
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-stone-400 flex flex-col items-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎴</span>
            </div>
            <p>更多卡片資料建置中...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-slideUp"
            onClick={e => e.stopPropagation()}
          >
            {/* Card Image Section */}
            <div className="bg-stone-100 p-8 flex items-center justify-center md:w-2/5 border-b md:border-b-0 md:border-r border-stone-100 relative">
              <div className="sticky top-8">
                <Card card={selectedCard} isFlipped={true} size="lg" className="shadow-2xl" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 md:w-3/5 overflow-y-auto custom-scrollbar">
              {/* Header with Back Button */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-start">
                    <button 
                        onClick={() => setSelectedCard(null)}
                        className="flex items-center text-stone-500 hover:text-stone-800 transition-colors -ml-2 px-2 py-1 rounded-lg hover:bg-stone-100 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">返回列表</span>
                    </button>
                    <button 
                        onClick={() => setSelectedCard(null)}
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-400 hover:text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div>
                  <h3 className="text-3xl font-serif font-bold text-stone-900 mb-1">
                    {selectedCard.name.split(' (')[0]}
                  </h3>
                  <p className="text-stone-400 font-serif text-xl italic">
                    {selectedCard.name.split(' (')[1]?.replace(')', '')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCard.keywords.map(k => (
                  <span key={k} className="px-3 py-1 bg-orange-50 text-orange-800 text-sm font-medium rounded-full border border-orange-100 shadow-sm">
                    {k}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-stone prose-lg max-w-none">
                {renderDescription(selectedCard.description)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encyclopedia;