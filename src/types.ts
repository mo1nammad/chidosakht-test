import { InternalAxiosRequestConfig } from "axios";
import {
  colorAttribute,
  selectAttribute,
} from "$/dashboard/admin/products/types";

export type RefreshTokenApiResponse = {
  token: string;
  tokenExpireTime: string;
  refreshToken: string;
  refreshTokenExpireTime: string;
};

export type Session = {
  id: string;
  phoneNumber: string;
  fullName: string;
  email: string | null;
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// global

export type Role = {
  id: string;
  name: string;
  description: string;
  links: {
    url: string;
    for: string;
    httpMethod: string;
  }[];
};

export type Permission = {
  id: number;
  area: string;
  controller: string;
  action: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  childCategories: Category[];
};

export type ProductCard = {
  id: number;
  name: string;
  uniqeLink: string;
  imageAltText: string | null;
  nameIndexImage: string;
  urlNameIndexImage: string;
  price: number;
  specialPrice: number | null;
  percentDiscount: number;
};

type SimpleProduct = 1;
type VariantProduct = 2;

export type Product = {
  id: number;
  name: string;
  productType: SimpleProduct | VariantProduct;
  productTypeName: string;
  description: string;
  uniqeLink: string;
  imageAltText: string | null;
  nameIndexImage: string;
  urlNameIndexImage: string;
  uniCode: string;
  categoryId: number;
  categoryName: string;

  // attribute & value
  attributeAndValues: {
    productAttributeId: number;
    name: string;
    attributeType: typeof selectAttribute | typeof colorAttribute;
    useForVariant: true;
    values: {
      productAttributeValueId: number;
      value: string;
    }[];
  }[];
  viewCount: number;

  productVariants:
    | {
        productVariantId: number;
        productAttributeValues: {
          productAttributeValueId: number;
          value: string;
        }[];
        price: number;
        specialPrice: null | number;
        stock: number;
        percentDiscount: null | number;
        hasDiscount: boolean;
      }[]
    | undefined;

  // specifications section
  specificationGroups: {
    groupId: number;
    title: string;
    specifications: {
      specId: number;
      key: string;
      value: string;
    }[];
  }[];

  // galary
  productImages: {
    id: number;
    name: string;
    isIndex: boolean;
    url: string;
  }[];

  infoForSimpleProduct: {
    price: number;
    specialPrice: null | number;
    stock: number;
    percentDiscount: null | number;
    hasDiscount: boolean;
  } | null;
};

export type Comment = {
  id: number;
  text: string;
  star: number;
  fullNameUser: string;
  countVoteHelpfuls: number;
  countVoteUnHelpfuls: number;
  userVoteHelpful: null;
  createTime: string;
};

export type Cart = {
  cartId: number;
  userId: string;
  cartType: number;
  cartItems: {
    cartItemId: number;
    productId: number;
    productType: 1 | 2;
    productVariantId: number;
    productName: string;
    nameIndexImage: string;
    quantity: number;
    stock: number;

    price_Now: number;
    specialPrice_Now: number | null;
    percentDiscount_Now: number | null;
    discountAmount_Now: number;
    // amount_Now: 2020000000;
    // finalAmout_Now: 2020000000;
  }[];

  totalAmount_Now: number;
  totalDiscountAmount_Now: number;
  finalTotalAmout_Now: number;
};
