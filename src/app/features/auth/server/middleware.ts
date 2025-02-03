import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_SESSION_NAME, Session } from "../constant";
import { decryptSession } from "./controllers";

export const protectAuth = createMiddleware(async (c, next) => {
  const session = getCookie(c, AUTH_SESSION_NAME);
  if (!session)
    return c.json(
      {
        message: "لطفا برای دسترسی به این سرویس وارد اکانت خود شوید",
      },
      403
    );

  try {
    const decoded = await decryptSession<Session>(session);
    c.set("userId", decoded.userId);
    c.set("email", decoded.email);
    c.set("phone", decoded.phone);

    await next();
  } catch (error) {
    console.error("auth middleware:", error);
    return c.json("Unauthorized", 401);
  }
});
