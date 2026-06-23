import { useCallback, useRef, useState } from "react";

export type NotificationColor = "success" | "error" | "info";

const NOTIFICATION_DURATION_MS = 2000;

export default function useNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationColor, setNotificationColor] =
    useState<NotificationColor>("success");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNotification = useCallback(
    (text: string, color: NotificationColor = "success") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setNotificationText(text);
      setNotificationColor(color);
      setShowNotification(true);

      timeoutRef.current = setTimeout(() => {
        setShowNotification(false);
      }, NOTIFICATION_DURATION_MS);
    },
    [],
  );

  const dismissNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowNotification(false);
  }, []);

  return {
    showNotification,
    handleNotification,
    dismissNotification,
    notificationText,
    notificationColor,
  };
}
