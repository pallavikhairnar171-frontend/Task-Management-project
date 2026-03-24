import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
export const useAppTheme = () => {
    console.log(useContext(ThemeContext))
  return useContext(ThemeContext);
};
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
     try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  } catch (e) {
    console.error("Invalid theme in storage",e);
  }
  }, []);

  const applyTheme = (themeData) => {
    setTheme(themeData);
    localStorage.setItem("theme", JSON.stringify(themeData));
  };
  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
