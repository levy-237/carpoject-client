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

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="fadeIn absolute z-5000 top-16 left-0 right-0 h-fit bg-white flex justify-center w-full pl-45 pr-45 pt-5 pb-5 max-xl:pl-15 max-xl:pr-15 max-sm:flex-col max-sm:pr-3 max-sm:pl-3"
    >
      <div className="flex w-[70%] flex-row flex-wrap items-center justify-around gap-10 max-sm:w-full max-sm:flex-col max-sm:items-center">
        {found_item.map((dropdownItem) => (
          <div key={dropdownItem.id} onClick={handleMouseLeave}>
            <Link
              href={dropdownItem.link}
              className="group flex flex-col flex-wrap items-center justify-center gap-2 max-sm:flex-col"
              onClick={(e) => {
                if (isUnderDevelopmentLink(dropdownItem.link)) {
                  e.preventDefault();
                  showToast(UNDER_DEVELOPMENT_MESSAGE, "info");
                }
              }}
            >
              <img
                src={dropdownItem.icon}
                alt={dropdownItem.title}
                className="h-30 w-55 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <p className={`text-sm font-semibold mt-2 ${sidebarLinkClass}`}>
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
