import React, { useState } from "react";
import { SquarePen, Trash } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditSpecificationSchemeType,
  editSpecificationScheme,
} from "../../scheme";
import { SpecificationField } from "../../types";

import { useEditSpec } from "../../api/specification/use-edit-spec";

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
import { useDeleteSpec } from "../../api/specification/use-delete-spec";

type AppProps = {
  field: SpecificationField;
};

export default function SpecField({ field }: AppProps) {
  const [isEditingField, setIsEditingField] = useState(false);
  const { mutate: editSpec } = useEditSpec();
  const { mutate: deleteSpec } = useDeleteSpec();

  const form = useForm<EditSpecificationSchemeType>({
    resolver: zodResolver(editSpecificationScheme),
    defaultValues: {
      productSpecificationId: Number(field.id),
      key: field.key,
      value: field.value,
    },
  });
  const handleForm = (val: EditSpecificationSchemeType) => {
    if (val.value === field.value && val.key === field.key) {
      setIsEditingField(false);
      return;
    }

    editSpec(val, {
      onSettled: () => setIsEditingField(false),
    });
  };

  return isEditingField ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForm)}
        className="grid grid-cols-subgrid col-span-full"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <Textarea
                  dir="rtl"
                  className="min-h-20 text-xs md:text-xs"
                  {...field}
                />
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
                  <Input
                    dir="rtl"
                    placeholder="کلید"
                    className="max-w-64 text-xs md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="sm">ثبت</Button>
        </div>
      </form>
    </Form>
  ) : (
    <>
      <div
        dir="rtl"
        className="text-xs col-span-3 pb-2.5 border-b border-b-gray-200"
      >
        {field.value}
      </div>
      <div dir="rtl" className="text-sm flex justify-between">
        <p>{field.key}</p>
        <div className="space-x-1.5">
          <button
            onClick={() => deleteSpec(field.id)}
            className="size-3.5 active:opacity-65 cursor-pointer"
          >
            <Trash className="size-full" />
          </button>
          <button
            onClick={() => setIsEditingField((prev) => !prev)}
            className="size-3.5 active:opacity-65 cursor-pointer"
          >
            <SquarePen className="size-full" />
          </button>
        </div>
      </div>
    </>
  );
}
