import axios from "axios";

const API_BASE_URL = "https://twinqle-be.onrender.com/api/v1/auth";

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

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUserAPI = async (userData: RegisterUserPayload) => {
  try {
    const response = await api.post("/register/email", userData);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Failed to create account";

    throw new Error(message);
  }
};

export const verifyOtpAPI = async (payload: VerifyOtpPayload) => {
  try {
    const response = await api.post("/otp/verify", payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "OTP verification failed";

    throw new Error(message);
  }
};

export const sendOtpAPI = async (payload: SendOtpPayload) => {
  try {
    const response = await api.post("/otp/send", payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Failed to send OTP";

    throw new Error(message);
  }
};
