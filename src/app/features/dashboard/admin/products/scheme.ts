import * as z from "zod";

export const productVariantScheme = z.object({
  productId: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  specialPrice: z.number().min(0).nullable(),
  stock: z.coerce.number().min(1).max(2147483647),
  productAttributeValueIds: z.array(z.number()),
  length: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
});

export type ProductVariantScheme = z.infer<typeof productVariantScheme>;

export const editProductVariantScheme = z.object({
  productVariantId: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  specialPrice: z.number().min(0).nullable(),
  stock: z.coerce.number().min(0).max(2147483647),
  length: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
});

export type EditProductVariantScheme = z.infer<typeof editProductVariantScheme>;

export const createSpecificationScheme = z.object({
  productSpecificationGroupId: z.number().min(0),
  key: z.string().min(0).max(50),
  value: z.string().min(0).max(200),
});
export type CreateSpecificationSchemeType = z.infer<
  typeof createSpecificationScheme
>;

export const editSpecificationScheme = z.object({
  productSpecificationId: z.number().min(0),
  key: z.string().min(0).max(50),
  value: z.string().min(0).max(200),
});
export type EditSpecificationSchemeType = z.infer<
  typeof editSpecificationScheme
>;

export const productSimpleScheme = z.object({
  productId: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  specialPrice: z.number().nullable(),
  stock: z.coerce.number().min(0).max(2147483647),
  length: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
});
export type ProductSimpleSchemeType = z.infer<typeof productSimpleScheme>;
