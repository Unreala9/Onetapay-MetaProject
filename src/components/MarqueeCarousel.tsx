import { useEffect, useRef } from "react";

const CARDS = [
  "/Pine/s1.avif",
  "/Pine/s2.avif",
  "/Pine/s3.avif",
  "/Pine/s4.avif",
  "/Pine/s5.avif",
  "/Pine/s1.jpg",
];

const FINTECH_CONTENT = [
  {
    label: "Payments",
    title: "Mobile recharge, DTH, Insurance",
    subtitle: "Smart payments & insights",
  },
  {
    label: "Lending",
    title: "Instant loans & credit",
    subtitle: "Easy access to funds",
  },
  {
    label: "Investments",
    title: "Grow your portfolio",
    subtitle: "Mutual funds & stocks",
  },
  {
    label: "Wealth Management",
    title: "Personalized advisory",
    subtitle: "Maximize your assets",
  },
  {
    label: "Insurance",
    title: "Health, auto & life plans",
    subtitle: "Secure your future",
  },
  {
    label: "Savings",
    title: "High-interest accounts",
    subtitle: "Save more efficiently",
  },
];

function Card({
  src,
  i,
  label,
  title,
  subtitle,
}: {
  src: string;
  i: number;
  label: string;
  title: string;
  subtitle: string;
}) {
  const sizeClasses = [
    "h-[420px] md:h-[480px] lg:h-[500px]",
    "h-[500px] md:h-[560px] lg:h-[580px]",
    "h-[460px] md:h-[520px] lg:h-[540px]",
    "h-[480px] md:h-[540px] lg:h-[560px]",
    "h-[430px] md:h-[490px] lg:h-[510px]",
    "h-[520px] md:h-[580px] lg:h-[600px]",
  ];

  return (
    <a
      href="#"
      className={`relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[370px] shrink-0 overflow-hidden rounded-3xl group transition-all duration-500 hover:scale-[1.03] ${
        sizeClasses[i % sizeClasses.length]
      }`}
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        alt={`Card ${i + 1}`}
      />

      <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full">
        {label}
      </span>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <p className="text-lg font-semibold drop-shadow">{title}</p>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium bg-white text-neutral-900 px-4 py-2 rounded-full shadow">
            Know more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function MarqueeCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({
    startX: 0,
    startLeft: 0,
    dragging: false,
  });

  // Auto-scroll + infinite wrap
  useEffect(() => {
    const scroller = scrollerRef.current;
    const setEl = setRef.current;
    if (!scroller || !setEl) return;

    let oneSetWidth = setEl.offsetWidth;
    let last = performance.now();
    const speedPxPerSec = 80;
    let raf = 0;

    const setInitial = () => {
      oneSetWidth = setEl.offsetWidth;
      scroller.scrollLeft = oneSetWidth;
    };
    setInitial();

    const onResize = () => {
      const prevRatio = scroller.scrollLeft / oneSetWidth;
      oneSetWidth = setEl.offsetWidth;
      scroller.scrollLeft = Math.max(1, Math.round(prevRatio * oneSetWidth));
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(setEl);

    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!pausedRef.current) {
        scroller.scrollLeft += (speedPxPerSec * dt) / 1000;
      }
      if (scroller.scrollLeft >= oneSetWidth * 2)
        scroller.scrollLeft -= oneSetWidth;
      else if (scroller.scrollLeft <= 0) scroller.scrollLeft += oneSetWidth;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const pause = () => (pausedRef.current = true);
    const resumeSoon = (ms = 1200) => {
      const id = setTimeout(() => (pausedRef.current = false), ms);
      return () => clearTimeout(id);
    };

    const onWheel = () => {
      pause();
      resumeSoon();
    };
    scroller.addEventListener("wheel", onWheel, { passive: true });

    const onPointerDown = (e: PointerEvent) => {
      scroller.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startLeft: scroller.scrollLeft,
        dragging: true,
      };
      scroller.style.cursor = "grabbing";
      pause();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      scroller.scrollLeft = dragRef.current.startLeft - dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragRef.current.dragging = false;
      scroller.releasePointerCapture(e.pointerId);
      scroller.style.cursor = "";
      resumeSoon();
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const reel = [...CARDS];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            For first timers, titans and everyone in between.
          </h2>
          <p className="mt-3 text-neutral-600">
            One size doesn’t fit all. We build solutions that fit you.
          </p>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          ref={scrollerRef}
          className="relative mx-[calc(50%-50vw)] w-screen overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab"
          aria-label="Scrolling showcase"
        >
          {/* edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-neutral-50 to-transparent z-10" />

          <div className="inline-flex items-end gap-6 px-4">
            <div ref={setRef} className="inline-flex items-end gap-6">
              {reel.map((src, i) => (
                <Card
                  key={`a-${i}`}
                  src={src}
                  i={i}
                  label={FINTECH_CONTENT[i % FINTECH_CONTENT.length].label}
                  title={FINTECH_CONTENT[i % FINTECH_CONTENT.length].title}
                  subtitle={
                    FINTECH_CONTENT[i % FINTECH_CONTENT.length].subtitle
                  }
                />
              ))}
            </div>
            <div className="inline-flex items-end gap-6">
              {reel.map((src, i) => (
                <Card
                  key={`b-${i}`}
                  src={src}
                  i={i}
                  label={FINTECH_CONTENT[i % FINTECH_CONTENT.length].label}
                  title={FINTECH_CONTENT[i % FINTECH_CONTENT.length].title}
                  subtitle={
                    FINTECH_CONTENT[i % FINTECH_CONTENT.length].subtitle
                  }
                />
              ))}
            </div>
            <div className="inline-flex items-end gap-6">
              {reel.map((src, i) => (
                <Card
                  key={`c-${i}`}
                  src={src}
                  i={i}
                  label={FINTECH_CONTENT[i % FINTECH_CONTENT.length].label}
                  title={FINTECH_CONTENT[i % FINTECH_CONTENT.length].title}
                  subtitle={
                    FINTECH_CONTENT[i % FINTECH_CONTENT.length].subtitle
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
