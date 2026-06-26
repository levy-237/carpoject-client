export type NavItem = {
  id: number;
  title: string;
  link: string;
};

export const UNDER_DEVELOPMENT_MESSAGE = "Diese Seite wird derzeit entwickelt.";

export function isUnderDevelopmentLink(link: string): boolean {
  const underDevelopmentPrefix = process.env.UNDER_DEVELOPMENT_LINK;
  if (!underDevelopmentPrefix) return false;
  return link.startsWith(underDevelopmentPrefix);
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    title: "Fahrzeuge",
    link: "/listings",
  },
  {
    id: 2,
    title: "Unternehmen",
    link: "/unternehmen",
  },
  {
    id: 3,
    title: "Aufladen",
    link: "/aufladen",
  },
  {
    id: 4,
    title: "Uber uns",
    link: "/uberuns",
  },
];
