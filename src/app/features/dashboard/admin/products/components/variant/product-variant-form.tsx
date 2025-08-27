import React from "react";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productVariantScheme } from "../../scheme";

import { useCreateVariant } from "../../api/variant/use-create-variant";
import { useGetAttributesAndValues } from "../../api/attribute/use-get-both-attribute-value";

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

import PricingAttributeField from "../pricing-attribute-field";
import RialToTuman from "@/components/rial-to-tuman";

export default function ProductVariantForm() {
  const { productId } = useParams();
  const { data: attributesAndValues, status } = useGetAttributesAndValues(
    productId as string
  );
  const { mutate: createVariant, status: createVariantStatus } =
    useCreateVariant();

  const form = useForm<z.infer<typeof productVariantScheme>>({
    resolver: zodResolver(productVariantScheme),
    defaultValues: {
      productId: Number(productId),
      price: 0,
      specialPrice: 0,
      productAttributeValueIds: [],
      stock: 1,
      weight: 0,
      width: 0,
      height: 0,
      length: 0,
    },
  });

  const handleSubmitForm = (value: z.infer<typeof productVariantScheme>) =>
    createVariant(value);

  return (
    <Form {...form}>
      <form
        dir="rtl"
        className="my-6 flex flex-col w-full"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        {/* attribute and values selection */}
        {status === "success" &&
          attributesAndValues.map((attribute) => (
            <PricingAttributeField
              key={attribute.productAttributeId}
              attributeAndValues={attribute}
              setAttrValuesList={(id) => {
                // update the list of valueIds
                //
                const newList = form.getValues("productAttributeValueIds");
                newList[attributesAndValues.indexOf(attribute)] = id;
                form.setValue("productAttributeValueIds", newList);
              }}
            />
          ))}

        {/* input group */}
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="flex w-full flex-col gap-y-3 mt-6 md:basis-150">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قیمت</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="قیمت"
                      {...field}
                    />
                  </FormControl>

                  {field.value > 10 && (
                    <FormDescription className="flex gap-x-1.5">
                      <RialToTuman price={field.value} />
                    </FormDescription>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قیمت ویژه</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="قیمت تخفیف خورده"
                      {...field}
                    />
                  </FormControl>
                  {field.value > 10 && (
                    <FormDescription className="flex gap-x-1.5">
                      <RialToTuman price={field.value} />
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
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
          disabled={createVariantStatus === "pending"}
          className="w-full sm:w-16 mt-3"
        >
          ثبت
        </Button>
      </form>
    </Form>
  );
}
