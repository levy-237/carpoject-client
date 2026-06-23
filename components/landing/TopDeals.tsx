import Link from "next/link";
import Carousel from "@/components/ui/Carousel";

const topDeals = [
  {
    id: 1,
    title: "BMW 3 Series",
    price: "€89 / Tag",
    location: "Berlin",
    link: "/deals/bmw-3-series",
  },
  {
    id: 2,
    title: "Mercedes-Benz C-Klasse",
    price: "€95 / Tag",
    location: "München",
    link: "/deals/mercedes-c-klasse",
  },
  {
    id: 3,
    title: "Audi A4",
    price: "€82 / Tag",
    location: "Hamburg",
    link: "/deals/audi-a4",
  },
  {
    id: 4,
    title: "Volkswagen Golf",
    price: "€49 / Tag",
    location: "Frankfurt",
    link: "/deals/vw-golf",
  },
  {
    id: 5,
    title: "Tesla Model 3",
    price: "€99 / Tag",
    location: "Köln",
    link: "/deals/tesla-model-3",
  },
  {
    id: 6,
    title: "Porsche Cayenne",
    price: "€149 / Tag",
    location: "Stuttgart",
    link: "/deals/porsche-cayenne",
  },
];

export default function TopDeals() {
  return (
    <section className="px-4 py-8 pb-12">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold">Top Deals</h2>

        <Carousel className="min-h-[22rem] pb-10" itemsPerSlide={2}>
          {topDeals.map((deal) => (
            <Link
              key={deal.id}
              href={deal.link}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src="/placeholder.png"
                  alt={deal.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {deal.price}
                </p>
                <p className="mt-1 text-sm text-gray-500">{deal.location}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
