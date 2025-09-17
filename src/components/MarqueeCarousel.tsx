import { useEffect, useRef } from "react";

const CARDS = [
    "/Pine/imgi_39_homepage_government.webp",
  "/Pine/imgi_40_homepage_brands.webp",
  "/Pine/imgi_41_homepage_d2c.webp",
  "/Pine/imgi_42_homepage_banks.webp",
  "/Pine/imgi_43_homepage_fintech.webp",
  "/Pine/homepage_startups.webp"
];

function Card({ src, i }: { src: string; i: number }) {
  return (
    <a
      href="#"
      className="relative w-[300px] md:w-[340px] lg:w-[380px] h-[460px] md:h-[520px] shrink-0 overflow-hidden rounded-3xl group"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        alt={`Card ${i + 1}`}
      />
      <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full">
        Fintech
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <p className="text-lg font-semibold drop-shadow">
              Mobile recharge, DTH, Insurance
            </p>
            <p className="text-xs text-white/80">Smart payments & insights</p>
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
  const dragRef = useRef<{
    startX: number;
    startLeft: number;
    dragging: boolean;
  }>({
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
    const speedPxPerSec = 80; // adjust speed here
    let raf = 0;

    // start in the middle set so we can scroll both ways seamlessly
    const setInitial = () => {
      oneSetWidth = setEl.offsetWidth;
      scroller.scrollLeft = oneSetWidth; // to the 2nd (middle) copy
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
      const dt = Math.min(64, now - last); // clamp big jumps
      last = now;
      if (!pausedRef.current) {
        scroller.scrollLeft += (speedPxPerSec * dt) / 1000;
      }

      // wrap seamlessly across the 3 copies
      if (scroller.scrollLeft >= oneSetWidth * 2) {
        scroller.scrollLeft -= oneSetWidth;
      } else if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += oneSetWidth;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // pause/resume helpers
    let resumeTimer: number | undefined;
    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer) window.clearTimeout(resumeTimer);
    };
    const resumeSoon = (ms = 1200) => {
      if (resumeTimer) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => (pausedRef.current = false), ms);
    };

    // hover pause (desktop)
    const onEnter = () => pause();
    const onLeave = () => resumeSoon();

    scroller.addEventListener("mouseenter", onEnter);
    scroller.addEventListener("mouseleave", onLeave);

    // wheel (shift/trackpad) -> pause while scrolling, then resume
    const onWheel = () => {
      pause();
      resumeSoon();
    };
    scroller.addEventListener("wheel", onWheel, { passive: true });

    // drag-to-scroll for mouse users
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
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;
      scroller.releasePointerCapture(e.pointerId);
      scroller.style.cursor = "";
      resumeSoon();
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("touchstart", pause, { passive: true });
    scroller.addEventListener("touchend", () => resumeSoon(), {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scroller.removeEventListener("mouseenter", onEnter);
      scroller.removeEventListener("mouseleave", onLeave);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("touchstart", pause);
      scroller.removeEventListener("touchend", () => resumeSoon());
      if (resumeTimer) window.clearTimeout(resumeTimer);
    };
  }, []);

  const reel = [...CARDS]; // one set (we’ll render 3 sets)

  return (
    <section className="py-20 bg-neutral-50">
      {/* Header container */}
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

      {/* Full-bleed, scrollable, auto-scrolling rail */}
      <div className="relative mt-10">
        <div
          ref={scrollerRef}
          className="relative mx-[calc(50%-50vw)] w-screen overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab"
          aria-label="Scrolling showcase"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-neutral-50 to-transparent z-10" />

          {/* 3 copies for seamless wrap */}
          <div className="inline-flex items-stretch gap-6 px-4">
            <div ref={setRef} className="inline-flex gap-6">
              {reel.map((src, i) => (
                <Card key={`a-${i}`} src={src} i={i} />
              ))}
            </div>
            <div className="inline-flex gap-6">
              {reel.map((src, i) => (
                <Card key={`b-${i}`} src={src} i={i} />
              ))}
            </div>
            <div className="inline-flex gap-6">
              {reel.map((src, i) => (
                <Card key={`c-${i}`} src={src} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* tiny util to hide scrollbars */}
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Scrolling showcase"] {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
