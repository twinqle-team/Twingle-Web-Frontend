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
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 pt-6 text-sm font-medium text-slate-600 transition hover:text-[#004e27]"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className={`m-6 rounded-[28px] ${content.panel} p-6 sm:p-8`}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div
                  className={`mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm ${content.accent}`}
                >
                  <Icon size={16} />
                  {content.title}
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {isValidType
                    ? `Find the best ${content.title.toLowerCase()}`
                    : "Browse our trusted professionals"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                  {content.description}
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm">
                <div className="font-semibold text-slate-900">
                  {content.items.length} verified professionals
                </div>
                <div className="mt-1">
                  Handpicked for quality, trust, and fast response.
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isValidType ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
            This page is currently available for the{" "}
            <span className="font-semibold text-slate-900">agent</span> and{" "}
            <span className="font-semibold text-slate-900">vendor</span> views.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.items.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`p-4 ${content.panel}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
                      {item.badge}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.specialty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    {item.highlight}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      {item.location}
                    </div>
                    <div className="flex items-start gap-2">
                      <BadgeCheck size={16} className="mt-0.5 text-slate-400" />
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                  <div className="text-sm text-slate-500">Ready to connect</div>
                  <button
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition ${content.button}`}
                  >
                    View profile
                    <ArrowRight size={16} />
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
