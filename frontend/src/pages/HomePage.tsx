import React, { useEffect, useState } from "react";
import { Calendar } from "../stories/components/calendar/Calendar";
import { Notes } from "../stories/components/note/Notes";
import { apiURL } from "../utils/api";
import { BetterNoteType } from "../utils/modelsTypes";
import { useUser } from "../contexts/UserContext";
import { startOfDay, isWithinInterval, endOfDay, subDays } from "date-fns";
import { AddNoteModal } from "../stories/components/modal/AddNoteModal";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [allNotes, setAllNotes] = useState<BetterNoteType[]>([]);
  const [notes, setNotes] = useState<BetterNoteType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(new Date())
  );
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}note/all`);
        const data = await response.json();

        setAllNotes(data.notes);

        const filteredNotes = data.notes.filter((note: BetterNoteType) => {
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
        setAllNotes([]);
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
      setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
  };

  const handleStatus = async (id: number, currentStatus: string) => {
    try {
      const response = await fetch(`${apiURL}note/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: getNextStatus(currentStatus),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note status");
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote.note : note))
      );
      setAllNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote.note : note))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getNextStatus = (currentStatus: string) => {
    const statusOrder = ["PENDING", "DONE"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex];
  };

  const handleAddNote = () => {
    setIsAddNoteModalOpen(!isAddNoteModalOpen);
  };

  return (
    <div className="planner">
      <div className="notes">
        <Notes
          notes={notes}
          handleDelete={handleDelete}
          date={
            selectedDate ? startOfDay(selectedDate) : startOfDay(new Date())
          }
          handleStatus={handleStatus}
          handleAddNote={handleAddNote}
        />
      </div>
      <div className="calendar">
        <Calendar onDateSelect={handleDateSelect} notes={allNotes} />
      </div>
      {isAddNoteModalOpen && (
        <div className="modal">
          <AddNoteModal handleAddNote={handleAddNote} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
