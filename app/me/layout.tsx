import MeDashboardNav from "@/components/me/MeDashboardNav";
import VerifyEmailBanner from "@/components/me/VerifyEmailBanner";
import { getUserProfile } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata("Mein Konto");

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getUserProfile();

  if (!response.success) {
    return redirect("/login");
  }

  return (
    <>
      {!response.data.is_verified && (
        <VerifyEmailBanner email={response.data.email} />
      )}

      <main className="flex flex-1 justify-center px-4 py-10 md:py-16">
        <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start">
          <aside className="w-full shrink-0 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:sticky md:top-24 md:w-56">
            <MeDashboardNav />
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
    </>
  );
}
