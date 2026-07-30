type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24" as const,
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: false as const,
  style: { aspectRatio: "1 / 1", flexShrink: 0 } as const,
});

export function SlackHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M6.5 14.5a2 2 0 1 1 0-4H8V8.5a2 2 0 1 1 4 0V10h1.5a2 2 0 1 1 0 4H12v1.5a2 2 0 1 1-4 0V14.5H6.5z"
        fill="#E01E5A"
      />
      <path
        d="M9.5 17.5a2 2 0 1 1-4 0V16H4a2 2 0 1 1 0-4h1.5V10.5a2 2 0 1 1 4 0V12h1.5a2 2 0 1 1 0 4H9.5v1.5z"
        fill="#36C5F0"
      />
      <path
        d="M17.5 9.5a2 2 0 1 1 0 4H16v1.5a2 2 0 1 1-4 0V13h-1.5a2 2 0 1 1 0-4H12V7.5a2 2 0 1 1 4 0V9h1.5z"
        fill="#2EB67D"
      />
      <path
        d="M14.5 6.5a2 2 0 1 1 4 0V8h1.5a2 2 0 1 1 0 4H18v1.5a2 2 0 1 1-4 0V12h-1.5a2 2 0 1 1 0-4h1.5V6.5z"
        fill="#ECB22E"
      />
    </svg>
  );
}

export function NotionHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" stroke="#111" strokeWidth="1.4" />
      <path d="M8 7.5h8M8 11h8M8 14.5h5.5" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 7.5l1.5-2h7l1.5 2" fill="#111" />
    </svg>
  );
}

export function GoogleDriveHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 16.5l4-7h8l4 7H4z" fill="#34A853" />
      <path d="M12 9.5l-4 7H4l4-7h4z" fill="#FBBC04" />
      <path d="M12 9.5h8l-4 7h-4l4-7z" fill="#4285F4" />
      <path d="M8 16.5l4-7 4 7H8z" fill="#EA4335" opacity="0.9" />
    </svg>
  );
}

export function FigmaHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 4h4a3 3 0 0 1 0 6H8V4z" fill="#F24E1E" />
      <path d="M8 10h4a3 3 0 0 1 0 6H8v-6z" fill="#A259FF" />
      <path d="M8 16a3 3 0 1 1-3-3h3v3z" fill="#1ABCFE" />
      <circle cx="15" cy="7" r="3" fill="#0ACF83" />
    </svg>
  );
}

export function StripeHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="6" width="18" height="12" rx="3" fill="#635BFF" />
      <path
        d="M8.5 14.5V9.8c0-1.1.9-1.6 2.1-1.6.8 0 1.5.2 2 .5v1.4c-.5-.3-1-.5-1.6-.5-.6 0-.9.2-.9.6v.3h2.4v1.1H10.1v2.9H8.5zM13.2 14.5c0-.9.6-1.4 1.8-1.6l1-.2c.3-.1.4-.2.4-.4 0-.3-.3-.5-.8-.5-.5 0-.9.2-1.2.5l-.8-1c.5-.4 1.2-.7 2.1-.7 1.3 0 2 .6 2 1.6v3.3h-1.4v-.8c-.3.6-.9.9-1.6.9-1 0-1.5-.5-1.5-1.1z"
        fill="#fff"
      />
    </svg>
  );
}

export function AirtableHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4L4 8v8l8 4 8-4V8l-8-4z" fill="#FCB400" />
      <path d="M12 4v16l8-4V8l-8-4z" fill="#18BFFF" opacity="0.85" />
      <path d="M4 8l8 4 8-4" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export const INTEGRATION_HUB_APPS = [
  { name: "Slack", Icon: SlackHubIcon },
  { name: "Notion", Icon: NotionHubIcon },
  { name: "Google Drive", Icon: GoogleDriveHubIcon },
  { name: "Figma", Icon: FigmaHubIcon },
  { name: "Stripe", Icon: StripeHubIcon },
  { name: "Airtable", Icon: AirtableHubIcon },
] as const;
