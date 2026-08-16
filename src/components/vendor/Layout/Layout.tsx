import React from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardSidebar from "@/components/static/vendor/DashboardSidebar";
import VendorHeader from "@/components/static/vendor/VendorHeader";

const VendorLayout: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <VendorHeader />

          {/* Scrollable Outlet */}
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default VendorLayout;