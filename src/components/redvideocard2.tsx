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
    <section className="relative overflow-hidden text-white md:mx-24 mx-6">
      {/* ===== Light Aurora + Gradient BG ===== */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        {/* soft base gradient (lighter tones) */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] opacity-90" />

        {/* subtle grid overlay */}
        <div className="absolute inset-0 rounded-2xl [mask-image:radial-gradient(80%_60%_at_50%_40%,black,transparent)] bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />

        {/* floating aurora blobs (very light) */}
        <div className="absolute -top-16 -left-10 h-64 w-64 rounded-full bg-pink-200 blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-rose-200 blur-3xl opacity-40 animate-pulse [animation-duration:3.5s]" />
      </div>

      {/* ===== Container ===== */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-4 py-10 lg:py-14">
        {/* Heading */}
        <div className="max-w-2xl text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
            Features All-in-one
            <br className="hidden sm:block" />
            <span className="block text-white/90">Simple. Smart.</span>
          </h2>

          <div className="mt-5 flex items-center md:justify-start justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg ring-1 ring-white/60 transition-all hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            >
              <ShieldCheck className="h-4 w-4" />
              Schedule a demo call
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          {/* TOP: Large card */}
          <FeatureCard className="md:col-span-12">
            <div className="grid items-center gap-6 md:grid-cols-2">
              {/* Illustration */}
              <div className="flex justify-center md:justify-start">
                <div className="flex h-40 w-full max-w-md items-center justify-center rounded-xl ring-1 ring-black/30 bg-black/10">
                  <div className="rounded-xl border border-white/30 bg-black/20 p-4 ">
                    <Lock className="h-9 w-9 text-emerald-500 drop-shadow" />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="text-left">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/85">
                  End-to-end encryption
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/80 max-w-prose">
                  Launch your online courses, engage your audience, and monetize
                  your expertise—sab kuch ek hi jagah par. Secure by default,
                  scalable by design.
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* BOTTOM: Three equal-height cards */}
          <div className="md:col-span-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard className="h-full">
              <CardHeader
                icon={<Cpu className="h-4 w-4" />}
                title="Save Money"
              />
              <p className="mt-2 text-[13px] leading-relaxed text-white/80 line-clamp-3">
                Multiple subscriptions ki zaroorat nahi—ek affordable plan me
                sab milta hai. Less juggling, more doing.
              </p>
              <div className="mt-4 flex h-16 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/30" />
            </FeatureCard>

            <FeatureCard className="h-full">
              <CardHeader
                icon={<KeySquare className="h-4 w-4" />}
                title="Sync Data"
              />
              <p className="mt-2 text-[13px] leading-relaxed text-white/80 line-clamp-3">
                Tools ke beech auto-sync for better insights & streamlined
                workflows. Data hamesha updated, hamesha ready.
              </p>
              <div className="mt-4 flex h-16 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/30" />
            </FeatureCard>

            <FeatureCard className="h-full">
              <CardHeader
                icon={<Globe2 className="h-4 w-4" />}
                title="Geolocation tracking"
              />
              <p className="mt-2 text-[13px] leading-relaxed text-white/80 line-clamp-3">
                Transaction locations monitor karke extra security layer—smarter
                fraud detection, safer ops.
              </p>
              <div className="mt-4 flex h-16 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/30">
                <MapPin className="h-4 w-4 text-sky-600" />
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Reusable Bits ================= */
function FeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      {/* gradient border wrapper (very light) */}
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.55),rgba(255,255,255,0.15))] opacity-60" />
      <div className="relative flex flex-col justify-between rounded-2xl border border-white/40 bg-white/15 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_22px_60px_rgba(0,0,0,0.20)]">
        {children}
      </div>
    </div>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/30 p-1.5 text-white/90 shadow-inner backdrop-blur">
        {icon}
      </span>
      <h4 className="text-[15px] font-semibold text-white drop-shadow">
        {title}
      </h4>
    </div>
  );
}
