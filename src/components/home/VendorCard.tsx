import React from "react";
import { Link } from "react-router-dom";

// Using direct image URLs for better performance
const AGENT_IMAGE_1 =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80";
const AGENT_IMAGE_2 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80";

interface Vendor {
  id: number;
  name: string;
  craft: string;
  backgroundImage: string;
  avatar: string;
  location: string;
  rating: number;
  listings: number;
}

const vendors: Vendor[] = [
  {
    id: 1,
    name: "Kristin's Properties",
    craft: "Real Estate Agent",
    backgroundImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_1,
    location: "California, USA",
    rating: 4.8,
    listings: 24,
  },
  {
    id: 2,
    name: "AutoHub Motors",
    craft: "Car Dealer",
    backgroundImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_2,
    location: "Los Angeles, CA",
    rating: 4.9,
    listings: 156,
  },
  {
    id: 3,
    name: "Prime Estates",
    craft: "Property Agency",
    backgroundImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_1,
    location: "New York, NY",
    rating: 4.7,
    listings: 89,
  },
  {
    id: 4,
    name: "DrivePlus Auto",
    craft: "Certified Dealer",
    backgroundImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_2,
    location: "Miami, FL",
    rating: 4.6,
    listings: 203,
  },
];

const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const truncateName = (name: string) => {
    return name.length > 20 ? name.slice(0, 20) + "..." : name;
  };

  const truncateCraft = (craft: string) => {
    return craft.length > 25 ? craft.slice(0, 25) + "..." : craft;
  };

  return (
    <div className="max-w-sm overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl">
      {/* Header with Background */}
      <div className="relative h-32 bg-gradient-to-r from-orange-400 to-orange-300">
        <img
          src={vendor.backgroundImage}
          alt="Background"
          className="object-cover w-full h-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        />
      </div>

      <div className="p-3 text-center">
        {/* Avatar */}
        <div className="relative mb-2 -mt-12">
          <img
            src={vendor.avatar}
            alt={vendor.name}
            className="object-cover w-16 h-16 mx-auto border-4 border-white rounded-full shadow-lg"
          />
        </div>

        <h3 className="mb-1 text-lg font-bold text-gray-900">
          {truncateName(vendor.name)}
        </h3>
        <p className="mb-3 text-sm font-medium text-orange-500">
          {truncateCraft(vendor.craft)}
        </p>
        {/* Action Button */}

        <button className="w-full px-4 py-2 font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600">
          Visit Store
        </button>
      </div>
    </div>
  );
};

const VendorGrid: React.FC = () => {
  return (
    <section className="flex flex-col max-w-full px-6 py-12 mx-auto sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 mt-10 mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
            Top Vendors
          </p>
          <h2 className="mt-6 text-lg sm:text-xl">
            Meet our top-rated vendors and agents. Trusted by thousands of
            customers worldwide.
          </h2>
        </div>
        <Link
          to="/listings/vendor"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-full bg-[#004e27] hover:bg-emerald-800"
        >
          View All Vendors
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
};

export default VendorGrid;
