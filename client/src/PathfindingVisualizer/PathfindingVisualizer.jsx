import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkastra";
import { DFS, getNodesInShortestPathOrder_dfs } from "../algorithms/DFS";
import { BFS, getNodesInShortestPathOrder_bfs } from "../algorithms/BFS";
import { astar, getNodesInShortestPathOrder_a } from "../algorithms/astar";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      START_NODE_ROW: 5,
      START_NODE_COL: 15,
      FINISH_NODE_ROW: 10,
      FINISH_NODE_COL: 35,
      pressedNodeStatus: "normal",
    };
  }
  componentDidMount() {
    const START_NODE_ROW = this.state.START_NODE_ROW;
    const START_NODE_COL = this.state.START_NODE_COL;
    const FINISH_NODE_ROW = this.state.FINISH_NODE_ROW;
    const FINISH_NODE_COL = this.state.FINISH_NODE_COL;
    const grid = getInitialGrid(
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const selectStart = this.state.grid.slice();
    const node = selectStart[row][col];
    // if (node.isStart) {
    //   this.setState({ pressedNodeStatus: "start" });
    // }
    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.pressedNodeStatus
    );
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.pressedNodeStatus
    );
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  // componentDidMount() {
  //   const nodes = [];
  //   for (let row = 0; row < 15; row++) {
  //     const currentRow = [];
  //     for (let col = 0; col < 50; col++) {
  //       const currentNode = {
  //         col,
  //         row,
  //         isStart: row === 10 && col===5,
  //         isFinish: row===10 && col===45
  //       }
  //       currentRow.push(currentNode);
  //     }
  //     nodes.push(currentRow);
  //   }
  //   this.setState({ nodes })
  // }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeDFS() {
    const { grid } = this.state;
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder_dfs(
      finishNode
    );
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFS() {
    // as
    const { grid } = this.state;
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder_bfs(
      finishNode
    );
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeA() {
    const { grid } = this.state;
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder_a(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    // const grid = this.state.grid;
    // console.log(grid);
    return (
      <>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Algorithms
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              className="dropdown-item"
              type="button"
              onClick={() => this.visualizeDijkstra()}
            >
              Dijkstra's Algorithm
            </button>
            <button className="dropdown-item" type="button">
              A* Algorithm
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => this.visualizeA()}
            >
              Breadth-first Search
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => this.visualizeDFS()}
            >
              Depth-first Search
            </button>
          </div>
        </div>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      // onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const getInitialGrid = (SR, SC, FR, FC) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, SR, SC, FR, FC));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row, SR, SC, FR, FC) => {
  return {
    col,
    row,
    isStart: row === SR && col === SC,
    isFinish: row === FR && col === FC,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col, pressedNodeStatus) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  // const noder = newGrid[row][col + 1];
  // const nodel = newGrid[row][col - 1];
  // const nodet = newGrid[row - 1][col];
  // const nodeb = newGrid[row + 1][col];

  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;

  // if (node.isStart) {
  //   console.log("test2");
  //   const newNode = {
  //     ...node,
  //     isStart: !node.isStart,
  //     isSelectedStart: true,
  //   };
  //   newGrid[row][col] = newNode;
  //   return newGrid;
  // } else if (
  //   noder.isSelectedStart ||
  //   nodel.isSelectedStart ||
  //   nodet.isSelectedStart ||
  //   nodeb.isSelectedStart
  // ) {
  //   console.log(row, col);
  //   const newNode = {
  //     ...node,
  //     isStart: true,
  //     isSelectedStart: true,
  //   };
  //   const noder = {
  //     ...node,
  //     isSelectedStart: false,
  //     isStart: false,
  //   };
  //   const nodel = {
  //     ...node,
  //     isSelectedStart: false,
  //     isStart: false,
  //   };
  //   const nodet = {
  //     ...node,
  //     isSelectedStart: false,
  //     isStart: false,
  //   };
  //   const nodeb = {
  //     ...node,
  //     isSelectedStart: false,
  //     isStart: false,
  //   };
  //   newGrid[row][col] = newNode;
  //   newGrid[row][col + 1] = noder;
  //   newGrid[row][col - 1] = nodel;
  //   newGrid[row - 1][col] = nodet;
  //   newGrid[row + 1][col] = nodeb;

  //   return newGrid;
  // } else {
  //   console.log("test");
  //   const newNode = {
  //     ...node,
  //     isWall: !node.isWall,
  //   };
  //   newGrid[row][col] = newNode;
  //   return newGrid;
  // }
};
