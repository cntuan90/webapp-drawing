import React from 'react';
import { ChromePicker } from 'react-color';
import { FaPaintBrush, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import './Toolbar.css';

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
    </div>
  );
};

export default Toolbar; 