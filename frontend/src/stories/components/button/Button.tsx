import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const variants = cva(["border", "border-2", "border-black", "p-2"]);

type ButtonVariants = VariantProps<typeof variants>;

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVariants & {
    href?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<"a"> &
  ButtonVariants & {
    href?: string;
  };

type ButtonOrLinkProps = ButtonProps | AnchorProps;

export const Button = ({ ...props }: ButtonOrLinkProps) => {
  const className = clsx(variants());
  if (props.href) {
    return (
      <a className={className} {...(props as ComponentPropsWithoutRef<"a">)} />
    );
  }
  return (
    <button
      className={className}
      {...(props as ComponentPropsWithoutRef<"button">)}
    />
  );
};
