import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  registerUserAPI,
  sendOtpAPI,
  type RegisterUserPayload,
  type SendOtpPayload,
  type VerifyOtpPayload,
  verifyOtpAPI,
} from "../../utils/user/userAuth";

export type UserRole = "buyer" | "user" | "seller" | "admin";

export interface UserState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
  } | null;
  token?: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  status: "idle",
  error: null,
  user: null,
  token: null,
};

const normalizeUser = (
  payload: any,
  fallbackName?: string,
  fallbackEmail?: string,
  fallbackRole?: UserRole,
) => ({
  id: payload?.id ?? payload?._id ?? payload?.user?.id ?? payload?.user?._id,
  name: payload?.name ?? payload?.user?.name ?? fallbackName,
  email: payload?.email ?? payload?.user?.email ?? fallbackEmail,
  role: (payload?.role ??
    payload?.user?.role ??
    fallbackRole ??
    "buyer") as UserRole,
});

export const registerUser = createAsyncThunk<
  {
    user: NonNullable<UserState["user"]>;
    token: string | null;
    message: string;
  },
  RegisterUserPayload,
  { rejectValue: string }
>("user/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await registerUserAPI(payload);
    const responseData = response?.data ?? response;
    const normalizedUser = normalizeUser(
      responseData,
      payload.name,
      payload.email,
      payload.role,
    );

    return {
      user: normalizedUser,
      token:
        responseData?.token ??
        responseData?.data?.token ??
        responseData?.accessToken ??
        null,
      message: responseData?.message ?? "Account created successfully",
    };
  } catch (error: any) {
    return rejectWithValue(error?.message ?? "Failed to create account");
  }
});

export const verifyOtp = createAsyncThunk<
  { message: string },
  VerifyOtpPayload,
  { rejectValue: string }
>("user/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await verifyOtpAPI(payload);
    const responseData = response?.data ?? response;

    return {
      message: responseData?.message ?? "OTP verified successfully",
    };
  } catch (error: any) {
    return rejectWithValue(error?.message ?? "OTP verification failed");
  }
});

export const resendOtp = createAsyncThunk<
  { message: string },
  SendOtpPayload,
  { rejectValue: string }
>("user/resendOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await sendOtpAPI(payload);
    const responseData = response?.data ?? response;

    return {
      message: responseData?.message ?? "OTP sent successfully",
    };
  } catch (error: any) {
    return rejectWithValue(error?.message ?? "Failed to send OTP");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.error = null;
    },
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload ?? "Failed to create account";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "OTP verification failed";
      })
      .addCase(resendOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to send OTP";
      });
  },
});

export const { setUser, setAuthToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;
