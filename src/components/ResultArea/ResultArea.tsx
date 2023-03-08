import React from "react";

interface IProps {
  onSquareNum: number[];
  selectedSquares: number;
}

const height = () => {
  const playground = document.getElementById('playground')?.offsetHeight ?? '200px'
  return {
    maxHeight: playground
  }
}

export const ResultArea: React.FC<IProps> = ({...props}) => {

  return (
    <div className="App_result-area">
      <h1>Hover squares</h1>
      <div className="App_result-area_block" style={height()} data-testid="square-element">
        {props.onSquareNum.sort((a, b) => a - b).map((e, index) => {
          const row = Math.ceil(e / props.selectedSquares); // get the row number
          const col = e % props.selectedSquares || props.selectedSquares; // get the column number
          return (
            <div
              className="App_result-area_block__element"
              key={index}
            >
              {`row ${row} col ${col}`}
            </div>
          )
        })}
      </div>
    </div>
  )
}
