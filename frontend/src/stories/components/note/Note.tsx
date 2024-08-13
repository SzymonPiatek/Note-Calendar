import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";
import { BetterNoteType } from "../../../utils/modelsTypes";
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
    "bg-secondary-400",
    "dark:bg-secondary-800",
  ],
  {
    variants: {
      level: {
        low: [],
        medium: [],
        high: [],
      },
      status: {
        pending: [],
        done: ["opacity-50"],
      },
      category: {
        school: [],
        work: [],
        private: [],
      },
    },
  }
);

type NoteVariants = VariantProps<typeof containerVariants>;

export type NoteProps = NoteVariants & {
  note: BetterNoteType;
  handleDelete: () => void;
  handleStatus: () => void;
};

export const Note = ({
  note = {
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
    category: {
      id: 1,
      value: "SCHOOL",
      displayName: "Szkoła",
    },
    userId: 1,
  },
  handleDelete,
  handleStatus,
}: NoteProps) => {
  const status = note.status.value.toLowerCase() as "pending" | "done";
  const level = note.level.value.toLowerCase() as "low" | "medium" | "high";
  const category = note.category.value.toLowerCase() as
    | "school"
    | "work"
    | "private";

  const containerClass = clsx(containerVariants({ status, level, category }));

  return (
    <div className={`note ${containerClass}`}>
      <Heading size={5} children={note.name} />
      <div className="flex justify-between gap-2 items-center">
        <Button
          label={note.status.displayName}
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
