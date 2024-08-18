import { useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const containerVariants = cva(["w-full relative"]);

export const selectVariants = cva(
  [
    "w-full",
    "border",
    "rounded",
    "bg-inherit",
    "border-black",
    "dark:border-white",
    "cursor-pointer",
    "text-base",
    "px-3.5",
    "py-1",
  ],
  {
    variants: {
      size: {
        small: ["text-xs", "px-3", "py-1"],
        medium: ["text-base", "px-3.5", "py-1"],
        large: ["text-lg", "px-4", "py-1"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const labelVariants = cva(
  ["bg-inherit", "text-shadow-900", "dark:text-light-100"],
  {
    variants: {
      size: {
        small: ["text-xs", "px-1"],
        medium: ["text-sm", "px-1"],
        large: ["text-lg", "px-1"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const dropdownVariants = cva([
  "absolute",
  "w-full",
  "mt-1",
  "border",
  "border-black",
  "rounded-lg",
  "shadow-lg",
  "z-10",
  "bg-background-200",
  "dark:bg-background-700",
]);

export const optionVariants = cva([
  "px-3",
  "py-2",
  "hover:bg-background-300",
  "active:bg-background-400",
  "dark:hover:bg-background-800",
  "dark:active:bg-background-900",
  "cursor-pointer",
  "rounded-lg",
]);

type SelectVariants = VariantProps<typeof selectVariants>;

type SelectProps = SelectVariants & {
  label: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  options: { value: string; label: string }[];
};

export const Select = ({
  label,
  name,
  size = "medium",
  disabled = false,
  required = false,
  value,
  onChange,
  options,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const containerClass = clsx(containerVariants());
  const selectClass = clsx(selectVariants({ size }));
  const labelClass = clsx(labelVariants({ size }));
  const dropdownClass = clsx(dropdownVariants());
  const optionClass = clsx(optionVariants());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={containerClass} ref={containerRef}>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required && <span className="text-primary-700">*</span>}
      </label>
      <div
        className={`${selectClass} ${isOpen ? "bg-background-200 dark:bg-background-700" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        {...(props as any)}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          `Wybierz ${label.toLowerCase()}`}
      </div>
      {isOpen && (
        <div className={dropdownClass}>
          {options.map((option) => (
            <div
              key={option.value}
              className={optionClass}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
