import { Suspense } from "react";
import { Chrome } from "@/components/landing/v3/chrome";
import { Hero } from "@/components/landing/v3/hero";
import { Marquee } from "@/components/landing/v3/marquee";
import { FamilyScroll } from "@/components/landing/v3/family-scroll";
import { Problem } from "@/components/landing/v3/problem";
import { Mandate } from "@/components/landing/v3/mandate";
import { Platform } from "@/components/landing/v3/platform";
import { Founding } from "@/components/landing/v3/founding";
import { Closer } from "@/components/landing/v3/closer";

export default function Home() {
  return (
    <div className="ka-page">
      <div className="ka-grain" />
      <Chrome />
      <main>
        <Hero />
        <Marquee />
        <FamilyScroll />
        <Problem />
        <Mandate />
        <Platform />
        <Founding />
        <Closer />
      </main>
    </div>
  );
}
