import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (name) => {
    if (!name.trim()) {
      return 'Username is required';
    }
    if (name.trim().length < 2) {
      return 'Username must be at least 2 characters long';
    }
    if (name.trim().length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(name.trim())) {
      return 'Username can only contain letters, numbers, and spaces';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
      onLogin(username.trim());
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Task Tracker</h1>
        <p className="login-subtitle">Enter your name to get started</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter your username"
              autoFocus
              disabled={isLoading}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading || !username.trim()}
          >
            {isLoading ? 'Logging in...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
