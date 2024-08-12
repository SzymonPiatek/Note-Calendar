import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";

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
        important: ["bg-primary-700"],
        school: ["bg-secondary-400"],
        work: ["bg-tertiary-700"],
        common: ["bg-quaternary-600"],
      },
    },
  }
);

type NoteVariants = VariantProps<typeof containerVariants>;

export type NoteProps = NoteVariants & {
  label: string;
  buttonLabel: string;
};

export const Note = ({
  variant = "common",
  label = "Zrób zakupy w Stokrotce",
  buttonLabel = "Wykonano",
}: NoteProps) => {
  const containerClass = clsx(containerVariants({ variant }));

  return (
    <div className={containerClass}>
      <div>{label}</div>
      <Button label={buttonLabel} size="medium" variant="primary" />
    </div>
  );
};
