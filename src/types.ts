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
  specialPrice: number;
  percentDiscount: number;
};

export type Product = {
  id: number;
  name: string;
  productType: number;
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

  price: number;
  specialPrice: number;
  stock: number;
  hasDiscount: boolean;
  percentDiscount: number;
  viewCount: number;

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
