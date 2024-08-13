import { Meta, StoryObj } from "@storybook/react";
import { IconHeading } from "./IconHeading";

const meta: Meta<typeof IconHeading> = {
  title: "ATOMS/heading/IconHeading",
  component: IconHeading,
  args: {
    size: 1,
    icon: "faCoffee",
  },
  argTypes: {
    icon: {
      name: "icon",
      control: { type: "text" },
      description: "Icon to display in heading",
    },
    size: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Size of heading",
    },
  },
} satisfies Meta<typeof IconHeading>;

export default meta;

type Story = StoryObj<typeof IconHeading>;

export const HeadingLarge: Story = {
  args: {
    size: 1,
  },
};
