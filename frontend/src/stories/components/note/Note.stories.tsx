import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./Note";

const meta = {
  title: "ATOMS/note/Note",
  component: Note,
  args: {
    status: "pending",
    level: "high",
    category: "school",
  },
  argTypes: {
    status: {
      name: "Status",
      description: "Status of the note",
      control: { type: "select" },
      options: ["done", "pending"],
      table: {
        defaultValue: {
          summary: "pending",
        },
      },
    },
    level: {
      name: "Level",
      description: "Level of the note",
      control: { type: "select" },
      options: ["low", "medium", "high"],
      table: {
        defaultValue: {
          summary: "high",
        },
      },
    },
    category: {
      name: "Category",
      description: "Category of the note",
      control: { type: "select" },
      options: ["school", "work", "private"],
      table: {
        defaultValue: {
          summary: "school",
        },
      },
    },
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof Note>;

export const Normal: Story = {};
