import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: "single" },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="rates">
        <AccordionTrigger>What are your rates?</AccordionTrigger>
        <AccordionContent>
          Project-based pricing depending on scope — get in touch for a quote.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="timezone">
        <AccordionTrigger>What timezone do you work in?</AccordionTrigger>
        <AccordionContent>
          Damascus, Syria (UTC+3), with flexible overlap for client calls.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="stack">
        <AccordionTrigger>What&apos;s your primary stack?</AccordionTrigger>
        <AccordionContent>
          Flutter, Laravel, Next.js, and TypeScript across mobile and web.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
