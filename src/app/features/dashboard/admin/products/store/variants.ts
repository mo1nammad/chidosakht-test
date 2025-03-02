import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Variant, VariantType } from "../types";

type State = {
  variants: Variant[];
};

type Actions = {
  addVariant: (label: string, type: VariantType) => void;
  deleteVariant: (variantId: string) => void;
  editVariantName: (variantId: string, label: string) => void;
  addOption: (variantId: string, label: string) => void;
  deleteOption: (variantId: string, optionId: string) => void;
};

export const useVariantsStore = create<State & Actions>((set) => ({
  variants: [],
  addVariant: (label, type) =>
    set((state) => ({
      variants: [...state.variants, { id: uuid(), label, type, options: [] }],
    })),

  deleteVariant: (variantId) =>
    set((state) => ({
      variants: state.variants.filter((variant) => variant.id !== variantId),
    })),

  editVariantName: (variantId, label) =>
    set((state) => ({
      variants: state.variants.map((variant) =>
        variant.id === variantId ? { ...variant, label } : variant
      ),
    })),

  addOption: (variantId, label) =>
    set((state) => ({
      variants: state.variants.map((variant) => {
        const newOption = { id: uuid(), label: label };

        return variant.id !== variantId
          ? variant
          : {
              ...variant,
              options: [...variant.options, newOption],
            };
      }),
    })),

  deleteOption: (variantId, optionId) =>
    set((state) => ({
      variants: state.variants.map((variant) =>
        variantId !== variant.id
          ? variant
          : {
              ...variant,
              options: variant.options.filter(
                (option) => optionId !== option.id
              ),
            }
      ),
    })),
}));
