import './globals.css';
import { league, colors, style } from '@/config/league';

export const metadata = {
  title: `${league.name} — Item claims`,
  description: league.welcome,
};

// Everything in config/league.js becomes a CSS variable here.
const vars = `
:root {
  --bg: ${colors.background};
  --surface: ${colors.surface};
  --surface-hover: ${colors.surfaceHover};
  --border: ${colors.border};
  --border-strong: ${colors.borderStrong};
  --text: ${colors.text};
  --muted: ${colors.textMuted};
  --accent: ${colors.accent};
  --accent-text: ${colors.accentText};
  --accent-soft: ${colors.accentSoft};
  --success: ${colors.success};
  --success-edge: ${colors.successEdge};
  --success-wash: ${colors.successWash};
  --danger: ${colors.danger};
  --radius: ${style.radius};
  --max-width: ${style.maxWidth};
  --card-min: ${style.cardMinWidth};
  --font-display: ${style.displayFont};
  --font-body: ${style.bodyFont};
  --display-case: ${style.displayCase};
  --display-track: ${style.displayTrack};
}`;

export default function RootLayout({ children }) {
  const fonts = style.googleFonts
    ? `https://fonts.googleapis.com/css2?family=${style.googleFonts}&display=swap`
    : null;

  return (
    <html lang="en">
      <head>
        {fonts && <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />}
        {fonts && <link rel="stylesheet" href={fonts} />}
        <style dangerouslySetInnerHTML={{ __html: vars }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
