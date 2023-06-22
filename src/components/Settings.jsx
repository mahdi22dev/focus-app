import { motion } from "framer-motion";
import React from "react";
import { useGlobalContext } from "../context/context";
import { FaWindowClose } from "react-icons/fa";
import Inputs from "./Inputs";

const Settings = () => {
  const {
    openSettings,
    setOpenSettings,
    tempValue2,
    tempValue1,
    setTempValue1,
    setTempValue2,
    time,
    setTime,
    setTrigger,
    trigger,
    setBreakValue,
  } = useGlobalContext();
  return (
    <motion.div
      className='backdrop'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        setOpenSettings(false);
      }}
    >
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
        }}
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          },
        }}
        exit={{ y: "100vh", opacity: 0, transition: { duration: 0.3 } }}
        className='modal'
      >
        <h3 className='model-title'>Settings</h3>
        <div className='divider'></div>
        <p className='modal-time'>time (minutes)</p>

        <Inputs />
        <button
          className='btn close-btn'
          onClick={() => {
            setOpenSettings(!openSettings);
          }}
        >
          <FaWindowClose />
        </button>
        <button
          className='apply-btn btn'
          onClick={() => {
            setTime(tempValue1);
            setBreakValue(tempValue2);
            if (tempValue1 == 0) {
              setTime(25);
            }
            if (tempValue2 == 0) {
              setBreakValue(5);
            }
            setTrigger(!trigger);
            setOpenSettings(false);
            console.log(tempValue2 + ":" + tempValue1);
          }}
        >
          apply
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
