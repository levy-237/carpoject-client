import { X } from "lucide-react";
import type { NotificationColor } from "@/hooks/useNotification";

const colorClasses: Record<NotificationColor, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-gray-900 text-white",
};

type NotificationToastProps = {
  show: boolean;
  text: string;
  color: NotificationColor;
  onDismiss: () => void;
};

export default function NotificationToast({
  show,
  text,
  color,
  onDismiss,
}: NotificationToastProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fadeIn pointer-events-none fixed inset-x-4 top-10 z-[80] flex justify-center sm:top-24"
    >
      <div
        className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl px-4 py-3 text-sm font-medium shadow-lg ${colorClasses[color]}`}
      >
        <p className="flex-1">{text}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full p-0.5 opacity-80 transition-opacity hover:opacity-100"
          aria-label="Benachrichtigung schließen"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
