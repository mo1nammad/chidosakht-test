export type VariantType = "select" | "color";
export type Variant = {
  id: number;
  label: string;
  type: VariantType;

  options: { id: number; value: string; label: string }[];
};
