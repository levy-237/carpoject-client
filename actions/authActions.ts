"use server";

import {
  removeTokens,
  refreshTokenCookie,
  accessTokenCookie,
  getAccessToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type LoginProps = {
  username: string;
  password: string;
};

export type LocationDetail = {
  id: number;
  name: string;
};

export type UserProfile = {
  id: number;
  created_at: string;
  is_verified: boolean;
  username: string;
  company_name: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  picture: string;
  storage_key: string;
  favourite_listings: number[];
  saved_search: number[];
  province: number;
  city: number;
  streetname_number: string;
  province_detail: LocationDetail;
  city_detail: LocationDetail;
  is_private: boolean;
};

export interface AuthMeSuccessResponse extends UserProfile {
  success: true;
  accessToken?: string;
}

export type AuthMeErrorResponse = {
  success: false;
  message: string;
  accessToken?: null;
};

export type AuthLoginSuccessResponse = {
  success: true;
  message: string;
};

export type AuthLoginErrorResponse = {
  success: false;
  message: string;
};

export type AuthLoginResponse =
  | AuthLoginSuccessResponse
  | AuthLoginErrorResponse;

export type RecoveryResponse = {
  success: boolean;
  message: string;
};

export interface AuthSignUpSuccessResponse extends UserProfile {
  success: true;
  message: string;
}

export type AuthSignUpErrorResponse = {
  success: false;
  message: string;
};

export type AuthSignUpResponse =
  | AuthSignUpSuccessResponse
  | AuthSignUpErrorResponse;

export type AuthMeResponse = AuthMeSuccessResponse | AuthMeErrorResponse;

export async function login({
  username,
  password,
}: LoginProps): Promise<AuthLoginResponse> {
  const cookieStore = await cookies();

  if (!username.trim() || !password) {
    return {
      success: false,
      message: "Benutzername und Passwort sind erforderlich.",
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
    };
  }

  return {
    success: true,
    message: "Registrierung erfolgreich.",
    ...data,
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
    };
  }

  return {
    success: true,
    message: data.message || "Code wurde gesendet.",
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
    };
  }

  return {
    success: true,
    message: data.detail || "Passwort wurde zurückgesetzt.",
  };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert." };
  }

  if (!currentPassword || !newPassword) {
    return {
      success: false,
      message: "Bitte fülle beide Passwortfelder aus.",
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
        data.detail ||
        data.error ||
        "Passwort konnte nicht geändert werden.",
    };
  }

  return {
    success: true,
    message: data.message || "Passwort wurde erfolgreich geändert.",
  };
}

export async function sendUserVerification(): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert." };
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
    };
  }

  return {
    success: true,
    message: data.message || "Bestätigungscode wurde gesendet.",
  };
}

export async function verifyUserEmail(code: string): Promise<RecoveryResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert." };
  }

  if (!code.trim()) {
    return { success: false, message: "Bitte gib den Bestätigungscode ein." };
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
    };
  }

  revalidatePath("/me", "layout");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: data.message || data.detail || "E-Mail wurde bestätigt.",
  };
}
