import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const containerVariants = cva(["w-full relative"]);

export const inputVariants = cva(
  [
    "w-full",
    "border",
    "rounded",
    "bg-inherit",
    "border-black",
    "dark:border-white",
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

type InputVariants = VariantProps<typeof inputVariants>;

type InputProps = InputVariants & {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
};

export const Input = ({
  label,
  name,
  size = "medium",
  disabled = false,
  required = false,
  type = "text",
  value,
  onChange,
  ...props
}: InputProps) => {
  const containerClass = clsx(containerVariants());
  const inputClass = clsx(inputVariants({ size }));
  const labelClass = clsx(labelVariants({ size }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={containerClass}>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required && <span className="text-primary-700">*</span>}
      </label>
      <input
        className={inputClass}
        disabled={disabled}
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        {...(props as ComponentPropsWithoutRef<"input">)}
      />
    </div>
  );
};
