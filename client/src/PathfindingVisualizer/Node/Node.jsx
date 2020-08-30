import React, { Component } from "react";
import "./Node.css";
export default class Node extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //     };
  // }

  // render() {
  //     const { isStart, isFinish } = this.props;
  //     const extraClassName = isFinish
  //         ? 'node-finish'
  //         : isStart
  //         ? 'node-start'
  //         : '';
  //     return <div className={`node ${extraClassName}`}></div>;

  // }
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      // onMouseLeave,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        // onMouseLeave={() => onMouseLeave(row, col)}
      ></div>
    );
  }
}
export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};
