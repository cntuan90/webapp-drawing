import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import './App.css';

const SOCKET_SERVER_URL = 'http://localhost:3001';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    // TODO: Implement voice chat functionality
  };

  const handleEraserToggle = () => {
    setIsEraser(!isEraser);
    setIsFill(false);
  };

  const handleFillToggle = () => {
    setIsFill(!isFill);
    setIsEraser(false);
  };

  const handleResetCanvas = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="app">
      <div className="toolbar-container">
        <Toolbar
          color={color}
          lineWidth={lineWidth}
          isVoiceEnabled={isVoiceEnabled}
          onColorChange={setColor}
          onLineWidthChange={setLineWidth}
          onVoiceToggle={handleVoiceToggle}
          onEraserToggle={handleEraserToggle}
          onResetCanvas={handleResetCanvas}
          onFillToggle={handleFillToggle}
          onSelectImage={setSelectedImage}
        />
      </div>
      <div className="canvas-container">
        <Canvas
          socket={socket}
          color={color}
          lineWidth={lineWidth}
          isEraser={isEraser}
          isFill={isFill}
          selectedImage={selectedImage}
        />
      </div>
    </div>
  );
};

export default App; 