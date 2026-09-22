import { Letterhead, HeroSheet, EngineersNotes, VisionLine, ExhibitStudio } from "@/components/landing/v7/sheet";
import { Personnel, Routing, FounderMemo, QaBlock, SignHere } from "@/components/landing/v7/sheet2";

export default function Home() {
  return (
    <div className="ka7">
      <Letterhead />
      <main>
        <HeroSheet />
        <EngineersNotes />
        <VisionLine />
        <ExhibitStudio />
        <Personnel />
        <Routing />
        <FounderMemo />
        <QaBlock />
        <SignHere />
      </main>
    </div>
  );
}
