import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Fuel, Gauge } from "lucide-react";
import { Button } from "../ui/button";

// Using direct image URLs for better performance
const VEHICLE_IMAGE_1 = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80";
const VEHICLE_IMAGE_2 = "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80";
const VEHICLE_IMAGE_3 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80";
const VENDOR_AVATAR_1 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80";
const VENDOR_AVATAR_2 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80";

const vehicles = [
  {
    image: VEHICLE_IMAGE_1,
    isFeatured: true,
    price: "$45,000",
    title: "2024 BMW X5",
    address: "Los Angeles, CA",
    specs: "3.0L I6 • 375 HP • AWD",
    year: "2024",
    mileage: "5,000",
    type: "For Sale",
  },
  {
    image: VEHICLE_IMAGE_2,
    isFeatured: false,
    price: "$32,500",
    title: "Mercedes-Benz C-Class",
    address: "Miami, FL",
    specs: "2.0L I4 • 255 HP • RWD",
    year: "2023",
    mileage: "12,000",
    type: "For Sale",
  },
  {
    image: VEHICLE_IMAGE_3,
    isFeatured: true,
    price: "$28,900",
    title: "Audi Q7 Premium",
    address: "New York, NY",
    specs: "3.0L V6 • 335 HP • AWD",
    year: "2024",
    mileage: "3,000",
    type: "For Sale",
  },
  {
    image: VEHICLE_IMAGE_1,
    isFeatured: true,
    price: "$45,000",
    title: "2024 BMW X5",
    address: "Los Angeles, CA",
    specs: "3.0L I6 • 375 HP • AWD",
    year: "2024",
    mileage: "5,000",
    type: "For Sale",
  },
  {
    image: VEHICLE_IMAGE_2,
    isFeatured: false,
    price: "$32,500",
    title: "Mercedes-Benz C-Class",
    address: "Miami, FL",
    specs: "2.0L I4 • 255 HP • RWD",
    year: "2023",
    mileage: "12,000",
    type: "For Sale",
  },
  {
    image: VEHICLE_IMAGE_3,
    isFeatured: true,
    price: "$28,900",
    title: "Audi Q7 Premium",
    address: "New York, NY",
    specs: "3.0L V6 • 335 HP • AWD",
    year: "2024",
    mileage: "3,000",
    type: "For Sale",
  },
];

const topCarVendors = [
  {
    id: 1,
    name: "AutoHub Motors",
    craft: "Car Dealer",
    backgroundImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    avatar: VENDOR_AVATAR_1,
    location: "Los Angeles, CA",
    rating: 4.9,
    listings: 156,
  },
  {
    id: 2,
    name: "DrivePlus Auto",
    craft: "Certified Dealer",
    backgroundImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    avatar: VENDOR_AVATAR_2,
    location: "Miami, FL",
    rating: 4.6,
    listings: 203,
  },
  {
    id: 3,
    name: "Elite Auto Gallery",
    craft: "Luxury Car Dealer",
    backgroundImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    avatar: VENDOR_AVATAR_1,
    location: "Beverly Hills, CA",
    rating: 5.0,
    listings: 87,
  },
];

const AutomotiveGrid: React.FC = () => {
  const truncateName = (name: string) => {
    return name.length > 20 ? name.slice(0, 20) + "..." : name;
  };

  const truncateCraft = (craft: string) => {
    return craft.length > 25 ? craft.slice(0, 25) + "..." : craft;
  };
  return (
    <section className="flex flex-col max-w-full px-6 py-12 mx-auto sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 mt-10 mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
            Premium Vehicles
          </p>
          <h2 className="mt-6 text-lg sm:text-xl">
            Hand-picked luxury vehicles with verified history, fully inspected
            for quality and performance.
          </h2>
        </div>
        <Link
          to="/automotive"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-full bg-[#004e27] hover:bg-emerald-800"
        >
          View All Vehicles
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
        {vehicles.map((car) => (
          <Card
                      key={car.title}
                      className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg"
                    >
                      <div className="relative overflow-hidden bg-gray-200 h-72">
                        <img
                          src={car.image}
                          alt={car.title}
                          className="object-cover w-full h-full"
                        />
                        {car.isFeatured && (
                          <span className="absolute px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase rounded-full left-4 top-4 bg-[#004e27]">
                            Featured
                          </span>
                        )}
                        <div className="absolute px-3 py-1 text-sm font-semibold bg-white rounded-full shadow-sm right-4 top-4 text-slate-900">
                          {car.price}
                        </div>
                      </div>
        
                      <CardContent className="p-5 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {car.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">"Dubai"</p>
                        </div>
        
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="px-3 py-1 bg-gray-100 rounded-full">
                            {car.year}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 rounded-full">
                           "Automatic"
                          </span>
                        </div>
        
                        <div className="flex items-center justify-between pt-3 text-sm text-gray-600 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Gauge size={16} className="text-emerald-600" />
                            <span>{car.mileage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Fuel size={16} className="text-emerald-600" />
                            <span>"Petrol"</span>
                          </div>
                        </div>
        
                        <Button
                          className="w-full py-6 text-white bg-[#004e27] hover:bg-[#004e27]"
                          onClick={() =>
                            window.location.assign(`/automotive/${car.title}`)
                          }
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
        ))}
      </div>

      {/* Top Car Vendors */}
      <div className="mt-20">
        <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
              Top Car Vendors
            </p>
            <h2 className="mt-6 text-lg sm:text-xl">
              Browse vehicles from our highest-rated certified dealers and car
              vendors.
            </h2>
          </div>
          <Link
            to="/listings/vendor"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-full bg-[#004e27] hover:bg-emerald-800"
          >
            View All Car Vendors
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

        <div className="grid gap-6 pl-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {topCarVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="max-w-md overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl"
            >
              {/* Header with Background */}
              <div className="relative h-32">
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
                <p className="mb-3 text-sm font-medium text-[#004e27]">
                  {truncateCraft(vendor.craft)}
                </p>
                <p className="mb-3 text-xs text-gray-500">{vendor.location}</p>
                {/* Action Button */}

                <button className="w-full px-4 py-2 font-medium text-white transition-colors bg-[#004e27] hover:bg-emerald-800 rounded-lg ">
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

export default AutomotiveGrid;
