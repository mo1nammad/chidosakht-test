import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSpecificationScheme,
  CreateSpecificationSchemeType,
} from "../../scheme";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateSpec } from "../../api/specification/use-create-spec";

type AppProps = {
  className?: string;
  groupId: number | string;
};

export default function SpecFieldForm({ className, groupId }: AppProps) {
  const { mutate: createSpec } = useCreateSpec();

  const form = useForm<CreateSpecificationSchemeType>({
    resolver: zodResolver(createSpecificationScheme),
    defaultValues: {
      productSpecificationGroupId: Number(groupId),
      key: "",
      value: "",
    },
  });
  const handleForm = (val: CreateSpecificationSchemeType) =>
    createSpec(val, {
      onSuccess: () => form.reset(),
    });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForm)}
        className={cn("grid grid-cols-subgrid", className)}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <Textarea className="min-h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between max-h-20">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="کلید" className="max-w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="sm">ثبت</Button>
        </div>
      </form>
    </Form>
  );
}
