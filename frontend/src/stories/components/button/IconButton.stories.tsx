import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta = {
  title: "ATOMS/buttons/IconButton",
  component: IconButton,
  args: {
    variant: "primary",
    size: "medium",
    label: "Label",
    icon: "faCoffee",
    disabled: false,
  },
  argTypes: {
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

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
    icon: "faUser"
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
