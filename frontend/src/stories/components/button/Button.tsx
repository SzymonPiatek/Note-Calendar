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
    "shadow-sm",
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
          "bg-primary-600",
          "text-white",
          "border-transparent",
          "hover:bg-primary-500",
          "active:bg-primary-400",
          "dark:bg-primary-600",
          "dark:hover:bg-primary-500",
          "dark:active:bg-primary-300",
        ],
        secondary: [
          "bg-secondary-600",
          "text-white",
          "border-transparent",
          "hover:bg-secondary-500",
          "dark:bg-secondary-600",
          "dark:hover:bg-secondary-500",
          "dark:active:bg-secondary-500",
        ],
        outline: [
          "bg-transparent",
          "text-primary-500",
          "border-primary-500",
          "hover:bg-primary-100",
          "active:bg-primary-100",
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
        false: [""],
      },
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVariants & {
    href?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<"a"> &
  ButtonVariants & {
    href?: string;
  };

type ButtonOrLinkProps = ButtonProps | AnchorProps;

export const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  ...props
}: ButtonOrLinkProps) => {
  const buttonClass = clsx(buttonVariants({ variant, size, disabled }));

  if (props.href) {
    return (
      <a
        className={buttonClass}
        {...(props as ComponentPropsWithoutRef<"a">)}
      />
    );
  }
  return (
    <button
      className={buttonClass}
      {...(props as ComponentPropsWithoutRef<"button">)}
    />
  );
};
