import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  ShieldCheck,
  FileText,
  Clock,
  Check,
  Maximize2,
} from "lucide-react";
import { GiCarDoor, GiCarSeat } from "react-icons/gi";
import { GrManual } from "react-icons/gr";
import { Card, CardContent } from "@/components/ui/card";
import { carListings } from "../data/carData";
import { Button } from "@/components/ui/button";

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const carId = Number(id);

  const car = useMemo(
    () => carListings.find((listing) => listing.id === carId) || carListings[0],
    [carId],
  );

  // Gallery images (expect up to 5 images)
  const gallery = useMemo(() => {
    const imgs =
      car.gallery && car.gallery.length ? car.gallery.slice(0, 5) : [car.image];
    // pad to 5 with main image if needed
    while (imgs.length < 5) imgs.push(car.image);
    return imgs;
  }, [car]);

  const featureItems = useMemo(
    () => [...car.features, ...(car.additionalFeatures?.slice(0, 3) ?? [])],
    [car],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (mapRef.current) {
          mapRef.current.style.height = "";
        }
        setIsFullscreen(false);
      } else if (document.fullscreenElement === mapRef.current) {
        setIsFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const mapUrl = useMemo(() => {
    const query = encodeURIComponent(car.location || car.dealer.location || "");
    return `https://maps.google.com/maps?q=${query}&output=embed`;
  }, [car.location, car.dealer.location]);

  const toggleMapFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (mapRef.current) {
        mapRef.current.style.height = "100vh";
        await mapRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Unable to toggle fullscreen mode", error);
    }
  };
 // share & save state
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: car.title,
      text: car.location ? `Check out this car in ${car.location}: ${car.title}` : `Check out this car: ${car.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData as any);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      } else {
        prompt("Copy this link:", window.location.href);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Listing header: title, dealer/location, rating, tags, actions */}
      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{car.title}</h1>
          <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              <span className="break-words">
                {car.dealer?.name || car.location}
              </span>
              <span className="hidden mx-1 sm:inline">·</span>
              <span className="text-gray-500">3.1 km from centre</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center whitespace-nowrap rounded bg-[#004e27] px-2 py-0.5 text-xs text-white">
                Free cancellation
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-yellow-500">
                <span>★</span>
                <span className="text-gray-700">
                  {car.dealer?.rating || "4.0"}
                </span>
              </span>
            </div>
          </div>
        </div>

            <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
                aria-label="Share property"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"
                    stroke="#0f172a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 6l-4-4-4 4"
                    stroke="#0f172a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2v14"
                    stroke="#0f172a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share
              </button>

              <button
                onClick={() => {
                  setSaved((s) => !s);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
                aria-pressed={saved}
                aria-label="Save property"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21l-7-5-7 5V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"
                    stroke="#0f172a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {saved ? "Saved" : "Save"}
              </button>
            </div>
      </div>

      {/* Car Image Display - layout: large hero + vertical thumbnails (supports 5 images) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="col-span-1 lg:col-span-4">
          <div className="w-full h-[55vh] sm:h-[65vh] md:h-[72vh] lg:h-[80vh] bg-gray-100 rounded overflow-hidden flex items-center justify-center group">
            <img
              src={gallery[activeIndex]}
              alt={`${car.title} image ${activeIndex + 1}`}
              className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          <div className="grid grid-cols-5 gap-3 mt-3 lg:hidden">
            {gallery.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-20 rounded overflow-hidden focus:outline-none border-2 ${
                  idx === activeIndex ? "border-primary" : "border-transparent"
                }`}
                aria-label={`Show image ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`thumb-${idx}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-col justify-center hidden col-span-1 gap-3 lg:flex">
          {gallery.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`block w-full h-28 rounded overflow-hidden flex-shrink-0 focus:outline-none border-2 ${
                idx === activeIndex ? "border-primary" : "border-transparent"
              }`}
              aria-label={`Show image ${idx + 1}`}
            >
              <img
                src={src}
                alt={`thumb-${idx}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <section className="order-2 space-y-6 lg:order-1">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-black">Features</h2>
                <p className="mt-3 text-sm text-gray-500">
                  {car.year} • {car.mileage} • {car.fuel}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                  <GiCarSeat size={18} />
                  {car.specs.Seats ?? "4 Seats"}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                  <GrManual size={18} />
                  {car.transmission}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                  <GiCarDoor size={18} />
                  {car.additionalFeatures?.find((feature) =>
                    feature.toLowerCase().includes("door"),
                  ) ?? "4 Doors"}
                </span>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-gray-600">
              {car.description}
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">
                What this car includes
              </h3>
              <div className="grid gap-3 mt-4 sm:grid-cols-2">
                {featureItems.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-3xl bg-gray-50"
                  >
                    <Check size={16} className="text-green-600" />
                    <p className="text-sm font-medium text-gray-700">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-[32px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Vehicle specifications
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Detailed specs and performance data for this listing.
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full bg-[#004e27] text-white">
                {car.price}
              </span>
            </div>

            <div className="grid gap-4 mt-6 sm:grid-cols-2">
              {Object.entries(car.specs).map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-4"
                >
                  <p className="text-sm font-medium text-gray-500">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {car.inspectionVideo ? (
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-[32px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {car.inspectionVideo.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {car.inspectionVideo.description}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#004e27] px-3 py-1 text-sm font-semibold text-white">
                  Inspection video
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-[24px] border border-gray-100">
                <div className="aspect-video">
                  <iframe
                    title={car.inspectionVideo.title}
                    src={car.inspectionVideo.videoUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-[32px]">
            <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Location
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  See where this car is located on Google Maps.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleMapFullscreen}
                className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-white transition bg-black rounded-md lg:rounded-full hover:bg-gray-900 sm:w-auto sm:px-4"
              >
                <Maximize2 size={16} className="shrink-0" />
                <span className="whitespace-nowrap">
                  {isFullscreen ? "Exit full screen" : "Full screen"}
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-gray-100">
              <div
                ref={mapRef}
                className="relative h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[28rem] w-full"
              >
                <iframe
                  title="Car location map"
                  src={mapUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col items-end order-1 space-y-6 lg:order-2 ">
          <div className="w-full  lg:max-w-[400px] rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                Offer price
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900">
                {car.price}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-[16px] font-semibold text-[#009360]">
                <ShieldCheck size={16} />
                Full Escrow Protection Active
              </p>
            </div>

            <button className="mb-3 w-full rounded-2xl bg-[#004e27] px-4 py-6 text-lg font-semibold text-white transition hover:bg-[#004e27]">
              Start Escrow
            </button>
            <button className="mb-3 w-full rounded-2xl bg-[#004e27] text-lg font-semibold  px-4 py-6 text-white transition hover:bg-[#004e27]">
              Request Private Viewing
            </button>
            <button className="w-full px-4 py-6 mb-6 text-lg font-semibold text-gray-900 transition bg-white border border-gray-200 rounded-2xl hover:bg-gray-50">
              Contact Seller
            </button>

            {/* Divider */}
            <div className="flex-1 h-px mt-5 bg-gray-300 mb-7" />

            <div className="p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div>
                  <p className="font-semibold text-[20px] text-gray-900">
                    {car.dealer.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Senior Curator, Elite Motors
                  </p>
                </div>
              </div>
              <div className="mt-7 grid gap-3 text-[15px] text-gray-600 bg-[#f1f2ff] p-4 rounded-md">
                <div className="flex items-center gap-2">
                  {/* <span className="inline-flex items-center justify-center w-6 h-6 text-gray-500 bg-white rounded-full shadow-sm">
                     <ShieldCheck size={16} />
                  </span> */}
                  <ShieldCheck size={16} />
                  <span>24 Verified Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <span className="inline-flex items-center justify-center w-6 h-6 text-gray-500 bg-white rounded-full">
                     <Clock size={16} />
                  </span> */}
                  <Clock size={16} />
                  <span>Average Response: &lt; 2hrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-[#f1f2ff] p-6 w-full  lg:max-w-[400px]">
            <p className="mb-4 text-sm font-semibold text-gray-900">
              Available Documents
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl">
                <FileText size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Service History PDF
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl">
                <FileText size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Certificate of Authenticity
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl">
                <FileText size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    High-Res Gallery (4k)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              You may also like
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Curated high-performance cars from our private collection.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {carListings
            .filter((listing) => listing.id !== car.id)
            .slice(0, 3)
            .map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg"
              >
                <div className="relative overflow-hidden bg-gray-200 h-72">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                  {listing.featured && (
                    <span className="absolute px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase rounded-full left-4 top-4 bg-[#004e27]">
                      Featured
                    </span>
                  )}
                  <div className="absolute px-3 py-1 text-sm font-semibold bg-white rounded-full shadow-sm right-4 top-4 text-slate-900">
                    {listing.price}
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {listing.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {listing.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {listing.year}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {listing.transmission}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 text-sm text-gray-600 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span>{listing.mileage}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {listing.fuel}
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
      </section>
    </div>
  );
};

export default CarDetailPage;
