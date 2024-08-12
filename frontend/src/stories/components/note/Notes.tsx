import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Note } from "./Note";
import { Heading } from "../heading/Heading";

export const containerVariants = cva([
  "w-full",
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

export type NotesProps = NotesVariants & {
  notes: {
    variant: "common" | "important" | "school" | "work";
    label: string;
    buttonLabel: string;
  }[];
};

const exampleNotes = [
  { variant: "common", label: "Zrób to", buttonLabel: "Do zrobienia" },
  { variant: "important", label: "Zrób to", buttonLabel: "Do zrobienia" },
  { variant: "school", label: "Zrób to", buttonLabel: "Do zrobienia" },
];

export const Notes = ({ notes = exampleNotes }: NotesProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={containerClass}>
      <Heading children="Notatki" size={2} />
      {notes.map((note) => (
        <Note
          key={note.label}
          variant={note.variant}
          label={note.label}
          buttonLabel={note.buttonLabel}
        />
      ))}
    </div>
  );
};
