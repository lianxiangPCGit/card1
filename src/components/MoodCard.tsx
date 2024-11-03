import React, { useEffect, useState } from 'react';
import { Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { CardData } from '../types';

interface MoodCardProps {
  cardData?: CardData;
}

export const MoodCard: React.FC<MoodCardProps> = ({ cardData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const isNight = currentTime.getHours() >= 18 || currentTime.getHours() < 6;
  const dateStr = `${currentTime.getFullYear()}年${currentTime.getMonth() + 1}月${currentTime.getDate()}日`;
  const weekday = ["日", "一", "二", "三", "四", "五", "六"][currentTime.getDay()];
  const logCount = localStorage.getItem('logCount') || '001';

  // 默认文本
  const defaultText = {
    quantumState: '等待输入...',
    energy: 60,
    traits: [
      '» 等待心情输入...',
      '» 模式选择中...',
      '» 能量同步待机...'
    ],
    healingText: [
      '在数字雨中等待你的心情',
      '准备接收你的量子状态',
      '赛博空间已准备就绪',
      '等待与你的心灵同步'
    ]
  };

  const displayData = cardData || defaultText;

  return (
    <div className="card w-72 h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden animate-glow">
      <div className="relative h-full p-5 text-white">
        {/* 状态栏 */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            心灵同步
          </div>
          <div className="text-purple-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            能量: {displayData.energy}%
          </div>
        </div>

        {/* 量子状态 */}
        <div className="text-sm text-cyan-400 mb-0.5">
          情绪量子态: {displayData.quantumState}
        </div>

        {/* 特征信息 */}
        <div className="mb-6 space-y-1">
          {displayData.traits.map((trait, index) => (
            <div 
              key={index}
              className={`text-sm ${
                trait.includes('检测') || trait.includes('待机') 
                  ? 'text-cyan-400' 
                  : 'text-purple-400'
              }`}
            >
              {trait}
            </div>
          ))}
        </div>

        {/* 治愈文本框 */}
        <div className="message-box bg-gray-900/80 border border-cyan-400/30 rounded p-4 mb-16 animate-float">
          <div className="text-container">
            {displayData.healingText.map((line, index) => (
              <div key={index} className="text-sm text-gray-200 text-center">
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* 页脚信息 */}
        <div className="absolute bottom-4 right-5 text-right">
          <div className="flex items-center justify-end gap-1.5 text-cyan-400 text-xs mb-0.5">
            {isNight ? <Moon className="w-2 h-2" /> : <Sun className="w-2 h-2" />}
            {dateStr}
          </div>
          <div className="text-purple-400 text-[10px]">
            星期{weekday} · 日志#{logCount}
          </div>
        </div>

        {/* 装饰圆环 */}
        <div className="absolute top-5 right-5">
          <div className="w-8 h-8 border border-cyan-400/50 rounded-full animate-spin-slow">
            <div className="w-6 h-6 border border-cyan-400/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};