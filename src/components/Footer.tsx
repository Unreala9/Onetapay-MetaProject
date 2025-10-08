"use client";
import React from "react";
import {
  BookOpen,
  Layers,
  Building,
  Scale,
  ShieldCheck,
} from "lucide-react";

type Col = {
  heading: string;
  icon: React.ReactNode;
  items: { label: string; href: string }[];
};

const COLS: Col[] = [
  {
    heading: "Documentation",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    items: [
      { label: "Getting Started", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "SDKs & Plugins", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    heading: "Resources",
    icon: <Layers className="h-4 w-4 mr-2" />,
    items: [
      { label: "Customers", href: "#" },
      { label: "Merchant Stories", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Templates", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    heading: "Company",
    icon: <Building className="h-4 w-4 mr-2" />,
    items: [
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Security", href: "#" },
      { label: "Product Roadmap", href: "#" },
    ],
  },
  {
    heading: "Legal",
    icon: <Scale className="h-4 w-4 mr-2" />,
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund & Cancellation", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-neutral-100 border-t border-white/10 bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        {/* top: brand + badge */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2.5 shadow/20 shadow-black/30">
              <img src="/Pine/logo.png" alt="Onetapay" className="h-8 w-auto" />
            </div>
            <div>
              <p className="text-sm text-white/80">
                Unified Payments for Modern Businesses
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm">PCI DSS Level 1 Compliant</span>
          </div>
        </div>

        {/* glassy panel */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.35)]">
          {/* links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10">
            {COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="flex items-center text-[12px] uppercase tracking-[0.18em] font-semibold text-white/90 mb-4">
                  {col.icon}
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className="group inline-flex items-center text-[15px] text-white/85 hover:text-white transition-colors
                                   relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white/70
                                   group-hover:after:w-full after:transition-all after:duration-300"
                      >
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* bottom row */}
          <div className="border-t border-white/15 px-6 sm:px-8 lg:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* socials (Remix Icons) */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-twitter-x-fill text-[18px]" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-instagram-line text-[18px]" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-whatsapp-line text-[18px]" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-linkedin-fill text-[18px]" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-telegram-line text-[18px]" />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="ri-discord-line text-[18px]" />
              </a>
            </div>

            {/* status + copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className="inline-flex items-center rounded-full bg-emerald-400/15 text-emerald-200 px-3 py-1 text-sm ring-1 ring-emerald-300/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                All systems normal
              </span>
              <p className="text-sm text-white/85">© {year} Onetapay, Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
