import React, { useState } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import RestartButton from './components/RestartButton';
import RestartModal from './components/RestartModal';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, Tie: 0 });
  const [showGameModal, setShowGameModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (!checkWinner(newBoard)) {
      setTimeout(() => {
        cpuMove(newBoard);
      }, 500);
    }
  };

  const cpuMove = (newBoard) => {
    const emptyIndices = newBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setXIsNext(true);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winner = board[a];
        setWinner(winner);
        updateScores(winner);
        setShowGameModal(true);
        return true;
      }
    }
    if (!board.includes(null)) {
      setWinner('Tie');
      updateScores('Tie');
      setShowGameModal(true);
      return true;
    }
    return false;
  };

  const updateScores = (result) => {
    setScores(prevScores => ({
      ...prevScores,
      [result]: prevScores[result] + 1
    }));
  };

  const handleRestart = () => {
    setShowRestartModal(true);
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setShowGameModal(false);
    setShowRestartModal(false);
  };

  const handleExit = () => {
    setScores({ X: 0, O: 0, Tie: 0 });
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setShowGameModal(false);
    setShowRestartModal(false);
  };

  return (
    <div className="game">
      <RestartButton onRestart={handleRestart} />
      <div className="turn">
        Turn: {xIsNext ? 'X' : 'O'}
      </div>
      <Board board={board} onClick={handleClick} />
      <div className="scoreboard">
        <div className='Xscore'>X (YOU) <br />{scores.X}</div>
        <div className='Tscore'>TIES <br />{scores.Tie}</div>
        <div className='Oscore'>O (CPU) <br />{scores.O}</div>
      </div>
      {showGameModal && (
        <Modal 
          winner={winner} 
          onPlayAgain={handlePlayAgain} 
          onExit={handleExit} 
        />
      )}
      {showRestartModal && (
        <RestartModal 
          onPlayAgain={handlePlayAgain} 
          onExit={handleExit} 
        />
      )}
    </div>
  );
};

export default App;
