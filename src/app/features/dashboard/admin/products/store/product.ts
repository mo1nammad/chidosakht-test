import { create } from "zustand";
import { Product } from "../types";

type State = {
  products: Product[];
};

type Actions = {
  addProduct: (newProduct: Product) => void;
  getProduct: (productId: number) => Product | undefined;
  updateProduct: (productId: number, newProduct: Product) => void;
  getLength: () => number;
  updateProductV2: (
    dispatch: (state: State & Actions) => Partial<State & Actions>
  ) => void;
};

export const useProductsStore = create<State & Actions>((set, get) => ({
  products: [],
  getLength: () => get().products.length,
  getProduct: (productId: number) =>
    get().products.find((product) => product.id === productId),
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),

  updateProduct: (productId, newProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? newProduct : product
      ),
    }));
  },
  updateProductV2(dispatch) {
    set((state) => dispatch(state));
  },
}));
