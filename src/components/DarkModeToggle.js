import React from 'react';

const DarkModeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`dark-mode-toggle ${isDark ? 'dark' : 'light'}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="toggle-icon">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className="toggle-text">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
