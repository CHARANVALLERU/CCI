"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { A11y, Autoplay, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DeadLink } from "@/components/ui/DeadLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { springSoft } from "@/lib/motion";
import { STORY_BRIDGES } from "@/lib/storyArc";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/a11y";

const CASES = [
  {
    title: "FinChain — DeFi Trading Platform",
    body: "A full-stack decentralized finance platform with real-time trading, smart contract integration, and an intuitive dashboard handling $2M+ daily volume, providing a smooth flow.",
    tag: "FinTech / Web3",
  },
  {
    title: "ShieldOps — Security Operations Center",
    body: "An enterprise-grade security operations center with real-time threat detection, automated incident response with ML powered performance.",
    tag: "Cybersecurity",
  },
  {
    title: "NeuralMetrics — AI Analytics Dashboard",
    body: "A predictive analytics platform leveraging deep learning to surface actionable business insights from petabyte-scale data streams in real time.",
    tag: "AI / Analytics",
  },
];

/** Swiper loop + coverflow needs enough slides when slidesPerView > 1. */
const LOOP_SLIDES = [...CASES, ...CASES, ...CASES];

export function CaseStudies() {
  const reduce = useReducedMotion();
  const canLoop = !reduce && CASES.length > 1;

  return (
    <SectionReveal
      id="story-prove"
      cinematic
      bridge={STORY_BRIDGES["story-prove"]}
      density="immersive"
    >
      <div className="content-bounds">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <SectionHeading
            chapter="04"
            storyBeat="Prove"
            eyebrow="Our Work"
            title="Featured Case Studies"
            description="Real problems. Real solutions. Real results — across industries and technology domains."
          />
          <Magnetic strength={8} className="self-start sm:pb-1">
            <DeadLink
              href="/projects"
              data-cursor="hover"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-zinc-950 ring-1 ring-zinc-900/10 transition-[ring-color] hover:ring-[color:var(--accent-soft)]/40"
            >
              View All Projects
              <ArrowUpRight size={15} aria-hidden />
            </DeadLink>
          </Magnetic>
        </div>

        <blockquote className="mt-8 border-l-2 border-[#6366F1]/35 pl-4 sm:mt-10 sm:max-w-2xl sm:pl-5">
          <p className="text-pretty text-base font-medium leading-snug text-zinc-800 sm:text-lg">
            &ldquo;Shipped systems that hold under load —{" "}
            <span className="text-[#6366F1]">$2M+ daily volume</span>, live threat response, and
            petabyte-scale insight.&rdquo;
          </p>
          <footer className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Proof in production
          </footer>
        </blockquote>

        <div className="cci-cases-swiper mt-10" data-lenis-prevent-touch>
          <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Keyboard, Autoplay]}
            effect={reduce ? "slide" : "coverflow"}
            grabCursor={!reduce}
            centeredSlides
            loop={canLoop}
            loopAdditionalSlides={CASES.length * 2}
            watchSlidesProgress
            speed={reduce ? 0 : 680}
            autoplay={
              reduce
                ? false
                : {
                    delay: 4200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: false,
                    waitForTransition: true,
                  }
            }
            slidesPerView={1.15}
            spaceBetween={16}
            coverflowEffect={
              reduce
                ? undefined
                : {
                    rotate: 18,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                  }
            }
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 20 },
              768: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 2.6, spaceBetween: 28 },
            }}
            keyboard={{ enabled: true }}
            a11y={{
              enabled: true,
              paginationBulletMessage: "Go to case study {{index}}",
            }}
            pagination={{
              clickable: true,
              el: ".cci-cases-pagination",
              bulletClass: "cci-swiper-bullet",
              bulletActiveClass: "cci-swiper-bullet-active",
            }}
            className="!overflow-visible pb-2"
          >
            {(canLoop ? LOOP_SLIDES : CASES).map((item, i) => (
              <SwiperSlide key={`${item.title}-${i}`}>
                <motion.article
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...springSoft, delay: reduce ? 0 : i * 0.06 }}
                  data-cursor="hover"
                  className="group flex h-full min-h-[14rem] flex-col rounded-2xl bg-white/45 p-6 ring-1 ring-zinc-900/10 backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] sm:p-7"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-zinc-950">
                    View case
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="cci-cases-pagination mt-6 flex justify-center gap-2"
            role="tablist"
            aria-label="Case studies"
          />
        </div>
      </div>
    </SectionReveal>
  );
}
