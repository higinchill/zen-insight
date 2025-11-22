import React, { useState } from 'react';
import { QUESTION_CATEGORIES } from '../constants';
import { QuestionCategory } from '../types';

interface Props {
  onConfirm: (question: string, category: string) => void;
}

const QuestionSelector: React.FC<Props> = ({ onConfirm }) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 animate-fadeIn">
      <h2 className="text-2xl font-serif text-orange-800 mb-6 text-center">請輸入您心中的疑惑</h2>
      
      {/* Custom Input */}
      <div className="mb-8">
        <label className="block text-stone-600 mb-2 text-sm font-semibold">自訂問題</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="例如：我最近的工作運勢如何？"
            className="flex-1 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50/50"
          />
          <button 
            onClick={() => customQuestion && onConfirm(customQuestion, '自訂')}
            disabled={!customQuestion.trim()}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-md"
          >
            確認
          </button>
        </div>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-orange-200"></div>
        <span className="flex-shrink mx-4 text-orange-400 text-sm">或是從類別中選擇</span>
        <div className="flex-grow border-t border-orange-200"></div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {QUESTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory?.id === cat.id 
                  ? 'bg-orange-600 text-white shadow-md scale-105' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Suggested Questions */}
        {selectedCategory && (
          <div className="grid gap-3 mt-4 animate-pulse-once">
            {selectedCategory.questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onConfirm(q, selectedCategory.name)}
                className="text-left p-3 rounded-lg border border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-all text-stone-700 group flex items-center"
              >
                <span className="w-2 h-2 rounded-full bg-orange-300 mr-3 group-hover:bg-orange-500"></span>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionSelector;