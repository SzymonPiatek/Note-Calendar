import React from "react";
import { useUser } from "../contexts/UserContext";
import { Calendar } from "../stories/components/calendar/Calendar";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="calendar">
      <Calendar />
    </div>
  );
};

export default HomePage;
