export default function FormActions({
  className = "",
  onReset,
}: {
  className?: string;
  onReset: () => void;
}) {
  return (
    <div
      className={`flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center ${className}`}
    >
      <button
        type="button"
        onClick={onReset}
        className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
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
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Zurücksetzen
      </button>

      <button
        type="submit"
        className="rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
      >
        Suchen
      </button>
    </div>
  );
}
