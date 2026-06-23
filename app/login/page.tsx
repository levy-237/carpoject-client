import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">Anmelden</h1>
        <p className="mt-2 text-sm text-gray-500">
          Melde dich mit deinem Konto an.
        </p>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Noch kein Konto?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
          >
            Registrieren
          </Link>
        </p>
      </div>
    </main>
  );
}
