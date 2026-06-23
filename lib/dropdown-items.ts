type DropdownItem = {
  id: number;
  title: string;
  link: string;
  icon: string;
};

export const DROPDOWN_ITEMS: Record<string, DropdownItem[]> = {
  Fahrzeuge: [
    {
      id: 1,
      title: "Limousine",
      link: "/listings?body=1",
      icon: "/car-icon-sedan.webp",
    },
    {
      id: 2,
      title: "SUV",
      link: "/listings?body=2",
      icon: "/car-icon-suv.webp",
    },
    {
      id: 6,
      title: "Kombi",
      link: "/listings?body=6",
      icon: "/car-icon-kombi.webp",
    },
    {
      id: 7,
      title: "Kleinwagen",
      link: "/listings?body=7",
      icon: "/car-icon-klein.webp",
    },
    {
      id: 8,
      title: "Van - Kleinbuse",
      link: "/listings?body=8",
      icon: "/car-icon-van.webp",
    },
  ],
  Unternehmen: [
    {
      id: 1,
      title: "Firmenflotte",
      link: "/unternehmen/firmenflotte",
      icon: "/placeholder.png",
    },
    {
      id: 2,
      title: "Langzeitmiete",
      link: "/unternehmen/langzeitmiete",
      icon: "/placeholder.png",
    },
    {
      id: 3,
      title: "Fuhrpark Management",
      link: "/unternehmen/fuhrpark",
      icon: "/placeholder.png",
    },
  ],
  Aufladen: [
    {
      id: 1,
      title: "Zuhause laden",
      link: "/aufladen#zuhause-laden",
      icon: "/placeholder.png",
    },
    {
      id: 2,
      title: "Öffentlich laden",
      link: "/aufladen#oeffentlich-laden",
      icon: "/placeholder.png",
    },
    {
      id: 5,
      title: "Kaufberatung",
      link: "/aufladen#kaufberatung",
      icon: "/placeholder.png",
    },
  ],
  "Uber uns": [
    {
      id: 1,
      title: "Idee",
      link: "/uberuns#idee",
      icon: "/placeholder.png",
    },
    {
      id: 2,
      title: "Funktionen",
      link: "/uberuns#funktionen",
      icon: "/placeholder.png",
    },
    {
      id: 5,
      title: "Für Käufer",
      link: "/uberuns#kaeufer",
      icon: "/placeholder.png",
    },
  ],
};
