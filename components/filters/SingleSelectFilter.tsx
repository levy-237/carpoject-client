"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type ApiFilterItem = {
  id: string;
  name: string;
};

type SingleSelectFilterProps = {
  apiName: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  placeholder?: string;
};

const selectClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50";

export default function SingleSelectFilter({
  apiName,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = "Bitte wählen",
}: SingleSelectFilterProps) {
  const [options, setOptions] = useState<ApiFilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (disabled) {
      setOptions([]);
      return;
    }

    const fetchOptions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${API_BASE_URL}${apiName}`;
        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch options");
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
        setError("Optionen konnten nicht geladen werden");
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [apiName, disabled]);

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
      {label}
      <select
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue ? Number(nextValue) : null);
        }}
        disabled={disabled || isLoading}
        className={selectClass}
      >
        <option value="">
          {isLoading ? "Laden..." : (error ?? placeholder)}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-normal text-red-600">{error}</span>
      )}
    </label>
  );
}
