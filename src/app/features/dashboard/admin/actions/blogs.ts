"use server";

import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

type Req = typeof client.api.blogs.$get;
type ApiResponse = InferResponseType<Req>;
type ActionReturnType = Extract<ApiResponse, { message: string }>;

export const getAllBlogs = async (): Promise<ActionReturnType | undefined> => {
  try {
    const response = await client.api.blogs.$get();
    const data = await response.json();

    if (response.ok) {
      return data as ActionReturnType;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
