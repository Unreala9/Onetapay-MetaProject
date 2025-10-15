import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function RedVideoCards() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll animation for heading
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 90%", "end 10%"],
  });

  const fillRaw = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const fill = useSpring(fillRaw, { stiffness: 120, damping: 22, mass: 0.35 });
  const clipPathMV = useTransform(fill, (b) => `inset(0% 0% ${b}% 0%)`);

  // Cursor glow movement
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    };
    const leave = () => setCursor((prev) => ({ ...prev, visible: false }));

    const sec = sectionRef.current;
    sec?.addEventListener("mousemove", move);
    sec?.addEventListener("mouseleave", leave);
    return () => {
      sec?.removeEventListener("mousemove", move);
      sec?.removeEventListener("mouseleave", leave);
    };
  }, []);

  const cards = [
    {
      title: "Add it to your stack",
      img: "/Pine/r1.png",
      video: "/Pine/r1.mp4",
    },
    {
      title: "Go code free",
      img: "/Pine/r2.avif",
      video: "/Pine/r2.mp4",
    },
    {
      title: "Explore pre-built recipes",
      img: "/Pine/r3.png",
      video: "/Pine/r3.mp4",
    },
    {
      title: "Build with us",
      img: "/Pine/r4.png",
      video: "/Pine/r4.mp4",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative my-16 overflow-hidden bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-t-3xl"
    >
      {/* Glow Cursor */}
      <motion.div
        className="pointer-events-none absolute w-64 h-64 rounded-full bg-[radial-gradient(circle,#ffffff80_0%,transparent_60%)] blur-3xl"
        style={{
          left: cursor.x - 128,
          top: cursor.y - 128,
          opacity: cursor.visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <div className="mx-auto w-[94vw] sm:w-[90vw] lg:w-[84vw] xl:w-[80vw] 2xl:max-w-[1280px]">
        {/* Heading Block */}
        <div className="rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div
            ref={headingRef}
            className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16"
          >
            <div className="relative">
              <h1 className="tracking-tight leading-[1.1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/20 max-w-[28ch] md:max-w-[40ch]">
                Built for the builders. Our cutting-edge solutions simplify
                complex integrations, helping you deploy, scale and optimise
                with ease. With seamless connectivity, open APIs for limitless
                possibilities and next-gen tools, we put you in control of your
                business, inside-out.
              </h1>

              <motion.h1
                aria-hidden
                className="absolute inset-0 tracking-tight leading-[1.1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent max-w-[28ch] md:max-w-[40ch]"
                style={{
                  backgroundImage: "linear-gradient(180deg,#ffffff,#ffffff)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  clipPath: clipPathMV,
                  WebkitTextFillColor: "transparent",
                }}
              >
                Built for the builders. Our cutting-edge solutions simplify
                complex integrations, helping you deploy, scale and optimise
                with ease. With seamless connectivity, open APIs for limitless
                possibilities and next-gen tools, we put you in control of your
                business, inside-out.
              </motion.h1>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <article
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/5 p-6 sm:p-8 transition-colors duration-300 ${
                hoveredIndex === i ? "bg-black" : "bg-white/0"
              }`}
            >
              <div className="relative aspect-[16/12] overflow-hidden rounded-2xl ring-1 ring-white/10">
                {hoveredIndex === i ? (
                  <video
                    src={c.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={c.img}
                    className="w-full h-full object-cover"
                    alt={c.title}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#2bffde]/15" />
              </div>
              <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-white">
                {c.title}
              </h2>
              <p className="mt-3 text-white/70">
                Build on top of your tech stack with tools designed to fit any
                framework.
              </p>
              <div className="mt-6 h-1 w-24 rounded-full bg-pink-700 group-hover:w-32 transition-all" />
              <div
                className="absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(43,255,222,.18), 0 20px 60px -10px rgba(43,255,222,.18)",
                }}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Background glow behind section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex justify-center"
      >
        <div className="w-[80vw] max-w-[1200px] h-[420px] translate-y-24 rounded-full blur-3xl opacity-30 bg-[radial-gradient(75%_75%_at_50%_0%,#0ee7b7_0%,transparent_70%)]" />
      </div>
    </section>
  );
}
