import React from 'react';

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    {
      key: 'all',
      label: 'All Tasks',
      count: taskCounts.all,
      icon: '📋'
    },
    {
      key: 'pending',
      label: 'Pending',
      count: taskCounts.pending,
      icon: '⏳'
    },
    {
      key: 'completed',
      label: 'Completed',
      count: taskCounts.completed,
      icon: '✅'
    }
  ];

  return (
    <div className="task-filter">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
          aria-label={`Filter by ${filter.label}`}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
          <span className="task-count">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
