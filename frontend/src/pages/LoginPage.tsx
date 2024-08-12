import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Login } from "../stories/sections/auth/Login";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../utils/api";

export const LoginPage: React.FC = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(apiURL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data);
        setError("");
        navigate("/");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <div className="login--container">
        <Login
          onSubmit={handleSubmit}
          emailState={setEmail}
          passwordState={setPassword}
        />
      </div>
    </div>
  );
};
