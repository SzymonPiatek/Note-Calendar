import React from "react";
import { useUser } from "../contexts/UserContext";
import { Calendar } from "../stories/components/calendar/Calendar";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="planner">
      <div className="notes">E</div>
      <div className="calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage;
