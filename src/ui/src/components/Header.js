import React from 'react';
import { Minimize2, X } from 'lucide-react';
import './Header.css';

const Header = ({ currentStep, onMinimize, onClose }) => {
  const getStepTitle = (step) => {
    switch (step) {
      case 'welcome':
        return 'Welcome to Day Buddy';
      case 'mind-movie':
        return 'Your Mind Movie';
      case 'tasks':
        return 'Today\'s Tasks';
      case 'chat':
        return 'Chat with Your Buddy';
      default:
        return 'Day Buddy';
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Day Buddy</h1>
          <span className="step-indicator">{getStepTitle(currentStep)}</span>
        </div>
        
        <div className="header-right">
          <button 
            className="window-control minimize-btn"
            onClick={onMinimize}
            title="Minimize"
          >
            <Minimize2 size={16} />
          </button>
          <button 
            className="window-control close-btn"
            onClick={onClose}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 