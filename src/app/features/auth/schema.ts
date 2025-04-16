import { z } from "zod";
import { customErrorMap } from "@/lib/utils";

z.setErrorMap(customErrorMap);

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2).max(64),
  phoneNumber: z.coerce
    .string()
    .regex(/^9[0-9]{9}$/, "شماره تماس باید با 9 شروع شود و حداکثر 10 رقم باشد")
    .transform((state) => `0${state}`),
  email: z.union([z.literal(""), z.string().email().max(64)]).nullable(),
  password: z.string().min(6).max(64),
  rePassword: z.string().min(6).max(64),
});

export const loginNoOtpSchema = z.object({
  phoneNumber: z.coerce
    .string()
    .regex(/^9[0-9]{9}$/, "شماره تماس باید با 9 شروع شود و حداکثر 10 رقم باشد")
    .min(1)
    .transform((state) => `0${state}`),

  password: z.string().min(1).max(64), // any user should be able to login if there is a bug in password or username
});

export const loginWithOtpSchema = z.object({
  phoneNumber: z.coerce
    .string()
    .regex(/^9[0-9]{9}$/, "شماره تماس باید با 9 شروع شود و حداکثر 10 رقم باشد")
    .min(1)
    .transform((state) => `0${state}`),
});
