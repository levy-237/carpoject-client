import Link from "next/link";

const features = [
  "Suche nach Marke, Modell, Preis, Kilometerstand und Baujahr",
  "EV-Filter: Reichweite, Batterie, Ladeleistung, Wärmepumpe und mehr",
  "Favoriten zum Speichern interessanter Anzeigen",
  "Detailseiten mit technischen Daten und Verkäuferinfo",
  "KI-Assistent für Fragen rund ums E-Auto",
];

export default function UberUnsFeatures() {
  return (
    <section id="funktionen" className="scroll-mt-24 px-4 py-8 pb-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-xl font-semibold">Was die Plattform kann</h2>
        <p className="mb-6 max-w-xl text-sm text-gray-500">
          Keine Spielereien — nur Funktionen, die beim Suchen und Vergleichen
          wirklich helfen.
        </p>

        <ul className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="border-b border-gray-100 py-3 text-sm leading-6 text-gray-700 last:border-0"
            >
              {feature}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-gray-500">
          <Link
            href="/aufladen"
            className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900"
          >
            Mehr zum Laden
          </Link>
        </p>
      </div>
    </section>
  );
}
