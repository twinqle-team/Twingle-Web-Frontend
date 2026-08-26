import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "@/router/mainRouter";
import { queryClient } from "@/lib/queryClient";
import ErrorBoundary from "@/components/error/errorBoundary";
import NetworkError from "@/components/error/networkError";

function App() {
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
