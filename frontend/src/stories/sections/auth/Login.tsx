import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";

export const containerVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "place-items-center",
  "justify-center",
  "gap-8",
]);

export const formVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "gap-2",
  "items-center",
]);

export const Login = () => {
  const containerClass = clsx(containerVariants());
  const formClass = clsx(formVariants());

  return (
    <div className={containerClass}>
      <h1>Logowanie</h1>
      <form className={formClass}>
        <Input size="medium" />
        <Input size="medium" />
        <Button size="medium" variant="primary" label="Zaloguj się" />
      </form>
    </div>
  );
};
