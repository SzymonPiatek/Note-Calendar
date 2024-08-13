import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./Note";

const meta = {
  title: "ATOMS/note/Note",
  component: Note,
  args: {
    status: "pending",
    level: "high",
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
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof Note>;

export const Normal: Story = {};
