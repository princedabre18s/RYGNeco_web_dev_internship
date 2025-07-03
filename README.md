# Personal Task Tracker

A modern, responsive task management application built with React.js featuring all core and bonus requirements from the RYGNeco Web Development Internship Assignment.

## 📝 Description

This is a comprehensive personal task tracker that allows users to manage their daily tasks efficiently. Built with React.js, it demonstrates modern frontend development practices with clean component architecture, responsive design, and excellent user experience.

## ✨ Features

### Core Features
- ✅ **Simple Login**: Username-based authentication with localStorage persistence
- ✅ **Task Management**: Add, edit (inline), delete, and toggle task completion  
- ✅ **Task Display**: Shows title, description, completion status, and creation date/time
- ✅ **Task Filtering**: Filter by All/Completed/Pending with task counts
- ✅ **Data Persistence**: All data saved to localStorage, persists after refresh
- ✅ **Responsive Design**: Works seamlessly on mobile and desktop devices

### Bonus Features (All Implemented!)
- 🔍 **Search Functionality**: Search tasks by title, description, category, or tags
- ⚡ **Task Priority Levels**: High/Medium/Low priority with color coding and smart sorting
- 📅 **Due Dates**: Set due dates with intelligent alerts (overdue, today, tomorrow, soon, future)
- ✨ **Smooth Animations**: CSS transitions and hover effects throughout the app
- 🌙 **Dark Mode**: Toggle between light and dark themes with persistence
- 🏷️ **Categories & Tags**: Organize tasks with predefined categories and custom tags

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/princedabre18s/RYGNeco_web_dev_internship.git
   cd RYGNeco_web_dev_internship
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Enter any username (minimum 2 characters) to get started!

## 🛠️ Technologies Used

- **React.js** (v18.2.0) - Frontend framework with functional components and hooks
- **CSS3** - Modern styling with flexbox, animations, and responsive design
- **localStorage API** - Client-side data persistence
- **ES6+** - Modern JavaScript features

## 🌟 Live Demo

**🚀 [LIVE DEMO: https://rygneco-web-dev-internship.onrender.com](https://rygneco-web-dev-internship.onrender.com)**

*Experience the legendary task tracker in action! The app features a beautiful portfolio-inspired design with all core and bonus features implemented.*

## 📸 Screenshots

[Screenshots will be added after deployment showing both light and dark modes]

## 🎯 Assignment Compliance

This project fulfills all requirements specified in the internship assignment:

- ✅ React functional components with hooks
- ✅ Responsive design (mobile + desktop)  
- ✅ Clean, readable code with proper component structure
- ✅ Basic styling using CSS
- ✅ No external state management libraries
- ✅ All core features implemented
- ✅ All bonus features implemented
- ✅ Proper project structure
- ✅ Data persistence with localStorage
- ✅ Task filtering and search functionality

## 📦 Project Structure

```
task-tracker/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   ├── TaskList.js
│   │   ├── TaskFilter.js
│   │   ├── TaskSearch.js
│   │   └── DarkModeToggle.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── testHelpers.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── README.md
├── DEPLOYMENT.md
└── package.json
```

---

**Assignment Submission for RYGNeco Web Development Internship**  
*Estimated Development Time: 6+ hours (including all bonus features)*  
*Built with ❤️ using React.js*
