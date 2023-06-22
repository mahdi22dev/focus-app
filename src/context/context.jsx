import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [time, setTime] = useState(25);
  const [breakValue, setBreakValue] = useState(5);
  const [tempValue1, setTempValue1] = useState("");
  const [tempValue2, setTempValue2] = useState("");
  const [trigger, setTrigger] = useState(false);
  return (
    <AppContext.Provider
      value={{
        openSettings,
        setOpenSettings,
        breakValue,
        setBreakValue,
        time,
        setTime,
        tempValue2,
        setTempValue2,
        tempValue1,
        setTempValue1,
        trigger,
        setTrigger,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use the global context for less code

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
