import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      return {
        message: `Expected a ${error.expected}, but received a ${error.received}.`,
      };

    case z.ZodIssueCode.invalid_string:
      if (error.validation === "email") {
        return {
          message: "لطفا ایمیل را به درستی وارد کنید",
        };
      }
      break;

    case z.ZodIssueCode.too_small:
      if (error.minimum !== undefined) {
        return {
          message: `مقدار وارد شده باید حداقل ${error.minimum} باشد`,
        };
      }
      break;

    case z.ZodIssueCode.too_big:
      if (error.maximum !== undefined) {
        return {
          message: `مقدار وارد شده باید حداکثر ${error.maximum} باشد`,
        };
      }
      break;

    default:
      // Fallback to the default error message
      return { message: ctx.defaultError };
  }
  return { message: ctx.defaultError };
};
