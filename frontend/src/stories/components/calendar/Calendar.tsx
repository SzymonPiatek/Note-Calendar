import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useMemo, useState } from "react";
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
  getDay,
  isBefore,
  startOfDay,
} from "date-fns";
import { pl } from "date-fns/locale";
import { Heading } from "../heading/Heading";
import { IconButton } from "../button/IconButton";
import { CalendarDay } from "./CalendarDay";
import { BetterNoteType } from "../../../utils/modelsTypes";

export const containerVariants = cva([
  "w-full",
  "max-w-4xl",
  "p-4",
  "gap-4",
  "flex",
  "flex-col",
  "border",
  "border-2",
  "rounded",
]);

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  notes: BetterNoteType[];
}

export const Calendar = ({ onDateSelect, notes = [] }: CalendarProps) => {
  const containerClass = clsx(containerVariants());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const notesDates = useMemo(() => {
    const dateMap = new Set<string>();
    notes.forEach((note) => {
      const noteDate = startOfDay(new Date(note.startDate));
      dateMap.add(format(noteDate, "yyyy-MM-dd"));
    });
    return dateMap;
  }, [notes]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (date: Date) => {
    onDateSelect(date);
  };

  const renderDates = () => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
    const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    const daysMap = {
      Monday: "Poniedziałek",
      Tuesday: "Wtorek",
      Wednesday: "Środa",
      Thursday: "Czwartek",
      Friday: "Piątek",
      Saturday: "Sobota",
      Sunday: "Niedziela",
    };

    return (
      <>
        {dates.map((date) => {
          const dayNumber = format(date, "d");
          const dayOfWeek = format(date, "EEEE") as keyof typeof daysMap;
          const translatedDay = daysMap[dayOfWeek];

          const isTheSameMonth = isSameMonth(date, currentMonth);
          const isTheSameDay = isSameDay(date, new Date());
          const isWeekend = getDay(date) === 0 || getDay(date) === 6;
          const isPast = isBefore(startOfDay(date), startOfDay(new Date()));

          const dateKey = format(startOfDay(date), "yyyy-MM-dd");

          return (
            <CalendarDay
              number={dayNumber}
              weekday={translatedDay}
              isSameMonth={isTheSameMonth}
              isSameDay={isTheSameDay}
              isWeekend={isWeekend}
              isPast={isPast}
              key={date.toString()}
              onClick={() => handleDayClick(date)}
              noted={notesDates.has(dateKey)}
            />
          );
        })}
      </>
    );
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
      <div className="calendar--days">{renderDates()}</div>
    </div>
  );
};
