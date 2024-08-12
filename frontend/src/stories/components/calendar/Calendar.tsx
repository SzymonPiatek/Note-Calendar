import { cva } from "class-variance-authority";
import clsx from "clsx";
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

export const Calendar = () => {
  const containerClass = clsx(containerVariants());

  return (
    <div className={containerClass}>
      <div className="flex justify-between flex-1 gap-2">
        <Heading size={2} children="Sierpień" />
        <div className="flex gap-2">
          <IconButton icon="faArrowLeft" size="small" />
          <IconButton icon="faArrowRight" size="small" />
        </div>
      </div>
      <hr />
      <div></div>
    </div>
  );
};
