# Deployment Guide

This guide provides step-by-step instructions for deploying the Task Tracker application to various hosting platforms.

## 📋 Requirements

### System Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Git**: Latest version for repository management

### Dependencies (from package.json)
```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0", 
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

### Build Requirements
- Memory: Minimum 1GB RAM for build process
- Storage: ~200MB for node_modules, ~10MB for build output
- Browser Support: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)

## Prerequisites

- Node.js installed (v14 or higher)
- Git repository set up
- Application tested locally
- GitHub account for repository hosting

## 🚀 GitHub Pages Deployment

### Method 1: Using gh-pages package

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/task-tracker"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Method 2: Using GitHub Actions

1. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '16'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

2. **Enable GitHub Pages in repository settings**

## 🌐 Netlify Deployment

### Method 1: Git Integration

1. **Connect repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider and repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 16 (in environment variables)

3. **Deploy**
   - Click "Deploy site"

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

## 🎨 Render Deployment (Recommended)

Render is a modern cloud platform that's perfect for React applications with free tier support.

### Step-by-step Render Deployment

1. **Push your code to GitHub** (make sure .gitignore is working)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete task tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Create Render account**
   - Go to [render.com](https://render.com)
   - Sign up using your GitHub account

3. **Create new Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Select your task-tracker repository

4. **Configure build settings**
   ```
   Name: task-tracker (or your preferred name)
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm run build
   Publish Directory: build
   ```

5. **Advanced Settings** (if needed)
   ```
   Node Version: 16 (or latest LTS)
   Environment Variables: (none needed for this project)
   ```

6. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your app
   - You'll get a URL like: `https://your-app-name.onrender.com`

### Render Configuration File (Optional)

Create `render.yaml` in your project root for advanced configuration:

```yaml
services:
  - type: web
    name: task-tracker
    env: static
    buildCommand: npm run build
    staticPublishPath: ./build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Render Advantages
- ✅ **Free tier available** (perfect for this project)
- ✅ **Automatic deployments** on every git push
- ✅ **Custom domains** supported
- ✅ **HTTPS by default**
- ✅ **Fast global CDN**
- ✅ **Easy to use dashboard**

## ⚡ Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Method 2: Git Integration

1. **Connect repository to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your Git repository

2. **Configure (usually auto-detected)**
   - Framework: Create React App
   - Build command: `npm run build`
   - Output directory: `build`

## 🔧 Environment Configuration

### For Production Builds

1. **Optimize bundle size**
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```

2. **Environment variables (if needed)**
   Create `.env.production`:
   ```
   REACT_APP_VERSION=$npm_package_version
   REACT_APP_NAME=$npm_package_name
   ```

### Performance Optimizations

1. **Enable service worker (optional)**
   - Uncomment service worker registration in `src/index.js`

2. **Add meta tags for SEO**
   Update `public/index.html`:
   ```html
   <meta name="description" content="Personal Task Tracker - Manage your tasks efficiently">
   <meta name="keywords" content="task tracker, todo, productivity, react">
   <meta property="og:title" content="Task Tracker">
   <meta property="og:description" content="Personal Task Tracker Application">
   ```

## 🔍 Pre-deployment Checklist

- [ ] All features tested and working
- [ ] No console errors in production build
- [ ] Responsive design verified on multiple devices
- [ ] localStorage functionality tested
- [ ] All forms validated properly
- [ ] Error handling implemented
- [ ] README.md updated with live demo URL
- [ ] Screenshots added to repository

## 🛠️ Troubleshooting

### Common Issues

1. **Build fails with memory errors**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=8192"
   npm run build
   ```

2. **Routing issues on deployment**
   - Add `_redirects` file in `public/` folder:
     ```
     /*    /index.html   200
     ```

3. **Environment variable not working**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after adding variables

4. **White screen after deployment**
   - Check browser console for errors
   - Verify `homepage` field in `package.json`
   - Check file paths are correct

## 📊 Monitoring

### Analytics (Optional)

1. **Google Analytics**
   ```bash
   npm install gtag
   ```

2. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

### Performance Monitoring

1. **Lighthouse scores**
   - Run lighthouse audit before deployment
   - Aim for scores above 90 in all categories

2. **Bundle size analysis**
   ```bash
   npm install -g webpack-bundle-analyzer
   npm run build
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

## 🔄 Continuous Deployment

Set up automatic deployments on every push to main branch:

1. **GitHub Actions** (for GitHub Pages)
2. **Netlify** (automatic with Git integration)
3. **Vercel** (automatic with Git integration)

## 📱 PWA Deployment (Bonus)

To enable PWA features:

1. **Uncomment service worker registration**
2. **Test PWA features**
   - Install prompt
   - Offline functionality
   - App-like experience

## 🎉 Post-deployment

1. **Update README.md** with live demo URL
2. **Test all functionality** on live site
3. **Share your project** on social media
4. **Monitor** for any issues

Remember to update your README.md file with the actual deployment URL once your site is live!
