/** Scroll narrative — Hero through Case Studies (Discover → Build → Prove). */

export type StoryChapter = {
  id: string;
  chapter: string;
  label: string;
  /** Narrative eyebrow beat shown in SectionHeading */
  storyBeat: string;
  href: string;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "top",
    chapter: "00",
    label: "Open",
    storyBeat: "Imagine",
    href: "#top",
  },
  {
    id: "story-discover",
    chapter: "01",
    label: "Discover",
    storyBeat: "Discover",
    href: "#story-discover",
  },
  {
    id: "features",
    chapter: "02",
    label: "Build",
    storyBeat: "Build",
    href: "#features",
  },
  {
    id: "story-deliver",
    chapter: "03",
    label: "Deliver",
    storyBeat: "Deliver",
    href: "#story-deliver",
  },
  {
    id: "story-prove",
    chapter: "04",
    label: "Prove",
    storyBeat: "Prove",
    href: "#story-prove",
  },
];

export const STORY_BRIDGES: Record<string, string> = {
  "story-discover":
    "Trusted by teams worldwide — momentum before we open the blueprint.",
  features:
    "Capabilities mapped to how modern products ship — from scan to scale.",
  "story-deliver":
    "Four phases, one control panel — how ideas become production.",
  "story-prove":
    "Outcomes you can measure — work that speaks in metrics and motion.",
};
