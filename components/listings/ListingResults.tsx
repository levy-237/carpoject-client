"use client";

import { useEffect, useState } from "react";
import DetailSearchModal from "@/components/filters/DetailSearchModal";
import { fetchListings, type Listing } from "@/lib/listings";
import ListingCard from "./ListingCard";
import ListingResultsEmpty from "./ListingResultsEmpty";
import Pagination from "./Pagination";
import ListingResultsSkeleton from "../skeletons&&errors/ListingResultsSkeleton";
import {
  parseAsArrayOf,
  parseAsInteger,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { detailSearchParsers } from "@/lib/detail-search";
import { useRouter } from "next/navigation";
import FiltersDelete from "../filters/FiltersDelete";
import { type UserProfile } from "@/actions/authActions";
import ListingCompareButton from "./ListingCompareButton";

export default function ListingResults({ user }: { user: UserProfile | null }) {
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [results, setResults] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters] = useQueryStates(detailSearchParsers);

  const [compareListings, setCompareListings] = useQueryState<number[]>(
    "compare",
    parseAsArrayOf(parseAsInteger),
  );

  const handleAddToCompare = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (compareListings && compareListings.includes(id)) {
      setCompareListings(
        compareListings.filter((listingId) => listingId !== id),
      );
    } else {
      if (compareListings && compareListings.length >= 3) {
        alert("You can only compare up to 3 listings");
        return;
      }
      setCompareListings([...(compareListings || []), id]);
    }
  };

  const isInCompare = (id: number) => compareListings?.includes(id) || false;

  const isComparationOn = compareListings && compareListings.length > 0;

  useEffect(() => {
    let isCancelled = false;

    async function loadListings() {
      try {
        setIsLoading(true);
        setError(null);

        const url = new URLSearchParams();
        for (const [key, value] of Object.entries(filters)) {
          if (typeof value === "string" && value) {
            url.set(key, value.toString().trim());
          } else if (Array.isArray(value) && value.length > 0) {
            for (const item of value) {
              url.set(key, item.toString().trim());
            }
          }
        }

        const data = await fetchListings(url.toString());

        if (!isCancelled) {
          setCount(data.count);
          setResults(data.results);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch listings",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadListings();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  if (isLoading) {
    return <ListingResultsSkeleton />;
  }

  if (error) {
    return (
      <section className="flex min-w-0 w-full max-w-4xl flex-1 flex-col gap-4">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 w-full max-w-4xl flex-1 flex-col gap-4">
      {results.length > 0 ? (
        <>
          {" "}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500">{count} Ergebnisse</p>
            <div className="flex items-center gap-4">
              <FiltersDelete onReset={() => router.push("/listings")} />
              <div className="lg:hidden flex items-center gap-4">
                <DetailSearchModal />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {results.map((listing) => {
              const isFavourite =
                user?.favourite_listings.includes(listing.id) || false;
              return (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isFavourite={isFavourite}
                  variant="default"
                  handleAddToCompare={handleAddToCompare}
                  isInCompare={isInCompare}
                />
              );
            })}
          </div>
          <Pagination count={count} />{" "}
          {isComparationOn && (
            <ListingCompareButton compareListings={compareListings} />
          )}
        </>
      ) : (
        <ListingResultsEmpty filters={filters} />
      )}
    </section>
  );
}
