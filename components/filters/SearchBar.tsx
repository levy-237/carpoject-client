"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value = "", onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        placeholder="Suche nach Fahrzeug, Marke oder Modell..."
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-gray-200 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
      />
    </div>
  );
}
