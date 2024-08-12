import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";

export const containerVariants = cva(
  [
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
        className: "bg-tertiary-500 dark:bg-primary-800",
      },
      {
        isSameMonth: false,
        className: "opacity-50",
      },
    ],
  }
);

export type CalendarDayProps = VariantProps<typeof containerVariants> & {
  number: number | string;
  weekday: string;
  isSameMonth: boolean;
  isSameDay: boolean;
  isWeekend: boolean;
};

export const CalendarDay = ({
  number = 1,
  weekday = "Poniedzialek",
  isSameMonth = false,
  isSameDay = false,
  isWeekend = false,
}: CalendarDayProps) => {
  const containerClass = clsx(
    containerVariants({ isSameMonth, isSameDay, isWeekend })
  );

  return (
    <div className={`calendar--day ${containerClass}`}>
      <Heading children={number} size={3} />
      <Heading children={weekday} size={6} />
    </div>
  );
};
