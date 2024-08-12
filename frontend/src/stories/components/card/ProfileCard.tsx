import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { User } from "../../../utils/modelsTypes";
import { Label } from "../label/Label";
import { Heading } from "../heading/Heading";

export const containerVariants = cva([
  "flex-1",
  "grid",
  "grid-cols-[auto_1fr]",
  "p-4",
  "rounded-xl",
  "border",
  "border-2",
  "border-black",
  "bg-light-600",
  "dark:bg-light-900",
  "dark:border-white",
]);

export const sideVariants = cva([
  "flex",
  "flex-col",
  "items-start",
  "p-4",
  "flex-shrink-0",
  "justify-between",
]);

export const imageVariants = cva([
  "bg-shadow-400",
  "h-20",
  "w-20",
  "rounded-full",
  "border",
  "border-2",
]);

type ProfileCardVariants = VariantProps<typeof containerVariants>;

type ProfileCardProps = ProfileCardVariants & {
  user: User;
};

const exampleUser: User = {
  firstName: "Jan",
  lastName: "Kowalski",
  email: "jan.kowalski@gmail.com",
  isActive: true,
  isSuperuser: false,
  createdAt: new Date("2024-08-11T20:52:01.858Z"),
  updatedAt: new Date("2024-08-11T20:52:01.858Z"),
};

export const ProfileCard = ({ user = exampleUser }: ProfileCardProps) => {
  const containerClass = clsx(containerVariants());
  const sideClass = clsx(sideVariants());
  const imageClass = clsx(imageVariants());

  return (
    <div className={containerClass}>
      <div className={sideClass}>
        <div className={imageClass}></div>
      </div>
      <div className={sideClass}>
        <Heading children={`${user.firstName} ${user.lastName}`} size={2} />
        <div className="flex gap-4">
          <Label label={user.email} icon="faEnvelope" size="medium" />
          <Label
            label={user.isSuperuser ? "Administrator" : "Użytkownik"}
            icon={user.isSuperuser ? "faUserTie" : "faUser"}
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};
