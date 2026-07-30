import React from "react";
import Hero from "@/components/home/hero";
import Product from "@/components/home/product";
import SecurityFeatures from "@/components/home/securityFeatures";
import SubscribeSection from "@/components/home/subscribeSection";
import Seller from "@/components/home/seller";
import ServicesSlider from "@/components/home/servicesSlider";
import RealtorHelp from "@/components/home/realtorHelp";
import TrustAndReliability from "@/components/home/trustAndReliability";
import { BarChart3, Clock3, ShieldCheck, Building2 } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="px-6 mt-10  max-w-[100%] sm:px-8 lg:px-12">
        <div className="grid justify-around gap-4 text-slate-950 sm:grid-cols-4">
          <div className="p-5 bg-white border rounded-3xl border-slate-200/70">
            <div className="flex items-center gap-3 text-emerald-500">
              <BarChart3 className="w-5 h-5" />
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                Active listings
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">1,248</p>
          </div>
          <div className="p-5 bg-white border rounded-3xl border-slate-200/70">
            <div className="flex items-center gap-3 text-sky-500">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                Verified sellers
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">98.2%</p>
          </div>
          <div className="p-5 bg-white border rounded-3xl border-slate-200/70">
            <div className="flex items-center gap-3 text-emerald-500">
              <Building2 className="w-5 h-5" />
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                Transaction volume
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">$4.2B+</p>
          </div>
          <div className="p-5 bg-white border rounded-3xl border-slate-200/70">
            <div className="flex items-center gap-3 text-rose-500">
              <Clock3 className="w-5 h-5" />
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                Real-time updates
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">Live</p>
          </div>
        </div>
      </div>
      <Product />
      <RealtorHelp />
      <SecurityFeatures />
      <Seller />
      <TrustAndReliability />
      <ServicesSlider />
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
