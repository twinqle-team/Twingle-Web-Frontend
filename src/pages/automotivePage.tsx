import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Fuel, Gauge, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Using direct image URLs for better performance
const HERO_BG = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80";
const CAR_IMAGE_1 = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80";
const CAR_IMAGE_2 = "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80";
const CAR_IMAGE_3 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80";

type CarListing = {
  id: number;
  title: string;
  price: string;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  location: string;
  featured: boolean;
  image: string;
};

const carListings: CarListing[] = Array.from({ length: 24 }).map(
  (_, index) => ({
    id: index + 1,
    title: ["Mercedes-Benz C-Class", "BMW X5 Premium", "Audi A4 Sportback"][
      index % 3
    ],
    price: ["$58,900", "$72,400", "$49,300"][index % 3],
    year: [2022, 2021, 2023][index % 3],
    mileage: ["18,500 mi", "27,900 mi", "12,200 mi"][index % 3],
    transmission: ["Automatic", "Automatic", "Manual"][index % 3],
    fuel: ["Hybrid", "Diesel", "Petrol"][index % 3],
    location: ["Dubai", "Abu Dhabi", "Sharjah"][index % 3],
    featured: index % 2 === 0,
    image: [HERO_BG, CAR_IMAGE_1, CAR_IMAGE_2, CAR_IMAGE_3][index % 4],
  }),
);

const itemsPerPage = 18;

const AutomotivePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(carListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCars = carListings.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Full Background Image */}
        <img
          src={HERO_BG}
          alt="Hero background"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/15"></div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium border rounded-full border-[#004e27]/30 bg-[#004e27]/10 text-[#004e27]">
              <Sparkles size={16} />
              New & certified vehicles
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your next <br />
              <span className="text-emerald-400">perfect car</span>
            </h1>
            <p className="mt-4 text-lg text-slate-200">
              Discover premium cars for sale with transparent pricing, verified{" "}
              <br />
              details, and fast buying support.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            {/* Search Form */}
            <div className="w-full max-w-4xl p-4 bg-white shadow-2xl rounded-2xl sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <select className="w-full px-4 py-3 pr-10 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-emerald-500 focus:bg-white">
                  <option>Make</option>
                  <option>BMW</option>
                  <option>Audi</option>
                  <option>Mercedes</option>
                </select>

                <select className="w-full px-4 py-3 pr-10 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-emerald-500 focus:bg-white">
                  <option>Body type</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Coupe</option>
                </select>

                <select className="w-full px-4 py-3 pr-10 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-emerald-500 focus:bg-white">
                  <option>Price</option>
                  <option>$30k - $50k</option>
                  <option>$50k - $80k</option>
                  <option>$80k+</option>
                </select>

                <select className="w-full px-4 py-3 pr-10 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-emerald-500 focus:bg-white">
                  <option>Fuel</option>
                  <option>Hybrid</option>
                  <option>Diesel</option>
                  <option>Petrol</option>
                </select>
              </div>

              <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row">
                <button className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
                  Advanced filters
                </button>
                <Button className="px-6 py-5 font-semibold text-white rounded-lg bg-[#004e27] hover:bg-[#004e27]">
                  Search Cars
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-full px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              Cars available for buy
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse handpicked vehicles with verified specs and competitive
              pricing.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, carListings.length)} of{" "}
            {carListings.length} listings
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg"
            >
              <div className="relative overflow-hidden bg-gray-200 h-72">
                <img
                  src={car.image}
                  alt={car.title}
                  className="object-cover w-full h-full"
                />
                {car.featured && (
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
                  <p className="mt-1 text-sm text-gray-600">{car.location}</p>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {car.year}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {car.transmission}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 text-sm text-gray-600 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Gauge size={16} className="text-emerald-600" />
                    <span>{car.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel size={16} className="text-emerald-600" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <Button
                  className="w-full py-6 text-white bg-[#004e27] hover:bg-[#004e27]"
                  onClick={() =>
                    window.location.assign(`/automotive/${car.id}`)
                  }
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 item-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold transition bg-white rounded-full text-slate-900 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full bg-[#004e27]">
              {currentPage}
            </span>
            <span>of {totalPages}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold text-white transition rounded-full bg-[#019260] hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AutomotivePage;
