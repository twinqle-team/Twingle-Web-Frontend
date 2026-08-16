import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { propertyListings } from "@/data/propertyData";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const propId = Number(id);

  const property = useMemo(
    () =>
      propertyListings.find((item) => item.id === propId) ||
      propertyListings[0],
    [propId],
  );

  // Gallery images (expect up to 5 images)
  const gallery = useMemo(() => {
    const imgs =
      property.gallery && property.gallery.length
        ? property.gallery.slice(0, 5)
        : [property.image];
    // pad to 5 with main image if needed
    while (imgs.length < 5) imgs.push(property.image);
    return imgs;
  }, [property]);

  const [activeImage, setActiveImage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const parsedNumber = Number(property.price.replace(/[^0-9.]/g, "")) || 0;
  let monthlyRent = parsedNumber;
  if (!/mo|month|\/mo/i.test(property.price)) {
    monthlyRent = Math.round(parsedNumber / 12) || 0;
  }
  const leaseMonths = 12;
  const utilities = 150;
  const totalAnnual = (monthlyRent + utilities) * leaseMonths;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // image modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsMapFullscreen(document.fullscreenElement === mapRef.current);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleMapFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (mapRef.current) {
        mapRef.current.style.height = "100vh";
        await mapRef.current.requestFullscreen();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openImageModal = (index: number) => {
    setModalIndex(index);
    setIsImageModalOpen(true);
    setIsZoomed(false);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setIsZoomed(false);
  };
  const showNext = () => setModalIndex((i) => (i + 1) % gallery.length);
  const showPrev = () =>
    setModalIndex((i) => (i - 1 + gallery.length) % gallery.length);
  useEffect(() => {
    if (!isImageModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "+") setIsZoomed(true);
      if (e.key === "-") setIsZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isImageModalOpen, gallery.length]);

  // share & save state
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: property.address,
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
    <div className="container max-w-[1440px] px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">
      <div className="space-y-8 lg:space-y-10">
        <div className="space-y-3">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl lg:text-4xl">
                {property.title}
              </h1>
              <p className="mt-1.5 text-xs text-gray-600 sm:text-sm">
                {property.address}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-2.5 md:justify-end">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 sm:px-3 sm:py-2 sm:text-sm"
                aria-label="Share property"
              >
                <svg
                  width="12"
                  height="12"
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 sm:px-3 sm:py-2 sm:text-sm"
                aria-pressed={saved}
                aria-label="Save property"
              >
                <svg
                  width="12"
                  height="12"
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
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-4">
            <div className="w-full h-[40vh] sm:h-[50vh] md:h-[65vh] lg:h-[80vh] bg-gray-100 rounded-[28px] overflow-hidden flex items-center justify-center group">
              <img
                src={gallery[activeImage]}
                alt={property.title}
                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {property.gallery && property.gallery.length > gallery.length && (
                <div className="absolute -translate-x-1/2 left-1/2 bottom-4">
                  <button
                    onClick={() => openImageModal(0)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full shadow-md bg-white/90 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    View {gallery.length} photos
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2 mt-2.5 lg:hidden sm:gap-3">
              {gallery.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-14 rounded-xl overflow-hidden focus:outline-none border-2 sm:h-20 sm:rounded-2xl ${
                    index === activeImage
                      ? "border-[#004e27]"
                      : "border-transparent"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    src={item}
                    alt={`${property.title} thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-col hidden col-span-1 gap-2.5 lg:flex">
            {gallery.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`block w-full h-24 rounded-2xl overflow-hidden focus:outline-none border-2 sm:h-28 ${
                  index === activeImage
                    ? "border-[#004e27]"
                    : "border-transparent"
                }`}
                aria-label={`Show image ${index + 1}`}
              >
                <img
                  src={item}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr] md:grid-cols-[1.5fr_1fr]">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="rounded-[28px] p-5 shadow-sm sm:p-6">
              <h1 className="text-lg font-semibold text-black sm:text-xl">Details</h1>

              <div className="flex flex-wrap items-center gap-3 mt-3 sm:gap-4 sm:mt-4">
                <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-lg border min-w-[120px] sm:min-w-[140px] sm:p-3">
                  <div className="p-1.5 bg-gray-100 rounded-md sm:p-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sm:w-5 sm:h-5"
                    >
                      <path
                        d="M3 11L12 3l9 8v8a1 1 0 0 1-1 1h-3v-6H7v6H4a1 1 0 0 1-1-1v-8z"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 sm:text-xs">Bedroom</div>
                    <div className="text-xs font-semibold text-slate-900 sm:text-sm">
                      {property.beds}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border min-w-[140px]">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7h18M5 7v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Bathrooms</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {property.baths}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border min-w-[160px]">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7h18v10H3z"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7v10"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Area</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {property.sqft} sqft
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border min-w-[140px]">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 11h18v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 11v-4a3 3 0 0 1 6 0v4"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Parking</div>
                    <div className="text-sm font-semibold text-slate-900">
                      Indoor
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border min-w-[160px]">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">Area Safety</div>
                      <div className="text-xs text-gray-600">Good</div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="flex-1 h-2 rounded bg-[#004e27]" />
                      <span className="flex-1 h-2 rounded bg-[#004e27]" />
                      <span className="flex-1 h-2 rounded bg-[#004e27]/70" />
                      <span className="flex-1 h-2 rounded bg-amber-300" />
                      <span className="flex-1 h-2 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Property Description
              </h3>
              <p className="mt-4 leading-7 text-gray-700">
                {showMore
                  ? property.description
                  : `${property.description.slice(0, 220)}${property.description.length > 220 ? "..." : ""}`}
              </p>
              {property.description.length > 220 && (
                <button
                  className="mt-3 text-sm font-semibold text-[#004e27]"
                  onClick={() => setShowMore((s) => !s)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-950">
                Building Amenities
              </h3>
              <div className="grid gap-3 mt-4 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-start gap-3 p-4 border border-gray-100 rounded-3xl bg-gray-50"
                  >
                    <span className="w-3 h-3 mt-1 rounded-full bg-[#004e27]" />
                    <p className="text-sm text-gray-700">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {property.inspectionVideo && (
                <div className="rounded-[28px] bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Inspection Video
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {property.inspectionVideo.description}
                  </p>
                  <div className="mt-4 overflow-hidden border border-gray-100 rounded-lg">
                    <div className="aspect-video">
                      <iframe
                        title={property.inspectionVideo.title}
                        src={property.inspectionVideo.videoUrl}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Location</h3>
              <div className="mt-4 overflow-hidden border border-gray-100 rounded-lg">
                <div ref={mapRef} className="relative w-full h-44">
                  <iframe
                    title="property-map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  <button
                    onClick={toggleMapFullscreen}
                    className="absolute inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full shadow right-3 top-3 bg-white/90"
                    aria-label="Toggle map fullscreen"
                  >
                    {isMapFullscreen ? "Exit" : "Full screen"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="order-1 space-y-6 lg:order-2">
            <div className="rounded-[28px] bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-slate-950">
                {property.title}
              </h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {property.price}
              </p>

              <div className="grid gap-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 text-sm border rounded-lg bg-gray-50">
                    <div className="text-xs text-gray-500">Move In</div>
                    <div className="mt-1 font-medium">11/09/2025</div>
                  </div>
                  <div className="p-3 text-sm border rounded-lg bg-gray-50">
                    <div className="text-xs text-gray-500">Move Out</div>
                    <div className="mt-1 font-medium">20/09/2025</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 text-sm bg-white border rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500">Lease Duration</div>
                    <div className="mt-1 font-medium">1 Year</div>
                  </div>
                  <div className="text-gray-400">▾</div>
                </div>

                <div className="flex items-center justify-between p-3 text-sm bg-white border rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500">
                      Numbers Of Tenants
                    </div>
                    <div className="mt-1 font-medium">02</div>
                  </div>
                  <div className="text-gray-400">▾</div>
                </div>

                <div className="p-4 bg-white border rounded-lg border-rose-200">
                  <div className="text-sm font-semibold text-gray-900">
                    Price Breakdown
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monthly Rent</span>
                      <span>${monthlyRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lease Duration</span>
                      <span>× {leaseMonths} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilities (Est.)</span>
                      <span>${utilities}/mo</span>
                    </div>
                    <div className="flex justify-between mt-3 font-semibold">
                      <span>Total Annual:</span>
                      <span>${totalAnnual.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 text-sm font-semibold border border-gray-200 rounded-2xl">
                  Contact Agent
                </button>
                <button className="w-full py-3 text-sm font-semibold text-white rounded-2xl bg-slate-900">
                  Schedule a Tour
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* More properties section - reuse product card style */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-950">
              More properties in {property.city?.split(",")[0] ?? "this area"}
            </h2>
            <Link to="/real-estate" className="text-sm text-gray-600">
              See More
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {propertyListings
              .filter((p) => p.id !== property.id)
              .slice(0, 3)
              .map((listing) => (
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

                    {listing.type && (
                      <span className="absolute left-4 top-4 inline-flex rounded px-3 py-1.5 text-xs font-bold bg-[#004e27] text-white shadow-sm">
                        {listing.type}
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
        </section>
        {/* Image modal */}
        {isImageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-[90%] max-w-4xl h-[80%] bg-black rounded-lg overflow-hidden sm:w-full sm:h-full sm:rounded-none">
              <button
                onClick={closeImageModal}
                className="absolute z-20 p-2 rounded-full right-3 top-3 bg-white/90"
                aria-label="Close gallery"
              >
                ✕
              </button>

              <button
                onClick={() => {
                  showPrev();
                  setIsZoomed(false);
                }}
                className="absolute z-20 p-2 -translate-y-1/2 rounded-full left-3 top-1/2 bg-white/90"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                onClick={() => {
                  showNext();
                  setIsZoomed(false);
                }}
                className="absolute z-20 p-2 -translate-y-1/2 rounded-full right-3 top-1/2 bg-white/90"
                aria-label="Next image"
              >
                ›
              </button>

              <div className="flex items-center justify-center w-full h-full bg-black">
                <img
                  src={gallery[modalIndex]}
                  alt={`gallery-${modalIndex}`}
                  onDoubleClick={() => setIsZoomed((z) => !z)}
                  className={`max-h-full max-w-full transition-transform duration-200 ${isZoomed ? "scale-150 cursor-grab" : "scale-100"}`}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="absolute z-30 flex items-center gap-2 px-3 py-1 -translate-x-1/2 rounded-full left-1/2 bottom-3 bg-white/10 backdrop-blur">
                <button
                  onClick={() => setIsZoomed((z) => !z)}
                  className="text-sm text-white"
                >
                  {isZoomed ? "Zoom out" : "Zoom in"}
                </button>
                <div className="text-sm text-white">
                  {modalIndex + 1} / {gallery.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
