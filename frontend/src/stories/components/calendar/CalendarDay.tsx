import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";

export const containerVariants = cva([
  "w-full",
  "px-1",
  "py-2",
  "gap-4",
  "flex",
  "flex-col",
  "items-center",
  "justify-between",
  "border",
  "border-2",
  "rounded",
]);

export type CalendarDayProps = VariantProps<typeof containerVariants> & {
  number: number;
  weekday: string;
};

export const CalendarDay = ({
  number = 1,
  weekday = "Poniedzialek",
}: CalendarDayProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={containerClass}>
      <Heading children={number} size={2} />
      <Heading children={weekday} size={6} />
    </div>
  );
};
