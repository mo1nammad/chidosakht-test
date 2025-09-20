import React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  editProductVariantScheme,
  EditProductVariantScheme,
} from "../../scheme";

import { convertRialToTuman } from "@/lib/utils";
import { useEditVariant } from "../../hooks/use-edit-variant";

import { MoveRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useUpdateProductVariant } from "../../api/variant/use-update-variant";

export default function ProductEditVariantForm() {
  const router = useRouter();
  const { variant } = useEditVariant();

  const { mutate: updateVariant, isPending } = useUpdateProductVariant();

  const form = useForm<z.infer<typeof editProductVariantScheme>>({
    resolver: zodResolver(editProductVariantScheme),
    defaultValues: {
      productVariantId: variant?.productVariantId,
      price: variant?.price,
      specialPrice: variant?.specialPrice,
      stock: variant?.stock,
      weight: variant?.weight,
      width: variant?.width,
      height: variant?.height,
      length: variant?.length,
    },
  });

  const handleSubmitForm = (value: EditProductVariantScheme) =>
    updateVariant(value);

  if (!variant) return null;

  return (
    <Form {...form}>
      <Button
        onClick={() => router.back()}
        variant="link"
        className="absolute right-0"
      >
        <p className="text-sm">بازگشت به جدول</p>
        <MoveRight className="size-4" />
      </Button>
      <form
        dir="rtl"
        className="my-6 flex flex-col w-full pt-5"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        {/* input group */}
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="flex w-full flex-col gap-y-3 mt-6 md:basis-150">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                const tuman = convertRialToTuman(field.value);
                return (
                  <FormItem>
                    <FormLabel>قیمت</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت"
                        {...field}
                      />
                    </FormControl>
                    {tuman.length > 0 && (
                      <FormDescription className="flex gap-x-1.5">
                        {tuman.reverse().map((value, index) => (
                          <span key={value + index}>{value}</span>
                        ))}{" "}
                        <span>تومن</span>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="specialPrice"
              render={({ field }) => {
                const tuman = convertRialToTuman(field.value ? field.value : 0);

                return (
                  <FormItem>
                    <FormLabel>قیمت ویژه</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(ev) => {
                          console.log(ev.target.value ? ev.target.value : null);

                          field.onChange(
                            ev.target.value ? ev.target.value : null
                          );
                        }}
                      />
                    </FormControl>
                    {tuman.length > 0 && (
                      <FormDescription className="flex gap-x-1.5">
                        {tuman.reverse().map((value, index) => (
                          <span key={value + index}>{value}</span>
                        ))}{" "}
                        <span>تومن</span>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <p className="bg-amber-300 w-fit px-2 text-sm">
              تمامی قیمت ها به ریال می باشد
            </p>
          </div>
          <div className="flex flex-col mb-2 gap-y-3">
            <div className="flex items-center justify-between gap-x-6">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وزن</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ارتفاع</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عرض</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>طول</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تعداد در انبار</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="قیمت تخفیف خورده"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isPending} className="w-full sm:w-16 mt-3">
          ثبت
        </Button>
      </form>
    </Form>
  );
}
