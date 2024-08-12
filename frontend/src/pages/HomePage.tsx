import React, { useEffect, useState } from "react";
import { Calendar } from "../stories/components/calendar/Calendar";
import { Notes } from "../stories/components/note/Notes";
import { apiURL } from "../utils/api";
import { Note, NoteStatus } from "../utils/modelsTypes";
import { useUser } from "../contexts/UserContext";
import { startOfDay, isWithinInterval, endOfDay, subDays } from "date-fns";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteStatuses, setNoteStatuses] = useState<NoteStatus[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    startOfDay(new Date())
  );

  const [noteStatusMap, setNoteStatusMap] = useState<
    Record<number, NoteStatus>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}note/all`);
        const data = await response.json();

        setAllNotes(data.notes);

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
        setAllNotes([]);
        setNotes([]);
      }
    };

    fetchData();
  }, [user, selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}noteStatus/all`);
        const data = await response.json();
        setNoteStatuses(data.noteStatuses);
      } catch (err) {
        console.error(err);
        setNoteStatuses([]);
      }
    };

    fetchData();
  }, []);

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleStatus = (id: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id === id) {
          const currentStatus = noteStatusMap[note.id] || note.status;
          const currentIndex = noteStatuses.findIndex(
            (status) => status.name === currentStatus.name
          );

          const nextIndex = (currentIndex + 1) % noteStatuses.length;
          const nextStatus = noteStatuses[nextIndex];

          setNoteStatusMap((prevMap) => ({
            ...prevMap,
            [id]: nextStatus,
          }));

          const updateStatus = async () => {
            try {
              const response = await fetch(`${apiURL}note/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ statusId: nextStatus.id }),
              });

              if (!response.ok) {
                throw new Error("Failed to update note status");
              }
            } catch (err) {
              console.error(err);
            }
          };

          updateStatus();

          return {
            ...note,
            status: nextStatus,
          };
        }

        return note;
      });

      return updatedNotes;
    });
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
        />
      </div>
      <div className="calendar">
        <Calendar onDateSelect={handleDateSelect} notes={allNotes} />
      </div>
    </div>
  );
};

export default HomePage;
