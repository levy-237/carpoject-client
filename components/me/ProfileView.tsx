import type { UserProfile } from "@/actions/authActions";
import { formatDate } from "@/lib/format";
import Link from "next/link";

function formatList(items: number[]) {
  return items.length > 0 ? items.join(", ") : "—";
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null;
}) {
  const displayValue =
    value === null || value === ""
      ? "—"
      : typeof value === "boolean"
        ? value
          ? "Ja"
          : "Nein"
        : String(value);

  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{displayValue}</dd>
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProfileView({ user }: { user: UserProfile }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
      <div className="flex items-center gap-4">
        <img
          src={user.picture || "/user-image.svg"}
          alt="Profilbild"
          className="h-16 w-16 rounded-full border border-gray-200 bg-gray-50 object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Mein Profil</h1>
          <p className="text-sm text-gray-500">
            {user.first_name} {user.last_name}
          </p>
        </div>
      </div>

      <dl className="mt-8 flex flex-col gap-8">
        <ProfileSection title="Konto">
          <ProfileField label="Benutzername" value={user.username} />
          <ProfileField label="E-Mail" value={user.email} />
          <ProfileField label="Verifiziert" value={user.is_verified} />
          <ProfileField
            label="Mitglied seit"
            value={formatDate(user.created_at)}
          />
          <ProfileField label="Privatkonto" value={user.is_private} />
          {!user.is_private && (
            <ProfileField label="Firmenname" value={user.company_name} />
          )}
        </ProfileSection>

        <ProfileSection title="Persönlich">
          <ProfileField label="Vorname" value={user.first_name} />
          <ProfileField label="Nachname" value={user.last_name} />
          <ProfileField label="Telefon" value={user.phone} />
        </ProfileSection>

        <ProfileSection title="Adresse">
          <ProfileField
            label="Straße & Hausnummer"
            value={user.streetname_number}
          />
          <ProfileField label="Bundesland" value={user.province_detail.name} />
          <ProfileField label="Stadt" value={user.city_detail.name} />
        </ProfileSection>

        <ProfileSection title="Gespeichert">
          <ProfileField
            label="Gespeicherte Suchen"
            value={formatList(user.saved_search)}
          />
          <ProfileField
            label="Favoriten"
            value={formatList(user.favourite_listings)}
          />
        </ProfileSection>
      </dl>

      <div className="mt-8 flex border-t border-gray-100 pt-8">
        <Link
          href="/me/edit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:ml-auto sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          Profil bearbeiten
        </Link>
      </div>
    </div>
  );
}
