import React from "react";
import { useUser } from "../contexts/UserContext";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return <div></div>;
};

export default HomePage;
