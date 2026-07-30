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

export function ReactIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

export function OpenAIIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 3.2c1.7 0 3.2.9 4.1 2.2.4-.1.8-.2 1.2-.2 2.3 0 4.1 1.9 4.1 4.2 0 1.5-.8 2.9-2 3.6.1.4.1.8.1 1.2 0 2.6-2.1 4.7-4.7 4.7-.7 0-1.4-.2-2-.5-.8 1.1-2.1 1.8-3.6 1.8-2.3 0-4.2-1.8-4.3-4.1-.5-.3-1-.7-1.3-1.2C2.6 13.7 2 12.4 2 11c0-2.1 1.5-3.8 3.5-4.2C5.9 4.8 7.7 3.2 10 3.2c.7 0 1.4.2 2 .5.3-.3.6-.4 1-.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpeedIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 16.5A8 8 0 0 1 20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 12l5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ExportIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 3v10m0-10l-3.5 3.5M12 3l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShipIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 15l8-3 8 3-1.5 5H5.5L4 15z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 4l4 2.5L12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TemplateIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9h17M9 9v11.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function VueIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path d="M12 4.5L4 19h4.5l3.5-6 3.5 6H20L12 4.5z" fill="#41B883" />
      <path d="M12 4.5l3.5 6H15l-3-5.2L9 10.5h3.5l3.5-6z" fill="#35495E" />
    </svg>
  );
}

export function TypeScriptIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
      <path
        d="M13.5 15.2v1.1c.9.5 1.9.8 3 .8 1.8 0 2.7-.9 2.7-2.1 0-3.4-6.8-2.8-6.8-6.8 0-2.1 1.7-3.8 4.5-3.8 1.1 0 2.2.2 3.2.7v1.9c-.9-.5-1.9-.8-3-.8-1.7 0-2.5.8-2.5 1.9 0 3.3 6.8 2.6 6.8 6.9 0 2.2-1.6 3.9-4.7 3.9-1.3 0-2.6-.3-3.7-.9zM8.4 10.1H6.2v7.4H4.4V10.1H2.2V8.5h6.2v1.6z"
        fill="#fff"
      />
    </svg>
  );
}

export function NextJsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path
        d="M8.5 7.5v9l7-4.5-7-4.5z"
        fill="#fff"
      />
      <path
        d="M15.2 7.5h1.3v9h-1.3V7.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function TailwindIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M12 6c-3.3 0-5.4 1.6-6.3 4.8 1.3-1.7 2.8-2.3 4.5-1.7.8.3 1.4.9 2 1.6 1.1 1.2 2.3 2.6 5 2.6 3.3 0 5.4-1.6 6.3-4.8-1.3 1.7-2.8 2.3-4.5 1.7-.8-.3-1.4-.9-2-1.6C15.9 7.4 14.7 6 12 6zM5.7 12.8c-1.3 1.7-2.8 2.3-4.5 1.7-.8-.3-1.4-.9-2-1.6C-1.9 11.7-3.1 10.3-.4 10.3c3.3 0 5.4 1.6 6.3 4.8-1.3-1.7-2.8-2.3-4.5-1.7-.8.3-1.4.9-2 1.6 1.1 1.2 2.3 2.6 5 2.6 3.3 0 5.4-1.6 6.3-4.8z"
        fill="#06B6D4"
        transform="translate(3 4) scale(0.75)"
      />
    </svg>
  );
}

export function NodeJsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4L12 2.5z"
        fill="#339933"
      />
      <path
        d="M12 6.5c-2.2 0-3.5 1.1-3.5 2.8 0 1.3.7 2 2.1 2.4l1.3.4c.7.2 1 .5 1 .9 0 .6-.5 1-1.3 1-.8 0-1.4-.3-1.8-.8l-1.3 1.2c.7.8 1.7 1.3 3 1.3 2.2 0 3.6-1.1 3.6-2.9 0-1.4-.8-2.1-2.3-2.5l-1.3-.4c-.6-.2-.9-.4-.9-.8 0-.5.4-.8 1.1-.8.7 0 1.2.3 1.6.7l1.2-1.1c-.6-.7-1.5-1.1-2.7-1.1zm-2.8 8.5v1.4h5.6v-1.4H9.2z"
        fill="#fff"
      />
    </svg>
  );
}

