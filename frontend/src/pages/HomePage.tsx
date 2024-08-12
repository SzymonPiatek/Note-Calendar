import React from "react";
import { useUser } from "../contexts/UserContext";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div>
      {user?.firstName} {user?.lastName}
    </div>
  );
};

export default HomePage;
