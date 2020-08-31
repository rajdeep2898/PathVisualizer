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
      START_NODE_ROW: 10,
      START_NODE_COL: 5,
      FINISH_NODE_ROW: 10,
      FINISH_NODE_COL: 25,
      pressedNodeStatus: "normal",
      title: "Path Finding Algo",
    };
    // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
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
  // rerender() {
  //   const START_NODE_ROW = this.state.START_NODE_ROW;
  //   const START_NODE_COL = this.state.START_NODE_COL;
  //   const FINISH_NODE_ROW = this.state.FINISH_NODE_ROW;
  //   const FINISH_NODE_COL = this.state.FINISH_NODE_COL;
  //   console.log("true");
  //   const grid = getInitialGrid(
  //     START_NODE_ROW,
  //     START_NODE_COL,
  //     FINISH_NODE_ROW,
  //     FINISH_NODE_COL
  //   );
  //   console.log(grid);
  //   this.setState({ grid });
  //   // this.forceUpdate();
  //   // this.setState({ mouseIsPressed: true });
  //   this.setState({ test: "done" });
  // }
  // forceUpdateHandler() {
  //   this.forceUpdate();
  // }
  refreshPage() {
    window.location.reload(false);
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
    this.setState({ title: "Diakstra Algorithm" });
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
    this.setState({ title: "Depth First Search" });

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
    this.setState({ title: "Breadth First Search" });

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
    const { grid, mouseIsPressed, title } = this.state;
    // const grid = this.state.grid;
    // console.log(grid);
    return (
      <div className="">
        <nav>
          <div class="nav-wrapper teal lighten-2">
            <a class="brand-logo">Path Visualizer</a>
          </div>
        </nav>
        <div className="row">
          <div className="col-3 card blue  mt-4">
            <div className=" mt-4">
              <h4 className="card-header bg-dark text-white">Select</h4>

              <div className="card-content white-text">
                {/* <div className="dropdown block"> */}
                {/* <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Algorithms
                  </button> */}
                <div className="" aria-labelledby="dropdownMenu2">
                  <ul className="list-group center-block">
                    <li className="list-group-item ">
                      <button
                        className="my-2 nav-link text-success center-block "
                        onClick={() => this.visualizeDijkstra()}
                      >
                        Dijkstra's Algorithm
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button className="my-2 nav-link text-success center-block">
                        A* Algorithm
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="my-2 nav-link text-success center-block"
                        onClick={() => this.visualizeBFS()}
                      >
                        Breadth-first Search
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="my-2 nav-link text-success center-block"
                        onClick={() => this.visualizeDFS()}
                      >
                        Depth-first Search
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="my-2 nav-link text-success center-block"
                        onClick={
                          // () => this.rerender()
                          // () => this.componentDidMount()
                          this.refreshPage

                          // this.forceUpdateHandler
                        }
                      >
                        Clear
                      </button>
                    </li>
                  </ul>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col s12 m6 mt-4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{title}</span>
                    <div className="">
                      {/* {test} */}
                      {grid.map((row, rowIdx) => {
                        return (
                          <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                              const {
                                row,
                                col,
                                isFinish,
                                isStart,
                                isWall,
                              } = node;
                              return (
                                <Node
                                  key={nodeIdx}
                                  col={col}
                                  isFinish={isFinish}
                                  isStart={isStart}
                                  isWall={isWall}
                                  mouseIsPressed={mouseIsPressed}
                                  onMouseDown={(row, col) =>
                                    this.handleMouseDown(row, col)
                                  }
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button> */}
      </div>
    );
  }
}
const getInitialGrid = (SR, SC, FR, FC) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 30; col++) {
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
