import ProfileView from "@/components/me/ProfileView";
import { getUserProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MePage() {
  const response = await getUserProfile();

  if (!response.success) {
    redirect("/login");
  }

  return <ProfileView user={response} />;
}
