import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../button/Button";

export const navbarVariants = cva([
  "flex",
  "bg-primary-700",
  "justify-between",
  "text-white",
  "h-12",
]);

export const sideVariants = cva(["p-2", "flex", "gap-2", "place-items-center"]);

export const Navbar = () => {
  const NavbarClass = clsx(navbarVariants());
  const SideClass = clsx(sideVariants());

  return (
    <nav className={NavbarClass}>
      <div className={SideClass}>LOGO</div>
      <div className={SideClass}>
        <Button children="Zarejestruj się" variant="primary" size="small" />
        <Button children="Zaloguj się" variant="primary" size="small" />
      </div>
    </nav>
  );
};
