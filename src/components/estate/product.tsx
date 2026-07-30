import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { propertyListings } from "@/data/propertyData";

type Listing = {
  id: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  price: string;
  featured: boolean;
  type: string;
  image: string;
};

const sampleListings: Listing[] = propertyListings
  .slice(0, 30)
  .map((listing) => ({
    ...listing,
    address: listing.address,
    type: listing.type,
  }));

const itemsPerPage = 18;

const Product: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleListings = sampleListings.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="w-full px-6 py-12 bg-white sm:px-8 lg:px-12">
      <div className="max-w-full ">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Showing {startIndex + 1}-
              {Math.min(endIndex, sampleListings.length)} of{" "}
              {sampleListings.length} results
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse curated investment properties with rich details and fast
              navigation.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {visibleListings.map((listing) => (
            <Card
              key={listing.id}
              className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="relative overflow-hidden bg-gray-200 h-72">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                />

                {listing.featured && (
                  <span className="absolute left-4 top-4 inline-flex rounded px-3 py-1.5 text-xs font-bold bg-emerald-500 text-white shadow-sm">
                    FEATURED
                  </span>
                )}

                <div className="absolute right-4 top-4 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full shadow-md bg-white text-slate-950">
                  {listing.price}
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {listing.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {listing.address}
                  </p>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{listing.beds} Beds</span>
                  <span>{listing.baths} Baths</span>
                  <span>{listing.sqft} sqft</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to={`/property/${listing.id}`}
                    className="flex-1 rounded-2xl bg-[#004e27] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#004e27]"
                  >
                    View Details
                  </Link>
                  <span className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full">
                    {listing.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 item-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center w-10 h-10 text-gray-700 transition bg-white border border-gray-200 rounded-full hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-[#004e27] rounded-full">
              {currentPage}
            </span>
            <span>of {totalPages}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold text-white transition bg-[#004e27] rounded-full hover:bg-[#004e27] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
