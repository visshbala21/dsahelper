import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Minus, Search, RotateCcw } from 'lucide-react'

const DSVisualizer = () => {
  const { structure } = useParams()
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState('')

  // Array State
  const [array, setArray] = useState([10, 20, 30, 40, 50])
  
  // Linked List State
  const [linkedList, setLinkedList] = useState([
    { value: 10, id: 1 },
    { value: 20, id: 2 },
    { value: 30, id: 3 }
  ])
  
  // Binary Tree State
  const [binaryTree, setBinaryTree] = useState({
    value: 50,
    left: { value: 30, left: { value: 20 }, right: { value: 40 } },
    right: { value: 70, left: { value: 60 }, right: { value: 80 } }
  })

  // Stack State
  const [stack, setStack] = useState([10, 20, 30, 40])
  
  // Queue State
  const [queue, setQueue] = useState([10, 20, 30, 40])
  
  // Graph State
  const [graph, setGraph] = useState({
    nodes: [
      { id: 'A', x: 150, y: 100 },
      { id: 'B', x: 100, y: 200 },
      { id: 'C', x: 200, y: 200 },
      { id: 'D', x: 150, y: 300 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' }
    ]
  })

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // Array Operations
  const insertArray = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    setArray([...array, value])
    setInputValue('')
    showMessage(`Inserted ${value} at the end`)
  }

  const deleteArray = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    const index = array.indexOf(value)
    if (index !== -1) {
      const newArray = array.filter((_, i) => i !== index)
      setArray(newArray)
      showMessage(`Deleted ${value} from array`)
    } else {
      showMessage(`${value} not found in array`)
    }
    setInputValue('')
  }

  const searchArray = () => {
    const value = parseInt(searchValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    const index = array.indexOf(value)
    if (index !== -1) {
      showMessage(`Found ${value} at index ${index}`)
    } else {
      showMessage(`${value} not found in array`)
    }
    setSearchValue('')
  }

  // Linked List Operations
  const appendLinkedList = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    const newNode = { value, id: Date.now() }
    setLinkedList([...linkedList, newNode])
    setInputValue('')
    showMessage(`Appended ${value} to linked list`)
  }

  const deleteLinkedList = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    const newList = linkedList.filter(node => node.value !== value)
    if (newList.length < linkedList.length) {
      setLinkedList(newList)
      showMessage(`Deleted ${value} from linked list`)
    } else {
      showMessage(`${value} not found in linked list`)
    }
    setInputValue('')
  }

  // Binary Tree Operations
  const insertBinaryTree = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    
    const insertNode = (node, value) => {
      if (!node) return { value }
      
      if (value < node.value) {
        return { ...node, left: insertNode(node.left, value) }
      } else {
        return { ...node, right: insertNode(node.right, value) }
      }
    }
    
    setBinaryTree(insertNode(binaryTree, value))
    setInputValue('')
    showMessage(`Inserted ${value} into binary tree`)
  }

  const resetStructure = () => {
    switch (structure) {
      case 'array':
        setArray([10, 20, 30, 40, 50])
        break
      case 'linked-list':
        setLinkedList([
          { value: 10, id: 1 },
          { value: 20, id: 2 },
          { value: 30, id: 3 }
        ])
        break
      case 'binary-tree':
        setBinaryTree({
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        })
        break
    }
    showMessage('Structure reset to default')
  }

  const renderArray = () => (
    <div className="flex items-center justify-center space-x-2 py-8">
      {array.map((value, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            {value}
          </div>
          <div className="text-xs text-gray-500 mt-1">[{index}]</div>
        </div>
      ))}
    </div>
  )

  const renderLinkedList = () => (
    <div className="flex items-center justify-center space-x-4 py-8 overflow-x-auto">
      {linkedList.map((node, index) => (
        <div key={node.id} className="flex items-center">
          <div className="bg-green-500 text-white rounded-lg p-4 flex flex-col items-center">
            <div className="font-bold text-lg">{node.value}</div>
            <div className="text-xs">Node {index + 1}</div>
          </div>
          {index < linkedList.length - 1 && (
            <div className="text-2xl text-gray-400 mx-2">→</div>
          )}
        </div>
      ))}
      <div className="text-2xl text-gray-400 mx-2">→ NULL</div>
    </div>
  )

  const renderBinaryTree = () => {
    const TreeNode = ({ node, level = 0 }) => {
      if (!node) return null
      
      return (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
            {node.value}
          </div>
          {(node.left || node.right) && (
            <div className="flex space-x-8 mt-4">
              <div className="flex flex-col items-center">
                {node.left && <TreeNode node={node.left} level={level + 1} />}
              </div>
              <div className="flex flex-col items-center">
                {node.right && <TreeNode node={node.right} level={level + 1} />}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="flex justify-center py-8">
        <TreeNode node={binaryTree} />
      </div>
    )
  }

  const getStructureInfo = () => {
    switch (structure) {
      case 'array':
        return {
          title: 'Array',
          description: 'A collection of elements stored in contiguous memory locations',
          operations: ['Insert', 'Delete', 'Search'],
          complexity: 'Access: O(1), Search: O(n), Insert/Delete: O(n)'
        }
      case 'linked-list':
        return {
          title: 'Linked List',
          description: 'A linear data structure where elements are stored in nodes with pointers',
          operations: ['Append', 'Delete'],
          complexity: 'Access: O(n), Search: O(n), Insert/Delete: O(1)'
        }
      case 'binary-tree':
        return {
          title: 'Binary Tree',
          description: 'A hierarchical data structure with at most two children per node',
          operations: ['Insert'],
          complexity: 'Search/Insert/Delete: O(log n) average, O(n) worst'
        }
      default:
        return null
    }
  }

  const info = getStructureInfo()
  if (!info) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Data Structure not found
        </h2>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="card p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {info.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {info.description}
        </p>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full inline-block text-sm">
          {info.complexity}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
          {message}
        </div>
      )}

      {/* Controls */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          
          {structure === 'array' && (
            <>
              <button onClick={insertArray} className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Insert</span>
              </button>
              <button onClick={deleteArray} className="btn-secondary flex items-center space-x-2">
                <Minus className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search value"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button onClick={searchArray} className="btn-secondary flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </>
          )}
          
          {structure === 'linked-list' && (
            <>
              <button onClick={appendLinkedList} className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Append</span>
              </button>
              <button onClick={deleteLinkedList} className="btn-secondary flex items-center space-x-2">
                <Minus className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </>
          )}
          
          {structure === 'binary-tree' && (
            <button onClick={insertBinaryTree} className="btn-primary flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Insert</span>
            </button>
          )}
          
          <button onClick={resetStructure} className="btn-secondary flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="card p-6 min-h-96">
        {structure === 'array' && renderArray()}
        {structure === 'linked-list' && renderLinkedList()}
        {structure === 'binary-tree' && renderBinaryTree()}
      </div>

      {/* Operations Guide */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Available Operations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {info.operations.map((operation, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {operation}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {operation === 'Insert' && 'Add a new element to the structure'}
                {operation === 'Delete' && 'Remove an element from the structure'}
                {operation === 'Search' && 'Find an element in the structure'}
                {operation === 'Append' && 'Add a new node at the end of the list'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DSVisualizer