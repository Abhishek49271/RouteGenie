// algorithms/bellmanFord.js

export function bellmanFord(grid, startNode, finishNode) {
    const nodes = getAllNodes(grid);
    startNode.distance = 0;
  
    // Relax edges repeatedly
    for (let i = 0; i < nodes.length - 1; i++) {
      for (const node of nodes) {
        if (node.distance === Infinity) continue;
        const neighbors = getUnvisitedNeighbors(node, grid);
        for (const neighbor of neighbors) {
          const newDist = node.distance + 1; // Weight is assumed to be 1
          if (newDist < neighbor.distance) {
            neighbor.distance = newDist;
            neighbor.previousNode = node;
          }
        }
      }
    }
  
    // Check for negative-weight cycles (not applicable here, but for completeness)
    for (const node of nodes) {
      const neighbors = getUnvisitedNeighbors(node, grid);
      for (const neighbor of neighbors) {
        if (node.distance + 1 < neighbor.distance) {
          throw new Error("Graph contains a negative-weight cycle");
        }
      }
    }
  
    // Return all visited nodes for visualization
    const visitedNodesInOrder = [];
    for (const node of nodes) {
      if (node.isVisited) visitedNodesInOrder.push(node);
    }
    return visitedNodesInOrder;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isWall);
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
  