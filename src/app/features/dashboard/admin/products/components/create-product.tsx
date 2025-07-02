"use client";
import { useRouter } from "next/navigation";

import { customErrorMap } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
z.setErrorMap(customErrorMap);

import { useCreateInstance } from "../api/use-create-instance";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";

const createProductInstanceSchema = z.object({
  name: z.string().min(1).max(164),
  productType: z.union([z.literal(1), z.literal(2)]),
});
type FormValuesSchema = z.infer<typeof createProductInstanceSchema>;

type Props = {
  setOpenDialog: (val: boolean) => void;
};

// component
export default function CreateProduct({ setOpenDialog }: Props) {
  const { mutate: createProductInstance, status } = useCreateInstance();
  const router = useRouter();

  const form = useForm<FormValuesSchema>({
    resolver: zodResolver(createProductInstanceSchema),
    defaultValues: {
      name: "",
      productType: 1,
    },
  });
  const handleSubmit = (val: FormValuesSchema) => {
    createProductInstance(val, {
      onSuccess: (res) => {
        const location = res.headers.location as string;
        const productId = location.split("/Product/")[1];
        router.push(`/dashboard/admin/products/${productId}`);

        setOpenDialog(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="text-right space-y-1.5 mt-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="موضوع" {...field} className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value.toString()}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="my-4.5"
                >
                  <div className="flex flex-row-reverse items-center gap-3">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">محصول ساده</Label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-3">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">محصول متغیر</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2.5">
          {status === "pending" ? (
            <Loader className="animate-spin" />
          ) : (
            "ایجاد محصول"
          )}
        </Button>
      </form>
    </Form>
  );
}
