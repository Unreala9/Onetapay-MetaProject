// components/Testimonials.tsx
"use client";

import React, { useEffect, useState, useRef, JSX } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";

// ---------------------------------------------
// 1) Your original testimonials data
// ---------------------------------------------
type Testimonial = {
  id: string;
  name: string;
  role: string;
  studio: string;
  avatar: string; // image url
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

// ---------------------------------------------
// 2) Carousel implementation (from your snippet)
//    Slightly adapted to use testimonial data
// ---------------------------------------------
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function Carousel({
  items = [],
  baseWidth = 720,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
  round = false,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop && items.length > 0 ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
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
      className={`relative overflow-hidden p-4 ${
        round ? "rounded-full border border-white" : "rounded-[24px] border border-[#eaeaea] bg-white"
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        // transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col items-start justify-between rounded-[16px] border border-[#f0f0f0] bg-white overflow-hidden cursor-grab active:cursor-grabbing shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
              style={{
                width: itemWidth,
                // let intrinsic content define height nicely on all screens
                rotateY: rotateY,
              }}
              // transition={effectiveTransition}
            >
              <div className="w-full p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full ring-2 ring-white shadow">
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    {/* Small secondary line comes from description's meta if needed */}
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div className={`flex w-full justify-center`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index ? "bg-[#333]" : "bg-[rgba(51,51,51,0.35)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// 3) Page section: original left timeline + Carousel on right
// ---------------------------------------------
export default function Testimonials() {
  // map testimonials to carousel items
  const items: CarouselItem[] = DATA.map((t, i) => ({
    id: i + 1,
    title: `${t.name} · ${t.role}`,
    description: `“${t.quote}”\n${t.studio}`,
    icon: (
      <img
        src={t.avatar}
        alt={t.name}
        className="h-[40px] w-[40px] rounded-full object-cover"
      />
    ),
  }));

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-[320px,1fr] md:gap-10 md:py-24 lg:px-8">
        {/* LEFT: vertical timeline + heading */}
        <aside className="relative hidden md:block">
          {/* vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gray-200" />
          {/* dots */}
          <ul className="absolute left-[22px] top-6 flex h-[calc(100%-3rem)] flex-col justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="h-2 w-2 rounded-full border border-gray-300 bg-white"
              />
            ))}
          </ul>

          <div className="pl-16">
            <h2 className="text-3xl font-light leading-tight text-gray-900">
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

        {/* RIGHT: carousel */}
        <div className="w-full flex items-center justify-center">
          <Carousel
            items={items}
            baseWidth={840}         // width of the carousel track
            autoplay={true}
            autoplayDelay={3800}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </div>
    </section>
  );
}
