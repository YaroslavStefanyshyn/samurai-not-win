import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('App component', () => {
  test('renders the component', () => {
    render(<App />);
    expect(screen.getByText('Pick mode')).toBeInTheDocument();
  });

  test('selects a game mode and starts the game', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const squares = document.querySelectorAll('.cell');
    expect(squares.length).toEqual(25);
  });

  test('restarts the game', () => {
    render(<App />);

    const restartButton = screen.getByText('Restart');
    fireEvent.click(restartButton);

    const squares = document.querySelectorAll('.square.active');
    expect(squares.length).toEqual(0);
  });
});
