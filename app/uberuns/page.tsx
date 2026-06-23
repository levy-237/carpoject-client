import Link from "next/link";

export const metadata = {
  title: "Über uns | E-AutoKauf",
  description:
    "E-AutoKauf ist ein Marktplatz für Elektroautos mit Fokus auf Suche, Vergleichbarkeit und klare Fahrzeugdaten.",
};

const features = [
  "Suche nach Marke, Modell, Preis, Kilometerstand und Baujahr",
  "EV-spezifische Filter wie Reichweite, Batterie, Ladeleistung und Wärmepumpe",
  "Favoriten für gespeicherte Fahrzeuge",
  "Detailseiten mit technischen Daten und Verkäuferinformationen",
  "KI-Assistent für schnelle Fragen rund um Elektroautos",
];

const buyerPoints = [
  "Passende Fahrzeuge schneller finden",
  "Technische Daten besser vergleichen",
  "Favoriten speichern und später wieder ansehen",
  "Wichtige EV-Daten direkt im Inserat sehen",
];

const sellerPoints = [
  "Fahrzeuge übersichtlich präsentieren",
  "Ausstattung und technische Daten strukturiert anzeigen",
  "Interessenten schneller zu den wichtigsten Informationen führen",
  "Private Anbieter und Händler sinnvoll abbilden",
];

export default function UberUnsPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-neutral-950">
      {/* Hero */}
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Über E-AutoKauf
            </p>

            <h1 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
              Ein Marktplatz speziell für Elektroautos.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl">
              E-AutoKauf hilft Nutzern, Elektroautos einfacher zu suchen, zu
              vergleichen und zu bewerten. Der Fokus liegt nicht nur auf Preis
              und Bildern, sondern auf den Daten, die beim E-Auto-Kauf wirklich
              wichtig sind.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listings"
                className="rounded-full bg-neutral-950 px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-neutral-950/15 transition hover:bg-black"
              >
                Fahrzeuge ansehen
              </Link>

              <Link
                href="#funktionen"
                className="rounded-full border border-neutral-950/15 bg-white px-7 py-4 text-center text-sm font-bold text-neutral-950 transition hover:bg-neutral-50"
              >
                Funktionen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor nav */}
      <section className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-10">
          <AnchorLink href="#idee">Idee</AnchorLink>
          <AnchorLink href="#kaeufer">Für Käufer</AnchorLink>
          <AnchorLink href="#verkaeufer">Für Verkäufer</AnchorLink>
          <AnchorLink href="#funktionen">Funktionen</AnchorLink>
          <AnchorLink href="#kontakt">Starten</AnchorLink>
        </div>
      </section>

      {/* Idea */}
      <section
        id="idee"
        className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-24"
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
            Die Idee
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] md:text-5xl">
            E-Autos brauchen bessere Inserate.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-neutral-650">
          <p>
            Bei klassischen Autos reichen oft Marke, Modell, Kilometerstand und
            Preis für einen ersten Eindruck. Bei Elektroautos kommen weitere
            Fragen dazu: Wie groß ist die Batterie? Wie weit kommt das Fahrzeug
            realistisch? Wie schnell lädt es? Hat es eine Wärmepumpe?
          </p>

          <p>
            Genau deshalb ist E-AutoKauf auf Elektrofahrzeuge ausgerichtet. Die
            Plattform soll wichtige technische Daten sichtbar machen und Käufern
            helfen, Angebote schneller einzuordnen.
          </p>
        </div>
      </section>

      {/* Buyer / seller */}
      <section className="bg-white/55 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-10">
          <InfoCard
            id="kaeufer"
            label="Für Käufer"
            title="Suchen, filtern, speichern."
            text="Käufer sollen nicht durch unklare Inserate scrollen müssen. Die Suche ist darauf ausgelegt, passende Fahrzeuge nach Preis, Reichweite, Ausstattung und Zustand schneller zu finden."
            items={buyerPoints}
          />

          <InfoCard
            id="verkaeufer"
            label="Für Verkäufer"
            title="Fahrzeuge klar darstellen."
            text="Verkäufer können Elektroautos strukturierter präsentieren. Wichtige Daten stehen nicht irgendwo im Beschreibungstext, sondern werden sichtbar und vergleichbar."
            items={sellerPoints}
          />
        </div>
      </section>

      {/* Features */}
      <section
        id="funktionen"
        className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-6 py-16 md:grid-cols-[1fr_1fr] md:px-10 md:py-24"
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
            Funktionen
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] md:text-5xl">
            Praktische Funktionen statt unnötiger Komplexität.
          </h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Der Marktplatz konzentriert sich auf Funktionen, die beim Suchen,
            Speichern und Vergleichen von Elektroautos wirklich helfen.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <ul className="space-y-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-2xl bg-neutral-50 p-4 text-sm font-semibold leading-6 text-neutral-700"
              >
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        id="kontakt"
        className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-20 md:px-10"
      >
        <div className="rounded-[2.25rem] bg-neutral-950 p-8 text-white shadow-2xl shadow-neutral-950/20 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                E-AutoKauf
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                Finde ein Elektroauto, das zu deinem Alltag passt.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/70">
                Suche nach Fahrzeugen, vergleiche wichtige Daten und speichere
                interessante Angebote in deinen Favoriten.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/listings"
                className="rounded-full bg-white px-7 py-4 text-center text-sm font-black text-neutral-950 transition hover:bg-neutral-100"
              >
                Fahrzeuge entdecken
              </Link>
              <Link
                href="/aufladen"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                Mehr über Aufladen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  id,
  label,
  title,
  text,
  items,
}: {
  id: string;
  label: string;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm"
    >
      <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">{title}</h2>
      <p className="mt-4 leading-7 text-neutral-600">{text}</p>

      <ul className="mt-7 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm font-semibold leading-6 text-neutral-700"
          >
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AnchorLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold text-neutral-700 shadow-sm transition hover:border-emerald-700/30 hover:bg-emerald-50 hover:text-emerald-800"
    >
      {children}
    </Link>
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
