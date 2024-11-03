import { MoodInput, CardData } from '../types';

/**
 * 本地生成心情卡片数据
 * @param input 用户输入的心情、星座和MBTI数据
 * @returns 生成的卡片数据
 */
export function generateLocalCardData(input: MoodInput): CardData {
  // 量子状态池
  const moodStates = [
    '量子共振',
    '能量充盈',
    '静谧平衡',
    '创意迸发',
    '深度思考',
    '数据涌动',
    '光速同步',
    '星际共鸣'
  ];

  // 扩展的治愈消息池
  const healingParts = {
    starts: [
      '在数字雨中',
      '穿越电子洪流',
      '量子隧道中',
      '赛博空间里',
      '虚拟星河间',
      '代码海洋中',
      '数据流深处',
      '全息世界里'
    ],
    actions: [
      '寻找平静',
      '编织梦境',
      '解构忧伤',
      '重构快乐',
      '同步心跳',
      '解密情绪',
      '编程治愈',
      '量化心情'
    ],
    metaphors: [
      '让思绪化作流动的代码',
      '用像素编织温暖的拥抱',
      '将烦恼转译为二进制',
      '让量子比特承载希望',
      '用神经网络过滤焦虑',
      '让算法优化你的心情',
      '用数据流冲刷疲惫',
      '让光纤传递温暖'
    ],
    endings: [
      '在赛博空间找到归属',
      '与量子纠缠共振心灵',
      '让虚拟星光照亮前路',
      '在数据海洋中重生',
      '与AI同步心跳频率',
      '在代码中构建避风港',
      '让全息影像映照希望',
      '在赛博朋克中觅得慰藉'
    ]
  };

  // 随机生成四行不重复的治愈文本
  function generateUniqueHealingText() {
    const { starts, actions, metaphors, endings } = healingParts;
    const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);
    
    return [
      `${shuffleArray(starts)[0]}${shuffleArray(actions)[0]}`,
      `${shuffleArray(metaphors)[0]}`,
      `${shuffleArray(starts)[1]}${shuffleArray(actions)[1]}`,
      `${shuffleArray(endings)[0]}`
    ];
  }

  // 根据心情调整能量值
  const getEnergyLevel = (mood: string) => {
    const happyMoods = ['开心', '快乐', '兴奋', '激动', '喜悦'];
    const sadMoods = ['难过', '伤心', '沮丧', '失落', '痛苦'];
    
    if (happyMoods.some(m => mood.includes(m))) {
      return Math.floor(Math.random() * 20) + 80; // 80-99
    } else if (sadMoods.some(m => mood.includes(m))) {
      return Math.floor(Math.random() * 20) + 60; // 60-79
    }
    return Math.floor(Math.random() * 30) + 65; // 65-94
  };

  const randomState = moodStates[Math.floor(Math.random() * moodStates.length)];
  const energy = getEnergyLevel(input.mood);

  // 生成特征描述
  const generateTraits = () => {
    const traits = [
      `» ${input.mood}波动检测中...`,
      input.mbti 
        ? `» ${input.mbti}能量模式激活` 
        : `» 深度休眠模式启动`,
    ];

    if (input.zodiac) {
      traits.push(`» ${input.zodiac}星力同步完成`);
    } else {
      traits.push(`» 宇宙能量注入中...`);
    }

    return traits;
  };

  return {
    quantumState: `${input.mood} · ${randomState}`,
    energy,
    traits: generateTraits(),
    healingText: generateUniqueHealingText()
  };
}