import type { Meta, StoryObj } from "@storybook/react";
import { Notes } from "./Notes";

const meta = {
  title: "ORGANISMS/notes/Notes",
  component: Notes,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof Notes>;

export const Normal: Story = {};
