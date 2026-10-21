import axios from "axios";
import store from "../../redux/store";

const API_BASE_URL = "https://twinqle-be.onrender.com/api/v1/users";
const API_BASE_URL2 = "https://twinqle-be.onrender.com/api/v1/verifications";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const api2 = axios.create({
  baseURL: API_BASE_URL2,
});

// Add request interceptor to attach token from Redux store
api.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api2.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
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

export interface UserProfile {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  role?: "buyer" | "seller" | "admin" | "user";
  phoneNumber?: string;
  avatarUrl?: string;
  [key: string]: any;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get("/me");
    return response.data.data.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to fetch user profile"));
  }
};

export const startPhoneVerification = async (phone: string): Promise<any> => {
  try {
    const response = await api2.post("/phone/start", { phone });
    console.log(response)
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to start phone verification"));
  }
};

export const confirmPhoneVerification = async (code: string): Promise<any> => {
  try {
    const response = await api2.post("/phone/confirm", { code });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to confirm phone verification"));
  }
};
