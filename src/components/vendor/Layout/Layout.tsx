import React from "react";
import { Outlet } from "react-router-dom";
// import { useDarkMode } from "../Context/DarkModeContext";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import DashboardSidebar from "../../static/vendor/DashboardSidebar";
import VendorHeader from "../../static/vendor/VendorHeader";
 // Import dark mode context

const VendorLayout: React.FC = () => {
//   const { darkMode } = useDarkMode(); // Use context instead of local state


  const queryClient = new QueryClient()

  return (
   <QueryClientProvider client={queryClient}>
     {/* <div className={darkMode ? "dark" : ""}> */}
     <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        {/* <DashboardSidebar darkMode={darkMode} /> */}
        <DashboardSidebar darkMode={false} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <VendorHeader /> {/* No need to pass darkMode here, since it can use the context */}

          {/* Scrollable Outlet */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
    <ReactQueryDevtools initialIsOpen={true} />
   </QueryClientProvider>
  );
};

export default VendorLayout;