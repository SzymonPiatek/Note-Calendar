import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "ATOMS/input/Input",
  component: Input,
  args: {
    label: "label",
    placeholder: "placeholder",
    size: "medium",
    disabled: false,
    required: false,
  },
  argTypes: {
    label: {
      description: "Label of the input",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "Label",
        },
      },
    },
    placeholder: {
      description: "placeholder of the input",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "placeholder",
        },
      },
    },
    size: {
      name: "Size",
      control: { type: "select" },
      description: "Size of the input",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: {
          summary: "medium",
        },
      },
    },
    required: {
      name: "Required",
      control: { type: "boolean" },
      description: "Is input required",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Disables the input",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

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
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
