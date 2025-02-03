import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import { OTP_SESSION_NAME } from "../constant";
import { decryptSession, generateOtp, updateSession } from "./controllers";

// database
import { db } from "@/db";
import { otpTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

export default app
  .basePath("/otp")
  .get("/eject", (c) => {
    deleteCookie(c, OTP_SESSION_NAME);
    return c.json({ message: "success" });
  })
  .post("/resend", async (c) => {
    try {
      const otpToken = getCookie(c, OTP_SESSION_NAME);
      if (!otpToken)
        return c.json(
          {
            error:
              "مدت زمان مجاز شما برای ثبت نام به پایان رسید وبسایت را مجددا بارگزاری کنید",
          },
          400
        );

      const decoded = await decryptSession<{ userId: string }>(otpToken);

      // check if there is an active otp
      const ActiveOtpList = await db
        .select()
        .from(otpTable)
        .where(eq(otpTable.userId, decoded.userId))
        .then(([data]) => data);

      if (new Date(ActiveOtpList.expiresAt).getTime() > Date.now()) {
        return c.json({ error: "you have an active otp" }, 403);
      }

      // update otp session
      const updatedSession = await updateSession(otpToken, "5 minutes");
      setCookie(c, OTP_SESSION_NAME, updatedSession, {
        maxAge: 5 * 60, // user can request otp for 5 minutes
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      // delete inActive otp passwords
      await db.delete(otpTable).where(eq(otpTable.userId, decoded.userId));
      const newOtp = generateOtp();

      // insert new otp
      const otpInserted = await db
        .insert(otpTable)
        .values({
          value: newOtp,
          userId: decoded.userId,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        })
        .returning({ value: otpTable.value })
        .then(([data]) => data);
      // TODO send it to user

      return c.json({
        message: "پیامک احراز هویت دو مرحله ای ارسال شد",
        code: otpInserted.value, // remove after adding sms service
      });
    } catch (error) {
      console.log("[/register/request-otp/resend]", error);
      return c.json(
        {
          error:
            "مدت زمان مجاز شما برای ثبت نام به پایان رسید وبسایت را مجددا بارگزاری کنید",
        },
        400
      );
    }
  });
