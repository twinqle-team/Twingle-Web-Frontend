import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CarFront,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import agentOne from "../assets/login1.png";
import agentTwo from "../assets/login2.png";
import agentThree from "../assets/login3.png";
import vendorOne from "../assets/hero-bg.png";

type ListingType = "agent" | "vendor";

type ListingItem = {
  name: string;
  location: string;
  specialty: string;
  description: string;
  rating: string;
  badge: string;
  highlight: string;
  image: string;
};

const estateAgents: ListingItem[] = [
  {
    name: "Amara Clarke",
    location: "Lagos, Nigeria",
    specialty: "Luxury homes & investment properties",
    description:
      "Trusted for premium residential deals and strategic property investment guidance.",
    rating: "4.9",
    badge: "Top Rated",
    highlight: "Luxury & investment specialist",
    image: agentOne,
  },
  {
    name: "Daniel Brooks",
    location: "Abuja, Nigeria",
    specialty: "Family homes & commercial listings",
    description:
      "Known for clear guidance, fast follow-up, and strong client support from search to closing.",
    rating: "4.8",
    badge: "Verified",
    highlight: "Family homes and commercial deals",
    image: agentTwo,
  },
  {
    name: "Nadia Yusuf",
    location: "Port Harcourt, Nigeria",
    specialty: "Rental and relocation expertise",
    description:
      "Specializes in helping clients find the right fit for relocation and long-term rentals.",
    rating: "4.7",
    badge: "Reliable",
    highlight: "Relocation and rentals",
    image: agentThree,
  },
];

const carVendors: ListingItem[] = [
  {
    name: "AutoHub Motors",
    location: "Lekki, Lagos",
    specialty: "Certified used and luxury vehicles",
    description:
      "A reputable dealership offering certified cars with transparent pricing and warranties.",
    rating: "4.9",
    badge: "Certified",
    highlight: "Verified dealership",
    image: vendorOne,
  },
  {
    name: "DrivePlus Autos",
    location: "Victoria Island, Lagos",
    specialty: "Premium sedans and SUVs",
    description:
      "Popular for fast delivery, flexible payment plans, and detailed vehicle inspection reports.",
    rating: "4.8",
    badge: "Trusted",
    highlight: "Flexible payment options",
    image: agentOne,
  },
  {
    name: "Metro Wheels",
    location: "Abuja, Nigeria",
    specialty: "Fleet and executive vehicles",
    description:
      "Ideal for buyers looking for executive fleet cars, family SUVs, and value-for-money deals.",
    rating: "4.7",
    badge: "Top Seller",
    highlight: "Executive fleet specialist",
    image: agentTwo,
  },
];

const getContent = (type: ListingType) => {
  if (type === "agent") {
    return {
      title: "Estate Agents",
      description:
        "Browse verified real-estate professionals who can help you find the right property and close with confidence.",
      items: estateAgents,
      icon: Building2,
      accent: "text-[#004e27]",
      panel: "bg-[#004e27]/10",
      button: "bg-[#004e27] hover:bg-[#004e27]",
    };
  }

  return {
    title: "Car Vendors",
    description:
      "Discover trusted automotive sellers and dealerships that match your budget, style, and location.",
    items: carVendors,
    icon: CarFront,
    accent: "text-violet-600",
    panel: "bg-violet-50",
    button: "bg-violet-600 hover:bg-violet-700",
  };
};

export default function ListingsPage() {
  const { type } = useParams<{ type?: string }>();
  const normalizedType = (type?.toLowerCase() || "agent") as ListingType;
  const isValidType = normalizedType === "agent" || normalizedType === "vendor";
  const content = isValidType
    ? getContent(normalizedType)
    : getContent("agent");
  const Icon = content.icon;

  return (
    <div className="min-h-screen px-4 py-6 bg-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-6 mx-auto max-w-7xl sm:gap-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 pt-4 text-xs font-medium text-slate-600 transition hover:text-[#004e27] sm:px-6 sm:pt-6 sm:text-sm"
          >
            <ArrowLeft size={16} className="sm:w-4 sm:h-4" />
            Back to home
          </Link>

          <div className={`m-4 rounded-2xl ${content.panel} p-4 sm:m-6 sm:rounded-[28px] sm:p-6 lg:p-8`}>
            <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div
                  className={`mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium shadow-sm sm:mb-3 sm:px-3 sm:py-1 sm:text-sm ${content.accent}`}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  {content.title}
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
                  {isValidType
                    ? `Find the best ${content.title.toLowerCase()}`
                    : "Browse our trusted professionals"}
                </h1>
                <p className="max-w-2xl mt-2 text-xs text-slate-600 sm:mt-3 sm:text-sm sm:text-base">
                  {content.description}
                </p>
              </div>

              <div className="rounded-xl bg-white/80 px-3.5 py-2.5 text-xs text-slate-700 shadow-sm sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                <div className="font-semibold text-slate-900">
                  {content.items.length} verified professionals
                </div>
                <div className="mt-0.5 sm:mt-1">
                  Handpicked for quality, trust, and fast response.
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isValidType ? (
          <div className="p-6 text-xs text-center bg-white border border-dashed rounded-2xl border-slate-300 text-slate-600 sm:p-8 sm:text-sm">
            This page is currently available for the{" "}
            <span className="font-semibold text-slate-900">agent</span> and{" "}
            <span className="font-semibold text-slate-900">vendor</span> views.
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.items.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[28px]"
              >
                <div className={`p-3.5 ${content.panel} sm:p-4`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm sm:px-3 sm:py-1 sm:text-[11px]">
                      {item.badge}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:text-sm">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
                      {item.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 sm:mt-4 sm:gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-12 h-12 rounded-xl ring-4 ring-white sm:h-16 sm:w-16 sm:rounded-2xl"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        {item.name}
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                        {item.specialty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                    {item.highlight}
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-600 sm:mt-4 sm:text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400 sm:w-4 sm:h-4" />
                      {item.location}
                    </div>
                    <div className="flex items-start gap-2">
                      <BadgeCheck size={14} className="mt-0.5 text-slate-400 sm:w-4 sm:h-4" />
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3.5 sm:px-6 sm:py-4">
                  <div className="text-xs text-slate-500 sm:text-sm">Ready to connect</div>
                  <button
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${content.button}`}
                  >
                    View profile
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
