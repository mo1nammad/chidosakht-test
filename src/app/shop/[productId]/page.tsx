import { Product } from "@/types";

import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/constant";

type ProductPageProps = {
  params: Promise<{
    productId: string;
    uniqeName: string[];
  }>;
};

// server side api fetching
async function fetchProductData<T>(productId: string): Promise<T> {
  const request = await fetch(`${SERVER_API_URL}/Product/${productId}`);
  const data = await request.json();
  return data;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const productData = await fetchProductData<Product>(productId);
  const safeSlug = encodeURIComponent(productData.uniqeLink.trim());

  redirect(`/shop/${productId}/${safeSlug}`);
}
