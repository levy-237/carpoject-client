"use client";

import { changePassword } from "@/actions/authActions";
import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const result = await changePassword(currentPassword, newPassword);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage(result.message);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      {successMessage && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Aktuelles Passwort
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
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

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Neues Passwort bestätigen
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? "Speichern..." : "Passwort ändern"}
      </button>
    </form>
  );
}
