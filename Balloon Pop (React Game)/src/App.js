// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Target from './Target';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [spawnInterval, setSpawnInterval] = useState(1000);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!gameOver && targets.length < 50) {
      const interval = setInterval(() => {
        const id = new Date().getTime();
        const top = Math.random() * 90;
        const left = Math.random() * 90;
        setTargets((prev) => [...prev, { id, top, left, size: 50 }]);
      }, spawnInterval);
      return () => clearInterval(interval);
    }
  }, [gameOver, targets.length, spawnInterval]);

  useEffect(() => {
    if (score % 10 === 0 && score !== 0) {
      setSpawnInterval((prev) => Math.max(prev - 200, 200));
    }
  }, [score]);

  const handleTargetClick = (id) => {
    setScore((prev) => prev + 1);
    setTargets((prev) => prev.filter((target) => target.id !== id));
  };

  const handleRestart = () => {
    setScore(0);
    setTargets([]);
    setTimeLeft(60);
    setSpawnInterval(1000);
    setGameOver(false);
  };

  return (
    <div className="game crosshair-cursor">
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <div className='targetBoard'>
        {targets.map((target) => (
          <Target
            key={target.id}
            id={target.id}
            top={target.top}
            left={target.left}
            size={target.size}
            handleClick={handleTargetClick}
          />
        ))}
      </div>
      {gameOver && (
        <div className="game-over-overlay">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
