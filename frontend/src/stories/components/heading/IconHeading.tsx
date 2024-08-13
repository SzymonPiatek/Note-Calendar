import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const variants = cva(["font-semibold"], {
  variants: {
    size: {
      1: "text-4xl",
      2: "text-2xl",
      3: "text-xl",
      4: "text-lg",
      5: "text-base",
      6: "text-sm",
    },
  },
  defaultVariants: {
    size: 2,
  },
});

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof variants> & {
    children?: never;
    icon: string;
  };

export const IconHeading: React.FC<HeadingProps> = ({
  size = 2,
  className,
  icon = "faCoffee",
  ...props
}) => {
  const HeaderTag: React.ElementType = `h${size}` as React.ElementType;

  const thisIcon: IconDefinition | undefined =
    (Icons[icon as keyof typeof Icons] as IconDefinition) || Icons.faQuestion;

  if (!thisIcon) {
    console.warn(`Icon "${thisIcon}" not found`);
    return null;
  }

  return (
    <HeaderTag className={clsx(variants({ size }), className)} {...props}>
      {icon && <FontAwesomeIcon icon={thisIcon} />}
    </HeaderTag>
  );
};
