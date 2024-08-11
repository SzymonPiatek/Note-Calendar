import { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "ATOMS/heading/Heading",
  component: Heading,
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
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const HeadingLarge: Story = {
  args: {
    size: 1,
  },
};
