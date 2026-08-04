import React, { useState } from "react";
import LOGO_URL from "@/assets/Container.png";
import SliderModule from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Slider = (SliderModule as any).default || SliderModule;

const Sliding: React.FC = () => {
  const [slides] = useState([
    {
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      title: "Find Your Dream Home",
      subtitle:
        "Discover modern, luxurious properties designed for your perfect lifestyle",
    },
    {
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      title: "Premium Properties & Vehicles",
      subtitle:
        "Exclusive listings of luxury homes and premium vehicles, all in one place",
    },
    {
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      title: "Live the Luxury Life",
      subtitle:
        "Where exceptional spaces meet extraordinary drives — your dream lifestyle awaits",
    },
  ]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: true,
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Link to="/" className="absolute z-20 top-4 left-4 group">
        <img
          src={LOGO_URL}
          alt="Twingle Logo"
          className="w-auto h-8 transition-opacity sm:h-10 md:h-14 lg:h-20 group-hover:opacity-80"
        />
      </Link>
      <Slider {...settings} className="h-screen">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />

            {/* Overlay for the slide */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white md:px-12 lg:px-24">
              <div className="max-w-4xl mx-auto">
                <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-100 md:text-xl lg:text-2xl drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliding;
