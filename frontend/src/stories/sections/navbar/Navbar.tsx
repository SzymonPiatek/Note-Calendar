import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../../components/button/Button";
import { IconButton } from "../../components/button/IconButton";
import { User } from "../../../utils/modelsTypes";

export const navbarVariants = cva([
  "shadow-sm",
  "h-full",
  "flex",
  "bg-shadow-900",
  "justify-between",
  "text-white",
  "dark:bg-shadow-700",
]);

export const sideVariants = cva(["p-2", "flex", "gap-2", "place-items-center"]);

type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  handleLogout: () => void;
};

export const Navbar = ({
  isDarkMode,
  toggleDarkMode,
  user,
  handleLogout,
}: NavbarProps) => {
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
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            {user.isSuperuser && (
              <IconButton
                label="Panel Administratora"
                icon="faUserTie"
                variant="outline"
                size="medium"
                href="/admin"
              />
            )}
            <Button
              label={`${user.firstName} ${user.lastName}`}
              variant="primary"
              size="medium"
              href="/profile"
            />
            <Button
              label="Wyloguj się"
              variant="primary"
              size="medium"
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </nav>
  );
};
