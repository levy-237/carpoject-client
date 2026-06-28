"use client";

import { useState } from "react";
import type { Listing } from "@/lib/listings";

export default function ListingImageGallery({ listing }: { listing: Listing }) {
  const images =
    listing.images.length > 0
      ? listing.images
      : listing.cover_image
        ? [listing.cover_image]
        : [];

  const [activeIndex, setActiveIndex] = useState(
    Math.max(
      0,
      images.findIndex((image) => image.is_cover),
    ),
  );

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={activeImage?.image ?? "/placeholder.png"}
          alt={listing.title}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {images.length > 0 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-white">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-gray-100 transition-colors ${
                index === activeIndex
                  ? "border-gray-900"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image.image}
                alt={`${listing.title} ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
