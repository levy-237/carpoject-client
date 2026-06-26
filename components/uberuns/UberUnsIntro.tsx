import Link from "next/link";

export default function UberUnsIntro() {
  return (
    <section className="px-4 py-12 max-md:py-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-900">Über uns</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Wir sind ein Marktplatz nur für Elektroautos. Nicht noch eine
          Autobörse mit tausend Filtern — sondern eine Seite, auf der Reichweite,
          Batterie und Ladeleistung genauso wichtig sind wie Preis und
          Kilometerstand.
        </p>
        <Link
          href="/listings"
          className="mt-8 inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
        >
          Passende Fahrzeuge finden
        </Link>
      </div>
    </section>
  );
}
