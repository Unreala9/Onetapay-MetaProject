// src/components/InterlockingCards.tsx
"use client";

import TiltedCard from "@/components/TiltedCard";

export default function InterlockingCards() {
  const cards = [
    {
      className: "-left-[100px] -bottom-[90px]",
      src: "/Pine/course2.png",
      caption: "Courses",
    },
    {
      className: "left-[100px] bottom-[0px]",
      src: "/Pine/discord1.png",
      caption: "Community",
    },
    {
      className: "left-[300px] bottom-[90px]",
      src: "/Pine/payment1.png",
      caption: "Payments",
    },
    {
      className: "left-[500px] bottom-[180px]",
      src: "/Pine/telegram1.png",
      caption: "Broadcast",
    },
    {
      className: "left-[700px] bottom-[270px]",
      src: "/Pine/webinar1.png",
      caption: "Webinars",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-10 grid lg:grid-col-12 md:grid-rows-1 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-5 mb-20">
          <h2 className="text-5xl lg:text-6xl font-extrabold leading-[0.95] text-ink">
            Our Social Spark,
            <br />
            Our Creative Touch
          </h2>
          <p className="mt-5 text-lg text-sub/90">
            Blending innovation with imagination, we bring social spark and
            <br />
            creative touch to every idea, transforming visions into impactful
            experiences
          </p>
        </div>

        {/* Right visual stack */}
        <div className="lg:col-span-7 relative flex justify-center">
          <div className="relative w-[880px] max-w-full h-[640px]">
            {/* Glow */}
            <div
              className="absolute inset-0 -z-10 opacity-40 blur-[100px]"
              style={{
                background:
                  "radial-gradient(60% 60% at 70% 70%, #fff1ec 0%, transparent 60%)",
              }}
            />

            {/* Base card skin (kept for consistency) */}
            <style>
              {`.card{background:linear-gradient(180deg,#fff,#fafafa);box-shadow:0 22px 60px rgba(31,41,55,.12);border:1px solid rgba(0,0,0,.06)}`}
            </style>

            {cards.map((c, i) => (
              <div
                key={i}
                className={`card absolute ${c.className} w-[350px] h-[450px] rounded-[32px] p-4
                  transition-all duration-300 ease-in-out
                  hover:-translate-y-4 hover:shadow-2xl hover:scale-105 hover:z-50`}
                style={{
                  willChange: "transform",
                }}
              >
                {/* Inner panel */}
                <div className="relative h-full w-full rounded-[26px] bg-white/70 overflow-hidden">
                  <TiltedCard
                    imageSrc={c.src}
                    captionText={c.caption}
                    altText={`Card ${i + 1}`}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    scaleOnHover={1.06}
                    rotateAmplitude={14}
                    showMobileWarning={false}
                    showTooltip={true}
                  />
                </div>
              </div>
            ))}

            {/* Base shadow */}
            <div className="absolute left-8 right-8 bottom-2 h-14 rounded-full bg-black/10 blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
