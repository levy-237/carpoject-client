"use client";

import { requestRecoveryCode, resetPassword } from "@/actions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await requestRecoveryCode(email.trim());

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setStep(2);
    setLoading(false);
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await resetPassword(email.trim(), code.trim(), newPassword);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccessMessage(result.message);
    setLoading(false);
  }

  if (step === 1) {
    return (
      <form onSubmit={handleRequestCode} className="mt-3 flex flex-col gap-4">
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}
        <p className="mt-0 text-sm text-gray-500">
          Gib deine E-Mail ein. Wir senden dir einen Code zum Zurücksetzen.
        </p>

        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          E-Mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="name@beispiel.de"
            required
            className={inputClass}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60"
        >
          {loading ? "Senden..." : "Code senden"}
        </button>
      </form>
    );
  }

  return (
    <>
      {successMessage ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700">
          {successMessage}
        </p>
      ) : (
        <form
          onSubmit={handleResetPassword}
          className="mt-8 flex flex-col gap-4"
        >
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Code
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              required
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Neues Passwort
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60"
          >
            {loading ? "Speichern..." : "Passwort zurücksetzen"}
          </button>
        </form>
      )}
    </>
  );
}
