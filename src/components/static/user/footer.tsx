import React from "react";
import { Home } from "lucide-react";
import {
  FaApple,
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import playStoreImg from "../../../assets/download (1).png";

const Footer: React.FC = () => {
  const popularSearchLinks = [
    { label: "Apartment for Sale", href: "#" },
    { label: "Apartment for Rent", href: "#" },
    { label: "Offices for Sale", href: "#" },
    { label: "Offices for Rent", href: "#" },
  ];

  const quickLinks = [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Pricing Plans", href: "#" },
    { label: "Our Services", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  const discoveryLinks = [
    { label: "Chicago", href: "#" },
    { label: "Los Angeles", href: "#" },
    { label: "New Jersey", href: "#" },
    { label: "New York", href: "#" },
    { label: "California", href: "#" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagramSquare, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-[#004e27] text-emerald-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="flex flex-col justify-center gap-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
                <Home size={18} className="text-black" />
              </div>
              <span className="font-bold text-[30px]">Twingle</span>
            </div>

            <div className="flex flex-wrap gap-x-16 gap-y-6">
              <div>
                <p className="mb-1 text-base text-emerald-100">
                  Total Free Customer Care
                </p>
                <p className="text-lg font-semibold md:text-xl">
                  +(088) 123 456 789
                </p>
              </div>
              <div>
                <p className="mb-1 text-base text-emerald-100">Live Support?</p>
                <p className="text-lg font-semibold md:text-xl">
                  hi@twingle.com
                </p>
              </div>
            </div>

            {/* Apps */}
            <div className="space-y-3">
              <p className="text-base font-semibold text-emerald-50">Apps</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 transition-all border rounded-lg bg-white/5 hover:bg-white/10 border-white/10"
                >
                  <div className="flex items-center justify-center rounded-md w-9 h-9 bg-white/8">
                    <FaApple size={30} className="text-white" />
                  </div>
                  <span className="flex flex-col leading-tight text-left">
                    <span className="text-xs text-emerald-100">
                      Download on the
                    </span>
                    <span className="text-base font-semibold">App Store</span>
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 transition-all border rounded-lg bg-white/5 hover:bg-white/10 border-white/10"
                >
                  <div className="flex items-center justify-center overflow-hidden rounded-md w-9 h-9 bg-white/8">
                    <img
                      src={playStoreImg}
                      alt="Google Play"
                      className="object-contain h-7"
                    />
                  </div>
                  <span className="flex flex-col leading-tight text-left">
                    <span className="text-xs text-emerald-100">Get it on</span>
                    <span className="text-base font-semibold">Google Play</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-base font-semibold text-emerald-50">
                Follow us on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center transition-colors border rounded-full w-9 h-9 border-white/15 hover:border-white/30 hover:bg-white/5"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Links */}
          <div className="flex flex-col items-start gap-8">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-emerald-50">
                  Popular Search
                </h3>
                <ul className="space-y-3">
                  {popularSearchLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base transition-colors text-emerald-100 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-emerald-50">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base transition-colors text-emerald-100 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-emerald-50">
                  Discovery
                </h3>
                <ul className="space-y-3">
                  {discoveryLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base transition-colors text-emerald-100 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
