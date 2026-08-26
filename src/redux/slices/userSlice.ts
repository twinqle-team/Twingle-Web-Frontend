import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  forgotPasswordAPI,
  googleSignInAPI,
  loginAPI,
  logoutAPI,
  registerUserAPI,
  resetPasswordAPI,
  sendOtpAPI,
  updateAvatarAPI,
  updateProfileAPI,
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
    phone?: string;
    avatarUrl?: string;
  } | null;
  token?: string | null;
  refreshToken?: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  status: "idle",
  error: null,
  user: null,
  token: null,
  refreshToken: null,
};

const normalizeUser = (data: any) => ({
  id: data?.id || data?._id,
  name: data?.name,
  email: data?.email,
  role: (data?.role || "buyer") as UserRole,
  phone: data?.phone,
  avatarUrl: data?.avatar?.url,
});

// Helper function to create async thunks with user authentication
const createAuthThunk = <_T, P>(
  name: string,
  apiCall: (payload: P) => Promise<any>,
  defaultSuccessMessage: string,
  defaultErrorMessage: string,
  includeUserData: boolean = false
) =>
  createAsyncThunk<
    {
      user?: NonNullable<UserState["user"]>;
      token?: string | null;
      refreshToken?: string | null;
      message: string;
    },
    P,
    { rejectValue: string }
  >(`user/${name}`, async (payload, { rejectWithValue }) => {
    try {
      const response = await apiCall(payload);
      const data = response?.data ?? response;

      const result: any = {
        message: data?.message ?? defaultSuccessMessage,
      };

      if (includeUserData) {
        result.user = normalizeUser(data?.user || data);
        result.token = data?.tokens?.accessToken ?? data?.token ?? data?.data?.token ?? null;
        result.refreshToken = data?.tokens?.refreshToken ?? data?.data?.refreshToken ?? null;
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? defaultErrorMessage);
    }
  });

// Helper function to create message-only async thunks
const createMessageThunk = <P>(
  name: string,
  apiCall: (payload: P) => Promise<any>,
  defaultSuccessMessage: string,
  defaultErrorMessage: string
) =>
  createAsyncThunk<{ message: string }, P, { rejectValue: string }>(
    `user/${name}`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await apiCall(payload);
        return { message: response?.message ?? defaultSuccessMessage };
      } catch (error: any) {
        return rejectWithValue(error?.message ?? defaultErrorMessage);
      }
    }
  );

// Create thunks using helper functions
export const registerUser = createAuthThunk(
  "registerUser",
  registerUserAPI,
  "Account created successfully",
  "Failed to create account",
  true
);

export const loginUser = createAuthThunk(
  "loginUser",
  loginAPI,
  "Login successful",
  "Login failed",
  true
);

export const googleSignIn = createAuthThunk(
  "googleSignIn",
  googleSignInAPI,
  "Google sign-in successful",
  "Google sign-in failed",
  true
);

export const updateProfile = createAuthThunk(
  "updateProfile",
  updateProfileAPI,
  "Profile updated successfully",
  "Failed to update profile",
  true
);

export const updateAvatar = createAuthThunk(
  "updateAvatar",
  updateAvatarAPI,
  "Avatar updated successfully",
  "Failed to update avatar",
  true
);

export const verifyOtp = createMessageThunk(
  "verifyOtp",
  verifyOtpAPI,
  "OTP verified successfully",
  "OTP verification failed"
);

export const resendOtp = createMessageThunk(
  "resendOtp",
  sendOtpAPI,
  "OTP sent successfully",
  "Failed to send OTP"
);

export const forgotPassword = createMessageThunk(
  "forgotPassword",
  forgotPasswordAPI,
  "Reset code sent successfully",
  "Failed to send reset code"
);

export const resetPassword = createMessageThunk(
  "resetPassword",
  resetPasswordAPI,
  "Password reset successful",
  "Failed to reset password"
);

export const logoutUser = createMessageThunk(
  "logoutUser",
  logoutAPI,
  "Logout successful",
  "Logout failed"
);

// Helper to add common case patterns
const addAsyncCases = (
  builder: any,
  thunk: any,
  options: {
    onFulfilled?: (state: UserState, action: any) => void;
    onRejected?: (state: UserState, action: any) => void;
  } = {}
) => {
  builder
    .addCase(thunk.pending, (state: UserState) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: UserState, action: any) => {
      state.status = "succeeded";
      state.error = null;
      if (options.onFulfilled) options.onFulfilled(state, action);
    })
    .addCase(thunk.rejected, (state: UserState, action: any) => {
      state.status = "failed";
      state.error = action.payload ?? "Operation failed";
      if (options.onRejected) options.onRejected(state, action);
    });
};

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
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Authentication thunks (set user, token, refreshToken)
    const authThunks = [registerUser, loginUser, googleSignIn];
    authThunks.forEach((thunk) =>
      addAsyncCases(builder, thunk, {
        onFulfilled: (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
        },
        onRejected: (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.refreshToken = null;
        },
      })
    );

    // Logout thunk
    addAsyncCases(builder, logoutUser, {
      onFulfilled: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      },
    });

    // Profile update thunks (update user only)
    const profileThunks = [updateProfile, updateAvatar];
    profileThunks.forEach((thunk) =>
      addAsyncCases(builder, thunk, {
        onFulfilled: (state, action) => {
          state.user = action.payload.user;
        },
      })
    );

    // Message-only thunks (no state changes)
    const messageThunks = [verifyOtp, resendOtp, forgotPassword, resetPassword];
    messageThunks.forEach((thunk) => addAsyncCases(builder, thunk));
  },
});

export const { setUser, setAuthToken, logout } = userSlice.actions;
export default userSlice.reducer;
