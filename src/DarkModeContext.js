import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
// 讓包在DarkModeProvider中的所有頁面都能套用
export const DarkModeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  // toggleDarkMode用來控制setIsDarkModeEnabled的狀態
  const toggleDarkMode = () => {
    setIsDarkModeEnabled(prevState => !prevState);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
