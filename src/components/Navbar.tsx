"use client";
import React, { useEffect, useState } from "react";




export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock scroll when drawer open
  useEffect(() => {
    const b = document.body;
    const h = document.documentElement;
    const prevOverflow = b.style.overflow;
    const prevOverX = b.style.overflowX;
    const prevHtmlOverX = h.style.overflowX;
    const prevOverscroll = b.style.overscrollBehavior;

    if (open) {
      b.style.overflow = "hidden";
      b.style.overflowX = "hidden";
      h.style.overflowX = "hidden";
      b.style.overscrollBehavior = "contain";
    } else {
      b.style.overflow = prevOverflow || "";
      b.style.overflowX = prevOverX || "";
      h.style.overflowX = prevHtmlOverX || "";
      b.style.overscrollBehavior = prevOverscroll || "";
    }

    return () => {
      b.style.overflow = prevOverflow;
      b.style.overflowX = prevOverX;
      h.style.overflowX = prevHtmlOverX;
      b.style.overscrollBehavior = prevOverscroll;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-neutral-200/60">
        <div className="mx-auto max-w-[120rem] px-6 lg:px-10">
          <div className="h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img
                src="/Pine/logo.png"
                alt="Company logo"
                className="h-7 w-auto"
                loading="eager"
              />
            </a>


            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/auth"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-extrabold text-white shadow-sm border border-black/5
                           bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                           hover:brightness-110"
              >
                Get started
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#1F2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE LAYER OUTSIDE HEADER (fixes clipping/overflow issues) */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
        id="mobile-menu"
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />

        {/* Drawer */}
        <nav
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl border-l border-neutral-200
                      transition-transform duration-300 ease-out
                      ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/60">
            <a href="#" onClick={close} className="flex items-center gap-3">
              <img
                src="/Pine/logo.png"
                alt="Company logo"
                className="h-7 w-auto"
              />
            </a>
            <button
              onClick={close}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="#1F2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>


          <div className="px-5 pt-2 mt-auto">
            <a
              href="/auth"
              onClick={close}
              className="block text-center rounded-full px-4 py-3 text-[16px] font-extrabold text-white shadow-sm border border-black/5
                         bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                         hover:brightness-110"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
