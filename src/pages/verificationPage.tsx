import React from "react";
import { Link } from "react-router-dom";
import { Building2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04281a] via-[#0d4f33] to-[#16a56f] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_52%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl text-white">
            <p className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-3 text-xs font-semibold uppercase rounded-full bg-white/10 text-emerald-200 sm:mb-4 sm:px-3 sm:py-1 sm:text-sm">
              <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" /> About Twingle
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Building smarter property journeys for buyers, sellers, and
              agents.
            </h1>
            <p className="mt-4 text-sm leading-7 text-emerald-100 sm:mt-6 sm:text-base sm:leading-8">
              Twingle blends trust, verification, and modern marketplace design
              so every transaction feels effortless whether you are browsing
              homes or listing assets.
            </p>
            <div className="flex flex-col gap-2.5 mt-8 sm:flex-row sm:items-center sm:gap-3 sm:mt-10">
              <Link
                to="/select-account"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-slate-950 bg-white rounded-full shadow-lg transition hover:bg-slate-100 sm:px-6 sm:py-3 sm:text-sm"
              >
                Get started now
              </Link>
              <Link
                to="/real-estate"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white border border-white/20 rounded-full transition hover:bg-white/10 sm:px-6 sm:py-3 sm:text-sm"
              >
                Explore listings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 sm:py-16 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Why customers trust Twingle
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">
                We merge transparency, real-time support, and verified listings
                to help people make confident choices across devices — from
                mobile searches to desktop reviews.
              </p>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {[
                {
                  title: "Verified listings",
                  description:
                    "Every property is reviewed by our team before it appears on the marketplace.",
                  icon: ShieldCheck,
                },
                {
                  title: "Fast responsiveness",
                  description:
                    "Navigation and content adapt seamlessly to any screen size.",
                  icon: Sparkles,
                },
                {
                  title: "Market insights",
                  description:
                    "Data-rich trends and trusted support keep buyers ahead of the market.",
                  icon: Building2,
                },
                {
                  title: "Trusted community",
                  description:
                    "Built for transparent connections between buyers, sellers, and agents.",
                  icon: HeartHandshake,
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="p-5 overflow-hidden transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6"
                >
                  <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <item.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 sm:mt-5 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-white sm:px-8 sm:py-16 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="p-5 space-y-3 border shadow-sm rounded-2xl border-slate-200 bg-slate-50 sm:space-y-4 sm:rounded-3xl sm:p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 sm:text-sm sm:tracking-[0.24em]">
                Our mission
              </p>
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Empower better decisions
              </h3>
              <p className="text-xs leading-7 text-slate-600 sm:text-sm">
                We help people discover, compare, and connect with confidence in
                every property journey.
              </p>
            </div>
            <div className="p-5 space-y-3 border shadow-sm rounded-2xl border-slate-200 bg-slate-50 sm:space-y-4 sm:rounded-3xl sm:p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 sm:text-sm sm:tracking-[0.24em]">
                Our values
              </p>
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Trust, speed, clarity
              </h3>
              <p className="text-xs leading-7 text-slate-600 sm:text-sm">
                Clean design, fast navigation, and honest information make every
                visit feel effortless.
              </p>
            </div>
            <div className="p-5 space-y-3 border shadow-sm rounded-2xl border-slate-200 bg-slate-50 sm:space-y-4 sm:rounded-3xl sm:p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 sm:text-sm sm:tracking-[0.24em]">
                Our promise
              </p>
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Responsiveness first
              </h3>
              <p className="text-xs leading-7 text-slate-600 sm:text-sm">
                We build interfaces that scale beautifully from phones to large
                displays without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0f3f26] to-[#11694b] px-6 py-12 text-white sm:px-8 sm:py-16 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 sm:text-sm sm:tracking-[0.32em]">
            Ready for the Twingle experience?
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:mt-4 sm:text-3xl lg:text-4xl">
            A smarter place to discover and sell property.
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-sm leading-7 text-emerald-100 sm:mt-5 sm:text-base sm:leading-8">
            Start on the home page or choose your account type now to begin
            exploring trusted listings.
          </p>
          <div className="flex flex-col gap-2.5 mt-8 justify-center sm:flex-row sm:gap-3 sm:mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-slate-100 sm:px-6 sm:py-3 sm:text-sm"
            >
              Visit home
            </Link>
            <Link
              to="/select-account"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
            >
              Choose account type
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
