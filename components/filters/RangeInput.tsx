type RangeInputProps = {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  inputMode?: "numeric" | "decimal";
};

export default function RangeInput({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  inputMode = "numeric",
}: RangeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          inputMode={inputMode}
          value={minValue}
          onChange={(event) => onMinChange(event.target.value)}
          placeholder={minPlaceholder}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
        />
        <input
          type="text"
          inputMode={inputMode}
          value={maxValue}
          onChange={(event) => onMaxChange(event.target.value)}
          placeholder={maxPlaceholder}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
        />
      </div>
    </div>
  );
}
