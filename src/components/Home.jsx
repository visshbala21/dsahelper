import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, GitBranch, BookOpen, Play } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Algorithm Visualizer',
      description: 'Watch sorting and graph algorithms come to life with interactive animations',
      link: '/algorithms/bubble-sort',
      color: 'bg-blue-500'
    },
    {
      icon: GitBranch,
      title: 'Data Structures',
      description: 'Explore arrays, linked lists, and binary trees with hands-on operations',
      link: '/data-structures/array',
      color: 'bg-green-500'
    },
    {
      icon: BookOpen,
      title: 'Practice Mode',
      description: 'Test your knowledge with interactive quizzes and challenges',
      link: '/practice/sorting',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Master Data Structures & Algorithms
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn through interactive visualizations, hands-on practice, and comprehensive explanations. 
          Perfect for students, developers, and anyone preparing for technical interviews.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Choose a topic from the sidebar to begin your journey into data structures and algorithms.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/algorithms/bubble-sort" className="btn-primary flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Start with Algorithms</span>
          </Link>
          <Link to="/data-structures/array" className="btn-secondary flex items-center space-x-2">
            <GitBranch className="h-4 w-4" />
            <span>Explore Data Structures</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home