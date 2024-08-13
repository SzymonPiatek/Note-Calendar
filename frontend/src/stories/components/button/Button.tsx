import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const buttonVariants = cva(
  [
    "font-semibold",
    "border",
    "rounded",
    "inline-flex",
    "items-center",
    "cursor-pointer",
    "justify-center",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "transition-colors",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "shadow-sm",
          "bg-primary-700",
          "text-white",
          "border-transparent",
          "hover:bg-primary-800",
          "active:bg-primary-900",
        ],
        secondary: [
          "shadow-sm",
          "bg-quaternary-600",
          "text-white",
          "border-transparent",
          "hover:bg-quaternary-500",
        ],
        outline: [
          "shadow-sm",
          "bg-transparent",
          "text-primary-500",
          "border-primary-500",
          "hover:bg-primary-100",
          "active:bg-primary-100",
        ],
        done: [
          "shadow-sm",
          "bg-done-700",
          "hover:bg-done-800",
          "active:bg-done-900",
        ],
        pending: [
          "shadow-sm",
          "bg-pending-600",
          "hover:bg-pending-700",
          "active:bg-pending-800",
        ],
        text: ["bg-transparent", "border-transparent"],
      },
      size: {
        small: ["text-xs", "px-2", "py-1"],
        medium: ["text-sm", "px-2.5", "py-1.5"],
        large: ["text-sm", "px-3", "py-2"],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [],
      },
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVariants & {
    href?: never;
    children?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<"a"> &
  ButtonVariants & {
    href?: string;
    children?: never;
  };

type ButtonOrLinkProps = (ButtonProps | AnchorProps) & {
  label: string;
};

export const Button = ({
  variant = "primary",
  size = "medium",
  label,
  disabled = false,
  ...props
}: ButtonOrLinkProps) => {
  const buttonClass = clsx(buttonVariants({ variant, size, disabled }));

  if (props.href) {
    return (
      <a className={buttonClass} {...(props as ComponentPropsWithoutRef<"a">)}>
        {label}
      </a>
    );
  }
  return (
    <button
      className={buttonClass}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {label}
    </button>
  );
};
