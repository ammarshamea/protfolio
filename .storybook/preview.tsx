import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { TooltipProvider } from "../src/components/ui/tooltip";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        className="bg-[var(--background)] p-8 text-[var(--foreground)]"
      >
        <TooltipProvider delayDuration={200}>
          <Story />
        </TooltipProvider>
      </div>
    ),
  ],
};

export default preview;
