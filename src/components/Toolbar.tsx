import React from 'react';
import { ChromePicker } from 'react-color';
import { FaPaintBrush, FaEraser, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface ToolbarProps {
  color: string;
  lineWidth: number;
  isVoiceEnabled: boolean;
  onColorChange: (color: string) => void;
  onLineWidthChange: (width: number) => void;
  onVoiceToggle: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  lineWidth,
  isVoiceEnabled,
  onColorChange,
  onLineWidthChange,
  onVoiceToggle,
}) => {
  return (
    <div className="toolbar">
      <div className="tool-section">
        <FaPaintBrush className="tool-icon" />
        <input
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => onLineWidthChange(Number(e.target.value))}
        />
      </div>
      
      <div className="tool-section">
        <ChromePicker
          color={color}
          onChange={(color) => onColorChange(color.hex)}
          disableAlpha
        />
      </div>

      <div className="tool-section">
        <button onClick={onVoiceToggle} className="voice-button">
          {isVoiceEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          {isVoiceEnabled ? 'Disable Voice' : 'Enable Voice'}
        </button>
      </div>

      <style jsx>{`
        .toolbar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tool-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tool-icon {
          font-size: 20px;
        }

        .voice-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
        }

        .voice-button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Toolbar; 