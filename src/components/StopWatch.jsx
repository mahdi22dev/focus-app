import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { setInterval, clearInterval } from "worker-timers";
const StopWatch = () => {
  const previousTime = localStorage.getItem("stopwatchTime");
  const [time, setTime] = useState(parseInt(previousTime, 10) || 0);
  const [isWatchingTime, seIsWatchingTime] = useState(false);
  useEffect(() => {
    let intervalId;
    if (isWatchingTime) {
      intervalId = setInterval(() => setTime(time + 1), 7);
    }
    return () => clearInterval(intervalId);
  }, [isWatchingTime, time]);

  useEffect(() => {
    localStorage.setItem("stopwatchTime", time.toString());
  }, [time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;
  // Method to start and stop timer
  const startAndStop = () => {
    seIsWatchingTime(!isWatchingTime);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
    seIsWatchingTime(false);
  };

  return (
    <StopWatchWrapper className='stopwatch'>
      <p className='stopwatch-time'>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className='stopwatch-buttons'>
        <button className='stopwatch-button' onClick={startAndStop}>
          {isWatchingTime ? "Stop" : "Start"}
        </button>
        <button className='stopwatch-button' onClick={reset}>
          Reset
        </button>
      </div>
    </StopWatchWrapper>
  );
};

const StopWatchWrapper = styled.div`
  padding: 25px;
  padding-top: 50px;
  margin: 60px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-size: clamp(40px, 5vw, 50px);
    text-align: center;
    color: var(--color-primary-500);
  }
  .stopwatch-buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
  button {
    background-color: transparent;
    border: 0;
    outline: 0;
    color: var(--color-primary-500);
    transition-property: color background-color box-shadow;
    transition: 0.2s linear;
  }
  button:hover {
    box-shadow: 5px 2px 46px 4px rgba(255, 161, 56, 0.4);
    color: var(--color-primary-100);
    background-color: var(--color-primary-600);
  }
`;
export default StopWatch;
