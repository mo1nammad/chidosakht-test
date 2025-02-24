import { create } from "zustand";

interface Product {
  id: number;
  title: string;
}

type State = {
  products: Product[];
};

type Actions = {
  addProduct: (newProduct: Product) => void;
};

export const useStore = create<State & Actions>((set) => ({
  products: [],
  addProduct: (newProduct: Product) =>
    set((state) => ({ products: [...state.products, newProduct] })),
}));
