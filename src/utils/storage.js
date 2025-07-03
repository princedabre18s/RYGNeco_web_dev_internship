// utils/storage.js - Handles all localStorage operations

const STORAGE_KEYS = {
  USERNAME: 'taskTracker_username',
  TASKS: 'taskTracker_tasks',
  NEXT_ID: 'taskTracker_nextId',
  DARK_MODE: 'taskTracker_darkMode',
  CATEGORIES: 'taskTracker_categories'
};

// Sample tasks for initial testing
const sampleTasks = [
  { 
    id: 1, 
    title: "Complete React assignment", 
    description: "Build a task tracker application", 
    completed: false, 
    createdAt: "2024-01-15T10:00:00Z",
    priority: "high",
    dueDate: "2025-07-10T23:59:59Z",
    category: "Work",
    tags: ["react", "programming", "assignment"]
  },
  { 
    id: 2, 
    title: "Review JavaScript concepts", 
    description: "Go through ES6+ features", 
    completed: true, 
    createdAt: "2024-01-14T15:30:00Z",
    priority: "medium",
    dueDate: null,
    category: "Learning",
    tags: ["javascript", "study"]
  }
];

// Default categories
const defaultCategories = ["Work", "Personal", "Learning", "Health", "Finance", "Shopping"];

// Username operations
export const saveUsername = (username) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    return true;
  } catch (error) {
    console.error('Error saving username:', error);
    return false;
  }
};

export const getUsername = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.USERNAME);
  } catch (error) {
    console.error('Error retrieving username:', error);
    return null;
  }
};

export const clearUsername = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
    return true;
  } catch (error) {
    console.error('Error clearing username:', error);
    return false;
  }
};

// Task operations
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks:', error);
    return false;
  }
};

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (tasks) {
      return JSON.parse(tasks);
    }
    // If no tasks exist, initialize with sample tasks
    saveTasks(sampleTasks);
    setNextId(3); // Set next ID after sample tasks
    return sampleTasks;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return [];
  }
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.NEXT_ID);
    return true;
  } catch (error) {
    console.error('Error clearing tasks:', error);
    return false;
  }
};

// ID management for new tasks
export const getNextId = () => {
  try {
    const nextId = localStorage.getItem(STORAGE_KEYS.NEXT_ID);
    return nextId ? parseInt(nextId, 10) : 1;
  } catch (error) {
    console.error('Error retrieving next ID:', error);
    return 1;
  }
};

export const setNextId = (id) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_ID, id.toString());
    return true;
  } catch (error) {
    console.error('Error setting next ID:', error);
    return false;
  }
};

export const generateNewId = () => {
  const currentId = getNextId();
  setNextId(currentId + 1);
  return currentId;
};

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

// Dark mode operations
export const saveDarkMode = (isDark) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark));
    return true;
  } catch (error) {
    console.error('Error saving dark mode preference:', error);
    return false;
  }
};

export const getDarkMode = () => {
  try {
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return darkMode ? JSON.parse(darkMode) : false;
  } catch (error) {
    console.error('Error retrieving dark mode preference:', error);
    return false;
  }
};

// Categories operations
export const saveCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    return true;
  } catch (error) {
    console.error('Error saving categories:', error);
    return false;
  }
};

export const getCategories = () => {
  try {
    const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (categories) {
      return JSON.parse(categories);
    }
    // If no categories exist, initialize with default categories
    saveCategories(defaultCategories);
    return defaultCategories;
  } catch (error) {
    console.error('Error retrieving categories:', error);
    return defaultCategories;
  }
};

export const addCategory = (category) => {
  try {
    const categories = getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      saveCategories(categories);
    }
    return true;
  } catch (error) {
    console.error('Error adding category:', error);
    return false;
  }
};
