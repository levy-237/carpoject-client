"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "Welche EV-Daten sehe ich in den Anzeigen?",
    answer:
      "Neben Preis und Kilometerstand auch Reichweite (Sommer/Winter), Batteriegröße, Ladeleistung, Wärmepumpe, Garantie und Pickerl — direkt im Inserat, ohne lange Beschreibungen zu durchsuchen.",
  },
  {
    question: "Wie funktioniert der Fahrzeugvergleich?",
    answer:
      'Auf „Vergleichen" klicken und bis zu drei Fahrzeuge markieren. Auf der Vergleichsseite siehst du Preis, Ausstattung und technische Werte aller markierten Autos nebeneinander.',
  },
  {
    question: "Gibt es erweiterte Suchfilter?",
    answer:
      "Ja. In der Detailsuche filterst du nach Marke, Modell, Trim, Preis, Baujahr, Reichweite, Batterie, AC-/DC-Laden, Bundesland, Wärmepumpe und mehr — speziell für Elektroautos.",
  },
  {
    question: "Favoriten und KI-Assistent — wofür sind die?",
    answer:
      "Mit Konto speicherst du interessante Anzeigen als Favoriten und findest sie später unter Mein Konto wieder. Der Chat unten rechts hilft bei Fragen zu Reichweite, Laden oder welche Filter für deinen Alltag passen.",
  },
];

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-8 pb-16">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-2 text-xl font-semibold">Noch Fragen?</h2>
        <p className="mb-6 max-w-xl text-sm text-gray-500">
          Was die Plattform kann — kurz erklärt.
        </p>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  {faq.question}
                  <ChevronDown
                    className={`size-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-6 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
