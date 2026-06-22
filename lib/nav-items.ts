export type NavItem = {
  id: number;
  title: string;
  link: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    title: "Fahrzeuge",
    link: "/listings",
    icon: "/car-icon.svg",
  },
  {
    id: 2,
    title: "Unternehmen",
    link: "/companies",
    icon: "/company-icon.svg",
  },
  {
    id: 3,
    title: "Aufladen",
    link: "/charging",
    icon: "/charging-icon.svg",
  },
  {
    id: 4,
    title: "Uber uns",
    link: "/about",
    icon: "/about-icon.svg",
  },
];
