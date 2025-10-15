import React, { useEffect, useRef } from "react";

export default function Hero() {
  const videoDesktopRef = useRef<HTMLVideoElement | null>(null);
  const videoMobileRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const desktopVid = videoDesktopRef.current;
    const mobileVid = videoMobileRef.current;

    // Prefer currently visible video element
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const vid = isDesktop ? desktopVid : mobileVid;
    if (!vid) return;

    const playSafe = async () => {
      try {
        await vid.play();
      } catch {
        /* autoplay blocked; muted; will play on gesture */
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) playSafe();
          else vid.pause();
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(vid);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="pt-10 sm:pt-10 md:pt-14" />

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 xl:gap-x-14 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 ml-0 lg:ml-14 xl:ml-24 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start rounded-full border border-slate-200 px-3 py-1 text-[12px] sm:text-xs font-medium text-slate-600/90 tracking-wide">
              Built for indie creators
            </div>

            <h1
              className="mt-3 text-[#0f172a] font-extrabold leading-[1.08]
                         tracking-[-0.02em] sm:tracking-[-0.025em]
                         text-[clamp(28px,7vw,44px)] sm:text-[clamp(32px,6vw,56px)]
                         md:text-[clamp(40px,5.2vw,64px)] xl:text-[95px]
                         [text-wrap:balance]"
            >
              Empowering Artists
            </h1>

            <h2
              className="mt-2 uppercase font-black tracking-[0.08em]
                         text-[clamp(16px,3.9vw,22px)] sm:text-[clamp(18px,3.7vw,26px)]
                         md:text-[clamp(20px,3.2vw,34px)] xl:text-[30px]
                         bg-clip-text text-transparent
                         bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                         [text-wrap:balance]"
            >
              Independent Creators
            </h2>

            <p
              className="mt-4 sm:mt-5 text-slate-600 font-semibold
                         text-[clamp(13px,3.4vw,15px)] sm:text-[clamp(14px,2.3vw,16px)]
                         md:text-[clamp(15px,1.6vw,20px)]
                         leading-relaxed sm:leading-[1.6]
                         max-w-[44rem] lg:max-w-[40rem] mx-auto lg:mx-0
                         [text-wrap:balance]"
            >
              Launch, grow and monetise your craft with studio-grade tools—no
              team required.
            </p>
          </div>

          {/* RIGHT — Desktop video */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 md:block  hidden">
            <div className="relative w-full  flex justify-center items-center">
              <div className="relative w-full  max-w-[720px] rounded-3xl overflow-hidden">
                <div className="relative w-full [aspect-ratio:16/16] overflow-hidden leading-none">
                  <video
                    ref={videoDesktopRef}
                    className="absolute inset-0 w-full h-full object-cover block scale-[1.01] "
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                    controls={false}
                    controlsList="nodownload noplaybackrate nofullscreen"
                  >
                    <source src="/Pine/hero1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Mobile video (portrait) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 lg:mt-20 block md:hidden">
            <div className="relative w-full flex justify-center items-center">
              <div className="absolute -inset-16 -z-10 rounded-full blur-3xl opacity-70" />
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] rounded-3xl overflow-hidden">
                <div className="relative w-full [aspect-ratio:9/14] overflow-hidden leading-none">
                  <video
                    ref={videoDesktopRef}
                    className="absolute inset-0 h-full w-full object-cover block scale-[1.01]"
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                    controls={false}
                    controlsList="nodownload noplaybackrate nofullscreen"
                  >
                    <source src="/Pine/herom1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12 sm:pb-14 lg:pb-16" />
      </div>
    </section>
  );
}
