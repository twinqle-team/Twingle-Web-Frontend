import React from "react";
import { Link } from "react-router-dom";
import { Building2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04281a] via-[#0d4f33] to-[#16a56f] px-6 py-20 sm:px-8 lg:px-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_52%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl text-white">
            <p className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-semibold uppercase rounded-full bg-white/10 text-emerald-200">
              <Sparkles size={18} /> About Twingle
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Building smarter property journeys for buyers, sellers, and
              agents.
            </h1>
            <p className="mt-6 text-base leading-8 text-emerald-100 sm:text-lg">
              Twingle blends trust, verification, and modern marketplace design
              so every transaction feels effortless whether you are browsing
              homes or listing assets.
            </p>
            <div className="flex flex-col gap-3 mt-10 sm:flex-row sm:items-center">
              <Link
                to="/select-account"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-950 bg-white rounded-full shadow-lg transition hover:bg-slate-100"
              >
                Get started now
              </Link>
              <Link
                to="/real-estate"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-full transition hover:bg-white/10"
              >
                Explore listings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Why customers trust Twingle
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                We merge transparency, real-time support, and verified listings
                to help people make confident choices across devices — from
                mobile searches to desktop reviews.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Our mission
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Empower better decisions
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                We help people discover, compare, and connect with confidence in
                every property journey.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Our values
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Trust, speed, clarity
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                Clean design, fast navigation, and honest information make every
                visit feel effortless.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Our promise
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Responsiveness first
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                We build interfaces that scale beautifully from phones to large
                displays without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0f3f26] to-[#11694b] px-6 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-200">
            Ready for the Twingle experience?
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            A smarter place to discover and sell property.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
            Start on the home page or choose your account type now to begin
            exploring trusted listings.
          </p>
          <div className="mt-10 flex flex-col gap-3 justify-center sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Visit home
            </Link>
            <Link
              to="/select-account"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
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
