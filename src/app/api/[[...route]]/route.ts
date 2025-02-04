import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { SignUp } from "@/app/features/auth/server/sign-up";
import Login from "@/app/features/auth/server/login";
import Otp from "@/app/features/auth/server/otp";
import User from "@/app/features/auth/server/user";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

// router
const router = app
  .use("/*", cors())
  .route("/auth", SignUp)
  .route("/auth", Login)
  .route("/auth", Otp)
  .route("/auth", User);

export const GET = handle(router);
export const POST = handle(router);
export type AppType = typeof router;
