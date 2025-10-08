"use client";

import { useEffect, useRef, useState } from "react";
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
    img: "/Pine/course1.png",
  },
  {
    id: 2,
    imgt: "/Pine/d1.png",
    title: "Discord",
    desc: "Connect with a vibrant Discord community filled with learners, mentors, and professionals. Share ideas, seek support, engage in meaningful discussions, and collaborate on growth opportunities. Build long-term professional relationships while continuously enhancing your learning experience in an interactive environment.",
    img: "/Pine/discord1.png",
  },
  {
    id: 3,
    imgt: "/Pine/i1.jpg",
    title: "In-store Payments",
    desc: "Our in-store payment solutions provide seamless, fast, and secure transactions. Designed for reliability, they enhance customer trust and make business operations simpler. With multiple payment support, your customers experience smooth checkouts, while you enjoy effortless financial management with advanced technology.",
    img: "/Pine/payment.png",
  },
  {
    id: 4,
    imgt: "/Pine/t1.png",
    title: "Telegram",
    desc: "Stay updated and engaged by joining our Telegram channel. Gain access to exclusive resources, announcements, and valuable tips. Participate in real-time discussions with peers while keeping up with the latest trends. Learn, connect, and grow within our supportive, active ecosystem.",
    img: "/Pine/telegram.png",
  },
  {
    id: 5,
    imgt: "/Pine/w1.png",
    title: "Webinar",
    desc: "Attend live webinars hosted by experts and industry leaders. Gain practical knowledge from interactive discussions, case studies, and Q&A sessions. Each event is designed to strengthen your learning, enhance professional skills, and expand opportunities with guidance from experienced voices.",
    img: "/Pine/webinar.png",
  },
];

/* ---------- Side Sticker Presets ---------- */
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
      {/* Card wrapper clips content so text hides properly */}
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)]"
        style={{ height, width }}
      >
        {/* IMAGE LAYER */}
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

        {/* TOP POP TEXT — centered, black, slides down from top */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 flex justify-center"
          style={{ top: 0 }}
          variants={headline}
        >
          <div
            className="
              inline-flex items-center justify-center
              rounded-full border border-black/10
              bg-white/85 backdrop-blur-md
              shadow-[0_6px_18px_rgba(0,0,0,0.12)]
              px-4 py-2 mt-2
              text-[16px] font-extrabold text-black tracking-tight
            "
          >
            {title}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Random side stickers (typed + float) ---------- */
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
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)" as any,
      transition: { delay, duration: 0.5, ease: "easeOut" },
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
          {stickers.map((s, i) => {
            const randomX = rand(160, 250);
            const randomY = rand(-150, 150);
            const floatDur = rand(5, 8);

            return (
              <motion.div
                key={s.id}
                className="absolute"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                custom={s.delay ?? i * 0.1}
                style={{
                  right: `${randomX}px`,
                  top: `calc(50% + ${randomY}px)`,
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
                      duration: floatDur,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="mr-1">{s.emoji}</span>
                    {s.label}
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
                      duration: floatDur,
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
            );
          })}
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
            const src = el.dataset.img!;
            const idx = Number(el.dataset.index);
            setActiveImg(src);
            setActiveIdx(idx);
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

  /* interlocking positions */
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
  const titles = ["Cards", "QR Pay", "Prepaid", "Congrats!", "Wallet"];

  return (
    <LayoutGroup>
      <div className="bg-white text-neutral-900 flex flex-col sm:items-center justify-center py-8 ">
        <div className="px-4 sm:px-6 md:px-8 lg:ml-28 max-w-screen-xl mx-auto ">
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
                      width={300}
                      height={440}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Sticky Preview (flying) + Random Side Stickers ===== */}
        <motion.section
          ref={swapRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20 lg:py-24 max-w-screen-xl mx-auto"
        >
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative lg:sticky lg:top-20">
              <div className="mx-auto rounded-[30px] p-8 w-[min(92vw,520px)]">
                <div
                  className="relative rounded-[24px] overflow-hidden "
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
                          containerHeight="540px"
                          containerWidth="440px"
                          imageHeight="540px"
                          imageWidth="350px"
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

                  {/* Right-side random stickers */}
                  <SideStickers activeIdx={activeIdx} show={true} />
                </div>
              </div>
              <div className="mx-auto mt-7 h-9 w-3/4 rounded-full bg-black/10 blur-2xl" />
            </div>
          </div>

          {/* RIGHT: Scroll list */}
          <div className="lg:col-span-6" ref={listRef}>
            <div className="space-y-6 sm:space-y-8 md:space-y-10 xl:space-y-12  ">
              {contentBlocks.map((b, i) => (
                <article
                  key={b.id}
                  data-img={b.img}
                  data-index={i}
                  className="rounded-2xl sm:rounded-3xl  p-5 sm:p-6 md:p-8 w-full "
                >
                  <div className="lg:hidden mb-4 overflow-hidden rounded-[16px] ">
                    <div className="relative w-full aspect-[3/4] ">
                      <img
                        src={b.img}
                        alt={b.title}
                        className="absolute inset-0 w-full h-full object-cover object-center select-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="my-60">
                    <h3 className="font-extrabold flex items-center gap-3 sm:gap-4 text-[clamp(18px,3.8vw,28px)]">
                      <img
                        src={b.imgt}
                        alt=""
                        className="h-10 w-10 sm:h-[52px] sm:w-[52px] rounded-full object-cover object-center"
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
