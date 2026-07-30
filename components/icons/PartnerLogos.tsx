type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32" as const,
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: false as const,
});

/** Stylized marks inspired by crawlcorpindia.com partner ticker — inline, no external assets */
export function FinchainLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" opacity="0.12" />
      <path
        d="M10 16h4.5a2.5 2.5 0 0 0 0-5H10v5zm0 0v5h5a2.5 2.5 0 0 0 0-5H10z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

export function StratifyLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 22l10-16 10 16H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 22h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 6v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

export function NovabuildLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="7" y="14" width="7" height="10" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="14" y="10" width="7" height="14" rx="1" fill="currentColor" opacity="0.65" />
      <rect x="21" y="6" width="4" height="18" rx="1" fill="currentColor" opacity="0.45" />
      <path d="M6 24h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function VaultxLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M16 5L7 9v7c0 5.2 3.8 10 9 11 5.2-1 9-5.8 9-11V9l-9-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 16l2.5 2.5L20 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudbaseLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M11 21h10.5a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6-1.8A3.5 3.5 0 0 0 11 21z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M13 17h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function OrbitrLogo({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="12" r="2.2" fill="currentColor" />
      <path d="M16 16l5.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export const PARTNER_BRANDS = [
  { name: "FINCHAIN LABS", Logo: FinchainLogo },
  { name: "STRATIFY CORP.", Logo: StratifyLogo },
  { name: "NOVABUILD", Logo: NovabuildLogo },
  { name: "VAULTX SECURITY", Logo: VaultxLogo },
  { name: "CLOUDBASE CO.", Logo: CloudbaseLogo },
  { name: "ORBITR INC.", Logo: OrbitrLogo },
] as const;
