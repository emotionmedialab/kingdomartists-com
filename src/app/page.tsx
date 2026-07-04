import { Chrome } from "@/components/landing/v5/chrome";
import { Hero } from "@/components/landing/v5/hero";
import { Marquee, Problem, Quote } from "@/components/landing/v5/sections";
import { Platform } from "@/components/landing/v5/platform";
import { Founding } from "@/components/landing/v5/founding";
import { FounderLetter, Faq, Closer } from "@/components/landing/v5/letter-faq";
import { Preloader } from "@/components/landing/v3/preloader";
import { SmoothScroll } from "@/components/landing/v3/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="ka5">
        <div className="ka-grain" />
        <Preloader />
        <Chrome />
        <main>
          <Hero />
          <Marquee />
          <Problem />
          <Quote />
          <Platform />
          <Founding />
          <FounderLetter />
          <Faq />
          <Closer />
        </main>
      </div>
    </SmoothScroll>
  );
}
