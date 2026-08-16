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

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-12 lg:py-12">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <span className="inline-flex rounded-full border border-gold-400/40 bg-gold-500/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-gold-300 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.3em]">
            Premium global marketplace
          </span>

          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            The Gold Standard for{" "}
            <span className="text-gold-400">High-Value Assets</span>
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7 lg:text-lg">
            Discover premium listings in real estate and automotive, curated for
            serious buyers and elite sellers.
          </p>
        </div>

        <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-slate-950/10 p-3 shadow-xl shadow-slate-950/10 backdrop-blur-sm sm:mt-10 sm:rounded-[2rem] sm:p-4 lg:mt-12 lg:p-6">
          <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as HeroTabKey)}
            className="space-y-3 sm:space-y-4"
          >
            <Tabs.List className="grid w-full grid-cols-2 gap-1.5 p-1 text-xs rounded-md bg-white/10 text-slate-200 sm:gap-2 sm:p-1.5 sm:text-sm">
              {(Object.keys(tabConfig) as Array<keyof typeof tabConfig>).map(
                (key) => {
                  const isActive = activeTab === key;
                  return (
                    <Tabs.Trigger
                      key={key}
                      value={key}
                      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-2 font-semibold transition sm:h-12 sm:gap-2 sm:px-4 ${
                        isActive
                          ? "bg-white text-slate-950 shadow-lg shadow-slate-950/20"
                          : "border border-white/10 bg-transparent text-slate-200 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {tabConfig[key].icon}
                      <span className="hidden xs:inline">{tabConfig[key].label}</span>
                      <span className="xs:hidden">{tabConfig[key].label.split(' ')[0]}</span>
                    </Tabs.Trigger>
                  );
                },
              )}
            </Tabs.List>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex min-h-[3.5rem] w-full items-center gap-2.5 rounded-2xl bg-white/95 px-3 shadow-lg shadow-slate-950/10 sm:min-h-[4.25rem] sm:gap-3 sm:rounded-3xl sm:px-4">
                {tabConfig[activeTab].icon}
                <input
                  type="search"
                  placeholder={tabConfig[activeTab].placeholder}
                  className="w-full text-xs bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-0 sm:text-sm"
                />
              </div>
               <button className="inline-flex h-[3.5rem] items-center justify-center rounded-2xl bg-gold-500 px-6 text-sm font-semibold text-slate-900 shadow-lg shadow-gold-500/30 transition hover:bg-gold-600 sm:h-[4.25rem] sm:rounded-3xl sm:px-8 sm:text-base">
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
