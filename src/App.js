import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flowers, setFlowers] = useState([]);

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

  useEffect(() => {
    let timer;
    if (nameSubmitted && !winnerInfo) {
      setIsRunning(true);
    }
    if (isRunning && !winnerInfo) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    if (winnerInfo) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, nameSubmitted, winnerInfo]);

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
    setTime(0);
    setIsRunning(false);
    setFlowers([]); 
  };

  const startGame = () => {
    if (playerX && playerO) {
      setNameSubmitted(true);
      setTime(0);
      setIsRunning(true);
    }
  };

  
  useEffect(() => {
    if (winnerInfo) {
      const interval = setInterval(() => {
        setFlowers((prev) => [
          ...prev,
          {
            id: Date.now(),
            left: Math.random() * 100, 
            duration: Math.random() * 3 + 2,
            emoji: ["🌸", "🌼", "🌺", "🌹"][Math.floor(Math.random() * 4)]
          }
        ]);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [winnerInfo]);

  return (
    <div className={`game ${winnerInfo ? "winner-bg" : ""}`}>
      {!nameSubmitted ? (
        <div className="name-inputs">
          <h2>Enter Player Names</h2>
          <input style={{height:"30px",width:"200px",fontSize:"15px"}}
            type="text"
            placeholder="Player X Name"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          /><br/><br/>
          <input style={{height:"30px",width:"200px",fontSize:"15px"}}
            type="text"
            placeholder="Player O Name"
            value={playerO} 
            onChange={(e) => setPlayerO(e.target.value)}
          /><br/>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
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
          <h2 className={winnerInfo ? "blink" : ""}>
            {winnerInfo
              ? `🎉 Winner: ${winnerInfo.winner === "X" ? playerX : playerO}`
              : `Next Turn: ${isXTurn ? playerX + " (X)" : playerO + " (O)"}`}
          </h2>
          <h3 className={winnerInfo ? "blink" : ""}>⏱ Time: {time}s</h3>
          <button onClick={resetGame}>Restart Game</button>
        </>
      )}

      
      {winnerInfo && (
        <div className="flower-container">
          {flowers.map((f) => (
            <div
              key={f.id}
              className="flower"
              style={{
                left: `${f.left}vw`,
                animationDuration: `${f.duration}s`,
              }}
            >
              {f.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
