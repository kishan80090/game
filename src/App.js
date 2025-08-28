import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [isXTurn, setIsXTurn] = useState(true); 

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const winnerInfo = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winnerInfo) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O"; 
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell 
              ${cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""} 
              ${winnerInfo && winnerInfo.line.includes(index) ? "winner-cell" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <h2>
        {winnerInfo ? `🎉 Winner: ${winnerInfo.winner}` : `Next Turn: ${isXTurn ? "X" : "O"}`}
      </h2>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
}

export default App;
