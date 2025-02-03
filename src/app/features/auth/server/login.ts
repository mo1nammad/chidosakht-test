import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcrypt";
import { z } from "zod";

// database
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { otpTable, usersTable } from "@/db/schema";

import { loginNoOtpSchema, loginWithOtpSchema } from "../schema";
import { decryptSession, encryptSession, generateOtp } from "./controllers";
import { AUTH_SESSION_NAME, OTP_SESSION_NAME, Session } from "../constant";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const app = new Hono();

export default app
  .basePath("/login")
  .post("/", zValidator("json", loginNoOtpSchema), async (c) => {
    const { password, phone } = c.req.valid("json");
    try {
      // Check if the user exists
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.phone, phone))
        .then(([data]) => data);

      if (!user) {
        return c.json(
          { error: "حسابی برای شماره مورد نظر وجود ندارد لظفا ثبت نام کنید" },
          401
        );
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return c.json({ error: "رمز یا ایمیل وارد شده درست نیست" }, 401);
      }

      // Generate a JWT token
      const token = await encryptSession<Session>({
        email: user.email,
        phone: user.phone,
        userId: user.id,
        name: user.name,
      });

      setCookie(c, AUTH_SESSION_NAME, token, {
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return c.json({ message: "ورود با موفقیت انجام شد" });
    } catch (error) {
      console.log(error, "/login");

      return c.json({ error: "Invalid email or password" }, 401);
    }
  })
  .post("/request-otp", zValidator("query", loginWithOtpSchema), async (c) => {
    const query = c.req.valid("query");

    try {
      // Check if the user exists
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.phone, query.phone))
        .then(([data]) => data);

      if (!user) {
        return c.json(
          { error: "حسابی برای شماره مورد نظر وجود ندارد لظفا ثبت نام کنید" },
          401
        );
      }

      // otp we should save in database
      const otpCode = generateOtp();
      const otpInserted = await db
        .insert(otpTable)
        .values({
          value: otpCode,
          userId: user.id,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        })
        .returning({ value: otpTable.value })
        .then(([data]) => data);

      // user can request otp for 5 minutes
      const otpSession = await encryptSession<{ userId: string }>(
        { userId: user.id },
        "5 minutes"
      );
      setCookie(c, OTP_SESSION_NAME, otpSession, {
        maxAge: 5 * 60,
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      // TODO send otp code to phone number
      console.log(
        `Generated OTP: ${otpInserted.value} for phone: ${user.phone}`
      );

      return c.json({
        message: "پیامک احراز هویت دو مرحله ای ارسال شد",
        code: otpInserted.value, // remove after adding sms service
      });
    } catch (error) {
      console.log(error, "[/login/request-otp]");
      return c.json(
        {
          error: "مشکلی پیش آمد! لطفا وبسایت را مجددا بارگزاری کنید",
        },
        400
      );
    }
  })
  .post(
    "/verify-otp",
    zValidator(
      "json",
      z.object({
        otp: z.coerce.string().length(6),
      })
    ),

    async (c) => {
      // retrieve data 1
      const { otp: input } = c.req.valid("json");

      const otpToken = getCookie(c, OTP_SESSION_NAME);
      if (!otpToken) return c.json({ message: "token is required" }, 400);

      try {
        // verificaton 2
        const decoded = await decryptSession<{ userId: string }>(otpToken);

        const otp = await db
          .select()
          .from(otpTable)
          .where(eq(otpTable.userId, decoded.userId))
          .orderBy(desc(otpTable.createdAt))
          .then(([otp]) => otp);

        if (!otp || new Date(otp.expiresAt).getTime() < Date.now())
          return c.json({ error: "مدت استفاده از کد منقضی شده است" }, 400);

        const otpCheck = input === otp.value;
        if (!otpCheck) return c.json({ error: "کد وارد شده اشتباه است" }, 400);

        // update account to verified
        const user = await db
          .update(usersTable)
          .set({ isVerified: true })
          .where(eq(usersTable.id, decoded.userId))
          .returning()
          .then(([data]) => data);

        // delete otp from db
        await db.delete(otpTable).where(eq(otpTable.userId, decoded.userId));
        deleteCookie(c, OTP_SESSION_NAME);

        // Generate a session JWT token
        const token = await encryptSession<Session>({
          email: user.email,
          phone: user.phone,
          userId: user.id,
          name: user.name,
        });

        setCookie(c, AUTH_SESSION_NAME, token, {
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        return c.json({ message: "ورود با موفقیت انجام شد" });
      } catch (error) {
        console.log("[/register/verify-otp]", error);
        return c.json(
          {
            error:
              "مدت زمان مجاز شما برای ثبت نام به پایان رسید وبسایت را مجددا بارگزاری کنید",
          },
          400
        );
      }
    }
  );
