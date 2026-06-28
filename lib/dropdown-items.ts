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
      icon: "/unt-office.avif",
    },
    {
      id: 2,
      title: "Langzeitmiete",
      link: "/unternehmen/langzeitmiete",
      icon: "/unt-miete.avif",
    },
    {
      id: 3,
      title: "Fuhrpark Management",
      link: "/unternehmen/fuhrpark",
      icon: "/unt-fuhrpark.avif",
    },
  ],
  Aufladen: [
    {
      id: 1,
      title: "Zuhause laden",
      link: "/aufladen#zuhause-laden",
      icon: "/charge1.avif",
    },
    {
      id: 2,
      title: "Öffentlich laden",
      link: "/aufladen#oeffentlich-laden",
      icon: "/offi-charge.avif",
    },
    {
      id: 5,
      title: "Kaufberatung",
      link: "/aufladen#kaufberatung",
      icon: "/beratung-charge.avif",
    },
  ],
  "Uber uns": [
    {
      id: 1,
      title: "Idee",
      link: "/uberuns#idee",
      icon: "/uber-idee.avif",
    },
    {
      id: 2,
      title: "Funktionen",
      link: "/uberuns#funktionen",
      icon: "/uber-funk.avif",
    },
    {
      id: 5,
      title: "Für Käufer",
      link: "/uberuns#kaeufer",
      icon: "/uber-berat.avif",
    },
  ],
};
