import { cva } from "class-variance-authority";
import clsx from "clsx";
import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { pl } from "date-fns/locale";
import { Heading } from "../heading/Heading";
import { IconButton } from "../button/IconButton";

export const containerVariants = cva([
  "w-full",
  "p-4",
  "gap-4",
  "flex",
  "flex-col",
  "justify-between",
  "border",
  "border-2",
  "rounded",
]);

export const calendarVariants = cva(["grid gap-2"]);

export const Calendar = () => {
  const containerClass = clsx(containerVariants());
  const calendarClass = clsx(calendarVariants());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className={containerClass}>
      <div className="flex justify-between gap-2">
        <Heading
          size={2}
          children={capitalizeFirstLetter(
            format(currentMonth, "LLLL yyyy", { locale: pl })
          )}
        />
        <div className="flex gap-2">
          <IconButton
            icon="faArrowLeft"
            size="small"
            onClick={handlePrevMonth}
          />
          <IconButton
            icon="faArrowRight"
            size="small"
            onClick={handleNextMonth}
          />
        </div>
      </div>
      <hr />
      <div className={`calendar ${calendarClass}`}>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    </div>
  );
};
