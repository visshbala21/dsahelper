import React from 'react'
import { Moon, Sun, Code } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            DSA Visualizer
          </h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header