import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./Note";

const meta = {
  title: "ATOMS/note/Note",
  component: Note,
  args: {
    label: "Zrób zakupy w Stokrotce",
    variant: "common",
  },
  argTypes: {
    label: {
      name: "Label",
      description: "Label of the button",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "Label",
        },
      },
    },
    variant: {
      name: "Variant",
      control: { type: "select" },
      description: "Variant of the button",
      options: ["common", "important", "work", "school"],
      table: {
        defaultValue: {
          summary: "primary",
        },
      },
    },
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof Note>;

export const Normal: Story = {};
