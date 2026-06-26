"use client";

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DROPDOWN_ITEMS } from "@/lib/dropdown-items";
import {
  isUnderDevelopmentLink,
  NAV_ITEMS,
  UNDER_DEVELOPMENT_MESSAGE,
} from "@/lib/nav-items";
import { showToast } from "@/lib/toast";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  const toggleDrawer = (title: string) => {
    setExpandedItem((current) => (current === title ? null : title));
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="relative z-[60] flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${isOpen ? "scale-x-0 opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="fadeIn fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-6">
            <Link href="/" onClick={closeMenu}>
              <img
                src="/logo.png"
                alt="Car Project logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isExpanded = expandedItem === item.title;
                const drawerItems = DROPDOWN_ITEMS[item.title] ?? [];

                return (
                  <li key={item.id} className="border-b border-gray-100 pb-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-left text-base font-semibold text-gray-900"
                      aria-expanded={isExpanded}
                      onClick={() => toggleDrawer(item.title)}
                    >
                      <span className="flex items-center gap-3">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`size-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pb-3 pl-8">
                          <Link
                            href={item.link}
                            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                            onClick={(e) => {
                              if (isUnderDevelopmentLink(item.link)) {
                                e.preventDefault();
                                showToast(UNDER_DEVELOPMENT_MESSAGE, "info");
                                return;
                              }
                              closeMenu();
                            }}
                          >
                            Alle {item.title}
                          </Link>

                          {drawerItems.map((drawerItem) => (
                            <Link
                              key={drawerItem.id}
                              href={drawerItem.link}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                              onClick={(e) => {
                                if (isUnderDevelopmentLink(drawerItem.link)) {
                                  e.preventDefault();
                                  showToast(UNDER_DEVELOPMENT_MESSAGE, "info");
                                  return;
                                }
                                closeMenu();
                              }}
                            >
                              <img
                                src={drawerItem.icon}
                                alt=""
                                className="h-6 w-10 object-contain"
                                aria-hidden="true"
                              />
                              {drawerItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="border-b border-gray-100 pb-2">
                <Link
                  href="/me"
                  className="flex items-center gap-3 py-3 text-base font-semibold text-gray-900 transition-colors hover:text-gray-600"
                  onClick={closeMenu}
                >
                  <User className="size-5 text-gray-600" aria-hidden="true" />
                  <span>Mein Konto</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
