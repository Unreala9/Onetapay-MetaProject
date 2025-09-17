import React, { useId } from "react";

export default function Hero() {
  const gradId = useId();

  return (
    <section className="relative overflow-hidden">
      {/* soft auras */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-[42%] top-1/4 w-[110vw] sm:w-[85vw] aspect-square rounded-full blur-[120px] opacity-[0.26] sm:opacity-[0.28]"
          style={{
            background: "radial-gradient(closest-side,#ffe9e3,transparent)",
          }}
        />
        <div
          className="absolute -right-[40%] bottom-[-30%] w-[120vw] sm:w-[80vw] aspect-square rounded-full blur-[130px] opacity-[0.22] sm:opacity-[0.24]"
          style={{
            background: "radial-gradient(closest-side,#fff1ec,transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center min-h-[68svh] sm:min-h-[72svh] py-10 sm:py-14 lg:py-24">
          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              className="
                mt-4 np tracking-tight text-ink

                text-[clamp(30px,7.2vw,60px)] sm:text-[clamp(36px,5.4vw,66px)] lg:text-[62px]
                leading-[1.04]
              "
            >
              ENABLING ARTISTS
              <br />
              TO BECOME
              <br />
              <span
                className="
                  relative md:text-[46px] text-[25px] inline-block bg-clip-text text-transparent
                  bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                "
              >
                INDEPENDENT CREATORS
                {/* animated underline */}
                <i
                  className="pointer-events-none absolute left-0 right-0 -bottom-2 h-[6px] rounded-full opacity-80
                               bg-[linear-gradient(92deg,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                               animate-underline"
                />
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sub/90 font-semibold text-[clamp(14px,3.8vw,18px)] sm:text-[clamp(16px,2.4vw,22px)]">
              Launch, grow and monetise your craft with studio-grade tools—no
              team required.
            </p>
          </div>

          {/* RIGHT (phone) */}
          <div className="relative order-1 lg:order-2">
            {/* shadow */}
            <div className="absolute left-1/2 top-[96%] -translate-x-1/2 w-[78%] h-8 sm:h-10 rounded-[40%] bg-black/8 blur-2xl" />

            <div
              className="
                relative mx-auto w-[min(260px,85vw)] xs:w-[min(300px,70vw)] sm:w-[min(340px,60vw)] lg:w-[min(270px,56%)]
                aspect-[9/18] rounded-[38px] sm:rounded-[42px] bg-white drop-shadow-phone shadow-float
                rotate-[2deg] sm:rotate-[5deg] lg:rotate-[8deg]
              "
            >
              {/* conic outer ring */}
              <div
                className="absolute -inset-[2.5px] rounded-[40px] sm:rounded-[44px] opacity-90"
                style={{
                  background:
                    "conic-gradient(from 140deg at 50% 50%, #ff6a3d, #ff2d55, #d7137d, #ff6a3d)",
                  filter: "blur(10px)",
                }}
              />
              {/* glossy border */}
              <div
                className="absolute inset-0 rounded-[38px] sm:rounded-[42px] p-[1.5px] sm:p-[2px]"
                style={{
                  background:
                    "linear-gradient(135deg,#ff6a3d 0%,#ff2d55 40%,#d7137d 100%)",
                }}
              >
                <div className="absolute inset-[2px] rounded-[36px] sm:rounded-[40px] bg-white" />
              </div>

              {/* notch */}
              <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3.5 sm:h-4 rounded-full bg-black/90" />

              {/* screen */}
              <div className="absolute inset-[10px] sm:inset-[12px] rounded-[30px] sm:rounded-[34px] bg-[#FAFAFA] overflow-hidden">
                {/* soft top gloss */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />
                {/* card */}
                <div className="absolute left-4 top-6 w-[80%] sm:left-5 sm:top-7 sm:w-[78%] rounded-xl bg-white shadow-soft p-3 sm:p-4 rotate-[-3deg] sm:rotate-[-4deg] border border-black/5">
                  <p className="text-[11px] sm:text-[12px] font-bold text-ink/70 mb-2">
                    Access bank statement
                  </p>
                  <div className="h-16 sm:h-20 rounded-md bg-neutral-100" />
                  <div className="mt-3 h-1.5 w-20 sm:w-24 rounded-full bg-neutral-200" />
                </div>

                {/* approve */}
                <div className="absolute left-5 bottom-7 sm:left-6 sm:bottom-8">
                  <div className="rotate-[-7deg] sm:rotate-[-8deg]">
                    <button
                      className="
                        inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 sm:px-4
                        bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]
                        text-white font-extrabold text-[12px] sm:text-[13px] shadow-md
                        hover:brightness-110 active:brightness-95 transition
                      "
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      APPROVE
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] sm:text-[11px] text-ink/50 rotate-[-7deg] sm:rotate-[-8deg]">
                    Reject
                  </p>
                </div>
              </div>
            </div>

            {/* floaters */}
            <div className="absolute -left-4 -top-2 hidden md:block animate-floaty">
              <div className="w-36 h-24 lg:w-40 lg:h-28 drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]">
                <svg viewBox="0 0 360 220" className="w-full h-full">
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ff6a3d" />
                      <stop offset="40%" stopColor="#ff2d55" />
                      <stop offset="100%" stopColor="#d7137d" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(0,10)">
                    <polygon
                      points="180,0 360,80 0,80"
                      fill={`url(#${gradId})`}
                      opacity="0.95"
                    />
                    <rect
                      x="20"
                      y="80"
                      width="320"
                      height="20"
                      rx="6"
                      fill="#1F2937"
                    />
                    <g fill="#1F2937">
                      <rect x="40" y="100" width="20" height="70" rx="8" />
                      <rect x="90" y="100" width="20" height="70" rx="8" />
                      <rect x="140" y="100" width="20" height="70" rx="8" />
                      <rect x="190" y="100" width="20" height="70" rx="8" />
                      <rect x="240" y="100" width="20" height="70" rx="8" />
                      <rect x="290" y="100" width="20" height="70" rx="8" />
                    </g>
                    <rect
                      x="20"
                      y="170"
                      width="320"
                      height="20"
                      rx="6"
                      fill="#1F2937"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="absolute -right-2 top-10 sm:-right-4 sm:top-16 md:top-24 lg:top-40 animate-gently">
              <div className="rotate-[8deg]">
                <div className="backdrop-blur bg-white/70 border border-black/5 shadow-soft rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] flex items-center justify-center shadow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 7h16M4 12h10M4 17h7"
                          stroke="#1F2937"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] sm:text-[13px] font-extrabold text-ink">
                        Data Request
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-ink/60 -mt-[2px]">
                        Secure access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-[2%] top-[60%] hidden sm:block md:hidden lg:block animate-floaty2">
              <div className="rotate-[-9deg] bg-white rounded-xl shadow-soft border border-black/5 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]" />
                  <p className="text-[10px] sm:text-[11px] font-bold text-ink/80">
                    From UOB Bank
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* spacer */}
        <div className="h-6 sm:h-10 lg:h-12" />
      </div>

      {/* local animations + motion-reduction */}
      <style>{`
        @keyframes floaty {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes floaty2 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes gently {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes underline {
          0% {
            transform: scaleX(0.2);
            opacity: 0.6;
          }
          100% {
            transform: scaleX(1);
            opacity: 0.9;
          }
        }
        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 12px 26px rgba(215, 19, 125, 0.18));
          }
          50% {
            filter: drop-shadow(0 14px 30px rgba(215, 19, 125, 0.3));
          }
        }
        .animate-floaty {
          animation: floaty 6s ease-in-out infinite;
        }
        .animate-floaty2 {
          animation: floaty2 7s ease-in-out infinite;
        }
        .animate-gently {
          animation: gently 5.5s ease-in-out infinite;
        }
        .animate-underline {
          transform-origin: left center;
          animation: underline 0.9s 0.2s both;
        }
        .animate-glow {
          animation: glow 2.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gently,
          .animate-floaty,
          .animate-floaty2,
          .animate-underline,
          .animate-glow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
