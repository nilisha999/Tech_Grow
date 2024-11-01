import React, { useState, useEffect, useCallback } from "react";
import "./Stopwatch.css";

const Stopwatch: React.FC = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timeInterval) {
      clearInterval(timeInterval);
      setTimeInterval(null);
    }
  }, [timeInterval]); // Dependency on timeInterval

  useEffect(() => {
    return () => {
      clearTimer(); // Clean up on unmount
    };
  }, [clearTimer]); // Use clearTimer as a dependency

  const onResetTimer = () => {
    clearTimer();
    setIsTimerRunning(false);
    setTimeElapsedInSeconds(0);
  };

  const onStopTimer = () => {
    clearTimer();
    setIsTimerRunning(false);
  };

  const updateTime = () => {
    setTimeElapsedInSeconds((prev) => prev + 1);
  };

  const onStartTimer = () => {
    const interval = setInterval(updateTime, 1000);
    setTimeInterval(interval);
    setIsTimerRunning(true);
  };

  const renderSeconds = () => {
    const seconds = Math.floor(timeElapsedInSeconds % 60);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  };

  const renderMinutes = () => {
    const minutes = Math.floor(timeElapsedInSeconds / 60);
    return minutes < 10 ? `0${minutes}` : minutes.toString();
  };

  const time = `${renderMinutes()}:${renderSeconds()}`;

  return (
    <div className="app-container">
      <div className="stopwatch-container">
        <h1 className="stopwatch">Stopwatch</h1>
        <div className="timer-container">
          <div className="timer">
            <img
              className="timer-image"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png" // Ensure the image path is correct
              alt="stopwatch"
            />
            <p className="heading">Timer</p>
          </div>
          <h1 className="stopwatch-timer">{time}</h1>
          <div className="timer-buttons">
            <button
              type="button"
              className="start-button button"
              onClick={onStartTimer}
              disabled={isTimerRunning}
            >
              Start
            </button>
            <button
              type="button"
              className="stop-button button"
              onClick={onStopTimer}
            >
              Stop
            </button>
            <button
              type="button"
              onClick={onResetTimer}
              className="reset-button button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
