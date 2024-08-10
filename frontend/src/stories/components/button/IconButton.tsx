import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const buttonVariants = cva(
  [
    "font-semibold",
    "border",
    "rounded",
    "inline-flex",
    "items-center",
    "cursor-pointer",
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
          "shadow-sm",
          "bg-secondary-600",
          "text-white",
          "border-transparent",
          "hover:bg-secondary-500",
          "dark:bg-secondary-600",
          "dark:hover:bg-secondary-500",
          "dark:active:bg-secondary-500",
        ],
        outline: [
          "shadow-sm",
          "bg-transparent",
          "text-primary-500",
          "border-primary-500",
          "hover:bg-primary-100",
          "active:bg-primary-100",
        ],
        text: ["bg-transparent", "border-transparent"],
      },
      size: {
        small: ["px-2", "py-1", "gap-1"],
        medium: ["px-2.5", "py-1.5", "gap-2"],
        large: ["px-3", "py-2", "gap-2"],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [""],
      },
    },
  }
);

export const labelVariants = cva(["flex", "justify-center"], {
  variants: {
    size: {
      small: ["text-xs"],
      medium: ["text-sm"],
      large: ["text-sm"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const iconVariants = cva(["flex", "justify-center"], {
  variants: {
    size: {
      small: ["text-xs"],
      medium: ["text-sm"],
      large: ["text-sm"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

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
  icon?: string;
  label?: string;
};

export const IconButton = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  label,
  icon,
  ...props
}: ButtonOrLinkProps) => {
  const buttonClass = clsx(buttonVariants({ variant, size, disabled }));
  const iconClass = clsx(iconVariants({ size }));
  const labelClass = clsx(labelVariants({ size }));

  const thisIcon: IconDefinition | undefined =
    (Icons[icon as keyof typeof Icons] as IconDefinition) || Icons.faQuestion;

  if (!thisIcon) {
    console.warn(`Icon "${thisIcon}" not found`);
    return null;
  }

  if (props.href) {
    return (
      <a className={buttonClass} {...(props as ComponentPropsWithoutRef<"a">)}>
        {icon && <FontAwesomeIcon icon={thisIcon} className={iconClass} />}
        {label && <p className={labelClass}>{label}</p>}
      </a>
    );
  }
  return (
    <button
      className={buttonClass}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {icon && <FontAwesomeIcon icon={thisIcon} className={iconClass} />}
      {label && <p className={labelClass}>{label}</p>}
    </button>
  );
};
