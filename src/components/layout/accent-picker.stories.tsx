import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccentProvider } from "@/components/providers/accent-provider";
import { AccentPicker } from "./accent-picker";

const meta = {
  title: "Layout/AccentPicker",
  component: AccentPicker,
  tags: ["autodocs"],
  args: {
    label: "Accent color",
  },
  decorators: [
    (Story) => (
      <AccentProvider>
        <Story />
      </AccentProvider>
    ),
  ],
} satisfies Meta<typeof AccentPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
