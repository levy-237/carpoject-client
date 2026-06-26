import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata("Passwort vergessen");

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">
          Passwort vergessen
        </h1>

        <ForgotPasswordForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link
            href="/login"
            className="font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
          >
            Zurück zur Anmeldung
          </Link>
        </p>
      </div>
    </main>
  );
}
