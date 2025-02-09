"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ThumbnailDropzone from "./thumbnail-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectCategory from "./select-category";

type Props = {
  className?: string;
};

export default function CreateBlogForm({ className }: Props) {
  return (
    <form
      className={cn(
        "grid lg:grid-cols-6 grid-flow-row mt-10 gap-12",
        className
      )}
    >
      <ThumbnailDropzone className="col-span-1 lg:col-span-3" />
      <div className="col-span-1 lg:col-span-3 space-y-6">
        <div>
          <Label htmlFor="title">موضوع</Label>
          <Input
            id="title"
            className="bg-background border-border text-right"
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-between flex-wrap gap-3">
          {/* category selectbox */}
          <SelectCategory />
          {/* isPublished radio group */}
          <div className="flex flex-row-reverse items-center sm:flex-col sm:items-end gap-2">
            <h6>وضعیت انتشار</h6>
            <RadioGroup defaultValue="publish" className="flex flex-row">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unPublish" id="r3" />
                  <Label htmlFor="r3">غیر قابل انتشار</Label>
                </div>
                <RadioGroupItem value="publish" id="r2" />
                <Label htmlFor="r2">قابل انتشار</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </form>
  );
}
