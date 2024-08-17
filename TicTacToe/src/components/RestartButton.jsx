import React from 'react';

const RestartButton = ({ onRestart }) => {
  return (
    <button className="restart-button" onClick={onRestart}>
       ↻
    </button>
  );
};

export default RestartButton;