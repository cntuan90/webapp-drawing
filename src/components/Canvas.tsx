import React, { useRef, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface CanvasProps {
  socket?: Socket;
  color: string;
  lineWidth: number;
  isEraser: boolean;
  isFill: boolean;
  selectedImage?: string;
}

const Canvas: React.FC<CanvasProps> = ({ socket, color, lineWidth, isEraser, isFill, selectedImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    setCtx(context);

    const handleResize = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = isEraser ? '#ffffff' : color;
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth, ctx, isEraser]);

  useEffect(() => {
    if (selectedImage && ctx && canvasRef.current) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        const canvas = canvasRef.current!;
        const x = (canvas.width - img.width) / 2;
        const y = (canvas.height - img.height) / 2;
        ctx.drawImage(img, x, y);
      };
    }
  }, [selectedImage, ctx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isFill) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);

    if (socket) {
      socket.emit('draw-start', { x, y, color: isEraser ? '#ffffff' : color, lineWidth });
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current || isFill) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    if (socket) {
      socket.emit('draw-move', { x, y, color: isEraser ? '#ffffff' : color, lineWidth });
    }
  };

  const stopDrawing = () => {
    if (!ctx || isFill) return;
    ctx.closePath();
    setIsDrawing(false);

    if (socket) {
      socket.emit('draw-end');
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      style={{
        border: '1px solid #000',
        borderRadius: '4px',
        background: '#fff',
      }}
    />
  );
};

export default Canvas; 