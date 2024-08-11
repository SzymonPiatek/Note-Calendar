import { useEffect, useState } from "react";
import { Navbar as Nb } from "../stories/sections/navbar/Navbar";

export const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.setAttribute("data-mode", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="navbar">
      <Nb isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};
