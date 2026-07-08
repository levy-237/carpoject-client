import { Construction } from "lucide-react";
import Link from "next/link";

type UnderMaintenanceProps = {
  title?: string;
  description?: string;
};

export default function UnderMaintenance({
  title = "Diese Seite ist in Wartung",
  description = "Wir arbeiten gerade an diesem Bereich. Schau bitte bald wieder vorbei.",
}: UnderMaintenanceProps) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-6 py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-gray-200 bg-white px-8 py-12 text-center shadow-sm">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-gray-900 text-white">
          <Construction className="size-8" aria-hidden="true" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Under Maintenance
        </p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          {description}
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
