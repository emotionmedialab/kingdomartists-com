import { NavbarV2 } from "@/components/landing/navbar-v2";
import { HeroV2 } from "@/components/landing/hero-v2";
import { CreativeTickerV2 } from "@/components/landing/creative-ticker-v2";
import { VSLSection } from "@/components/landing/vsl-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { FoundingSection } from "@/components/landing/founding-section";
import { WaitlistV2 } from "@/components/landing/waitlist-v2";
import { FooterV2 } from "@/components/landing/footer-v2";

export default function Home() {
  return (
    <>
      <NavbarV2 />
      <main>
        <HeroV2 />
        <CreativeTickerV2 />
        <VSLSection />
        <ProblemSection />
        <FoundingSection />
        <WaitlistV2 />
      </main>
      <FooterV2 />
    </>
  );
}
