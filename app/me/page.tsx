import ProfileView from "@/components/me/ProfileView";
import { getUserProfile } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata("Profil");

export default async function MePage() {
  const response = await getUserProfile();

  if (!response.success) {
    redirect("/login");
  }

  return <ProfileView user={response.data} />;
}
