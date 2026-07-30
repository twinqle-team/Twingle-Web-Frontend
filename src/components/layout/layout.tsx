import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "@/components/static/user/header";
import Footer from "@/components/static/user/footer";
import Spinner from "@/components/common/Spinner";

const layout: React.FC = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const isNavigating = navigation.state === "loading";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-white">
      {isNavigating && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-white/85 backdrop-blur-sm">
          <div className="scale-110">
            <Spinner />
          </div>
        </div>
      )}

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default layout;
