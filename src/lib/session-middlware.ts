import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_SESSION_NAME, Session } from "@/app/features/auth/constant";
import { decryptSession } from "@/app/features/auth/server/controllers";

type AdditionalContext = {
  Variables: Session;
};

export default createMiddleware<AdditionalContext>(async (c, next) => {
  const session = getCookie(c, AUTH_SESSION_NAME);
  if (!session)
    return c.json(
      {
        error: "لطفا برای دسترسی به این سرویس وارد اکانت خود شوید",
      },
      403
    );

  console.log(session);

  try {
    const decoded = await decryptSession<Session>(session);
    c.set("userId", decoded.userId);
    c.set("email", decoded.email);
    c.set("phone", decoded.phone);
    c.set("name", decoded.name);

    await next();
  } catch (error) {
    console.error("auth middleware:", error);
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }
});
