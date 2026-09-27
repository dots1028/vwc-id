// ============================================================================
//  THE ITEMS PEOPLE CAN CLAIM.
//
//  Each item needs:
//    id     — short, lowercase, no spaces. NEVER change it after people have
//             claimed, or their claims will point at nothing.
//    name   — what members see.
//    glyph  — the line drawing on the card. One of:
//             'ball'  'boot'  'glove'  'goggles'  'hat'  'mask'
//             Anything else falls back to a plain square.
//    colors — the item's real colours, as swatches on the card. One or two
//             hex values. This is what makes the grid scannable before you
//             have photographs.
//
//  Optional extras:
//    image  — a real picture. A URL, or a file in /public as '/boots.png'.
//             When set it replaces the glyph and swatches entirely.
//    group  — items with the same group are shown together under a heading.
//    closed: true — shown but greyed out, nobody can claim it.
// ============================================================================

export const items = [
  { id: 'ball',        name: 'VWC Ball',        glyph: 'ball', colors: ['#E8E6F0'], group: 'Balls' },
  { id: 'ball-purple', name: 'VWC Ball Purple', glyph: 'ball', colors: ['#7C4DFF'], group: 'Balls' },

  { id: 'boots-blue',         name: 'VWC Boots Blue',            glyph: 'boot', colors: ['#3B82F6'],            group: 'Boots' },
  { id: 'boots-blue-purple',  name: 'VWC Boots Blue & Purple',   glyph: 'boot', colors: ['#3B82F6', '#7C4DFF'], group: 'Boots' },
  { id: 'boots-pink',         name: 'VWC Boots Pink',            glyph: 'boot', colors: ['#EC4899'],            group: 'Boots' },
  { id: 'boots-pink-white',   name: 'VWC Boots Pink & White',    glyph: 'boot', colors: ['#EC4899', '#E8E6F0'], group: 'Boots' },
  { id: 'boots-pink-camo',    name: 'VWC Boots Pink Camouflage', glyph: 'boot', colors: ['#EC4899', '#9D174D'], group: 'Boots' },
  { id: 'boots-purple',       name: 'VWC Boots Purple',          glyph: 'boot', colors: ['#7C4DFF'],            group: 'Boots' },
  { id: 'boots-purple-blue',  name: 'VWC Boots Purple & Blue',   glyph: 'boot', colors: ['#7C4DFF', '#3B82F6'], group: 'Boots' },
  { id: 'boots-purple-white', name: 'VWC Boots Purple & White',  glyph: 'boot', colors: ['#7C4DFF', '#E8E6F0'], group: 'Boots' },
  { id: 'boots-red-white',    name: 'VWC Boots Red & White',     glyph: 'boot', colors: ['#EF4444', '#E8E6F0'], group: 'Boots' },

  { id: 'gloves',         name: 'VWC Gloves',         glyph: 'glove',   colors: ['#E8E6F0'], group: 'Kit' },
  { id: 'goggles-purple', name: 'VWC Goggles Purple', glyph: 'goggles', colors: ['#7C4DFF'], group: 'Kit' },
  { id: 'hat-purple',     name: 'VWC Hat Purple',     glyph: 'hat',     colors: ['#7C4DFF'], group: 'Kit' },
  { id: 'mask-purple',    name: 'VWC Mask Purple',    glyph: 'mask',    colors: ['#7C4DFF'], group: 'Kit' },
];
