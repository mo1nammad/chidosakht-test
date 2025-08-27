import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSimpleScheme, ProductSimpleSchemeType } from "../scheme";

import { Product } from "../types";
import { convertRialToTuman } from "@/lib/utils";
import { useUpdateSimpleProductPricing } from "../api/use-update-simple-product-pricing";

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

type AppProps = {
  product: Product;
};

export default function ProductSimplePricingForm({ product }: AppProps) {
  const { mutate: updateForm, status: UpdateStatus } =
    useUpdateSimpleProductPricing();

  const productInfo = product.infoForSampleProduct!;

  const form = useForm<ProductSimpleSchemeType>({
    resolver: zodResolver(productSimpleScheme),
    defaultValues: {
      productId: product.id,
      price: productInfo.price,
      specialPrice: productInfo.specialPrice,
      stock: productInfo.stock,
      weight: productInfo.weight,
      width: productInfo.width,
      height: productInfo.height,
      length: productInfo.length,
    },
  });

  const handleSubmitForm = (value: ProductSimpleSchemeType) =>
    updateForm(value);

  return (
    <Form {...form}>
      <form
        dir="rtl"
        className="my-6 flex flex-col w-full"
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
                const tuman = convertRialToTuman(field.value);

                return (
                  <FormItem>
                    <FormLabel>قیمت ویژه</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background"
                        placeholder="قیمت تخفیف خورده"
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
        <Button
          disabled={UpdateStatus === "pending"}
          className="w-full sm:w-16 mt-3"
        >
          ثبت
        </Button>
      </form>
    </Form>
  );
}
