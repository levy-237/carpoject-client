"use client";

import { AuthMeSuccessResponse, logout } from "@/actions/authActions";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import HeaderDropdown from "./Header-Dropdown";
import {
  isUnderDevelopmentLink,
  NAV_ITEMS,
  UNDER_DEVELOPMENT_MESSAGE,
} from "@/lib/nav-items";
import { showToast } from "@/lib/toast";

export function Header({
  isAuthenticated,
  profile,
  isVerified,
}: {
  isAuthenticated: boolean;
  profile: AuthMeSuccessResponse | null;
  isVerified: boolean | null;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<string | boolean>(false);

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  const handleMouseEnter = (item: string) => {
    setIsHovered(item);
  };

  const handleMouseLeave = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };

  const hasProfilePicture = Boolean(profile?.picture);
  const profileImageSrc = profile?.picture ?? "/user-image.svg";
  const profileImageAlt = profile?.first_name
    ? `${profile.first_name} Profilbild`
    : "User profile";

  return (
    <header className="flex flex-col bg-white relative text-gray-900">
      <nav className="flex h-16 w-full items-center px-6">
        <div className="flex flex-1 items-center w-fit">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Car Project logo"
              className="h-12 w-auto object-contain"
              onMouseEnter={() => handleMouseLeave()}
            />
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-center gap-8 font-semibold max-lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className={`cursor-pointer p-2 transition-all duration-300 ${isHovered === item.title ? "bg-gray-200 rounded-md" : ""}`}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onClick={(e) => {
                handleMouseLeave();
                if (isUnderDevelopmentLink(item.link)) {
                  e.preventDefault();
                  showToast(UNDER_DEVELOPMENT_MESSAGE, "info");
                }
              }}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4 max-lg:hidden">
          {isAuthenticated ? (
            <>
              <Link
                href="/listings/add"
                onMouseEnter={() => handleMouseLeave()}
                onClick={(e) => {
                  e.preventDefault();
                  if (isVerified) {
                    return router.push("/add-listings");
                  } else {
                    showToast(
                      "Du musst zuerst deine E-Mail bestätigen, um eine Anzeige zu erstellen.",
                      "info",
                    );
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-gray-700"
              >
                <Plus className="size-4" aria-hidden="true" />
                Anzeige erstellen
              </Link>
              <Link href="/me" onMouseEnter={() => handleMouseLeave()}>
                <img
                  src={profileImageSrc}
                  alt={profileImageAlt}
                  className={
                    hasProfilePicture
                      ? "h-10 w-10 rounded-full object-cover"
                      : "h-7 w-7"
                  }
                />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="text-sm font-semibold text-gray-700 transition-colors duration-200 hover:text-gray-900"
              >
                Anmelden
              </button>
            </Link>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end lg:hidden">
          <BurgerMenu />
        </div>
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
