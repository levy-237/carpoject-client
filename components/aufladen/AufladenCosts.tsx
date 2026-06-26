const costItems = [
  {
    title: "Zuhause",
    text: "Meist am günstigsten und am leichtesten zu planen — besonders wenn du regelmäßig über Nacht laden kannst.",
  },
  {
    title: "Öffentlich",
    text: "Flexibel, aber je nach Anbieter und Standort unterschiedlich. Lohnt sich, Tarife zu vergleichen.",
  },
  {
    title: "Schnellladen",
    text: "Praktisch auf Reisen, normalerweise teurer als AC. Für den Alltag meist nicht die Hauptlösung.",
  },
];

export default function AufladenCosts() {
  return (
    <section id="kosten" className="scroll-mt-24 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-xl font-semibold">Kosten</h2>
        <p className="mb-6 max-w-xl text-sm text-gray-500">
          Beim E-Auto rechnest du in kWh, nicht in Litern. Strompreis, Verbrauch
          und wo du lädst bestimmen die Kosten.
        </p>

        <div className="flex flex-col gap-3">
          {costItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-4"
            >
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