export function PythonIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M12 3C8.1 3 8.5 4.9 8.5 4.9v2.3h3.7v.7H6.8c-2.2 0-4.1 1.9-4.1 4.1v2.5c0 2.2 1.9 3.4 3.7 3.4h2.7v-3.2c0-2.4 2.1-4.3 4.5-4.3h4.3V7.2S17.9 3 12 3zm-2.2 2.3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
        fill="#3776AB"
      />
      <path
        d="M12 21c3.9 0 3.5-1.9 3.5-1.9v-2.3h-3.7v-.7h5.4c2.2 0 4.1-1.9 4.1-4.1v-2.5c0-2.2-1.9-3.4-3.7-3.4h-2.7v3.2c0 2.4-2.1 4.3-4.5 4.3H7.7v2.8S6.1 21 12 21zm2.2-2.3a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function PostgresIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M12 3c-3.5 0-6 2.2-6 5.8 0 1.2.3 2.3.8 3.2-.5.9-.8 2-.8 3.2 0 3.6 2.5 5.8 6 5.8s6-2.2 6-5.8c0-1.2-.3-2.3-.8-3.2.5-.9.8-2 .8-3.2C18 5.2 15.5 3 12 3z"
        fill="#336791"
      />
      <ellipse cx="9.5" cy="10" rx="1" ry="1.4" fill="#fff" />
      <ellipse cx="14.5" cy="10" rx="1" ry="1.4" fill="#fff" />
    </svg>
  );
}

export function EthereumIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path d="M12 3l-1 5.5 1 1.2 1-1.2L12 3z" fill="#627EEA" />
      <path d="M12 9.7l-4.5 2.6L12 21l4.5-8.7L12 9.7z" fill="#627EEA" opacity="0.75" />
      <path d="M12 9.7l4.5 2.6L12 12.4V9.7z" fill="#627EEA" opacity="0.45" />
      <path d="M12 9.7l-4.5 2.6L12 12.4V9.7z" fill="#627EEA" opacity="0.6" />
    </svg>
  );
}

export function DockerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M4 10.5h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm-3 3h2v2H7v-2zm3 0h2v2h-2v-2zm3-3h2v2h-2v-2zm3 0h2.5c.5 1.2.2 2.5-.8 3.5-.9.9-2.2 1.2-3.5.8V13.5zm-9 3h2v2H7v-2zM4 13.5h2v2H4v-2z"
        fill="#2496ED"
      />
      <path
        d="M3 14.5c-.5 1.5 0 3.2 1.2 4.4 1.2 1.2 2.9 1.7 4.4 1.2"
        stroke="#2496ED"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FramerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path d="M4 4h16v8H12v8L4 4z" fill="#0055FF" />
    </svg>
  );
}

export function GoIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <path
        d="M4.5 12.5c-.3-.8-.1-1.7.5-2.3.8-.8 2.1-.9 3-.2l.4.3c.5-.9 1.4-1.5 2.5-1.5 1.7 0 3 1.3 3 3 0 .4-.1.8-.2 1.2 1 .3 1.7 1.2 1.7 2.3 0 1.3-1.1 2.4-2.4 2.4H6.8c-1.3 0-2.4-1.1-2.4-2.4 0-1 .6-1.9 1.5-2.2-.1-.3-.1-.6-.1-.9 0-1.5 1-2.8 2.4-3.1z"
        fill="#00ADD8"
      />
      <circle cx="9" cy="11" r=".7" fill="#fff" />
      <circle cx="14.5" cy="11" r=".7" fill="#fff" />
    </svg>
  );
}

export function RustIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#DEA584" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="#662D1A" strokeWidth="1.2" />
      <path d="M8 12h8M12 8v8" stroke="#662D1A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoMark({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 28 28">
      <rect x="2" y="2" width="24" height="24" rx="7" fill="currentColor" />
      <path
        d="M8.5 18.5V9.5h3.2c2.1 0 3.4 1.1 3.4 2.8 0 1.1-.6 2-1.6 2.4l2.1 3.8h-2.5l-1.8-3.4H11v3.4H8.5zm2.5-5.4h.7c.8 0 1.3-.4 1.3-1.1S12.5 11 11.7 11H11v2.1z"
        fill="#fff"
      />
    </svg>
  );
}
