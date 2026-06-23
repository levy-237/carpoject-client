"use client";

import {
  sendUserVerification,
  verifyUserEmail,
} from "@/actions/authActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 text-gray-600"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

type VerifyEmailBannerProps = {
  email: string;
};

export default function VerifyEmailBanner({ email }: VerifyEmailBannerProps) {
  const router = useRouter();
  const [step, setStep] = useState<"initial" | "code">("initial");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendVerification() {
    setError("");
    setInfoMessage("");
    setLoading(true);

    const result = await sendUserVerification();

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setStep("code");
    setInfoMessage(result.message);
    setLoading(false);
  }

  async function handleVerifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await verifyUserEmail(code);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex justify-center px-4 py-4">
      <div
        role="alert"
        className="flex w-full min-w-0 gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg md:w-[60%]"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-200">
          <MailIcon />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Bitte bestätige deine E-Mail-Adresse
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Um Anzeigen hochzuladen und Fahrzeuge als Favoriten zu speichern,
            musst du zuerst deine E-Mail bestätigen. Wir senden einen Code an{" "}
            <span className="font-medium text-gray-900">{email}</span>.
          </p>

          {error && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {infoMessage && (
            <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {infoMessage}
            </p>
          )}

          {step === "initial" ? (
            <button
              type="button"
              onClick={handleSendVerification}
              disabled={loading}
              className="mt-4 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60"
            >
              {loading ? "Senden..." : "Bestätigungscode senden"}
            </button>
          ) : (
            <form
              onSubmit={handleVerifyCode}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
            >
              <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-medium text-gray-700">
                Bestätigungscode
                <input
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="123456"
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className={inputClass}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60"
              >
                {loading ? "Prüfen..." : "Code bestätigen"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
