import { Bot } from "lucide-react";

export default function AiIcon({ handleOpen }: { handleOpen: () => void }) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="relative max-w-[280px] max-md:max-w-[200px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-lg">
        <p>Hallo, kann ich dir bei der Suche nach einem Auto helfen?</p>
        <span
          aria-hidden="true"
          className="absolute -bottom-2 right-8 size-4 rotate-45 border-r border-b border-gray-200 bg-white"
        />
      </div>
      <button
        type="button"
        onClick={handleOpen}
        className="flex size-23 max-sm:size-18 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-colors duration-200 hover:bg-gray-700"
        aria-label="AI Chat öffnen"
      >
        <Bot className="size-12" aria-hidden="true" />
      </button>
    </div>
  );
}
