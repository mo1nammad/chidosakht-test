"use server";

import { SERVER_API_URL } from "@/constant";
import { Session } from "@/types";
import { getAccessTokenCookie } from "./cookie";

export async function getSession(): Promise<Session | undefined> {
  const accessToken = await getAccessTokenCookie();

  const response = await fetch(`${SERVER_API_URL}/Profile`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    return undefined;
  }

  const data: Session = await response.json();

  return data;
}
