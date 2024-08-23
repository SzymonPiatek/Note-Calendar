import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { Heading } from "../../components/heading/Heading";

export const containerVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "place-items-center",
  "justify-center",
  "gap-8",
  "p-12",
  "rounded-xl",
  "border",
  "border-2",
  "border-black",
  "bg-light-600",
  "dark:bg-light-900",
  "dark:border-white",
]);

export const formVariants = cva([
  "w-full",
  "flex",
  "flex-col",
  "gap-8",
  "items-center",
]);

export type LoginProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  emailState: React.Dispatch<React.SetStateAction<string>>;
  passwordState: React.Dispatch<React.SetStateAction<string>>;
};

export const Login = ({ onSubmit, emailState, passwordState }: LoginProps) => {
  const containerClass = clsx(containerVariants());
  const formClass = clsx(formVariants());

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailState(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    passwordState(e.target.value);
  };

  return (
    <div className={containerClass}>
      <Heading size={2}>Logowanie</Heading>
      <form className={formClass} onSubmit={onSubmit}>
        <Input
          size="medium"
          type="text"
          label="e-mail"
          onChange={handleEmailChange}
        />
        <Input
          size="medium"
          type="password"
          label="password"
          onChange={handlePasswordChange}
        />
        <Button size="large" variant="primary" label="Zaloguj się" />
      </form>
    </div>
  );
};
