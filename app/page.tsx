import { CaseStudies } from "@/components/sections/CaseStudies";
import { Features } from "@/components/sections/Features";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Integration } from "@/components/sections/Integration";
import { Marquee } from "@/components/sections/Marquee";
import { Milestones } from "@/components/sections/Milestones";
import { Navbar } from "@/components/sections/Navbar";
import { FeatureBento } from "@/components/sections/FeatureBento";
import { OperationsPanel } from "@/components/sections/OperationsPanel";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollChapterRail } from "@/components/ui/ScrollChapterRail";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { BackgroundMesh } from "@/components/ui/BackgroundMesh";


export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-full overflow-x-hidden bg-transparent">
        <BackgroundMesh />
        <CustomCursor />
        <ScrollChapterRail />
        <div className="relative z-10 flex min-h-full min-w-0 flex-col">
          <Navbar />
          <main className="relative flex min-w-0 flex-col overflow-x-hidden">
            <Hero />
            <Marquee />
            <FeatureBento />
            <Features />
            <OperationsPanel />
            <Integration />
            <ServicesGrid />
            <CaseStudies />
            <Milestones />
            <Testimonials />
            <FAQ />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
