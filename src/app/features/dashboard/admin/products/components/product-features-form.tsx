import React from "react";

import { useProductsStore } from "../store/product";
// form

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  ProductCustomInput,
  ProductCustomTextarea,
} from "./product-custom-input";
import ProductGalleryDropzone from "./product-gallery-dropzone";
import ProductGalleryCarousel from "./product-gallery-carousel";
import ProductVariants from "./product-variants";
// import { Button } from "@/components/ui/button";

const formSchema = z.object({
  id: z.number().min(0),
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(256),
  gallery: z
    .array(
      z.object({
        id: z.number().min(0),
        url: z.string().min(1),
      })
    )
    .nonempty("حداقل یک عکس آپلود کنید"),
  galleryAlt: z.string().max(32),
});
type FormSchema = z.infer<typeof formSchema>;

type AppProps = {
  productId: string;
};

export default function ProductFeaturesForm({ productId }: AppProps) {
  const product = useProductsStore((state) =>
    state.products.find((data) => data.id === +productId)
  );
  const updateProduct = useProductsStore((state) => state.updateProduct);
  // as if there is no product its not going to render

  const form = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id,
      title: product?.title,
      description: product?.description,
      gallery: product?.gallery ?? [],
      galleryAlt: product?.galleryAlt,
    },
  });

  const handleSubmit = (val: FormSchema) => updateProduct(+productId, val);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="text-right">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">نام محصول</FormLabel>
              <FormControl>
                <ProductCustomInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-5" />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">توضیحات محصول</FormLabel>
              <FormControl>
                <ProductCustomTextarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-5" />
        <div className="flex flex-col items-end gap-y-2.5 sm:items-start sm:flex-row-reverse justify-between">
          <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem className="grid">
                <FormControl>
                  <ProductGalleryDropzone {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="galleryAlt"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center w-85">
                <FormLabel className="text-sm mb-0">
                  نام جایگزین گالری
                </FormLabel>
                <FormControl>
                  <ProductCustomInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ProductGalleryCarousel
          imageList={form.watch("gallery")}
          alt={form.watch("galleryAlt")}
        />
        <Separator className="my-5" />
        <ProductVariants />
      </form>
    </Form>
  );
}
