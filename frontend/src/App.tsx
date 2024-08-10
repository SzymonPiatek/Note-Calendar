import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./stories/components/button/Button";
import { Navbar } from "./stories/components/navbar/Navbar";

function App() {
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
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Button variant="primary" size="medium" label="Przycisk" />
    </>
  );
}

export default App;
