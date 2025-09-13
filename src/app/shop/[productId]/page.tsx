import { Product } from "@/types";

import { redirect } from "next/navigation";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

type ProductPageProps = {
  params: {
    productId: string;
    uniqeName: string[];
  };
};

// server side api fetching
async function fetchProductData<T>(productId: string): Promise<T> {
  const request = await fetch(`${apiBaseUrl}/Product/${productId}`);
  const data = await request.json();
  return data;
}

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const productData = await fetchProductData<Product>(productId);
  redirect(`/shop/${productId}/${productData.uniqeLink}`);
}
