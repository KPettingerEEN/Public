// ScoreBoard.js
import React from 'react';

const ScoreBoard = ({ score, timeLeft }) => (
  <div className="scoreboard">
    <h2 style={{ color: 'rgb(255, 132, 0)' }} >Score: {score}</h2>
    <h2 style={{ color: 'rgb(34, 255, 45)' }} >Time Left: {timeLeft}s</h2>
  </div>
);

export default ScoreBoard;
