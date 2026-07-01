import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import AiPopUp from "@/components/ai/AiPopUp";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { cookies } from "next/headers";
import { SITE_NAME } from "@/lib/metadata";
import { getUserProfile, refreshTokenCookie } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Marktplatz für Elektroautos — suchen, vergleichen, finden.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get(refreshTokenCookie.name)?.value;
  const isAuthenticated = Boolean(refreshToken);

  const response = isAuthenticated ? await getUserProfile() : null;
  const profile = response?.success ? response.data : null;
  const isVerified = profile && profile.is_verified;

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header
            isAuthenticated={isAuthenticated}
            profile={profile}
            isVerified={isVerified}
          />
          {children}
          <Footer />
          <AiPopUp />
          <ToastProvider />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
