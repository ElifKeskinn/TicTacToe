import React from 'react';

const Modal = ({ winner, onPlayAgain, onExit }) => {
  const isXWinner = winner === 'X';
  const isOWinner = winner === 'O';
  const isTie = winner === 'Tie';

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="result">
          {isTie ? 'It\'s a Tie!' : isXWinner ? 'You won!' : 'You lost :('}
        </h2>
        <p className={`round-result ${isXWinner ? 'x-winner' : isOWinner ? 'o-winner' : isTie ? 'tie' : ''}`}>
          {isTie ? 'It\'s a Tie!' : isXWinner ? 'X TAKES THE ROUND' : 'O TAKES THE ROUND'}
        </p>
        <div className="button-group">
          <button className="button button-quit" onClick={onExit}>Quit</button>
          <button className="button button-next" onClick={onPlayAgain}>Next Round</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
