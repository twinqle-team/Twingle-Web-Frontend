import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { CarFront, Building2 } from "lucide-react";

// Using direct image URLs for better performance
const HERO_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";
const CAR_BG = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80";

type HeroTabKey = "real-estate" | "automotive";

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HeroTabKey>("real-estate");

  const tabConfig = {
    "real-estate": {
      label: "Real Estate",
      placeholder: "Location, neighborhood, or make/model...",
      icon: <Building2 className="w-6 h-6 mr-3 text-slate-950" />,
    },
    automotive: {
      label: "Automotive",
      placeholder: "Make, model, or year...",
      icon: <CarFront className="w-6 h-6 mr-3 text-slate-950" />,
    },
  } as const;

  const images = [HERO_BG, CAR_BG];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-slate-950">
      <img
        src={images[index]}
        alt="Luxury real estate and automotive marketplace"
        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-80"
      />

      <div className="absolute inset-0 bg-slate-950/15"></div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 py-10 text-white sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
            Premium global marketplace
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            The Gold Standard for{" "}
            <span className="text-emerald-400">High-Value Assets</span>
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Discover premium listings in real estate and automotive, curated for
            serious buyers and elite sellers.
          </p>
        </div>

        <div className="mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/10 p-4 shadow-xl shadow-slate-950/10 backdrop-blur-sm lg:mt-12 sm:p-6">
          <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as HeroTabKey)}
            className="space-y-4"
          >
            <Tabs.List className="grid w-full grid-cols-2 gap-2 p-1 text-sm rounded-md bg-white/10 text-slate-200">
              {(Object.keys(tabConfig) as Array<keyof typeof tabConfig>).map(
                (key) => {
                  const isActive = activeTab === key;
                  return (
                    <Tabs.Trigger
                      key={key}
                      value={key}
                      className={`inline-flex h-14 items-center justify-center gap-2 rounded-md px-4 font-semibold transition ${
                        isActive
                          ? "bg-white text-slate-950 shadow-lg shadow-slate-950/20"
                          : "border border-white/10 bg-transparent text-slate-200 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {tabConfig[key].icon}
                      <span>{tabConfig[key].label}</span>
                    </Tabs.Trigger>
                  );
                },
              )}
            </Tabs.List>

            <div className="flex flex-col gap-3 mt-4 sm:flex-row">
              <div className="flex min-h-[4.25rem] w-full items-center gap-3 rounded-3xl bg-white/95 px-4 shadow-lg shadow-slate-950/10 sm:flex-1">
                {tabConfig[activeTab].icon}
                <input
                  type="search"
                  placeholder={tabConfig[activeTab].placeholder}
                  className="w-full text-sm bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-0 sm:text-base"
                />
              </div>
               <button className="inline-flex h-[4.25rem] items-center justify-center rounded-3xl bg-[#004e27] px-8 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:text-base">
                 Explore
               </button>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
};

export default Hero;
