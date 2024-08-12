import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { User } from "../utils/modelsTypes";
import { apiURL } from "../utils/api";
import useIdleTimer from "./UseIdleTimer";
import { UserContextType } from "../utils/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      fetch(`${apiURL}/auth/check-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("User does not exist");
          }
          return res.json();
        })
        .then((data) => {
          if (!data.exists || (data.user && !data.user.isActive)) {
            logout();
          }
        })
        .catch((error) => {
          logout();
        });
    }
  }, [user]);

  const login = (userData: any) => {
    setUser(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useIdleTimer(1000 * 60 * 5 * 100, logout);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
