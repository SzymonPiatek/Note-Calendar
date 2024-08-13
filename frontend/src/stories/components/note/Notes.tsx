import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Note } from "./Note";
import { Heading } from "../heading/Heading";
import { Note as NoteType } from "../../../utils/modelsTypes";
import { format } from "date-fns";

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
  notes: NoteType[] | [];
  handleDelete: (id: number) => void;
  handleStatus: (id: number) => void;
  date: Date;
};

export const Notes = ({
  notes,
  handleDelete,
  date,
  handleStatus,
}: NotesProps) => {
  const containerClass = clsx(containerVariants());

  const formattedDate = format(date, "dd.MM.yyyy");

  const sortedNotes = notes.sort((a, b) => {
    if (a.status.name === "pending" && b.status.name === "done") {
      return -1;
    } else if (a.status.name === "done" && b.status.name === "pending") {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-end">
        <Heading children="Notatki" size={2} />
        <Heading children={formattedDate} size={4} />
      </div>
      <hr />
      {notes.length === 0 && (
        <div className="flex flex-col items-center py-2">
          <Heading children="Brak notatek" size={4} />
        </div>
      )}
      {notes.length > 0 && (
        <div className="notes--list gap-2 overflow-y-auto">
          {sortedNotes.map((note: NoteType) => (
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
