import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./theme-toggle";

const meta = {
  title: "Layout/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  args: {
    label: "Toggle theme",
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        themes={["light", "dark", "high-contrast"]}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
