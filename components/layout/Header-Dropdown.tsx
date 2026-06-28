import Link from "next/link";
import { DROPDOWN_ITEMS } from "@/lib/dropdown-items";
import {
  isUnderDevelopmentLink,
  UNDER_DEVELOPMENT_MESSAGE,
} from "@/lib/nav-items";
import { showToast } from "@/lib/toast";

const sidebarLinkClass =
  "w-fit border-b border-transparent py-1 transition-[border-color] duration-[400ms] hover:border-gray-700 font-semibold";

export default function HeaderDropdown({
  item,
  handleMouseLeave,
}: {
  item: string;
  handleMouseLeave: () => void;
}) {
  const found_item = item ? DROPDOWN_ITEMS[item] : [];
  const isFahrzeugeDropdown = item === "Fahrzeuge";
  const imageCardClass = isFahrzeugeDropdown
    ? "relative px-2 py-2 transition-transform duration-300 group-hover:-translate-y-1.5"
    : "relative overflow-hidden rounded-2xl border border-gray-200/80 bg-linear-to-b from-white via-gray-50/90 to-gray-100/80 px-6 py-5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1.5 group-hover:border-gray-300 group-hover:shadow-md";

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="fadeIn absolute z-5000 top-16 left-0 right-0 h-fit border-t border-gray-100 bg-white shadow-lg flex justify-center w-full pl-45 pr-45 pt-8 pb-8 max-xl:pl-15 max-xl:pr-15 max-sm:flex-col max-sm:pr-3 max-sm:pl-3 max-sm:pt-6 max-sm:pb-6"
    >
      <div className="flex w-[70%] flex-row flex-wrap items-center justify-around gap-8 max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:gap-6">
        {found_item.map((dropdownItem, index) => (
          <div
            key={`${item}-${dropdownItem.id}`}
            onClick={handleMouseLeave}
            className="dropdownItemIn"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <Link
              href={dropdownItem.link}
              className="group flex flex-col items-center justify-center gap-3 max-sm:flex-col"
              onClick={(e) => {
                if (isUnderDevelopmentLink(dropdownItem.link)) {
                  e.preventDefault();
                  showToast(UNDER_DEVELOPMENT_MESSAGE, "info");
                }
              }}
            >
              <div className={imageCardClass}>
                {!isFahrzeugeDropdown && (
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                )}
                <img
                  src={dropdownItem.icon}
                  alt={dropdownItem.title}
                  className="relative h-30 w-55 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <p className={`text-sm font-semibold ${sidebarLinkClass}`}>
                {dropdownItem.title}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="hidden w-px self-stretch bg-gray-200 sm:block" />
      <div className="h-px w-full bg-gray-200 sm:hidden" />

      <div className="flex w-[30%] flex-col gap-1 pl-10 text-sm font-medium max-sm:pt-5">
        <div onClick={handleMouseLeave} className="w-fit">
          <Link href="/listings" className={sidebarLinkClass}>
            Alle Fahrzeuge
          </Link>
        </div>
        <div onClick={handleMouseLeave} className="w-fit">
          <Link href="/listings?maxprice=15000" className={sidebarLinkClass}>
            Budget Fahrzeuge
          </Link>
        </div>
        <div onClick={handleMouseLeave} className="w-fit">
          <Link href="/listings?minprice=50000" className={sidebarLinkClass}>
            Luxus Fahrzeuge
          </Link>
        </div>
        <div onClick={handleMouseLeave} className="w-fit">
          <Link
            href="/listings?minfactoryrange=400"
            className={sidebarLinkClass}
          >
            Long range Fahrzeuge
          </Link>
        </div>
      </div>
    </div>
  );
}
