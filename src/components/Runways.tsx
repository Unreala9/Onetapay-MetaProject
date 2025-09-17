import { useEffect, useRef } from "react";


type Item = {
  text: string;
  img?: string;
  variant?: "light" | "dark";
  minWidth?: number;
};

const ITEMS: Item[] = [
  {
    text: "Grow revenue with embedded bill payments",
    img: "/Pine/c1.webp",
    variant: "dark",
    minWidth: 520,
  },
  {
    text: "Manage Corporate Expenses",
    img: "/Pine/c2.webp",
    variant: "dark",
    minWidth: 460,
  },
  {
    text: "Drive efficiency through billing integrations",
    img: "/Pine/c3.webp",
    variant: "dark",
    minWidth: 520,
  },
  {
    text: "Acquire new customers",
    img: "/Pine/c4.webp",
    variant: "dark",
    minWidth: 500,
  },
  {
    text: "Deliver refunds and vouchers to customers",
    img: "/Pine/c5.webp",
    variant: "dark",
    minWidth: 520,
  },
  {
    text: "Enhance employee rewards",
    img: "/Pine/c6.webp",
    variant: "dark",
    minWidth: 480,
  },
  {
    text: "Automate vendor payouts",
    img: "/Pine/c7.webp",
    variant: "dark",
    minWidth: 460,
  },
  {
    text: "Scale credit & financing",
    img: "/Pine/c5.webp",
    variant: "dark",
    minWidth: 500,
  },
];

export default function Runways() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // ===== Desktop animation (unchanged) =====
  useEffect(() => {
    const svg = svgRef.current,
      path = pathRef.current,
      rail = railRef.current,
      stage = stageRef.current;
    if (!svg || !path || !rail || !stage) return;

    const nodes = Array.from(rail.querySelectorAll<HTMLLIElement>("li"));
    const VBX = 600,
      VBY = 760;
    const L = path.getTotalLength();
    let sx = 1,
      sy = 1;

    nodes.forEach((li, i) => {
      li.dataset.offset = String(i / nodes.length);
      li.style.willChange = "transform";
    });

    const recalcScale = () => {
      const r = svg.getBoundingClientRect();
      sx = r.width / VBX;
      sy = r.height / VBY;
    };
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    ro.observe(svg);

    let paused = false;
    const CYCLE_SEC = 18;
    let start = performance.now();
    let frameId = 0;

    const frame = (now: number) => {
      if (!paused) {
        const t = (now - start) / 1000;
        for (const li of nodes) {
          const base = parseFloat(li.dataset.offset || "0");
          const p = (t / CYCLE_SEC + base) % 1;
          const pt = path.getPointAtLength(p * L);
          li.style.transform = `translate(${pt.x * sx}px, ${
            pt.y * sy
          }px) translate(-50%, -50%)`;

          const w = 1 - Math.abs(0.5 - p) * 2;
          const card = li.firstElementChild as HTMLElement | null;
          if (card) {
            card.style.opacity = String(0.55 + 0.45 * w);
            card.style.transform = `scale(${1 + 0.05 * w})`;
            card.style.filter = `drop-shadow(0 18px 28px rgba(0,0,0,${
              0.1 + 0.18 * w
            }))`;
          }
        }
      }
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    const onVis = () => (paused = document.hidden || paused);

    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(frameId);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden my-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT copy */}
          <div className="">
            <div className="lg:sticky lg:top-12 self-start">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-[#272b2e]">
                Beyond payments,turning
                <br className="hidden sm:block" />
               roadblocks into runways.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600">
                Run lean, maximise growth and move fast, because payments are
                just the start.
              </p>
            </div>

          </div>

          {/* ===== RIGHT: Desktop animated rail ===== */}
          <div className="relative -mt-[100px]">
            <div
              ref={stageRef}
              className="lg:sticky lg:top-20 my-8 h-[760px] relative hidden lg:block"
            >
              <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
                viewBox="0 0 600 760"
                fill="none"
                aria-hidden="true"
              >
                <path
                  ref={pathRef}
                  d="M560 10 C 420 120, 420 640, 560 750"
                  stroke="#10b981"
                  strokeOpacity=".18"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                />
              </svg>

              <ul ref={railRef} className="absolute inset-0">
                {ITEMS.map((item, i) => {
                  const width = item.minWidth ?? 500;
                  const isLight = item.variant === "light";
                  return (
                    <li key={i} className="absolute">
                      <div
                        className={[
                          "flex items-center gap-3 rounded-full px-4 pr-6 py-4 text-white ring-1",
                          isLight
                            ? "bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] text-emerald-900 ring-white/50"
                            : "bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] ring-white/10",
                        ].join(" ")}
                        style={{ minWidth: width }}
                      >
                        <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-emerald-400 to-emerald-700" />
                          )}
                        </div>
                        <h5 className="font-semibold leading-snug">
                          {item.text}
                        </h5>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ===== Mobile: compact 2-column cards (clean & readable) ===== */}
            <div className="lg:hidden mt-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {ITEMS.map((item, i) => (
                  <li key={i}>
                    <div
                      className="
            relative flex items-center gap-3 rounded-2xl p-3
            bg-white text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.08)]
            ring-1 ring-black/5 min-h-[64px] active:scale-[.99]
            transition-transform
          "
                    >
                      {/* left accent bar (warm gradient) */}
                      <span
                        className="
              pointer-events-none absolute left-0 top-0 h-full w-[3px]
              rounded-l-2xl
              bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
            "
                        aria-hidden="true"
                      />

                      {/* avatar */}
                      <span className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-white/60 shrink-0">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="block h-full w-full bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]" />
                        )}
                      </span>

                      {/* label */}
                      <span className="text-[13px] sm:text-[14px] font-semibold leading-snug">
                        {item.text}
                      </span>

                      {/* chevron */}
                      <svg
                        className="ml-auto h-5 w-5 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
