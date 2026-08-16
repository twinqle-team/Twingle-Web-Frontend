import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CarFront,
  MapPin,
} from "lucide-react";
import agentOne from "../assets/login1.png";
import agentTwo from "../assets/login2.png";
import agentThree from "../assets/login3.png";
import vendorOne from "../assets/hero-bg.png";

type ListingType = "agent" | "vendor";

type ListingItem = {
  id: number;
  name: string;
  location: string;
  craft: string;
  backgroundImage: string;
  avatar: string;
};

const estateAgents: ListingItem[] = [
  {
     id: 1,
    name: "Amara Clarke",
    location: "Lagos, Nigeria",
    craft: "Luxury homes & investment",
    backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    avatar: agentOne,
  },
  {
     id: 2,
    name: "Daniel Brooks",
    location: "Abuja, Nigeria",
    craft: "Family homes & commercial",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    avatar: agentTwo,
  },
  {
     id: 3,
    name: "Nadia Yusuf",
    location: "Port Harcourt, Nigeria",
    craft: "Rental & relocation",
    backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    avatar: agentThree,
  },
];

const carVendors: ListingItem[] = [
  {
     id: 1,
    name: "AutoHub Motors",
    location: "Lekki, Lagos",
    craft: "Certified used & luxury",
    backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    avatar: vendorOne,
  },
  {
     id: 2,
    name: "DrivePlus Autos",
    location: "Victoria Island, Lagos",
    craft: "Premium sedans & SUVs",
    backgroundImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    avatar: agentOne,
  },
  {
      id: 3,
    name: "Metro Wheels",
    location: "Abuja, Nigeria",
    craft: "Fleet & executive vehicles",
    backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    avatar: agentTwo,
  },
];

const getContent = (type: ListingType) => {
  if (type === "agent") {
    return {
      title: "Estate Agents",
      items: estateAgents,
      icon: Building2,
      accent: "text-[#004e27]",
      bg: "bg-[#004e27]/10",
      button: "bg-[#004e27] hover:bg-emerald-800",
    };
  }

  return {
    title: "Car Vendors",
    items: carVendors,
    icon: CarFront,
    accent: "text-[#004e27]",
      bg: "bg-[#004e27]/10",
      button: "bg-[#004e27] hover:bg-emerald-800",
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
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 transition hover:text-[#004e27] sm:text-sm"
          >
            <ArrowLeft size={16} className="sm:w-4 sm:h-4" />
            Back to home
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${content.bg} ${content.accent} sm:px-3 sm:py-1.5 sm:text-sm`}
          >
            <Icon size={14} className="sm:w-4 sm:h-4" />
            {content.title}
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm lg:text-base">
            Browse our top-rated {content.title.toLowerCase()}
          </p>
        </div>

        {/* Listings Grid */}
        {!isValidType ? (
          <div className="p-6 text-xs text-center bg-white border border-dashed rounded-2xl border-slate-300 text-slate-600 sm:p-8 sm:text-sm">
            This page is currently available for the{" "}
            <span className="font-semibold text-slate-900">agent</span> and{" "}
            <span className="font-semibold text-slate-900">vendor</span> views.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl"
              >
                {/* Header with Background */}
                <div className="relative h-32 sm:h-36">
                  <img
                    src={item.backgroundImage}
                    alt="Background"
                    className="object-cover w-full h-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                  />
                </div>

                <div className="p-3 text-center sm:p-4">
                  {/* Avatar */}
                  <div className="relative mb-2 -mt-10 sm:-mt-12">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="object-cover w-16 h-16 mx-auto border-4 border-white rounded-full shadow-lg sm:w-20 sm:h-20"
                    />
                  </div>

                  <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-[#004e27]">
                    {item.craft}
                  </p>
                  

                  <p className="flex items-center justify-center gap-1 mb-3 text-xs text-gray-500">
                    <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                    {item.location}
                  </p>

                  {/* Action Button */}
                  <div
                    className={`block w-full px-4 py-2 font-medium text-white transition-colors rounded-lg ${content.button} sm:py-2.5 cursor-pointer hover:shadow-md`}
                    onClick={() => {
                     navigate(`/vendor/${normalizedType}/${item.id}`);
                    }}
                  >
                    Visit Store
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}