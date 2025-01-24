import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const env = process.env.NODE_ENV;

const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL!;
const DEVELOPMENT_URL =
  process.env.NEXT_PUBLIC_DEVELOPMENT_URL || "http://localhost:3000";

const getAppURL = () => {
  const result = {
    production: PRODUCTION_URL,
    development: DEVELOPMENT_URL,
    test: "",
  };

  return result[env];
};

export const client = hc<AppType>(getAppURL());
