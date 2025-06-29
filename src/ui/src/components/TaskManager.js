import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import './TaskManager.css';

const TaskManager = ({ onNext, userData, updateUserData }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [priority, setPriority] = useState('medium');

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.trim(),
        estimatedTime: parseInt(estimatedTime),
        priority,
        completed: false,
        scheduledTime: null
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setEstimatedTime(30);
      setPriority('medium');
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const scheduleTasks = () => {
    // Simple scheduling algorithm - distribute tasks throughout the day
    const workingHours = 8; // 8 hours working day
    const startHour = 9; // Start at 9 AM
    const totalMinutes = workingHours * 60;
    
    let currentTime = startHour * 60; // Start at 9 AM in minutes
    const scheduledTasks = tasks.map(task => {
      const scheduledTask = {
        ...task,
        scheduledTime: new Date()
      };
      scheduledTask.scheduledTime.setHours(Math.floor(currentTime / 60), currentTime % 60, 0, 0);
      currentTime += task.estimatedTime + 15; // Add 15 min break between tasks
      return scheduledTask;
    });

    updateUserData({ tasks: scheduledTasks });
    return scheduledTasks;
  };

  const handleContinue = () => {
    if (tasks.length > 0) {
      const scheduledTasks = scheduleTasks();
      // Here we would integrate with Google Calendar API
      console.log('Scheduled tasks:', scheduledTasks);
    }
    onNext();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="task-manager">
      <div className="task-manager-container">
        <div className="task-manager-header">
          <h1>Today's Tasks</h1>
          <p>What do you want to accomplish today?</p>
        </div>

        <div className="task-input-section">
          <div className="task-input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a task..."
              className="task-input"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            
            <div className="task-input-options">
              <div className="time-estimate">
                <Clock size={16} />
                <select 
                  value={estimatedTime} 
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  className="time-select"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
              
              <div className="priority-select">
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="priority-select-dropdown"
                  style={{ borderColor: getPriorityColor(priority) }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
            
            <button className="add-task-btn" onClick={addTask}>
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        <div className="tasks-list">
          <h3>Your Tasks ({tasks.length})</h3>
          
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="task-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="task-content">
                  <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                      <span className="task-time">
                        <Clock size={14} />
                        {task.estimatedTime} min
                      </span>
                      <span 
                        className="task-priority"
                        style={{ color: getPriorityColor(task.priority) }}
                      >
                        {task.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="remove-task-btn"
                    onClick={() => removeTask(task.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {tasks.length === 0 && (
            <div className="empty-tasks">
              <Calendar size={48} color="#9ca3af" />
              <p>No tasks yet. Add your first task above!</p>
            </div>
          )}
        </div>

        <div className="task-summary">
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-label">Total Tasks:</span>
              <span className="stat-value">{tasks.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Time:</span>
              <span className="stat-value">
                {tasks.reduce((total, task) => total + task.estimatedTime, 0)} min
              </span>
            </div>
          </div>
        </div>

        <div className="task-actions">
          <button 
            className="schedule-btn" 
            onClick={handleContinue}
            disabled={tasks.length === 0}
          >
            Schedule Tasks & Continue
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager; 