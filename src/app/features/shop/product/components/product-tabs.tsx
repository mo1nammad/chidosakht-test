import "@/components/text-editor.css";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";

type AppProps = {
  description: string;
  details: Product["specificationGroups"];
};

export default function ProductTabs({ description, details }: AppProps) {
  return (
    <Tabs dir="rtl" className="my-15" defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">توضیحات</TabsTrigger>
        <TabsTrigger value="details">جزییات بیشتر</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="w-full">
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </TabsContent>
      <TabsContent
        value="details"
        className="mt-2 w-full space-y-10 md:space-y-20"
      >
        {details.map((group) => (
          <div
            key={group.groupId}
            className="flex flex-col md:flex-row gap-x-20"
          >
            <h6 className="font-semibold text-sm md:text-lg">{group.title}</h6>
            <div className="flex flex-col mt-3 gap-y-10 grow">
              {group.specifications.map(({ specId, key, value }) => (
                <div key={specId} className="flex gap-x-8 md:gap-x-20 w-full">
                  <p className="basis-40 md:basis-80 text-xs md:text-sm text-muted-foreground">
                    {key}
                  </p>
                  <p className="border-b border-b-gray-200 w-full text-xs md:text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
