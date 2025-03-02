export type VariantType = "select" | "color";
export type Variant = {
  id: string;
  label: string;
  type: VariantType;

  options: { id: string; label: string }[];
};
