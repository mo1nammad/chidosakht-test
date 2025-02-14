"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
z.setErrorMap(customErrorMap);

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fade-in">ساخت مطلب</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">ایجاد مطلب</DialogTitle>
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
                  <FormLabel>موضوع مطلب</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"} className="w-21 mt-4">
              {status === "pending" ? (
                <Loader className="animate-spin" />
              ) : (
                "ایجاد مطلب"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlog;
