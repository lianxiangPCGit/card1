import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// 获取根元素
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('找不到root元素');

// 创建React根实例并渲染应用
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);