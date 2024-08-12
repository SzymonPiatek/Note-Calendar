import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
  title: "ATOMS/label/Label",
  component: Label,
  args: {
    size: "medium",
    label: "Label",
    icon: "faCoffee",
  },
  argTypes: {
    size: {
      name: "Size",
      control: { type: "select" },
      description: "Size of the button",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: {
          summary: "medium",
        },
      },
    },
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
    icon: {
      name: "Icon",
      description: "Icon of the button",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "faCoffee",
        },
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
