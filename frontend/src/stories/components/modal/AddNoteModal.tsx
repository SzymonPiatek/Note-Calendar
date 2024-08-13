import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";
import { IconButton } from "../button/IconButton";

export const containerVariants = cva([
  "rounded-xl",
  "border",
  "border-2",
  "p-4",
  "gap-4",
  "flex",
  "flex-col",
  "bg-background-300",
  "dark:bg-background-900",
]);

type ModalVariants = VariantProps<typeof containerVariants>;

type ModalProps = ModalVariants & {
  handleAddNote: () => void;
};

export const AddNoteModal = ({ handleAddNote }: ModalProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={`modal--container ${containerClass}`}>
      <div className="flex justify-between items-end">
        <Heading children="Dodaj notatkę" size={2} />
        <IconButton
          icon="faXmark"
          variant="circle"
          size="large"
          onClick={handleAddNote}
        />
      </div>
      <hr />
      <div></div>
    </div>
  );
};
