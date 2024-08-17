import React from 'react';

const RestartModal = ({  onPlayAgain, onExit }) => {

  return (
    <div className="modal">
      <div className="modal-content">
    
        <p className="round-result">
          RESTART GAME?
        </p>
        <div className="button-group">
          <button className="button button-quit" onClick={onExit}>Quit</button>
          <button className="button button-next" onClick={onPlayAgain}>Next Round</button>
        </div>
      </div>
    </div>
  );
};

export default RestartModal;
