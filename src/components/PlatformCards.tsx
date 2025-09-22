// src/components/PlatformCards.tsx
import { useEffect, useRef, useState } from "react";

type Badge = { side: "left" | "right"; icon: string; text: string };

type CardData = {
  title: string;
  img: string;
  desc: string;
  badges: Badge[];
};

const CARDS: CardData[] = [
  {
    title: "The engine behind effortless commerce.",
    img: "/Pine/swap1.png",
    desc: "A full-stack, cloud-native platform built for speed, flexibility and seamless integration.",
    badges: [
      { side: "left", icon: "🧩", text: "Plug & play APIs" },
      { side: "left", icon: "🛠️", text: "Developer console" },
      { side: "right", icon: "⚡", text: "Fast, seamless updates" },
    ],
  },
  {
    title: "Built for growth, secured for the future.",
    img: "/Pine/swap2.png",
    desc: "High uptime, reliable security and scalable architecture handling millions of transactions daily.",
    badges: [
      { side: "left", icon: "🛡️", text: "High uptime & security" },
      { side: "left", icon: "📈", text: "Scalable architecture" },
      { side: "right", icon: "📜", text: "PCI-DSS, ISO 27001" },
    ],
  },
  {
    title: "Trusted in 16+ countries, growing stronger with every connection.",
    img: "/Pine/swap3.png",
    desc: "Global footprint with strong local expertise and powerful network effects.",
    badges: [
      { side: "left", icon: "🌍", text: "16+ countries supported" },
      { side: "right", icon: "🏦", text: "Top banks & partners" },
    ],
  },
];

