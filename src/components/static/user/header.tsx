import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import LOGO_URL from "@/assets/Container.png"; // Using direct URL for logo for better performance

type SearchOption = {
  label: string;
  path: string;
  category: string;
  keywords: string[];
};

const searchOptions: SearchOption[] = [
  {
    label: "Home",
    path: "/",
    category: "Main page",
    keywords: ["home", "start", "welcome"],
  },
  {
    label: "Real Estate",
    path: "/real-estate",
    category: "Property listings",
    keywords: ["real estate", "property", "house", "home"],
  },
  {
    label: "Automotive",
    path: "/automotive",
    category: "Car listings",
    keywords: ["automotive", "car", "vehicle", "cars", "auto"],
  },
  {
    label: "Estate Agents",
    path: "/listings/agent",
    category: "Find agents",
    keywords: ["agent", "estate agent", "realtor", "property agent"],
  },
  {
    label: "Car Vendors",
    path: "/listings/vendor",
    category: "Find vendors",
    keywords: ["vendor", "car vendor", "dealer", "seller"],
  },
  {
    label: "About",
    path: "/about",
    category: "About Twingle",
    keywords: ["about", "company", "contact", "story"],
  },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const isLoggedIn = Boolean(user);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Real Estate", path: "/real-estate" },
    { label: "Automotive", path: "/automotive" },
    { label: "About", path: "/about" },
  ];

  const routePreloads: Record<string, () => Promise<unknown>> = {
    "/": () => import("@/pages/homePage"),
    "/real-estate": () => import("@/pages/realEstatePage"),
    "/automotive": () => import("@/pages/automotivePage"),
    "/about": () => import("@/pages/verificationPage"),
  };

  const preloadRoute = (path: string) => {
    routePreloads[path]?.();
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) return searchOptions;

    return searchOptions.filter((option) => {
      const haystack =
        `${option.label} ${option.category} ${option.keywords.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const suggestedMatches = useMemo(() => {
    if (!normalizedQuery || filteredOptions.length > 0) return [];

    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

    return searchOptions
      .filter((option) => {
        const haystack =
          `${option.label} ${option.category} ${option.keywords.join(" ")}`.toLowerCase();
        return queryWords.some((word) => haystack.includes(word));
      })
      .slice(0, 3);
  }, [filteredOptions.length, normalizedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setIsSearchOpen(false);
      return;
    }

    const exactMatch = searchOptions.find((option) => {
      const candidate =
        `${option.label} ${option.category} ${option.keywords.join(" ")}`.toLowerCase();
      return candidate.includes(normalizedQuery);
    });

    const targetPath = exactMatch?.path || filteredOptions[0]?.path || "/";
    navigate(targetPath);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const selectSuggestion = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const nextFocus = e.relatedTarget as Node | null;
    if (!nextFocus || !e.currentTarget.contains(nextFocus)) {
      setIsSearchOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 bg-white border border-gray-300"
    >
      <div className="px-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:justify-around">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={LOGO_URL}
                alt="Twingle Logo"
                className="w-auto h-8 transition-opacity sm:h-10 md:h-14 lg:h-20 group-hover:opacity-80"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            variants={itemVariants}
            className="items-center justify-center flex-1 hidden gap-4 md:flex lg:gap-6 xl:gap-10"
          >
            {navItems.map((item) => {
              const isActive = location?.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  prefetch="intent"
                  onMouseEnter={() => preloadRoute(item.path)}
                  className={`transition-colors font-medium text-[11px] sm:text-sm md:text-[13px] lg:text-base pb-2 hover:text-[#33a078] ${
                    isActive
                      ? "border-b-4 border-[#33a078] text-black"
                      : "border-b-4 border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>

          {/* Right side Actions */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1 sm:gap-2 md:gap-3"
          >
            {/* Search */}
            <div className="relative" onBlur={handleBlur}>
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2 rounded-lg border border-[#33a078] bg-white px-2 py-1.5 sm:px-3"
                >
                  <Search size={18} className="text-black" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    autoFocus
                    className="w-24 text-sm text-black placeholder-gray-400 bg-transparent focus:outline-none sm:w-32 md:w-36 lg:w-48"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} className="text-[#33a078]" />
                  <span className="hidden text-sm font-medium text-black md:inline hover:text-[#33a078]">
                    Search
                  </span>
                </button>
              )}

              {isSearchOpen && (
                <div className="absolute left-0 right-0 top-full z-[60] mt-2 w-[min(92vw,320px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {normalizedQuery ? (
                    filteredOptions.length > 0 ? (
                      <div className="space-y-1">
                        {filteredOptions.slice(0, 5).map((option) => (
                          <button
                            key={option.path}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectSuggestion(option.path)}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left transition rounded-xl text-slate-700 hover:bg-slate-50"
                          >
                            <span>
                              <span className="font-medium text-slate-900">
                                {option.label}
                              </span>
                              <span className="ml-2 text-slate-500">
                                {option.category}
                              </span>
                            </span>
                            <Search size={14} className="text-slate-400" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <Sparkles size={14} className="text-[#33a078]" />
                          Search not found
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          Did you mean:
                        </p>
                        {suggestedMatches.length > 0 ? (
                          <div className="mt-2 space-y-1">
                            {suggestedMatches.map((option) => (
                              <button
                                key={option.path}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => selectSuggestion(option.path)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm text-left transition rounded-xl text-slate-700 hover:bg-slate-50"
                              >
                                <span>
                                  <span className="font-medium text-slate-900">
                                    {option.label}
                                  </span>
                                  <span className="ml-2 text-slate-500">
                                    {option.category}
                                  </span>
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            Try searching for “estate”, “car”, “real estate”, or
                            “about”.
                          </p>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="space-y-1">
                      {searchOptions.map((option) => (
                        <button
                          key={option.path}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => selectSuggestion(option.path)}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm text-left transition rounded-xl text-slate-700 hover:bg-slate-50"
                        >
                          <span>
                            <span className="font-medium text-slate-900">
                              {option.label}
                            </span>
                            <span className="ml-2 text-slate-500">
                              {option.category}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile or Get Started */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hidden ml-4 transition-colors sm:block"
                aria-label="User Profile"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#33a078]"
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#004e27] text-white font-semibold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </Link>
            ) : (
              <Link
                to="/select-account"
                className="hidden rounded-lg bg-[#004e27] px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold-500 hover:text-slate-900 sm:block mr-4"
              >
                Get Started
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors rounded-lg md:hidden hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-[#004e27]" />
              ) : (
                <Menu size={20} className="text-gray-300" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="py-4 bg-white border-t border-gray-200 md:hidden"
          >
            <nav className="flex flex-col gap-3 px-4">
              {navItems.map((item) => {
                const isActive = location?.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    prefetch="intent"
                    onMouseEnter={() => preloadRoute(item.path)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? "text-[#33a078] border-l-4 border-[#33a078] bg-[#f0f9f5]"
                        : "text-black hover:text-[#33a078] hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 font-medium text-black transition-colors rounded-lg hover:text-[#33a078] hover:bg-gray-100"
                >
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#33a078]"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#004e27] text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  Profile
                </Link>
              ) : (
                <Link
                  to="/select-account"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 font-medium text-black transition-colors rounded-lg hover:text-[#33a078] hover:bg-gray-100"
                >
                  Get Started
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
