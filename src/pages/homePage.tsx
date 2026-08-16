import React from "react";
import Hero from "@/components/home/hero";
import PropertiesGrid from "@/components/home/PropertiesGrid";
import AutomotiveGrid from "@/components/home/AutomotiveGrid";
// import VendorGrid from "@/components/home/VendorCard";
// import SecurityFeatures from "@/components/home/securityFeatures";
import SubscribeSection from "@/components/home/subscribeSection";
import ServicesSlider from "@/components/home/servicesSlider";
import RealtorHelp from "@/components/home/realtorHelp";
import TrustAndReliability from "@/components/home/trustAndReliability";
import { BarChart3, Clock3, ShieldCheck, Building2 } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="px-4 mt-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 text-slate-950 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white border rounded-2xl border-slate-200/70 sm:p-5 sm:rounded-3xl">
            <div className="flex items-center gap-2 text-emerald-500 sm:gap-3">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 sm:text-[0.65rem] sm:tracking-[0.32em]">
                Active listings
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">1,248</p>
          </div>
          <div className="p-4 bg-white border rounded-2xl border-slate-200/70 sm:p-5 sm:rounded-3xl">
            <div className="flex items-center gap-2 text-sky-500 sm:gap-3">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 sm:text-[0.65rem] sm:tracking-[0.32em]">
                Verified sellers
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">98.2%</p>
          </div>
          <div className="p-4 bg-white border rounded-2xl border-slate-200/70 sm:p-5 sm:rounded-3xl">
            <div className="flex items-center gap-2 text-emerald-500 sm:gap-3">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 sm:text-[0.65rem] sm:tracking-[0.32em]">
                Transaction volume
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">$4.2B+</p>
          </div>
          <div className="p-4 bg-white border rounded-2xl border-slate-200/70 sm:p-5 sm:rounded-3xl">
            <div className="flex items-center gap-2 text-rose-500 sm:gap-3">
              <Clock3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 sm:text-[0.65rem] sm:tracking-[0.32em]">
                Real-time updates
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">Live</p>
          </div>
        </div>
      </div>
      <RealtorHelp />
      <PropertiesGrid />
      <AutomotiveGrid />
      {/* <VendorGrid /> */}
      <TrustAndReliability />
      <ServicesSlider />
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
