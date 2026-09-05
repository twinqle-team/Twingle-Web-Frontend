import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { router } from "@/router/mainRouter";
import { queryClient } from "@/lib/queryClient";
import ErrorBoundary from "@/components/error/errorBoundary";
import NetworkError from "@/components/error/networkError";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/userSlice";
import { refreshTokenAPI } from "@/utils/user/userAuth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      // Get tokens directly from localStorage to avoid re-renders
      const persistRoot = localStorage.getItem("persist:root");
      if (!persistRoot) return;

      let token = null;
      let refreshToken = null;

      try {
        const parsed = JSON.parse(persistRoot);
        const userSlice = parsed.user ? JSON.parse(parsed.user) : {};
        token = userSlice?.token || null;
        refreshToken = userSlice?.refreshToken || null;
      } catch (e) {
        console.error("Failed to parse persisted state:", e);
        return;
      }

      if (!token) return;

      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if access token is expired
        if (decoded.exp < currentTime) {
          // Check if refresh token is also expired
          if (!refreshToken) {
            dispatch(logout());
            window.location.href = "/login";
            return;
          }

          try {
            const refreshDecoded: any = jwtDecode(refreshToken);
            // Check if refresh token is expired
            if (refreshDecoded.exp < currentTime) {
              dispatch(logout());
              window.location.href = "/login";
              return;
            }

            // Refresh token is valid, call refresh endpoint
            const response = await refreshTokenAPI({ refreshToken });
            const newAccessToken = response.data.tokens.accessToken;
            const newRefreshToken = response.data.tokens.refreshToken;

            // Update Redux state with new tokens
            if (persistRoot) {
              try {
                const parsed = JSON.parse(persistRoot);
                const userSlice = parsed.user ? JSON.parse(parsed.user) : {};
                userSlice.token = newAccessToken;
                userSlice.refreshToken = newRefreshToken;
                parsed.user = JSON.stringify(userSlice);
                localStorage.setItem("persist:root", JSON.stringify(parsed));
              } catch (e) {
                console.error("Failed to update tokens in storage:", e);
              }
            }
          } catch (error) {
            // Refresh failed, logout user
            dispatch(logout());
            window.location.href = "/login";
          }
        }
      } catch (error) {
        // Token is invalid, logout user
        dispatch(logout());
        window.location.href = "/login";
      }
    };

    checkAndRefreshToken();
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkError>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </NetworkError> 
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
