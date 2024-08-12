import React, { useEffect, useState } from "react";
import { Calendar } from "../stories/components/calendar/Calendar";
import { Notes } from "../stories/components/note/Notes";
import { apiURL } from "../utils/api";
import { Note } from "../utils/modelsTypes";
import { useUser } from "../contexts/UserContext";
import { startOfDay, isWithinInterval, endOfDay, subDays } from "date-fns";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}note/all`);
        const data = await response.json();

        const filteredNotes = data.notes.filter((note: Note) => {
          const noteStartDate = new Date(note.startDate);
          const noteEndDate = new Date(note.endDate);
          const selected = selectedDate
            ? subDays(startOfDay(selectedDate), -1)
            : startOfDay(new Date());

          return (
            note.userId === user!.id &&
            isWithinInterval(selected, {
              start: noteStartDate,
              end: endOfDay(noteEndDate),
            })
          );
        });

        setNotes(filteredNotes);
      } catch (err) {
        console.error(err);
        setNotes([]);
      }
    };

    fetchData();
  }, [user, selectedDate]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiURL}note/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="planner">
      <div className="notes">
        <Notes notes={notes} handleDelete={handleDelete} />
      </div>
      <div className="calendar">
        <Calendar onDateSelect={handleDateSelect} />
      </div>
    </div>
  );
};

export default HomePage;
