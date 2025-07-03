import React, { useState } from 'react';
import { getCategories } from '../utils/storage';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority || 'medium',
    dueDate: task.dueDate ? task.dueDate.slice(0, 16) : '',
    category: task.category || 'Personal',
    tags: (task.tags || []).join(', ')
  });
  const [errors, setErrors] = useState({});
  const [categories] = useState(getCategories());

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = date - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return { text: `Overdue by ${Math.abs(diffDays)} day(s)`, status: 'overdue' };
      } else if (diffDays === 0) {
        return { text: 'Due today', status: 'today' };
      } else if (diffDays === 1) {
        return { text: 'Due tomorrow', status: 'tomorrow' };
      } else if (diffDays <= 7) {
        return { text: `Due in ${diffDays} days`, status: 'soon' };
      } else {
        return { text: `Due ${date.toLocaleDateString()}`, status: 'future' };
      }
    } catch (error) {
      return { text: 'Invalid date', status: 'error' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const validateEdit = () => {
    const newErrors = {};

    if (!editData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (editData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long';
    } else if (editData.title.trim().length > 100) {
      newErrors.title = 'Task title must be less than 100 characters';
    }

    if (editData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (editData.dueDate) {
      const dueDate = new Date(editData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSaveEdit = () => {
    if (!validateEdit()) {
      return;
    }

    const updatedTask = {
      ...task,
      title: editData.title.trim(),
      description: editData.description.trim(),
      priority: editData.priority,
      dueDate: editData.dueDate || null,
      category: editData.category,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onEditTask(updatedTask);
    setIsEditing(false);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.slice(0, 16) : '',
      category: task.category || 'Personal',
      tags: (task.tags || []).join(', ')
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-header">
          <div className="task-content" style={{ width: '100%' }}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                onKeyDown={handleKeyPress}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Task title"
                autoFocus
                maxLength={100}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                onKeyDown={handleKeyPress}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Task description"
                maxLength={500}
                style={{ minHeight: '60px' }}
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  name="priority"
                  value={editData.priority}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
              
              <div className="form-group">
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={editData.dueDate}
                  onChange={handleEditChange}
                  className={`form-input ${errors.dueDate ? 'error' : ''}`}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="tags"
                  value={editData.tags}
                  onChange={handleEditChange}
                  className="form-input"
                  placeholder="Tags (comma separated)"
                />
              </div>
            </div>
            
            <div className="task-actions">
              <button
                onClick={handleSaveEdit}
                className="action-btn save-btn"
                style={{ color: '#28a745', marginRight: '10px' }}
                disabled={!editData.title.trim()}
              >
                💾 Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="action-btn cancel-btn"
                style={{ color: '#6c757d' }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
          aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        
        <div className="task-content">
          <div className="task-header-info">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-badges">
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority || 'medium') }}
              >
                {getPriorityIcon(task.priority || 'medium')} {(task.priority || 'medium').charAt(0).toUpperCase() + (task.priority || 'medium').slice(1)}
              </span>
              <span className="category-badge">
                📁 {task.category || 'Uncategorized'}
              </span>
            </div>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
          
          {task.dueDate && (
            <div className={`task-due-date ${formatDueDate(task.dueDate)?.status}`}>
              <span>⏰</span>
              <span>{formatDueDate(task.dueDate)?.text}</span>
            </div>
          )}
          
          <div className="task-meta">
            <div className="task-date">
              <span>📅</span>
              <span>{formatDate(task.createdAt)}</span>
            </div>
            
            <div className="task-priority" style={{ color: getPriorityColor(task.priority) }}>
              {getPriorityIcon(task.priority)} {task.priority ? (task.priority.charAt(0).toUpperCase() + task.priority.slice(1)) : ''}
            </div>
            
            {dueDateInfo && (
              <div className={`task-due-date ${dueDateInfo.status}`}>
                {dueDateInfo.text}
              </div>
            )}
            
            <div className="task-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="action-btn edit-btn"
                aria-label={`Edit task "${task.title}"`}
                disabled={task.completed}
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="action-btn delete-btn"
                aria-label={`Delete task "${task.title}"`}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="task-status-badge">
        <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
