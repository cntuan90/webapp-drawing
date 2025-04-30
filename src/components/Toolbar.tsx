import React from 'react';
import { ChromePicker } from 'react-color';
import { FaPaintBrush, FaMicrophone, FaMicrophoneSlash, FaEraser, FaRedo, FaFillDrip, FaImage } from 'react-icons/fa';
import './Toolbar.css';

interface ToolbarProps {
  color: string;
  lineWidth: number;
  isVoiceEnabled: boolean;
  onColorChange: (color: string) => void;
  onLineWidthChange: (width: number) => void;
  onVoiceToggle: () => void;
  onEraserToggle: () => void;
  onResetCanvas: () => void;
  onFillToggle: () => void;
  onSelectImage: (image: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  lineWidth,
  isVoiceEnabled,
  onColorChange,
  onLineWidthChange,
  onVoiceToggle,
  onEraserToggle,
  onResetCanvas,
  onFillToggle,
  onSelectImage,
}) => {
  const exampleImages = [
    { name: 'Flower', path: '/images/flower.png' },
    { name: 'Cat', path: '/images/cat.png' },
    { name: 'Dog', path: '/images/dog.png' },
    { name: 'Dinosaur', path: '/images/dinosaur.png' },
  ];

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
        <button onClick={onEraserToggle} className="tool-button">
          <FaEraser />
          Eraser
        </button>
      </div>

      <div className="tool-section">
        <button onClick={onResetCanvas} className="tool-button">
          <FaRedo />
          Reset Canvas
        </button>
      </div>

      <div className="tool-section">
        <button onClick={onFillToggle} className="tool-button">
          <FaFillDrip />
          Fill
        </button>
      </div>

      <div className="tool-section">
        <div className="image-options">
          <FaImage className="tool-icon" />
          <div className="image-buttons">
            {exampleImages.map((image) => (
              <button
                key={image.name}
                onClick={() => onSelectImage(image.path)}
                className="image-button"
              >
                {image.name}
              </button>
            ))}
          </div>
        </div>
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