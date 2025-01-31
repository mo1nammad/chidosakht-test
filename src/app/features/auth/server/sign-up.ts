import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import bcrypt from "bcrypt";

// controllers
import {
  encryptSession,
  decryptSession,
  updateSession,
  generateOtp,
} from "./controllers";

// db
import { db } from "@/db";
import { otpTable, usersTable } from "@/db/schema/index";
import { eq } from "drizzle-orm";

import { signUpSchema } from "../schema";
import { OTP_SESSION_NAME } from "../constant";

const app = new Hono();

type OtpTokenDecoded = {
  phone: string;
  userId: string;
};

export const SignUp = app
  .basePath("/register")
  // TODO : create a middleware
  .post("/request-otp", zValidator("json", signUpSchema), async (c) => {
    const req = c.req.valid("json");

    // check if user exists//
    const checkedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, req.phone))
      .then(([result]) => result);

    if (checkedUser) {
      return c.json(
        { error: "با شماره ی مورد نظر اکانتی ثبت شده لطفا وارد شوید" },
        400
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.password, 10);

    try {
      // signing user info in DB
      const newUser = await db
        .insert(usersTable)
        .values({
          name: req.name,
          password: hashedPassword,
          phone: req.phone,
          email: req.email,
        })
        .returning({ id: usersTable.id, phone: usersTable.phone })
        .then(([data]) => data);

      // otp we should save in database
      const otpCode = generateOtp();
      const otpInserted = await db
        .insert(otpTable)
        .values({
          value: otpCode,
          userId: newUser.id,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        })
        .returning({ value: otpTable.value })
        .then(([data]) => data);

      const otpSession = await encryptSession(
        { phone: newUser.phone, userId: newUser.id },
        "5 minutes"
      );
      setCookie(c, OTP_SESSION_NAME, otpSession, {
        maxAge: 5 * 60, // user can request otp for 5 minutes
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      // TODO send otp code to phone number
      console.log(
        `Generated OTP: ${otpInserted.value} for phone: ${req.phone}`
      );

      return c.json({
        message: "پیامک احراز هویت دو مرحله ای ارسال شد",
        code: otpInserted.value, // remove after adding sms service
      });
    } catch (error) {
      console.log(error, "[/register/request-otp]");
      return c.json({ error: "something went wrong" }, 400);
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
        const decoded = await decryptSession<OtpTokenDecoded>(otpToken);

        const otp = await db
          .select()
          .from(otpTable)
          .where(eq(otpTable.userId, decoded.userId))
          .then(([otp]) => otp);

        if (!otp || new Date(otp.expiresAt).getTime() < Date.now())
          return c.json({ error: "مدت استفاده از کد منقضی شده است" }, 400);

        const otpCheck = input === otp.value;
        if (!otpCheck) return c.json({ error: "Invalid OTP code." }, 400);

        // update account to verified
        console.log(`Phone number ${decoded.phone} verified successfully.`);
        await db
          .update(usersTable)
          .set({ isVerified: true })
          .where(eq(usersTable.id, decoded.userId));

        // delete otp from db
        await db.delete(otpTable).where(eq(otpTable.userId, decoded.userId));
        deleteCookie(c, OTP_SESSION_NAME);

        return c.json({ message: "اکانت شما با موفقیت ساخته شد" });
      } catch (error) {
        console.log("[/register/verify-otp]", error);
        return c.json({ error: "Invalid or expired token." }, 400);
      }
    }
  )
  .get("/verify-otp/eject", (c) => {
    deleteCookie(c, OTP_SESSION_NAME);
    return c.json({ message: "success" });
  })
  .post("/request-otp/resend", async (c) => {
    try {
      const otpToken = getCookie(c, OTP_SESSION_NAME);
      if (!otpToken) return c.json({ error: "token is required" }, 400);

      const decoded = await decryptSession<OtpTokenDecoded>(otpToken);

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
      return c.json({ error: "Invalid or expired token." }, 400);
    }
  });
