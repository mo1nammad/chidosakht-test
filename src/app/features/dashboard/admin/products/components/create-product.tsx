"use client";
import { useRouter } from "next/navigation";
// import { Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
z.setErrorMap(customErrorMap);

import { useStore } from "../store/product";
import { customErrorMap } from "@/lib/utils";

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

const CreateProduct = () => {
  const addProduct = useStore((state) => state.addProduct);
  const products = useStore((state) => state.products);

  const router = useRouter();

  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(createProductInstanceSchema),
    defaultValues: {
      title: "",
    },
  });
  const handleSubmit = (val: FormValuesSchema) => {
    const newId = products.length;
    addProduct({ id: newId, title: val.title });
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
          ایجاد مطلب
        </Button>
      </form>
    </Form>
  );
};

export default CreateProduct;
