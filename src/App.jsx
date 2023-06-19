import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { data } from "./Data";

function App() {
  const [Mode, setMode] = useState(data[0]);
  return (
    <Wrraper className='container'>
      <h1>Focus Mode App</h1>
      <div className='focus'>
        <nav>
          <ul>
            {data.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item === Mode ? "item-mode selected" : "item-mode"}
                  onClick={() => {
                    setMode(item);
                  }}
                >
                  {item.name}

                  {item === Mode ? (
                    <motion.div
                      className='underline'
                      layoutId='underline'
                    ></motion.div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={Mode.id}
            initial={{ y: "500px", opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            exit={{ y: "500px", opacity: 0, transition: { duration: 1 } }}
            className='focus-mode'
          >
            {Mode ? Mode.mode : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </Wrraper>
  );
}

const Wrraper = styled.main`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  h1 {
    color: var(--color-primary-500);
    font-weight: 700;
    font-size: clamp(40px, 6vw, 60px);
    margin-bottom: 90px;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    max-height: 55px;
    border-radius: 2px;
    background-color: var(--color-primary-900);
    z-index: -1;
    color: var(--color-primary-700);
  }
  li {
    cursor: pointer;
    width: 150px;
    text-align: center;
    position: relative;
    border-radius: 2px;
    font-size: clamp(15px, 1.2vw, 20px);
    padding: 15px;
    padding-right: 18px;
    padding-left: 18px;
    z-index: 2;
    background-color: transparent;
    transition: color 0.4s ease;
    text-transform: capitalize;
  }
  li:hover {
    color: #fff;
  }
  .focus {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 60vh;
  }
`;
export default App;
