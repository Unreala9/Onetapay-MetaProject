// src/components/ScrollSwap.tsx
"use client";

import { useEffect, useRef } from "react";

export default function ScrollSwap() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const cards = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(".feature-card") ?? []
    );
    if (!img || !cards.length) return;

    // Initial active ring
    cards[0].classList.add("feature-ring");

    const swapPreview = (src: string) => {
      // preload for smooth fade
      img.style.opacity = "0";
      const tmp = new Image();
      tmp.src = src;
      tmp.onload = () => {
        img.src = src;
        requestAnimationFrame(() => {
          img.style.opacity = "1";
        });
      };
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const src = el.dataset.img;
            cards.forEach((c) => c.classList.remove("feature-ring"));
            el.classList.add("feature-ring");
            if (src) swapPreview(src);
          }
        });
      },
      {
        // triggers a bit before center for better feel
        threshold: 0.4,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="scroll-swap" className="relative py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10">
        {/* Left: sticky preview (only lg+) */}
        <div className="lg:col-span-6">
          <div className="relative lg:sticky lg:top-24 max-lg:hidden">
            <div className="mx-auto rounded-[28px] bg-neutral-50 border border-neutral-200 shadow-[0_26px_70px_rgba(0,0,0,.08)] p-3 sm:p-4 w-[min(88vw,380px)] md:w-[min(88vw,460px)] lg:w-[350px]">
              <div className="relative rounded-[22px] overflow-hidden bg-white aspect-[3/4]">
                <img
                  ref={imgRef}
                  src="/Pine/home1.png"
                  alt="Preview"
                  className="h-full w-full object-cover transition-opacity duration-500 opacity-100"
                />
              </div>
            </div>
            <div className="mx-auto mt-6 h-8 w-3/4 rounded-full bg-black/10 blur-2xl" />
          </div>
        </div>

        {/* Right: features list (scroll targets) */}
        <div className="lg:col-span-6" ref={containerRef}>
          <div className="space-y-8 sm:space-y-12 xl:space-y-24">
            {[
              {
                title: "Courses",
                img: "/Pine/course2.png",
                des: "Comprehensive courses designed to enhance your knowledge and skills, offering in-depth learning led by industry experts.",
              },
              {
                title: "Discord",
                img: "/Pine/discord1.png",
                des: "Engage with our vibrant community on Discord, where you can network, share insights, and get support in real-time.",
              },
              {
                title: "In-store Payments",
                img: "/Pine/payment1.png",
                des: "Seamless in-store payment solutions providing fast, secure, and convenient transactions for both businesses and customers.",
              },
              {
                title: "Telegram",
                img: "/Pine/telegram1.png",
                des: "Join our Telegram channel to receive instant updates, resources, and direct communication with our support team.",
              },
              {
                title: "Webinar",
                img: "/Pine/webinar1.png",
                des: "Participate in live webinars featuring industry leaders, offering valuable insights, trends, and interactive Q&A sessions.",
              },
            ].map((f, i) => (
              <article
                key={i}
                className="
                  feature-card rounded-3xl border border-neutral-200/80
                  p-5 sm:p-6 md:p-7 shadow-sm transition
                  min-h-[220px] sm:min-h-[260px] md:min-h-[280px]
                  bg-white/70 backdrop-blur-[2px]
                "
                data-img={f.img}
              >
                <h3 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 font-semibold text-[clamp(14px,3.6vw,18px)] md:text-xl lg:text-2xl text-sub/90">
                  {f.des}
                </p>

                {/* On small screens, show image inline (since sticky preview is hidden) */}
                <img
                  src={f.img}
                  loading="lazy"
                  className="lg:hidden mt-4 w-full rounded-2xl border border-neutral-200"
                  alt=""
                />

                <button
                  className="
                    mt-5 inline-flex rounded-full px-5 py-2.5 md:px-6 md:py-3
                    text-sm md:text-base font-extrabold text-white
                    bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                    hover:brightness-110 active:brightness-95 transition
                  "
                >
                  Explore now
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* active card styling + reduced motion */}
      <style >{`
        .feature-card.feature-ring {
          border-color: rgba(215, 19, 125, 0.45);
          box-shadow: 0 14px 48px rgba(215, 19, 125, 0.15);
          transform: translateY(-2px);
          transition: box-shadow 240ms ease, transform 240ms ease,
            border-color 240ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-card,
          .feature-card.feature-ring {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
