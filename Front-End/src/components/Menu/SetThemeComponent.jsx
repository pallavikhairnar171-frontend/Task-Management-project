import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const SetThemeComponent = () => {
  const [theme, setTheme] = useState("light")
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {theme === "light" ? (
        <MdDarkMode size={20} />
      ) : (
        <MdLightMode size={20} className="text-yellow-400" />
      )}
    </button>
  );
};
