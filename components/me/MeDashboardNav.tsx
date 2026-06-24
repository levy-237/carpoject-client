"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/me", label: "Profil", exact: true },
  { href: "/me/listings", label: "Meine Anzeigen", exact: false },
  { href: "/me/favourites", label: "Favoriten", exact: false },
  { href: "/me/change-password", label: "Passwort ändern", exact: false },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MeDashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Mein Bereich
      </p>
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href, item.exact);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
