import { Bot, X } from "lucide-react";

export default function AiChatHeader({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-white">
          <Bot className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">AI Assistent</p>
          <p className="text-xs text-gray-500">Immer online</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Chat schließen"
        className="flex size-8 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </header>
  );
}
