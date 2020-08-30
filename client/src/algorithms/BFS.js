export function BFS(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // startNode.distance = 0;
  const unvisitedNodes = [];
  unvisitedNodes[0] = startNode;
  while (!!unvisitedNodes.length) {
    const closestNode = unvisitedNodes.shift();
    closestNode.isVisited = true;

    if (closestNode.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.isWall) continue;
      neighbor.isVisited = true;
      visitedNodesInOrder.push(neighbor);
      unvisitedNodes.push(neighbor);
      neighbor.previousNode = closestNode;
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder_bfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    console.log(currentNode.row, currentNode.col);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
