import { toast } from "react-toastify";

export type ToastVariant = "success" | "error" | "info";

const toastOptions = {
  position: "top-center" as const,
};

export function showToast(message: string, variant: ToastVariant) {
  switch (variant) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
  }
}
