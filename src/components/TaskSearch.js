import React, { useState } from 'react';

const TaskSearch = ({ onSearch, searchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSearch = (e) => {
    const query = e.target.value;
    setLocalQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <div className="task-search">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={localQuery}
          onChange={handleSearch}
          placeholder="Search tasks by title, description, or tags..."
          className="search-input"
        />
        {localQuery && (
          <button
            onClick={clearSearch}
            className="clear-search-btn"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {localQuery && (
        <div className="search-status">
          Searching for: "<strong>{localQuery}</strong>"
        </div>
      )}
    </div>
  );
};

export default TaskSearch;
