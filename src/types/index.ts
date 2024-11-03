/**
 * 卡片数据接口
 */
export interface CardData {
  quantumState: string;
  energy: number;
  traits: string[];
  healingText: string[];
}

/**
 * 用户输入数据接口
 */
export interface MoodInput {
  mood: string;
  zodiac: string;
  mbti: string;
}