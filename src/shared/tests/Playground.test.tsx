import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Playground from '../../components/Playground';

describe('Playground', () => {
  const defaultProps = {
    selectedSquares: 2,
    setOnSquareNum: jest.fn(),
    onSquareNum: [],
    startGame: false,
    openSelect: false,
  };

  it('calls setOnSquareNum with correct parameters on mouseover', () => {
    const setOnSquareNum = jest.fn();
    const props = {
      ...defaultProps,
      setOnSquareNum,
      startGame: true,
    };
    render(<Playground {...props} />);
    const cell = screen.getByTestId('cell-1');
    fireEvent.mouseOver(cell);
    expect(setOnSquareNum).toHaveBeenCalledWith([1]);
  });

  it('adds a square number to onSquareNum on mouseover', () => {
    const props = {
      ...defaultProps,
      startGame: true,
    };
    render(<Playground {...props} />);
    const cell = screen.getByTestId('cell-1');
    fireEvent.mouseOver(cell);
    expect(cell).toHaveStyle({ background: '' });
  });

  it('removes a square number from onSquareNum on mouseover if already in onSquareNum', () => {
    const props = {
      ...defaultProps,
      startGame: true,
      onSquareNum: [0],
    };
    render(<Playground {...props} />);
    const cell = screen.getByTestId('cell-1');
    fireEvent.mouseOver(cell);
    expect(cell).toHaveStyle({ background: '' });
  });
});
