import type { Meta, StoryObj } from "@storybook/react";
import { DateCard } from "./DateCard";

const meta = {
  title: "ORGANISMS/card/DateCard",
  component: DateCard,
  args: {},
  argTypes: {},
} satisfies Meta<typeof DateCard>;

export default meta;
type Story = StoryObj<typeof DateCard>;

export const Normal: Story = {};
