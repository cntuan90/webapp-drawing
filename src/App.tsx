import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import './App.css';

const SOCKET_SERVER_URL = 'http://localhost:3001'; // We'll create the server later

function App() {
  const [socket, setSocket] = useState<any>(null);
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
    // We'll implement voice chat functionality later
  };

  return (
    <div className="app">
      <div className="main-container">
        <Toolbar
          color={color}
          lineWidth={lineWidth}
          isVoiceEnabled={isVoiceEnabled}
          onColorChange={setColor}
          onLineWidthChange={setLineWidth}
          onVoiceToggle={handleVoiceToggle}
        />
        <Canvas
          socket={socket}
          color={color}
          lineWidth={lineWidth}
        />
      </div>
      <style jsx>{`
        .app {
          display: flex;
          height: 100vh;
          padding: 20px;
          background: #f0f2f5;
        }

        .main-container {
          display: flex;
          gap: 20px;
          margin: auto;
          max-width: 1200px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default App; 