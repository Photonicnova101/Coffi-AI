import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Coffee, Sparkles } from 'lucide-react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onNext, userData, updateUserData }) => {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setTimeOfDay('morning');
      setGreeting('Good morning!');
    } else if (hour < 17) {
      setTimeOfDay('afternoon');
      setGreeting('Good afternoon!');
    } else {
      setTimeOfDay('evening');
      setGreeting('Good evening!');
    }
  }, []);

  const handleGetStarted = () => {
    onNext();
  };

  return (
    <motion.div 
      className="welcome-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="welcome-container">
        <motion.div 
          className="welcome-icon"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          {timeOfDay === 'morning' && <Sun size={80} color="#fbbf24" />}
          {timeOfDay === 'afternoon' && <Coffee size={80} color="#8b5cf6" />}
          {timeOfDay === 'evening' && <Sparkles size={80} color="#06b6d4" />}
        </motion.div>

        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {greeting}
        </motion.h1>

        <motion.h2 
          className="welcome-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Ready to make today amazing?
        </motion.h2>

        <motion.p 
          className="welcome-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Your Day Buddy is here to help you set the perfect mindset, 
          visualize your goals, and organize your day for maximum productivity.
        </motion.p>

        <motion.div 
          className="welcome-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <span>Visualize your future</span>
          </div>
          <div className="feature">
            <div className="feature-icon">📝</div>
            <span>Plan your tasks</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <span>Chat with AI assistant</span>
          </div>
        </motion.div>

        <motion.button 
          className="get-started-btn"
          onClick={handleGetStarted}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen; 