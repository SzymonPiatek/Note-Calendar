import React, { useEffect, useState } from "react";
import { Calendar } from "../stories/components/calendar/Calendar";
import { Notes } from "../stories/components/note/Notes";
import { apiURL } from "../utils/api";
import { Note } from "../utils/modelsTypes";

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL + `note/all`);
        const data = await response.json();
        setNotes(data.notes);
      } catch (err) {
        console.error(err);
        setNotes([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="planner">
      <div className="notes">
        <Notes notes={notes} />
      </div>
      <div className="calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage;
