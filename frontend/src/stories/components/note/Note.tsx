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
    "font-semibold",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        important: [
          "bg-important-700",
          "hover:bg-important-800",
          "active:bg-important-900",
          "dark:bg-important-800",
          "dark:hover:bg-important-900",
          "dark:active:bg-important-950",
        ],
        common: [
          "bg-shadow-300",
          "hover:bg-shadow-400",
          "active:bg-shadow-600",
          "dark:bg-light-600",
          "dark:hover:bg-light-700",
          "dark:active:bg-light-800",
        ],
        default: ["bg-primary-300", "dark:bg-secondary-800"],
      },
      status: {
        done: ["opacity-60"],
        pending: [],
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

  const validStatuses: NoteStatus[] = ["done", "pending"];
  const status: NoteStatus = validStatuses.includes(
    note.status.name as NoteStatus
  )
    ? (note.status.name as NoteStatus)
    : "pending";

  const containerClass = clsx(containerVariants({ variant, status }));

  const matchStatus: Record<NoteStatus, string> = {
    done: "Wykonano",
    pending: "Do zrobienia",
  };

  const statusText = matchStatus[status];

  return (
    <div className={`note ${containerClass}`}>
      <Heading size={5} children={note.name} />
      <div className="flex justify-between gap-2 items-center">
        <Button
          label={statusText}
          size="medium"
          variant={status}
          onClick={handleStatus}
        />
        <IconButton
          icon="faXmark"
          size="large"
          variant="circle"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
