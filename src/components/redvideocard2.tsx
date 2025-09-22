// components/SecuritySection.tsx
"use client";
import {
  ShieldCheck,
  Lock,
  Globe2,
  KeySquare,
  MapPin,
  Cpu,
} from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="relative overflow-hidden text-white bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]">
      {/* subtle vignette for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        {/* Heading + CTA */}
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Features All-in-one
            <br className="hidden sm:block" />
            <span className="block">Simple. Smart.</span>
          </h2>

          <div className="mt-6">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:translate-y-[-1px] hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              type="button"
            >
              <ShieldCheck className="h-4 w-4" />
              Schedule a demo call
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12">
          {/* Large card */}
          <FeatureCard className="md:col-span-12 lg:col-span-12 xl:col-span-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Illustration placeholder */}
              <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-tr from-white/5 to-white/0 ring-1 ring-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid place-items-center rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
                    <Lock className="h-10 w-10 text-emerald-300" />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wider text-white/80">
                  End-to-end encryption
                </h3>
                <p className="mt-2 max-w-prose text-xl leading-relaxed text-white/70">
                  Launch your own online courses, engage your audience, and
                  monetize your expertise—all in one place.
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Bottom three cards */}
          <FeatureCard className="md:col-span-12 lg:col-span-4">
            <IconBadge>
              <Cpu className="h-4 w-4" />
            </IconBadge>
            <h4 className="mt-3 text-sm font-semibold text-white/90">
              Save Money
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              No need to pay for multiple subscriptions—save money, simplify
              life, enjoy everything in one affordable plan with complete
              convenience.
            </p>

            <div className="mt-4 h-28 rounded-xl bg-white/5 ring-1 ring-white/10" />
          </FeatureCard>

          <FeatureCard className="md:col-span-12 lg:col-span-4">
            <IconBadge>
              <KeySquare className="h-4 w-4" />
            </IconBadge>
            <h4 className="mt-3 text-sm font-semibold text-white/90">
              Sync Data
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Automatically sync data across tools for better insights,
              streamline workflows, eliminate silos, improve decision-making,
              and unlock smarter, faster business growth.
            </p>

            <div className="mt-4 h-28 rounded-xl bg-white/5 ring-1 ring-white/10" />
          </FeatureCard>

          <FeatureCard className="md:col-span-12 lg:col-span-4">
            <IconBadge>
              <Globe2 className="h-4 w-4" />
            </IconBadge>
            <h4 className="mt-3 text-sm font-semibold text-white/90">
              Geolocation tracking
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Adds an additional layer of security by monitoring transaction
              locations.
            </p>

            <div className="mt-4 flex h-28 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <MapPin className="h-5 w-5 text-sky-300" />
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

/* --- Small UI bits --- */
function FeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white/90 shadow-inner backdrop-blur">
      {children}
    </span>
  );
}
