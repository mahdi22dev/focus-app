import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BiPlayCircle, BiStop, BiReset } from "react-icons/bi";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setInterval, clearInterval } from "worker-timers";

const Counter = () => {
  const [time, setTime] = useState(1500);
  const [isWatchingTime, setIsWatchingTime] = useState(false);
  const initVal = useRef(time);

  useEffect(() => {
    console.log(initVal.current);
    let intervalId;
    if (time === 0) {
      setIsWatchingTime(false);
      setTime(1500);
    }

    if (isWatchingTime && time > 0) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        isWatchingTime(true);
      } else {
        isWatchingTime(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isWatchingTime, time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startAndStop = () => {
    setIsWatchingTime((prevIsWatchingTime) => !prevIsWatchingTime);
  };

  const reset = () => {
    setTime(1500);
    setIsWatchingTime(false);
  };

  return (
    <Pomodoro className='pomodoro'>
      <div className='circle'>
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            trailColor: "var( --color-primary-400)",
            pathColor: `var(--color-primary-100)`,
            textColor: "var(--color-primary-100)",
          })}
          strokeWidth={5}
          value={minutes}
          minValue={0}
          maxValue={Math.floor(initVal.current / 60)}
          text={`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        >
          <button
            className='pomodoro-button stop-btn btn'
            onClick={startAndStop}
          >
            {isWatchingTime ? <BiStop /> : <BiPlayCircle />}
          </button>
        </CircularProgressbarWithChildren>
      </div>
      <button className='reset-btn btn' onClick={reset}>
        <BiReset />
      </button>
    </Pomodoro>
  );
};

const Pomodoro = styled.section`
  margin: 10px 0px auto;
  padding: 40px;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  /* .pomodoro-buttons {
    margin-top: 50px;
  } */
  .circle {
    position: relative;
    width: 400px;
    padding: 10px;
    background-color: var(--color-primary-500);
    border-radius: 50%;
    border: 25px solid var(--color-primary-700);
    transition-property: color background-color box-shadow;
    transition: 0.2s linear;
    font-weight: 700;
  }

  .circle:hover {
    box-shadow: 5px 2px 46px 4px rgba(255, 161, 56, 0.4);
    color: var(--color-primary-200);
    /* background-color: var(--color-primary-600); */
  }
  .stop-btn {
    margin-top: auto;
    /* margin-bottom: 50px; */
  }
  button {
    background-color: transparent;
    border: 0;
    color: var(--color-primary-100);
    font-size: 65px;
    transition: color 0.2s ease;
  }
  button:hover {
    color: var(--color-primary-700);
  }
  /* .reset-btn {
    margin-top: 30px;
  } */
`;

export default Counter;
