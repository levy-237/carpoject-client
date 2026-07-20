import { Home, Plug, Zap, type LucideIcon } from "lucide-react";

type ChargingMethod = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

const methods: ChargingMethod[] = [
  {
    id: "zuhause",
    title: "Zuhause",
    description:
      "Über Nacht laden ist für die meisten Fahrer der Alltag. Mit Wallbox oder Steckdose — langsam, aber planbar.",
    points: [
      "Am besten mit fester Garage oder Stellplatz",
      "Gut für Pendler und Familien",
      "Stromkosten meist am übersichtlichsten",
    ],
    icon: Home,
  },
  {
    id: "oeffentlich",
    title: "Öffentlich",
    description:
      "Ladesäulen beim Einkaufen, im Büro oder in der Stadt. Praktisch, wenn du zuhause nicht laden kannst.",
    points: [
      "Sinnvoll bei längeren Standzeiten",
      "Tarife und Apps vorher vergleichen",
      "In Städten oft die einzige Option",
    ],
    icon: Plug,
  },
  {
    id: "schnellladen",
    title: "Schnellladen (DC)",
    description:
      "Für Autobahn und lange Strecken. Wichtig: nicht nur die max. kW, sondern wie schnell das Auto zwischen 20 und 80 % wirklich lädt.",
    points: [
      "Auf Reisen unverzichtbar",
      "20–80 % ist meist relevanter als 0–100 %",
      "Teurer als langsames AC-Laden",
    ],
    icon: Zap,
  },
];

export default function AufladenMethods() {
  return (
    <section className="px-4 py-8" data-testid="aufladen-methods">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold">Drei Ladearten</h2>

        <div className="flex flex-col gap-4">
          {methods.map((method) => {
            const Icon = method.icon;

            return (
              <article
                key={method.id}
                id={method.id}
                className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className="size-5 shrink-0 text-gray-500"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold text-gray-900">
                    {method.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {method.description}
                </p>

                <ul className="mt-4 flex flex-col gap-1.5 text-sm text-gray-600">
                  {method.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-gray-300" aria-hidden="true">
                        —
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
