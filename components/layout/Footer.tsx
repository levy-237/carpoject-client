import Link from "next/link";

const pageLinks = [
  { label: "Fahrzeuge", href: "/listings" },
  { label: "Aufladen", href: "/aufladen" },
  { label: "Über uns", href: "/uberuns" },
  { label: "FAQ", href: "/#faq" },
];

const accountLinks = [
  { label: "Anmelden", href: "/login" },
  { label: "Registrieren", href: "/sign-up" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link href="/">
              <img
                src="/logo.png"
                alt="Car Project"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-xs text-base leading-7 text-gray-500">
              Marktplatz für Elektroautos — suchen, vergleichen, finden.
            </p>
          </div>

          <div className="flex gap-10 text-base">
            <nav>
              <p className="text-base font-semibold text-gray-900">Seiten</p>
              <ul className="mt-3 flex flex-col gap-2">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <p className="text-base font-semibold text-gray-900">Konto</p>
              <ul className="mt-3 flex flex-col gap-2">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p className="mt-10 border-t border-gray-100 pt-6 text-base text-gray-400">
          © {year} Car Project
        </p>
      </div>
    </footer>
  );
}
