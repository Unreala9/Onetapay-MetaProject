export default function AppPromo() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[28px] bg-gray-100/80 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center px-4 sm:px-8 lg:px-12 py-10 lg:py-14">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-8 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)]" />
              <img
                src="/Pine/iosphone-DTaYLOz0.png"
                alt="App preview"
                className="relative mx-auto lg:ml-10 w-[420px] max-w-full rotate-[12deg] drop-shadow-2xl"
              />
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <div className="space-y-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-xl border border-black/20 bg-white px-5 py-3 shadow-sm hover:shadow transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      fill="#34A853"
                      d="M1.23 1.5c-.15.26-.23.56-.23.9v18.2c0 .33.08.64.24.9l10.02-10.01L1.23 1.5z"
                    />
                    <path
                      fill="#FBBC04"
                      d="M13.54 10.07 16.9 8.1 3.58.16A1.7 1.7 0 0 0 1.23 1.5l12.31 8.57z"
                    />
                    <path
                      fill="#EA4335"
                      d="M1.24 21.5c.2.33.49.58.85.74.36.16.74.2 1.12.12l13.69-7.93-3.36-1.96L1.24 21.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M20.84 10.9 17 8.68l-3.46 2 3.46 1.99 3.84-2.28a1.4 1.4 0 0 0 0-2.44z"
                    />
                  </svg>
                  <span className="text-[22px] leading-none font-medium">
                    Google Play
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-xl border border-black/20 bg-white px-5 py-3 shadow-sm hover:shadow transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-black"
                    aria-hidden="true"
                  >
                    <path d="M16.365 1.43c0 1.14-.47 2.2-1.23 2.98-.79.82-2.11 1.46-3.2 1.36-.14-1.1.53-2.28 1.3-3.09.82-.87 2.22-1.51 3.13-1.25zM20.7 17.12c-.59 1.35-.87 1.93-1.63 3.11-1.06 1.64-2.56 3.68-4.42 3.7-1.66.03-2.08-1.1-4.34-1.1-2.26 0-2.72 1.07-4.42 1.13-1.82.07-3.22-1.78-4.3-3.4C-.2 18.38-.86 14.1.97 11.39c.82-1.22 2.15-1.99 3.64-2.02 1.7-.03 3.31 1.14 4.33 1.14 1 0 3-1.4 5.05-1.19.86.04 3.28.35 4.82 2.64-.12.08-2.88 1.68-2.11 5.16z" />
                  </svg>
                  <span className="text-[22px] leading-none font-medium">
                    App Store
                  </span>
                </a>
              </div>
              <h3 className="mt-10 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 text-center lg:text-left">
                Your World to Create
              </h3>
              <p className="mt-3 text-neutral-600 text-lg">
                Already have an account?{" "}
                <a href="#" className="underline font-medium text-neutral-800">
                  login
                </a>
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-white text-lg font-medium hover:opacity-90 transition"
              >
                Get Your Free Demo now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
