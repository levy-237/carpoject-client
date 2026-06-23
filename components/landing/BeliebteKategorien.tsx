import Image from "next/image";
import Link from "next/link";
import { DROPDOWN_ITEMS } from "@/lib/dropdown-items";
import Carousel from "@/components/ui/Carousel";

const categories = DROPDOWN_ITEMS.Fahrzeuge;

const categoryLinkClass =
  "border-b border-transparent py-1 transition-[border-color] duration-300 hover:border-gray-700";

export default function BeliebteKategorien() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold">Beliebte Kategorien</h2>

        <Carousel className="h-56 pb-10" itemsPerSlide={2}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-gray-100/60 p-4 text-center"
            >
              <img
                src={category.icon}
                alt={category.title}
                width={220}
                height={120}
                className="h-30 w-55 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className={`text-sm font-semibold ${categoryLinkClass}`}>
                {category.title}
              </span>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
