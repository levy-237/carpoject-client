import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "E-Auto aufladen | E-AutoKauf",
  description:
    "Alles Wichtige zum Laden von Elektroautos: zuhause laden, öffentlich laden, Schnellladen, Kosten und Kaufberatung.",
};

type ChargingCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
};

const chargingSections: ChargingCard[] = [
  {
    id: "zuhause-laden",
    eyebrow: "Alltag",
    title: "Zuhause laden",
    description:
      "Für viele Fahrer ist das Laden zuhause die bequemste Lösung. Das Auto steht über Nacht, lädt langsam und ist am nächsten Morgen wieder bereit.",
    points: [
      "Ideal mit Wallbox, Garage oder fixem Stellplatz",
      "Sehr angenehm für Pendler und Familien",
      "Planbare Kosten durch regelmäßiges Laden zuhause",
    ],
    icon: <HomeIcon />,
  },
  {
    id: "oeffentlich-laden",
    eyebrow: "Unterwegs",
    title: "Öffentlich laden",
    description:
      "Öffentliche Ladesäulen sind praktisch beim Einkaufen, im Büro, in der Stadt oder wenn du keine eigene Lademöglichkeit hast.",
    points: [
      "Gut für längere Standzeiten",
      "Hilfreich in Städten und Wohngebieten",
      "Ladekarten und Apps vorher vergleichen",
    ],
    icon: <PlugIcon />,
  },
  {
    id: "schnellladen",
    eyebrow: "Langstrecke",
    title: "Schnellladen",
    description:
      "DC-Schnellladen ist besonders auf Reisen wichtig. Entscheidend ist nicht nur die maximale Ladeleistung, sondern auch die Ladekurve.",
    points: [
      "Wichtig für Autobahn und lange Strecken",
      "20–80 % ist oft relevanter als 0–100 %",
      "Akkugröße, Verbrauch und Ladeleistung zusammen betrachten",
    ],
    icon: <BoltIcon />,
  },
];

const AnchorLinkStyle =
  "shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold text-neutral-700 shadow-sm transition hover:border-emerald-700/30 hover:bg-emerald-50 hover:text-emerald-800";
const costItems = [
  {
    title: "Zuhause",
    text: "Meist am angenehmsten und gut planbar, besonders wenn du regelmäßig über Nacht laden kannst.",
  },
  {
    title: "Öffentlich",
    text: "Flexibel, aber je nach Anbieter, Standort und Tarif unterschiedlich teuer.",
  },
  {
    title: "Schnellladen",
    text: "Sehr praktisch auf Reisen, aber normalerweise teurer als langsames AC-Laden.",
  },
];

const checklist = [
  "Passt die reale Reichweite zu deinem Alltag?",
  "Kannst du zuhause, am Arbeitsplatz oder in der Nähe laden?",
  "Wie schnell lädt das Auto mit AC und DC?",
  "Hat das Fahrzeug eine Wärmepumpe?",
  "Wie groß ist die Batterie im Verhältnis zum Verbrauch?",
  "Sind Ladekabel und Ladeadapter im Angebot enthalten?",
];

