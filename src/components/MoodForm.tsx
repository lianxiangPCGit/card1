import React from 'react';
import { MoodInput } from '../types';

interface MoodFormProps {
  onSubmit: (data: MoodInput) => void;
  loading?: boolean;
}

export const MoodForm: React.FC<MoodFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = React.useState<MoodInput>({
    mood: '',
    zodiac: '',
    mbti: ''
  });

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mood.trim()) {
      alert('请输入你的心情');
      return;
    }
    onSubmit(formData);
  };

  // 表单字段更新处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    localStorage.setItem('lastMood', JSON.stringify({ ...formData, [name]: value }));
  };

  // 加载上次的输入
  React.useEffect(() => {
    const lastMood = localStorage.getItem('lastMood');
    if (lastMood) {
      try {
        setFormData(JSON.parse(lastMood));
      } catch (error) {
        console.error('加载上次输入失败:', error);
        localStorage.removeItem('lastMood');
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-[300px] p-5 bg-gray-900/80 rounded-lg">
      <input
        type="text"
        name="mood"
        value={formData.mood}
        onChange={handleChange}
        placeholder="输入你的心情..."
        disabled={loading}
        className="w-full p-2 mb-3 bg-white/10 border border-cyan-400/30 text-white rounded disabled:opacity-50"
      />
      
      <select
        name="zodiac"
        value={formData.zodiac}
        onChange={handleChange}
        disabled={loading}
        className="w-full p-2 mb-3 bg-gray-800 border border-cyan-400/30 text-gray-200 rounded disabled:opacity-50"
      >
        <option value="">选择星座（可选）</option>
        {[
          "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座",
          "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"
        ].map(sign => (
          <option key={sign} value={sign}>{sign}</option>
        ))}
      </select>

      <select
        name="mbti"
        value={formData.mbti}
        onChange={handleChange}
        disabled={loading}
        className="w-full p-2 mb-3 bg-gray-800 border border-cyan-400/30 text-gray-200 rounded disabled:opacity-50"
      >
        <option value="">选择MBTI（可选）</option>
        {[
          "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
          "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"
        ].map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '生成中...' : '生成心情卡片'}
      </button>
    </form>
  );
};