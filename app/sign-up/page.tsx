import SignUpForm from "@/components/auth/SignUpForm";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata("Registrieren");

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">Registrieren</h1>
        <p className="mt-2 text-sm text-gray-500">
          Erstelle ein neues Konto.
        </p>

        <SignUpForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Bereits registriert?{" "}
          <Link
            href="/login"
            className="font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
          >
            Anmelden
          </Link>
        </p>
      </div>
    </main>
  );
}
