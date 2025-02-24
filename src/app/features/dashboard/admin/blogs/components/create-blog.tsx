"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
z.setErrorMap(customErrorMap);

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateBlogInstance } from "../api/use-create-blog-instance";
import { Loader } from "lucide-react";
import { customErrorMap } from "@/lib/utils";

const createBlogInstanceSchema = z.object({
  title: z.string().min(1).max(128),
});
type FormValuesSchema = z.infer<typeof createBlogInstanceSchema>;

const CreateBlog = () => {
  const { mutate, status } = useCreateBlogInstance();

  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(createBlogInstanceSchema),
    defaultValues: {
      title: "",
    },
  });
  const handleSubmit = (val: FormValuesSchema) => mutate({ title: val.title });

  return (
    <Form {...form}>
      <form
        className="text-right space-y-1.5 mt-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="موضوع" {...field} className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-2.5">
          {status === "pending" ? (
            <Loader className="animate-spin" />
          ) : (
            "ایجاد مطلب"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateBlog;
