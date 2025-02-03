import { z } from "zod";
import { customErrorMap } from "@/lib/utils";

z.setErrorMap(customErrorMap);

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(64),
  phone: z.coerce
    .string()
    .regex(
      /^9[0-9]{9}$/,
      "شماره تماس باید با 09 یا +98 شروع شود و حداکثر 11 رقم باشد"
    ),
  email: z.union([z.literal(""), z.string().email().max(64)]),
  password: z.string().min(6).max(64),
});

export const loginNoOtpSchema = z.object({
  phone: z.coerce
    .string()
    .regex(
      /^9[0-9]{9}$/,
      "شماره تماس باید با 09 یا +98 شروع شود و حداکثر 11 رقم باشد"
    ),
  password: z.string().min(0).max(64), // any user should be able to login if there is a bug in password or username
});

export const loginWithOtpSchema = z.object({
  phone: z.coerce
    .string()
    .regex(
      /^9[0-9]{9}$/,
      "شماره تماس باید با 09 یا +98 شروع شود و حداکثر 11 رقم باشد"
    ),
});
