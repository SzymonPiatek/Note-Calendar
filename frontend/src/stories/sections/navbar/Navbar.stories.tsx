import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta = {
  title: "ORGANISMS/sections/Navbar",
  component: Navbar,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Normal: Story = {};
