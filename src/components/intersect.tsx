"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import TiltedCard from "./TiltedCard";

/* ---------- Data ---------- */
const contentBlocks = [
  {
    id: 1,
    imgt: "/Pine/c1.png",
    title: "Courses",
    desc: "Our courses combine theory with practical learning to strengthen your foundation and enhance expertise. Each module is carefully structured to deliver real-world skills, insights, and confidence, helping you progress step by step toward professional and personal growth effectively.",
    img: "/Pine/coursegen.png",
  },
  {
    id: 2,
    imgt: "/Pine/d1.png",
    title: "Discord",
    desc: "Connect with a vibrant Discord community filled with learners, mentors, and professionals. Share ideas, seek support, engage in meaningful discussions, and collaborate on growth opportunities. Build long-term professional relationships while continuously enhancing your learning experience in an interactive environment.",
    img: "/Pine/inter2.png",
  },
  {
    id: 3,
    imgt: "/Pine/i1.jpg",
    title: "In-store Payments",
    desc: "Our in-store payment solutions provide seamless, fast, and secure transactions. Designed for reliability, they enhance customer trust and make business operations simpler. With multiple payment support, your customers experience smooth checkouts, while you enjoy effortless financial management with advanced technology.",
    img: "/Pine/in3.png",
  },
  {
    id: 4,
    imgt: "/Pine/t1.png",
    title: "Telegram",
    desc: "Stay updated and engaged by joining our Telegram channel. Gain access to exclusive resources, announcements, and valuable tips. Participate in real-time discussions with peers while keeping up with the latest trends. Learn, connect, and grow within our supportive, active ecosystem.",
    img: "/Pine/inter4.png",
  },
  {
    id: 5,
    imgt: "/Pine/w1.png",
    title: "Webinar",
    desc: "Attend live webinars hosted by experts and industry leaders. Gain practical knowledge from interactive discussions, case studies, and Q&A sessions. Each event is designed to strengthen your learning, enhance professional skills, and expand opportunities with guidance from experienced voices.",
    img: "/Pine/inter5.png",
  },
];

/* ---------- Side Stickers ---------- */
const STICKERS: Record<
  number,
  Array<
    | { id: string; type: "chip"; emoji: string; label: string; delay?: number }
    | { id: string; type: "img"; imgSrc: string; delay?: number }
  >
> = {
  1: [
    { id: "c-top", type: "chip", emoji: "✅", label: "Enrolled", delay: 0.05 },
    { id: "c-mid", type: "img", imgSrc: "/Pine/c1.png", delay: 0.12 },
    {
      id: "c-bot",
      type: "chip",
      emoji: "⏱️",
      label: "Self-paced",
      delay: 0.18,
    },
  ],
  2: [
    { id: "d-top", type: "chip", emoji: "💬", label: "Live chat", delay: 0.05 },
    { id: "d-mid", type: "img", imgSrc: "/Pine/d1.png", delay: 0.12 },
    { id: "d-bot", type: "chip", emoji: "⚡", label: "Real-time", delay: 0.18 },
  ],
  3: [
    {
      id: "p-succ",
      type: "chip",
      emoji: "🟢",
      label: "Payment Successful",
      delay: 0.05,
    },
    {
      id: "p-emi",
      type: "chip",
      emoji: "💳",
      label: "No-cost EMI",
      delay: 0.12,
    },
    { id: "p-card", type: "img", imgSrc: "/Pine/i1.jpg", delay: 0.18 },
  ],
  4: [
    { id: "t-top", type: "chip", emoji: "📣", label: "Updates", delay: 0.05 },
    { id: "t-mid", type: "img", imgSrc: "/Pine/t1.png", delay: 0.12 },
    {
      id: "t-bot",
      type: "chip",
      emoji: "🔔",
      label: "Instant alerts",
      delay: 0.18,
    },
  ],
  5: [
    {
      id: "w-top",
      type: "chip",
      emoji: "🎥",
      label: "Live webinar",
      delay: 0.05,
    },
    { id: "w-mid", type: "img", imgSrc: "/Pine/w1.png", delay: 0.12 },
    { id: "w-bot", type: "chip", emoji: "⭐", label: "Q&A", delay: 0.18 },
  ],
};

/* =========================================================================
   MOBILE CARD — fixed 320×560, widgets safe, CTAs pinned
   ========================================================================= */
const MOBILE_CARD_W = 320;
const MOBILE_CARD_H = 650;
const MOBILE_IMAGE_H = 440;

