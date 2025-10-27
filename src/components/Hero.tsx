import React, { useEffect, useRef } from "react";

export default function Hero() {
  const videoDesktopRef = useRef<HTMLVideoElement | null>(null);
  const videoMobileRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const desktopVid = videoDesktopRef.current;
    const mobileVid = videoMobileRef.current;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const vid = isDesktop ? desktopVid : mobileVid;
    if (!vid) return;

    const playSafe = async () => {
      try {
        await vid.play();
      } catch {}
    };

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => (e.isIntersecting ? playSafe() : vid.pause())),
      { threshold: 0.35 }
    );
    obs.observe(vid);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-white overflow-hidden h-[100vh] flex items-center">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 items-center  lg:gap-x-12">
          {/* LEFT CONTENT */}
          <div className="xl:col-span-6 text-center xl:text-left space-y-4">
            <div className="inline-flex items-center justify-center xl:justify-start rounded-full border border-slate-200 px-3 py-1 text-[12px] sm:text-xs font-medium text-slate-600/90 tracking-wide">
              Built for indie creators
            </div>

            <h1
              className="text-[#0f172a] font-extrabold leading-[1.08]
                         tracking-[-0.02em]
                         text-[clamp(32px,6vw,72px)] [text-wrap:balance]"
            >
              Empowering Artists
            </h1>

            <h2
              className="uppercase font-black tracking-[0.08em]
                         text-[clamp(16px,3.2vw,28px)]
                         bg-clip-text text-transparent
                         bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]"
            >
              Independent Creators
            </h2>

            <p
              className="text-slate-600 font-semibold
                         text-[clamp(14px,1.6vw,18px)]
                         leading-relaxed sm:leading-[1.6]
                         max-w-[38rem] mx-auto xl:mx-0"
            >
              Launch, grow and monetise your craft with studio-grade tools—no
              team required.
            </p>
          </div>

          {/* RIGHT — Desktop Video */}
          <div className="xl:col-span-6 flex justify-center xl:justify-center items-center">
            <div
              className="relative
                w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] xl:w-[80%]
                aspect-[9/16] rounded-3xl overflow-hidden "
            >
              <video
                ref={videoDesktopRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                controls={false}
                controlsList="nodownload noplaybackrate nofullscreen"
              >
                <source src="/Pine/Onetapay.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/60 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
