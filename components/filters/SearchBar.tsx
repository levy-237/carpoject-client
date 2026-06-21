"use client";

type SearchBarProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value = "", onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
        value={value}
        placeholder="Suche nach Fahrzeug, Marke oder Modell..."
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-gray-200 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
      />
    </div>
  );
}