export default function AufladenPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute left-[-12rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-[-10rem] top-10 h-[26rem] w-[26rem] rounded-full bg-blue-300/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.08fr_0.92fr] md:px-10 md:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 w-fit rounded-full border border-emerald-900/10 bg-white/60 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
              E-Auto laden einfach erklärt
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-neutral-950 md:text-7xl">
              Aufladen ohne Stress.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
              Ob zuhause, öffentlich oder auf Langstrecke: Hier findest du die
              wichtigsten Infos zum Laden von Elektroautos — klar, praktisch und
              auf den Autokauf bezogen.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listings"
                className="rounded-full bg-neutral-950 px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-neutral-950/15 transition hover:-translate-y-0.5 hover:bg-black"
              >
                E-Autos ansehen
              </Link>

              <Link
                href="#kaufberatung"
                className="rounded-full border border-neutral-950/15 bg-white/70 px-7 py-4 text-center text-sm font-bold text-neutral-950 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Kaufberatung lesen
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-2xl shadow-neutral-950/10 backdrop-blur-xl md:p-7">
              <div className="rounded-[1.5rem] bg-neutral-950 p-6 text-white">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-neutral-950">
                    <BoltIcon />
                  </div>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
                    20–80 %
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-[-0.04em]">
                  Ladezeit richtig verstehen
                </h2>

                <p className="mt-4 leading-7 text-white/70">
                  Im Alltag zählt selten eine volle Ladung von 0 auf 100 %.
                  Wichtiger ist, wie schnell du genug Reichweite für deine
                  nächste Fahrt bekommst.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <MiniStat label="Alltag" value="AC-Laden" />
                  <MiniStat label="Reisen" value="DC-Laden" />
                  <MiniStat label="Kosten" value="€/kWh" />
                  <MiniStat label="Wichtig" value="Reichweite" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-10">
          <Link href="#zuhause-laden" className={AnchorLinkStyle}>
            Zuhause laden
          </Link>
          <Link href="#oeffentlich-laden" className={AnchorLinkStyle}>
            Öffentlich laden
          </Link>
          <Link href="#schnellladen" className={AnchorLinkStyle}>
            Schnellladen
          </Link>
          <Link href="#kosten" className={AnchorLinkStyle}>
            Kosten
          </Link>
          <Link href="#kaufberatung" className={AnchorLinkStyle}>
            Kaufberatung
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <SectionIntro
          eyebrow="Lademöglichkeiten"
          title="Drei Ladearten. Drei verschiedene Zwecke."
          text="Ein gutes E-Auto passt nicht nur wegen Preis und Design zu dir. Es muss auch zu deinem Lade-Alltag passen."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {chargingSections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-[2rem] border border-black/10 bg-white/70 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-950/10"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  {section.icon}
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {section.eyebrow}
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-[-0.04em]">
                {section.title}
              </h2>

              <p className="mt-4 leading-7 text-neutral-600">
                {section.description}
              </p>

              <ul className="mt-6 space-y-3">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm font-medium leading-6 text-neutral-700"
                  >
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="kosten" className="scroll-mt-28 bg-white/55 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <div>
            <SectionIntro
              eyebrow="Kosten"
              title="Laden wird in kWh gedacht, nicht in Litern."
              text="Beim E-Auto vergleichst du Strompreis, Verbrauch und Ladeverhalten. Dadurch wird der Alltag oft besser planbar."
            />

            <div className="mt-8 rounded-[2rem] bg-neutral-950 p-7 text-white shadow-2xl shadow-neutral-950/15">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Merksatz
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.04em]">
                Je öfter du langsam und planbar lädst, desto entspannter wird
                der E-Auto-Alltag.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {costItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-black tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="kaufberatung"
        className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 md:px-10 md:py-24"
      >
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <SectionIntro
              eyebrow="Vor dem Kauf"
              title="Darauf solltest du beim E-Auto achten."
              text="Die Ladefähigkeit ist ein echter Kauf-Faktor. Zwei Autos können ähnliche Reichweite haben, sich im Alltag aber komplett unterschiedlich anfühlen."
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listings"
                className="rounded-full bg-neutral-950 px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-black"
              >
                Fahrzeuge suchen
              </Link>

              <Link
                href="/listings?ordering=price"
                className="rounded-full border border-neutral-950/15 bg-white px-7 py-4 text-center text-sm font-bold text-neutral-950 transition hover:bg-neutral-50"
              >
                Angebote vergleichen
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-sm">
            <ul className="space-y-4">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl bg-neutral-50 p-4 text-sm font-semibold leading-6 text-neutral-750"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-neutral-950 via-neutral-800 to-emerald-950 p-8 text-white shadow-2xl shadow-neutral-950/20 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                E-AutoKauf
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                Finde ein E-Auto, das zu deinem Lade-Alltag passt.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/70">
                Vergleiche Reichweite, Batterie, Ladeleistung, Preis und
                Ausstattung. So findest du nicht nur ein schönes Auto, sondern
                eines, das praktisch zu deinem Leben passt.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/listings"
                className="rounded-full bg-white px-7 py-4 text-center text-sm font-black text-neutral-950 transition hover:bg-neutral-100"
              >
                Jetzt E-Autos entdecken
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-neutral-950 md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-neutral-600">{text}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
        {label}
      </p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 shrink-0 text-emerald-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42 0L3.29 9.224a1 1 0 0 1 1.42-1.408l4.04 4.074 6.54-6.594a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.2 2.4 4.6 13.2c-.5.7 0 1.8.9 1.8h5.1l-.8 6.3c-.1 1.1 1.2 1.7 1.9.8l8.6-11c.5-.7 0-1.7-.9-1.7h-5.1l.8-6.1c.2-1.1-1.2-1.8-1.9-.9Z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.3 2.7a1 1 0 0 1 1.4 0l8 7.4a1 1 0 0 1-1.4 1.5l-.3-.3V20a1 1 0 0 1-1 1h-4.2a1 1 0 0 1-1-1v-4.5h-1.6V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8.7l-.3.3a1 1 0 1 1-1.4-1.5l8-7.4Z" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 2a1 1 0 0 1 1 1v4h2V3a1 1 0 1 1 2 0v4h1a2 2 0 0 1 2 2v2.5a5 5 0 0 1-4 4.9V19a3 3 0 0 0 3 3h1a1 1 0 1 0 0-2h-1a1 1 0 0 1-1-1v-2.6a5 5 0 0 0 4-4.9V9a4 4 0 0 0-4-4h-1V3a1 1 0 1 1 2 0v2h1a2 2 0 0 1 2 2v4.5a7 7 0 0 1-4 6.3V19a1 1 0 0 0 1 1h1a3 3 0 1 1 0 6h-1a5 5 0 0 1-5-5v-2.6A7 7 0 0 1 6 11.5V9a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
