import ProfileView from "@/components/me/ProfileView";
import { getUserProfile } from "@/lib/auth";

export default async function MePage() {
  const response = await getUserProfile();

  if (!response.success) {
    return null;
  }

  return <ProfileView user={response} />;
}
