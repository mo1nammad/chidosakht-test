"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  star: z.number().min(1).max(5),
  text: z.string().min(1).max(200),
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
import { usePostComment } from "../api/use-post-comment";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import Link from "next/link";

export default function CommentForm() {
  const router = useRouter();

  const { session } = useSession();
  const { mutate: postComment } = usePostComment();

  const stars = [1, 2, 3, 4, 5];
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      star: 1,
    },
  });

  const handleSubmit = (value: FormSchemaType) => {
    if (!session) {
      toast.error("برای ثبت نظر ابتدا باید وارد شوید", {
        action: {
          label: "ورود",
          onClick: () => router.push("/login"),
          actionButtonStyle: {
            backgroundColor: "white",
          },
        },
      });
      return;
    }

    postComment(value);
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
                  onClick={() => form.setValue("star", star)}
                >
                  <Star
                    className={cn(
                      "text-transparent cursor-pointer",
                      star > form.watch("star")
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
          name="text"
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
        {session ? (
          <Button disabled={!session} className="md:w-fit mt-7">
            ثبت دیدگاه
          </Button>
        ) : (
          <Link href="/login" target="_blank">
            <Button type="button" className="md:w-fit mt-7">
              ابتدا وارد شوید
            </Button>
          </Link>
        )}
      </form>
    </Form>
  );
}