export default function PlatformCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + fade-in backdrop
  useEffect(() => {
    if (openIndex === null) return;
    const bodyOv = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => backdropRef.current?.classList.add("opacity-100"));
    // Focus the close button for accessibility
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.body.style.overflow = bodyOv;
    };
  }, [openIndex]);

  // Keyboard navigation (Esc to close, arrows to switch)
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? 0 : (i + 1) % CARDS.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? 0 : (i - 1 + CARDS.length) % CARDS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const goPrev = () => setOpenIndex((i) => (i === null ? 0 : (i - 1 + CARDS.length) % CARDS.length));
  const goNext = () => setOpenIndex((i) => (i === null ? 0 : (i + 1) % CARDS.length));

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Local keyframes for animations */}
      <style>{`
        @keyframes pill-in-left {
          from { opacity:0; transform: translateX(-16px) translateY(-6px) scale(0.98); }
          to { opacity:1; transform: translateX(0) translateY(0) scale(1); }
        }
        @keyframes pill-in-right {
          from { opacity:0; transform: translateX(16px) translateY(-6px) scale(0.98); }
          to { opacity:1; transform: translateX(0) translateY(0) scale(1); }
        }
        @keyframes dialog-in {
          from { opacity:0; transform: translate(-50%,-46%) scale(.96); }
          to { opacity:1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes sheet-in {
          from { transform: translateY(8%); opacity: .6; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 10px 30px rgba(0,0,0,.15); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            Choose the platform that simply works.
          </h2>
          <div className="hidden md:flex items-center gap-2">
            {CARDS.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition ${
                  openIndex === i ? "bg-pink-500" : "bg-gray-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              className="group relative text-left rounded-2xl p-1 transition will-change-transform"
              aria-label={`Open: ${c.title}`}
            >
              {/* Fancy border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/40 via-fuchsia-400/30 to-rose-500/40 opacity-0 blur-[6px] transition group-hover:opacity-100" />
              {/* Card */}
              <div
                className="
                  relative z-10 h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70
                  p-6 shadow-sm hover:shadow-lg transition
                  hover:bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                  hover:text-white
                  "
              >
                <p className="font-semibold text-gray-800 dark:text-slate-100 mb-4 group-hover:text-white">
                  {c.title}
                </p>
                <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                  <img
                    src={c.img}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    alt=""
                  />
                </div>
                {/* mini chips preview */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.badges.slice(0, 2).map((b, k) => (
                    <span
                      key={k}
                      className="
                        inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
                        bg-gray-100 text-gray-700 ring-1 ring-black/5
                        group-hover:bg-white/15 group-hover:text-white group-hover:ring-white/20
                      "
                    >
                      <span className="text-base leading-none">{b.icon}</span>
                      {b.text}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal / Focus panel */}
      {openIndex !== null && (
        <div
          ref={wrapRef}
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={CARDS[openIndex].title}
        >
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 transition-opacity"
          />

          {/* Desktop floating pills */}
          <div className="pointer-events-none hidden md:flex flex-col gap-4 absolute left-6 top-1/2 -translate-y-1/2">
            {CARDS[openIndex].badges
              .filter((b) => b.side === "left")
              .map((b, bi) => (
                <div
                  key={bi}
                  style={{
                    animation: `pill-in-left .7s cubic-bezier(.22,.61,.36,1) both`,
                    animationDelay: `${0.12 * bi}s`,
                  }}
                  className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 px-5 py-4 max-w-sm flex items-center gap-3"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-emerald-900/10 text-2xl">
                    {b.icon}
                  </span>
                  <p className="font-medium text-gray-800 dark:text-slate-100">{b.text}</p>
                </div>
              ))}
          </div>
          <div className="pointer-events-none hidden md:flex flex-col gap-4 absolute right-6 top-1/2 -translate-y-1/2">
            {CARDS[openIndex].badges
              .filter((b) => b.side === "right")
              .map((b, bi) => (
                <div
                  key={bi}
                  style={{
                    animation: `pill-in-right .7s cubic-bezier(.22,.61,.36,1) both`,
                    animationDelay: `${0.12 * bi}s`,
                  }}
                  className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 px-5 py-4 max-w-sm flex items-center gap-3"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-emerald-900/10 text-2xl">
                    {b.icon}
                  </span>
                  <p className="font-medium text-gray-800 dark:text-slate-100">{b.text}</p>
                </div>
              ))}
          </div>

          {/* Dialog card */}
          <div
            className="
              hidden md:block
              absolute left-1/2 top-1/2 w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2
              bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl
              rounded-3xl border border-white/20 dark:border-slate-700/50
              shadow-2xl overflow-hidden
            "
            style={{ animation: "dialog-in .28s ease-out both" }}
          >
            {/* Glow accent */}
            <div className="absolute -inset-0.5 rounded-[28px] pointer-events-none bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d33_0%,#ff2d5533_40%,#d7137d33_100%)]" />
            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-slate-100">
                  {CARDS[openIndex].title}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-2"
                    aria-label="Previous"
                    title="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={goNext}
                    className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-2"
                    aria-label="Next"
                    title="Next"
                  >
                    →
                  </button>
                  <button
                    ref={closeBtnRef}
                    onClick={() => setOpenIndex(null)}
                    className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-2"
                    aria-label="Close"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-black/5">
                <img
                  src={CARDS[openIndex].img}
                  alt=""
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>

              <p className="mt-6 text-gray-700 dark:text-slate-300 leading-relaxed">
                {CARDS[openIndex].desc}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setOpenIndex(i)}
                      aria-label={`Go to ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        openIndex === i ? "w-6 bg-pink-500" : "w-2.5 bg-gray-300 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                {/* CTA */}
                <a
                  href="#contact"
                  className="
                    inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                    bg-pink-500 text-white hover:bg-pink-600 transition
                    ring-1 ring-pink-400/50
                  "
                >
                  Talk to us
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile sheet */}
          <div
            className="
              md:hidden
              absolute inset-x-0 bottom-0
              rounded-t-3xl bg-white dark:bg-slate-900
              border-t border-slate-200 dark:border-slate-800
              shadow-2xl
              p-5
            "
            style={{ animation: "sheet-in .24s ease-out both" }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {CARDS[openIndex].title}
              </h3>
              <button
                onClick={() => setOpenIndex(null)}
                className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/5">
              <img src={CARDS[openIndex].img} alt="" className="w-full aspect-[16/10] object-cover" />
            </div>
            <p className="mt-4 text-gray-700 dark:text-slate-300">{CARDS[openIndex].desc}</p>

            {/* Quick badges (stacked) */}
            <div className="mt-4 grid grid-cols-1 gap-3">
              {CARDS[openIndex].badges.map((b, bi) => (
                <div
                  key={bi}
                  className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 px-4 py-3 flex items-center gap-3"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-900/10 text-xl">
                    {b.icon}
                  </span>
                  <p className="font-medium text-gray-800 dark:text-slate-100">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={goPrev}
                className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-4 py-2"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Go to ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition ${
                      openIndex === i ? "bg-pink-500" : "bg-gray-300 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="rounded-full bg-pink-500 text-white hover:bg-pink-600 px-4 py-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
