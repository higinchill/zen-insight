import React, { useState, useEffect, useRef } from 'react';
import { TarotCard, SpreadConfig } from '../types';
import { OSHO_CARDS } from '../constants';
import Card from './Card';

interface Props {
  spreadConfig: SpreadConfig;
  onCardsSelected: (cards: TarotCard[]) => void;
}

const SpreadView: React.FC<Props> = ({ spreadConfig, onCardsSelected }) => {
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use 52 cards for the loop
    const shuffled = [...OSHO_CARDS].sort(() => Math.random() - 0.5).slice(0, 52);
    setDeck(shuffled);
    
    const timer = setTimeout(() => setIsShuffling(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index: number) => {
    if (selectedIndices.includes(index)) return;
    
    const newSelection = [...selectedIndices, index];
    setSelectedIndices(newSelection);

    if (newSelection.length === spreadConfig.cardsRequired) {
      setTimeout(() => {
        const finalCards = newSelection.map(idx => deck[idx]);
        onCardsSelected(finalCards);
      }, 800);
    }
  };

  if (isShuffling) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] animate-fadeIn">
        <div className="relative w-40 h-64">
           <div className="absolute inset-0 bg-orange-500 rounded-xl animate-ping opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl border-2 border-white shadow-2xl flex items-center justify-center transform transition-transform hover:scale-105">
             <div className="text-white font-serif text-2xl animate-pulse flex flex-col items-center gap-2">
               <span className="text-4xl">∞</span>
               <span>連結中</span>
             </div>
           </div>
        </div>
        <p className="mt-8 text-orange-800 font-serif text-lg animate-pulse">調整呼吸，連結宇宙意識...</p>
      </div>
    );
  }

  const totalCards = deck.length;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden relative bg-stone-50/50 select-none">
      {/* Instruction Header */}
      <div className="absolute top-6 left-0 right-0 text-center z-20 pointer-events-none">
        <h3 className="text-3xl text-orange-900 font-serif mb-2 drop-shadow-sm">{spreadConfig.name}</h3>
        <div className="inline-block bg-white/80 backdrop-blur-md px-8 py-2 rounded-full shadow-lg border border-orange-100">
          <p className="text-orange-800 font-medium text-lg">
            請憑直覺選取 <span className="text-3xl font-bold text-orange-600 mx-2">{spreadConfig.cardsRequired - selectedIndices.length}</span> 張牌
          </p>
        </div>
      </div>

      {/* Infinity Layout Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex justify-center items-center overflow-hidden perspective-1000"
      >
        {deck.map((card, index) => {
          // Parametric equation for Lemniscate of Bernoulli (Infinity Symbol)
          // x = cos(t) / (1 + sin²(t))
          // y = sin(t) * cos(t) / (1 + sin²(t))
          
          const t = (index / totalCards) * 2 * Math.PI;
          const den = 1 + Math.sin(t) ** 2;
          
          // Calculate position (-1 to 1 range approx)
          const x = Math.cos(t) / den;
          const y = Math.sin(t) * Math.cos(t) / den;

          // Calculate rotation angle (tangent)
          // Use a small delta to find the next point
          const nextT = t + 0.1;
          const nextDen = 1 + Math.sin(nextT) ** 2;
          const nextX = Math.cos(nextT) / nextDen;
          const nextY = Math.sin(nextT) * Math.cos(nextT) / nextDen;
          
          // Calculate angle in degrees
          const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);

          const isSelected = selectedIndices.includes(index);
          
          // Z-index based on y position to simulate depth (lower y is further back visually in 2D projection?)
          // Or just sequential. For infinity loop, let's use sequential to make it look like a ribbon.
          const zIndex = index;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`absolute origin-center transition-all duration-700 ease-out cursor-pointer
                ${isSelected 
                  ? 'opacity-0 scale-150 translate-y-[-200px]' 
                  : 'hover:scale-110 hover:brightness-110 hover:z-50'}
              `}
              style={{
                // Center the card first
                left: '50%',
                top: '50%',
                // Calculate offsets using vmin/vmax to fit screen nicely
                // x range is roughly -1 to 1. y range is roughly -0.5 to 0.5
                // We want width to be wider than height.
                // x * 40vmin gives ample width. y * 40vmin gives ample height.
                transform: `
                  translate(-50%, -50%) 
                  translate(calc(${x * 42}vmin), calc(${y * 42}vmin)) 
                  rotate(${angle + 90}deg)
                `,
                zIndex: zIndex,
                width: 'min(18vw, 90px)',
                height: 'min(28vw, 140px)',
              }}
            >
              {/* Card Back Design */}
              <div className="w-full h-full rounded-lg shadow-md border border-white/30 bg-gradient-to-tr from-orange-600 to-red-700 overflow-hidden relative">
                 <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                 {/* Simple center decoration */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-orange-200/50 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpreadView;