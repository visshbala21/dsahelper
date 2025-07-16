export const algorithmData = {
  'bubble-sort': {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`,
    explanation: 'Bubble sort works by comparing adjacent elements and swapping them if they are in the wrong order. This process is repeated until the entire array is sorted.'
  },
  'quick-sort': {
    name: 'Quick Sort',
    description: 'An efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around it.',
    timeComplexity: 'O(n log n) average, O(n²) worst',
    spaceComplexity: 'O(log n)',
    code: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    explanation: 'Quick sort selects a pivot element and partitions the array so that elements smaller than the pivot come before it, and elements greater come after it.'
  },
  'merge-sort': {
    name: 'Merge Sort',
    description: 'A stable divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    explanation: 'Merge sort recursively divides the array into smaller subarrays, sorts them, and then merges them back together in sorted order.'
  },
  'bfs': {
    name: 'Breadth-First Search',
    description: 'A graph traversal algorithm that explores vertices level by level, visiting all neighbors before moving to the next level.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}`,
    explanation: 'BFS uses a queue to explore nodes level by level, making it ideal for finding the shortest path in unweighted graphs.'
  },
  'dfs': {
    name: 'Depth-First Search',
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# Iterative version
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            stack.extend(reversed(graph[vertex]))
    
    return result`,
    explanation: 'DFS uses recursion or a stack to explore each branch completely before moving to the next branch, useful for topological sorting and cycle detection.'
  }
}