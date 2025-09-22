
export default function CtaSection() {
  return (
    <section className="text-center p-8">

      <h1 className="text-[#101010] text-4xl md:text-6xl font-semibold leading-tight mb-8">
        Turn payments into
        <br />
        possibilities.
      </h1>
      <button className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] text-[#ffffff] font-semibold text-base py-4 px-8 rounded-full transition-transform duration-200 hover:scale-105">
       <a href="/auth">GET STARTED NOW</a>
      </button>
    </section>
  );
}
