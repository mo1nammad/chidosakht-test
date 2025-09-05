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
          message: `مقدار وارد شده باید حداقل ${error.minimum} حرف باشد`,
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

const placeValueMap: { [index: number]: string } = {
  0: "",
  1: "هزار",
  2: "میلیون",
  3: "میلیارد",
};
export function convertRialToTuman(price: number, skipSlice?: boolean) {
  const priceStringified = skipSlice
    ? price.toString()
    : price.toString().slice(0, -1);
  const tumanArray = [];
  const placeValueSeperator = 3;

  if (priceStringified && priceStringified.length < placeValueSeperator) {
    tumanArray.push(priceStringified);
  }

  for (let i = 1; i <= priceStringified.length; i++) {
    if (i % placeValueSeperator === 0) {
      let value = `${priceStringified.at(-i)}${priceStringified.at(
        -i + 1
      )}${priceStringified.at(-i + 2)}`;

      value = removeZeroBehind(value);

      if (value) tumanArray.push(placeValueMap[i / placeValueSeperator - 1]);

      tumanArray.push(value);

      if (
        priceStringified.length - i < placeValueSeperator &&
        priceStringified.length - i > 0
      ) {
        const rest = priceStringified.slice(0, priceStringified.length - i);
        tumanArray.push(placeValueMap[i / placeValueSeperator]);
        tumanArray.push(rest);
      }
    }
  }

  return tumanArray.filter((data) => data !== "");
}

const removeZeroBehind = (data: string) => {
  let index = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === "0") {
      index = i + 1;
    } else break;
  }

  return data.slice(index);
};

export const formatRIAL = (
  amount: number,
  isTuman?: boolean,
  options?: Intl.NumberFormatOptions
) => {
  const price = isTuman ? amount.toString().slice(0, -1) : amount.toString();

  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    ...options,
  }).format(Number(price));
};
