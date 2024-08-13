import type { Meta, StoryObj } from "@storybook/react";
import { AddNoteModal } from "./AddNoteModal";

const meta = {
  title: "ORGANISMS/modal/AddNoteModal",
  component: AddNoteModal,
  args: {},
  argTypes: {},
} satisfies Meta<typeof AddNoteModal>;

export default meta;
type Story = StoryObj<typeof AddNoteModal>;

export const Normal: Story = {};
