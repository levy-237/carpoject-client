"use server";

import {
  removeTokens,
  refreshTokenCookie,
  accessTokenCookie,
  getAccessToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateProfileFormValues, UpdateProfileSchema } from "@/schemas/users";
import type {
  AuthLoginResponse,
  AuthSignUpResponse,
  RecoveryResponse,
  UserProfile,
} from "@/types/users";

type LoginProps = {
  username: string;
  password: string;
};

export async function login({
  username,
  password,
}: LoginProps): Promise<AuthLoginResponse> {
  const cookieStore = await cookies();

  if (!username.trim() || !password) {
    return {
      success: false,
      message: "Benutzername und Passwort sind erforderlich.",
      data: null,
    };
  }

  const response = await fetch(`${process.env.API_BASE_URL}users/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Anmeldung fehlgeschlagen.",
      data: null,
    };
  }

  console.log(data);

  cookieStore.set({
    ...accessTokenCookie,
    value: data.access,
  });

  cookieStore.set({ ...refreshTokenCookie, value: data.refresh });

  return {
    success: true,
    message: "Anmeldung erfolgreich.",
    data: null,
  };
}

export async function logout() {
  await removeTokens();
}

export async function signUp(formData: FormData): Promise<AuthSignUpResponse> {
  const response = await fetch(`${process.env.API_BASE_URL}users/register/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data);
  console.log(formData);

  if (!response.ok) {
    console.log(data);

    const errorMessage =
      data?.detail || data?.error || "Registrierung fehlgeschlagen.";
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }

  return {
    success: true,
    message: "Registrierung erfolgreich.",
    data: data as UserProfile,
  };
}

export async function requestRecoveryCode(
  email: string,
): Promise<RecoveryResponse> {
  const response = await fetch(
    `${process.env.API_BASE_URL}users/send-user-password-recovery/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        data.error || data.detail || "Code konnte nicht gesendet werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: data.message || "Code wurde gesendet.",
    data: null,
  };
}

export async function resetPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<RecoveryResponse> {
  const payload = {
    email,
    code,
    new_password: newPassword,
  };
  const response = await fetch(
    `${process.env.API_BASE_URL}users/user-password-recovery/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.log(data);

    console.log(response);
    console.log(payload);

    return {
      success: false,
      message:
        data.detail ||
        data.error ||
        "Passwort konnte nicht zurückgesetzt werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: data.detail || "Passwort wurde zurückgesetzt.",
    data: null,
  };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  if (!currentPassword || !newPassword) {
    return {
      success: false,
      message: "Bitte fülle beide Passwortfelder aus.",
      data: null,
    };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}users/change-password/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        data.detail || data.error || "Passwort konnte nicht geändert werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: data.message || "Passwort wurde erfolgreich geändert.",
    data: null,
  };
}

export async function sendUserVerification(): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}users/send-user-verification/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        data.detail ||
        data.error ||
        "Bestätigungscode konnte nicht gesendet werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: data.message || "Bestätigungscode wurde gesendet.",
    data: null,
  };
}

export async function verifyUserEmail(code: string): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  if (!code.trim()) {
    return {
      success: false,
      message: "Bitte gib den Bestätigungscode ein.",
      data: null,
    };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}users/user-verification/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code.trim() }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        data.detail || data.error || "E-Mail konnte nicht bestätigt werden.",
      data: null,
    };
  }

  revalidatePath("/me", "layout");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: data.message || data.detail || "E-Mail wurde bestätigt.",
    data: null,
  };
}

export async function updateProfile({
  data,
  id,
}: {
  data: UpdateProfileFormValues;
  id: number;
}): Promise<RecoveryResponse> {
  console.log(data);

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  const validatedData = UpdateProfileSchema.safeParse(data);

  const formData = new FormData();
  formData.append("username", data.username.trim());
  formData.append("first_name", data.first_name.trim());
  formData.append("last_name", data.last_name.trim());
  formData.append("province", String(data.province));
  formData.append("city", String(data.city));
  formData.append("is_private", data.isCompany ? "false" : "true");
  formData.append("phone", data.phone.trim());
  formData.append("streetname_number", data.streetname_number.trim());

  if (data.isCompany) {
    formData.append("company_name", data.company_name?.trim() ?? "");
  }

  if (data.picture_file) {
    formData.append("picture_file", data.picture_file);
  }

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.message,
      data: null,
    };
  }

  const response = await fetch(`${process.env.API_BASE_URL}users/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        responseData.detail ||
        responseData.error ||
        "Profil konnte nicht aktualisiert werden.",
      data: null,
    };
  }

  revalidatePath("/me");

  console.log(responseData);

  return {
    success: true,
    message: responseData.message || "Profil wurde aktualisiert.",
    data: null,
  };
}
