import type { Metadata } from "next";
import { WatchExperience } from "@/components/watch/WatchExperience";

export const metadata: Metadata = {
  title: "CCI Immersive — The Digital Engine",
  description:
    "An immersive 3D experience from Crawl Corp India: AI automation, secure cloud infrastructure, and data pipelines that scale.",
};

export default function WatchPage() {
  return <WatchExperience />;
}
