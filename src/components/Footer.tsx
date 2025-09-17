"use client";
import React, { useState } from "react";

type Col = { heading: string; items: string[] };

const DESK_COLS: Col[] = [
  {
    heading: "SOLUTIONS",
    items: [
      "Fleet Management",
      "T3 Dash Cams",
      "Safety & Accountability",
      "Service & Maintenance",
      "T3 Mobile App",
      "Compliance & Reporting",
      "Security & Theft Prevention",
    ],
  },
  {
    heading: "INDUSTRIES",
    items: ["Industries & Roles", "Real World Successes"],
  },
  {
    heading: "SUPPORT",
    items: ["Onboarding Guide", "Customer Support", "T3 Help Center", "FAQs"],
  },
  {
    heading: "COMPANY",
    items: ["Privacy Policy", "Terms of Service", "Careers", "Product Updates"],
  },
];

const MobileSection: React.FC<Col> = ({ heading, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200/60">
      <button
        className="w-full flex items-center justify-between py-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`sec-${heading}`}
      >
        <span className="text-[13px] tracking-[0.12em] font-semibold text-neutral-800">
          {heading}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <ul
        id={`sec-${heading}`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((it) => (
          <li key={it}>
            <a
              href="#"
              className="block py-2 text-[15px] text-neutral-700 hover:text-neutral-900"
            >
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* ===== Top brand band ===== */}
      <section className="relative text-white bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]">
        {/* subtle dots */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-24 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:10px_10px]" />
          <div className="absolute left-0 bottom-[-32px] h-40 w-full opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:12px_12px]" />
          <div className="absolute left-8 bottom-0 h-56 w-24 opacity-[0.09] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:12px_12px] rounded-sm" />
          <div className="absolute left-44 bottom-10 h-28 w-16 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:12px_12px] rounded-sm" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* 1 col on mobile, 2 cols on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            {/* Left: logo + badges (stack → row) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-full shadow">
                  <a href="#" className="block">
                    <img
                      src="/Pine/logo.png"
                      alt="Onetapay"
                      className="h-9 sm:h-10 w-auto"
                      loading="eager"
                    />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#" aria-label="Download on the App Store">
                  <img
                    src="/Pine/appstore-badge.svg"
                    alt="App Store"
                    className="h-9 sm:h-10 w-auto"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
                    }}
                  />
                </a>
                <a href="#" aria-label="Get it on Google Play">
                  <img
                    src="/Pine/googleplay-badge.png"
                    alt="Google Play"
                    className="h-9 sm:h-10 w-auto"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
                    }}
                  />
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ===== Overlay panel (links) ===== */}
      <section className="relative mt-8 sm:mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* pull up on large screens */}
          <div className="-mt-6 lg:-mt-12" />
          <div className="rounded-2xl md:rounded-3xl bg-[#faf8f7] text-neutral-900 shadow-[0_20px_60px_rgba(0,0,0.18,0.18)] ring-1 ring-black/5 overflow-hidden">
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 px-6 md:px-8 lg:px-10 py-8 lg:py-12">
              {DESK_COLS.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-[12px] tracking-[0.14em] font-semibold text-neutral-800">
                    {col.heading}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="text-[15px] text-neutral-700 hover:text-neutral-900"
                        >
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile accordions */}
            <div className="md:hidden px-4 py-2">
              {DESK_COLS.map((col) => (
                <MobileSection
                  key={col.heading}
                  heading={col.heading}
                  items={col.items}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-6 lg:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-neutral-700">
              <a href="#" className="hover:text-neutral-900">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neutral-900">
                Terms of Service
              </a>
              <a href="#" className="hover:text-neutral-900">
                Careers
              </a>
              <a href="#" className="hover:text-neutral-900">
                Product Updates
              </a>
            </nav>
            <p className="text-sm text-neutral-600">
              © {year} Onetapay. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
