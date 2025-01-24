import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signUpSchema } from "../schema";

const app = new Hono();

export const SignUp = app.post(
  "sign-up",
  zValidator("json", signUpSchema),
  (c) => {
    const req = c.req.valid("json");

    return c.json(req);
  }
);
