"use client";

import { useEffect, useRef, useState } from "react";
import ActiveFilterCountBadge from "./ActiveFilterCountBadge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type ApiFilterItem = {
  id: string;
  name: string;
};

export type SelectedFilterIds = number[];

type DropDownFilterProps = {
  apiName: string;
  name: string;
  value: SelectedFilterIds;
  onChange: (selectedIds: SelectedFilterIds) => void;
  searchable?: boolean;
  disabled?: boolean;
};

export default function DropDownFilter({
  apiName,
  name,
  value,
  onChange,
  searchable = true,
  disabled = false,
}: DropDownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<ApiFilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (searchable && search && search.length < 2) return;

    const fetchOptions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const query =
          searchable && search.trim()
            ? `?name=${encodeURIComponent(search.trim())}`
            : "";
        const url = `${API_BASE_URL}${apiName}${query}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch filter options");
        }

        const data = await response.json();
        const results: ApiFilterItem[] = data.results.map(
          (item: ApiFilterItem) => ({
            ...item,
            id: String(item.id),
          }),
        );
        setOptions(results);
      } catch {
        setError("Could not load options");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [isOpen, apiName, search, searchable]);

  const handleToggleOpen = () => {
    if (disabled) return;

    setIsOpen((prev) => {
      if (prev) setSearch("");
      return !prev;
    });
  };

  const handleToggleOption = (option: ApiFilterItem) => {
    const optionId = Number(option.id);
    const isAlreadySelected = value.includes(optionId);

    const nextValue = isAlreadySelected
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];

    onChange(nextValue);
  };

  const selectedCount = value.length;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={handleToggleOpen}
        className={`flex w-full items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "border-gray-400 shadow-sm"
            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className="truncate text-left">{name}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5">
          <ActiveFilterCountBadge count={selectedCount} />
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="fadeIn absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {searchable && (
            <div className="border-b border-gray-100 p-3">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${name.toLowerCase()}...`}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
                />
              </div>
            </div>
          )}

          <ul className="max-h-56 overflow-y-auto p-2">
            {isLoading ? (
              <li className="px-3 py-6 text-center text-sm text-gray-400">
                Loading...
              </li>
            ) : error ? (
              <li className="px-3 py-6 text-center text-sm text-red-500">
                {error}
              </li>
            ) : options.length > 0 ? (
              options.map((option) => {
                const isSelected = value.includes(Number(option.id));

                return (
                  <li key={option.id}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleOption(option)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
                      />
                      <span className="text-sm text-gray-800">
                        {option.name}
                      </span>
                    </label>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-6 text-center text-sm text-gray-400">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
