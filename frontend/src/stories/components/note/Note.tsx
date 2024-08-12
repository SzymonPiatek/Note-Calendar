import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";
import { Note as NoteType } from "../../../utils/modelsTypes";

export const containerVariants = cva(
  [
    "w-full",
    "flex",
    "justify-between",
    "place-items-center",
    "gap-4",
    "py-2",
    "px-4",
    "rounded-xl",
    "border",
    "border-2",
    "shadow-sm",
    "border-black",
    "dark:border-white",
    "font-semibold",
  ],
  {
    variants: {
      variant: {
        important: ["bg-secondary-600", "dark:bg-primary-900"],
        common: ["bg-primary-300", "dark:bg-secondary-800"],
        default: ["bg-primary-300", "dark:bg-secondary-800"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type NoteVariants = VariantProps<typeof containerVariants>;

export type NoteProps = NoteVariants & { note: NoteType };

export const Note = ({ note }: NoteProps) => {
  const validVariants: NoteVariants["variant"][] = [
    "important",
    "common",
    "default",
  ];

  const variant: NoteVariants["variant"] = validVariants.includes(
    note.level.name as NoteVariants["variant"]
  )
    ? (note.level.name as NoteVariants["variant"])
    : "default";

  const containerClass = clsx(containerVariants({ variant }));

  return (
    <div className={containerClass}>
      <div>{note.name}</div>
      <Button label={note.status.name} size="medium" variant="secondary" />
    </div>
  );
};
