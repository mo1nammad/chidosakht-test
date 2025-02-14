"use client";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBlogFormSchema } from "../schema";
import { z } from "zod";
type FormSchemaType = z.infer<typeof createBlogFormSchema>;

import { cn } from "@/lib/utils";
import SelectCategory from "./select-category";
import ThumbnailDropzone from "./thumbnail-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  userId: string;
};

export default function BlogForm({ className }: Props) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createBlogFormSchema),
    defaultValues: {
      title: "",
      timeToRead: "",
      categoryId: 1,
      content: "",
      isPublished: true,
      thumbnail: "",
    },
  });
  const submitHandler = (values: FormSchemaType) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <Button className="">ثبت مطلب</Button>
        <div className="grid md:grid-cols-6 grid-flow-row mt-10 gap-12">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel className="font-yekan-light">عکس تامبنیل</FormLabel>
                <FormControl>
                  <ThumbnailDropzone {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-3 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-yekan-light">موضوع</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir="rtl"
                      className="bg-background border-border text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row-reverse items-center justify-between flex-wrap gap-4">
              {/* category selectbox */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-auto">
                    <FormLabel className="font-yekan-light">
                      دسته بندی
                    </FormLabel>
                    <FormControl>
                      <SelectCategory {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeToRead"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      مدت مطالعه
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="rtl"
                        className="bg-background border-border text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* isPublished radio group */}
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-yekan-light">
                      وضعیت انتشار
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value ? "publish" : "unPublish"}
                        onValueChange={(value) =>
                          value === "publish"
                            ? field.onChange(true)
                            : field.onChange(false)
                        }
                        className="flex flex-row"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="unPublish" id="r3" />
                            <Label htmlFor="r3">غیر قابل انتشار</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="publish" id="r2" />
                            <Label htmlFor="r2">قابل انتشار</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* text editor */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextEditor
                  className="mt-10 shadow-none"
                  toolbar={{
                    className:
                      "sticky top-18 z-50 bg-muted/60 backdrop-blur-2xl bg-op pt-4",
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
