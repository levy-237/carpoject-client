import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Providers } from "./providers";
import AiPopUp from "@/components/ai/AiPopUp";
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

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header isAuthenticated={isAuthenticated} profile={profile} />
          {children}
          <AiPopUp />
        </Providers>
      </body>
    </html>
  );
}
