import React from 'react';
import { Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { CardData } from '../types';

interface CardProps {
  data: CardData;
  logNumber: number;
}

export const Card: React.FC<CardProps> = ({ data, logNumber }) => {
  const now = new Date();
  const isNight = now.getHours() >= 18 || now.getHours() < 6;
  const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  const weekDay = now.toLocaleDateString('zh-CN', { weekday: 'long' });

  return (
    <div className="w-72 h-96 relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden animate-glow">
      <div className="relative h-full p-5 text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="text-cyan-400 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            心灵同步
          </div>
          <div className="text-purple-400 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            能量: {data.energy}%
          </div>
        </div>

        <div className="text-sm text-cyan-400 mb-0.5">
          情绪量子态: {data.quantumState}
        </div>

        <div className="mb-6">
          {data.traits.map((trait, index) => (
            <div 
              key={index}
              className={`text-sm ${index % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'}`}
            >
              » {trait}
            </div>
          ))}
        </div>

        <div className="p-4 rounded bg-gray-900/80 border border-cyan-400/30 shadow-lg mb-16 animate-float">
          <div className="text-gray-200 text-base leading-relaxed">
            {data.healingText.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-5 text-right">
          <div className="flex items-center justify-end gap-1.5 text-cyan-400 text-xs mb-0.5">
            {isNight ? <Moon className="w-2 h-2" /> : <Sun className="w-2 h-2" />}
            {dateStr}
          </div>
          <div className="text-purple-400 text-[10px]">
            {weekDay} · 日志#{logNumber.toString().padStart(3, '0')}
          </div>
        </div>

        <div className="absolute top-5 right-5">
          <div className="w-8 h-8 border border-cyan-400/50 rounded-full animate-spin-slow">
            <div className="w-6 h-6 border border-cyan-400/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};