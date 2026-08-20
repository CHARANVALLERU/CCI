export type WatchThemeId = "void" | "obsidian" | "aurora" | "mineral";

export type WatchTheme = {
  id: WatchThemeId;
  label: string;
  /** CSS custom properties applied to the experience wrapper. */
  vars: Record<string, string>;
  /** Accent fed to the WebGL scene (ring emissive / core glow). */
  accent: string;
};

export const watchThemes: Record<WatchThemeId, WatchTheme> = {
  void: {
    id: "void",
    label: "Void",
    vars: {
      "--w-bg": "#000000",
      "--w-bg2": "#808080",
      "--w-text": "#ffffff",
      "--w-muted": "#B9B6BD",
      "--w-accent": "#6366F1",
      "--w-border": "rgba(185, 182, 189, 0.18)",
      "--w-surface": "rgba(255, 255, 255, 0.04)",
    },
    accent: "#6366F1",
  },
  obsidian: {
    id: "obsidian",
    label: "Obsidian",
    vars: {
      "--w-bg": "#0F172A",
      "--w-bg2": "#1E293B",
      "--w-text": "#F8FAFC",
      "--w-muted": "#94A3B8",
      "--w-accent": "#8B5CF6",
      "--w-border": "rgba(148, 163, 184, 0.22)",
      "--w-surface": "rgba(248, 250, 252, 0.05)",
    },
    accent: "#8B5CF6",
  },
  aurora: {
    id: "aurora",
    label: "Aurora",
    vars: {
      "--w-bg": "#0C1222",
      "--w-bg2": "#1A1F2E",
      "--w-text": "#E2E8F0",
      "--w-muted": "#64748B",
      "--w-accent": "#06B6D4",
      "--w-border": "rgba(100, 116, 139, 0.28)",
      "--w-surface": "rgba(226, 232, 240, 0.05)",
    },
    accent: "#06B6D4",
  },
  mineral: {
    id: "mineral",
    label: "Mineral",
    vars: {
      "--w-bg": "#18181B",
      "--w-bg2": "#27272A",
      "--w-text": "#FAFAFA",
      "--w-muted": "#A1A1AA",
      "--w-accent": "#B3A07C",
      "--w-border": "rgba(161, 161, 170, 0.24)",
      "--w-surface": "rgba(250, 250, 250, 0.05)",
    },
    accent: "#B3A07C",
  },
};

export const watchThemeOrder: WatchThemeId[] = ["void", "obsidian", "aurora", "mineral"];
