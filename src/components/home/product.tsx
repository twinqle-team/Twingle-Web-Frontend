import React from "react";

// Using direct image URLs for better performance
const IMAGE_1 =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
const IMAGE_2 =
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80";
const IMAGE_3 =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";

const listings = [
  {
    image: IMAGE_1,
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
    image: IMAGE_2,
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
    image: IMAGE_3,
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
    image: IMAGE_1,
    isFeatured: false,
    price: "$2,950",
    title: "Cozy Urban Apartment",
    address: "321 Central Ave",
    beds: "2",
    baths: "1",
    sqft: "800",
    type: "For Rent",
  },
  {
    image: IMAGE_2,
    isFeatured: true,
    price: "$6,100",
    title: "Executive Family Home",
    address: "654 Elm Street",
    beds: "4",
    baths: "3",
    sqft: "2,100",
    type: "For Sale",
  },
  {
    image: IMAGE_3,
    isFeatured: false,
    price: "$3,500",
    title: "Sleek Modern Loft",
    address: "987 Arts District",
    beds: "2",
    baths: "2",
    sqft: "1,100",
    type: "For Sale",
  },
];

const Product: React.FC = () => {
  return (
    <section className="flex flex-col max-w-full px-6 py-12 mx-auto sm:px-8 lg:px-12 gap-14 ">
      <div className="flex flex-col gap-4 mt-10 mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-3xl font-semibold uppercase text-slate-950 sm:text-4xl">
            Curated Collections
          </p>
          <h2 className="mt-6 text-lg sm:text-xl">
            Hand-picked assets that define luxury living and elite performance,
            fully vetted by our expert inspection team.
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {listings.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-md cursor-pointer group rounded-xl hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-200 h-80">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
              />

              {/* Featured Badge - Top Left */}
              {item.isFeatured && (
                <span className="absolute left-4 top-4 inline-flex rounded px-3 py-1.5 text-xs font-bold shadow-sm bg-[#004e27] text-white">
                  FEATURED
                </span>
              )}

              {/* Price Badge - Top Right */}
              <div className="absolute right-4 top-4 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full shadow-md bg-white text-slate-900">
                {item.price}
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.address}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200"></div>

              {/* Details - Beds, Baths, Sqft */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{item.beds} Beds</span>
                <span>{item.baths} Baths</span>
                <span>{item.sqft} sqft</span>
              </div>

              {/* Type */}
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  {item.type}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Product;
