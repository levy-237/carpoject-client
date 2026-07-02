import type {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from "@/types/api";

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

export type AuthMeSuccessResponse = ApiSuccessResponse<UserProfile> & {
  accessToken?: string;
};

export type AuthMeErrorResponse = ApiErrorResponse & {
  accessToken?: null;
};

export type AuthMeResponse = AuthMeSuccessResponse | AuthMeErrorResponse;

export type AuthLoginResponse = ApiResponse<null>;

export type AuthSignUpResponse = ApiResponse<UserProfile>;

export type RecoveryResponse = ApiResponse<null>;
