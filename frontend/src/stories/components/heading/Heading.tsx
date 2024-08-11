import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

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
  VariantProps<typeof variants>;

export const Heading: React.FC<HeadingProps> = ({
  size = 2,
  className,
  ...props
}) => {
  const HeaderTag: React.ElementType = `h${size}` as React.ElementType;
  return (
    <HeaderTag className={clsx(variants({ size }), className)} {...props} />
  );
};
