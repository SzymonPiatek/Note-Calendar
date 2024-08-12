import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Heading } from "../heading/Heading";
import { IconHeading } from "../heading/IconHeading";

export const containerVariants = cva([
  "max-w-xs",
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "p-4",
  "rounded-xl",
  "border",
  "border-2",
  "border-black",
  "bg-light-600",
  "dark:bg-light-900",
  "dark:border-white",
]);

type DateCardVariants = VariantProps<typeof containerVariants>;

type DateCardProps = DateCardVariants;

export const DateCard = ({}: DateCardProps) => {
  const containerClass = clsx(containerVariants());

  const today = new Date();
  const formattedToday = format(new Date(today), "dd MMMM yyyy", {
    locale: pl,
  });

  return (
    <div className={containerClass}>
      <IconHeading icon="faCalendarAlt" size={1} />
      <Heading children={formattedToday} size={2} />
    </div>
  );
};
