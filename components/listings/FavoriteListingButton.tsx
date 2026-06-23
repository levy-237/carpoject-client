"use client";

import { toggleFavourite } from "@/actions/listingActions";
import NotificationToast from "@/components/ui/NotificationToast";
import useNotification from "@/hooks/useNotification";
import { useState } from "react";

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-6 animate-spin"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function ParkingSignIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="size-6"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M9.5 8.5h3.25c1.52 0 2.75 1.01 2.75 2.25S14.27 13 12.75 13H11v2.5H9.5V8.5Zm2 3.25h1.25c.69 0 1.25-.45 1.25-1s-.56-1-1.25-1H11.5v2Z"
        fill={active ? "white" : "currentColor"}
      />
    </svg>
  );
}

type FavoriteListingButtonProps = {
  isFavourite: boolean;
  listingId: number;
};

export default function FavoriteListingButton({
  isFavourite,
  listingId,
}: FavoriteListingButtonProps) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);
  const [isPending, setIsPending] = useState(false);
  const {
    showNotification,
    handleNotification,
    dismissNotification,
    notificationText,
    notificationColor,
  } = useNotification();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (isPending) return;

    setIsPending(true);
    try {
      const response = await toggleFavourite(listingId);
      if (response.success) {
        setIsFavouriteState((prev) => !prev);
      } else {
        handleNotification(response.message, "error");
      }
    } finally {
      setIsPending(false);
    }
  }

  const label = isPending
    ? "Wird gespeichert..."
    : isFavouriteState
      ? "Aus Favoriten entfernen"
      : "Zu Favoriten hinzufügen";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={`inline-flex shrink-0 items-center text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          isFavouriteState
            ? "text-blue-600 hover:text-blue-700"
            : "text-gray-500 hover:text-blue-600"
        }`}
        aria-label={label}
        aria-busy={isPending}
        title={label}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <ParkingSignIcon active={isFavouriteState} />
        )}
      </button>

      <NotificationToast
        show={showNotification}
        text={notificationText}
        color={notificationColor}
        onDismiss={dismissNotification}
      />
    </>
  );
}
