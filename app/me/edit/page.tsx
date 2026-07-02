import EditProfileForm from "@/components/me/EditProfileForm";
import { getUserProfile } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata("Profil bearbeiten");

export default async function MeEditPage() {
  const response = await getUserProfile();

  if (!response.success) {
    redirect("/login");
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Profil bearbeiten
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Aktualisiere deine Kontodaten.
        </p>
      </div>

      <EditProfileForm user={response.data} />
    </div>
  );
}
