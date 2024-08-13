import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";
import { Note as NoteType } from "../../../utils/modelsTypes";
import { IconButton } from "../button/IconButton";
import { Heading } from "../heading/Heading";

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
    "border-1",
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

type NoteStatus = "done" | "pending";

export type NoteProps = NoteVariants & {
  note: NoteType;
  handleDelete: () => void;
  handleStatus: () => void;
};

export const Note = ({ note, handleDelete, handleStatus }: NoteProps) => {
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

  const matchStatus: Record<NoteStatus, string> = {
    done: "Wykonano",
    pending: "W realizacji",
  };

  const statusName = note.status.name as NoteStatus;
  const statusText = matchStatus[statusName] || note.status.name;

  return (
    <div className={`note ${containerClass}`}>
      <Heading size={5} children={note.name} />
      <div className="flex justify-between gap-2">
        <Button
          label={statusText}
          size="medium"
          variant={statusName}
          onClick={handleStatus}
        />
        <IconButton
          icon="faXmark"
          size="medium"
          variant="outline"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
