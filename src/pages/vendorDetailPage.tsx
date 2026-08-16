import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Phone,
  MessageCircle,
  ArrowLeft,
  Building2,
  CarFront,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { propertyListings } from "@/data/propertyData";
import { carListings } from "@/data/carData";
import agentOne from "../assets/login1.png";
import agentTwo from "../assets/login2.png";
import agentThree from "../assets/login3.png";
import vendorOne from "../assets/hero-bg.png";

type ListingType = "agent" | "vendor";

interface ListingItem {
  id: number;
  name: string;
  location: string;
  craft: string;
  backgroundImage: string;
  avatar: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  email?: string;
  experience?: string;
  specialization?: string;
  locationsServed?: string[];
}

const estateAgents: ListingItem[] = [
  {
    id: 1,
    name: "Amara Clarke",
    location: "Lagos, Nigeria",
    craft: "Luxury homes & investment",
    backgroundImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    avatar: agentOne,
    description:
      "Specializing in luxury properties and investment opportunities across Lagos. Over 10 years of experience in the Nigerian real estate market.",
    rating: 4.8,
    reviewCount: 127,
    phone: "+234 803 456 7890",
    email: "amara.clarke@example.com",
    experience: "10+ years",
    specialization: "Luxury homes & investment properties",
    locationsServed: [
      "Lekki, Lagos",
      "Victoria Island, Lagos",
      "Ikeja, Lagos",
      "Abuja, FCT",
      "Port Harcourt, Rivers",
      "Ibadan, Oyo",
      "Calabar, Cross River",
      "Enugu, Enugu State",
      "Accra, Ghana",
    ],
  },
  {
    id: 2,
    name: "Daniel Brooks",
    location: "Abuja, Nigeria",
    craft: "Family homes & commercial",
    backgroundImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
    avatar: agentTwo,
    description:
      "Expert in family homes and commercial properties in Abuja and surrounding areas. Committed to finding the perfect space for your needs.",
    rating: 4.6,
    reviewCount: 89,
    phone: "+234 805 123 4567",
    email: "daniel.brooks@example.com",
    experience: "8+ years",
    specialization: "Family homes & commercial properties",
    locationsServed: [
      "Maitama, Abuja",
      "Asokoro, Abuja",
      "Wuse, Abuja",
      "Garki, Abuja",
      "Kubwa, Abuja",
      "Lagos, Lagos State",
      "Kaduna, Kaduna State",
      "Kano, Kano State",
      "Jos, Plateau State",
      "Ibadan, Oyo State",
      "Benin City, Edo State",
    ],
  },
  {
    id: 3,
    name: "Nadia Yusuf",
    location: "Port Harcourt, Nigeria",
    craft: "Rental & relocation",
    backgroundImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
    avatar: agentThree,
    description:
      "Specializing in rental properties and relocation services. Making your move to Port Harcourt seamless and stress-free.",
    rating: 4.9,
    reviewCount: 203,
    phone: "+234 807 987 6543",
    email: "nadia.yusuf@example.com",
    experience: "12+ years",
    specialization: "Rental & relocation services",
    locationsServed: [
      "Port Harcourt, Rivers",
      "Oyigbo, Rivers",
      "Eleme, Rivers",
      "Bonny, Rivers",
      "Lagos, Lagos State",
      "Abuja, FCT",
      "Warri, Delta State",
      "Calabar, Cross River",
      "Uyo, Akwa Ibom",
      "Yenagoa, Bayelsa",
      "Owerri, Imo State",
      "Aba, Abia State",
      "Enugu, Enugu State",
      "Asaba, Delta State",
      "Benin City, Edo State",
    ],
  },
];

