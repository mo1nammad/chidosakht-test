import localFont from "next/font/local";

export const yekanBakhThin = localFont({
  src: "./YekanBakhFaNum-Thin.otf",
  variable: "--font-yekan-thin",
});

export const yekanBakhLight = localFont({
  src: "./YekanBakhFaNum-Light.otf",
  variable: "--font-yekan-light",
});

export const yekanBakhRegular = localFont({
  src: "./YekanBakhFaNum-Regular.otf",
  variable: "--font-yekan-regular",
});

export const yekanBakhSemiBold = localFont({
  src: "./YekanBakhFaNum-SemiBold.otf",
  variable: "--font-yekan-semibold",
});

export const yekanBakhBold = localFont({
  src: "./YekanBakhFaNum-Bold.otf",
  variable: "--font-yekan-bold",
});

export const yekanBakhBlack = localFont({
  src: "./YekanBakhFaNum-Black.otf",
  variable: "--font-yekan-black",
});

export const fontList = [
  yekanBakhRegular,
  yekanBakhSemiBold,
  yekanBakhBlack,
  yekanBakhLight,
];
