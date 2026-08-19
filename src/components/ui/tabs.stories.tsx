import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="mobile" className="w-96">
      <TabsList>
        <TabsTrigger value="mobile">Mobile</TabsTrigger>
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="backend">Backend</TabsTrigger>
      </TabsList>
      <TabsContent value="mobile">
        Flutter apps for iOS and Android.
      </TabsContent>
      <TabsContent value="web">
        Next.js and React storefronts and dashboards.
      </TabsContent>
      <TabsContent value="backend">
        Laravel APIs powering multi-tenant platforms.
      </TabsContent>
    </Tabs>
  ),
};
