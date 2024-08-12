import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Note } from "./Note";
import { Heading } from "../heading/Heading";

export const containerVariants = cva([
  "w-full",
  "h-full",
  "flex",
  "flex-col",
  "gap-4",
  "p-4",
  "rounded-xl",
  "border",
  "border-2",
  "shadow-sm",
  "border-black",
  "dark:border-white",
  "font-semibold",
]);

type NotesVariants = VariantProps<typeof containerVariants>;

type note = {
  variant: "common" | "important" | "school" | "work";
  label: string;
  buttonLabel: string;
};

export type NotesProps = NotesVariants & {
  notes: note[];
};

const exampleNotes: note[] = [
  { variant: "common", label: "Zrób to", buttonLabel: "Do zrobienia" },
  { variant: "important", label: "Zrób to", buttonLabel: "Wykonano" },
  { variant: "school", label: "Zrób to", buttonLabel: "Do zrobienia" },
  { variant: "work", label: "Zrób to", buttonLabel: "Wykonano" },
];

export const Notes = ({ notes = exampleNotes }: NotesProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={containerClass}>
      <Heading children="Notatki" size={2} />
      <hr />
      {notes && (
        <>
          {notes.map((note) => (
            <Note
              key={note.label}
              variant={note.variant}
              label={note.label}
              buttonLabel={note.buttonLabel}
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
