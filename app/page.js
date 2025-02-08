'use client'
import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board) => {
    for (let combo of winningCombos) {
      if (
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
      ) {
        return board[combo[0]];
      }
    }
    if (board.every(cell => cell !== '')) return 'tie';
    return null;
  };

  const handleClick = (id) => {
    if (gameBoard[id] || gameOver) return;
    
    const newBoard = [...gameBoard];
    newBoard[id] = currentPlayer;
    setGameBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    const result = checkWinner(gameBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
    }
  }, [gameBoard]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center p-4">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6 text-white text-center animate-pulse">
          Tic-Tac-Toe
        </h1>
        
        {gameOver && (
          <div className="mb-6 text-2xl font-bold text-white animate-bounce">
            {winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {gameBoard.map((cell, id) => (
            <div
              onClick={() => handleClick(id)}
              key={id}
              className={`h-24 w-24 rounded-xl flex justify-center items-center text-5xl font-bold cursor-pointer
                transform transition-all duration-200 hover:scale-105 active:scale-95
                ${!cell && !gameOver ? 'hover:bg-white/40' : ''}
                ${cell === 'X' ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white' : 
                  cell === 'O' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white' : 
                  'bg-white/20'}`}
            >
              <span className="transform transition-all duration-300 hover:rotate-12">
                {cell}
              </span>
            </div>
          ))}
        </div>

        {gameOver && (
          <button
            onClick={resetGame}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-xl
              transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;