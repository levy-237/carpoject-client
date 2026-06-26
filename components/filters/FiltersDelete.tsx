import { RotateCcw } from "lucide-react";

type FiltersDeleteProps = {
  onReset: () => void;
};

export default function FiltersDelete({ onReset }: FiltersDeleteProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 cursor-pointer"
    >
      <RotateCcw className="size-4" aria-hidden="true" />
      Zurücksetzen
    </button>
  );
}
