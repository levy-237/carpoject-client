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
      title: "Guthaben aufladen",
      link: "/aufladen/guthaben",
      icon: "/placeholder.png",
    },
    {
      id: 2,
      title: "Prepaid Pakete",
      link: "/aufladen/prepaid",
      icon: "/placeholder.png",
    },
    {
      id: 3,
      title: "Zahlungsmethoden",
      link: "/aufladen/zahlung",
      icon: "/placeholder.png",
    },
  ],
  "Uber uns": [
    {
      id: 1,
      title: "Unsere Geschichte",
      link: "/uber-uns/geschichte",
      icon: "/placeholder.png",
    },
    {
      id: 2,
      title: "Team",
      link: "/uber-uns/team",
      icon: "/placeholder.png",
    },
    {
      id: 3,
      title: "Kontakt",
      link: "/uber-uns/kontakt",
      icon: "/placeholder.png",
    },
  ],
};
