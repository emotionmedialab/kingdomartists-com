import { Suspense } from "react";
import type { Metadata } from "next";
import { ApplyFlow } from "@/components/apply/flow";

export const metadata: Metadata = {
  title: "Apply — Kingdom Artists",
  description:
    "Apply for one of 300 founding spots in Kingdom Artists — the community for creatives who build with God, for God.",
};

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyFlow />
    </Suspense>
  );
}
