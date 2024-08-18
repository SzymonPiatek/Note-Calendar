import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Heading } from "../heading/Heading";
import { IconButton } from "../button/IconButton";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import {
  Category,
  categoryDisplay,
  Level,
  levelDisplay,
  Status,
  statusDisplay,
} from "../../../utils/note";
import { UserType } from "../../../utils/modelsTypes";

export const containerVariants = cva([
  "rounded-xl",
  "border",
  "border-2",
  "p-4",
  "gap-4",
  "flex",
  "flex-col",
  "bg-background-300",
  "dark:bg-background-900",
]);

type ModalVariants = VariantProps<typeof containerVariants>;

type ModalProps = ModalVariants & {
  handleAddNote: () => void;
  handleSubmitNote: (noteData: any) => void;
  user: UserType;
};

export const AddNoteModal = ({
  handleAddNote,
  handleSubmitNote,
  user,
}: ModalProps) => {
  const containerClass = clsx(containerVariants());

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    status: "",
    level: "",
    userId: user!.id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString();
    };

    const formattedData = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    };

    handleSubmitNote(formattedData);
  };

  return (
    <div className={`modal--container ${containerClass}`}>
      <div className="flex justify-between items-end">
        <Heading children="Dodaj notatkę" size={2} />
        <IconButton
          icon="faXmark"
          variant="circle"
          size="large"
          onClick={handleAddNote}
        />
      </div>
      <hr />
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <Input
          label="Nazwa"
          name="name"
          placeholder="Nazwa"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <Input
          label="Opis"
          name="description"
          placeholder="Opis"
          onChange={handleChange}
          value={formData.description}
          required
        />
        <Input
          label="Data początkowa"
          name="startDate"
          type="datetime-local"
          onChange={handleChange}
          value={formData.startDate}
          required
        />
        <Input
          label="Data końcowa"
          name="endDate"
          type="datetime-local"
          onChange={handleChange}
          value={formData.endDate}
          required
        />
        <label>Kategoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {Object.values(Category).map((cat) => (
            <option key={cat} value={cat}>
              {categoryDisplay[cat]}
            </option>
          ))}
        </select>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Wybierz status
          </option>
          {Object.values(Status).map((stat) => (
            <option key={stat} value={stat}>
              {statusDisplay[stat]}
            </option>
          ))}
        </select>
        <label>Stopień ważności</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Wybierz stopień ważności
          </option>
          {Object.values(Level).map((lvl) => (
            <option key={lvl} value={lvl}>
              {levelDisplay[lvl]}
            </option>
          ))}
        </select>
        <Button label="Dodaj" variant="primary" size="medium" type="submit" />
      </form>
    </div>
  );
};
