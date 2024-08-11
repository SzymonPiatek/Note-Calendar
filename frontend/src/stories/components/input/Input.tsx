import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const containerVariants = cva([]);

export const inputVariants = cva(
  ["border", "rounded", "w-full", "bg-inherit"],
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

type InputVariants = VariantProps<typeof inputVariants>;

type InputProps = InputVariants & {
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

export const Input = ({
  size = "medium",
  disabled = false,
  required = false,
  ...props
}: InputProps) => {
  const containerClass = clsx(containerVariants());
  const inputClass = clsx(inputVariants({ size }));

  return (
    <div className={containerClass}>
      <input
        className={inputClass}
        disabled={disabled}
        required={required}
        {...(props as ComponentPropsWithoutRef<"input">)}
      />
    </div>
  );
};
