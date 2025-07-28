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

  // Stack Operations
  const pushStack = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    setStack([...stack, value])
    setInputValue('')
    showMessage(`Pushed ${value} onto stack`)
  }

  const popStack = () => {
    if (stack.length === 0) {
      showMessage('Stack is empty')
      return
    }
    const poppedValue = stack[stack.length - 1]
    setStack(stack.slice(0, -1))
    showMessage(`Popped ${poppedValue} from stack`)
  }

  // Queue Operations
  const enqueue = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      showMessage('Please enter a valid number')
      return
    }
    setQueue([...queue, value])
    setInputValue('')
    showMessage(`Enqueued ${value} to queue`)
  }

  const dequeue = () => {
    if (queue.length === 0) {
      showMessage('Queue is empty')
      return
    }
    const dequeuedValue = queue[0]
    setQueue(queue.slice(1))
    showMessage(`Dequeued ${dequeuedValue} from queue`)
  }

  // Graph Operations
  const addNode = () => {
    const nodeId = inputValue.toUpperCase()
    if (!nodeId || nodeId.length !== 1) {
      showMessage('Please enter a single letter for node ID')
      return
    }
    
    if (graph.nodes.find(node => node.id === nodeId)) {
      showMessage(`Node ${nodeId} already exists`)
      return
    }

    const newNode = {
      id: nodeId,
      x: 150 + Math.random() * 200,
      y: 150 + Math.random() * 200
    }

    setGraph({
      ...graph,
      nodes: [...graph.nodes, newNode]
    })
    setInputValue('')
    showMessage(`Added node ${nodeId} to graph`)
  }

  const addEdge = () => {
    const [from, to] = inputValue.toUpperCase().split('-')
    if (!from || !to || from.length !== 1 || to.length !== 1) {
      showMessage('Please enter edge in format: A-B')
      return
    }

    const fromExists = graph.nodes.find(node => node.id === from)
    const toExists = graph.nodes.find(node => node.id === to)

    if (!fromExists || !toExists) {
      showMessage('Both nodes must exist before adding edge')
      return
    }

    const edgeExists = graph.edges.find(edge => 
      (edge.from === from && edge.to === to) || 
      (edge.from === to && edge.to === from)
    )

    if (edgeExists) {
      showMessage(`Edge ${from}-${to} already exists`)
      return
    }

    setGraph({
      ...graph,
      edges: [...graph.edges, { from, to }]
    })
    setInputValue('')
    showMessage(`Added edge ${from}-${to} to graph`)
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
      case 'stack':
        setStack([10, 20, 30, 40])
        break
      case 'queue':
        setQueue([10, 20, 30, 40])
        break
      case 'binary-tree':
        setBinaryTree({
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        })
        break
      case 'graph':
        setGraph({
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

  const renderStack = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Top of Stack ↓
      </div>
      <div className="flex flex-col-reverse space-y-reverse space-y-2">
        {stack.map((value, index) => (
          <div
            key={index}
            className={`w-24 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
              index === stack.length - 1 ? 'border-orange-300 shadow-lg' : 'border-orange-600'
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      {stack.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 italic">Stack is empty</div>
      )}
    </div>
  )

  const renderQueue = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex justify-between w-full max-w-md mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span>← Front (Dequeue)</span>
        <span>Rear (Enqueue) →</span>
      </div>
      <div className="flex items-center space-x-2">
        {queue.map((value, index) => (
          <div
            key={index}
            className={`w-16 h-16 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
              index === 0 ? 'border-teal-300 shadow-lg' : 'border-teal-600'
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      {queue.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 italic mt-4">Queue is empty</div>
      )}
    </div>
  )

  const renderGraph = () => (
    <div className="flex justify-center py-8">
      <svg width="400" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg">
        {/* Render edges */}
        {graph.edges.map((edge, index) => {
          const fromNode = graph.nodes.find(node => node.id === edge.from)
          const toNode = graph.nodes.find(node => node.id === edge.to)
          if (!fromNode || !toNode) return null
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#6B7280"
              strokeWidth="2"
            />
          )
        })}
        
        {/* Render nodes */}
        {graph.nodes.map((node, index) => (
          <g key={index}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill="#8B5CF6"
              stroke="#7C3AED"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )

  const renderBinaryTree = () => {
    // Calculate positions for nodes
    const calculatePositions = (node, x = 400, y = 60, level = 0) => {
      if (!node) return []
      
      const positions = [{ ...node, x, y, level }]
      const horizontalSpacing = Math.max(120 / (level + 1), 60)
      
      if (node.left) {
        positions.push(...calculatePositions(node.left, x - horizontalSpacing, y + 80, level + 1))
      }
      if (node.right) {
        positions.push(...calculatePositions(node.right, x + horizontalSpacing, y + 80, level + 1))
      }
      
      return positions
    }

    const positions = calculatePositions(binaryTree)
    
    // Generate edges between parent and child nodes
    const generateEdges = (node, parentX, parentY) => {
      if (!node) return []
      
      const edges = []
      const currentPos = positions.find(p => p.value === node.value && p.x && p.y)
      
      if (node.left) {
        const leftPos = positions.find(p => p.value === node.left.value)
        if (leftPos && currentPos) {
          edges.push({
            x1: currentPos.x,
            y1: currentPos.y + 24, // Offset for node radius
            x2: leftPos.x,
            y2: leftPos.y - 24
          })
        }
        edges.push(...generateEdges(node.left, leftPos?.x, leftPos?.y))
      }
      
      if (node.right) {
        const rightPos = positions.find(p => p.value === node.right.value)
        if (rightPos && currentPos) {
          edges.push({
            x1: currentPos.x,
            y1: currentPos.y + 24,
            x2: rightPos.x,
            y2: rightPos.y - 24
          })
        }
        edges.push(...generateEdges(node.right, rightPos?.x, rightPos?.y))
      }
      
      return edges
    }

    const edges = generateEdges(binaryTree)

    return (
      <div className="flex justify-center py-8">
        <svg width="800" height="400" className="overflow-visible">
          {/* Render connecting lines */}
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="#6B7280"
              strokeWidth="2"
              className="dark:stroke-gray-400"
            />
          ))}
          
          {/* Render nodes */}
          {positions.map((pos, index) => (
            <g key={index}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="24"
                fill="#8B5CF6"
                stroke="#7C3AED"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dy="0.35em"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {pos.value}
              </text>
            </g>
          ))}
        </svg>
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
      case 'stack':
        return {
          title: 'Stack',
          description: 'A LIFO (Last In First Out) data structure where elements are added and removed from the top',
          operations: ['Push', 'Pop'],
          complexity: 'Push/Pop: O(1), Search: O(n)'
        }
      case 'queue':
        return {
          title: 'Queue',
          description: 'A FIFO (First In First Out) data structure where elements are added at rear and removed from front',
          operations: ['Enqueue', 'Dequeue'],
          complexity: 'Enqueue/Dequeue: O(1), Search: O(n)'
        }
      case 'binary-tree':
        return {
          title: 'Binary Tree',
          description: 'A hierarchical data structure with at most two children per node',
          operations: ['Insert'],
          complexity: 'Search/Insert/Delete: O(log n) average, O(n) worst'
        }
      case 'graph':
        return {
          title: 'Graph',
          description: 'A collection of nodes (vertices) connected by edges, representing relationships',
          operations: ['Add Node', 'Add Edge'],
          complexity: 'Add Vertex: O(1), Add Edge: O(1), Search: O(V + E)'
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
          
          {structure === 'stack' && (
            <>
              <button onClick={pushStack} className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Push</span>
              </button>
              <button onClick={popStack} className="btn-secondary flex items-center space-x-2">
                <Minus className="h-4 w-4" />
                <span>Pop</span>
              </button>
            </>
          )}
          
          {structure === 'queue' && (
            <>
              <button onClick={enqueue} className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Enqueue</span>
              </button>
              <button onClick={dequeue} className="btn-secondary flex items-center space-x-2">
                <Minus className="h-4 w-4" />
                <span>Dequeue</span>
              </button>
            </>
          )}
          
          {structure === 'binary-tree' && (
            <button onClick={insertBinaryTree} className="btn-primary flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Insert</span>
            </button>
          )}
          
          {structure === 'graph' && (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Node ID (A) or Edge (A-B)"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button onClick={addNode} className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Node</span>
              </button>
              <button onClick={addEdge} className="btn-secondary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Edge</span>
              </button>
            </>
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
        {structure === 'stack' && renderStack()}
        {structure === 'queue' && renderQueue()}
        {structure === 'binary-tree' && renderBinaryTree()}
        {structure === 'graph' && renderGraph()}
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
                {operation === 'Push' && 'Add an element to the top of the stack'}
                {operation === 'Pop' && 'Remove and return the top element from the stack'}
                {operation === 'Enqueue' && 'Add an element to the rear of the queue'}
                {operation === 'Dequeue' && 'Remove and return the front element from the queue'}
                {operation === 'Add Node' && 'Add a new vertex to the graph'}
                {operation === 'Add Edge' && 'Create a connection between two vertices'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DSVisualizer