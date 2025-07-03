import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  filter, 
  searchQuery,
  onToggleComplete, 
  onDeleteTask, 
  onEditTask 
}) => {
  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'all':
      default:
        return tasks;
    }
  };

  const searchTasks = (tasks, query) => {
    if (!query.trim()) return tasks;
    
    const lowercaseQuery = query.toLowerCase();
    return tasks.filter(task => {
      return (
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description.toLowerCase().includes(lowercaseQuery) ||
        (task.category && task.category.toLowerCase().includes(lowercaseQuery)) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
      );
    });
  };

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      // First, separate completed from pending tasks
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Pending tasks first
      }

      // For pending tasks, apply smart sorting
      if (!a.completed && !b.completed) {
        // Priority weight: high=3, medium=2, low=1
        const getPriorityWeight = (priority) => {
          switch (priority) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
            default: return 2; // default to medium
          }
        };

        // Check if tasks are overdue
        const now = new Date();
        const aOverdue = a.dueDate && new Date(a.dueDate) < now;
        const bOverdue = b.dueDate && new Date(b.dueDate) < now;

        // Overdue tasks always come first
        if (aOverdue !== bOverdue) {
          return aOverdue ? -1 : 1;
        }

        // Both overdue or both not overdue - sort by priority first
        const aPriority = getPriorityWeight(a.priority);
        const bPriority = getPriorityWeight(b.priority);

        if (aPriority !== bPriority) {
          return bPriority - aPriority; // Higher priority first
        }

        // Same priority - sort by due date
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate); // Earlier due date first
        }

        // Tasks with due dates come before tasks without due dates
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;

        // If no due dates, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      // For completed tasks, sort by completion time (most recent first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const filteredTasks = sortTasks(searchTasks(filterTasks(tasks, filter), searchQuery || ''));

  const EmptyState = ({ filter, searchQuery }) => {
    const getEmptyMessage = () => {
      if (searchQuery) {
        return {
          icon: '🔍',
          title: 'No tasks found',
          subtitle: `No tasks match "${searchQuery}". Try different keywords.`
        };
      }
      
      switch (filter) {
        case 'completed':
          return {
            icon: '🎯',
            title: 'No completed tasks yet',
            subtitle: 'Complete some tasks to see them here'
          };
        case 'pending':
          return {
            icon: '🎉',
            title: 'All tasks completed!',
            subtitle: 'Great job! Add new tasks to keep going'
          };
        case 'all':
        default:
          return {
            icon: '📝',
            title: 'No tasks yet',
            subtitle: 'Add your first task to get started'
          };
      }
    };

    const message = getEmptyMessage();

    return (
      <div className="empty-state">
        <div className="empty-state-icon">{message.icon}</div>
        <div className="empty-state-text">{message.title}</div>
        <div className="empty-state-subtext">{message.subtitle}</div>
      </div>
    );
  };

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <EmptyState filter={filter} searchQuery={searchQuery} />
      ) : (
        <div className="task-items">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
