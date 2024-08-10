import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "ATOMS/buttons/Button",
  component: Button,
  args: {
    label: "Label",
    size: "medium",
    variant: "primary",
    disabled: false,
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
      options: ["primary", "secondary", "outline", "text"],
      table: {
        defaultValue: {
          summary: "primary",
        },
      },
    },
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

export const Disabled: Story = {
  args: {
    size: "medium",
    disabled: true,
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};
