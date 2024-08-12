import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const meta = {
  title: "ORGANISMS/calendar/Calendar",
  component: Calendar,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Normal: Story = {};
