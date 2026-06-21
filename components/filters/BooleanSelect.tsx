import type { BooleanFilterValue } from "@/lib/detail-search";

type BooleanSelectProps = {
  label: string;
  value: BooleanFilterValue;
  onChange: (value: BooleanFilterValue) => void;
};

export default function BooleanSelect({
  label,
  value,
  onChange,
}: BooleanSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as BooleanFilterValue)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-gray-400"
      >
        <option value="">Alle</option>
        <option value="true">Ja</option>
        <option value="false">Nein</option>
      </select>
    </div>
  );
}
