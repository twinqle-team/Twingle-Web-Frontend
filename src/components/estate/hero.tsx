import React, { useState } from "react";
import { MapPin, Sliders } from "lucide-react";
import heroBg from "../../assets/image.png";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedBath, setBedBath] = useState("all");
  const [listingStatus, setListingStatus] = useState("all");
  const [homeType, setHomeType] = useState("all");

  const handleSearch = () => {
    console.log({
      address,
      propertyType,
      priceRange,
      bedBath,
      listingStatus,
      homeType,
    });
  };

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Full Background Image */}
      <img
        src={heroBg}
        alt="Hero background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/15"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find your perfect
            <br />
            <span className="text-emerald-400">investment properties</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mb-10 text-base text-white sm:text-lg">
            Explore a selection of high-value real estate opportunities designed
            for financial growth and stability
          </p>

          {/* Search Form */}
          <div className="p-6 bg-white shadow-2xl rounded-2xl sm:p-8">
            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-7">
              {/* Location Input */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 px-4 py-3 transition border border-gray-300 rounded-lg bg-gray-50 focus-within:border-green-500 focus-within:bg-white">
                  <MapPin size={18} className="flex-shrink-0 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* For Sale */}
              <div>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-700 transition border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-green-500 focus:bg-white"
                >
                  <option value="all">For sale</option>
                  <option value="rent">For rent</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-700 transition border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-green-500 focus:bg-white"
                >
                  <option value="all">Price</option>
                  <option value="0-500k">$0 - $500k</option>
                  <option value="500k-1m">$500k - $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m+">$2M+</option>
                </select>
              </div>

              {/* Bed & Bath */}
              <div>
                <select
                  value={bedBath}
                  onChange={(e) => setBedBath(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-700 transition border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-green-500 focus:bg-white"
                >
                  <option value="all">Bed & Bath</option>
                  <option value="studio">Studio</option>
                  <option value="1bed">1 Bed</option>
                  <option value="2bed">2 Bed</option>
                  <option value="3bed">3 Bed</option>
                  <option value="4bed+">4 Bed+</option>
                </select>
              </div>

              {/* Listing Status */}
              <div>
                <select
                  value={listingStatus}
                  onChange={(e) => setListingStatus(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-700 transition border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-green-500 focus:bg-white"
                >
                  <option value="all">Listing status</option>
                  <option value="new">New Listing</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Home Type */}
              <div>
                <select
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-700 transition border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-green-500 focus:bg-white"
                >
                  <option value="all">Home type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <button className="items-center hidden gap-2 font-medium text-gray-700 transition sm:flex hover:text-gray-900">
                <Sliders size={18} />
                <span>Advanced Search</span>
              </button>

              <div className="flex w-full gap-3 sm:w-auto">
                <Button
                  onClick={handleSearch}
                  className="flex-1 px-8 py-6 font-semibold text-white transition-colors bg-[#004e27] rounded-lg sm:flex-none hover:bg-[#004e27]"
                >
                  Search Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
