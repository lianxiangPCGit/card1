import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { formatPrompt } from '../src/prompts/mood-card.prompt.js';

// 加载环境变量
dotenv.config();

const app = express();

// 中间件配置
app.use(cors());  // 允许跨域请求
app.use(express.json());  // 解析JSON请求体

// Anthropic API配置
const API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = process.env.ANTHROPIC_API_KEY;

/**
 * 处理生成请求的路由
 * 调用Claude API生成卡片内容
 */
app.post('/api/generate', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API密钥未配置' });
  }

  try {
    // 调用Claude API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: formatPrompt(req.body)
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API错误: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({ error: '生成响应失败' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});