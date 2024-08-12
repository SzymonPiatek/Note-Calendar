import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";

export const containerVariants = cva([
  "w-full",
  "px-2",
  "py-2",
  "gap-2",
  "flex",
  "flex-col",
  "items-left",
  "justify-between",
  "border",
  "border-2",
  "rounded",
  "overflow-hidden",
]);

export type CalendarDayProps = VariantProps<typeof containerVariants> & {
  number: number | string;
  weekday: string;
};

export const CalendarDay = ({
  number = 1,
  weekday = "Poniedzialek",
}: CalendarDayProps) => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={`calendar--day ${containerClass}`}>
      <Heading children={number} size={3} />
      <Heading children={weekday} size={6} />
    </div>
  );
};