const carVendors: ListingItem[] = [
  {
    id: 1,
    name: "AutoHub Motors",
    location: "Lekki, Lagos",
    craft: "Certified used & luxury",
    backgroundImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop",
    avatar: vendorOne,
    description:
      "Premium certified used and luxury vehicles. All vehicles thoroughly inspected and certified. Financing options available.",
    rating: 4.7,
    reviewCount: 156,
    phone: "+234 809 234 5678",
    email: "info@autohubmotors.com",
    experience: "7+ years",
    specialization: "Certified used & luxury vehicles",
    locationsServed: [
      "Lekki, Lagos",
      "Victoria Island, Lagos",
      "Ikeja, Lagos",
      "Abuja, FCT",
      "Port Harcourt, Rivers",
      "Ibadan, Oyo",
      "Accra, Ghana",
    ],
  },
  {
    id: 2,
    name: "DrivePlus Autos",
    location: "Victoria Island, Lagos",
    craft: "Premium sedans & SUVs",
    backgroundImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=600&fit=crop",
    avatar: agentOne,
    description:
      "Your trusted dealer for premium sedans and SUVs. Quality assured with comprehensive warranty on all vehicles.",
    rating: 4.5,
    reviewCount: 92,
    phone: "+234 806 876 5432",
    email: "sales@driveplusautos.com",
    experience: "5+ years",
    specialization: "Premium sedans & SUVs",
    locationsServed: [
      "Victoria Island, Lagos",
      "Lekki, Lagos",
      "Ikeja, Lagos",
      "Abuja, FCT",
      "Dubai, UAE",
      "London, UK",
    ],
  },
  {
    id: 3,
    name: "Metro Wheels",
    location: "Abuja, Nigeria",
    craft: "Fleet & executive vehicles",
    backgroundImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop",
    avatar: agentTwo,
    description:
      "Leading provider of fleet and executive vehicles. Specializing in corporate and government fleet management solutions.",
    rating: 4.8,
    reviewCount: 178,
    phone: "+234 808 345 6789",
    email: "contact@metrowheels.com",
    experience: "9+ years",
    specialization: "Fleet & executive vehicles",
    locationsServed: [
      "Abuja, FCT",
      "Lagos, Lagos State",
      "Port Harcourt, Rivers",
      "Kaduna, Kaduna State",
      "Kano, Kano State",
      "Ibadan, Oyo State",
      "Benin City, Edo State",
    ],
  },
];

type VendorProduct = {
  id: number;
  title: string;
  price: string;
  location: string;
  category: string;
  type: string;
  image: string;
  details: string;
  features: string[];
  link: string;
  featured: boolean;
};

const createVendorProducts = (isAgent: boolean): VendorProduct[] => {
  if (isAgent) {
    return propertyListings.map((listing) => ({
      id: listing.id,
      title: listing.title,
      price: listing.price,
      location: listing.city,
      category: listing.type,
      type: listing.type,
      image: listing.image,
      details: `${listing.sqft} sqft · ${listing.type}`,
      features: listing.features.slice(0, 2),
      link: `/property/${listing.id}`,
      featured: (listing as any).featured ?? false,
    }));
  }

  return carListings.map((listing) => ({
    id: listing.id,
    title: listing.title,
    price: listing.price,
    location: listing.location,
    category: `${listing.year} • ${listing.fuel}`,
    type: listing.fuel,
    image: listing.image,
    details: listing.description,
    features: listing.features.slice(0, 2),
    link: `/automotive/${listing.id}`,
    featured: false,
  }));
};

const VendorProductCard: React.FC<{ product: VendorProduct }> = ({
  product,
}) => (
  <Card className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg">
    <div className="relative overflow-hidden bg-gray-200 h-72">
      <img
        src={product.image}
        alt={product.title}
        className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
      />

      {product.featured && (
        <span className="absolute left-4 top-4 inline-flex rounded px-3 py-1.5 text-xs font-bold bg-emerald-500 text-white shadow-sm">
          FEATURED
        </span>
      )}

      <div className="absolute right-4 top-4 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full shadow-md bg-white text-slate-950">
        {product.price}
      </div>
    </div>

    <CardContent className="p-5 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {product.location}
        </p>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{product.type}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Link
          to={product.link}
          className="flex-1 rounded-2xl bg-[#004e27] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#004e27]"
        >
          View Details
        </Link>
        <span className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full">
          {product.category}
        </span>
      </div>
    </CardContent>
  </Card>
);

const VendorDetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const vendorTypeState = type as ListingType | undefined;
  const vendorId = Number(id);
  const isAgent = vendorTypeState === "agent";
  const vendor = useMemo(() => {
    const list = isAgent ? estateAgents : carVendors;
    return list.find((v) => v.id === vendorId) || list[0];
  }, [vendorId, isAgent]);

  const Icon = isAgent ? Building2 : CarFront;

  if (!vendor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600">Vendor not found</p>
      </div>
    );
  }

  const vendorProducts = useMemo(
    () => createVendorProducts(isAgent),
    [isAgent],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden h-72 sm:h-96 bg-slate-900/5">
        <img
          src={vendor.backgroundImage}
          alt="Vendor background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

        <div className="absolute inset-x-0 top-0 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between py-4">
            <Link
              to={`/listings/${isAgent ? "agent" : "vendor"}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white transition rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 sm:text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to listings</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative px-4 -mt-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 -mt-12 sm:-mt-16 border-4 border-white rounded-full shadow-xl bg-slate-200 mx-auto sm:mx-0">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="object-cover w-full h-full rounded-full"
                />
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex items-center justify-center rounded-full bg-[#004e27] p-1.5 sm:p-2 shadow-lg">
                  <Icon size={16} className="text-white sm:hidden" />
                  <Icon size={20} className="text-white hidden sm:block" />
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                    {vendor.name}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                    of {vendor.craft}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className={`${
                          index < Math.round(vendor.rating ?? 0)
                            ? "text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-slate-900">
                    {vendor.rating?.toFixed(1) ?? "0.0"}
                  </span>
                  <span className="text-slate-400">
                    ({vendor.reviewCount ?? 0} Rating)
                  </span>
                </div>

                <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-slate-600">
                    <Phone size={18} className="text-slate-400 flex-shrink-0" />
                    <span className="font-medium text-slate-900 text-xs sm:text-sm">
                      Mobile: {vendor.phone ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-slate-600">
                    <MapPin size={18} className="text-slate-400 flex-shrink-0" />
                    <span className="font-medium text-slate-900 text-xs sm:text-sm">
                      {vendor.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center lg:justify-end w-full sm:w-auto">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-medium transition bg-white border rounded-full border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50"
              >
                <MessageCircle size={14} />
                Message Agent
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-medium text-white transition rounded-full bg-[#004e27] hover:bg-[#003d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004e27]"
              >
                <Phone size={14} />
                Get In Touch
              </button>
            </div>
          </div>

          <div className="space-y-12 sm:space-y-16 px-4 sm:px-10 mt-8 sm:mt-10">
            {/* Personal Profile Section */}
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950">
                Personal Profile
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                I feel that having the right real estate agent means having an
                agent who is committed to helping you buy or sell your home with
                the highest level of expertise in your local market. This means
                also to help you in understanding each step of the buying or
                selling process. This commitment level has helped me build a
                remarkable track record of delivering results. Whether you are
                an experienced investor or a first time buyer, I can help you in
                finding the property of your dreams. Feel free to browse through
                my profile and please don't hesitate to reach out for any of
                your real estate needs.
              </p>
            </section>

            {/* Locations Served Section */}
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950">
                Locations Served ({vendor.locationsServed?.length ?? 0})
              </h2>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {vendor.locationsServed?.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-base text-slate-600"
                  >
                    <span className="text-slate-400">•</span>
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                    All Products
                  </p>
                  <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-slate-950">
                    All listings uploaded by this vendor
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {vendorProducts.map((product) => (
                  <VendorProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
