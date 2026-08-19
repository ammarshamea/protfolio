import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlassCard } from "./glass-card";

const meta = {
  title: "Shared/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
  argTypes: {
    padding: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <GlassCard {...args} className="w-80">
      <h3 className="font-semibold">Full-stack development</h3>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        Flutter, Laravel, and Next.js — end to end, from database schema to
        pixel-perfect UI.
      </p>
    </GlassCard>
  ),
};

export const NoHover: Story = {
  args: { hover: false },
  render: (args) => (
    <GlassCard {...args} className="w-80">
      <h3 className="font-semibold">Static card</h3>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        Used for content that isn&apos;t a link.
      </p>
    </GlassCard>
  ),
};
