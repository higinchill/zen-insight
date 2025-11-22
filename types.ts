export enum CardSuit {
  MAJOR = '主牌 (Major Arcana)',
  FIRE = '火 (Fire)',
  WATER = '水 (Water)',
  CLOUDS = '雲 (Clouds)',
  RAINBOW = '彩虹 (Rainbow)'
}

export interface TarotCard {
  id: number;
  name: string;
  suit: CardSuit;
  keywords: string[];
  description: string;
}

export enum SpreadType {
  DAILY = 'daily',
  THREE_CARD = 'three_card',
  PENTAGRAM = 'pentagram'
}

export interface SpreadConfig {
  id: SpreadType;
  name: string;
  description: string;
  cardsRequired: number;
  positions: string[]; // e.g. ["Body", "Mind", "Spirit"]
}

export interface ReadingContext {
  question: string;
  category: string;
  spread: SpreadType;
  selectedCards: TarotCard[];
}

export interface QuestionCategory {
  id: string;
  name: string;
  questions: string[];
}
