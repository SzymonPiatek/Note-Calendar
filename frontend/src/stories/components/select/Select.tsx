import { ComponentPropsWithoutRef } from "react";
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

type SelectVariants = VariantProps<typeof selectVariants>;

type SelectProps = SelectVariants & {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  const containerClass = clsx(containerVariants());
  const selectClass = clsx(selectVariants({ size }));
  const labelClass = clsx(labelVariants({ size }));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={containerClass}>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required && <span className="text-primary-500">*</span>}
      </label>
      <select
        className={selectClass}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        onChange={handleChange}
        {...(props as ComponentPropsWithoutRef<"select">)}
      >
        <option value="" disabled>
          Wybierz {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
