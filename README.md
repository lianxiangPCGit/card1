# 赛博心情卡片生成器

## 环境配置

1. 创建 `.env.local` 文件（不要提交到代码仓库）
2. 添加你的 API key：
```
ANTHROPIC_API_KEY=your_api_key
```

## 开发说明

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 启动API服务器：
```bash
npm run server
```

## 安全说明

- 永远不要在代码仓库中提交 API 密钥
- 使用 .env.local 进行本地开发
- 在生产环境使用环境变量或密钥管理服务