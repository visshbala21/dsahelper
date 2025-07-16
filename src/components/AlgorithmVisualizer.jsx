import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { algorithmData } from '../data/algorithms'

const AlgorithmVisualizer = () => {
  const { algorithm } = useParams()
  const [array, setArray] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [comparing, setComparing] = useState([])
  const [sorted, setSorted] = useState([])
  const intervalRef = useRef(null)

  const data = algorithmData[algorithm]

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => 
      Math.floor(Math.random() * 300) + 10
    )
    setArray(newArray)
    setComparing([])
    setSorted([])
    setIsPlaying(false)
  }

  useEffect(() => {
    generateArray()
  }, [algorithm])

  // Bubble Sort Animation
  const bubbleSort = async () => {
    const arr = [...array]
    const n = arr.length
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isPlaying) return
        
        setComparing([j, j + 1])
        await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9))
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
        }
      }
      setSorted(prev => [...prev, n - i - 1])
    }
    setComparing([])
    setSorted(Array.from({ length: n }, (_, i) => i))
    setIsPlaying(false)
  }

  // Quick Sort Animation (simplified for visualization)
  const quickSort = async () => {
    const arr = [...array]
    await quickSortHelper(arr, 0, arr.length - 1)
    setSorted(Array.from({ length: arr.length }, (_, i) => i))
    setIsPlaying(false)
  }

  const quickSortHelper = async (arr, low, high) => {
    if (low < high && isPlaying) {
      const pi = await partition(arr, low, high)
      await quickSortHelper(arr, low, pi - 1)
      await quickSortHelper(arr, pi + 1, high)
    }
  }

  const partition = async (arr, low, high) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      if (!isPlaying) return i + 1
      
      setComparing([j, high])
      await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9))
      
      if (arr[j] <= pivot) {
        i++
        [arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    return i + 1
  }

  const startVisualization = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    setIsPlaying(true)
    
    switch (algorithm) {
      case 'bubble-sort':
        bubbleSort()
        break
      case 'quick-sort':
        quickSort()
        break
      case 'merge-sort':
        // Simplified merge sort visualization
        bubbleSort() // Using bubble sort for demo
        break
      default:
        setIsPlaying(false)
    }
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Algorithm not found
        </h2>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="card p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {data.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
            Time: {data.timeComplexity}
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
            Space: {data.spaceComplexity}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={startVisualization}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isPlaying ? 'Pause' : 'Start'}</span>
          </button>
          
          <button
            onClick={generateArray}
            className="btn-secondary flex items-center space-x-2"
            disabled={isPlaying}
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>

          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <label className="text-sm text-gray-600 dark:text-gray-400">Speed:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
              disabled={isPlaying}
            />
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="card p-6">
        <div className="flex items-end justify-center space-x-1 h-80">
          {array.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                comparing.includes(index)
                  ? 'bg-red-500'
                  : sorted.includes(index)
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}
              style={{
                height: `${value}px`,
                width: `${Math.max(800 / array.length - 2, 8)}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Code and Explanation */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Python Implementation
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-gray-800 dark:text-gray-200">
              {data.code}
            </code>
          </pre>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How it Works
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {data.explanation}
          </p>
          
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">Legend:</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-300">Unsorted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-300">Comparing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-300">Sorted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmVisualizer