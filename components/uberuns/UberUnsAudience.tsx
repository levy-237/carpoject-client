type AudienceCard = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

const audiences: AudienceCard[] = [
  {
    id: "kaeufer",
    title: "Für Käufer",
    description:
      "Du sollst nicht zehn Inserate durchlesen, um die Ladeleistung zu finden. Suche, filter und vergleiche — mit Fokus auf die Daten, die beim E-Auto zählen.",
    points: [
      "Fahrzeuge nach Reichweite, Batterie und Preis filtern",
      "Bis zu drei Autos direkt vergleichen",
      "Interessante Anzeigen als Favoriten speichern",
      "EV-Daten direkt in der Übersicht sehen",
    ],
  },
  {
    id: "verkaeufer",
    title: "Für Verkäufer",
    description:
      "Dein Fahrzeug verdient mehr als ein Foto und drei Zeilen Text. Technische Daten werden strukturiert angezeigt, damit Interessenten schneller verstehen, was du anbietest.",
    points: [
      "Ausstattung und technische Werte klar darstellen",
      "Private und gewerbliche Anbieter möglich",
      "Wichtige Infos nicht im Beschreibungstext verstecken",
      "Anzeige selbst erstellen und verwalten",
    ],
  },
];

export default function UberUnsAudience() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold">Für wen ist die Plattform?</h2>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
          {audiences.map((audience) => (
            <article
              key={audience.id}
              id={audience.id}
              className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6"
            >
              <h3 className="font-semibold text-gray-900">{audience.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {audience.description}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 text-sm text-gray-600">
                {audience.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-gray-300" aria-hidden="true">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
