import { GoogleGenAI } from "@google/genai";
import { ReadingContext } from "../types";

// Use the required Flash Lite model for fast responses
const MODEL_NAME = 'gemini-2.5-flash-lite-latest';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
};

export const generateZenReading = async (context: ReadingContext): Promise<string> => {
  try {
    const ai = getClient();
    
    const cardDescriptions = context.selectedCards.map((card, index) => {
      return `位置 ${index + 1}: ${card.name} (${card.suit}) - 關鍵字: ${card.keywords.join(', ')}`;
    }).join('\n');

    const prompt = `
      你是一位充滿智慧、慈悲且幽默的奧修禪卡解讀師。你的任務是連結宇宙意識，為使用者進行牌卡解讀。
      
      使用者的問題: "${context.question}"
      問題類別: "${context.category}"
      
      抽出的牌卡如下:
      ${cardDescriptions}
      
      牌陣類型: ${context.spread}
      
      請根據奧修禪卡的哲學（活在當下、覺知、慶祝、打破制約）來解讀這些牌。
      解讀風格要求：
      1. 語氣溫暖、人性化，像是一位老朋友或心靈導師在對話。
      2. 不要過於宿命論，而是強調覺知與選擇。
      3. 針對每一張牌在該位置的意義進行深入淺出的說明。
      4. 最後給出一個總結性的「宇宙核心訊息」。
      5. 使用繁體中文。
      6. 格式要適合手機閱讀，適當分段。
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "抱歉，宇宙意識連結似乎受到干擾，請稍後再試。";
  } catch (error) {
    console.error("Error generating reading:", error);
    return "抱歉，目前無法連結到解讀服務。請檢查您的網路連線或稍後再試。";
  }
};
