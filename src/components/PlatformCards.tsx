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

  useEffect(() => {
    if (openIndex === null) return;
    const bodyOv = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() =>
      backdropRef.current?.classList.add("opacity-100")
    );
    return () => {
      document.body.style.overflow = bodyOv;
    };
  }, [openIndex]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12">
          Choose the platform that simply works.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              className="text-left bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
            >
              <p className="font-semibold text-gray-800 mb-4">{c.title}</p>
              <img src={c.img} className="rounded-xl" alt="" />
            </button>
          ))}
        </div>
      </div>

      {/* Focus panel */}
      {openIndex !== null && (
        <div ref={wrapRef} className="fixed inset-0 z-50">
          <div
            ref={backdropRef}
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 transition-opacity"
          />
          <div className="pointer-events-none hidden md:flex flex-col gap-6 absolute left-6 top-1/2 -translate-y-1/2">
            {CARDS[openIndex].badges
              .filter((b) => b.side === "left")
              .map((b, bi) => (
                <div
                  key={bi}
                  className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-5 py-4 max-w-sm flex items-center gap-3 animate-[pill-in-left_.8s_cubic-bezier(.22,.61,.36,1)_both]"
                  style={{ animationDelay: `${0.15 * bi}s` }}
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-emerald-900/10 text-2xl">
                    {b.icon}
                  </span>
                  <p className="font-medium text-gray-800">{b.text}</p>
                </div>
              ))}
          </div>
          <div className="pointer-events-none hidden md:flex flex-col gap-6 absolute right-6 top-1/2 -translate-y-1/2">
            {CARDS[openIndex].badges
              .filter((b) => b.side === "right")
              .map((b, bi) => (
                <div
                  key={bi}
                  className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 px-5 py-4 max-w-sm flex items-center gap-3 animate-[pill-in-right_.8s_cubic-bezier(.22,.61,.36,1)_both]"
                  style={{ animationDelay: `${0.15 * bi}s` }}
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-emerald-900/10 text-2xl">
                    {b.icon}
                  </span>
                  <p className="font-medium text-gray-800">{b.text}</p>
                </div>
              ))}
          </div>
          <div className="absolute left-1/2 top-1/2 w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl overflow-hidden opacity-100">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {CARDS[openIndex].title}
                </h3>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 p-2"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-black/5">
                <img
                  src={CARDS[openIndex].img}
                  alt=""
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <p className="mt-6 text-gray-600">{CARDS[openIndex].desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
