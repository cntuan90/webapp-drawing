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
        />
      </div>
      <div className="canvas-container">
        <Canvas socket={socket} color={color} lineWidth={lineWidth} />
      </div>
    </div>
  );
};

export default App; 