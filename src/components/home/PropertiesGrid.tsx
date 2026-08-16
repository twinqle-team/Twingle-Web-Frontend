import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Using direct image URLs for better performance
const PROPERTY_IMAGE_1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
const PROPERTY_IMAGE_2 = "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80";
const PROPERTY_IMAGE_3 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const AGENT_IMAGE_1 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80";
const AGENT_IMAGE_2 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80";

const properties = [
  {
    image: PROPERTY_IMAGE_1,
    isFeatured: true,
    price: "$4,600",
    title: "House on the Hollywood",
    address: "374 Johnson Ave",
    beds: "6",
    baths: "2",
    sqft: "200",
    type: "For Sale",
  },
  {
    image: PROPERTY_IMAGE_2,
    isFeatured: false,
    price: "$5,200",
    title: "Modern Downtown Condo",
    address: "456 Market St",
    beds: "3",
    baths: "2",
    sqft: "1,200",
    type: "For Sale",
  },
  {
    image: PROPERTY_IMAGE_3,
    isFeatured: true,
    price: "$3,850",
    title: "Luxury Waterfront Villa",
    address: "789 Ocean Drive",
    beds: "5",
    baths: "3",
    sqft: "2,500",
    type: "For Sale",
  },
  {
    image: PROPERTY_IMAGE_1,
    isFeatured: true,
    price: "$4,600",
    title: "House on the Hollywood",
    address: "374 Johnson Ave",
    beds: "6",
    baths: "2",
    sqft: "200",
    type: "For Sale",
  },
  {
    image: PROPERTY_IMAGE_2,
    isFeatured: false,
    price: "$5,200",
    title: "Modern Downtown Condo",
    address: "456 Market St",
    beds: "3",
    baths: "2",
    sqft: "1,200",
    type: "For Sale",
  },
  {
    image: PROPERTY_IMAGE_3,
    isFeatured: true,
    price: "$3,850",
    title: "Luxury Waterfront Villa",
    address: "789 Ocean Drive",
    beds: "5",
    baths: "3",
    sqft: "2,500",
    type: "For Sale",
  },
];

const topAgents = [
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
    name: "Prime Estates",
    craft: "Property Agency",
    backgroundImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_2,
    location: "New York, NY",
    rating: 4.7,
    listings: 89,
  },
  {
    id: 3,
    name: "Coastal Homes",
    craft: "Real Estate Agent",
    backgroundImage:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop",
    avatar: AGENT_IMAGE_1,
    location: "Miami Beach, FL",
    rating: 4.9,
    listings: 42,
  },
];

const PropertiesGrid: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col max-w-full px-6 py-12 mx-auto sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 mt-10 mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
            Premium Properties
          </p>
          <h2 className="mt-6 text-lg sm:text-xl">
            Hand-picked luxury properties that define premium living, fully
            vetted by our expert team.
          </h2>
        </div>
        <Link
          to="/real-estate"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-full bg-[#004e27] hover:bg-emerald-800"
        >
          View All Properties
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl group hover:shadow-lg"
          >
            <div className="relative overflow-hidden bg-gray-200 h-72">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
              />
              {item.isFeatured && (
                <span className="absolute px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full left-4 top-4 bg-[#004e27] text-white">
                  Featured
                </span>
              )}
              <div className="absolute px-3 py-2 text-sm font-semibold bg-white rounded-full shadow-sm right-4 top-4 text-slate-900">
                {item.price}
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.address}</p>
              </div>
              <div className="h-px bg-gray-200" />

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{item.beds} Beds</span>
                <span>{item.baths} Baths</span>
                <span>{item.sqft} sqft</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Link
                  to={`/property/${item.title}`}
                  className="flex-1 rounded-xl bg-[#004e27] px-4 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#004e27]"
                >
                  View Details
                </Link>
                <span className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full">
                  {item.type}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Top Real Estate Agents */}
      <div className="mt-20">
        <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
              Top Real Estate Agents
            </p>
            <h2 className="mt-6 text-lg sm:text-xl">
              Connect with our highest-rated property agents and agencies.
            </h2>
          </div>
          <Link
            to="/listings/agent"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-full bg-[#004e27] hover:bg-emerald-800"
          >
            View All Agents
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topAgents.map((agent) => (
            <div
              key={agent.id}
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl"
            >
              {/* Header with Background */}
              <div className="relative h-32">
                <img
                  src={agent.backgroundImage}
                  alt="Background"
                  className="object-cover w-full h-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="p-3 text-center">
                {/* Avatar */}
                <div className="relative mb-2 -mt-12">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="object-cover w-16 h-16 mx-auto border-4 border-white rounded-full shadow-lg"
                  />
                </div>

                <h3 className="mb-1 text-lg font-bold text-gray-900">
                  {agent.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-[#004e27]">
                  {agent.craft}
                </p>
                <p className="mb-3 text-xs text-gray-500">{agent.location}</p>
                {/* Action Button */}

                <button className="w-full px-4 py-2 font-medium text-white transition-colors bg-[#004e27] hover:bg-emerald-800 rounded-lg "  onClick={() => {
                    navigate(`/vendor/agent/${agent.id}`);
                  }}
                >
                  Visit Store
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesGrid;
