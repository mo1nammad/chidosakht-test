"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { editBlogFormSchema } from "../schema";
import { z } from "zod";
type FormSchemaType = z.infer<typeof editBlogFormSchema>;

import { cn } from "@/lib/utils";
import SelectCategory from "./select-category";
import ThumbnailDropzone from "./thumbnail-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { useBlogData } from "../api/use-blog-data";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { awsFolderNames } from "@/lib/s3";

type Props = {
  className?: string;
  blogId: string;
};

export default function BlogForm({ className, blogId }: Props) {
  // get default values from server
  const { data, status } = useBlogData({ id: blogId });
  const router = useRouter();

  useEffect(() => {
    if ((status === "success" && data === undefined) || status === "error") {
      toast.error("مشکلی پیش آمده است");
      router.back();
    }
  }, [status, router, data]);

  // form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(editBlogFormSchema),
    values: {
      title: data?.blog.title ?? "",
      timeToRead: data?.blog.timeToRead ?? "",
      categoryId: data?.blog.categoryId ?? undefined,
      content: data?.blog.content ?? "",
      isPublished: data?.blog.isPublished ?? false,
      thumbnail: data?.blog.thumbnail ?? "",
    },
  });

  const submitHandler = (values: FormSchemaType) => {
    console.log(values);
  };

  // show skeletons while pending data
  if (status === "pending") {
    return (
      <div className="flex flex-col sm:flex-row justify-between w-full gap-x-6 mt-9">
        <Skeleton className="w-full h-60" />
        <div className="w-full space-y-5">
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-11" />
        </div>
      </div>
    );
  }

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
                  imageS3Path={awsFolderNames(blogId).blogs.content}
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
