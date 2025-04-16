import { redirect } from "next/navigation";

type AppProps = {
  searchParams: Promise<{
    redirectUrl: string | undefined;
  }>;
};
export default async function RefreshTokenPage({ searchParams }: AppProps) {
  const { redirectUrl } = await searchParams;
  const next = redirectUrl ?? "/";
  redirect(`/api/refresh-token?redirectUrl=${encodeURIComponent(next)}`);
}
