import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Using direct image URLs for better performance
const HERO_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const AGENT_IMAGE_1 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80";
const AGENT_IMAGE_2 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80";

const Seller: React.FC = () => {
  return (
    <>
      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold text-slate-900">
                Find an Agent
              </h2>
              <p className="max-w-lg mt-4 text-sm text-slate-600">
                here are several types of real estate agents, each with their
                own specific responsibilities and areas of expertise. Some
                common types of real estate agents include
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Buyer's Agent: These agents represent buyers in the home-buying process",
                  "Listing Agent: These agents represent sellers in the home-selling process",
                  "Dual Agent: These agents represent both the buyer and the seller",
                  "Commercial Agent: These agents specialize",
                  "Property Manager: These agents specialize in managing rental",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 text-emerald-500" />
                    <p className="text-sm text-slate-700">{text}</p>
                  </li>
                ))}
              </ul>

              <Link
                to="/listings/agent"
                className="inline-flex items-center gap-3 px-6 py-3 mt-8 text-white rounded-full shadow bg-violet-600 hover:bg-violet-700"
              >
                Find an Agent
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative flex items-center justify-center w-full p-8 rounded-2xl bg-[#004e27]">
                <img
                  src={HERO_BG}
                  alt="hero background"
                  className="w-full rounded-lg opacity-90"
                />

                <div className="absolute w-48 p-4 bg-white shadow-lg right-10 top-8 rounded-xl">
                  <img
                    src={AGENT_IMAGE_1}
                    alt="Kristin"
                    className="w-full rounded-md"
                  />
                  <h4 className="mt-3 text-sm font-semibold">Kristin</h4>
                  <p className="text-xs text-slate-400">California, USA-FL</p>
                </div>

                <div className="absolute w-40 p-4 transform translate-x-6 bg-white shadow-md right-2 bottom-6 rounded-xl">
                  <img
                    src={AGENT_IMAGE_2}
                    alt="Kristin"
                    className="w-full rounded-md"
                  />
                  <h4 className="mt-3 text-sm font-semibold">Kristin</h4>
                  <p className="text-xs text-slate-400">California, USA-FL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold text-slate-900">
                Find Car Vendors
              </h2>
              <p className="max-w-lg mt-4 text-sm text-slate-600">
                Browse trusted car sellers and dealerships — from certified
                dealers to private sellers and fleet resellers. Search by make,
                model, location, and reputation.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Certified Dealer: Dealerships with manufacturer certification",
                  "Private Seller: Individual owners selling directly",
                  "Used Car Broker: Specialists who source vehicles",
                  "Fleet Reseller: Companies selling off lease fleets",
                  "Service-Backed Seller: Sellers offering maintenance history",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 text-emerald-500" />
                    <p className="text-sm text-slate-700">{text}</p>
                  </li>
                ))}
              </ul>

              <Link
                to="/listings/vendor"
                className="inline-flex items-center gap-3 px-6 py-3 mt-8 text-white rounded-full shadow bg-violet-600 hover:bg-violet-700"
              >
                Find a Car Seller
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative flex items-center justify-center w-full p-8 rounded-2xl bg-[#004e27]">
                <img
                  src={HERO_BG}
                  alt="car vendors background"
                  className="w-full rounded-lg opacity-90"
                />

                <div className="absolute w-48 p-4 bg-white shadow-lg right-10 top-8 rounded-xl">
                  <img
                    src={AGENT_IMAGE_1}
                    alt="Vendor A"
                    className="w-full rounded-md"
                  />
                  <h4 className="mt-3 text-sm font-semibold">AutoHub</h4>
                  <p className="text-xs text-slate-400">Los Angeles, CA</p>
                </div>

                <div className="absolute w-40 p-4 transform translate-x-6 bg-white shadow-md right-2 bottom-6 rounded-xl">
                  <img
                    src={AGENT_IMAGE_2}
                    alt="Vendor B"
                    className="w-full rounded-md"
                  />
                  <h4 className="mt-3 text-sm font-semibold">DrivePlus</h4>
                  <p className="text-xs text-slate-400">California, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Seller;
