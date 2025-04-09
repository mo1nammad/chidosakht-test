export interface Product {
  id: number;
  title: string;
  isPublished: boolean;
  // additionals
  description?: string;
  gallery?:
    | {
        id: number;
        url: string;
      }[];

  galleryAlt?: string;
  attributes?: Attribute[];
  uniqeUrl?: string;
  variants?: {
    price: string;
    offPrice: string;
    imageIndex: string;
    [x: string]: string;
  }[];
}

export type AttributeType = "select" | "color";
export type Attribute = {
  id: string;
  label: string;
  type: AttributeType;

  options: { id: string; label: string }[];
};