function MobileStackedCard({
  src,
  title,
  desc,
  tag = "Fintech",
  i,
}: {
  src: string;
  title: string;
  desc: string;
  tag?: string;
  i: number;
}) {
  return (
    <div
      className="relative shrink-0 rounded-3xl overflow-hidden bg-white
                 border border-black/[0.06] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.22)]
                 transition-all duration-500 hover:shadow-[0_18px_60px_-12px_rgba(0,0,0,0.30)] hover:-translate-y-0.5
                 flex flex-col z-20"
      style={{ width: MOBILE_CARD_W, height: MOBILE_CARD_H }}
    >
      {/* TOP: Visual */}
      <div className="relative p-3">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ width: MOBILE_CARD_W - 24, height: MOBILE_IMAGE_H }}
        >
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(140% 100% at 50% 0%, rgba(34,211,238,.22) 0%, rgba(167,139,250,.18) 40%, rgba(251,113,133,.14) 100%)",
            }}
          />
        </div>

        {/* floating widgets (compact) */}
        <div className="absolute -bottom-6 left-3 right-3 flex gap-2">
          <div className="flex-[0_0_60%] rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)] border border-black/5 p-3">
            <p className="text-[10px] text-neutral-500 mb-2">Quick Actions</p>
            <div className="grid grid-cols-4 gap-2">
              {["Pay", "Scan", "Cards", "Bills"].map((t) => (
                <div
                  key={t}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg border border-neutral-200/70 bg-white/90 p-2"
                >
                  <div className="size-7 rounded-full bg-gradient-to-br from-emerald-400/70 to-teal-500/70 grid place-items-center text-white text-[12px]">
                    ✓
                  </div>
                  <span className="text-[10px] text-neutral-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[40%] rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)] border border-black/5 p-3">
            <p className="text-[10px] text-neutral-500">Rates</p>
            <div className="mt-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px]">USD</span>
                <span className="text-[12px] font-semibold">₹82.90</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px]">EUR</span>
                <span className="text-[12px] font-semibold">₹89.55</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Content */}
      <div className="pt-12 px-4 pb-4 flex flex-col min-h-0 grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-50 px-2 py-[2px] text-[11px] text-emerald-700">
            <span className="inline-block size-[6px] rounded-full bg-emerald-500" />{" "}
            {tag}
          </span>
        </div>

        <h3 className="text-[18px] font-extrabold leading-tight text-neutral-900">
          {title}
        </h3>

        {/* desc fills free space; scrolls if long */}
        <p className="mt-2 text-[13px] leading-6 text-neutral-600 md:hidden block flex-1 overflow-y-auto overscroll-contain pr-1">
          {desc}
        </p>

        {/* CTAs — equal width, no overflow */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href="/auth"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-extrabold text-white
                        shadow-sm border border-black/5
                        bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                        hover:brightness-110 active:scale-[.98] transition"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-bold
                        text-neutral-800 bg-white border border-neutral-200
                        hover:bg-neutral-50 active:scale-[.98] transition"
          >
            Explore now
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MOBILE MARQUEE — safe padding so fades don't cover cards
   ========================================================================= */
function MobileMarqueeCarousel() {
  const reel = contentBlocks.map((b) => ({
    src: b.img,
    title: b.title,
    desc: b.desc,
  }));
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ startX: 0, startLeft: 0, dragging: false });

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
      requestAnimationFrame(() => {
        scroller.scrollLeft = oneSetWidth;
      });
    };
    setInitial();

    const onResize = () => {
      const prevRatio = scroller.scrollLeft / Math.max(1, oneSetWidth);
      oneSetWidth = setEl.offsetWidth;
      scroller.scrollLeft = Math.max(1, Math.round(prevRatio * oneSetWidth));
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(setEl);

    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!pausedRef.current)
        scroller.scrollLeft += (speedPxPerSec * dt) / 1000;
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

  return (
    <section className="lg:hidden sm:py-12 bg-neutral-50">
      <div className="relative mt-4">
        <div
          ref={scrollerRef}
          className="relative mx-[calc(50%-50vw)] w-screen overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab"
          aria-label="Scrolling showcase"
          style={{ paddingBottom: 8 }}
        >
          {/* edge fades below cards */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-neutral-50 to-transparent z-[5]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-neutral-50 to-transparent z-[5]" />

          {/* inner padding so fades don't overlap content */}
          <div className="inline-flex items-end gap-4 sm:gap-6 px-5 sm:px-6">
            <div ref={setRef} className="inline-flex items-end gap-4 sm:gap-6">
              {reel.map((c, i) => (
                <MobileStackedCard
                  key={`a-${i}`}
                  src={c.src}
                  title={c.title}
                  desc={c.desc}
                  i={i}
                />
              ))}
            </div>
            <div className="inline-flex items-end gap-4 sm:gap-6">
              {reel.map((c, i) => (
                <MobileStackedCard
                  key={`b-${i}`}
                  src={c.src}
                  title={c.title}
                  desc={c.desc}
                  i={i}
                />
              ))}
            </div>
            <div className="inline-flex items-end gap-4 sm:gap-6">
              {reel.map((c, i) => (
                <MobileStackedCard
                  key={`c-${i}`}
                  src={c.src}
                  title={c.title}
                  desc={c.desc}
                  i={i}
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

/* =========================================================================
   DESKTOP CARD + rest (unchanged)
   ========================================================================= */
function InterlockHoverCard({
  src,
  title,
  initialTilt = -6,
  width = 300,
  height = 440,
}: {
  src: string;
  title: string;
  initialTilt?: number;
  width?: number;
  height?: number;
}) {
  const container: Variants = {
    rest: { rotate: initialTilt, scale: 1 },
    hover: {
      rotate: 0,
      scale: 1.03,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
  const headline: Variants = {
    rest: { opacity: 0, y: "-120%", zIndex: 0, filter: "blur(4px)" as any },
    hover: {
      opacity: 1,
      y: 10,
      zIndex: 30,
      filter: "blur(0px)" as any,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
  const glow: Variants = {
    rest: { opacity: 0 },
    hover: { opacity: 0.12, transition: { duration: 0.35, ease: "easeOut" } },
  };
  return (
    <motion.div
      className="relative will-change-transform"
      variants={container}
      initial="rest"
      whileHover="hover"
      style={{ height, width }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)]"
        style={{ height, width }}
      >
        <div className="relative z-10">
          <TiltedCard
            imageSrc={src}
            altText={title}
            captionText=""
            containerHeight={`${height}px`}
            containerWidth={`${width}px`}
            imageHeight={`${height}px`}
            imageWidth={`${width}px`}
            rotateAmplitude={12}
            scaleOnHover={1.06}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={glow}
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, #22d3ee 0%, #a78bfa 45%, #fb7185 100%)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
        <motion.div
          className="pointer-events-none absolute left-0 right-0 flex justify-center"
          style={{ top: 0 }}
          variants={headline}
        >
          <div className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/85 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.12)] px-4 py-2 mt-2 text-[16px] font-extrabold text-black tracking-tight">
            {title}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SideStickers({
  activeIdx,
  show,
}: {
  activeIdx: number;
  show: boolean;
}) {
  const block = contentBlocks[activeIdx];
  const stickers = STICKERS[block.id] ?? [];
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.6, filter: "blur(6px)" as any },
    visible: (d: number) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)" as any,
      transition: { delay: d, duration: 0.5, ease: "easeOut" },
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)" as any,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
  return (
    <AnimatePresence mode="wait">
      {show && (
        <div
          key={`stickers-${block.id}`}
          className="pointer-events-none absolute inset-0"
        >
          {stickers.map((s, i) => (
            <motion.div
              key={s.id}
              className="absolute"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              custom={(s as any).delay ?? i * 0.1}
              style={{
                right: `${rand(160, 250)}px`,
                top: `calc(50% + ${rand(-150, 150)}px)`,
              }}
            >
              {s.type === "chip" ? (
                <motion.div
                  className="rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,.08)] px-4 py-2 text-[14px] font-semibold text-neutral-800"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 1.5, -1.5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: rand(5, 8),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="mr-1">{(s as any).emoji}</span>
                  {(s as any).label}
                </motion.div>
              ) : (
                <motion.div
                  className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,.1)]"
                  style={{ width: 100, height: 100 }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 4, -4, 0],
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: rand(5, 8),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: rand(0, 1),
                  }}
                >
                  <img
                    src={(s as any).imgSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Main ---------- */
export default function AnimatedFlow() {
  const [activeImg, setActiveImg] = useState<string>(contentBlocks[0].img);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [fly, setFly] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const swapRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const root = listRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-img]"));
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setActiveImg(el.dataset.img!);
            setActiveIdx(Number(el.dataset.index));
          }
        }),
      { threshold: 0.45, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: swapRef,
    offset: ["start 90%", "end 10%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isDesktop) setFly(v > 0 && v < 1);
  });

  const steps = [
    { x: 100, y: 0, z: 5, r: -1 },
    { x: 360, y: -140, z: 6, r: -0.5 },
    { x: 620, y: -280, z: 7, r: -0.3 },
    { x: 880, y: -420, z: 8, r: -0.2 },
    { x: 1140, y: -560, z: 9, r: -0.1 },
  ] as const;

  const interlockingImgs = [
    activeImg,
    contentBlocks[1].img,
    contentBlocks[2].img,
    contentBlocks[3].img,
    contentBlocks[4].img,
  ];
  const titles = ["Courses", "Discord", "In-store", "Telegram", "Webinar"];

  return (
    <LayoutGroup>
      <div className="bg-white text-neutral-900 flex flex-col sm:items-center justify-center py-8">
        <div className="px-4 sm:px-6 md:px-8 lg:ml-28 max-w-screen-xl mx-auto">
          <h2 className="text-[clamp(28px,6vw,56px)] font-extrabold leading-[0.95]">
            Our Social Spark,
            <br className="hidden sm:block" />
            Our Creative Touch
          </h2>
          <p className="mt-4 sm:mt-5 text-[clamp(14px,2.6vw,18px)] text-neutral-600 max-w-2xl">
            Blending innovation with imagination, we bring social spark and
            creative touch to every idea.
          </p>
        </div>

        {/* ===== MOBILE HORIZONTAL SHOWCASE ===== */}
        <MobileMarqueeCarousel />

        {/* ===== Desktop Interlocking Cards ===== */}
        <section className="hidden lg:grid lg:grid-cols-8 gap-10 items-center justify-center px-6 py-24">
          <div className="lg:col-span-7 relative flex justify-center">
            <div className="relative w-[min(98vw,1280px)] h-[950px] overflow-visible">
              {steps.map((p, idx) => {
                const isFirst = idx === 0;
                if (isFirst && fly) return null;
                return (
                  <motion.div
                    key={idx}
                    className="absolute"
                    style={{
                      left: 0,
                      bottom: 0,
                      x: p.x,
                      y: p.y,
                      rotate: p.r,
                      zIndex: p.z,
                      willChange: "transform",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    layoutId={isFirst ? "fly-card" : undefined}
                  >
                    <InterlockHoverCard
                      src={interlockingImgs[idx]}
                      title={titles[idx]}
                      initialTilt={-1}
                      width={320}
                      height={500}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Sticky Preview + Side Stickers ===== */}
        <motion.section
          ref={swapRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20 lg:py-24 max-w-screen-xl mx-auto"
        >
          {/* LEFT sticky preview — desktop only */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative lg:sticky lg:top-20">
              <div className="mx-auto rounded-[30px] p-8 w-[min(92vw,520px)]">
                <div
                  className="relative rounded-[24px] overflow-hidden"
                  style={{ width: "480px", height: "640px" }}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {fly ? (
                      <motion.div
                        key="flying"
                        layoutId="fly-card"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.5, scale: 0.97 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 30,
                        }}
                      >
                        <TiltedCard
                          imageSrc={activeImg}
                          altText="Preview"
                          captionText=""
                          containerHeight="500px"
                          containerWidth="320px"
                          imageHeight="500px"
                          imageWidth="320px"
                          rotateAmplitude={12}
                          scaleOnHover={1.12}
                          showMobileWarning={false}
                          showTooltip={false}
                          displayOverlayContent={false}
                        />
                      </motion.div>
                    ) : (
                      <motion.img
                        key={activeImg}
                        src={activeImg}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover object-center select-none"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                  <SideStickers activeIdx={activeIdx} show={true} />
                </div>
              </div>
              <div className="mx-auto mt-7 h-9 w-3/4 rounded-full bg-black/10 blur-2xl" />
            </div>
          </div>

          {/* RIGHT: Scroll list — desktop only */}
          <div className="hidden lg:block lg:col-span-6" ref={listRef}>
            <div className="space-y-8 xl:space-y-12">
              {contentBlocks.map((b, i) => (
                <article
                  key={b.id}
                  data-img={b.img}
                  data-index={i}
                  className="rounded-2xl sm:rounded-3xl p-6 md:p-8 w-full "
                >
                  <div className="my-48">
                    <h3 className="font-extrabold flex items-center gap-4 text-[clamp(18px,3.8vw,28px)]">
                      <img
                        src={b.imgt}
                        alt=""
                        className="h-[52px] w-[52px] rounded-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[clamp(14px,3.4vw,18px)] leading-[1.65] text-neutral-600">
                      {b.desc}
                    </p>
                    <a
                      href="/auth"
                      className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-extrabold text-white shadow-sm border border-black/5
                                  bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                                  hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/40 active:scale-[.98] transition"
                    >
                      Get started
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </LayoutGroup>
  );
}
