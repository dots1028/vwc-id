// The line drawings on item cards. Add a case here and it becomes usable as
// `glyph: 'yourname'` in config/items.js.

const PATHS = {
  ball: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9.5l5.2 3.8-2 6.2h-6.4l-2-6.2z" />
      <path d="M16 5v4.5M25.5 13.2l-4.3 3.1M21.9 25.3l-2-5.8M10.1 25.3l2-5.8M6.5 13.2l4.3 3.1" />
    </>
  ),
  boot: (
    <path d="M10 6v10.5c0 .9-.2 1.8-.7 2.6L8 21.5a3 3 0 0 0 2.6 4.5h11a3 3 0 0 0 3-3v-1.2c0-1.2-.7-2.3-1.8-2.8l-4.4-1.9a3 3 0 0 1-1.8-2.8V6z" />
  ),
  glove: (
    <path d="M11 16V10a2 2 0 0 1 4 0v4M15 14V8a2 2 0 0 1 4 0v6M19 14v-4a2 2 0 0 1 4 0v8M23 18v-2a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-6" />
  ),
  goggles: (
    <>
      <circle cx="11" cy="16" r="5.2" />
      <circle cx="21" cy="16" r="5.2" />
      <path d="M16.2 16h-.4M5.8 14L3.5 12.6M26.2 14l2.3-1.4" />
    </>
  ),
  hat: (
    <>
      <path d="M9 19.5a7 7 0 0 1 14 0" />
      <path d="M5 19.5h22a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4z" />
    </>
  ),
  mask: (
    <>
      <path d="M5 13c0-2.2 2.1-3.5 5.5-3.5 3 0 4.7 1.2 5.5 1.2s2.5-1.2 5.5-1.2c3.4 0 5.5 1.3 5.5 3.5 0 5.2-3.2 9.8-7 9.8-2 0-3.1-1.1-4-2.2-.9 1.1-2 2.2-4 2.2-3.8 0-7-4.6-7-9.8z" />
      <ellipse cx="11" cy="14.6" rx="2.1" ry="1.6" />
      <ellipse cx="21" cy="14.6" rx="2.1" ry="1.6" />
    </>
  ),
};

const FALLBACK = <rect x="8" y="8" width="16" height="16" rx="4" />;

export default function Glyph({ name, size = 42, className = 'glyph' }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
      {PATHS[name] || FALLBACK}
    </svg>
  );
}

export function Check({ size = 15 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="check" aria-hidden="true">
      <path d="M7 16.5l6 6L25 10" />
    </svg>
  );
}

export function DiscordMark({ size = 20 }) {
  return (
    <svg viewBox="0 0 127 96" width={size} height={size} className="discord-mark" aria-hidden="true">
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
    </svg>
  );
}

export function InfoMark({ size = 15 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="info-mark" aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 14v8M16 10h.01" />
    </svg>
  );
}
