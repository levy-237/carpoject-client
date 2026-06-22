import React from "react";

export default function AiIcon({ handleOpen }: { handleOpen: () => void }) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="relative max-w-[280px] max-md:max-w-[200px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-lg">
        <p>Hello, Wie kann ich Ihnen bei der Suche nach einem Auto helfen?</p>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-12"
          aria-hidden="true"
        >
          <path d="M12 8V5" />
          <circle cx="12" cy="3.5" r="1.5" />
          <rect x="4" y="8" width="16" height="11" rx="3" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M9.5 15.5h5" />
          <path d="M7 19v2.5c0 .8.7 1.5 1.5 1.5H9" />
        </svg>
      </button>
    </div>
  );
}
