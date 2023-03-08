import React from 'react';
// styles
import {color, GridTemplates} from "./style";
import {useWindowSize} from "../../shared/hooks/useWindowSize";

interface IProps {
  selectedSquares: number;
  setOnSquareNum: (a: number[]) => void;
  onSquareNum: number[];
  startGame: boolean;
  openSelect: boolean;
}

export const Playground: React.FC<IProps> = ({...props}) => {
  const squareArray = React.useMemo(() => {
    return Array.from(Array(Math.pow(props.selectedSquares, 2)).keys());
  }, [props.selectedSquares]);

  const {width} = useWindowSize();

  const getColor = React.useCallback((squareNumber: number, onSquareNum: number[]) => {
    return color(squareNumber, onSquareNum);
  }, []);

  const handleMouseOver = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.startGame && !props.openSelect) {
      const number = Number(e.currentTarget.id)

      props.setOnSquareNum(
        props.onSquareNum.some(e => e === number)
          ? props.onSquareNum.filter(e => e !== number)
          : [...props.onSquareNum, number]
      )
    }
  }, [props.onSquareNum, props.setOnSquareNum, props.startGame, props.openSelect]);

  return (
    <div className="container">
      <div
        className="grid"
        id="playground"
        data-testid="cell"
        style={GridTemplates(props.selectedSquares, width)}>
        {squareArray.map(square => {
          const squareNumber = ++square
          return (
            <div
              key={squareNumber}
              data-testid={`cell-${squareNumber}`}
              className="cell"
              id={`${squareNumber}`}
              onMouseOver={handleMouseOver}
              style={getColor(squareNumber, props.onSquareNum)}
            />
          )
        })}
      </div>
    </div>
  )
};
