import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const containerVariants = cva(
  [
    "font-semibold",
    "inline-flex",
    "items-center",
    "justify-center",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "transition-colors",
    "disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        small: ["text-xs", "gap-2"],
        medium: ["text-sm", "gap-2.5"],
        large: ["text-sm", "gap-3"],
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
      small: ["text-xs", "py-1"],
      medium: ["text-sm", "py-1"],
      large: ["text-base", "py-0.5"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type LabelVariants = VariantProps<typeof containerVariants>;

type LabelProps = LabelVariants & {
  label?: string;
  icon?: string;
};

export const Label = ({ size = "medium", label, icon }: LabelProps) => {
  const containerClass = clsx(containerVariants({ size }));
  const iconClass = clsx(iconVariants({ size }));
  const labelClass = clsx(labelVariants({ size }));

  const thisIcon: IconDefinition | undefined =
    (Icons[icon as keyof typeof Icons] as IconDefinition) || Icons.faQuestion;

  if (!thisIcon) {
    console.warn(`Icon "${thisIcon}" not found`);
    return null;
  }
  
  return (
    <div className={containerClass}>
      {icon && <FontAwesomeIcon icon={thisIcon} className={iconClass} />}
      {label && <p className={labelClass}>{label}</p>}
    </div>
  );
};
