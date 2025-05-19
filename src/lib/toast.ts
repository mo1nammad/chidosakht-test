import React from "react";
import { toast as sonner, ExternalToast } from "sonner";

// the list of toast keys we gonna use like sonner.success() or ...
const toastKeys = ["success", "error"] as const;
type ToastKey = (typeof toastKeys)[number];

// edit this object for static configurations on sonner toaster
const Options: ExternalToast = {
  position: "top-center",
  richColors: true,
  className: "flex-row-reverse! gap-x-4!",
};

const preferedConfig: Record<ToastKey, ExternalToast> = {
  error: Options,
  success: Options,
};

export function toaster(
  type: ToastKey,
  message: string | React.ReactNode,
  options?: ExternalToast
) {
  sonner[type](message, { ...preferedConfig[type], ...options });
}

// create a Map of each toastKeys with its toaster function to call
const toastMap = new Map(
  toastKeys.map((type) => [
    type,
    (message: string | React.ReactNode, options?: ExternalToast) =>
      toaster(type, message, options),
  ])
);

// convert the Map to object => eg : toast.success = callable toaster function
export const toast = Object.fromEntries(toastMap) as Record<
  ToastKey,
  (msg: string | React.ReactNode, opts?: ExternalToast) => void
>;
