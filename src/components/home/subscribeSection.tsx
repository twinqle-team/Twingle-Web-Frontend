import React from "react";

const SubscribeSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 sm:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] p-6 sm:p-10 md:p-12 bg-[#f1f2ff]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
            Stay Ahead of the Market
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:mt-4 sm:text-base">
            Receive exclusive access to off-market listings and deep market
            intelligence reports reserved for our premium members.
          </p>
        </div>

        <form className="flex flex-col items-center gap-3 mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <label htmlFor="subscribe-email" className="sr-only">
            Your executive email
          </label>
          <input
            id="subscribe-email"
            type="email"
            placeholder="Your executive email"
            className="w-full max-w-xl px-4 py-3.5 text-sm transition bg-white border shadow-sm outline-none rounded-2xl border-slate-300 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:text-base"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-8 text-sm font-semibold text-white transition h-12 rounded-2xl bg-[#004e27] hover:bg-[#004e27] focus:outline-none focus:ring-4 focus:ring-[#004e27]/20 sm:w-auto sm:text-base"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
