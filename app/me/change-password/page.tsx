import ChangePasswordForm from "@/components/me/ChangePasswordForm";

export default function MeChangePasswordPage() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Passwort ändern</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gib dein aktuelles Passwort ein und wähle ein neues.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
