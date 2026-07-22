// utils/vendorApi.ts
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "https://mbayy-be.onrender.com/api/v1/vendor";

// ====================== RECIPIENT CODE ======================

export interface CreateRecipientCodePayload {
  account_number: string;
  bank_code: string;
  name: string;           // Account holder's name (from Paystack)
  bankName: string;       // Bank name (e.g. "Zenith Bank")
}

export const createRecipientCode = async (
  token: string,
  accountData: CreateRecipientCodePayload
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create_recipient_code`,
      accountData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Recipient Code API Response:", response.data);

    if (!response.data?.recipient_code) {
      throw new Error("Recipient code was not returned from server");
    }

    return {
      ...response.data,
      bankName: accountData.bankName,
    };
  } catch (error: any) {
    console.error("Create Recipient Code Error:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create recipient code";

      throw new Error(errorMessage);
    }

    throw new Error("An unexpected error occurred while creating recipient code");
  }
};

// ====================== IMAGE UPLOADS ======================

// Upload Avatar (Profile Image)
export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async ({ data, token }: { data: FormData; token: string }) => {
      const response = await axios.post(`${BASE_URL}/upload-avatar`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      console.log("Avatar uploaded successfully:", data);
    },

    onError: (error: any) => {
      console.error("Avatar upload failed:", error);
    },
  });
};

// Upload Business Logo (Banner)
export const useUploadBusinessLogo = () => {
  return useMutation({
    mutationFn: async ({ data, token }: { data: FormData; token: string }) => {
      const response = await axios.post(`${BASE_URL}/upload-business-logo`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      console.log("Business logo uploaded successfully:", data);
    },

    onError: (error: any) => {
      console.error("Business logo upload failed:", error);
    },
  });
};