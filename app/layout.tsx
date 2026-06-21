import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Car Project",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
