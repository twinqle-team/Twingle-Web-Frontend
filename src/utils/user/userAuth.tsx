import axios from "axios";

const API_BASE_URL = "https://twinqle-be.onrender.com/api/v1/auth";
const USERS_API_BASE_URL = "https://twinqle-be.onrender.com/api/v1/users";

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "admin" | "user";
};

export type VerifyOtpPayload = {
  identifier: string;
  code: string;
};

export type SendOtpPayload = {
  identifier: string;
  purpose: "email_verify" | string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type ForgotPasswordPayload = {
  identifier: string;
};

export type ResetPasswordPayload = {
  identifier: string;
  code: string;
  newPassword: string;
};

export type GoogleSignInPayload = {
  idToken: string;
};

export type LogoutPayload = {
  refreshToken: string;
};

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  phone?: string;
};

export type UpdateAvatarPayload = {
  file: File;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const usersApi = axios.create({
  baseURL: USERS_API_BASE_URL,
});

// Add request interceptor to attach token for users API
usersApi.interceptors.request.use(
  (config) => {
    // Get token from redux-persist storage
    const persistRoot = localStorage.getItem("persist:root");
    let token = null;
    if (persistRoot) {
      try {
        const parsed = JSON.parse(persistRoot);
        token = parsed.user ? JSON.parse(parsed.user).token : null;
      } catch (e) {
        console.error("Failed to parse persisted state:", e);
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const getErrorMessage = (error: any, defaultMessage: string) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  defaultMessage;

export const registerUserAPI = async (userData: RegisterUserPayload) => {
  try {
    const response = await api.post("/register/email", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to create account"));
  }
};

export const verifyOtpAPI = async (payload: VerifyOtpPayload) => {
  try {
    const response = await api.post("/otp/verify", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "OTP verification failed"));
  }
};

export const sendOtpAPI = async (payload: SendOtpPayload) => {
  try {
    const response = await api.post("/otp/send", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to send OTP"));
  }
};

export const loginAPI = async (payload: LoginPayload) => {
  try {
    const response = await api.post("/login", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Login failed"));
  }
};

export const forgotPasswordAPI = async (payload: ForgotPasswordPayload) => {
  try {
    const response = await api.post("/password/forgot", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to send reset code"));
  }
};

export const resetPasswordAPI = async (payload: ResetPasswordPayload) => {
  try {
    const response = await api.post("/password/reset", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to reset password"));
  }
};

export const googleSignInAPI = async (payload: GoogleSignInPayload) => {
  try {
    const response = await api.post("/google", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Google sign-in failed"));
  }
};

export const logoutAPI = async (payload: LogoutPayload) => {
  try {
    const response = await api.post("/logout", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Logout failed"));
  }
};

export const updateProfileAPI = async (payload: UpdateProfilePayload) => {
  try {
    const response = await usersApi.patch("/me", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to update profile"));
  }
};

export const updateAvatarAPI = async (payload: UpdateAvatarPayload) => {
  try {
    const formData = new FormData();
    formData.append('avatar', payload.file);
    
    const response = await usersApi.post("/me/avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to update avatar"));
  }
};


