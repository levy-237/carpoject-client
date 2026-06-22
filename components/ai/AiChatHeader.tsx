import React from "react";

export default function AiChatHeader({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="M12 8V5" />
            <circle cx="12" cy="3.5" r="1.5" />
            <rect x="4" y="8" width="16" height="11" rx="3" />
            <path d="M9 12h.01" />
            <path d="M15 12h.01" />
          </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </header>
  );
}
