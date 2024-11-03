import html2canvas from 'html2canvas';

export async function downloadCard(cardElement: HTMLElement) {
  if (!cardElement) {
    console.error('卡片元素不存在');
    throw new Error('卡片元素不存在');
  }

  try {
    const card = cardElement.querySelector('.card') as HTMLElement;
    if (!card) {
      throw new Error('找不到.card元素');
    }

    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: '#111827',
      logging: false,
      onclone: (document) => {
        const clonedCard = document.querySelector('.card') as HTMLElement;
        if (!clonedCard) {
          throw new Error('克隆卡片失败');
        }

        clonedCard.style.boxShadow = '0 0 20px rgba(34,211,238,0.8)';
        
        const messageBox = clonedCard.querySelector('.message-box') as HTMLElement;
        if (!messageBox) {
          throw new Error('找不到消息框元素');
        }

        messageBox.style.transform = 'none';
        messageBox.style.display = 'flex';
        messageBox.style.alignItems = 'center';
        messageBox.style.justifyContent = 'center';
        messageBox.style.height = '140px';
        messageBox.style.margin = '0';
        messageBox.style.padding = '20px';
        
        const textContainer = messageBox.querySelector('.text-container') as HTMLElement;
        if (!textContainer) {
          throw new Error('找不到文本容器');
        }

        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        textContainer.style.margin = '0';
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        textContainer.style.justifyContent = 'space-between';
        textContainer.style.alignItems = 'center';
        
        const textLines = textContainer.querySelectorAll('div');
        textLines.forEach(line => {
          const lineElement = line as HTMLElement;
          lineElement.style.fontSize = '0.875rem';
          lineElement.style.lineHeight = '1.5rem';
          lineElement.style.textAlign = 'center';
          lineElement.style.width = '100%';
          lineElement.style.color = 'rgb(229, 231, 235)';
          lineElement.style.margin = '0';
        });
        
        const pulseElements = clonedCard.querySelectorAll('.animate-pulse');
        pulseElements.forEach(element => {
          (element as HTMLElement).style.opacity = '1';
        });
      }
    });

    const finalCanvas = document.createElement('canvas');
    const padding = 40;
    finalCanvas.width = canvas.width + padding * 2;
    finalCanvas.height = canvas.height + padding * 2;
    
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('无法获取画布上下文');
    }

    ctx.shadowColor = 'rgba(34,211,238,0.8)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(canvas, padding, padding);

    const link = document.createElement('a');
    link.href = finalCanvas.toDataURL('image/png');
    const logCount = localStorage.getItem('logCount') || '001';
    link.download = `心情卡片_${logCount}.png`;
    
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);

    console.log('图片下载完成');
  } catch (error) {
    console.error('下载卡片失败:', error);
    throw error;
  }
}