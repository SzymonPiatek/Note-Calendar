import { Meta, StoryObj } from "@storybook/react";
import { IconHeading } from "./IconHeading";

const meta: Meta<typeof IconHeading> = {
  title: "ATOMS/heading/IconHeading",
  component: IconHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    size: 1,
    children: "Heading size 1",
  },
  argTypes: {
    children: {
      name: "title",
      control: { type: "text" },
      description: "Text to display in heading",
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
