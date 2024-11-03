import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // 配置静态资源处理
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'gif.worker': resolve(__dirname, 'node_modules/gif.js/dist/gif.worker.js'),
      },
    },
  },
  // 配置开发服务器以处理worker文件
  server: {
    fs: {
      allow: ['..'],  // 允许访问上层目录以访问node_modules
    },
  },
});