import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {},
  argTypes: {
    children: {
      name: "Label",
      control: { type: "text" },
      description: "Text to display on the button",
      table: {
        disable: false,
      },
    },
    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Disables the button",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
