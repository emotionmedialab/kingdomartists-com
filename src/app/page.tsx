import { Hero } from "@/components/landing/hero";
import { DiscoverPreview } from "@/components/landing/discover-preview";
import { FoundingSection } from "@/components/landing/founding-section";
import { Statement } from "@/components/landing/statement";
import { Waitlist } from "@/components/landing/waitlist";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <DiscoverPreview />
        <FoundingSection />
        <Statement />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
