# Item claims site

Members sign in with Discord and claim items. One claim per person per item.

**Two files control everything you'd normally want to change:**

| File | What's in it |
|---|---|
| `config/league.js` | Name, logo, wording, colours, corner rounding, font, rules |
| `config/items.js` | The list of claimable items |

Nothing else needs editing.

---

## Setup — about 15 minutes

### 1. Make a Discord app

Go to <https://discord.com/developers/applications> → **New Application**.

Open **OAuth2** in the sidebar and copy the **Client ID** and **Client Secret**
(press Reset Secret if there isn't one).

Still on OAuth2, under **Redirects**, add both of these and save:

```
http://localhost:3000/api/auth/callback
https://YOUR-PROJECT.vercel.app/api/auth/callback
```

You won't know the Vercel address until step 4 — come back and add it then.

### 2. Put the code on GitHub

Create an empty repository, then from this folder:

```bash
git init
git add .
git commit -m "item claims site"
git remote add origin https://github.com/YOU/YOUR-REPO.git
git push -u origin main
```

### 3. Add a database

In Vercel: **Storage → Create Database → Neon**. Pick the free plan and attach
it to your project. That sets `DATABASE_URL` for you.

The `claims` table creates itself the first time the site loads. There is no
migration to run.

### 4. Deploy

In Vercel: **Add New → Project**, pick your repository, deploy.

Then **Settings → Environment Variables** and add:

| Name | Value |
|---|---|
| `DISCORD_CLIENT_ID` | from step 1 |
| `DISCORD_CLIENT_SECRET` | from step 1 |
| `SITE_URL` | your address, e.g. `https://vwc-claims.vercel.app` — no trailing slash |
| `SESSION_SECRET` | any long random string |
| `ADMIN_TOKEN` | another long random string, for the CSV export |

To make a random string: `openssl rand -hex 32`, or mash the keyboard for 40+
characters.

Redeploy after adding them (**Deployments → ⋯ → Redeploy**). Go back to step 1
and add your real Vercel address to the Discord redirects.

### 5. Try it

Open your site, press **Connect with Discord**, claim something. Try claiming
the same item twice — it should refuse.

---

## Getting the claims out

```
https://your-site.vercel.app/api/export?token=YOUR_ADMIN_TOKEN
```

Downloads every claim as a CSV. Opens in Excel or Sheets. Anyone with that
token can read every claim, so don't post it anywhere.

---

## Running it on your own machine first

```bash
npm install
cp .env.example .env.local     # then fill it in
npm run dev
```

Open <http://localhost:3000>. You still need a `DATABASE_URL` — the free Neon
tier at <https://neon.tech> gives you one in a minute.

---

## Changing how it looks

Open `config/league.js`. Change a colour, save, push — Vercel redeploys on its
own. Some things worth knowing:

- **`colors.accent`** changes the site's character most: every button, fill and
  focus ring uses it. It is paired with **`colors.accentSoft`**, the same colour
  used as *text* on the dark page. `accent` has to be dark enough for white text
  to sit on it; `accentSoft` has to be light enough to read on the background.
  Change them together, or one of the two will stop being legible.
- **`style.radius`** — `'0px'` for a sharp, technical look, `'22px'` for soft.
- **`style.displayFont` / `style.bodyFont`** — the loud face and the quiet one.
  Pick families at <https://fonts.google.com>, list them in
  `style.googleFonts` exactly as Google writes them joined by `&family=`, then
  name them in the two font settings.
- **`style.displayCase`** — `'uppercase'` for the broadcast look, `'none'` for
  something calmer.
- **`style.cardMinWidth`** — raise it for fewer, larger item cards.

## Changing the items

Open `config/items.js`. One line per item.

Each item carries a **`glyph`** (`'ball'`, `'boot'`, `'glove'`, `'goggles'`,
`'hat'`, `'mask'`) and **`colors`** — one or two hex values drawn as swatches on
the card. That pairing is what makes the grid readable before you have any
photographs: "Boots Purple & White" shows a purple chip and a white one.

To add a new glyph, add a case to `components/Glyph.jsx` and use its name.

The `id` is what gets stored against every claim. Once people have claimed an
item, **don't change its `id`** — rename the `name` instead. Deleting an item
hides it from the page but leaves existing claims in the database.

Set `closed: true` on an item to show it greyed out and un-claimable.

## Item pictures

Drop image files into a `public/` folder and set `image: '/boots-purple.png'`,
or paste any image URL. When `image` is set it replaces the glyph and swatches
for that card. Leaving it out is fine — the glyph and swatches are the
intended default, not a placeholder.

---

## How "one per item" is enforced

A unique index on `(discord_id, item_id)` in the database. Not a check in the
page — a rule the database itself will not break, so it holds even if someone
sends the request twice or tampers with the page.

To allow repeat claims, drop that index:

```sql
DROP INDEX claims_one_per_item;
```

---

## Files

```
config/league.js   colours, wording, rules      ← you edit this
config/items.js    the item list                ← and this
app/page.js        the one page members see
app/globals.css    styling (reads from config)
components/        the item grid + claim form
lib/discord.js     Discord OAuth
lib/session.js     signed login cookie
lib/db.js          database + the one-per-item rule
app/api/           login, callback, logout, claims, export
```
