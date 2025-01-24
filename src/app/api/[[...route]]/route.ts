import { Hono } from "hono";
import { handle } from "hono/vercel";
import { SignUp } from "@/app/features/auth/server/sign-up";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

// router
const route = app.route("/auth", SignUp);

export const GET = handle(route);
export const POST = handle(route);
export type AppType = typeof route;
