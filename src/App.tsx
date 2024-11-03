import React, { useState, useRef } from 'react';
import { MoodCard } from './components/MoodCard';
import { MoodForm } from './components/MoodForm';
import { generateCardData } from './utils/api';
import { downloadCard } from './utils/download';
import { CardData, MoodInput } from './types';
import { AlertCircle, Download } from 'lucide-react';

function App() {
  const [cardData, setCardData] = useState<CardData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerateCard = async (input: MoodInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await generateCardData(input);
      setCardData(data);
      
      const currentCount = parseInt(localStorage.getItem('logCount') || '0');
      localStorage.setItem('logCount', (currentCount + 1).toString());
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '生成卡片时出错，请稍后重试';
      setError(errorMessage);
      console.error('生成卡片失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      await downloadCard(cardRef.current);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '下载卡片时出错，请稍后重试';
      setError(errorMessage);
      console.error('下载卡片失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row items-center justify-center gap-8 p-8">
      <div className="relative flex flex-col items-center">
        <div ref={cardRef}>
          <MoodCard cardData={cardData} />
        </div>
        {cardData && (
          <button
            onClick={handleDownload}
            className="absolute bottom-[-2rem] right-0 text-cyan-400/60 hover:text-cyan-400 transition-colors"
            title="下载卡片"
          >
            <Download className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <MoodForm onSubmit={handleGenerateCard} loading={loading} />
      
      {error && (
        <div className="fixed top-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg">
            生成中...
          </div>
        </div>
      )}
    </div>
  );
}

export default App;