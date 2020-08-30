const visitedNodesInOrder = [];

export function DFS(grid, startNode, finishNode) {
  startNode.distance = 0;
  // const unvisitedNodes = getAllNodes(grid);
  const closestNode = startNode;
  // const getneighbour = [];
  // getneighbour[0] = startNode;
  // console.log(finishNode.row, finishNode.col);

  return getUnvisitedNeighbors(closestNode, grid, finishNode);
  //   console.log(node_array);
  // while (!!getneighbour.length) {

  // const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  //         for (const neighbor of unvisitedNeighbors) {
  //             neighbor.isVisited = true;
  //             visitedNodesInOrder.push(neighbor);
  //             if (neighbor === finishNode) return visitedNodesInOrder;
  //         }

  //     sortNodesByDistance(unvisitedNodes);
  //     const closestNode = unvisitedNodes.shift();
  //     // If we encounter a wall, we skip it.
  //     if (closestNode.isWall) continue;
  //     // If the closest node is at a distance of infinity,
  //     // we must be trapped and should therefore stop.
  //     if (closestNode.distance === Infinity) return visitedNodesInOrder;
  //     closestNode.isVisited = true;
  //     visitedNodesInOrder.push(closestNode);
  //     if (closestNode === finishNode) return visitedNodesInOrder;
  //     updateUnvisitedNeighbors(closestNode, grid);
  // }
}

// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }

// function updateUnvisitedNeighbors(node, grid) {
//   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//   for (const neighbor of unvisitedNeighbors) {
//     neighbor.distance = node.distance + 1;
//     neighbor.previousNode = node;
//   }
// }
var f = 0;
var f1 = 0;

function getUnvisitedNeighbors(node, grid, finishNode) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  //   console.log(neighbors);
  const neighbor_nodes = neighbors.filter((neighbor1) => !neighbor1.isVisited);
  for (const neighbor of neighbor_nodes) {
    if (neighbor.isWall) continue;
    console.log(neighbor.row, neighbor.col);

    neighbor.isVisited = true;
    neighbor.previousNode = node;
    visitedNodesInOrder.push(neighbor);
    if (neighbor.row === finishNode.row && neighbor.col === finishNode.col) {
      console.log("finished");
      console.log(visitedNodesInOrder);
      f1 = 1;
      return visitedNodesInOrder;
    }

    if (!f1) {
      getUnvisitedNeighbors(neighbor, grid, finishNode);
      return visitedNodesInOrder;
    }
  }
  // return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// function getAllNodes(grid, node) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder_dfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
