import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "@/router/mainRouter";
import { queryClient } from "@/lib/queryClient";
import ErrorBoundary from "@/components/error/errorBoundary";
import NetworkError from "@/components/error/networkError";
import { useAppSelector } from "@/redux/hooks";

function App() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkError>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </NetworkError>
      {isAuthenticated && user && (
        <div className="fixed bottom-4 right-4 z-[60] rounded-lg border border-green-200 bg-[#004e27] px-3 py-2 text-sm text-white shadow-sm">
          Logged in as {user.email || user.name || "user"}
        </div>
      )}
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
