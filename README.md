# DSA Visualizer

A comprehensive web application for learning Data Structures and Algorithms through interactive visualizations, hands-on practice, and detailed explanations.

## 🚀 Features

### Algorithm Visualizer
- **Sorting Algorithms**: Bubble Sort, Quick Sort, Merge Sort with animated visualizations
- **Graph Algorithms**: BFS and DFS with step-by-step execution
- **Interactive Controls**: Play/pause, speed adjustment, and reset functionality
- **Code Examples**: Python implementations with syntax highlighting
- **Complexity Analysis**: Time and space complexity information

### Data Structure Explorer
- **Array Operations**: Insert, delete, and search with visual feedback
- **Linked List**: Append, insert, and delete nodes with pointer visualization
- **Binary Tree**: Insert nodes with automatic tree structure updates
- **Interactive Operations**: Real-time manipulation with immediate visual feedback

### Practice Mode
- **Topic-based Quizzes**: Sorting algorithms, graph algorithms, and data structures
- **Immediate Feedback**: Instant results with detailed explanations
- **Progress Tracking**: Score tracking and performance analytics
- **Review System**: Comprehensive answer review after quiz completion

### Additional Features
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS
- **Fast Performance**: Built with Vite for optimal loading speeds

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router DOM for navigation
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Deployment**: Vercel-ready configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AlgorithmVisualizer.jsx    # Algorithm visualization component
│   ├── DSVisualizer.jsx           # Data structure visualization
│   ├── PracticeMode.jsx           # Quiz and practice component
│   ├── Header.jsx                 # App header with theme toggle
│   ├── Sidebar.jsx                # Navigation sidebar
│   └── Home.jsx                   # Landing page component
├── contexts/            # React contexts
│   └── ThemeContext.jsx           # Theme management
├── data/               # Static data files
│   ├── algorithms.js              # Algorithm information and code
│   └── questions.js               # Quiz questions and answers
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Alternative: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push to main branch

### Build Configuration

The project includes a `vercel.json` configuration file for optimal deployment settings.

## 🎨 Customization

### Adding New Algorithms

1. Add algorithm data to `src/data/algorithms.js`
2. Implement visualization logic in `AlgorithmVisualizer.jsx`
3. Add navigation link in `Sidebar.jsx`

### Adding New Data Structures

1. Implement visualization in `DSVisualizer.jsx`
2. Add operations and rendering logic
3. Update sidebar navigation

### Adding Quiz Questions

1. Add questions to `src/data/questions.js`
2. Follow the existing question format
3. Include explanations for better learning

## 🎯 Learning Objectives

This application helps users:
- Understand algorithm behavior through visual representation
- Practice data structure operations interactively
- Test knowledge through comprehensive quizzes
- Learn time and space complexity concepts
- Prepare for technical interviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the need for interactive learning tools
- Designed for students and developers preparing for technical interviews

---

**Happy Learning! 🎓**