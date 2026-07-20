import Link from "next/link";

const checklist = [
  "Passt die reale Reichweite zu deinem Alltag?",
  "Kannst du zuhause oder in der Nähe laden?",
  "Wie schnell lädt das Auto mit AC und DC?",
  "Hat das Fahrzeug eine Wärmepumpe?",
  "Wie groß ist die Batterie im Verhältnis zum Verbrauch?",
  "Sind Ladekabel und Adapter im Angebot dabei?",
];

export default function AufladenChecklist() {
  return (
    <section
      id="kaufberatung"
      className="scroll-mt-24 px-4 py-8 pb-16"
      data-testid="aufladen-checklist"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-xl font-semibold">Vor dem Kauf</h2>
        <p className="mb-6 max-w-xl text-sm text-gray-500">
          Beim E-Auto zählt Laden genauso wie Preis und Reichweite. Zwei Autos
          können auf dem Papier ähnlich aussehen, sich im Alltag aber sehr
          unterschiedlich anfühlen.
        </p>

        <ul className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
          {checklist.map((item) => (
            <li
              key={item}
              className="border-b border-gray-100 py-3 text-sm leading-6 text-gray-700 last:border-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
