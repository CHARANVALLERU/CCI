"use client";

import { IntegrationBentos } from "@/components/sections/IntegrationBentos";
import { IntegrationLogos } from "@/components/sections/IntegrationLogos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Integration() {
  return (
    <SectionReveal id="integration" className="section-shell pb-4 sm:pb-6">
      <div className="content-bounds flex flex-col items-stretch">
        <SectionHeading
          align="center"
          eyebrow="Integrations"
          title="Tools We Use to Build Better"
        />
        <IntegrationLogos />
        <IntegrationBentos />
      </div>
    </SectionReveal>
  );
}
