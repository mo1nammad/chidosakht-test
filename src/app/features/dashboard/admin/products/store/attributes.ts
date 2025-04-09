import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Attribute, AttributeType } from "../types";

type State = {
  attributes: Attribute[];
};

type Actions = {
  addAttribute: (label: string, type: AttributeType) => void;
  deleteAttribute: (attributeId: string) => void;
  editAttributeName: (attributeId: string, label: string) => void;
  addOption: (attributeId: string, label: string) => string;
  deleteOption: (attributeId: string, optionId: string) => void;
  reset: () => void;
};

export const useAttributesStore = create<State & Actions>((set) => ({
  attributes: [],
  addAttribute: (label, type) =>
    set((state) => ({
      attributes: [
        ...state.attributes,
        { id: uuid(), label, type, options: [] },
      ],
    })),

  deleteAttribute: (variantId) =>
    set((state) => ({
      attributes: state.attributes.filter(
        (variant) => variant.id !== variantId
      ),
    })),

  editAttributeName: (attributeId, label) =>
    set((state) => ({
      attributes: state.attributes.map((attribute) =>
        attribute.id === attributeId ? { ...attribute, label } : attribute
      ),
    })),

  addOption: (variantId, label) => {
    const id: string = uuid();

    set((state) => ({
      attributes: state.attributes.map((attribute) => {
        const newOption = { id, label: label };

        return attribute.id !== variantId
          ? attribute
          : {
              ...attribute,
              options: [...attribute.options, newOption],
            };
      }),
    }));

    return id;
  },

  deleteOption: (attributeId, optionId) =>
    set((state) => ({
      attributes: state.attributes.map((attribute) =>
        attributeId !== attribute.id
          ? attribute
          : {
              ...attribute,
              options: attribute.options.filter(
                (option) => optionId !== option.id
              ),
            }
      ),
    })),

  reset: () => set({ attributes: [] }),
}));
