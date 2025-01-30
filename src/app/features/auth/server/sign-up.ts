import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// db
import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { signUpSchema } from "../schema";
import { OTP_SESSION_NAME, AUTH_SESSION_NAME } from "../constant";
import { eq } from "drizzle-orm";

const app = new Hono();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;

type SignupSchema = z.infer<typeof signUpSchema>;
type OtpTokenDecoded = SignupSchema & {
  otpCode: string;
};

export const SignUp = app
  .basePath("/register")
  // TODO : create a middleware
  .post("/request-otp", zValidator("json", signUpSchema), async (c) => {
    const req = c.req.valid("json");

    // TODO check if user exists//
    const checkedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, req.phone))
      .then(([result]) => result);

    if (checkedUser)
      return c.json({ message: "phone number exists in database" }, 400);

    // otp
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 رقمی string
    const expiresIn = 5 * 60;

    // hash otp code & password
    const hashedOtp = await bcrypt.hash(otpCode, 10);
    const hashedPassword = await bcrypt.hash(req.password, 10);

    // otp token we should save in database
    const otpSession = jwt.sign(
      {
        ...req,
        password: hashedPassword,
        otpCode: hashedOtp,
      },
      SECRET_KEY,
      {
        expiresIn,
      }
    );

    // TODO send otp code to phone number
    console.log(`Generated OTP: ${otpCode} for phone: ${req.phone}`);
    // store token in DB
    setCookie(c, OTP_SESSION_NAME, otpSession, {
      maxAge: 60 * 3,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return c.json({ message: "پیامک احراز هویت دو مرحله ای ارسال شد" });
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
      const { otp } = c.req.valid("json");

      const otpToken = getCookie(c, OTP_SESSION_NAME);

      if (!otpToken) return c.json({ message: "token is required" }, 400);

      try {
        // verificaton 2
        const decoded = jwt.verify(otpToken, SECRET_KEY) as OtpTokenDecoded;

        const otpCheck = await bcrypt.compare(otp, decoded.otpCode);
        if (!otpCheck) return c.json({ error: "Invalid OTP code." }, 400);

        console.log(`Phone number ${decoded.phone} verified successfully.`);
        // signing 3

        // signing user info in DB
        await db.insert(usersTable).values({
          name: decoded.name,
          password: decoded.password,
          phone: decoded.phone,
          email: decoded.email,
        });

        // set new authorization cookie and delete otp session
        const session = jwt.sign(
          {
            phone: decoded.phone,
            name: decoded.name,
            email: decoded.email ?? null,
            password: decoded.password,
          },
          SECRET_KEY,
          { expiresIn: "7d" }
        );

        deleteCookie(c, OTP_SESSION_NAME);
        setCookie(c, AUTH_SESSION_NAME, session, {
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        return c.json({ message: "User verified successfully." });
      } catch (error) {
        console.log("/verify-otp route", error);
        return c.json({ error: "Invalid or expired token." }, 400);
      }
    }
  )
  .get("/verify-otp/eject", (c) => {
    deleteCookie(c, OTP_SESSION_NAME);
    return c.json({ message: "success" });
  });
