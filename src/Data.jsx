import Counter from "./components/Counter";
import StopWatch from "./components/StopWatch";

export const data = [
  { id: 1, name: "pomodoro", mode: <Counter /> },
  { id: 2, name: "stop watch", mode: <StopWatch /> },
];
const changeToBreak = () => {
  setTime(300);
};
const changeToPomodoro = () => {
  setTime(1500);
};
export const pomodoroData = [
  { id: 1, name: "Pomodoro", time: 1500 },
  { id: 2, name: "Break", time: 300 },
];
