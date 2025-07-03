import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskSearch from './components/TaskSearch';
import DarkModeToggle from './components/DarkModeToggle';
import {
  saveUsername,
  getUsername,
  clearUsername,
  saveTasks,
  getTasks,
  generateNewId,
  saveDarkMode,
  getDarkMode
} from './utils/storage';
import './styles/App.css';

function App() {
  console.log("App component is rendering");

  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for existing user
        const existingUser = getUsername();
        if (existingUser) {
          setCurrentUser(existingUser);
        }

        // Load tasks
        const existingTasks = getTasks();
        setTasks(existingTasks);

        // Load dark mode preference
        const darkModePreference = getDarkMode();
        setIsDarkMode(darkModePreference);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Save tasks whenever tasks change
  useEffect(() => {
    if (!isLoading && tasks.length >= 0) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const handleLogin = (username) => {
    setCurrentUser(username);
    saveUsername(username);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? Your tasks will be saved.')) {
      setCurrentUser(null);
      clearUsername();
      setActiveFilter('all');
      setSearchQuery('');
    }
  };

  const handleAddTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: generateNewId()
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  const handleEditTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveDarkMode(newDarkMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getTaskCounts = () => {
    const all = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;

    return { all, completed, pending };
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading Task Tracker...
        </div>
      </div>
    );
  }

  // Show login if no user
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const taskCounts = getTaskCounts();

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <h1 className="app-title">Task Tracker</h1>
        <div className="user-info">
          <DarkModeToggle isDark={isDarkMode} onToggle={handleToggleDarkMode} />
          <span className="welcome-text">Welcome, {currentUser}!</span>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskSearch 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
        />
        
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
        
        <TaskList
          tasks={tasks}
          filter={activeFilter}
          searchQuery={searchQuery}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>
    </div>
  );
}

export default App;
