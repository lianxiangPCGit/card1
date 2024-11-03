import { MoodInput, CardData } from '../types';
import { generateLocalCardData } from './localGenerator';

/**
 * 生成心情卡片数据
 * @param input 用户输入的心情、星座和MBTI数据
 * @returns 生成的卡片数据
 */
export async function generateCardData(input: MoodInput): Promise<CardData> {
  // 如果没有配置API地址，直接使用本地生成
  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) {
    return generateLocalCardData(input);
  }
  
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mood: input.mood,
        zodiac: input.zodiac || '未知',
        mbti: input.mbti || '未知'
      })
    });

    if (!response.ok) {
      throw new Error(`服务器响应错误: ${response.status}`);
    }

    const data = await response.json();
    return {
      quantumState: `${input.mood} · ${data.content?.state || '量子共振'}`,
      energy: Math.min(Math.max(data.content?.energy || Math.floor(Math.random() * 40) + 60, 0), 100),
      traits: [
        `» ${input.mood}波动检测`,
        `» ${input.mbti ? `${input.mbti}能量` : '深度'}模式启动`,
        `» ${input.zodiac ? `${input.zodiac}星力` : '宇宙能量'}同步中...`
      ],
      healingText: Array.isArray(data.content?.message) 
        ? data.content.message 
        : [data.content?.message || '正在同步量子状态...']
    };
  } catch (error) {
    console.warn('API调用失败，使用本地生成:', error);
    return generateLocalCardData(input);
  }
}