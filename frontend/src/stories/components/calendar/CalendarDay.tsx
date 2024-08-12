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
        true: ["bg-shadow-200", "dark:bg-light-900"],
        false: [
          "border-shadow-300",
          "text-shadow-300",
          "dark:border-light-700",
          "dark:text-light-700",
        ],
      },
      isSameDay: {
        true: ["bg-quaternary-200", "dark:bg-light-500"],
        false: [],
      },
    },
  }
);

export type CalendarDayProps = VariantProps<typeof containerVariants> & {
  number: number | string;
  weekday: string;
  isSameMonth: boolean;
  isSameDay: boolean;
};

export const CalendarDay = ({
  number = 1,
  weekday = "Poniedzialek",
  isSameMonth = false,
  isSameDay = false,
}: CalendarDayProps) => {
  const containerClass = clsx(containerVariants({ isSameMonth, isSameDay }));

  return (
    <div className={`calendar--day ${containerClass}`}>
      <Heading children={number} size={3} />
      <Heading children={weekday} size={6} />
    </div>
  );
};
