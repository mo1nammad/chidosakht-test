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
export function convertRialToTuman(rial: number) {
  const rialStringified = rial.toString().slice(0, -1);
  const tumanArray = [];
  const placeValueSeperator = 3;

  if (rialStringified && rialStringified.length < placeValueSeperator) {
    tumanArray.push(rialStringified);
  }

  for (let i = 1; i <= rialStringified.length; i++) {
    if (i % placeValueSeperator === 0) {
      const value = `${rialStringified.at(-i)}${rialStringified.at(
        -i + 1
      )}${rialStringified.at(-i + 2)}`;

      tumanArray.push(removeZeroBehind(value));

      if (rialStringified.at(-i - 1)) {
        tumanArray.push(placeValueMap[i / placeValueSeperator]);
      }

      if (
        rialStringified.length - i < placeValueSeperator &&
        rialStringified.length - i > 0
      ) {
        const rest = rialStringified.slice(0, rialStringified.length - i);
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
