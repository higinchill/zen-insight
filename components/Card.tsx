import React from 'react';
import { TarotCard } from '../types';

interface CardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-20 h-32 text-xs',
    md: 'w-32 h-52 text-sm',
    lg: 'w-48 h-72 text-base',
  };

  return (
    <div 
      className={`card-flip-container ${sizeClasses[size]} cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      <div className={`card-flip-inner ${isFlipped ? 'card-flipped' : ''}`}>
        {/* Card Back */}
        <div className="card-back bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl border-2 border-white shadow-md flex items-center justify-center">
           <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 rounded-full border-2 border-orange-200 flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-200 rounded-full animate-pulse"></div>
             </div>
           </div>
        </div>

        {/* Card Front */}
        <div className="card-front bg-stone-100 rounded-xl shadow-xl overflow-hidden flex flex-col border border-stone-200">
          {/* Image Placeholder - deterministic based on ID */}
          <div 
            className="flex-grow w-full bg-cover bg-center relative"
            style={{ 
              backgroundImage: `url(https://picsum.photos/seed/${card.id + 100}/300/500)`,
              filter: 'sepia(0.3) contrast(1.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-2 w-full text-center px-2">
               <p className="text-orange-200 text-xs font-serif tracking-widest uppercase">{card.suit.split(' ')[0]}</p>
            </div>
          </div>
          
          {/* Card Label */}
          <div className="h-12 flex items-center justify-center bg-white text-stone-800 px-1">
             <span className="font-bold text-center leading-tight line-clamp-2 font-serif">
               {card.name.split(' (')[0]}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;