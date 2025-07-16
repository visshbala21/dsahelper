export const quizData = {
  sorting: {
    title: 'Sorting Algorithms',
    questions: [
      {
        id: 1,
        question: 'What is the worst-case time complexity of Bubble Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
        correct: 2,
        explanation: 'Bubble Sort has a worst-case time complexity of O(n²) because it uses nested loops to compare and swap adjacent elements.'
      },
      {
        id: 2,
        question: 'Which sorting algorithm is most efficient for small datasets?',
        options: ['Merge Sort', 'Quick Sort', 'Insertion Sort', 'Heap Sort'],
        correct: 2,
        explanation: 'Insertion Sort is most efficient for small datasets due to its low overhead and good performance on nearly sorted arrays.'
      },
      {
        id: 3,
        question: 'What is the space complexity of Merge Sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 2,
        explanation: 'Merge Sort requires O(n) additional space to store the temporary arrays used during the merge process.'
      },
      {
        id: 4,
        question: 'Which sorting algorithm is stable?',
        options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
        correct: 2,
        explanation: 'Merge Sort is stable because it maintains the relative order of equal elements during the sorting process.'
      },
      {
        id: 5,
        question: 'What is the average-case time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correct: 1,
        explanation: 'Quick Sort has an average-case time complexity of O(n log n) when the pivot divides the array into roughly equal halves.'
      }
    ]
  },
  graphs: {
    title: 'Graph Algorithms',
    questions: [
      {
        id: 1,
        question: 'What data structure does BFS use internally?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Array'],
        correct: 1,
        explanation: 'BFS uses a queue to maintain the order of vertices to be explored, ensuring level-by-level traversal.'
      },
      {
        id: 2,
        question: 'What is the time complexity of DFS?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
        correct: 2,
        explanation: 'DFS has a time complexity of O(V + E) where V is the number of vertices and E is the number of edges.'
      },
      {
        id: 3,
        question: 'Which algorithm is better for finding the shortest path in an unweighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Floyd-Warshall'],
        correct: 1,
        explanation: 'BFS is optimal for finding the shortest path in unweighted graphs because it explores nodes level by level.'
      },
      {
        id: 4,
        question: 'What is the space complexity of DFS using recursion?',
        options: ['O(1)', 'O(V)', 'O(E)', 'O(V + E)'],
        correct: 1,
        explanation: 'Recursive DFS has a space complexity of O(V) due to the call stack that can grow up to the depth of the graph.'
      },
      {
        id: 5,
        question: 'Which traversal method does DFS follow?',
        options: ['Level-order', 'Breadth-first', 'Depth-first', 'Random'],
        correct: 2,
        explanation: 'DFS follows depth-first traversal, exploring as far as possible along each branch before backtracking.'
      }
    ]
  },
  'data-structures': {
    title: 'Data Structures',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 0,
        explanation: 'Array access by index is O(1) because arrays store elements in contiguous memory locations.'
      },
      {
        id: 2,
        question: 'What is the main advantage of a linked list over an array?',
        options: ['Faster access', 'Less memory usage', 'Dynamic size', 'Better cache locality'],
        correct: 2,
        explanation: 'Linked lists have dynamic size and can grow or shrink during runtime, unlike arrays with fixed size.'
      },
      {
        id: 3,
        question: 'In a binary search tree, what is the average time complexity for search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct: 1,
        explanation: 'In a balanced BST, search operations take O(log n) time because we can eliminate half of the remaining nodes at each step.'
      },
      {
        id: 4,
        question: 'What is the worst-case time complexity for insertion in a linked list?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 0,
        explanation: 'Insertion in a linked list is O(1) if you have a reference to the node where you want to insert.'
      },
      {
        id: 5,
        question: 'Which data structure follows LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correct: 1,
        explanation: 'Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed.'
      }
    ]
  }
}