import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

type Badge = { icon: string; text: string };

type Card = {
  title: string;
  desc: string;
  img: string;
  badges: Badge[];
};

const CARDS: Card[] = [
  {
    title: "Built for growth, secured for the future.",
    img: "/Pine/swap2.png",
    desc: "High uptime, reliable security and scalable architecture handling millions of transactions daily.",
    badges: [
      { icon: "🛡️", text: "High uptime & security" },
      { icon: "📈", text: "Scalable architecture" },
      { icon: "📜", text: "PCI-DSS, ISO 27001" },
    ],
  },
  {
    title: "Trusted in 16+ countries, growing stronger with every connection.",
    img: "/Pine/swap3.png",
    desc: "Global footprint with strong local expertise and powerful network effects.",
    badges: [
      { icon: "🌍", text: "16+ countries supported" },
      { icon: "🏦", text: "Top banks & partners" },
    ],
  },
  {
    title: "The engine behind effortless commerce.",
    img: "/Pine/swap1.png",
    desc: "A full-stack, cloud-native platform built for speed, flexibility and seamless integration.",
    badges: [
      { icon: "🧩", text: "Plug & play APIs" },
      { icon: "🛠️", text: "Developer console" },
      { icon: "⚡", text: "Fast, seamless updates" },
    ],
  },
];

export default function PlatformCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // FIX: cleanup must return void, not a string. Also cancel RAF.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    let raf = 0;

    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
      raf = requestAnimationFrame(() => {
        backdropRef.current?.classList.add("opacity-100");
      });
    } else {
      backdropRef.current?.classList.remove("opacity-100");
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow; // return void
    };
  }, [openIndex]);

  const goPrev = () =>
    setOpenIndex((i) =>
      i === null ? 0 : (i - 1 + CARDS.length) % CARDS.length
    );
  const goNext = () =>
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % CARDS.length));

  return (
    <section className="relative w-full bg-[#f9fafb] dark:bg-slate-950 py-24 overflow-hidden">
      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl w-[600px] h-[400px] rounded-full bg-pink-300/25 dark:bg-pink-400/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-20">
          Choose the platform <br className="block md:hidden" />
          that simply works.
        </h2>

        {/* floating cards */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          {CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              className={`relative w-full max-w-sm transition-all duration-500 ease-out
              ${
                i === 1
                  ? "md:scale-105 md:-translate-y-6 md:z-20"
                  : "md:scale-95 md:z-10"
              }
              bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]
              border border-gray-200/70 dark:border-slate-800/50 overflow-hidden hover:scale-105 hover:-translate-y-8`}
            >
              <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-pink-300 hover:bg-pink-400 text-slate-900 transition">
                <ChevronUp size={18} />
              </div>

              <div className="overflow-hidden rounded-2xl m-5 shadow-inner">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="px-6 pb-8 text-left">
                <h3 className="text-[1.05rem] md:text-lg font-semibold text-slate-900 dark:text-white">
                  {c.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {openIndex !== null && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity"
          />

          {/* modal content */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200/70 dark:border-slate-800 p-6 md:p-8 overflow-hidden animate-[fadeIn_.3s_ease-out]">
            <div className="flex items-start justify-between mb-5">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white max-w-lg">
                {CARDS[openIndex].title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={goPrev}
                  className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 text-lg"
                >
                  ←
                </button>
                <button
                  onClick={goNext}
                  className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 text-lg"
                >
                  →
                </button>
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpenIndex(null)}
                  className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 mb-6">
              <img
                src={CARDS[openIndex].img}
                alt={CARDS[openIndex].title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {CARDS[openIndex].desc}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {CARDS[openIndex].badges.map((b, bi) => (
                <div
                  key={bi}
                  className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-3"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-900/10 text-xl">
                    {b.icon}
                  </span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
