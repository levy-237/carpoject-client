"use client";

import { useRouter } from "next/navigation";
import FiltersDelete from "./FiltersDelete";

export default function FormActions({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center ${className}`}
    >
      <FiltersDelete onReset={() => router.push("/listings")} />

      <button
        type="submit"
        className="rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
      >
        Suchen
      </button>
    </div>
  );
}
