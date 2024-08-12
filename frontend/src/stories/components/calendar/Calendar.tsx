import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { pl } from "date-fns/locale";
import { Heading } from "../heading/Heading";
import { IconButton } from "../button/IconButton";
import { CalendarDay } from "./CalendarDay";

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

export const calendarVariants = cva(["flex", "flex-col", "gap-2"]);

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
      <div className={calendarClass}>
        <div className="calendar--days">
          {daysOfWeek.map((day) => (
            <Heading key={day} size={4}>
              {day}
            </Heading>
          ))}
        </div>
        <div className="calendar--days">
          <CalendarDay number={1} weekday={"Wtorek"} />
          <CalendarDay number={2} weekday={"Środa"} />
        </div>
      </div>
    </div>
  );
};
