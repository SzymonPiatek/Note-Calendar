import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./Note";

const meta = {
  title: "ATOMS/note/Note",
  component: Note,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof Note>;

export const Normal: Story = {};
