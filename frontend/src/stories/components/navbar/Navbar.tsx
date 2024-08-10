import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";
import { IconButton } from "../button/IconButton";

export const navbarVariants = cva([
  "flex",
  "bg-primary-700",
  "justify-between",
  "text-white",
  "h-12",
]);

export const sideVariants = cva(["p-2", "flex", "gap-2", "place-items-center"]);

type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const NavbarClass = clsx(navbarVariants());
  const SideClass = clsx(sideVariants());

  return (
    <nav className={NavbarClass}>
      <div className={SideClass}>Example</div>
      <div className={SideClass}>
        <IconButton
          icon={isDarkMode ? "faMoon" : "faSun"}
          variant="text"
          size="large"
          onClick={toggleDarkMode}
        />
        <Button label="Zarejestruj się" variant="primary" size="medium" />
        <Button label="Zaloguj się" variant="primary" size="medium" />
      </div>
    </nav>
  );
};
