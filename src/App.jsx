import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AlgorithmVisualizer from './components/AlgorithmVisualizer'
import DSVisualizer from './components/DSVisualizer'
import PracticeMode from './components/PracticeMode'
import Home from './components/Home'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/algorithms/:algorithm" element={<AlgorithmVisualizer />} />
                <Route path="/data-structures/:structure" element={<DSVisualizer />} />
                <Route path="/practice/:topic" element={<PracticeMode />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App