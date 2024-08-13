import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Note } from "./Note";
import { Heading } from "../heading/Heading";
import { BetterNoteType } from "../../../utils/modelsTypes";
import { format } from "date-fns";
import { IconButton } from "../button/IconButton";

export const containerVariants = cva([
  "w-full",
  "h-full",
  "flex",
  "flex-col",
  "gap-4",
  "p-4",
  "rounded",
  "border",
  "border-2",
  "shadow-sm",
  "border-black",
  "dark:border-white",
  "font-semibold",
]);

type NotesVariants = VariantProps<typeof containerVariants>;

export type NotesProps = NotesVariants & {
  notes: BetterNoteType[];
  handleDelete: (id: number) => void;
  handleStatus: (id: number) => void;
  handleAddNote: () => void;
  date: Date;
};

export const Notes = ({
  notes = [
    {
      name: "Zrób zakupy",
      description: "Marchewka, Pomidory, Coca-Cola",
      startDate: new Date("2024-08-13T23:59:00.858Z"),
      endDate: new Date("2024-08-13T23:59:00.858Z"),
      status: {
        id: 1,
        value: "PENDING",
        displayName: "Do zrobienia",
      },
      level: {
        id: 3,
        value: "HIGH",
        displayName: "Wysoki",
      },
      userId: 1,
    },
    {
      name: "Naucz się na sprawdzian",
      description: "To jest bardzo ważne",
      startDate: new Date("2024-08-13T23:59:00.858Z"),
      endDate: new Date("2024-08-13T23:59:00.858Z"),
      status: {
        id: 1,
        value: "DONE",
        displayName: "Wykonano",
      },
      level: {
        id: 3,
        value: "HIGH",
        displayName: "Wysoki",
      },
      userId: 1,
    },
  ],
  date = new Date(),
  handleDelete,
  handleStatus,
  handleAddNote,
}: NotesProps) => {
  const containerClass = clsx(containerVariants());

  const formattedDate = format(date, "dd.MM.yyyy");

  const sortedNotes = notes.sort((a, b) => a.status.id - b.status.id);

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-end">
        <Heading children="Notatki" size={2} />
        <div className="flex gap-4 items-end">
          <Heading children={formattedDate} size={4} />
          <IconButton
            icon="faPlus"
            variant="circle"
            size="large"
            onClick={() => handleAddNote()}
          />
        </div>
      </div>
      <hr />
      {notes.length === 0 && (
        <div className="flex flex-col items-center py-2">
          <Heading children="Brak notatek" size={4} />
        </div>
      )}
      {notes.length > 0 && (
        <div className="notes--list gap-2 overflow-y-auto">
          {sortedNotes.map((note: BetterNoteType) => (
            <Note
              key={note.id}
              note={note}
              handleDelete={() => handleDelete(note.id!)}
              handleStatus={() => handleStatus(note.id!)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
