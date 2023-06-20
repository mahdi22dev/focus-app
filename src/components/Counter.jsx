import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BiPlayCircle, BiStop, BiReset } from "react-icons/bi";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setInterval, clearInterval } from "worker-timers";
import { pomodoroData } from "../Data";
import { motion } from "framer-motion";

const Counter = () => {
  const [time, setTime] = useState(pomodoroData[0].time);
  const [isWatchingTime, setIsWatchingTime] = useState(false);
  const [btnId, setBtnId] = useState(pomodoroData[0]);
  const initVal = useRef(pomodoroData[0].time);

  useEffect(() => {
    let intervalId;
    if (time === 0) {
      setIsWatchingTime(false);
      setTime(1500);
    }

    if (isWatchingTime && time > 0) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isWatchingTime, time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startAndStop = () => {
    setIsWatchingTime((prevIsWatchingTime) => !prevIsWatchingTime);
  };

  const reset = () => {
    setTime(btnId.time);
    setIsWatchingTime(false);
  };

  return (
    <Pomodoro className='pomodoro'>
      <div className='right'>
        <div className='time-changer-buttons'>
          {pomodoroData.map((btn, index) => {
            return (
              <button
                key={btn.id}
                className={btnId === btn ? "btn btn-selected" : "btn"}
                onClick={() => {
                  setBtnId(pomodoroData[index]);
                  console.log(btnId);
                  if (btn.name == "Pomodoro") {
                    setTime(pomodoroData[0].time);
                    initVal.current = pomodoroData[0].time;
                    setIsWatchingTime(false);
                  }
                  if (btn.name == "Break") {
                    setTime(pomodoroData[1].time);
                    initVal.current = pomodoroData[1].time;
                    setIsWatchingTime(false);
                  }
                }}
              >
                {btn.name}
                {btnId == btn ? (
                  <motion.div
                    className='underline-btn'
                    layoutId='underline-btn'
                  ></motion.div>
                ) : null}
              </button>
            );
          })}
        </div>
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
  .right {
    .time-changer-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: auto auto;
      margin-bottom: 50px;
      max-width: 300px;
      justify-content: space-between;
      button {
        font-size: large;
        position: relative;
        min-width: 100px;
        text-align: center;
      }
    }
  }
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
    box-shadow: 5px 2px 46px 4px rgba(255, 161, 56, 0.4);
  }

  .circle:hover {
    color: var(--color-primary-200);
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
