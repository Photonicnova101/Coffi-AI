import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Components
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';
import MindMovie from './components/MindMovie';
import TaskManager from './components/TaskManager';
import Header from './components/Header';

function App() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({
    name: '',
    goals: [],
    tasks: [],
    preferences: {}
  });

  useEffect(() => {
    // Check if app version is available
    if (window.electronAPI) {
      window.electronAPI.getAppVersion().then(version => {
        console.log('Day Buddy version:', version);
      });
    }
  }, []);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Header 
          currentStep={currentStep}
          onMinimize={() => window.electronAPI?.minimizeWindow()}
          onClose={() => window.electronAPI?.closeWindow()}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <WelcomeScreen 
                  onNext={() => handleStepChange('mind-movie')}
                  userData={userData}
                  updateUserData={updateUserData}
                />
              } 
            />
            <Route 
              path="/mind-movie" 
              element={
                <MindMovie 
                  onNext={() => handleStepChange('tasks')}
                  userData={userData}
                  updateUserData={updateUserData}
                />
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <TaskManager 
                  onNext={() => handleStepChange('chat')}
                  userData={userData}
                  updateUserData={updateUserData}
                />
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ChatInterface 
                  userData={userData}
                  updateUserData={updateUserData}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
