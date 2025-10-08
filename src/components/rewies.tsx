// components/Testimonials.tsx
"use client";

import React, { useEffect, useState, useRef, JSX, useMemo } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

/* ---------------------------------------------
   1) Testimonials data
--------------------------------------------- */
type Testimonial = {
  id: string;
  name: string;
  role: string;
  studio: string;
  avatar: string;
  quote: string;
};

const DATA: Testimonial[] = [
  {
    id: "1",
    name: "Maulik Sinh",
    role: "CFO & Co-founder",
    studio: "PROJECT STUDIO",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    quote:
      "I am thrilled with the results and would recommend them to anyone looking for a reliable and trustworthy company.",
  },
  {
    id: "2",
    name: "Ravi Mehra",
    role: "UX/UI Designer",
    studio: "ATLAS STUDIO",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
    quote:
      "OneTaPay made it incredibly easy to monetize our exclusive content. Clean, intuitive, and secure — exactly what a designer appreciates.",
  },
  {
    id: "3",
    name: "Meera Joshi",
    role: "Influencer & Content Creator",
    studio: "CREATIVE STUDIO",
    avatar:
      "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=256&auto=format&fit=crop",
    quote:
      "Setting up my premium content and gated Telegram channel was effortless. Helped me build a paying community without tech headaches.",
  },
  {
    id: "4",
    name: "Saakshi Shah",
    role: "Social Media Analyst",
    studio: "HYPER STUDIO",
    avatar:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=256&auto=format&fit=crop",
    quote:
      "OneTaPay gives full control over my educational content. Smooth, reliable, and fantastic support. A must-have for serious educators!",
  },
];

/* ---------------------------------------------
   2) Carousel
--------------------------------------------- */
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  maxWidth?: number; // max container width on large screens
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

// null-safe ref accepted
function useContainerWidth(
  ref: React.RefObject<HTMLElement | null>,
  fallback = 360
) {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = Math.floor(entry.contentRect.width);
        if (cw > 0) setW(cw);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

function Carousel({
  items = [],
  maxWidth = 960,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
  round = false,
}: CarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerWidth = useContainerWidth(containerRef, 360);

  const containerPadding = 16;
  const effectiveWidth = Math.min(outerWidth, maxWidth);
  const itemWidth = Math.max(240, effectiveWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;

  // seamless loop ke liye 1 duplicate at end
  const carouselItems = loop && items.length > 0 ? [...items, items[0]] : items;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // mobile par 3D band
  const enable3D = useMemo(() => outerWidth >= 640, [outerWidth]);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === items.length - 1 && loop) return prev + 1; // jump to duplicate
        if (prev === carouselItems.length - 1) return loop ? 0 : prev;
        return prev + 1;
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? ({ duration: 0 } as const) : SPRING;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      // reached duplicate -> instant reset to real 0
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 40);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        round ? "rounded-full" : "rounded-2xl"
      } border ${
        round ? "border-white" : "border-[#eaeaea] bg-white"
      } p-3 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
      style={{
        width: "100%",
        ...(round && { height: `${Math.min(outerWidth, maxWidth)}px` }),
        maxWidth: `${maxWidth}px`,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials carousel"
    >
      <motion.div
        className="flex touch-pan-y"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: enable3D ? 1000 : undefined,
          perspectiveOrigin: enable3D
            ? `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`
            : undefined,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = enable3D ? [90, 0, -90] : [0, 0, 0];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });

          return (
            <motion.div
              key={index}
              className="relative shrink-0 flex flex-col items-start justify-between rounded-xl border border-[#f0f0f0] bg-white overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ width: itemWidth, rotateY }}
            >
              <div className="w-full p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white shadow">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                      {item.title}
                    </div>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div className="mt-3 sm:mt-4 flex w-full justify-center">
        <div className="flex items-center gap-3">
          {items.map((_, index) => {
            const active = currentIndex % items.length === index;
            return (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className="group"
              >
                <motion.span
                  className={`block rounded-full ${
                    active ? "bg-[#333]" : "bg-[rgba(51,51,51,0.35)]"
                  }`}
                  style={{ width: active ? 10 : 8, height: active ? 10 : 8 }}
                  animate={{ scale: active ? 1.15 : 1 }}
                  transition={{ duration: 0.15 }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials(): JSX.Element {
  const items: CarouselItem[] = DATA.map((t, i) => ({
    id: i + 1,
    title: `${t.name} · ${t.role}`,
    description: `“${t.quote}”\n${t.studio}`,
    icon: (
      <img
        src={t.avatar}
        alt={t.name}
        className="h-10 w-10 rounded-full object-cover"
      />
    ),
  }));

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-[300px,1fr] md:gap-10 md:py-20 lg:px-8">
        {/* LEFT timeline (hidden on mobile) */}
        <aside className="relative hidden md:block">
          <div className="absolute left-6 top-0 h-full w-px bg-gray-200" />
          <ul className="absolute left-[22px] top-6 flex h-[calc(100%-3rem)] flex-col justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="h-2 w-2 rounded-full border border-gray-300 bg-white"
              />
            ))}
          </ul>

          <div className="pl-16">
            <h2 className="text-2xl font-light leading-tight text-gray-900 lg:text-3xl">
              See why the
              <br />
              <span className="font-bold">world&apos;s</span>
              <br />
              <span className="font-bold">Best Creators</span>
              <br />
              use Onetapay.
            </h2>
          </div>
        </aside>

        {/* RIGHT: responsive carousel */}
        <div className="w-full flex items-center justify-center">
          <Carousel
            items={items}
            maxWidth={840}
            autoplay
            autoplayDelay={3800}
            pauseOnHover
            loop
            round={false}
          />
        </div>
      </div>
    </section>
  );
}
