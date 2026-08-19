import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Input } from "./input";

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Email" },
};

export const WithInput: Story = {
  render: () => (
    <div className="w-72">
      <Label htmlFor="story-email">Email</Label>
      <Input id="story-email" placeholder="you@example.com" className="mt-2" />
    </div>
  ),
};
