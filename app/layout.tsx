import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import AiPopUp from "@/components/ai/AiPopUp";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { cookies } from "next/headers";
import { getUserProfile, refreshTokenCookie } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Car Project",
  description: "",
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
  const profile = response?.success ? response : null;
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
        </Providers>
      </body>
    </html>
  );
}
