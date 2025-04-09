"use client";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

import { useProductsStore } from "../store/product";
import { useAttributesStore } from "../store/attributes";
import { customErrorMap } from "@/lib/utils";

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

const createProductInstanceSchema = z.object({
  title: z.string().min(1).max(128),
});
type FormValuesSchema = z.infer<typeof createProductInstanceSchema>;

export default function CreateProduct() {
  // store
  const { getLength, addProduct } = useProductsStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      getLength: state.getLength,
    }))
  );
  const resetAttributeState = useAttributesStore((state) => state.reset);

  const router = useRouter();

  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(createProductInstanceSchema),
    defaultValues: {
      title: "",
    },
  });
  const handleSubmit = (val: FormValuesSchema) => {
    const newId = getLength();
    // create new product instance
    resetAttributeState();
    addProduct({
      id: newId,
      title: val.title,
      isPublished: false,
    });
    router.push(`/dashboard/admin/products/${newId}`);
  };

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
          {/* {status === "pending" ? (
            <Loader className="animate-spin" />
          ) : (
            "ایجاد مطلب"
          )} */}
          ایجاد محصول
        </Button>
      </form>
    </Form>
  );
}
