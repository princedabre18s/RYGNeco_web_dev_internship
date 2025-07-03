// Simple test utilities for manual testing
// This file contains helper functions and test data for manual testing

export const testData = {
  // Valid usernames for testing
  validUsernames: [
    'John',
    'Jane Doe',
    'user123',
    'TestUser2024'
  ],
  
  // Invalid usernames for testing
  invalidUsernames: [
    '', // empty
    'a', // too short
    'this_is_a_very_long_username_that_exceeds_the_limit', // too long
    'user@name', // special characters
    'user#123', // special characters
  ],
  
  // Valid tasks for testing
  validTasks: [
    {
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task tracker project'
    },
    {
      title: 'Review code',
      description: ''
    },
    {
      title: 'Test application',
      description: 'Perform thorough testing of all features including edge cases'
    }
  ],
  
  // Invalid tasks for testing
  invalidTasks: [
    {
      title: '', // empty title
      description: 'This should fail validation'
    },
    {
      title: 'ab', // too short
      description: 'Title too short'
    },
    {
      title: 'a'.repeat(101), // too long
      description: 'Title too long'
    }
  ]
};

// Test scenarios for manual testing
export const testScenarios = [
  {
    category: 'Login Functionality',
    tests: [
      'Enter valid username (2-20 chars, alphanumeric)',
      'Try empty username - should show error',
      'Try username with 1 character - should show error',
      'Try username with special characters - should show error',
      'Try username with 21+ characters - should show error',
      'Verify username persists after page refresh',
      'Test logout functionality'
    ]
  },
  {
    category: 'Task Creation',
    tests: [
      'Create task with valid title (3+ chars)',
      'Create task with title and description',
      'Try creating task with empty title - should show error',
      'Try creating task with 1-2 character title - should show error',
      'Try creating task with 101+ character title - should show error',
      'Try creating task with 501+ character description - should show error',
      'Verify new tasks appear at top of list',
      'Verify task gets creation timestamp'
    ]
  },
  {
    category: 'Task Management',
    tests: [
      'Toggle task completion status',
      'Edit task title and description',
      'Save edited task',
      'Cancel task editing',
      'Delete task with confirmation',
      'Cancel task deletion',
      'Verify completed tasks show different styling'
    ]
  },
  {
    category: 'Task Filtering',
    tests: [
      'Filter by "All" tasks',
      'Filter by "Pending" tasks only',
      'Filter by "Completed" tasks only',
      'Verify task counts are accurate',
      'Test filtering with empty states',
      'Verify appropriate empty state messages'
    ]
  },
  {
    category: 'Data Persistence',
    tests: [
      'Add tasks and refresh page - tasks should persist',
      'Complete tasks and refresh - status should persist',
      'Login and refresh - username should persist',
      'Test with localStorage disabled (if possible)',
      'Test with multiple browser tabs'
    ]
  },
  {
    category: 'Responsive Design',
    tests: [
      'Test on mobile viewport (< 768px)',
      'Test on tablet viewport (768px - 1024px)',
      'Test on desktop viewport (> 1024px)',
      'Verify all interactions work on touch devices',
      'Test form inputs on mobile',
      'Verify readability across all screen sizes'
    ]
  }
];

// Helper function to log test results
export const logTestResult = (testName, passed, details = '') => {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${testName}${details ? ` - ${details}` : ''}`);
};
