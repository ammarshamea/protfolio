import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} className="w-72" />,
};

export const WithValue: Story = {
  render: (args) => (
    <Input {...args} defaultValue="ammar@example.com" className="w-72" />
  ),
};

export const Disabled: Story = {
  render: (args) => <Input {...args} disabled className="w-72" />,
};

export const Invalid: Story = {
  render: (args) => <Input {...args} aria-invalid className="w-72" />,
};
