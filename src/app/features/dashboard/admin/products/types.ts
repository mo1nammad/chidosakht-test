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
  categoryId: number | undefined;
  categoryName: string | undefined;
  isPublished: boolean;
  viewCount: number;
  infoForSampleProduct:
    | undefined
    | {
        price: number;
        specialPrice: number;
        stock: number;
        length: number;
        width: number;
        height: number;
        weight: number;
      };
  createTime: Date | string | number;
  lastUpdateTime: Date | string | number | null;
}

export type ProductToPick = {
  id: number;
  name: string;
  uniqeLink: string;
  imageAltText: string;
  nameIndexImage: string;
  urlNameIndexImage: string;
  price: number;
  specialPrice: number;
  percentDiscount: number;
};

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

export type ProductVariant = {
  productVariantId: number;
  price: number;
  specialPrice: number;
  stock: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  productVariantAttributeValues: {
    productAttributeId: number;
    productAttributeName: string;
    productAttributeValueId: number;
    productAttributeValue: string;
  }[];
};

export type SpecificationGroup = {
  id: number;
  title: string;
};

export type SpecificationField = {
  id: number;
  key: string;
  value: string;
};
