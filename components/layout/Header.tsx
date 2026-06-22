"use client";

import Image from "next/image";
import { useState } from "react";
import HeaderDropdown from "./Header-Dropdown";
import Link from "next/link";

type NavItem = {
  id: number;
  title: string;
  link: string;
  icon: string;
};

const navItems: NavItem[] = [
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
export function Header() {
  const [isHovered, setIsHovered] = useState<string | boolean>(false);

  const handleMouseEnter = (item: string) => {
    setIsHovered(item);
  };

  const handleMouseLeave = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };

  return (
    <header className="flex flex-col bg-white relative text-gray-900">
      <nav className="flex h-16 w-full items-center px-6">
        <div className="flex flex-1 items-center w-fit">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Car Project logo"
              width={160}
              height={80}
              priority
              className="h-12 w-auto object-contain"
              onMouseEnter={() => handleMouseLeave()}
            />
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-center gap-8 font-semibold max-md:hidden">
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className={`cursor-pointer p-2 transition-all duration-300 ${isHovered === item.title ? "bg-gray-200 rounded-md" : ""}`}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onClick={() => handleMouseLeave()}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end max-md:hidden">
          <Image
            src="/user-image.svg"
            alt="User profile"
            width={28}
            height={28}
            className="h-7 w-7"
            onMouseEnter={() => handleMouseLeave()}
          />
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="flex flex-col justify-center gap-1.5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-gray-900" />
          <span className="block h-0.5 w-6 bg-gray-900" />
          <span className="block h-0.5 w-6 bg-gray-900" />
        </button>
      </nav>
      {isHovered && (
        <HeaderDropdown
          item={isHovered as string}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </header>
  );
}
