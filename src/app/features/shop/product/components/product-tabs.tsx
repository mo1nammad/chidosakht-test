import "@/components/text-editor.css";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AppProps = {
  description: string;
};

export default function ProductTabs({ description }: AppProps) {
  return (
    <Tabs dir="rtl" className="mt-15" defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">توضیحات</TabsTrigger>
        <TabsTrigger value="details">جزییات بیشتر</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
