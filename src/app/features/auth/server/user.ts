import { Hono } from "hono";
import { authMiddleware } from "@/lib/session-middlware";

const app = new Hono();

export default app.get("/user", authMiddleware, (c) => {
  const session = c.var;
  return c.json({ message: "user authorized", session });
});
