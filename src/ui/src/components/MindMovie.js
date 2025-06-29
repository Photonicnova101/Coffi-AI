import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Brain, Heart, Star, ArrowRight } from 'lucide-react';
import './MindMovie.css';

const MindMovie = ({ onNext, userData, updateUserData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const mindMovieSlides = [
    {
      title: "Your Future Self",
      subtitle: "Where do you see yourself in 2 years?",
      content: "Visualize yourself achieving your biggest goals. See the person you're becoming - confident, successful, and fulfilled.",
      icon: <Target size={60} color="#10b981" />,
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      title: "The Right Mindset",
      subtitle: "Daily mindset for success",
      content: "Every morning, choose to be the person who makes things happen. Focus on progress, not perfection. Believe in your ability to grow and adapt.",
      icon: <Brain size={60} color="#8b5cf6" />,
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    },
    {
      title: "Your Why",
      subtitle: "What drives you forward?",
      content: "Remember why you started. Your purpose is your fuel. When challenges arise, your 'why' will keep you moving forward with passion and determination.",
      icon: <Heart size={60} color="#ef4444" />,
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
    },
    {
      title: "Daily Actions",
      subtitle: "Small steps, big results",
      content: "Success is built one day at a time. Focus on the actions you can take today that will move you closer to your goals. Consistency beats intensity.",
      icon: <Star size={60} color="#f59e0b" />,
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mindMovieSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, mindMovieSlides.length]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    onNext();
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  return (
    <div className="mind-movie">
      <div className="mind-movie-container">
        <div className="mind-movie-header">
          <h1>Your Mind Movie</h1>
          <p>Visualize your future and set the right mindset for today</p>
        </div>

        <div className="mind-movie-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="mind-movie-slide"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{ background: mindMovieSlides[currentSlide].background }}
            >
              <div className="slide-icon">
                {mindMovieSlides[currentSlide].icon}
              </div>
              <h2>{mindMovieSlides[currentSlide].title}</h2>
              <h3>{mindMovieSlides[currentSlide].subtitle}</h3>
              <p>{mindMovieSlides[currentSlide].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mind-movie-controls">
          <div className="slide-indicators">
            {mindMovieSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>

          <div className="playback-controls">
            {isPlaying ? (
              <button className="control-btn" onClick={handlePause}>
                ⏸️ Pause
              </button>
            ) : (
              <button className="control-btn" onClick={handlePlay}>
                ▶️ Play
              </button>
            )}
          </div>
        </div>

        <div className="mind-movie-actions">
          <button className="next-btn" onClick={handleNext}>
            Continue to Tasks
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindMovie; 