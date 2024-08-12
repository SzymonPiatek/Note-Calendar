import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Note } from "./Note";
import { Heading } from "../heading/Heading";
import { Note as NoteType } from "../../../utils/modelsTypes";

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
};

export const Notes = ({ notes, handleDelete }: NotesProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={containerClass}>
      <Heading children="Notatki" size={2} />
      <hr />
      {notes && (
        <>
          {notes.map((note: any) => (
            <Note
              key={note.label}
              note={note}
              handleDelete={() => handleDelete(note.id)}
            />
          ))}
        </>
      )}
      {notes.length === 0 && (
        <div className="flex justify-center py-4">
          <Heading children="Brak notatek" size={4} />
        </div>
      )}
    </div>
  );
};
