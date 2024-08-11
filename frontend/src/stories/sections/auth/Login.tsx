import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { Heading } from "../../components/header/Heading";

export const containerVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "place-items-center",
  "justify-center",
  "gap-8",
  "border",
  "border-2",
  "border-black",
  "dark:border-white",
  "rounded-xl",
  "p-12",
  "bg-light-900",
]);

export const formVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "gap-8",
  "items-center",
]);

export const Login = () => {
  const containerClass = clsx(containerVariants());
  const formClass = clsx(formVariants());

  return (
    <div className={containerClass}>
      <Heading children="Logowanie" size={2} />
      <form className={formClass}>
        <Input size="medium" type="text" label="e-mail" />
        <Input size="medium" type="password" label="password" />
        <Button size="large" variant="primary" label="Zaloguj się" />
      </form>
    </div>
  );
};
