"use client";

import Image from "next/image";
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
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={activeImage?.image ?? "/placeholder.png"}
          alt={listing.title}
          className="object-contain"
        />
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
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
