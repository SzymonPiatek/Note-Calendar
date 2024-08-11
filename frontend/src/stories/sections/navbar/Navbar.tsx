import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../../components/button/Button";
import { IconButton } from "../../components/button/IconButton";

export const navbarVariants = cva([
  "h-full",
  "flex",
  "bg-tertiary-900",
  "justify-between",
  "text-white",
  "dark:bg-shadow-500",
]);

export const sideVariants = cva(["p-2", "flex", "gap-2", "place-items-center"]);

type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const navbarClass = clsx(navbarVariants());
  const sideClass = clsx(sideVariants());

  return (
    <nav className={navbarClass}>
      <div className={sideClass}>
        <Button variant="text" size="medium" href="/" label="Example" />
      </div>
      <div className={sideClass}>
        <IconButton
          icon={isDarkMode ? "faMoon" : "faSun"}
          variant="text"
          size="large"
          onClick={toggleDarkMode}
        />
        <Button
          label="Zarejestruj się"
          variant="primary"
          size="medium"
          href="/register"
        />
        <Button
          label="Zaloguj się"
          variant="primary"
          size="medium"
          href="/login"
        />
      </div>
    </nav>
  );
};
