// ============================================================================
//  EVERYTHING ABOUT HOW THE SITE LOOKS AND READS LIVES IN THIS FILE.
//  Change a value, save, push. Nothing else needs touching.
//  (The list of items you can claim is in the other file: config/items.js)
// ============================================================================


// ---------------------------------------------------------------------------
//  1. YOUR LEAGUE
// ---------------------------------------------------------------------------
export const league = {
  name:    'Virtual World Cup',
  tagline: 'Season 1 · Item claims',

  // Square image. A URL, or drop a file in /public and write '/logo.png'.
  // Leave it empty and the monogram below is used instead.
  logoUrl:  '',
  monogram: 'VWC',

  // The signed-out landing page.
  eyebrow:  'Giveaway item claims',
  headline: 'Claim\nwhat you\nwon.',          // each line break is a new line
  welcome:  'Connect your Discord and claim the items you have won in VWC giveaways. Your win is checked against the announcement, then the item is sent in game.',
  reassure: 'One claim per item.\nWe only read your Discord name and avatar.',

  // The three steps under the hero. Delete one and the row re-flows.
  steps: [
    { title: 'Connect Discord', body: 'Your name and avatar are attached to every claim you make.' },
    { title: 'Pick your item',  body: 'One claim each. Items you have already claimed are marked.' },
    { title: 'Paste your proof', body: 'The Discord message link where you were announced as a winner.' },
  ],

  // Shown above the claim form.
  proofHint:
    'Paste the link to the Discord message where you were announced as a winner. ' +
    'Right-click the message → Copy Message Link.',

  // Shown after someone submits.
  thanks: 'Claim received. Staff will review it and your item will be sent in game.',
};


// ---------------------------------------------------------------------------
//  2. COLOURS
//     Any CSS colour works: '#6C4BE0', 'rgb(108,75,224)', 'tomato'.
//
//     A note on the two purples: `accent` is used as a FILL with white text on
//     top, so it has to be dark enough to read (this one clears 5.6:1).
//     `accentSoft` is the same colour used as TEXT on the dark page, where it
//     has to be light enough instead (7:1). Change both together.
// ---------------------------------------------------------------------------
export const colors = {
  background:   '#0D0C12',   // page behind everything
  surface:      '#15141C',   // cards, panels, the header
  surfaceHover: '#1C1A25',   // cards when you hover them
  border:       '#26232F',   // hairlines
  borderStrong: '#312D3E',   // modal edge, secondary buttons

  text:         '#ECEAF4',   // normal text
  textMuted:    '#918EA8',   // labels, hints, small print

  accent:       '#6C4BE0',   // buttons and fills — your brand colour
  accentText:   '#FFFFFF',   // text sitting on top of the accent colour
  accentSoft:   '#A78BFF',   // accent-coloured TEXT on the dark page

  success:      '#34D399',   // claimed ticks
  successEdge:  '#2E5A49',   // border of a claimed card
  successWash:  '#10241C',   // background of the "claim received" banner

  danger:       '#F87171',   // errors
};


// ---------------------------------------------------------------------------
//  3. SHAPE AND TYPE
// ---------------------------------------------------------------------------
export const style = {
  // Corner rounding. '0px' for sharp, '22px' for very round.
  radius:       '16px',

  // How wide the content is allowed to get on a big monitor.
  maxWidth:     '1280px',

  // Smallest card width in the item grid. Bigger number = fewer, wider cards.
  cardMinWidth: '210px',

  // Google Fonts, written exactly as Google writes them, joined by '&family='.
  // '' for none.
  googleFonts:  'Archivo:wght@600;700;800&family=Instrument+Sans:wght@400;500;600',

  // Headings — the loud one. Set uppercase and tight by default.
  displayFont:  "'Archivo', system-ui, sans-serif",
  displayCase:  'uppercase',        // or 'none'
  displayTrack: '-0.03em',          // letter-spacing

  // Body copy — the quiet one.
  bodyFont:     "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
};


// ---------------------------------------------------------------------------
//  4. RULES
// ---------------------------------------------------------------------------
export const rules = {
  // One claim per person per item. Leave true unless you want repeats.
  onePerItem: true,

  // Require a proof link on every claim.
  requireProof: true,

  // Only accept proof links that look like Discord message links.
  // Set to false to allow any URL.
  discordLinksOnly: true,

  // Optional note box under the proof link.
  allowNote: true,

  // Longest a note can be.
  noteMaxLength: 300,
};
