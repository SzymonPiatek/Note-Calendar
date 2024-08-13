import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";

export const containerVariants = cva(
  [
    "relative",
    "w-full",
    "h-full",
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
    "cursor-pointer",
  ],
  {
    variants: {
      isSameMonth: {
        true: [],
        false: [],
      },
      isSameDay: {
        true: [],
        false: [],
      },
      isWeekend: {
        true: [],
        false: [],
      },
      isPast: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      {
        isWeekend: false,
        isSameDay: false,
        isSameMonth: true,
        className: "bg-shadow-200 dark:bg-light-900",
      },
      {
        isWeekend: true,
        isSameDay: false,
        isSameMonth: true,
        className: "bg-shadow-300 dark:bg-light-700",
      },
      {
        isSameDay: true,
        className: "bg-primary-200 dark:bg-primary-800",
      },
      {
        isSameMonth: false,
        className: "opacity-30",
      },
      {
        isPast: true,
        className: "opacity-30 pointer-events-none cursor-not-allowed",
      },
    ],
  }
);

export const dotVariants = cva([
  "w-2",
  "h-2",
  "m-1",
  "absolute",
  "top-0",
  "right-0",
  "rounded-full",
  "bg-primary-600",
  "dark:bg-primary-300",
]);

export type CalendarDayProps = VariantProps<typeof containerVariants> & {
  number: number | string;
  weekday: string;
  isSameMonth: boolean;
  isSameDay: boolean;
  isWeekend: boolean;
  isPast: boolean;
  noted: boolean;
  onClick: () => void;
};

export const CalendarDay = ({
  number = 1,
  weekday = "Poniedzialek",
  isSameMonth = false,
  isSameDay = false,
  isWeekend = false,
  isPast = false,
  noted = false,
  onClick,
}: CalendarDayProps) => {
  const containerClass = clsx(
    containerVariants({ isSameMonth, isSameDay, isWeekend, isPast })
  );
  const dotClass = clsx(dotVariants());

  return (
    <div className={`calendar--day ${containerClass}`} onClick={onClick}>
      <Heading children={number} size={3} />
      <Heading children={weekday} size={6} />
      {noted && <div className={dotClass}></div>}
    </div>
  );
};
