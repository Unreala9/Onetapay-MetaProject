import { useEffect, useRef } from "react";

type Item = {
  text: string;
  img?: string;
  variant?: "light" | "dark";
};

const ITEMS: Item[] = [
  { text: "Grow revenue with embedded bill payments", img: "/Pine/c1.webp", variant: "dark" },
  { text: "Manage Corporate Expenses", img: "/Pine/c2.webp", variant: "dark" },
  { text: "Drive efficiency through billing integrations", img: "/Pine/c3.webp", variant: "dark" },
  { text: "Acquire new customers", img: "/Pine/c4.webp", variant: "dark" },
  { text: "Deliver refunds and vouchers to customers", img: "/Pine/c5.webp", variant: "dark" },
  { text: "Enhance employee rewards", img: "/Pine/c6.webp", variant: "dark" },
  { text: "Automate vendor payouts", img: "/Pine/c7.webp", variant: "dark" },
  { text: "Scale credit & financing", img: "/Pine/c5.webp", variant: "dark" },
];

export default function Runways() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current,
      path = pathRef.current,
      rail = railRef.current,
      stage = stageRef.current;
    if (!svg || !path || !rail || !stage) return;

    const nodes = Array.from(rail.querySelectorAll<HTMLLIElement>("li"));

    // ViewBox + path length
    const VBX = 600, VBY = 760;
    const L = path.getTotalLength();
    let sx = 2, sy = 1;

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

    // Auto + scroll direction
    let base = 0;
    let lastTime = performance.now();
    const BASE_SPEED = 0.06;
    const SCROLL_BOOST = 0.55;
    const DIR_SMOOTH = 0.12;

    let targetDir = 1;
    let dir = 1;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      if (dy > 0) targetDir = 1;
      else if (dy < 0) targetDir = -1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      dir += (targetDir - dir) * DIR_SMOOTH;
      const speed = BASE_SPEED * (1 + SCROLL_BOOST * Math.abs(dir));
      base += speed * dir * dt;

      for (const li of nodes) {
        const seed = parseFloat(li.dataset.offset || "0");
        const p = (((base + seed) % 1) + 1) % 1;
        const pt = path.getPointAtLength(p * L);

        // place node
        li.style.transform = `translate(${pt.x * sx}px, ${pt.y * sy}px) translate(-50%, -50%)`;

        // depth weight
        const weight = 1 - Math.abs(0.5 - p) * 3;
        const card = li.firstElementChild as HTMLElement | null;
        if (card) {
          const sc = 1 + 0.05 * weight;

          // 👉 use CSS var so we can inverse-scale avatar in pure CSS
          card.style.setProperty("--sc", String(sc));
          card.style.opacity = String(0.55 + 0.45 * weight);
          card.style.filter = `drop-shadow(0 18px 28px rgba(0,0,0,${0.1 + 0.18 * weight}))`;
          card.style.willChange = "transform, opacity, filter";
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        lastTime = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* LEFT copy */}
          <div className="lg:sticky lg:top-12 mt-44 self-start">
            <h1 className="text-center lg:text-left font-thin text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-[#272b2e] tracking-tight text-balance">
              Beyond payments, turning
              roadblocks into runways.
            </h1>
            <p className="mt-4 sm:mt-6 text-center lg:text-left text-base sm:text-lg lg:text-xl text-slate-600 max-w-[60ch] mx-auto lg:mx-0 text-pretty">
              Run lean, maximise growth and move fast, because payments are just
              the start.
            </p>
          </div>

          {/* RIGHT column */}
          <div className="relative mr-60 ">
            {/* Top/Bottom fades */}
            <div className="absolute top-0 left-0 w-[600px] h-32 bg-gradient-to-b from-white via-white/70 to-transparent backdrop-blur-sm z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-32 bg-gradient-to-t from-white via-white/70 to-transparent backdrop-blur-sm z-10 pointer-events-none" />

            {/* Desktop rail */}
            <div
              ref={stageRef}
              className="lg:sticky lg:top-20 my-6 sm:my-8 h-[760px] relative hidden lg:block"
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
                  d="M560 20 C 430 120, 430 640, 560 740"
                  stroke="#10b981"
                  strokeOpacity=".18"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                />
              </svg>

              <ul ref={railRef} className="absolute inset-0">
                {ITEMS.map((item, i) => {
                  const isLight = item.variant === "light";
                  return (
                    <li key={i} className="absolute h-24">
                      <div
                        className={[
                          // 👉 fixed layout: same width + min height + perfect alignment
                          "group flex items-center gap-4 rounded-full px-5 pr-7 py-3 ring-1 transition-all duration-300",
                          "w-[300px] min-h-[70px]", // fixed width & height for consistent alignment
                          "[transform:scale(var(--sc,1))]", // scale via CSS var
                          isLight
                            ? "bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] ring-white/50 text-pink-900"
                            : "bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] ring-white/10 text-white",
                        ].join(" ")}
                        style={{ willChange: "transform, opacity, filter" }}
                      >
                        {/* 👉 FIXED avatar size + inverse scale */}
                        <div
                          className={[
                            "js-avatar shrink-0 rounded-full overflow-hidden ring-2 ring-white/20",
                            "flex items-center justify-center",
                            "h-12 w-12",
                            "[transform:scale(calc(1/var(--sc,1)))]", // inverse scale
                            "origin-center will-change-transform",
                          ].join(" ")}
                        >``
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

                        {/* 👉 Text area fixed rules for clean alignment */}
                        <h5
                          className={[
                            "font-semibold text-sm leading-tight",
                            "text-white/95 text-left",
                            "select-none",
                          ].join(" ")}
                        >
                          {item.text}
                        </h5>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile simple list */}
            <div className="lg:hidden mt-6 sm:mt-8">
              <ul className="space-y-3 sm:space-y-4">
                {ITEMS.map((item, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="group relative w-full flex items-center gap-4 rounded-2xl p-3.5 sm:p-4 pr-10 bg-white text-slate-900 ring-1 ring-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] active:scale-[.995] transition text-left min-h-[72px]"
                    >
                      <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] pointer-events-none" />
                      <span className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-white/70 shrink-0 flex items-center justify-center">
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
                      <span className="font-semibold leading-tight text-[13.5px] sm:text-sm text-slate-900/90 break-words [text-wrap:balance] line-clamp-2">
                        {item.text}
                      </span>
                      <svg
                        className="ml-auto absolute right-3.5 sm:right-4 h-5 w-5 text-slate-400 group-hover:text-slate-500 transition"
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
                    </button>
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
