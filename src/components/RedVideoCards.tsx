export default function RedVideoCards() {
  return (
    <section className="my-16 bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] mx-4 md:mx-16 rounded-3xl">
      <div className="mx-4 md:mx-10 rounded-[2.5rem] border border-white/5">
        <div className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <h1 className="text-white/90 tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Built for the builders. Our cutting-edge solutions simplify complex
            integrations, helping you deploy, scale and optimise with ease.
          </h1>
        </div>
      </div>
      <div className="mx-4 md:mx-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Add it to your stack", src: "/Pine/hervideo.mp4" },
          { title: "Go code free", src: "/Pine/iss.mp4" },
          { title: "Explore pre-built recipes", src: "/Pine/plane.mp4" },
          { title: "Build with us", src: "/Pine/waves.mp4" },
        ].map((c, i) => (
          <article
            key={i}
            className="group relative overflow-hidden rounded-[2rem] border border-white/5 p-6 sm:p-8"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <video
                src={c.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#FF4D2E]/20" />
            </div>
            <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-white">
              {c.title}
            </h2>
            <p className="mt-3 text-[#D9CBC8]/80">
              Build on top of your tech stack with tools designed to fit any
              framework.
            </p>
            <div className="mt-6 h-1 w-24 rounded-full bg-[#FF4D2E]/70 group-hover:w-32 transition-all" />
            <div
              className="absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,77,46,.25), 0 20px 60px -10px rgba(255,77,46,.25)",
              }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
