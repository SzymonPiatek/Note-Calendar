import { useEffect, useState } from "react";
import { Navbar as Nb } from "../stories/sections/navbar/Navbar";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("data-mode");
    return storedMode === "light" ? false : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
      localStorage.setItem("data-mode", "dark");
    } else {
      document.documentElement.setAttribute("data-mode", "light");
      localStorage.setItem("data-mode", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="navbar">
      <Nb
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        handleLogout={handleLogout}
      />
    </div>
  );
};
