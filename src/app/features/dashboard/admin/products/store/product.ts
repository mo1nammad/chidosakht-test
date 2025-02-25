import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  // additionals
  description: string | undefined;
  gallery:
    | {
        id: number;
        url: string;
      }[]
    | undefined;

  galleryAlt: string | undefined;
}

type State = {
  products: Product[];
};

type Actions = {
  addProduct: (newProduct: Product) => void;
  getProduct: (productId: number) => Product | undefined;
  getLength: () => number;
};

export const useProductStore = create<State & Actions>((set, get) => ({
  products: [],
  getLength: () => get().products.length,
  getProduct: (productId: number) =>
    get().products.find((product) => product.id === productId),
  addProduct: (newProduct: Product) =>
    set((state) => ({ products: [...state.products, newProduct] })),
}));
