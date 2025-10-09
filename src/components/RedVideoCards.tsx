// src/components/RedVideoCards.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function RedVideoCards() {
  const headingRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress scoped to heading container
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 90%", "end 10%"],
  });

  // 100% (hidden) -> 0% (fully filled)
  const fillRaw = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const fill = useSpring(fillRaw, { stiffness: 120, damping: 22, mass: 0.35 });
  const clipPathMV = useTransform(fill, (b) => `inset(0% 0% ${b}% 0%)`);

  return (
    <section className="relative my-16 bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-t-3xl">
      {/* Outer wrapper = keeps content centered & not full-width */}
      <div
        className="
          mx-auto
          w-[94vw] sm:w-[90vw] lg:w-[84vw] xl:w-[80vw]
          2xl:max-w-[1280px]  /* hard cap for very large screens */
        "
      >
        {/* Heading Block */}
        <div className="rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div
            ref={headingRef}
            className="relative px-6 sm:px-10 lg:px-16 py-12 sm:py-16"
          >
            <div className="relative">
              {/* Base muted layer (ghost text) */}
              <h1 className="tracking-tight leading-[1.1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/20 max-w-[28ch] md:max-w-[40ch]">
                Built for the builders. Our cutting-edge solutions simplify
                complex integrations, helping you deploy, scale and optimise
                with ease. With seamless connectivity, open APIs for limitless
                possibilities and next-gen tools, we put you in control of your
                business, inside-out.
              </h1>

              {/* Fill layer (revealed top → bottom on scroll) */}
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

            {/* subtle top hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Add it to your stack", src: "/Pine/r1.png" },
            { title: "Go code free", src: "/Pine/r2.png" },
            { title: "Explore pre-built recipes", src: "/Pine/r3.png" },
            { title: "Build with us", src: "/Pine/r4.png" },
          ].map((c, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 p-6 sm:p-8 bg-white/0 hover:bg-white/[0.01] transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={c.src}
              alt=""
                  className="w-full h-full object-cover"
                />
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex justify-center"
      >
        <div className="w-[80vw] max-w-[1200px] h-[420px] translate-y-24 rounded-full blur-3xl opacity-30 bg-[radial-gradient(75%_75%_at_50%_0%,#0ee7b7_0%,transparent_70%)]" />
      </div>
    </section>
  );
}
