"use client";

import React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1).max(128),
});
type FormSchemaType = z.infer<typeof formSchema>;

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentForm() {
  const stars = [1, 2, 3, 4, 5];
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      rating: 1,
    },
  });

  const handleSubmit = (value: FormSchemaType) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <div className="flex justify-between text-muted-foreground mb-6">
          <div className="flex flex-col">
            <p className="text-sm md:text-base">
              امتیاز 4 از 5 از بین 40 دیدگاه
            </p>
            <div className="flex">
              {stars.map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => form.setValue("rating", star)}
                >
                  <Star
                    className={cn(
                      "text-transparent cursor-pointer",
                      star > form.watch("rating")
                        ? "fill-gray-200"
                        : "fill-[#FF9F0E]"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <h6 className="pr-3.5 text-lg font-semibold h-fit relative after:absolute after:right-0 after:w-[3px] after:h-8 after:bg-primary after:rounded-full">
            نظرات کاربران
          </h6>
        </div>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="resize-none min-h-51 bg-muted text-foreground border-none focus-visible:ring-primary rounded-[8px]"
                  dir="rtl"
                  placeholder="متن دیدگاه خود را وارد کنید"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="md:w-fit mt-7">ثبت دیدگاه</Button>
      </form>
    </Form>
  );
}
