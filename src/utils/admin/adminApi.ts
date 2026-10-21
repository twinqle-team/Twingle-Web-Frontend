import axios from "axios";

const API_BASE_URL = "https://mbayy-be.onrender.com/api/v1/vendor";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllVendor = async (token: string | null) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await api.get("/vendors/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Fetch Vendor Requests Error:",
      error.response?.data || error,
    );
    throw error;
  }
};

export const getAllUsers = async (token: string | null) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await api.get("/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Fetch User Requests Error:", error.response?.data || error);
    throw error;
  }
};

export const getAllAdmins = async (token: string | null) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await api.get("/admins/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Fetch Admin Requests Error:", error.response?.data || error);
    throw error;
  }
};

export const getAdminById = async (
  adminId: string | null,
  token: string | null,
) => {
  try {
    const response = await api.get(`/get_admin/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVendorById = async (id: string | null) => {
  try {
    const response = await api.get(`/one_vendor/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string | null) => {
  try {
    const response = await api.get(`/one_user/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const BlockUnblockDeleteUser = async (
  userId: string,
  userType: "user" | "vendor" | "admin" | "customerCare",
  action: "block" | "unblock" | "delete",
  token: string | null,
) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await api.post(
      "/user/action",
      {
        userId,
        userType,
        action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("Block/Unblock/Delete Error:", error.response?.data || error);
    throw error;
  }
};

export const sendPrivateMessage = async (
  recipientId: string,
  recipientType: "user" | "vendor",
  title: string,
  message: string,
  token: string | null,
) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const response = await api.post(
      "/private-message",
      {
        recipientId,
        recipientType,
        title,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("Send Private Message Error:", error.response?.data || error);
    throw error;
  }
};