<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Task Tracker Project Instructions

This is a React.js personal task tracker application with the following key features:

## Project Structure
- **Components**: Login, TaskForm, TaskItem, TaskList, TaskFilter
- **Utils**: storage.js for localStorage operations
- **Styling**: CSS with responsive design and modern UI

## Key Features
- User login with validation
- Task CRUD operations (Create, Read, Update, Delete)
- Task filtering (All, Completed, Pending)
- localStorage persistence
- Responsive design
- Input validation and error handling

## Development Guidelines
- Use React functional components and hooks
- Handle edge cases (empty task lists, invalid inputs, localStorage errors)
- Follow accessibility best practices
- Maintain clean, readable code
- Use semantic HTML and proper ARIA labels

## Sample Data
The app includes sample tasks for testing:
- "Complete React assignment" (pending)
- "Review JavaScript concepts" (completed)

## Testing Focus Areas
- Login validation (valid/invalid inputs, persistence)
- Task CRUD operations with sample data
- Filtering functionality and edge cases
- localStorage persistence across page refreshes
