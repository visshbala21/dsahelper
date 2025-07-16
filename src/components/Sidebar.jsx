import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, GitBranch, BookOpen } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const algorithms = [
    { name: 'Bubble Sort', path: '/algorithms/bubble-sort' },
    { name: 'Quick Sort', path: '/algorithms/quick-sort' },
    { name: 'Merge Sort', path: '/algorithms/merge-sort' },
    { name: 'BFS', path: '/algorithms/bfs' },
    { name: 'DFS', path: '/algorithms/dfs' },
  ]

  const dataStructures = [
    { name: 'Array', path: '/data-structures/array' },
    { name: 'Linked List', path: '/data-structures/linked-list' },
    { name: 'Stack', path: '/data-structures/stack' },
    { name: 'Queue', path: '/data-structures/queue' },
    { name: 'Binary Tree', path: '/data-structures/binary-tree' },
    { name: 'Graph', path: '/data-structures/graph' },
  ]

  const practiceTopics = [
    { name: 'Sorting Algorithms', path: '/practice/sorting' },
    { name: 'Graph Algorithms', path: '/practice/graphs' },
    { name: 'Data Structures', path: '/practice/data-structures' },
  ]

  const SidebarSection = ({ title, items, icon: Icon }) => (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <SidebarSection
          title="Algorithms"
          items={algorithms}
          icon={BarChart3}
        />
        <SidebarSection
          title="Data Structures"
          items={dataStructures}
          icon={GitBranch}
        />
        <SidebarSection
          title="Practice"
          items={practiceTopics}
          icon={BookOpen}
        />
      </div>
    </aside>
  )
}

export default Sidebar