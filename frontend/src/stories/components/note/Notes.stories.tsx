import type { Meta, StoryObj } from "@storybook/react";
import { Notes } from "./Notes";

const meta = {
  title: "ATOMS/note/Notes",
  component: Notes,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof Notes>;

export const Normal: Story = {};
