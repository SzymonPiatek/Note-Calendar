import type { Meta, StoryObj } from "@storybook/react";
import { Login } from "./Login";

const meta = {
  title: "ORGANISMS/sections/Login",
  component: Login,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof Login>;

export const Normal: Story = {};
