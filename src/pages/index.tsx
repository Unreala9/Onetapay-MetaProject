// src/pages/index.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InterlockingCards from "@/components/InterlockingCards";
import ScrollSwap from "@/components/ScrollSwap";
import Runways from "@/components/Runways";
import MarqueeCarousel from "@/components/MarqueeCarousel";
import RedVideoCards from "@/components/RedVideoCards";
import PlatformCards from "@/components/PlatformCards";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CurvedLoop from "@/components/CurvedloopProps";
import Rewies from "@/components/rewies";

export default function Index() {
  return (
    <div className="min-h-dvh bg-white text-ink font-sans">
      <Navbar />
      <Hero />
      <div className="hidden md:block">
        <InterlockingCards />
      </div>
      <ScrollSwap />
      <Runways />
      <CurvedLoop
        marqueeText=" ✦ Ideas ✦ brought ✦ to ✦ life ✦ with ✦ Onetapay"
        speed={2}
        curveAmount={100}
        direction="right"
        interactive
        className="text-[60px]"
      />
      <MarqueeCarousel />
      <RedVideoCards />
      <Rewies />
      <PlatformCards />
      <main className="flex-grow flex justify-center items-center">
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
