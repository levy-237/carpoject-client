"use client";

import { toggleFavourite } from "@/actions/listingActions";
import { showToast } from "@/lib/toast";
import { Loader2, SquareParking, SquareParkingOff } from "lucide-react";
import { useState } from "react";

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

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (isPending) return;

    setIsPending(true);
    try {
      const response = await toggleFavourite(listingId);
      if (response.success) {
        showToast(
          isFavouriteState ? "Favorit entfernt!" : "Favorit hinzugefügt!",
          isFavouriteState ? "info" : "success",
        );
        setIsFavouriteState((prev) => !prev);
      } else {
        showToast(response.message, "error");
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
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`inline-flex cursor-pointer p-2 shrink-0 items-center text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        isFavouriteState
          ? "text-blue-600 hover:text-blue-700"
          : "text-gray-500 hover:text-blue-600"
      }`}
      aria-label={label}
      aria-busy={isPending}
      title={label}
    >
      {isPending ? (
        <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      ) : isFavouriteState ? (
        <SquareParkingOff />
      ) : (
        <SquareParking className="size-6" aria-hidden="true" />
      )}
    </button>
  );
}
