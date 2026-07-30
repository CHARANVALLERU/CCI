"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

const TESTIMONIALS = [
  {
    name: "Aiko Tanaka",
    role: "CISO at VaultX Security",
    quote:
      "The cryptographic architecture Crawl Corp India implemented is military-grade. Our hardware wallet app now secures over $500M in user assets. We've had zero breaches — and that's entirely down to their rigorous approach.",
  },
  {
    name: "Carlos Rivera",
    role: "CEO at NovaBuild",
    quote:
      "From UI wireframes to the final product, Crawl Corp India's design team created an experience that our users genuinely love. Their design systems are clean, consistent, and engineered for scale.",
  },
  {
    name: "David Park",
    role: "CEO, FinChain Labs",
    quote:
      "Crawl Corp India shipped our DeFi trading stack with precision. Latency dropped, volume scaled past $2M daily, and their team felt like an extension of ours.",
  },
  {
    name: "Serena Walsh",
    role: "CTO, Apex Security",
    quote:
      "Their SOC modernization work was exceptional — threat detection latency improved dramatically and incident playbooks finally matched our scale.",
  },
];

const LOOP_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  const reduce = useReducedMotion();
  const canLoop = !reduce && TESTIMONIALS.length > 1;
  const slides = canLoop ? LOOP_TESTIMONIALS : TESTIMONIALS;

  return (
    <SectionReveal id="client-insights" className="section-shell">
      <div className="content-bounds">
        <SectionHeading
          eyebrow="Client Insights"
          title="What Our Clients Say"
          description="How our clients transform growth with advanced solutions — and here's exactly how they did it."
          align="center"
        />

        <div
          className="relative mx-auto mt-10 max-w-3xl"
          data-lenis-prevent-touch
        >
          <div className="overflow-hidden rounded-2xl bg-white/45 p-7 ring-1 ring-zinc-900/10 backdrop-blur-md sm:p-10">
            <Quote size={28} className="text-zinc-950/15" aria-hidden />
            <Swiper
              modules={[EffectFade, Navigation, Pagination, A11y, Keyboard, Autoplay]}
              effect={reduce ? "slide" : "fade"}
              fadeEffect={{ crossFade: true }}
              speed={reduce ? 0 : 520}
              loop={canLoop}
              loopAdditionalSlides={TESTIMONIALS.length}
              autoplay={
                reduce
                  ? false
                  : { delay: 5600, disableOnInteraction: false, pauseOnMouseEnter: true }
              }
              keyboard={{ enabled: true }}
              a11y={{
                enabled: true,
                prevSlideMessage: "Previous testimonial",
                nextSlideMessage: "Next testimonial",
                paginationBulletMessage: "Go to testimonial {{index}}",
              }}
              pagination={{
                el: ".cci-testimonial-pagination",
                clickable: true,
                bulletClass: "cci-swiper-bullet",
                bulletActiveClass: "cci-swiper-bullet-active",
              }}
              navigation={{
                prevEl: ".cci-testimonial-prev",
                nextEl: ".cci-testimonial-next",
              }}
              className="mt-4 !overflow-visible"
            >
              {slides.map((item, i) => (
                <SwiperSlide key={`${item.name}-${i}`}>
                  <blockquote className="min-h-[11rem]">
                    <p className="text-lg leading-relaxed text-zinc-950 sm:text-xl">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="mt-6">
                      <p className="font-semibold text-zinc-950">{item.name}</p>
                      <p className="text-sm text-muted">{item.role}</p>
                    </footer>
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 flex items-center justify-between gap-3">
              <div
                className="cci-testimonial-pagination flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label="Testimonials"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="cci-testimonial-prev inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-950 ring-1 ring-zinc-900/10 touch-manipulation transition-[ring-color,transform] hover:scale-105 hover:ring-[color:var(--accent-soft)]/40"
                  data-cursor="hover"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="cci-testimonial-next inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-950 ring-1 ring-zinc-900/10 touch-manipulation transition-[ring-color,transform] hover:scale-105 hover:ring-[color:var(--accent-soft)]/40"
                  data-cursor="hover"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
