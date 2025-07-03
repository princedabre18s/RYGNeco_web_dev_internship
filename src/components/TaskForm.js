import React, { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../utils/storage';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Load categories on component mount
  useEffect(() => {
    const loadedCategories = getCategories();
    setCategories(loadedCategories);
    if (loadedCategories.length > 0) {
      setFormData(prev => ({ ...prev, category: loadedCategories[0] }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Task title must be less than 100 characters';
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      addCategory(newCategory.trim());
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const newTask = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || null,
        category: formData.category,
        tags: tagsArray,
        completed: false,
        createdAt: new Date().toISOString()
      };

      onAddTask(newTask);

      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: categories[0] || '',
        tags: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding task:', error);
      setErrors({ submit: 'Failed to add task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim().length >= 3;

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title"
              disabled={isSubmitting}
              maxLength={100}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <div className="category-input-group">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`form-select ${errors.category ? 'error' : ''}`}
                disabled={isSubmitting}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="add-category-group">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="form-input-small"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="add-category-btn"
                  disabled={!newCategory.trim() || isSubmitting}
                >
                  +
                </button>
              </div>
            </div>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date (Optional)
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className={`form-input ${errors.dueDate ? 'error' : ''}`}
              disabled={isSubmitting}
              min={new Date().toISOString().slice(0, 16)}
            />
            {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Enter task description"
            disabled={isSubmitting}
            maxLength={500}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            {formData.description.length}/500 characters
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            Tags (Optional)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter tags separated by commas (e.g., work, urgent, meeting)"
            disabled={isSubmitting}
          />
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            Separate multiple tags with commas
          </div>
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button
          type="submit"
          className="add-task-btn"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
