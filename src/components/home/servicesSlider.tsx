import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Clock3,
  Headphones,
  Globe,
  CarFront,
  FileText,
  Wrench,
  CreditCard,
  Truck,
} from "lucide-react";

const services = [
  {
    title: "Verified Listings",
    description:
      "All properties and vehicles are identity-verified and authenticated before listing.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Escrow",
    description:
      "Neutral escrow holds funds until inspections, paperwork, and delivery are confirmed.",
    icon: Globe,
  },
  {
    title: "Rapid Inspections",
    description:
      "Professional on-site and remote inspections with detailed reports delivered quickly.",
    icon: Clock3,
  },
  {
    title: "Vehicle History Reports",
    description:
      "Comprehensive car history checks including service, accident and title records.",
    icon: FileText,
  },
  {
    title: "Certified Maintenance",
    description:
      "Access certified inspection and reconditioning partners for pre-sale certification.",
    icon: Wrench,
  },
  {
    title: "Financing & Trade-In",
    description:
      "Flexible financing options and trade-in valuation tools tailored for high-value assets.",
    icon: CreditCard,
  },
  {
    title: "Pickup & Shipping",
    description:
      "Logistics and shipping support for cross-border vehicle and property move-ins.",
    icon: Truck,
  },
  {
    title: "Premium Support",
    description:
      "Dedicated account teams guide buyers and sellers through documentation and closing.",
    icon: Headphones,
  },
  {
    title: "Exclusive Insights",
    description:
      "Market intelligence, valuation tools, and private deal alerts for premium members.",
    icon: Sparkles,
  },
  {
    title: "Automotive Marketplace",
    description:
      "Curated listings and verified dealers for luxury and specialist vehicles.",
    icon: CarFront,
  },
];

const repeatedServices = [...services, ...services];

const ServicesSlider: React.FC = () => {
  return (
    <section className="px-6 py-16 bg-[#009061] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-200">
            App Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Services and features for real estate and automotive deals
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-emerald-100 sm:text-base">
            From verified property listings to certified vehicle inspections and
            logistics, TrustMarket provides end-to-end services tailored to
            high-value buyers and sellers.
          </p>
        </div>

        <div
          className="overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <AutoScrollRow items={repeatedServices} />
        </div>
      </div>

      <style>{`
        /* keep existing rounded cards layout */
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

// Helper component: auto-scrolling, draggable row that duplicates items for seamless loop
const AutoScrollRow: React.FC<{ items: typeof services }> = ({ items }) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  // Pointer handlers for dragging
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      startX.current = e.clientX;
      startScroll.current = el.scrollLeft;
      setIsPaused(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      el.scrollLeft = startScroll.current - dx;
    };

    const endDrag = () => {
      isDragging.current = false;
      setTimeout(() => setIsPaused(false), 1500);
    };

    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const touchStartHandler = () => setIsPaused(true);
    const touchEndHandler = () => setIsPaused(false);
    el.addEventListener("touchstart", touchStartHandler, { passive: true });
    el.addEventListener("touchend", touchEndHandler);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", touchStartHandler);
      el.removeEventListener("touchend", touchEndHandler);
    };
  }, []);

  // Auto-scroll loop using requestAnimationFrame
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    let rafId: number | null = null;
    const speed = 0.15; // pixels per ms
    let last = performance.now();

    const step = (now: number) => {
      const delta = now - last;
      last = now;
      if (!isPaused && !isDragging.current) {
        el.scrollLeft += speed * delta;
        // loop: when scrollLeft >= scrollWidth / 2 reset
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPaused]);

  return (
    <div
      ref={rowRef}
      className="flex gap-5 sm:gap-6 cursor-grab hide-scrollbar"
      style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
    >
      {/* render items twice for seamless scroll */}
      {[...items, ...items].map((service, index) => {
        const Icon = service.icon;
        return (
          <div
            key={`${service.title}-${index}`}
            className="min-w-[18rem] flex-shrink-0 flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-center h-14 w-14 rounded-3xl bg-[#004e27] text-white">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-950">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {service.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesSlider;
