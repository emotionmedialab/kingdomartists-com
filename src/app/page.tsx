import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { CreativeTypeTicker } from "@/components/landing/creative-type-ticker";
import { FeaturedArtists } from "@/components/landing/featured-artists";
import { CommunityShowcase } from "@/components/landing/community-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { QuoteBreak } from "@/components/landing/quote-break";
import { Mission } from "@/components/landing/mission";
import { WhatsComing } from "@/components/landing/whats-coming";
import { Waitlist } from "@/components/landing/waitlist";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CreativeTypeTicker />
        <FeaturedArtists />
        <CommunityShowcase />
        <HowItWorks />
        <QuoteBreak />
        <Mission />
        <WhatsComing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
