import React from "react";
import { Link } from "react-router-dom";
import profileA from "@/assets/login1.png";
import profileB from "@/assets/login2.png";

interface Vendor {
  id: number;
  name: string;
  craft: string;
  backgroundImage: string;
  avatar: string;
  location: string;
  rating: number;
  listings: number;
  description: string;
}

const vendors: Vendor[] = [
  {
    id: 1,
    name: "Kristin's Properties",
    craft: "Real Estate Agent",
    backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    avatar: profileA,
    location: "California, USA",
    rating: 4.8,
    listings: 24,
    description: "Specializing in luxury properties and beachfront condos in Southern California."
  },
  {
    id: 2,
    name: "AutoHub Motors",
    craft: "Car Dealer",
    backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    avatar: profileB,
    location: "Los Angeles, CA",
    rating: 4.9,
    listings: 156,
    description: "Premium certified pre-owned vehicles with full warranty and history reports."
  },
  {
    id: 3,
    name: "Prime Estates",
    craft: "Property Agency",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    avatar: profileA,
    location: "New York, NY",
    rating: 4.7,
    listings: 89,
    description: "New York's premier real estate agency for commercial and residential properties."
  },
  {
    id: 4,
    name: "DrivePlus Auto",
    craft: "Certified Dealer",
    backgroundImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    avatar: profileB,
    location: "Miami, FL",
    rating: 4.6,
    listings: 203,
    description: "Serving South Florida with exotic and luxury vehicles since 2010."
  },
  {
    id: 5,
    name: "Coastal Homes",
    craft: "Real Estate Agent",
    backgroundImage: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop",
    avatar: profileA,
    location: "Miami Beach, FL",
    rating: 4.9,
    listings: 42,
    description: "Beachfront properties and luxury waterfront homes in Miami area."
  },
  {
    id: 6,
    name: "Elite Auto Gallery",
    craft: "Luxury Car Dealer",
    backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    avatar: profileB,
    location: "Beverly Hills, CA",
    rating: 5.0,
    listings: 87,
    description: "Exclusive luxury and exotic car dealership serving Beverly Hills and Greater LA."
  },
];

const VendorListingsPage: React.FC = () => {

  const truncateDescription = (desc: string) => {
    return desc.length > 100 ? desc.slice(0, 100) + "..." : desc;
  };

  return (
    <div className="flex flex-col max-w-full px-6 py-12 mx-auto sm:px-8 lg:px-12">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">All Vendors</h1>
        <p className="max-w-3xl text-lg text-gray-600">
          Browse our complete directory of trusted vendors, agents, and dealers. 
          Find the perfect partner for your real estate or automotive needs.
        </p>
      </div>

      {/* Filter/Search Bar (Placeholder) */}
      <div className="p-4 mb-8 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search vendors by name or location..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004e27]"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004e27]">
            <option value="">All Categories</option>
            <option value="real-estate">Real Estate</option>
            <option value="automotive">Automotive</option>
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl"
          >
            {/* Header with Background */}
            <div className="relative h-32 bg-gradient-to-r from-orange-400 to-orange-300">
              <img
                src={vendor.backgroundImage}
                alt="Background"
                className="object-cover w-full h-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
              />
            </div>

            <div className="p-4">
              {/* Avatar */}
              <div className="relative mb-3 -mt-10">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="object-cover w-16 h-16 mx-auto border-4 border-white rounded-full shadow-lg"
                />
              </div>

              {/* Vendor Info */}
              <div className="mb-4 text-center">
                <h3 className="mb-1 text-lg font-bold text-gray-900">{vendor.name}</h3>
                <p className="mb-1 text-sm font-medium text-orange-500">{vendor.craft}</p>
                <p className="text-xs text-gray-500">{vendor.location}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{vendor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
                  </svg>
                  <span>{vendor.listings}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-center text-gray-600">
                {truncateDescription(vendor.description)}
              </p>

              {/* Action Button */}
              <Link
                to={`/listings/${vendor.id}`}
                className="block w-full px-4 py-2 font-medium text-center text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorListingsPage;