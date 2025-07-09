export const simpleProduct = 1 as const;
export const variantProduct = 2 as const;
export interface Product {
  id: number;
  name: string;
  productType: typeof simpleProduct | typeof variantProduct;
  description: string | undefined;
  uniqeLink: string | undefined;
  imageAltText: string | undefined;
  nameIndexImage: string | undefined;
  urlNameIndexImage: string | undefined;
  uniCode: string | undefined;
  categoryId: string | undefined;
  categoryName: string | undefined;
  isPublished: boolean;
  infoForSampleProduct: undefined;
  createTime: Date | string | number;
  lastUpdateTime: Date | string | number;
}

export const colorAttribute = 2 as const;
export const selectAttribute = 1 as const;
export type Attribute = {
  productAttributeId: number;
  name: string;
  attributeType: typeof colorAttribute | typeof selectAttribute;
  useForVariant: true;
};

export type AttributeValue = {
  productAttributeValueId: number;
  value: string;
};
