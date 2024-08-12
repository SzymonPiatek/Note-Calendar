import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDay } from "./CalendarDay";

const meta = {
  title: "ORGANISMS/calendar/CalendarDay",
  component: CalendarDay,
  args: {},
  argTypes: {},
} satisfies Meta<typeof CalendarDay>;

export default meta;
type Story = StoryObj<typeof CalendarDay>;

export const Normal: Story = {};
