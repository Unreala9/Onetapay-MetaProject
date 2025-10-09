"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Item = { text: string; img?: string; variant?: "light" | "dark" };

const ITEMS: Item[] = [
  {
    text: "Grow revenue with embedded bill payments",
    img: "/Pine/c1.webp",
    variant: "dark",
  },
  { text: "Manage Corporate Expenses", img: "/Pine/c2.webp", variant: "dark" },
  {
    text: "Drive efficiency through billing integrations",
    img: "/Pine/c3.webp",
    variant: "dark",
  },
  { text: "Acquire new customers", img: "/Pine/c4.webp", variant: "dark" },
  {
    text: "Deliver refunds and vouchers to customers",
    img: "/Pine/c5.webp",
    variant: "dark",
  },
  { text: "Enhance employee rewards", img: "/Pine/c6.webp", variant: "dark" },
  { text: "Automate vendor payouts", img: "/Pine/c7.webp", variant: "dark" },
  { text: "Scale credit & financing", img: "/Pine/c5.webp", variant: "dark" },
];

export default function Runways() {
  // Desktop refs
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mobile refs
  const mSvgRef = useRef<SVGSVGElement>(null);
  const mPathRef = useRef<SVGPathElement>(null);
  const mRailRef = useRef<HTMLUListElement>(null);
  const mStageRef = useRef<HTMLDivElement>(null);

  /** Common path-follow engine */
  const attachPathFollow = (
    svgEl: SVGSVGElement,
    pathEl: SVGPathElement,
    railEl: HTMLUListElement,
    baseSpeed = 0.06
  ) => {
    const VBX = svgEl.viewBox.baseVal.width || 600;
    const VBY = svgEl.viewBox.baseVal.height || 760;
    const L = pathEl.getTotalLength();

    let sx = 1,
      sy = 1;
    const recalcScale = () => {
      const r = svgEl.getBoundingClientRect();
      sx = r.width / VBX;
      sy = r.height / VBY;
    };
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    ro.observe(svgEl);

    const nodes = Array.from(railEl.querySelectorAll<HTMLLIElement>("li"));
    nodes.forEach((li, i) => {
      li.dataset.offset = String(i / nodes.length);
      li.style.willChange = "transform";
    });

    let base = 0;
    let lastTime = performance.now();
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
      const speed = baseSpeed * (1 + SCROLL_BOOST * Math.abs(dir));
      base += speed * dir * dt;

      for (const li of nodes) {
        const seed = parseFloat(li.dataset.offset || "0");
        const p = (((base + seed) % 1) + 1) % 1;
        const pt = pathEl.getPointAtLength(p * L);

        li.style.transform = `translate(${pt.x * sx}px, ${
          pt.y * sy
        }px) translate(-50%, -50%)`;

        // depth look
        const weight = 1 - Math.abs(0.5 - p) * 3;
        const card = li.firstElementChild as HTMLElement | null;
        if (card) {
          const sc = 1 + 0.06 * weight;
          card.style.setProperty("--sc", String(sc));
          card.style.opacity = String(0.6 + 0.4 * weight);
          card.style.filter = `drop-shadow(0 18px 28px rgba(0,0,0,${
            0.1 + 0.2 * weight
          }))`;
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
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  };

  // desktop init
  useEffect(() => {
    const svg = svgRef.current,
      path = pathRef.current,
      rail = railRef.current,
      stage = stageRef.current;
    if (!svg || !path || !rail || !stage) return;
    return attachPathFollow(svg, path, rail, 0.06);
  }, []);

  // mobile init (same behaviour)
  useEffect(() => {
    const mm = window.matchMedia("(max-width:1023.5px)");
    let cleanup: (() => void) | null = null;

    const boot = () => {
      cleanup?.();
      if (!mm.matches) return;
      const svg = mSvgRef.current,
        path = mPathRef.current,
        rail = mRailRef.current,
        stage = mStageRef.current;
      if (!svg || !path || !rail || !stage) return;
      cleanup = attachPathFollow(svg, path, rail, 0.08);
    };

    boot();
    mm.addEventListener("change", boot);
    return () => {
      mm.removeEventListener("change", boot);
      cleanup?.();
    };
  }, []);

  const sheen = (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0) 60%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0) 60%)",
      }}
      animate={{ backgroundPositionX: ["-200%", "200%"] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
    />
  );

  return (
    <section className="relative overflow-hidden">
      <style>{`.sheen-bg{background-image:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);background-size:200% 100%}`}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* LEFT */}
          <div className="lg:sticky lg:top-12 mt-0 md:mt-44 self-start">
            <h1 className="text-center lg:text-left font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-6xl leading-[1.05] text-[#272b2e]">
              Beyond payments, turning roadblocks into runways.
            </h1>
            <p className="mt-5 text-center lg:text-left text-base sm:text-lg lg:text-xl text-slate-600 max-w-[60ch] mx-auto lg:mx-0">
              Run lean, maximise growth and move fast, because payments are just
              the start.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative lg:mr-60">
            {/* fades (desktop) */}
            <div className="absolute top-0 left-0 w-[600px] h-32 bg-gradient-to-b from-white via-white/70 to-transparent backdrop-blur-sm z-10 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-0 left-0 w-[600px] h-32 bg-gradient-to-t from-white via-white/70 to-transparent backdrop-blur-sm z-10 pointer-events-none hidden lg:block" />

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
                {ITEMS.map((item, i) => (
                  <li key={i} className="absolute h-24">
                    <div
                      className="group flex items-center gap-4 rounded-full px-5 pr-7 py-3 ring-1 transition-all duration-300 w-[300px] min-h-[70px]
                                 [transform:scale(var(--sc,1))]
                                 bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] ring-white/10 text-white"
                    >
                      <div className="shrink-0 rounded-full overflow-hidden ring-2 ring-white/25 h-12 w-12">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-pink-400 to-pink-700" />
                        )}
                      </div>
                      <h5 className="font-semibold text-sm leading-tight text-white/95 text-left">
                        {item.text}
                      </h5>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile rail (image INSIDE card) */}
            <div className="lg:hidden mt-8 relative mr-36">
              <div ref={mStageRef} className="relative my-2 h-[560px]">
                <svg
                  ref={mSvgRef}
                  className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
                  viewBox="0 0 360 560"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    ref={mPathRef}
                    d="M330 10 C 250 110, 250 450, 330 550"
                    stroke="#10b981"
                    strokeOpacity=".16"
                    strokeWidth="2"
                    strokeDasharray="6 10"
                  />
                </svg>

                <ul ref={mRailRef} className="absolute inset-0">
                  {ITEMS.map((item, i) => (
                    <li key={i} className="absolute h-20">
                      <div
                        className="relative flex items-center gap-3 rounded-full pl-4 pr-6 py-3 w-[300px] min-h-[56px]
                                   bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                                   text-white font-semibold leading-tight ring-1 ring-black/5 shadow-[0_10px_24px_rgba(0,0,0,.14)]
                                   [transform:scale(var(--sc,1))] ml-10"
                      >
                        {/* avatar now inside the pill */}
                        <span className="shrink-0 h-10 w-10 rounded-full overflow-hidden ring-2 ring-white bg-white">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="block h-full w-full bg-gradient-to-br from-emerald-300 to-emerald-600" />
                          )}
                        </span>

                        {/* sheen + text */}
                        <span className="sheen-bg pointer-events-none absolute inset-0 rounded-full" />
                        <span className="relative z-10 text-[13.5px] text-white/95">
                          {item.text}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto mt-4 h-[2px] w-4/5 rounded-full bg-black/5" />
            </div>
            {/* /Mobile */}
          </div>
        </div>
      </div>
    </section>
  );
}
