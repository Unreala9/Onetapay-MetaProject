// src/components/UPIFeatures.tsx
import React from "react";
import {
  ArrowRight,
  CreditCard,
  RefreshCcw,
  Receipt,
  RotateCcw,
  SquareGanttChart,
  Activity,
} from "lucide-react";

type FeatureItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const items: FeatureItem[] = [
  {
    title: "Welcome customers with RuPay",
    desc: "Accept RuPay credit cards and UPI wallets to provide more payment options to customers.",
    icon: <CreditCard className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Switch seamlessly during outages",
    desc: "Smart routing ensures uninterrupted payments by redirecting to available acquirers.",
    icon: <RefreshCcw className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Empower customer payments",
    desc: "Enable counter-free payments with QR codes on invoices.",
    icon: <Receipt className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Streamline refunds easily",
    desc: "Process full and partial refunds via Pine Labs One with maker-checker validation.",
    icon: <RotateCcw className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Advanced integration with DigiQR",
    desc: "Support multi-acquiring setups with dynamic QR integration into merchant billing systems.",
    icon: <SquareGanttChart className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "UPI acquiring rails",
    desc: "Achieve real-time tracking, automated reporting and industry-leading success rates.",
    icon: <Activity className="h-5 w-5" aria-hidden="true" />,
    highlight: true,
  },
];

export default function UPIFeatures() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Heading + CTA */}
        <div className="max-w-4xl">
          <h2 className="text-3xl leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
            <span className="block">Advanced features for</span>
            <span className="block">effortless UPI payments.</span>
          </h2>

          <div className="mt-6 flex items-center md:justify-start justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
            >
              Activate UPI today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border p-5 shadow-sm transition hover:shadow-md
              bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800
              hover:bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
              hover:text-white cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition",
                    item.highlight
                      ? "bg-pink-100 text-pink-900 ring-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:ring-pink-800/60"
                      : "bg-pink-50 text-pink-800 ring-pink-100 dark:bg-pink-900/20 dark:text-pink-200 dark:ring-pink-800/40",
                  ].join(" ")}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-6">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
